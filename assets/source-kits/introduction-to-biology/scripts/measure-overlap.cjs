#!/usr/bin/env node
/**
 * Measure the real rendered geometry of every scene and write it to JSON.
 *
 *   node scripts/measure-overlap.cjs                     # whole project, key frames
 *   node scripts/measure-overlap.cjs --dense             # every 30 frames instead
 *   node scripts/measure-overlap.cjs --only cs06,cs09    # a subset
 *   node scripts/measure-overlap.cjs --project <dir>     # run from the skill
 *
 * Output: out/overlap/boxes.json
 *
 * How it works: bundles the project once, then renders one still per
 * (composition, frame). The page runs `components/OverlapProbe.tsx`, which
 * console.logs a `OVLPROBE|{...}` line per frame. We capture those lines with
 * the renderer's `onBrowserLog` hook and write them out.
 *
 * Estimating boxes from source text is not an option: every advance factor is a
 * possible false positive and a possible miss, and a figure's interior cannot be
 * inferred at all. So this renders and reads the boxes out of the browser, which
 * is why its output can gate a batch instead of asking a human to confirm each
 * hit.
 *
 * Requirements in the project:
 *   - `components/OverlapProbe.tsx` copied in, mounted inside the scene wrapper
 *   - the scene root carries `data-root`
 *   - measurable elements carry `data-k` (see references/overlap-rules.md)
 *
 * Needs `@remotion/bundler` + `@remotion/renderer` (both ship with @remotion/cli).
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
const OUT_DIR = path.join(PROJECT, 'out', 'overlap');
const OUT_FILE = path.join(OUT_DIR, 'boxes.json');
const ONLY = (flag('--only') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const DENSE = has('--dense');
const STEP = Number(flag('--step', '30'));
const DRY = has('--dry');
const PREFIX = 'OVLPROBE|';

const die = (msg) => {
  console.error(`\n!! ${msg}\n`);
  process.exit(2);
};

/**
 * This script ships inside the skill but runs against a project, so Remotion
 * lives in the project's node_modules, not next to this file.
 */
const fromProject = (name) => {
  for (const base of [PROJECT, path.join(PROJECT, 'node_modules')]) {
    try {
      return require(require.resolve(name, { paths: [base] }));
    } catch {
      /* try the next base */
    }
  }
  die(`cannot resolve "${name}" from ${PROJECT} — is @remotion/cli installed there?`);
};

const { bundle } = fromProject('@remotion/bundler');
const { ensureBrowser, getCompositions, renderStill, selectComposition } = fromProject('@remotion/renderer');

if (!fs.existsSync(path.join(PROJECT, 'src', 'index.ts'))) die(`no src/index.ts under ${PROJECT}`);
if (!fs.existsSync(path.join(PROJECT, 'src', 'videos', 'registry.ts'))) {
  die(`no src/videos/registry.ts under ${PROJECT} — key frames come from there`);
}

/* --------------------------------------------------- key frames registry */

/** `{ id: 'cs06-sorting-process', ... keyFrames: [60, 200, ...] }` */
function keyFramesFromRegistry() {
  const src = fs.readFileSync(path.join(PROJECT, 'src', 'videos', 'registry.ts'), 'utf8');
  const out = {};
  const re = /id:\s*'([^']+)'[\s\S]*?keyFrames:\s*\[([^\]]*)\]/g;
  for (const m of src.matchAll(re)) {
    const f = m[2].split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => Number.isFinite(n));
    if (f.length) out[m[1]] = f;
  }
  // Diagnose the silent half-blind case: `keyFrames: KF_A` (a named constant) is
  // invisible to the regex above, so that composition silently falls back to four
  // evenly-spaced frames — which skip the first AND last scene, precisely where a
  // title's oversized type and a closing's summary rows like to collide.
  const declared = (src.match(/keyFrames\s*:/g) || []).length;
  const parsed = Object.keys(out).length;
  if (declared > parsed) {
    console.warn(`\n⚠️  registry.ts declares ${declared} "keyFrames:" but only ${parsed} parsed as array literals.`);
    console.warn(`    ${declared - parsed} composition(s) fall back to 4 evenly-spaced frames and the run is HALF-BLIND:`);
    console.warn(`    those frames skip the first and last scene and cannot clear them.`);
    console.warn(`    keyFrames must be an ARRAY LITERAL:   keyFrames: [60, 200, 430, 640]   ✅`);
    console.warn(`                                          keyFrames: KF_A                   ❌\n`);
  }
  return out;
}

/* --------------------------------------------------------------- measure */

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`project   ${PROJECT}`);
  if (DRY) {
    const kf = keyFramesFromRegistry();
    console.log(`keyFrames ${Object.keys(kf).length} compositions`);
    return;
  }

  console.log('bundling…');
  const t0 = Date.now();
  const serveUrl = await bundle({
    entryPoint: path.join(PROJECT, 'src', 'index.ts'),
    onProgress: (p) => {
      if (p === 100) process.stdout.write('\r  bundle 100%');
    },
  });
  console.log(`\r  bundle done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  await ensureBrowser();

  const all = await getCompositions(serveUrl);
  const keyFrames = keyFramesFromRegistry();

  const targets = all
    .filter((c) => (ONLY.length ? ONLY.some((o) => c.id.includes(o)) : true))
    .map((c) => {
      const declared = keyFrames[c.id];
      let frames = declared;
      if (DENSE) {
        frames = [];
        for (let f = 0; f < c.durationInFrames; f += STEP) frames.push(f);
      }
      if (!frames || !frames.length) {
        frames = [0.25, 0.45, 0.65, 0.85].map((r) => Math.floor(c.durationInFrames * r));
      }
      return { comp: c, frames: frames.filter((f) => f < c.durationInFrames) };
    });

  const totalFrames = targets.reduce((s, t) => s + t.frames.length, 0);
  console.log(`compositions ${targets.length} · frames ${totalFrames}\n`);

  const still = path.join(OUT_DIR, '.probe.png');
  const dataset = [];
  let bad = 0;

  for (const { comp, frames } of targets) {
    const resolved = await selectComposition({ serveUrl, id: comp.id });
    for (const frame of frames) {
      let captured = null;
      const logs = [];
      await renderStill({
        composition: resolved,
        serveUrl,
        frame,
        output: still,
        logLevel: 'error',
        onBrowserLog: (log) => {
          if (log.text && log.text.startsWith(PREFIX)) logs.push(log.text.slice(PREFIX.length));
        },
      });
      for (const raw of logs) {
        try {
          captured = JSON.parse(raw);
        } catch {
          /* keep the last parseable line */
        }
      }
      const rec = { video: comp.id, frame, w: comp.width, h: comp.height, ...(captured ?? { ok: false, why: 'no probe output' }) };
      if (!rec.ok) bad++;
      dataset.push(rec);
      const n = rec.els ? rec.els.length : 0;
      process.stdout.write(
        `\r  ${comp.id.padEnd(28)} frame ${String(frame).padStart(4)}  elements ${String(n).padStart(3)}   `
      );
    }
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(dataset, null, 1));
  if (fs.existsSync(still)) fs.unlinkSync(still);

  console.log(`\n\nwrote ${OUT_FILE}`);
  console.log(`${dataset.length} frames measured${bad ? `, ${bad} without probe output` : ''}`);
  if (bad) {
    console.log('   a frame without output means the project has no [data-root], or the probe is not mounted');
  }
  console.log('next: node scripts/check-overlap.cjs --project ' + PROJECT);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
