const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const esbuild=require('esbuild');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const id='rv02';
const root=path.resolve(__dirname,'..');
const out=path.join(root,'out/b1',id);fs.mkdirSync(out,{recursive:true});
for(const part of ['state','probe'])esbuild.buildSync({entryPoints:[path.join(root,'src/mechanisms',id+'-'+part+(part==='state'?'.ts':'.tsx'))],outfile:path.join(out,part+'.cjs'),bundle:true,platform:'node',format:'cjs',external:['react','react-dom'],logLevel:'silent'});
const mod=require(path.join(out,'state.cjs'));const probe=require(path.join(out,'probe.cjs'));
const state=mod.rv02State,Component=probe.RV02Probe;
const draw=f=>renderToStaticMarkup(React.createElement(Component,{frame:f}));
let checks=0;function eq(a,b,label){checks++;assert.deepEqual(a,b,label);}function ok(a,label){checks++;assert.ok(a,label);}

for(const f of [0,150,210,270,479,480,481,599,600,601,809,810,811,899]){const s=state(f);eq(s.values.find(v=>v.index===0).value,0,'x0 frame '+f);eq(s.values.find(v=>v.index===5).value,f<600?0:13,'x5 frame '+f);eq(s.readA,9,'readA');eq(s.readB,4,'readB');eq(s.sum,13,'sum');}
eq(state(210).readProgress,.5,'concurrent read midpoint');eq(state(479).writeData,null,'not ready');eq(state(480).writeData,13,'pending ready');eq(state(480).values[1].value,0,'ready not stored');eq(state(809).discarded,false,'before x0 attempt');eq(state(810).discarded,true,'x0 discards');
ok(draw(599)!==draw(600),'stored value changes in SVG at edge');ok(draw(809).includes('Write x0'),'attempted target is visible');ok(!draw(810).includes('Write x0'),'payload is removed at discard');ok(draw(810).includes('stored value = 0'),'x0 invariant is visibly bound');
console.log('dual-read copies; pending479/480; write599/600/601; x0 discard809/810/811 PASS');
console.log(JSON.stringify({id,checks,status:'PASS',scope:'technical mechanism only'}));
