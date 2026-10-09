import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha,fadeIn} from '../theme';
import type {SceneDef} from '../Video';
import {footprintState} from '../mechanisms/edge08-footprint-state';
const T={title:'Flash and RAM are separate budgets',flash:'FLASH',ram:'RAM'};
const DESIGN_AUDIT={
 visualArgument:'Weight bytes shrink in the flash bank while independently sized runtime allocations remain unchanged in RAM.',
 motion:'Four-byte weight tiles become one-byte tiles; flash segments shrink and the RAM allocation sequence still reaches the same peak.',
 example:'256 KiB weights plus 32 KiB other flash become 64 plus 32; RAM remains 16+80+24+8=128 KiB.',
 antiTemplate:'Two physical resource ledgers and byte-density changes make this different from arena lifetime reuse and pruning dimensions.',
 sceneRationale:'Four scenes distinguish the banks, transform only weight storage, inspect unchanged runtime allocations, and compare the two independent totals.'
};
const Canvas:React.FC<{heading:string;copy:string[];note:string;children:React.ReactNode}>=({heading,copy,note,children})=>{const f=useCurrentFrame();return <div data-root style={{height:'100%',boxSizing:'border-box',padding:'110px 108px',display:'grid',gridTemplateColumns:'610px 960px',gap:132,alignItems:'center',background:COLORS.bg0,fontFamily:FONT}}><article><div data-k="text" style={{opacity:fadeIn(f,2,12),fontSize:22,color:COLORS.primary,letterSpacing:3}}>EDGE AI · STORAGE</div><h1 data-k="text" style={{opacity:fadeIn(f,12,15),fontSize:55,lineHeight:1.18,margin:'30px 0 42px',color:COLORS.textStrong}}>{heading}</h1>{copy.map((t,i)=><p data-k="text" key={t} style={{opacity:fadeIn(f,24+i*10,14),fontSize:30,lineHeight:1.45,margin:'0 0 28px',color:COLORS.textMuted}}>{t}</p>)}<p data-k="text" style={{opacity:fadeIn(f,45,14),fontSize:23,lineHeight:1.45,color:COLORS.accent,marginTop:45}}>{note}</p></article><article style={{opacity:fadeIn(f,12,15)}}>{children}</article></div>};
const BanksChart:React.FC<{frame:number}>=({frame})=>{
 const v=footprintState(frame);
 return <svg data-k="figure" width={960} height={600} viewBox="0 0 960 600">{[{name:T.flash,parts:v.flash,total:v.flashTotal,y:75},{name:T.ram,parts:v.ram,total:v.ramTotal,y:345}].map(bank=><g key={bank.name}><text x={20} y={bank.y-30} fontSize={29} fill={COLORS.textStrong}>{bank.name} · {bank.total} KiB</text><rect x={20} y={bank.y} width={865} height={80} fill="none" stroke={COLORS.axis} strokeWidth={2}/>{bank.parts.map((p,i)=>{const before=bank.parts.slice(0,i).reduce((n,x)=>n+x.size,0);return <g key={p.name}><rect x={20+before*3} y={bank.y} width={p.size*3} height={80} fill={alpha([COLORS.primary,COLORS.alt,COLORS.accent,COLORS.result][i],.75)} stroke={COLORS.bg0} strokeWidth={3}/><text x={20+(i%2)*445} y={bank.y+128+Math.floor(i/2)*50} fill={COLORS.textMuted} fontSize={27}>{p.name}: {p.size} KiB</text></g>;})}</g>)}</svg>;
};
const Banks:React.FC<{frame:number}>=({frame})=><Canvas heading={T.title} copy={['Flash stores model data and code.','RAM holds inputs, activations, scratch space, and persistent state.']} note="Illustrative memory sizes, not a device benchmark."><BanksChart frame={frame}/></Canvas>;
const Weights:React.FC<{frame:number}>=({frame})=>{
 const v=footprintState(180+frame);
 return <Canvas heading="Four bytes become one" copy={['Weight-only quantization reduces stored weights from 256 to 64 KiB.','Other flash data stays at 32 KiB.']} note={`Total flash: ${v.flashTotal} KiB · not simply divided by four`}><div><svg data-k="figure" width={960} height={210} viewBox="0 0 960 210"><text x={20} y={45} fill={COLORS.textStrong} fontSize={29}>ONE STORED WEIGHT</text>{Array.from({length:v.bytesPerWeight},(_,i)=><g key={i}><rect x={30+i*155} y={85} width={135} height={80} rx={8} fill={COLORS.alt}/><text x={62+i*155} y={135} fontSize={27} fill={COLORS.bg0}>8 bits</text></g>)}<text x={690} y={135} fill={COLORS.accent} fontSize={35}>{v.bytesPerWeight} byte{v.bytesPerWeight===1?'':'s'}</text></svg><BanksChart frame={180+frame}/></div></Canvas>;
};
const Runtime:React.FC<{frame:number}>=({frame})=>{
 const v=footprintState(420+frame),count=Math.min(4,1+Math.floor(frame/42));
 const live=v.ram.slice(0,count),total=live.reduce((n,p)=>n+p.size,0);
 return <Canvas heading="Working memory has its own cost" copy={['These runtime allocations are unchanged by the weight-only conversion.','The same workload still reaches 128 KiB.']} note="Activation types and kernel workspace affect RAM."><svg data-k="figure" width={960} height={700} viewBox="0 0 960 700"><text x={20} y={50} fontSize={31} fill={COLORS.textStrong}>RAM ALLOCATION EXAMPLE</text>{v.ram.map((p,i)=><g key={p.name}><text x={20} y={135+i*115} fill={COLORS.textMuted} fontSize={28}>{p.name}</text><rect x={230} y={91+i*115} width={p.size*7.6} height={67} fill={i<count?alpha([COLORS.primary,COLORS.alt,COLORS.accent,COLORS.result][i],.7):'none'} stroke={COLORS.axis}/><text x={250+p.size*7.6} y={136+i*115} fill={COLORS.textStrong} fontSize={28}>{i<count?`${p.size} KiB`:'—'}</text></g>)}<text x={20} y={640} fill={COLORS.result} fontSize={36}>Allocated: {total} KiB</text></svg></Canvas>;
};
const Budget:React.FC<{frame:number}>=({frame})=>{
 const before=footprintState(0),after=footprintState(690+frame);
 return <Canvas heading="Measure both budgets" copy={['Flash drops from 288 to 96 KiB.','RAM remains 128 KiB in this weight-only example.']} note="A smaller model file does not prove RAM will fit."><svg data-k="figure" width={960} height={650} viewBox="0 0 960 650">{[{label:'FLASH',a:before.flashTotal,b:after.flashTotal,y:80},{label:'RAM',a:before.ramTotal,b:after.ramTotal,y:370}].map(x=><g key={x.label}><text x={20} y={x.y-35} fill={COLORS.textStrong} fontSize={30}>{x.label} · before / after</text><rect x={20} y={x.y} width={x.a*2.7} height={65} fill={alpha(COLORS.textMuted,.5)}/><text x={40} y={x.y+43} fill={COLORS.textStrong} fontSize={30}>{x.a} KiB</text><rect x={20} y={x.y+95} width={x.b*2.7} height={65} fill={alpha(COLORS.result,.7)}/><text x={40} y={x.y+138} fill={COLORS.textStrong} fontSize={30}>{x.b} KiB</text></g>)}</svg></Canvas>;
};
export const SCENES:SceneDef[]=[{id:'banks',Comp:Banks,dur:180},{id:'weights',Comp:Weights,dur:240},{id:'runtime',Comp:Runtime,dur:270},{id:'budget',Comp:Budget,dur:180}];
