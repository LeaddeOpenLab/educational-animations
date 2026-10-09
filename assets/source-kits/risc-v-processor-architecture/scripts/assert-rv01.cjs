const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const esbuild=require('esbuild');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const id='rv01';
const root=path.resolve(__dirname,'..');
const out=path.join(root,'out/b1',id);fs.mkdirSync(out,{recursive:true});
for(const part of ['state','probe'])esbuild.buildSync({entryPoints:[path.join(root,'src/mechanisms',id+'-'+part+(part==='state'?'.ts':'.tsx'))],outfile:path.join(out,part+'.cjs'),bundle:true,platform:'node',format:'cjs',external:['react','react-dom'],logLevel:'silent'});
const mod=require(path.join(out,'state.cjs'));const probe=require(path.join(out,'probe.cjs'));
const state=mod.rv01State,Component=probe.RV01Probe;
const draw=f=>renderToStaticMarkup(React.createElement(Component,{frame:f}));
let checks=0;function eq(a,b,label){checks++;assert.deepEqual(a,b,label);}function ok(a,label){checks++;assert.ok(a,label);}

eq(state(0).fields.reduce((s,f)=>s+f.bits,0),32,'field width');
for(const f of [0,300,345,389,390,391,749,750,751,899]){const s=state(f);eq(s.rs1,6,'rs1 frame '+f);eq(s.rs2,7,'rs2 frame '+f);eq(s.opcode,51,'opcode frame '+f);eq(s.rd,f<750?5:9,'rd frame '+f);eq(s.operation,'ADD','op frame '+f);}
eq(state(300).extractProgress,0,'start extraction');eq(state(345).extractProgress,.5,'mid extraction');eq(state(390).extractProgress,1,'end extraction');ok(state(345).tokens[0].x<state(300).tokens[0].x,'actual token motion');
eq(state(749).word^state(750).word,0x600,'only rd bits changed');ok(draw(749).includes('00101'),'old rd actual SVG');ok(draw(750).includes('01001'),'new rd actual SVG');ok(draw(749)!==draw(750),'render binding changes');
console.log('field extraction 300→390; rd change749/750/751; exact R fields and rendered bit-string changes PASS');


for(const f of [749,750,751,850])eq(state(f).fields.find(x=>x.label==='rd').value,f<750?'00101':'01001','top rd bit field '+f);

console.log(JSON.stringify({id,checks,status:'PASS',scope:'technical mechanism only'}));
