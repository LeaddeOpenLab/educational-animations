#!/usr/bin/env node
/**
 * Apply the overlap contract to the geometry dumped by measure-overlap.cjs.
 *
 *   node scripts/check-overlap.cjs                 # whole project
 *   node scripts/check-overlap.cjs --quiet         # only what fails / warns
 *   node scripts/check-overlap.cjs --only cs06     # a subset
 *   node scripts/check-overlap.cjs --json          # machine-readable
 *   node scripts/check-overlap.cjs --top 40        # cap the printed findings
 *
 * Exit code 1 when anything FAILs, so it can gate a batch render.
 *
 * The contract (see references/overlap-rules.md)
 * ---------------------------------------------
 *   R1  siblings must not intersect      — no ancestor relation, not inside the
 *                                          same figure, neither is decor/bg
 *   R2  figures must be sealed           — a figure's content bbox must sit
 *                                          inside its viewBox
 *   R3  connectors are exempt            — a leader line's only job is to cross
 *   R4  ancestor / descendant is exempt  — a container holds its children, that
 *                                          is containment, not overlap
 *   R5  nothing escapes the frame        — every box must sit inside the canvas
 *
 * Three exemptions make the rules survive real scenes:
 *   - `bg` and `decor` never participate. A backdrop is not a figure; if it
 *     counted, every scene would fail instantly.
 *   - ancestor/descendant pairs are skipped (R4). Without this every Panel
 *     border would "collide" with its own contents.
 *   - pairs inside the same figure are skipped entirely. Figure internals are
 *     free — that is what makes the rules discipline-agnostic: no rule ever has
 *     to know what subject the figure draws.
 *
 * Thresholds are clearances, not intersections. Two boxes whose line boxes are
 * 3px apart do not intersect but do look crowded, and crowded is the thing you
 * actually notice.
 */

const fs = require('node:fs');
const path = require('node:path');

/* ------------------------------------------------------------------ args */

const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};
const has = (name) => argv.includes(name);

