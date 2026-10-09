const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const esbuild=require('esbuild');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const id='rv04';
const root=path.resolve(__dirname,'..');
const out=path.join(root,'out/b1',id);fs.mkdirSync(out,{recursive:true});
for(const part of ['state','probe'])esbuild.buildSync({entryPoints:[path.join(root,'src/mechanisms',id+'-'+part+(part==='state'?'.ts':'.tsx'))],outfile:path.join(out,part+'.cjs'),bundle:true,platform:'node',format:'cjs',external:['react','react-dom'],logLevel:'silent'});
const mod=require(path.join(out,'state.cjs'));const probe=require(path.join(out,'probe.cjs'));
const state=mod.rv04State,Component=probe.RV04Probe;
const draw=f=>renderToStaticMarkup(React.createElement(Component,{frame:f}));
let checks=0;function eq(a,b,label){checks++;assert.deepEqual(a,b,label);}function ok(a,label){checks++;assert.ok(a,label);}

for(const f of [0,119,120,121,329,330,331,569,570,571,899]){const s=state(f);eq(s.a,12,'A fixed');eq(s.b,5,'B fixed');eq(s.opcode,51,'common opcode');eq(s.result,f<120?null:f<330?17:f<570?7:9,'computed result frame '+f);}
eq(state(329).funct7,0,'add funct7');eq(state(330).funct7,32,'sub funct7');eq(state(570).funct3,4,'xor funct3');eq(state(570).resultBits.join(''),'1001','xor output bits');eq(mod.aluDecode(mod.RV04.addWord,12,5).result,17,'add');eq(mod.aluDecode(mod.RV04.subWord,12,5).result,7,'sub');eq(mod.aluDecode(mod.RV04.xorWord,12,5).result,9,'xor');
ok(draw(329)!==draw(330),'operator and result SVG change');ok(draw(569)!==draw(570),'XOR bit rows change');ok(draw(570).includes('1001'),'actual output bit string bound');
console.log('ADD119/120/121; SUB329/330/331; XOR569/570/571; fixed12/5 produce17/7/9 PASS');
console.log(JSON.stringify({id,checks,status:'PASS',scope:'technical mechanism only'}));
