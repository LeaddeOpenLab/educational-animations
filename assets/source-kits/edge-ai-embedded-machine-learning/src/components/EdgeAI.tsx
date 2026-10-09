import React from 'react';
import {COLORS, FONT, alpha} from '../theme';
import type {Scale} from './Plot';

// Course-level numerical operations. L3 calls these functions directly and binds
// their returned state to these marks; the same values are available to B1 tests.
export const quantize = (value:number, scale:number, zeroPoint=0, min=-128, max=127) => {
  const unrounded=value/scale+zeroPoint;
  const rounded=Math.round(unrounded);
  const integer=Math.max(min,Math.min(max,rounded));
  return {value,unrounded,rounded,integer,reconstructed:(integer-zeroPoint)*scale,clipped:integer!==rounded};
};
export const calibrate = (samples:number[]) => {
  const min=Math.min(0,...samples), max=Math.max(0,...samples);
  const scale=(max-min)/255 || 1;
  return {min,max,scale,zeroPoint:Math.max(-128,Math.min(127,Math.round(-128-min/scale)))};
};
export const channelScales = (channels:number[][]) => channels.map(c=>Math.max(...c.map(Math.abs))/127 || 1);
export const macState = (inputs:number[],weights:number[],count:number,zeroInput=0,zeroWeight=0) => {
  const products=inputs.map((x,i)=>(x-zeroInput)*(weights[i]-zeroWeight));
  return {products,accumulator:products.slice(0,count).reduce((a,b)=>a+b,0),count};
};
export const windowState = (samples:number[],start:number,size:number) => ({start,end:start+size,values:samples.slice(start,start+size),rms:Math.sqrt(samples.slice(start,start+size).reduce((a,x)=>a+x*x,0)/size)});
export const softmax = (logits:number[],temperature=1) => {
  const exps=logits.map(x=>Math.exp((x-Math.max(...logits))/temperature));
  const total=exps.reduce((a,b)=>a+b,0); return exps.map(x=>x/total);
};
export const classify = (scores:number[],threshold:number) => ({index:scores.indexOf(Math.max(...scores)),score:Math.max(...scores),accepted:Math.max(...scores)>=threshold});
export type TensorAllocation={name:string;offset:number;size:number;start:number;end:number;bank?:'flash'|'ram'};
export const memoryState = (allocations:TensorAllocation[],time:number) => ({allocations:allocations.filter(a=>time>=a.start && time<a.end),liveBytes:allocations.filter(a=>time>=a.start && time<a.end).reduce((n,a)=>n+a.size,0)});
export const energyState = (power:number[],dt:number,count:number) => ({elapsed:Math.min(count,power.length)*dt,energy:power.slice(0,count).reduce((n,p)=>n+p*dt,0)});

type Mark={s:Scale;progress?:number};
const label=(x:number,y:number,text:string,color=COLORS.textStrong,size=25)=><text x={x} y={y} fontSize={size} fontFamily={FONT} fill={color} textAnchor="middle">{text}</text>;

/** Continuous float locations converge to quantized lattice positions. */
export const QuantizedAxis:React.FC<Mark & {values:number[];scale:number;zeroPoint?:number;mix:number;y?:number;min?:number;max?:number}>=({s,values,scale,zeroPoint=0,mix,y=0,progress=1,min=-128,max=127})=><g opacity={progress}>
  <line x1={s.px(s.xDomain[0])} x2={s.px(s.xDomain[1])} y1={s.py(y)} y2={s.py(y)} stroke={COLORS.axis} strokeWidth={3}/>
  {Array.from({length:Math.min(25,Math.ceil((s.xDomain[1]-s.xDomain[0])/scale)+1)},(_,i)=>s.xDomain[0]+i*scale).map((x,i)=><line key={i} x1={s.px(x)} x2={s.px(x)} y1={s.py(y)-8} y2={s.py(y)+8} stroke={COLORS.textDim} strokeWidth={2}/>)}
  {values.map((value,i)=>{const q=quantize(value,scale,zeroPoint,min,max), x=value+(q.reconstructed-value)*mix; return <g key={i}>
    <line x1={s.px(value)} x2={s.px(q.reconstructed)} y1={s.py(y)-42-i*44} y2={s.py(y)-42-i*44} stroke={alpha(COLORS.accent,.6)} strokeDasharray="5 5"/>
    <circle cx={s.px(x)} cy={s.py(y)-42-i*44} r={12} fill={q.clipped?COLORS.warn:COLORS.primary}/>
    {label(s.px(x),s.py(y)-61-i*44,mix<.99?x.toFixed(2):`${q.integer} → ${q.reconstructed.toFixed(2)}`)}
  </g>;})}
