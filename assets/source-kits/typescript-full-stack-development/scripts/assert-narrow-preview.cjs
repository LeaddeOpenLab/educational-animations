const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');

const sourcePath = path.join(__dirname, '../src/previews/narrow-state.ts');
const previewPath = path.join(__dirname, '../src/previews/NarrowPreviewV2.tsx');
const js = ts.transpileModule(fs.readFileSync(sourcePath, 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020},
}).outputText;
const stateExports = {};
new Function('exports', js)(stateExports);
const state = stateExports.narrowState;
const before = state(44);
const firstCompare = state(85);
const secondCompare = state(125);
const justBeforeBranch = state(159);
const branch = state(160);
assert.deepEqual(before.sourceKinds, ['ok', 'err']);
assert.equal(before.checking, false);
assert.equal(firstCompare.comparedOk, true);
assert.equal(firstCompare.comparedErr, false);
assert.equal(secondCompare.comparedErr, true);
assert.equal(justBeforeBranch.value, null);
assert.deepEqual(branch.branch, [{kind: 'ok', value: 42}]);
assert.equal(branch.value, 42);
const preview = fs.readFileSync(previewPath, 'utf8');
assert.match(preview, /narrowState\(frame\)/);
assert.match(preview, /state\.branch\.length/);
assert.match(preview, /state\.value/);
assert.match(preview, /state\.comparedErr/);
console.log('PASS narrow preview state: source candidates, comparison boundaries, true branch and rendered value');
