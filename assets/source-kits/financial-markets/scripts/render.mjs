#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';

// Read registry metadata without executing lesson components.
const { values, positionals } = parseArgs({
  options: {
    project: { type: 'string' }, out: { type: 'string' }, only: { type: 'string' },
    list: { type: 'boolean' }, help: { type: 'boolean' },
  },
  allowPositionals: true,
});
if (values.help) {
  console.log('node scripts/render.mjs [OUT_DIR] [--project DIR] [--out DIR] [--only ID,ID] [--list]\nDefaults: course.outputDir relative to project; VIDEOS[].file supplies each filename.');
  process.exit(0);
}
const run = (command, args, cwd) => {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${path.basename(command)} exited ${result.status ?? result.signal}`);
};

try {
  if (positionals.length > 1) throw new Error('Pass at most one output directory');
  const project = path.resolve(values.project ?? process.cwd());
  const require = createRequire(path.join(project, 'package.json'));
  const kit = JSON.parse(fs.readFileSync(path.join(project, 'kit.json'), 'utf8'));
  const ts = require('typescript');
  const registry = path.resolve(project, kit.videos.registry);
  const source = ts.createSourceFile(registry, fs.readFileSync(registry, 'utf8'), ts.ScriptTarget.Latest, true);
  let entries;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === 'VIDEOS') {
      if (!node.initializer || !ts.isArrayLiteralExpression(node.initializer)) throw new Error('VIDEOS must be an array literal');
      entries = node.initializer.elements.map((entry) => {
        if (!ts.isObjectLiteralExpression(entry)) throw new Error('Each VIDEOS entry must be an object literal');
        const field = (name) => {
          const prop = entry.properties.find((p) => ts.isPropertyAssignment(p) &&
            (ts.isIdentifier(p.name) || ts.isStringLiteral(p.name)) && p.name.text === name);
          if (!prop || !ts.isStringLiteralLike(prop.initializer)) throw new Error(`Registry ${name} must be a string literal`);
          return prop.initializer.text;
        };
        return { id: field('id'), file: field('file') };
      });
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  if (!entries?.length) throw new Error('No videos registered in VIDEOS yet');
  const selected = values.only?.split(',').map((id) => id.trim()).filter(Boolean);
  if (selected) {
    const missing = selected.filter((id) => !entries.some((entry) => entry.id === id));
    if (!selected.length || missing.length) throw new Error(`Unknown or empty --only selection: ${missing.join(', ')}`);
    entries = entries.filter((entry) => selected.includes(entry.id));
  }
  const outDir = path.resolve(project, values.out ?? positionals[0] ?? kit.course.outputDir);
  for (const entry of entries) console.log(`${entry.id} -> ${path.join(outDir, `${entry.file}.mp4`)}`);
  if (values.list) process.exit(0);

  const cli = path.join(path.dirname(require.resolve('@remotion/cli/package.json')), 'remotion-cli.js');
  const rawDir = path.join(project, 'out', 'render-raw');
  fs.mkdirSync(rawDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });
  for (const entry of entries) {
    const raw = path.join(rawDir, `${entry.id}.mp4`);
    const final = path.join(outDir, `${entry.file}.mp4`);
    const temporary = path.join(outDir, `${entry.file}.rendering.mp4`);
    run(process.execPath, [cli, 'render', entry.id, raw, '--concurrency=4', '--log=error'], project);
    run('ffmpeg', ['-y', '-v', 'error', '-i', raw, '-map', '0:v:0', '-c:v', 'copy', '-an', '-movflags', '+faststart', temporary], project);
    const probe = spawnSync('ffmpeg', ['-hide_banner', '-i', temporary], { encoding: 'utf8' });
    if (probe.error) throw probe.error;
    const streams = (probe.stderr ?? '').split('\n').filter((line) => /Stream #/.test(line));
    if (streams.length !== 1 || !streams[0].includes('Video:')) throw new Error(`Expected one video-only stream: ${temporary}`);
    fs.renameSync(temporary, final);
    console.log(`Rendered ${entry.id}: ${final}`);
  }
} catch (error) {
  console.error(`Render failed: ${error.message}`);
  process.exit(1);
}
