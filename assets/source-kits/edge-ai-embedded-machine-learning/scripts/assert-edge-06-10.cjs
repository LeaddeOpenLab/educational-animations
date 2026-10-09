const assert=require('node:assert/strict');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {operatorState,OperatorCore}=require('../src/mechanisms/edge06-operator-state.tsx');
const {arenaState,ArenaCore}=require('../src/mechanisms/edge07-arena-state.tsx');
const {footprintState,FootprintCore}=require('../src/mechanisms/edge08-footprint-state.tsx');
const {pruningState,PruningCore}=require('../src/mechanisms/edge09-pruning-state.tsx');
const {distillationState,DistillationCore}=require('../src/mechanisms/edge10-distillation-state.tsx');
let checks=0;
const check=(ok,label)=>{assert.ok(ok,label);checks++;};
const equal=(actual,expected,label)=>{assert.deepEqual(actual,expected,label);checks++;};
const markup=(C,frame)=>renderToStaticMarkup(React.createElement(C,{frame}));
for(const f of [0,200,449]){const s=operatorState(f);equal(s.output,[],`edge06 frame ${f} output must be empty`);check(!s.prepared,`edge06 frame ${f} registry incomplete`);}
for(const f of [450,451,689]){check(operatorState(f).prepared,`edge06 frame ${f} prepared`);equal(operatorState(f).intermediate,[],`edge06 frame ${f} before multiplication`);}
equal(operatorState(690).intermediate,[2,-2,3],'edge06 MUL boundary');equal(operatorState(779).output,[],'edge06 before RELU');equal(operatorState(780).output,[2,0,3],'edge06 RELU boundary');equal(operatorState(899).output,[2,0,3],'edge06 after output');check(markup(OperatorCore,449)!==markup(OperatorCore,450),'edge06 kernel card changes');check(markup(OperatorCore,779)!==markup(OperatorCore,780),'edge06 actual output cells change');
for(const f of [0,210,420,539,540,541,899]){const s=arenaState(f);for(let i=0;i<s.allocations.length;i++)for(let j=i+1;j<s.allocations.length;j++){const a=s.allocations[i],b=s.allocations[j];check(a.offset+a.size<=b.offset||b.offset+b.size<=a.offset,`edge07 frame ${f}: live byte ranges overlap`);}check(s.liveBytes<=96,`edge07 frame ${f} capacity`);}
equal(arenaState(539).allocations.map(a=>a.name),['A','B'],'edge07 before boundary');equal(arenaState(540).allocations.map(a=>a.name),['B','C'],'edge07 exact boundary');equal(arenaState(541).allocations.map(a=>a.name),['B','C'],'edge07 after boundary');check(markup(ArenaCore,539).includes('>A<'),'edge07 A visible before');check(markup(ArenaCore,539)!==markup(ArenaCore,540),'edge07 live arena contents and cursor change');
for(const f of [0,180,299,300,301,600,869]){const s=footprintState(f);equal(s.ramTotal,128,`edge08 frame ${f} RAM constant`);equal(s.flashTotal,f<300?288:96,`edge08 frame ${f} flash sum`);equal(s.bytesPerWeight,f<300?4:1,`edge08 frame ${f} bytes per weight`);}
check(markup(FootprintCore,299).includes('665.6'),'edge08 old weight geometry');check(markup(FootprintCore,300).includes('166.4'),'edge08 new weight geometry');
equal(pruningState(449).shape,[2,4],'edge09 before removal');equal(pruningState(450).shape,[2,3],'edge09 removal');equal(pruningState(451).indices,[0,2,3],'edge09 removed c1');equal(pruningState(540).positions,[0,1.5,2.5],'edge09 compaction midpoint');equal(pruningState(630).positions,[0,1,2],'edge09 compaction end');equal(pruningState(450).weights,[[1,2,1],[0,1,2]],'edge09 matching weight column removed');equal(pruningState(929).output,[7,7],'edge09 output recomputed');equal(pruningState(929).terms,6,'edge09 terms');check(Math.abs(pruningState(0).output[0]-7.02)<1e-9,'edge09 original output 0');check(Math.abs(pruningState(0).output[1]-7.03)<1e-9,'edge09 original output 1');check(markup(PruningCore,449)!==markup(PruningCore,450),'edge09 actual cell removal');check(markup(PruningCore,450)!==markup(PruningCore,630),'edge09 actual compaction coordinates');
let previous=10;
for(const f of [0,359,360,361,415,470,580,689,690,719,720,721,899]){const s=distillationState(f);equal(s.teacher,[.65,.25,.1],`edge10 frame ${f} frozen teacher`);check(Math.abs(s.student.reduce((a,b)=>a+b,0)-1)<1e-9,`edge10 frame ${f} normalization`);check(s.gap<=previous+1e-9,`edge10 frame ${f} decreasing gap`);previous=s.gap;}
equal(distillationState(690).student,[.6,.27,.13],'edge10 final student');check(!distillationState(719).deployed&&distillationState(720).deployed,'edge10 deployment boundary');check(markup(DistillationCore,360)!==markup(DistillationCore,690),'edge10 student probability heights and parameter geometry change');
console.log(JSON.stringify({status:'PASS',checks,records:['recvw25vjM41mv','recvw25vjMwJp0','recvw25vjMBlJD','recvw25vjM9Ca5','recvw25vjM2GBi'],scope:'same per-frame functions consumed by visible core components; before/mid/after/boundary assertions; SSR visible geometry checks'}));
