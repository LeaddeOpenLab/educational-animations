const assert=require('node:assert/strict');
const path=require('node:path');
const Module=require('node:module');
const esbuild=require('esbuild');
function load(rel){const entry=path.resolve(__dirname,'..',rel);const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);return m.exports;}
const React=require('react');const{renderToStaticMarkup}=require('react-dom/server');
const{rv12State:s}=load('src/mechanisms/rv12-state.ts');
assert.equal(s(89).x5,0);assert.equal(s(90).x5,7);assert.equal(s(239).mepc,null);assert.equal(s(240).mepc,0x104);assert.equal(s(240).pc,0x800);assert.equal(s(240).mcause,8);assert.equal(s(240).mode,'M');assert.equal(s(240).x6,0);
assert.equal(s(464).mepc,0x104);assert.equal(s(465).mepc,0x108);assert.equal(s(629).mode,'M');assert.equal(s(630).pc,0x108);assert.equal(s(630).mode,'U');assert.equal(s(809).x6,0);assert.equal(s(810).x6,9);assert.equal(s(810).x5,7);assert(s(215).transfer.x>s(190).transfer.x);
const{Rv12Probe:P}=load('src/mechanisms/rv12-probe.tsx');const entry=renderToStaticMarkup(React.createElement(P,{frame:240})),ret=renderToStaticMarkup(React.createElement(P,{frame:630}));assert(entry.includes('>0x104<')&&entry.includes('>0x800<')&&entry.includes('>8<'));assert(ret.includes('>0x108<')&&ret.includes('>U<'));console.log('rv12 PASS: exact saved ECALL PC, software increment, MRET restoration, delayed younger write and visible CSR bindings');
