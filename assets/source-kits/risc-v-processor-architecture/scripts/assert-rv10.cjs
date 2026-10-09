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
const { loadUseState:s }=load('src/mechanisms/rv10-state.ts');
const { LoadUseProbe:Probe }=load('src/mechanisms/rv10-probe.tsx');
const html=(frame)=>renderToStaticMarkup(React.createElement(Probe,{frame}));

eq(s(269).instructions.map(i=>i.stage),[2,1,0],'Before stall stages');
for(const f of [270,271,509,510,659]){eq(s(f).instructions.map(i=>i.stage),[3,1,0],`Producer drains, consumer holds ${f}`);eq(s(f).pc,264,'PC remains fixed');eq(s(f).bubble,{stage:2,valid:false,regWrite:false,memWrite:false},'Bubble cannot write');}
for(const f of [509,510,511])eq(s(f).loadValue,f<510?null:42,`Load response boundary ${f}`);
eq(s(660).instructions.map(i=>i.stage),[4,2,1],'Resume stages');eq(s(660).pc,268,'PC advances once released');eq(s(660).bubble.stage,3,'Bubble drains');
for(const f of [689,690,691])eq(s(f).operand,f<690?null:42,`Forward data boundary ${f}`);
eq(s(720).result,45,'ADD uses actual memory value');eq(s(450).result,null,'No premature computation');eq(s(480).dataTravel,.5,'Load transfer midpoint');
eq(s(900).registers.map(x=>x.value),[42,45],'Final registers');yes(html(269)!==html(270),'Stage/PC/bubble SVG changes');yes(html(509)!==html(510),'Load data visible');yes(html(720).includes('42 + 3 = 45'),'Correct result visible');

console.log(JSON.stringify({status:'PASS',record:'rv10',checks,scope:'State boundaries plus SSR of actual minimal probe; not final teaching approval'}));
