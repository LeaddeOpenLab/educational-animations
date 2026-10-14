import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import { pointOnPath } from './MotionActions';

const clamp = (x:number) => Math.max(0, Math.min(1,x));
export const ionTransit = (open:number, transit:number, direction:'in'|'out'='in') => {
  const p = open > 0 ? clamp(transit) : 0;
  return {p, offset:(direction==='in'?1:-1)*(-110+220*p), owner:p===0?'source':p===1?'target':'transit', gap:8+38*clamp(open)};
};
export const IonTransit:React.FC<{x:number;y:number;open:number;transit:number;direction?:'in'|'out';ion?:string;progress?:number}> = ({x,y,open,transit,direction='in',ion='K⁺',progress=1}) => {
  const state=ionTransit(open,transit,direction);
  return <g opacity={progress}>
    <path d={`M ${x-160} ${y-22} H ${x-36} M ${x+36} ${y-22} H ${x+160} M ${x-160} ${y+22} H ${x-36} M ${x+36} ${y+22} H ${x+160}`} stroke={COLORS.primary} strokeWidth={8}/>
    <rect x={x-45} y={y-44} width={20} height={88} rx={8} fill={COLORS.result}/><rect x={x+25} y={y-44} width={20} height={88} rx={8} fill={COLORS.result}/>
    <path d={`M ${x-25} ${y} H ${x-state.gap/2} M ${x+state.gap/2} ${y} H ${x+25}`} stroke={COLORS.result} strokeWidth={12}/>
    <circle cx={x} cy={y+state.offset} r={20} fill={COLORS.accent}/>
    <text x={x} y={y+state.offset+7} textAnchor="middle" fill={COLORS.bg0} fontFamily={FONT} fontSize={19}>{ion}</text>
  </g>;
};

export const ligandState = (release:number,binding:number,clearance=0,count=6) => {
  const r=clamp(release), b=r===1?clamp(binding):0, c=clamp(clearance);
  return Array.from({length:count},(_,i)=>({
    x: r<1? -130+130*r:160*b,
    y:(i-(count-1)/2)*35,
    bound:b===1 && c < (i+1)/count,
    visible:c < (i+1)/count,
    owner:c >= (i+1)/count?'cleared':r===0?'vesicle':b===1?'receptor':'cleft'
  }));
};
export const ChemicalSynapse:React.FC<{x:number;y:number;release:number;binding:number;clearance?:number;count?:number;progress?:number}> = ({x,y,release,binding,clearance=0,count=6,progress=1}) => {
  const ligands=ligandState(release,binding,clearance,count);
  return <g transform={`translate(${x} ${y})`} opacity={progress}>
    <rect x={-230} y={-160} width={230} height={320} rx={45} fill={alpha(COLORS.primary,.15)} stroke={COLORS.primary} strokeWidth={4}/>
    <path d="M 180 -180 V 180" stroke={COLORS.result} strokeWidth={12}/>
    {release<1 && <circle cx={-130+100*clamp(release)} cy={0} r={125*(1-.1*clamp(release))} fill="none" stroke={COLORS.accent} strokeWidth={3}/>}
    {ligands.map((a,i)=><g key={i}>
      <path d={`M 160 ${a.y-13} H 185 V ${a.y+13} H 160`} fill="none" stroke={a.bound?COLORS.accent:COLORS.result} strokeWidth={7}/>
      {a.visible && <circle cx={a.x} cy={a.y} r={9} fill={COLORS.accent}/>}
      {a.bound && <circle cx={220} cy={a.y} r={7} fill={COLORS.result}/>}
    </g>)}
  </g>;
};

export type VoltageParams={rest:number;threshold:number;peak:number;onset:number;dur:number;undershoot?:number};
export const voltageAt = (t:number,{rest,threshold,peak,onset,dur,undershoot=12}:VoltageParams) => {
  if(t<=onset)return rest;
  const u=(t-onset)/dur;
  if(u<=.12)return rest+(threshold-rest)*u/.12;
  if(u<=.34)return threshold+(peak-threshold)*(u-.12)/.22;
  if(u<=.62)return peak+(rest-peak)*(u-.34)/.28;
  if(u<=.84)return rest-undershoot*Math.sin((u-.62)/.22*Math.PI);
  return rest;
};
export type SynapticInput={amp:number;at:number;label?:string;excitatory?:boolean};
export const sumPotential=(t:number,inputs:SynapticInput[],rest=-70,tau=6) => inputs.reduce((v,i)=>v+(t<i.at?0:i.amp*Math.exp(-(t-i.at)/tau)),rest);
export const circuitState=(points:{x:number;y:number}[],travel:number) => ({...pointOnPath(points,clamp(travel)),arrived:clamp(travel)===1});
export const CircuitSignal:React.FC<{points:{x:number;y:number}[];travel:number;labels?:string[];color?:string;progress?:number}> = ({points,travel,labels=[],color=COLORS.primary,progress=1}) => {
  const state=circuitState(points,travel);
  return <g opacity={progress}>
    <polyline points={points.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke={alpha(color,.45)} strokeWidth={7}/>
    {points.map((p,i)=><g key={i}><circle cx={p.x} cy={p.y} r={22} fill={i===points.length-1&&state.arrived?COLORS.result:COLORS.bg1} stroke={color} strokeWidth={4}/><text x={p.x} y={p.y+52} textAnchor="middle" fontFamily={FONT} fontSize={23} fill={COLORS.textStrong}>{labels[i]??''}</text></g>)}
    <circle cx={state.x} cy={state.y} r={12} fill={COLORS.accent}/>
  </g>;
};
export const SynapticWeight:React.FC<{x:number;y:number;strength:number;receptors:number;input:number;progress?:number}> = ({x,y,strength,receptors,input,progress=1}) => <g transform={`translate(${x} ${y})`} opacity={progress}>
  <circle cx={-160} cy={0} r={38} fill={alpha(COLORS.primary,.2)} stroke={COLORS.primary} strokeWidth={4}/>
  <line x1={-120} y1={0} x2={100} y2={0} stroke={COLORS.result} strokeWidth={Math.max(2,8*strength)}/>
  <path d="M 115 -90 V 90" stroke={COLORS.primary} strokeWidth={7}/>
  {Array.from({length:Math.max(0,Math.round(receptors))},(_,i)=><rect key={i} x={100} y={-75+i*150/Math.max(1,receptors)} width={30} height={12} fill={COLORS.accent}/>)}
  <path d={`M 170 65 L 190 65 L 215 ${65-70*input*strength} L 265 65 L 300 65`} fill="none" stroke={COLORS.result} strokeWidth={4}/>
  <text x={10} y={120} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={25}>{`Response ${(input*strength).toFixed(1)}`}</text>
</g>;

export const receptiveResponse=(spot:{dx:number;dy:number;r:number}|undefined,r=120,type:'on'|'off'='on',baseline=20,gain=60) => {
  if(!spot)return baseline;
  const d=Math.hypot(spot.dx,spot.dy);
  const effect=d<r*.45?1:d<r?-0.55:0;
  return Math.max(0,baseline+(type==='on'?1:-1)*gain*effect);
};
