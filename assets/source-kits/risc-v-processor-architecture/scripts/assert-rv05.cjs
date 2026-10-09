const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const esbuild=require('esbuild');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const id='rv05';
const root=path.resolve(__dirname,'..');
const out=path.join(root,'out/b1',id);fs.mkdirSync(out,{recursive:true});
for(const part of ['state','probe'])esbuild.buildSync({entryPoints:[path.join(root,'src/mechanisms',id+'-'+part+(part==='state'?'.ts':'.tsx'))],outfile:path.join(out,part+'.cjs'),bundle:true,platform:'node',format:'cjs',external:['react','react-dom'],logLevel:'silent'});
const mod=require(path.join(out,'state.cjs'));const probe=require(path.join(out,'probe.cjs'));
const state=mod.rv05State,Component=probe.RV05Probe;
const draw=f=>renderToStaticMarkup(React.createElement(Component,{frame:f}));
let checks=0;function eq(a,b,label){checks++;assert.deepEqual(a,b,label);}function ok(a,label){checks++;assert.ok(a,label);}

for(const f of [0,359,360,361,509,510,511,600,690,809,810,811,899]){const s=state(f);eq(s.pc,f>=810?0x204:0x200,'PC frame '+f);eq(s.rdValue,f>=810?42:0,'rd frame '+f);eq(s.address,f>=360?0x1008:null,'address frame '+f);eq(s.data,f>=510?42:null,'data frame '+f);eq(s.words.map(w=>w.value),[7,19,42],'memory preserved');}
eq(state(510).selectedAddress,'0x1008','actual selected row');eq(state(600).pendingData,42,'pending load');eq(state(600).rdValue,0,'pending is not committed');eq(state(810).pendingData,null,'pending consumed');ok(state(600).dataToken.x!==state(510).dataToken.x,'memory payload transfer');ok(draw(809)!==draw(810),'PC andrd rendered at one edge');ok(draw(809).includes('0x200'),'old PC visible');ok(draw(810).includes('0x204'),'new PC visible');
console.log('address359/360; selected-word509/510; load42 transfer; simultaneous pc/rd809/810/811 PASS');
console.log(JSON.stringify({id,checks,status:'PASS',scope:'technical mechanism only'}));
