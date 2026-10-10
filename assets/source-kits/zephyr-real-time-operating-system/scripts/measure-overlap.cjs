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
const { spawnSync } = require('node:child_process');

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
const MEASURE_ONLY = has('--measure-only');
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

/** Parse registry object literals with TypeScript's AST; quote style is irrelevant. */
function keyFramesFromRegistry() {
  const registry = path.join(PROJECT, 'src', 'videos', 'registry.ts');
  const src = fs.readFileSync(registry, 'utf8');
  const ts = fromProject('typescript');
  const ast = ts.createSourceFile(registry, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const out = {};
  const errors = [];
  const propName = (prop) => ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name) ? prop.name.text : '';
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const idProp = node.properties.find((prop) => ts.isPropertyAssignment(prop) && propName(prop) === 'id');
      const framesProp = node.properties.find((prop) => ts.isPropertyAssignment(prop) && propName(prop) === 'keyFrames');
      if (framesProp) {
        const id = idProp && ts.isStringLiteralLike(idProp.initializer) ? idProp.initializer.text : null;
        if (!id) errors.push(`registry object with keyFrames has no string-literal id`);
        else if (!ts.isArrayLiteralExpression(framesProp.initializer)) errors.push(`${id}: keyFrames must be an inline array literal, not a named constant or expression`);
        else {
          const frames = [];
          for (const element of framesProp.initializer.elements) {
            if (!ts.isNumericLiteral(element) || !Number.isInteger(Number(element.text))) {
              errors.push(`${id}: every keyFrame must be an integer literal`);
              continue;
            }
            frames.push(Number(element.text));
          }
          if (frames.length !== 6) errors.push(`${id}: expected exactly 6 keyFrames, received ${frames.length}`);
          if (new Set(frames).size !== frames.length) errors.push(`${id}: keyFrames must be unique`);
          if (frames.some((frame, index) => frame < 0 || (index > 0 && frame <= frames[index - 1]))) errors.push(`${id}: keyFrames must be non-negative and strictly increasing`);
          out[id] = frames;
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  if (!Object.keys(out).length) errors.push('registry contains no parseable keyFrames entries');
  if (errors.length) die(`key-frame preflight failed before screenshots:\n- ${errors.join('\n- ')}\nNo fallback frames are permitted.`);
  return out;
}

/* --------------------------------------------------------------- measure */

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`project   ${PROJECT}`);
  const keyFrames = keyFramesFromRegistry();
  console.log(`preflight PASS · ${Object.keys(keyFrames).length} compositions × 6 explicit key frames`);
  if (DRY) {
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
  const compositionIds = new Set(all.map((composition) => composition.id));
  const missingCompositions = Object.keys(keyFrames).filter((id) => !compositionIds.has(id));
  if (missingCompositions.length) die(`registry keyFrames reference missing compositions: ${missingCompositions.join(', ')}`);

  const targets = all
    .filter((c) => keyFrames[c.id] && (ONLY.length ? ONLY.some((o) => c.id.includes(o)) : true))
    .map((c) => {
      const declared = keyFrames[c.id];
      let frames = declared;
      if (DENSE) {
        frames = [];
        for (let f = 0; f < c.durationInFrames; f += STEP) frames.push(f);
      }
      if (declared.some((frame) => frame >= c.durationInFrames)) die(`${c.id}: keyFrame exceeds duration ${c.durationInFrames}`);
      if (declared[0] > c.durationInFrames * 0.2 || declared.at(-1) < c.durationInFrames * 0.8) {
        die(`${c.id}: six keyFrames must cover both ends of the video (first ≤20%, last ≥80%)`);
      }
      return { comp: c, frames };
    });
  if (!targets.length) die('no registry compositions selected for measurement');

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
    die(`${bad} measured frame(s) had no probe output; check [data-root], data-k, and OverlapProbe wiring. Geometry was written for diagnosis, but the gate did not pass.`);
  }
  if (!MEASURE_ONLY) {
    const checker = path.join(PROJECT, 'scripts', 'check-overlap.cjs');
    if (!fs.existsSync(checker)) die(`missing ${checker}; cannot complete the overlap gate`);
    console.log('\nmeasurement PASS · running deterministic overlap rules (no second screenshot pass)…');
    const checked = spawnSync(process.execPath, [checker, '--project', PROJECT], { stdio: 'inherit' });
    if (checked.status !== 0) process.exit(checked.status ?? 1);
  } else {
    console.log('measurement-only mode; run check-overlap.cjs against the saved boxes before delivery');
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
