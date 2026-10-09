const assert=require('node:assert/strict');
const path=require('node:path');
const Module=require('node:module');
const esbuild=require('esbuild');
function load(rel){const entry=path.resolve(__dirname,'..',rel);const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);return m.exports;}
const React=require('react');const{renderToStaticMarkup}=require('react-dom/server');
const{rv11State:s}=load('src/mechanisms/rv11-state.ts');
assert.deepEqual(s(359).liveIds,['B','A','W']);assert.deepEqual(s(360).liveIds,['B']);assert.equal(s(360).x5,7);assert.equal(s(390).discardedPayloadVisible,true);assert.equal(s(420).instructions.some(x=>['A','W'].includes(x.id)),false);
for(const f of[0,359,360,419,420,570,779,780,899]){assert.equal(s(f).memory200,0);assert.notEqual(s(f).x5,99);}
assert.equal(s(569).fetchPc,0x104);assert.equal(s(570).fetchPc,0x110);assert.equal(s(779).x5,7);assert.equal(s(780).x5,42);
const{Rv11Probe:P}=load('src/mechanisms/rv11-probe.tsx');const before=renderToStaticMarkup(React.createElement(P,{frame:359})),after=renderToStaticMarkup(React.createElement(P,{frame:420})),done=renderToStaticMarkup(React.createElement(P,{frame:780}));assert(before.includes('ADDI 99'));assert(!after.includes('ADDI 99'));assert(done.includes('>42<'));console.log('rv11 PASS: killed identities removed, wrong writes suppressed, target PC and correct writeback bound to SVG');