</g>;

/** Signed numerical tensor entries set bar lengths; masks remove entire channels. */
export const TensorBars:React.FC<Mark & {values:number[];names?:string[];active?:boolean[];x?:number;y?:number;step?:number;gain?:number;color?:string}>=({s,values,names,active,x=0,y=0,step=1,gain=1,progress=1,color=COLORS.primary})=><g opacity={progress}>
  {values.map((v,i)=>{const visible=active?.[i]!==false,base=s.px(x),end=s.px(x+v*gain);return <g key={i} opacity={visible?1:.16}>
    <rect x={Math.min(base,end)} y={s.py(y-i*step)-15} width={Math.max(2,Math.abs(end-base))} height={30} fill={visible?color:COLORS.warn}/>
    {label(s.px(x)-65,s.py(y-i*step)+8,names?.[i]??`${i}`,COLORS.textMuted)}
    {label(Math.max(base,end)+52,s.py(y-i*step)+8,v.toFixed(2))}
  </g>;})}
</g>;

/** Samples and the selected receptive window occupy the same coordinate scale. */
export const SignalWindow:React.FC<Mark & {samples:number[];start:number;size:number;cursor?:number}>=({s,samples,start,size,cursor,progress=1})=><g opacity={progress}>
  <rect x={s.px(start)} y={s.py(s.yDomain[1])} width={size*s.ux} height={(s.yDomain[1]-s.yDomain[0])*s.uy} fill={alpha(COLORS.accent,.12)} stroke={COLORS.accent} strokeWidth={3}/>
  <polyline points={samples.map((v,i)=>`${s.px(i)},${s.py(v)}`).join(' ')} fill="none" stroke={alpha(COLORS.primary,.5)} strokeWidth={3}/>
  {samples.map((v,i)=><g key={i}><line x1={s.px(i)} x2={s.px(i)} y1={s.py(0)} y2={s.py(v)} stroke={i>=start&&i<start+size?COLORS.accent:COLORS.primary} strokeWidth={4}/><circle cx={s.px(i)} cy={s.py(v)} r={6} fill={COLORS.primary}/></g>)}
  {cursor!==undefined&&<line x1={s.px(cursor)} x2={s.px(cursor)} y1={s.py(s.yDomain[0])} y2={s.py(s.yDomain[1])} stroke={COLORS.result} strokeWidth={3}/>}
</g>;

/** Allocations use byte offsets and sizes; advancing time releases/reuses memory. */
export const TensorMemory:React.FC<Mark & {allocations:TensorAllocation[];time:number;capacity:number;row?:number}>=({s,allocations,time,capacity,row=0,progress=1})=>{const state=memoryState(allocations,time);return <g opacity={progress}>
  <rect x={s.px(0)} y={s.py(row)-36} width={capacity*s.ux} height={72} fill={alpha(COLORS.textDim,.08)} stroke={COLORS.axis} strokeWidth={3}/>
  {state.allocations.map((a,i)=><g key={a.name}><rect x={s.px(a.offset)} y={s.py(row)-33} width={a.size*s.ux} height={66} fill={alpha(a.bank==='flash'?COLORS.alt:COLORS.primary,.7)} stroke={COLORS.textStrong} strokeWidth={2}/>{label(s.px(a.offset+a.size/2),s.py(row)+8,a.name)}</g>)}
  {label(s.px(capacity/2),s.py(row)+80,`${state.liveBytes} bytes live`)}
</g>;};

