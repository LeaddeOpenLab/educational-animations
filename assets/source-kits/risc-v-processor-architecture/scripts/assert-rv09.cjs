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
const { forwardState:s }=load('src/mechanisms/rv09-state.ts');
const { ForwardProbe:Probe }=load('src/mechanisms/rv09-probe.tsx');
const html=(frame)=>renderToStaticMarkup(React.createElement(Probe,{frame}));

for(const f of [299,300,301])eq(s(f).nearOperand,f<300?0:12,`Near operand boundary ${f}`);
for(const f of [539,540,541])eq(s(f).farOperand,f<540?0:12,`Far operand boundary ${f}`);
eq(s(330).nearResult,2,'SUB uses forwarded12');eq(s(570).farResult,3,'XOR uses forwarded12');
for(const f of [300,330,540,570,689])eq(s(f).registers[0].value,0,`Forwarding precedes WB ${f}`);
eq(s(270).nearTravel,.5,'Near token moves actual payload');eq(s(510).farTravel,.5,'Far token moves actual payload');
eq(s(850).registers.map(x=>x.value),[12,2,3],'Final registers');
yes(html(299)!==html(300),'Near operand SVG changes');yes(html(539)!==html(540),'Far operand SVG changes');yes(html(570).includes('12 XOR 15 = 3'),'XOR result numeric SVG');

console.log(JSON.stringify({status:'PASS',record:'rv09',checks,scope:'State boundaries plus SSR of actual minimal probe; not final teaching approval'}));
