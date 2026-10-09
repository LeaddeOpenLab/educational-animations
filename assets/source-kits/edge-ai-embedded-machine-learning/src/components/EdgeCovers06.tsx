import React from 'react';
import {COLORS,FONT,alpha} from '../theme';
import type {Scale} from './Plot';
import {TensorBars,TensorMemory,ScoreDistribution} from './EdgeAI';
const label=(x:number,y:number,t:string,size=25,color=COLORS.textStrong)=><text x={x} y={y} fontSize={size} fontFamily={FONT} fill={color} textAnchor="middle">{t}</text>;
const scale=(x:number,y:number,ux:number,uy:number):Scale=>({width:640,height:620,xDomain:[0,10],yDomain:[-10,10],px:v=>x+v*ux,py:v=>y-v*uy,ux,uy,pad:{l:0,r:0,t:0,b:0},zeroX:x,zeroY:y});
const OperatorCover:React.FC=()=>{
 const s=scale(225,420,75,58);
 return <svg width={640} height={620} viewBox="0 0 640 620">
  {label(320,82,'REGISTER THE MISSING KERNEL',24,COLORS.accent)}
  {['MUL','RELU'].map((op,i)=><g key={op}><rect x={40} y={120+i*115} width={175} height={75} rx={13} fill={alpha(COLORS.primary,.18)} stroke={COLORS.primary} strokeWidth={3}/>{label(127,167+i*115,op,28)}<line x1={235} x2={325} y1={157+i*115} y2={157+i*115} stroke={COLORS.result} strokeWidth={4}/><rect x={350} y={120+i*115} width={250} height={75} rx={13} fill={alpha(COLORS.result,.15)} stroke={COLORS.result} strokeWidth={3}/>{label(475,167+i*115,`${op} kernel`,27,COLORS.result)}</g>)}
  {label(320,364,'RELU OUTPUT · [2, 0, 3]',27)}
  <TensorBars s={s} values={[2,0,3]} names={['x₀','x₁','x₂']} y={0} step={1} color={COLORS.result} progress={1}/>
 </svg>;
};
const ArenaCover:React.FC=()=>{
 const s=scale(40,210,560/96,200);
 const allocations=[{name:'A',offset:0,size:64,start:0,end:2},{name:'B',offset:64,size:32,start:1,end:4},{name:'C',offset:0,size:64,start:2,end:4}];
 return <svg width={640} height={620} viewBox="0 0 640 620">
  {label(320,82,'SAME BYTES · NEW OWNER',27,COLORS.accent)}
  {label(320,145,'t < 2 · A and B are live',25)}
  <TensorMemory s={s} allocations={allocations} time={1.5} capacity={96} progress={1}/>
  <path d="M170 316 L170 348 L152 333 M170 348 L188 333" fill="none" stroke={COLORS.result} strokeWidth={4}/>
  {label(380,340,'A expires → C starts',24,COLORS.result)}
  {label(320,385,'t = 2 · C reuses A’s offset',25)}
  <TensorMemory s={scale(40,450,560/96,200)} allocations={allocations} time={2} capacity={96} progress={1}/>
  {label(320,570,'ARENA CAPACITY: 96 B',28,COLORS.result)}
 </svg>;
};
const FootprintCover:React.FC=()=>{
 return <svg width={640} height={620} viewBox="0 0 640 620"><g transform="translate(-27,0)">
  {label(320,76,'WEIGHT-ONLY QUANTIZATION',26,COLORS.accent)}
  {label(320,138,'FLASH · KiB',28,COLORS.alt)}
  <TensorBars s={scale(180,205,1.2,80)} values={[288,96]} names={['Before','After']} color={COLORS.alt} progress={1}/>
  {label(320,355,'RAM · KiB',28,COLORS.primary)}
  <TensorBars s={scale(180,420,1.2,80)} values={[128,128]} names={['Before','After']} color={COLORS.primary} progress={1}/>
  {label(320,570,'Working memory stays 128 KiB',25,COLORS.result)}
 </g></svg>;
};
const PruningCover:React.FC=()=>{
 const features=[2,1,3],weights=[[1,2,1],[0,1,2]];
 return <svg width={640} height={620} viewBox="0 0 640 620">
  {label(320,78,'REMOVE THE MATCHING SLICE',26,COLORS.accent)}
  {label(320,133,'4 → 3 channels · 2×4 → 2×3',27)}
  {[0,2,3].map((c,i)=><g key={c}>{label(165+i*150,187,`c${c}`,24,COLORS.primary)}<rect x={110+i*150} y={210} width={110} height={66} fill={alpha(COLORS.primary,.45)} stroke={COLORS.primary} strokeWidth={2}/>{label(165+i*150,253,String(features[i]),30)}<line x1={165+i*150} x2={165+i*150} y1={286} y2={319} stroke={COLORS.axis} strokeWidth={3}/>{weights.map((row,r)=><g key={r}><rect x={110+i*150} y={330+r*74} width={110} height={60} fill={alpha(COLORS.alt,.35)} stroke={COLORS.alt} strokeWidth={2}/>{label(165+i*150,370+r*74,String(row[i]),29)}</g>)}</g>)}
  {label(320,505,'8 → 6 multiply terms',27,COLORS.result)}
  <TensorBars s={scale(260,552,30,30)} values={[7]} names={['Output']} y={0} color={COLORS.result} progress={1}/>
 </svg>;
};
const DistillationCover:React.FC=()=>{
 const names=['Cat','Dog','Bird'];
 return <svg width={640} height={620} viewBox="0 0 640 620">
  {label(320,76,'FIXED TEACHER → SMALL STUDENT',25,COLORS.accent)}
  {label(320,130,'Teacher · fixed soft targets',25,COLORS.alt)}
  <ScoreDistribution s={scale(140,282,180,160)} scores={[.65,.25,.10]} names={names} progress={1}/>
  <path d="M320 333 L320 366 L302 349 M320 366 L338 349" fill="none" stroke={COLORS.accent} strokeWidth={4}/>
  {label(320,405,'Student · learned distribution',25,COLORS.primary)}
  <ScoreDistribution s={scale(140,535,180,135)} scores={[.60,.27,.13]} names={names} progress={1}/>
 </svg>;
};
export const EDGE_COVERS_06:Record<string,React.FC>={
 'model-operator-compatibility-check':OperatorCover,
 'memory-arena-planning-for-tensor-lifetimes':ArenaCover,
 'flash-and-ram-model-footprint':FootprintCover,
 'structured-pruning-for-edge-deployment':PruningCover,
 'knowledge-distillation-to-a-small-model':DistillationCover
};
