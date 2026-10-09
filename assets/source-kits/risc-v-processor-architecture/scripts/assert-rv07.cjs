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
const { memoryAddressState:s }=load('src/mechanisms/rv07-state.ts');
const { MemoryAddressProbe:Probe }=load('src/mechanisms/rv07-probe.tsx');
const html=(frame)=>renderToStaticMarkup(React.createElement(Probe,{frame}));

eq([s(0).signedOffset,s(0).extendedOffset,s(0).ea],[-8,4294967288,8192],'Signed immediate and EA');
for(const f of [329,330,331])eq(s(f).registers[1].value,f<330?0:42,`Load boundary ${f}`);
for(const f of [749,750,751])eq(s(f).words[2].value,f<750?0:99,`Store boundary ${f}`);
eq(s(500).ea,8204,'Store uses offset4 not data99');eq(s(285).progress,.5,'Load token midway');
for(const f of [0,330,750,899]){eq(s(f).words[0].value,42,'Load does not erase memory');eq(s(f).registers[2].value,99,'Store leaves register intact');}
yes(html(329)!==html(330),'x5 numeric cell changes');yes(html(749)!==html(750),'memory word numeric cell changes');yes(html(750).includes('0x200C'),'Store EA bound');

console.log(JSON.stringify({status:'PASS',record:'rv07',checks,scope:'State boundaries plus SSR of actual minimal probe; not final teaching approval'}));
