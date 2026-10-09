const assert=require('node:assert/strict');
const path=require('node:path');
const Module=require('node:module');
const esbuild=require('esbuild');
function load(rel){const entry=path.resolve(__dirname,'..',rel);const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);return m.exports;}
const React=require('react');const{renderToStaticMarkup}=require('react-dom/server');
const{rv13State:s}=load('src/mechanisms/rv13-state.ts');
const tuple=f=>{const v=s(f);return[v.mode,v.mpp,v.mie,v.mpie]};assert.deepEqual(tuple(239),['S','U',1,0]);assert.deepEqual(tuple(240),['M','S',0,1]);assert.deepEqual(tuple(360),['M','S',0,1]);assert.deepEqual(tuple(479),['M','S',0,1]);assert.deepEqual(tuple(480),['S','U',1,1]);assert.deepEqual(tuple(839),['S','U',1,1]);assert.equal(s(240).mppBits,'01');assert.equal(s(480).mppBits,'00');
const{Rv13Probe:P}=load('src/mechanisms/rv13-probe.tsx');const handler=renderToStaticMarkup(React.createElement(P,{frame:240})),returned=renderToStaticMarkup(React.createElement(P,{frame:480}));assert(handler.includes('translate(140,80)'));assert(returned.includes('translate(140,220)'));assert(returned.includes('>00<'));console.log('rv13 PASS: saved MPP consumed before reset, mode S restored, interrupt fields and token coordinates bound');
