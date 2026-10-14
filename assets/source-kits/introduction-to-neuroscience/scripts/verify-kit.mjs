#!/usr/bin/env node
/**
 * verify-kit.mjs — the hard gate between building a kit and producing videos.
 *
 *   node scripts/verify-kit.mjs [--project .] [--quiet]
 *
 * Exit 0 = the kit is producible. Exit 1 = at least one FAIL (never produce on a FAIL).
 * PENDING is informational: L3 files declared in registry.ts that are not written yet.
 *
 * Reads only: kit.json (+ the files it points at). No dependencies, no network.
 */
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const pi = argv.indexOf('--project');
const ROOT = path.resolve(pi >= 0 ? argv[pi + 1] || '.' : '.');
const QUIET = argv.includes('--quiet');

const fails = [];
const warns = [];
const pass = [];

const fail = (id, msg) => fails.push({ id, msg });
const warn = (id, msg) => warns.push({ id, msg });
const ok = (id, msg) => pass.push({ id, msg });

const rel = (p) => path.relative(ROOT, p) || '.';
const exists = (p) => {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
};
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

/* ---------------------------------------------------------------- R1 kit.json */
const kitPath = path.join(ROOT, 'kit.json');
if (!exists(kitPath)) {
  console.error(`FAIL R1  no kit.json in ${ROOT} — this directory is not a kit.`);
  console.error('         Build one with edu-video-kit, then come back.');
  process.exit(1);
}
let K;
try {
  K = readJson(kitPath);
} catch (e) {
  console.error(`FAIL R1  kit.json is not valid JSON: ${e.message}`);
  process.exit(1);
}
const SUPPORTED = [1];
if (!SUPPORTED.includes(K.kitVersion)) {
  fail('R1', `kitVersion ${K.kitVersion} unsupported (this script understands ${SUPPORTED.join(', ')})`);
}
for (const key of ['course', 'canvas', 'theme', 'primitives', 'formulas', 'layout', 'videos', 'scripts']) {
  if (!K[key]) fail('R1', `kit.json is missing required top-level key "${key}"`);
}
if (fails.length === 0) {
  ok('R1', `kit.json parsed — course="${K.course.id}" ${K.canvas.width}x${K.canvas.height}@${K.canvas.fps} ${K.canvas.framesPerVideo}f`);
}

/* ------------------------------------------------------------- R2 theme pack */
const STANDARD_ROLES = [
  'bg0', 'bg1', 'bg2', 'grid', 'axis',
  'primary', 'accent', 'result', 'warn',
  'textStrong', 'textMuted', 'textDim',
];
let theme = null;
if (K.theme) {
  const tPath = path.join(ROOT, K.theme.file || '');
  if (!exists(tPath)) {
    fail('R2', `theme.file not found: ${K.theme.file}`);
  } else {
    theme = readJson(tPath);
    const missing = STANDARD_ROLES.filter((r) => !theme.colors || theme.colors[r] === undefined);
    if (missing.length) fail('R2', `theme is missing standard roles: ${missing.join(', ')}`);
    const activePath = path.join(ROOT, K.theme.activeJson || 'src/theme/active.json');
    if (!exists(activePath)) {
      fail('R2', `theme.activeJson not found: ${K.theme.activeJson}`);
    } else {
      const active = readJson(activePath).theme;
      if (active !== K.theme.name) {
        fail('R2', `active.json says "${active}" but kit.json declares theme "${K.theme.name}"`);
      } else {
        ok('R2', `theme "${K.theme.name}" present, ${STANDARD_ROLES.length} standard roles, active.json agrees`);
      }
    }
  }
}