export type Operator={name:string;device:'cpu'|'delegate';supported:boolean;values:number[]};
/** Partition membership positions operators on device lanes; payload moves on handoff. */
export const OperatorPartitions:React.FC<Mark & {operators:Operator[];current:number;handoff:number;partitioned:boolean}>=({s,operators,current,handoff,partitioned,progress=1})=><g opacity={progress}>
  {['CPU','Delegate'].map((name,row)=><g key={name}><line x1={s.px(0)} x2={s.px(operators.length)} y1={s.py(1-row*2)} y2={s.py(1-row*2)} stroke={COLORS.axis} strokeWidth={3}/>{label(s.px(-.6),s.py(1-row*2)+8,name,COLORS.textMuted,22)}</g>)}
  {operators.map((op,i)=>{const y=partitioned&&op.device==='delegate'?-1:1;return <g key={i}>
    <circle cx={s.px(i+.4)} cy={s.py(y)} r={40} fill={alpha(op.supported?COLORS.primary:COLORS.warn,.2)} stroke={op.supported?COLORS.primary:COLORS.warn} strokeWidth={4}/>
    {label(s.px(i+.4),s.py(y)-54,op.name,COLORS.textStrong,23)}
    {i<=current&&label(s.px(i+.4),s.py(y)+8,op.values.join(','),COLORS.textStrong,19)}
  </g>;})}
  {current<operators.length-1&&(()=>{const from=operators[current],to=operators[current+1];const ya=partitioned&&from.device==='delegate'?-1:1,yb=partitioned&&to.device==='delegate'?-1:1;return <circle cx={s.px(current+.4+handoff)} cy={s.py(ya+(yb-ya)*handoff)} r={13} fill={COLORS.accent}/>;})()}
</g>;

/** Probability mass and threshold share a real numerical axis. */
export const ScoreDistribution:React.FC<Mark & {scores:number[];names:string[];threshold?:number;y?:number;precision?:number}>=({s,scores,names,threshold,y=0,progress=1,precision=2})=><g opacity={progress}>
  {scores.map((v,i)=><g key={i}><rect x={s.px(i)-28} y={s.py(y+v)} width={56} height={Math.abs(v*s.uy)} fill={threshold!==undefined&&v>=threshold?COLORS.result:COLORS.primary}/>{label(s.px(i),s.py(y+v)-18,v.toFixed(precision))}{label(s.px(i),s.py(y)+34,names[i],COLORS.textMuted,22)}</g>)}
  {threshold!==undefined&&<><line x1={s.px(-.5)} x2={s.px(scores.length-.5)} y1={s.py(y+threshold)} y2={s.py(y+threshold)} stroke={COLORS.accent} strokeWidth={3} strokeDasharray="8 6"/>{label(s.px(scores.length-1),s.py(y+threshold)-20,`threshold ${threshold.toFixed(precision)}`,COLORS.accent,22)}</>}
</g>;

/** Power sample areas accumulate actual energy, rather than an illustrative gauge. */
export const EnergyTimeline:React.FC<Mark & {power:number[];dt:number;count:number}>=({s,power,dt,count,progress=1})=>{const state=energyState(power,dt,count);return <g opacity={progress}>
  {power.map((p,i)=><rect key={i} x={s.px(i*dt)} y={s.py(p)} width={Math.max(1,s.ux*dt-2)} height={p*s.uy} fill={i<count?alpha(COLORS.accent,.55):alpha(COLORS.primary,.16)} stroke={COLORS.primary}/>)}
  <line x1={s.px(state.elapsed)} x2={s.px(state.elapsed)} y1={s.py(0)} y2={s.py(s.yDomain[1])} stroke={COLORS.result} strokeWidth={3}/>
  {label(s.px((s.xDomain[0]+s.xDomain[1])/2),s.py(s.yDomain[1])-20,`${state.elapsed.toFixed(1)} ms · ${state.energy.toFixed(1)} µJ`)}
</g>;};
