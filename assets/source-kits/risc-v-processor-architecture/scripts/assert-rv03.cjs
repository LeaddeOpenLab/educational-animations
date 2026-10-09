const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
const esbuild=require('esbuild');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const id='rv03';
const root=path.resolve(__dirname,'..');
const out=path.join(root,'out/b1',id);fs.mkdirSync(out,{recursive:true});
for(const part of ['state','probe'])esbuild.buildSync({entryPoints:[path.join(root,'src/mechanisms',id+'-'+part+(part==='state'?'.ts':'.tsx'))],outfile:path.join(out,part+'.cjs'),bundle:true,platform:'node',format:'cjs',external:['react','react-dom'],logLevel:'silent'});
const mod=require(path.join(out,'state.cjs'));const probe=require(path.join(out,'probe.cjs'));
const state=mod.rv03State,Component=probe.RV03Probe;
const draw=f=>renderToStaticMarkup(React.createElement(Component,{frame:f}));
let checks=0;function eq(a,b,label){checks++;assert.deepEqual(a,b,label);}function ok(a,label){checks++;assert.ok(a,label);}

eq(mod.decodeI(mod.RV03.iWord),-4,'I decode');eq(mod.decodeS(mod.RV03.sWord),12,'S decode');eq(mod.decodeB(mod.RV03.bWord),16,'B decode');eq(mod.signExtend(0x800,12),-2048,'negative sign boundary');
for(const f of [0,209,210,211,510,539,540,541,690,719,720,721,899]){const s=state(f);eq(s.iOutput,f>=210?-4:null,'I frame '+f);eq(s.sOutput,f>=540?12:null,'S frame '+f);eq(s.bOutput,f>=720?16:null,'B frame '+f);eq(s.bLowZero,f>=720,'fixed zero appears on assemble');}
eq(state(209).upperBits,'','before sign replication');eq(state(210).upperBits,'1'.repeat(20),'sign copied20times');eq(state(510).sProgress,.5,'S join midpoint');eq(state(690).bProgress,.5,'B reorder midpoint');eq(state(720).bParts.map(p=>p.value).join(''),'0000000010000','actual branch bit pattern');ok(state(690).bTokens[1].x!==state(660).bTokens[1].x,'inst7 copy moves to imm11 location');ok(draw(209)!==draw(210),'actual upper bits change');ok(draw(539)!==draw(540),'S positions bind');ok(draw(719)!==draw(720),'B zero token and completion bind');
console.log('I sign209/210/211; S join539/540/541; B permutation719/720/721; computed outputs -4,12,16 PASS');
console.log(JSON.stringify({id,checks,status:'PASS',scope:'technical mechanism only'}));
