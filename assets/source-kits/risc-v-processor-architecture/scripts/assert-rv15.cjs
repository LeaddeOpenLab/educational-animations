const assert=require('node:assert/strict');
const path=require('node:path');
const Module=require('node:module');
const esbuild=require('esbuild');
function load(rel){const entry=path.resolve(__dirname,'..',rel);const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);return m.exports;}
const React=require('react');const{renderToStaticMarkup}=require('react-dom/server');
const{rv15State:s,decodeMmio:decode}=load('src/mechanisms/rv15-state.ts');
assert.equal(decode(0x10000000),'GPIO output');assert.equal(decode(0x10000004),'GPIO status');assert.equal(decode(0x80000000),'RAM');assert.equal(decode(0),'unmapped');assert.equal(s(404).output,0);assert.equal(s(405).output,1);assert.equal(s(404).ledOn,false);assert.equal(s(405).ledOn,true);assert.equal(s(405).pinY,260);assert.equal(s(674).x3,0);assert.equal(s(675).x3,1);assert.equal(s(600).fenceCompleted,true);assert.equal(s(600).offset,4);
for(const f of[0,200,404,405,675,810,899])assert.equal(s(f).ram,55);assert.equal(s(809).comparisonRam,55);assert.equal(s(810).comparisonRam,1);
const{Rv15Probe:P}=load('src/mechanisms/rv15-probe.tsx');const before=renderToStaticMarkup(React.createElement(P,{frame:404})),after=renderToStaticMarkup(React.createElement(P,{frame:405}));assert(before.includes('r="14"'));assert(after.includes('r="32"'));assert(after.includes('V260'));assert(!before.includes('V260'));console.log('rv15 PASS: address decode, acceptance-bound device value/pin/lamp geometry, delayed readback and preservedRAM');
