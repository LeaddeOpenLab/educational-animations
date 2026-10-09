const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const esbuild=require('esbuild');
const Module=require('node:module');
const root=path.resolve(__dirname,'..');
const load=(entry)=>{const code=esbuild.buildSync({entryPoints:[path.join(root,entry)],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(path.join(root,'b1-runtime.cjs'),module);m.paths=module.paths;m._compile(code,path.join(root,'b1-runtime.cjs'));return m.exports;};
let checks=0;const eq=(actual,expected,label)=>{assert.deepEqual(actual,expected,label);checks++;};
const yes=(actual,label)=>{assert.ok(actual,label);checks++;};
const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');
const { latchState:s }=load('src/mechanisms/rv08-state.ts');
const { LatchProbe:Probe }=load('src/mechanisms/rv08-probe.tsx');
const html=(frame)=>renderToStaticMarkup(React.createElement(Probe,{frame}));

eq(s(239).idex,null,'Latch empty before edge');for(const f of [240,241,299,300,301])eq(s(f).idex,{a:7,b:5,rd:5,write:1},`Captured bundle ${f}`);
eq(s(300).input,{a:20,b:1,rd:6,write:1},'Upstream changes independently');
for(const f of [509,510,511])eq(s(f).exmem,f<510?null:{result:12,rd:5,write:1},`EX/MEM boundary ${f}`);
for(const f of [689,690,691])eq(s(f).memwb,f<690?null:{result:12,rd:5,write:1},`MEM/WB boundary ${f}`);
for(const f of [809,810,811])eq(s(f).registers[0].value,f<810?0:12,`WB boundary ${f}`);
eq(s(210).transfer,.5,'Capture transfer midpoint');yes(html(300).includes('20, 1; rd6')&&html(300).includes('7, 5; rd5'),'Both upstream and held latch visibly distinct');yes(html(509)!==html(510),'Result latch changes SVG');

console.log(JSON.stringify({status:'PASS',record:'rv08',checks,scope:'State boundaries plus SSR of actual minimal probe; not final teaching approval'}));