/* ------------------------------------------------- R3 contrast against bg1 */
const hex = (c) => {
  let h = String(c).replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lum = (c) => {
  const [r, g, b] = hex(c).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const la = lum(a);
  const lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};
if (theme && theme.colors) {
  const bg = K.theme.bg1 || theme.colors.bg1;
  const stroke = ['primary', 'accent', 'result', 'warn', 'alt'];
  const textOnCanvas = ['textStrong', 'textMuted', 'textDim'];
  const bad = [];
  const table = [];
  for (const r of [...stroke, ...textOnCanvas]) {
    const v = theme.colors[r];
    if (!v || !String(v).startsWith('#')) continue; // grid/axis may be rgba()
    const cr = ratio(v, bg);
    const need = stroke.includes(r) ? 3 : 4.5;
    table.push(`${r} ${v} ${cr.toFixed(2)}`);
    if (cr < need) bad.push(`${r} ${v} = ${cr.toFixed(2)} < ${need}`);
  }
  if (bad.length) {
    fail('R3', `roles too dim against bg1 ${bg}: ${bad.join('; ')}`);
  } else {
    ok('R3', `all stroke roles >=3 and text roles >=4.5 against bg1 ${bg}`);
  }
  if (!QUIET) console.log(`      contrast: ${table.join(' | ')}`);
}

/* ---------------------------------------------------------- R4 scripts exist */
if (K.scripts) {
  const missing = Object.entries(K.scripts)
    .filter(([, p]) => !exists(path.join(ROOT, p)))
    .map(([k, p]) => `${k}(${p})`);
  if (missing.length) fail('R4', `declared scripts missing: ${missing.join(', ')}`);
  else ok('R4', `${Object.keys(K.scripts).length} scripts present`);
}

/* ------------------------------------------------------- R5 primitives exist */
if (Array.isArray(K.primitives)) {
  const missing = [];
  for (const p of K.primitives) {
    const f = path.join(ROOT, p.file || '');
    if (!exists(f)) {
      missing.push(`${p.name} (no file ${p.file})`);
      continue;
    }
    const src = fs.readFileSync(f, 'utf8');
    if (!new RegExp(`export\\s+const\\s+${p.name}\\b`).test(src)) {
      missing.push(`${p.name} (no "export const ${p.name}" in ${p.file})`);
    }
  }
  if (missing.length) fail('R5', `primitives not resolvable: ${missing.join('; ')}`);
  else ok('R5', `${K.primitives.length} primitives exported and resolvable`);
}

/* -------------------------------------------------------- R6 formulas baked */
if (K.formulas) {
  const fPath = path.join(ROOT, K.formulas.file || 'src/formulas.json');
  if (!exists(fPath)) {
    fail('R6', `formulas.file not found: ${K.formulas.file} (run scripts/render-mathjax.cjs)`);
  } else {
    let F = null;
    try {
      F = readJson(fPath);
    } catch (e) {
      fail('R6', `formulas.json is not valid JSON: ${e.message}`);
    }
    if (F) {
      const declared = K.formulas.keys || [];
      const missing = declared.filter((k) => !F[k] || F[k].success === false);
      const broken = Object.entries(F).filter(([, v]) => v && v.success === false).map(([k]) => k);
      if (missing.length) fail('R6', `${missing.length} declared formula keys missing/failed: ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`);
      else ok('R6', `${declared.length} declared formula keys baked (${Object.keys(F).length} total in file)`);
      if (broken.length) warn('R6', `${broken.length} formula(s) failed to bake and will render blank: ${broken.slice(0, 6).join(', ')}`);
    }
    const thm = path.join(ROOT, K.formulas.themeFile || 'src/formulas.theme.json');
    if (!exists(thm)) {
      fail('R6', `formulas.themeFile not found: ${K.formulas.themeFile}`);
    } else {
      const baked = readJson(thm).theme;
      if (baked !== K.theme.name) {
        fail('R6', `formulas were baked for "${baked}" but the active theme is "${K.theme.name}" — re-run scripts/render-mathjax.cjs`);
      }
    }
  }
}

/* ---------------------------------------------- R7 registry + PENDING L3 set */
let pending = [];
if (K.videos && K.videos.registry) {
  const rPath = path.join(ROOT, K.videos.registry);
  if (!exists(rPath)) {
    fail('R7', `videos.registry not found: ${K.videos.registry}`);
  } else {
    const src = fs.readFileSync(rPath, 'utf8');
    const specs = [...src.matchAll(/from\s+['"](\.\/[^'"]+)['"]/g)].map((m) => m[1]);
    const dir = path.dirname(rPath);
    const missing = [];
    for (const s of specs) {
      const base = path.join(dir, s);
      if (!exists(base) && !exists(`${base}.tsx`) && !exists(`${base}.ts`)) missing.push(s);
    }
    pending = missing;
    if (specs.length === 0) {
      warn('R7', `${K.videos.registry} lists no videos yet — normal while the kit is still being built; every L3 file remains PENDING`);
    } else ok('R7', `registry declares ${specs.length} videos (${specs.length - missing.length} written, ${missing.length} pending)`);
  }
  const pattern = K.videos.idPattern;
  if (pattern) {
    try {
      new RegExp(pattern);
    } catch (e) {
      fail('R7', `videos.idPattern is not a valid regex: ${e.message}`);
    }
  }
}

/* -------------------------------------------------- R8 layout bands sanity */
if (K.layout) {
  const cc = K.layout.copyColumn;
  const fb = K.layout.figureBand;
  if (!cc || !fb) fail('R8', 'layout must declare copyColumn and figureBand');
  else if (!(cc.maxRight < fb.minLeft)) {
    fail('R8', `copyColumn.maxRight ${cc.maxRight} must be < figureBand.minLeft ${fb.minLeft}`);
  } else if (!(fb.maxRight <= K.canvas.width)) {
    fail('R8', `figureBand.maxRight ${fb.maxRight} exceeds canvas width ${K.canvas.width}`);
  } else {
    ok('R8', `copy column 108..${cc.maxRight} | figure ${fb.minLeft}..${fb.maxRight} | safeTop ${K.layout.safeTop} safeBottom ${K.layout.safeBottom}`);
  }
}

/* ------------------------------------------------- R9 L1a scaffold in place */
/**
 * The L1a layer is copied verbatim from template/ and never rewritten per course.
 * If one of these is missing the kit still "verifies" on R1..R8 and then fails at
 * `tsc --noEmit` — or worse, renders and silently lacks the overlap probe. The
 * layout components live under `src/` because that is what tsconfig and the
 * Remotion entry point resolve against; a copy sitting outside `src/` is
 * invisible to both.
 */
const L1A = [
  ['src/components/Backdrop.tsx', ['Backdrop']],
  ['src/components/Formula.tsx', ['Formula']],
  ['src/components/SceneShell.tsx', ['SceneShell', 'SCENE_GRID']],
  ['src/components/OverlapProbe.tsx', ['OverlapProbe']],
];

/**
 * L1c — the shared charting/typography base (kit.json `shared.files`).
 * Copied verbatim from template/ and identical across courses. Declared in
 * kit.json rather than hard-coded here so a kit can prune what it does not use.
 */
const SHARED_FILES = Array.isArray(K.shared && K.shared.files) ? K.shared.files : [];

const missingL1a = [];
for (const [f, names] of L1A) {
  const p = path.join(ROOT, f);
  if (!exists(p)) {
    missingL1a.push(`${f} (absent)`);
    continue;
  }
  const src = fs.readFileSync(p, 'utf8');
  for (const n of names) {
    if (!new RegExp(`export\\s+(const|function|type)\\s+${n}\\b`).test(src)) {
      missingL1a.push(`${f} (no export ${n})`);
    }
  }
}
for (const f of SHARED_FILES) {
  if (!exists(path.join(ROOT, f))) missingL1a.push(`${f} (declared in shared.files, absent)`);
}
if (missingL1a.length) {
  fail('R9', `L1a/L1c scaffold missing/incomplete: ${missingL1a.join('; ')} — re-copy template/src/components/`);
} else {
  ok('R9', `L1a scaffold present (${L1A.map(([f]) => path.basename(f)).join(', ')})${SHARED_FILES.length ? ` + ${SHARED_FILES.length} shared` : ''}`);
}

/* ---------------------------------------- R10 unregistered primitives (lint) */
/**
 * A kit forked from another course carries the previous subject's primitives
 * along. They are not errors — but they are dead weight the next fork inherits,
 * and they make "which primitives does THIS course have" unanswerable from
 * kit.json alone. Report them so they can be pruned deliberately.
 */
if (Array.isArray(K.primitives)) {
  const registered = new Set(K.primitives.map((p) => path.basename(p.file || '')));
  const l1aNames = new Set(L1A.map(([f]) => path.basename(f)));
  l1aNames.add('Cover.tsx');
  // L1c defaults shipped by template/. A kit still at the skeleton stage has not run
  // its merge step yet, so its primitives[] is empty and these are simply unregistered —
  // that is NOT "inherited from another course". (Pipelines that register the baseline
  // automatically, e.g. a `BASE_FILES` merge, hit this case on every new kit.)
  for (const f of ['ui.tsx', 'Plot.tsx']) l1aNames.add(f);
  for (const f of SHARED_FILES) l1aNames.add(path.basename(f));
  const cdir = path.join(ROOT, 'src/components');
  if (exists(cdir)) {
    const orphans = fs
      .readdirSync(cdir)
      .filter((f) => /\.(tsx|ts)$/.test(f))
      .filter((f) => !registered.has(f) && !l1aNames.has(f));
    if (orphans.length) {
      warn('R10', `${orphans.length} component file(s) neither registered in primitives[] nor shared/L1a — inherited from another course? ${orphans.join(', ')}`);
    } else {
      ok('R10', 'every file in src/components is L1a, shared, or a registered primitive');
    }
  }
}

/* ------------------------- R11 meta written but never merged (stale kit.json) */
/**
 * Some pipelines keep the L2 author's inventory in a separate `_kit.meta.json` and merge
 * it into kit.json in a later `finalize` step. If that step never runs, kit.json keeps an
 * empty primitives[] / formulas.keys[] — and R5/R6 report it as fine, because an empty
 * list is valid input ("0 primitives exported and resolvable" → OK). The kit then scores
 * PASS with its real content sitting unmerged on disk. Measured on a real kit (2026-09-20).
 */
{
  const metaPath = path.join(ROOT, '_kit.meta.json');
  if (!exists(metaPath)) {
    ok('R11', 'no _kit.meta.json — nothing to merge');
  } else {
    let meta = null;
    try {
      meta = readJson(metaPath);
    } catch (e) {
      warn('R11', `_kit.meta.json is not valid JSON: ${e.message}`);
    }
    if (meta) {
      const metaPrims = Array.isArray(meta.primitives) ? meta.primitives.length : 0;
      const metaKeys =
        (Array.isArray(meta.formulaKeys) && meta.formulaKeys.length) ||
        (meta.formulas && Array.isArray(meta.formulas.keys) && meta.formulas.keys.length) ||
        0;
      const kitPrims = Array.isArray(K.primitives) ? K.primitives.length : 0;
      const kitKeys = K.formulas && Array.isArray(K.formulas.keys) ? K.formulas.keys.length : 0;
      const stale = [];
      if (metaPrims && !kitPrims) stale.push(`_kit.meta.json declares ${metaPrims} primitives but kit.json has none`);
      if (metaKeys && !kitKeys) stale.push(`_kit.meta.json declares ${metaKeys} formula keys but kit.json has none`);
      if (stale.length) {
        fail(
          'R11',
          `${stale.join('; ')} — the merge step never ran, so this kit cannot be produced against. ` +
            `Run the kit's finalize (or merge _kit.meta.json into kit.json) and verify again.`
        );
      } else {
        ok('R11', `_kit.meta.json (${metaPrims} primitives / ${metaKeys} keys) is merged into kit.json`);
      }
    }
  }
}

/* ----------------------------------------------------------------- report */
const line = (t) => console.log(t);
if (!QUIET) line('');
for (const p of pass) line(`  OK    ${p.id}  ${p.msg}`);
for (const w of warns) line(`  WARN  ${w.id}  ${w.msg}`);
for (const f of fails) line(`  FAIL  ${f.id}  ${f.msg}`);
line('');
if (pending.length) {
  line(`  PENDING  ${pending.length} L3 file(s) not written yet:`);
  line(`           ${pending.join(', ')}`);
  line('');
}
line(`kit: ${K.course.id} — ${pass.length} OK, ${warns.length} WARN, ${fails.length} FAIL, ${pending.length} PENDING`);
if (fails.length) {
  line('RESULT: FAIL — do not produce until the FAIL lines above are fixed.');
  process.exit(1);
}
line('RESULT: PASS — kit is producible.');
