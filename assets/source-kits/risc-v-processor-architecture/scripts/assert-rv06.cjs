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
const { branchState:s }=load('src/mechanisms/rv06-state.ts');
const { BranchProbe:Probe }=load('src/mechanisms/rv06-probe.tsx');
const html=(frame)=>renderToStaticMarkup(React.createElement(Probe,{frame}));

for(const f of [0,239,240,390,420,449])eq(s(f).pc,256,`PC before commit at ${f}`);
for(const f of [450,451,569])eq(s(f).pc,272,`Taken PC at ${f}`);
eq(s(570).pc,256,'Replay resets original PC');
for(const f of [689,690,691])eq(s(f).pc,f<690?256:260,`Not-taken boundary ${f}`);
eq([s(400).target,s(400).sequential],[272,260],'Candidates derived from branch PC');
eq(s(660).equal,false,'Unequal branch');eq(s(420).travel,0.5,'Actual carried address midflight');
yes(html(450).includes('0x110'),'PC target visibly bound');yes(html(690).includes('0x104'),'Sequential PC visibly bound');
yes(html(449)!==html(450),'PC boundary changes actual SVG');

console.log(JSON.stringify({status:'PASS',record:'rv06',checks,scope:'State boundaries plus SSR of actual minimal probe; not final teaching approval'}));