const PROJECT = path.resolve(flag('--project', process.cwd()));
const BOXES = path.resolve(flag('--in', path.join(PROJECT, 'out', 'overlap', 'boxes.json')));
const ONLY = (flag('--only') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const QUIET = has('--quiet');
const AS_JSON = has('--json');
const TOP = Number(flag('--top', '0')) || Infinity;

/** Clearance below this is an intersection. */
const FAIL_AT = Number(flag('--fail-at', '0'));
/** Clearance below this is crowding worth fixing. */
const WARN_AT = Number(flag('--warn-at', '16'));
/** Tolerance for the sealing test, in figure user units. */
const SEAL_TOL = Number(flag('--seal-tol', '1'));
/** Kinds that never participate in a pair. */
const INERT = new Set(['bg', 'decor']);

if (!fs.existsSync(BOXES)) {
  console.error(`\n!! ${BOXES} not found — run measure-overlap.cjs first\n`);
  process.exit(2);
}

/* -------------------------------------------------------------- geometry */

/**
 * Signed clearance between two boxes.
 *   > 0  separated by that many pixels on the loosest axis
 *   <= 0 intersecting, depth = the tighter overlap
 * Two rects intersect iff both axis gaps are negative, so max() is the
 * separating gap when there is one and the overlap depth when there is not.
 */
const pairClearance = (a, b) => {
  const dx = Math.max(b[0] - (a[0] + a[2]), a[0] - (b[0] + b[2]));
  const dy = Math.max(b[1] - (a[1] + a[3]), a[1] - (b[1] + b[3]));
  return Math.max(dx, dy);
};

const round = (n) => Math.round(n);

const boxStr = (r) => `x${round(r[0])}-${round(r[0] + r[2])} y${round(r[1])}-${round(r[1] + r[3])}`;

/* ---------------------------------------------------------------- checks */

function checkSeal(el) {
  if (el.k !== 'figure' || !el.vb || !el.bb) return null;
  const [vx, vy, vw, vh] = el.vb;
  const [bx, by, bw, bh] = el.bb;
  const over = [];
  if (bx < vx - SEAL_TOL) over.push(`left by ${round(vx - bx)}`);
  if (by < vy - SEAL_TOL) over.push(`top by ${round(vy - by)}`);
  if (bx + bw > vx + vw + SEAL_TOL) over.push(`right by ${round(bx + bw - (vx + vw))}`);
  if (by + bh > vy + vh + SEAL_TOL) over.push(`bottom by ${round(by + bh - (vy + vh))}`);
  if (!over.length) return null;
  return {
    rule: 'R2',
    level: 'FAIL',
    what: `figure "${el.n}" content escapes its viewBox (${vw}×${vh})`,
    detail: `content bbox ${round(bx)},${round(by)} ${round(bw)}×${round(bh)} — overflows ${over.join(', ')}`,
    clearance: -Infinity,
  };
}

function checkFrame(el, W, H) {
  const bad = geometryOf(el).filter(
    (b) => b[0] < -0.5 || b[1] < -0.5 || b[0] + b[2] > W + 0.5 || b[1] + b[3] > H + 0.5
  );
  if (!bad.length) return null;
  return {
    rule: 'R5',
    level: 'FAIL',
    what: `${el.k} "${el.n}" escapes the ${W}×${H} frame`,
    detail: bad.map(boxStr).join('  '),
    clearance: -Infinity,
  };
}

function isAncestor(a, b, els) {
  let p = b.p;
  while (p >= 0) {
    if (p === a.i) return true;
    p = els[p].p;
  }
  return false;
}

/**
 * The boxes a pair check should actually use.
 *
 * A figure is a *transparent* container: its declared box is a positioning box,
 * and the drawing inside it usually occupies only part of that box. Judging an
 * overlap against the declared box therefore reports collisions in empty space.
 * When the probe captured the content bbox we use that instead, scaled from
 * figure user units into screen pixels.
 */
const geometryOf = (el) => {
  if (el.k === 'figure' && el.vb && el.bb && el.r[0]) {
    const [vx, vy, vw, vh] = el.vb;
    const [bx, by, bw, bh] = el.bb;
    const [rx, ry, rw, rh] = el.r[0];
    if (vw > 0 && vh > 0 && bw > 0 && bh > 0) {
      const sx = rw / vw;
      const sy = rh / vh;
      return [[rx + (bx - vx) * sx, ry + (by - vy) * sy, bw * sx, bh * sy]];
    }
  }
  return el.r;
};

function checkPairs(els) {
  const findings = [];
  const geo = els.map(geometryOf);
  for (let i = 0; i < els.length; i++) {
    for (let j = i + 1; j < els.length; j++) {
      const a = els[i];
      const b = els[j];
      if (INERT.has(a.k) || INERT.has(b.k)) continue; // exemption: backdrop / decor
      if (a.k === 'connector' || b.k === 'connector') continue; // R3
      if (isAncestor(a, b, els) || isAncestor(b, a, els)) continue; // R4
      if (a.c !== 'root' && a.c === b.c) continue; // figure internals are free

      let worst = Infinity;
      let wa = null;
      let wb = null;
      for (const ra of geo[i]) {
        for (const rb of geo[j]) {
          const c = pairClearance(ra, rb);
          if (c < worst) {
            worst = c;
            wa = ra;
            wb = rb;
          }
        }
      }
      if (worst >= WARN_AT) continue;
      const seenThroughFigure = a.k === 'figure' || b.k === 'figure';
      findings.push({
        rule: 'R1',
        level: worst < FAIL_AT ? 'FAIL' : 'WARN',
        what: `${a.k} "${a.n}" ✕ ${b.k} "${b.n}"`,
        detail: `clearance ${round(worst)}px   ${boxStr(wa)}  vs  ${boxStr(wb)}${
          seenThroughFigure ? '   (figure judged by its drawn content, not its box)' : ''
        }`,
        clearance: worst,
      });
    }
  }
  return findings;
}

/* ------------------------------------------------------------------ main */

const data = JSON.parse(fs.readFileSync(BOXES, 'utf8'))
  .filter((rec) => !ONLY.length || ONLY.some((o) => rec.video.includes(o)));

const RULES = { R1: 'siblings must not intersect', R2: 'figures must be sealed', R5: 'must stay inside the frame' };

let nFail = 0;
let nWarn = 0;
const perVideo = new Map();
const allFindings = [];

for (const rec of data) {
  if (!rec.ok) {
    // A frame with no probe output is a FAILURE TO MEASURE, not a pass. It used to be
    // pushed into allFindings and then skipped by `continue` BEFORE the counters below,
    // so nFail stayed 0 → "0 FAIL · 0 WARN · PASS", exit 0, and (because the report block
    // is gated on `nFail || nWarn`) not even the detail line was printed. That is how a
    // kit with no probe wiring scored a clean bill of health.
    allFindings.push({
      video: rec.video,
      frame: rec.frame,
      rule: '—',
      level: 'FAIL',
      what: `probe produced no output (${rec.why ?? 'unknown'})`,
      detail: 'add data-root to the scene root and mount <OverlapProbe />',
      clearance: -Infinity,
    });
    nFail += 1;
    const prev = perVideo.get(rec.video) ?? { fail: 0, warn: 0, frames: new Set() };
    prev.fail += 1;
    prev.frames.add(rec.frame);
    perVideo.set(rec.video, prev);
    continue;
  }
  const els = rec.els ?? [];
  const found = [];
  for (const el of els) {
    const s = checkSeal(el);
    if (s) found.push(s);
    const f = checkFrame(el, rec.w, rec.h);
    if (f) found.push(f);
  }
  found.push(...checkPairs(els));
  if (!found.length) {
    if (!QUIET && !AS_JSON) {
      console.log(`[ ok ] ${rec.video.padEnd(30)} frame ${String(rec.frame).padStart(4)}  ${els.length} elements`);
    }
    continue;
  }
  const fails = found.filter((f) => f.level === 'FAIL').length;
  const warns = found.filter((f) => f.level === 'WARN').length;
  nFail += fails;
  nWarn += warns;
  for (const f of found) allFindings.push({ video: rec.video, frame: rec.frame, ...f });
  const prev = perVideo.get(rec.video) ?? { fail: 0, warn: 0, frames: new Set() };
  prev.fail += fails;
  prev.warn += warns;
  prev.frames.add(rec.frame);
  perVideo.set(rec.video, prev);
}

if (AS_JSON) {
  console.log(JSON.stringify({ fail: nFail, warn: nWarn, findings: allFindings }, null, 1));
  process.exit(nFail ? 1 : 0);
}

/* ---------------------------------------------------------------- report */

if (nFail || nWarn) {
  const ranked = allFindings.slice().sort((a, b) => (a.clearance ?? -Infinity) - (b.clearance ?? -Infinity));
  const shown = ranked.slice(0, TOP === Infinity ? ranked.length : TOP);
  let lastKey = null;
  for (const f of shown) {
    const key = `${f.video}@${f.frame}`;
    if (key !== lastKey) {
      console.log(`\n${f.video}  frame ${f.frame}`);
      lastKey = key;
    }
    console.log(`  [${f.level}] ${f.rule}  ${f.what}`);
    console.log(`         ${RULES[f.rule] ?? ''}`);
    console.log(`         ${f.detail}`);
  }
  if (shown.length < ranked.length) console.log(`\n  … ${ranked.length - shown.length} more (raise --top)`);
}

console.log('\n─────────────────────────────────────────────');
if (perVideo.size) {
  console.log('worst videos');
  const rows = [...perVideo.entries()].sort((a, b) => b[1].fail + b[1].warn - (a[1].fail + a[1].warn));
  for (const [id, v] of rows) {
    console.log(`  ${id.padEnd(30)} fail ${String(v.fail).padStart(3)}  warn ${String(v.warn).padStart(3)}  in ${v.frames.size} frames`);
  }
  console.log('');
}
const unmeasured = allFindings.filter((f) => f.rule === '—' && f.level === 'FAIL').length;
console.log(`${data.length} frames checked · ${nFail} FAIL · ${nWarn} WARN`);
if (nFail) {
  console.log('FAIL — fix before rendering, or re-run with --fail-at -1000 to demote geometry collisions.');
  if (unmeasured) {
    console.log(
      `       ${unmeasured} frame(s) produced NO probe output. That is a wiring failure, not a geometry\n` +
        `       one, and --fail-at does NOT demote it. Fix src/Video.tsx (mount <OverlapProbe />,\n` +
        `       put data-root on the scene root) and tag the measurable elements with data-k.`
    );
  }
} else {
  console.log('PASS');
}
process.exit(nFail ? 1 : 0);
