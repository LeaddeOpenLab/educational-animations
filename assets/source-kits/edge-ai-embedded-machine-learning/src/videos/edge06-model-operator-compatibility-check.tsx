import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha,fadeIn} from '../theme';
import type {SceneDef} from '../Video';
import {operatorState} from '../mechanisms/edge06-operator-state';
const T={name:'Operator compatibility',input:'Input tensor',output:'Inference output'};
const DESIGN_AUDIT={
 visualArgument:'The unresolved operator leaves real output cells empty; inserting its kernel allows multiply then rectification to fill them.',
 motion:'A requirement searches the registry, a missing slot is filled, and concrete tensor values are evaluated in order.',
 example:'MUL [2,-1,3] by [1,2,1], then RELU yields [2,0,3].',
 antiTemplate:'Registry membership and a blocked tensor evaluation differ from byte reuse, channel pruning, and probability learning.',
 sceneRationale:'Four scenes separate required capabilities, the consequence of the missing kernel, explicit repair, and the resulting tensor calculation.'
};
const Page:React.FC<{title:string;copy:string[];note:string;children:React.ReactNode}>=({title,copy,note,children})=>{const f=useCurrentFrame();return <div data-root style={{height:'100%',boxSizing:'border-box',padding:'110px 108px',display:'grid',gridTemplateColumns:'610px 960px',gap:132,alignItems:'center',background:COLORS.bg0,fontFamily:FONT}}><div><div data-k="text" style={{opacity:fadeIn(f,2,12),color:COLORS.primary,fontSize:22,letterSpacing:3}}>EDGE AI · RUNTIME</div><h1 data-k="text" style={{opacity:fadeIn(f,12,15),fontSize:55,lineHeight:1.18,color:COLORS.textStrong,margin:'30px 0 42px'}}>{title}</h1>{copy.map((t,i)=><p data-k="text" key={t} style={{opacity:fadeIn(f,24+i*10,14),fontSize:30,lineHeight:1.45,color:COLORS.textMuted,margin:'0 0 28px'}}>{t}</p>)}<p data-k="text" style={{opacity:fadeIn(f,45,14),fontSize:23,lineHeight:1.45,color:COLORS.accent,marginTop:45}}>{note}</p></div><div style={{opacity:fadeIn(f,12,15)}}>{children}</div></div>};
const Registry:React.FC<{frame:number;attempt?:boolean}>=({frame,attempt=false})=>{
 const s=operatorState(frame),scan=attempt?Math.min(1,(frame-180)/80):0;
 return <svg data-k="figure" viewBox="0 0 960 620" width={960} height={620} style={{fontFamily:FONT}}>
  <text x={30} y={50} fill={COLORS.textStrong} fontSize={29}>MODEL REQUIRES</text><text x={525} y={50} fill={COLORS.textStrong} fontSize={29}>RUNTIME REGISTRY</text>
  {s.required.map((name,i)=><g key={name}><rect x={30} y={105+i*170} width={255} height={95} rx={14} fill={alpha(COLORS.primary,.17)} stroke={COLORS.primary} strokeWidth={3}/><text x={70} y={164+i*170} fontSize={33} fill={COLORS.textStrong}>{name}</text><line x1={300} x2={505} y1={152+i*170} y2={152+i*170} stroke={s.registry.includes(name)?COLORS.result:COLORS.warn} strokeWidth={4} strokeDasharray={s.registry.includes(name)?undefined:'9 9'}/><rect x={525} y={105+i*170} width={355} height={95} rx={14} fill={s.registry.includes(name)?alpha(COLORS.result,.15):'none'} stroke={s.registry.includes(name)?COLORS.result:COLORS.warn} strokeWidth={3}/><text x={555} y={164+i*170} fontSize={30} fill={s.registry.includes(name)?COLORS.result:COLORS.warn}>{s.registry.includes(name)?`${name} kernel`:'No kernel'}</text></g>)}
  {attempt&&<g transform={`translate(${scan*65} 0)`}><rect x={315} y={445} width={255} height={82} rx={12} fill={alpha(COLORS.warn,.12)} stroke={COLORS.warn} strokeWidth={3}/><text x={350} y={496} fill={COLORS.warn} fontSize={27}>Unresolved: RELU</text></g>}
  {!attempt&&<text x={35} y={505} fill={COLORS.textMuted} fontSize={26}>{s.prepared?'Both required operators resolve.':'A model file is not a kernel implementation.'}</text>}
 </svg>;
};
const Requirements:React.FC<{frame:number}>=({frame})=><Page title={T.name} copy={['A model names the operations it needs.','The runtime must provide a compatible kernel for each one.']} note="Example model: MUL → RELU"><Registry frame={frame}/></Page>;
const Unresolved:React.FC<{frame:number}>=({frame})=>{
 const s=operatorState(180+frame);
 return <Page title="No kernel. No output." copy={['RELU is missing from this runtime build.','Preparation stops before the model can run.']} note="Output remains empty, not partially valid."><div><Registry frame={180+frame} attempt/><svg data-k="figure" viewBox="0 0 960 110" width={960} height={110}><text x={30} y={55} fontSize={28} fill={COLORS.textMuted}>Output</text>{[0,1,2].map(i=><g key={i}><rect x={235+i*160} y={5} width={125} height={80} fill="none" stroke={COLORS.axis}/><text x={285+i*160} y={57} fill={COLORS.textStrong} fontSize={35}>{s.output[i]??'—'}</text></g>)}</svg></div></Page>;
};
const Register:React.FC<{frame:number}>=({frame})=><Page title="Supply the missing kernel" copy={['Register a compatible RELU implementation.','Then prepare the model again.']} note="Also check dtype, shape, and operator version."><Registry frame={390+frame}/></Page>;
const Execute:React.FC<{frame:number}>=({frame})=>{
 const s=operatorState(630+frame);
 const rows=[{name:'Input',values:s.input,detail:'× [1, 2, 1]',color:COLORS.primary},{name:'MUL',values:s.intermediate,detail:'Clamp negatives to zero',color:COLORS.accent},{name:'RELU',values:s.output,detail:'Actual model output',color:COLORS.result}];
 return <Page title="Now the values can flow" copy={['MUL creates [2, −2, 3].','RELU replaces the negative value with zero.']} note="Inference output: [2, 0, 3]"><svg data-k="figure" viewBox="0 0 960 650" width={960} height={650}>{rows.map((row,r)=><g key={row.name}><text x={20} y={75+r*205} fill={row.color} fontSize={31}>{row.name}</text>{[0,1,2].map(i=><g key={i}><rect x={205+i*190} y={20+r*205} width={150} height={100} rx={14} fill={alpha(row.color,.18)} stroke={row.color} strokeWidth={3}/><text x={265+i*190} y={86+r*205} fontSize={43} fill={COLORS.textStrong}>{row.values[i]??'—'}</text></g>)}<text x={210} y={169+r*205} fontSize={25} fill={COLORS.textMuted}>{row.detail}</text></g>)}</svg></Page>;
};
export const SCENES:SceneDef[]=[{id:'requirements',Comp:Requirements,dur:180},{id:'unresolved',Comp:Unresolved,dur:210},{id:'register',Comp:Register,dur:240},{id:'execute',Comp:Execute,dur:270}];
