import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines} from '../components/ui';
import {Axes} from '../components/Plot';
import {COLORS,FONT,alpha,fadeIn,ramp} from '../theme';
import {SignalWindow} from '../components/EdgeAI';
import {streamState} from '../mechanisms/edge12-state';
const T = {size:4,hop:2,w:950,h:650};
const DESIGN_AUDIT = {
 visualArgument:'One persistent waveform and indexed buffer preserve sample identity while a fixed window slides by a shorter hop.',
 motion:'The window travels two positions, the two oldest slots leave, and two incoming samples occupy the suffix.',
 example:'Eight samples produce windows 0–3, 2–5 and 4–7; outputs follow arrivals 3,5,7.',
 antiTemplate:'Unlike feature extraction, this lesson changes selected membership while leaving the source waveform fixed.',
 sceneRationale:'Four scenes distinguish initial context, first overlapping hop, a second hop that confirms the rule, and the resulting output schedule.'
};
const WindowView=({frame,local,step}:{frame:number;local:number;step:number})=>{
 const v=streamState(frame);
 const headings=['Fill the First Window','Keep Two, Add Two','Advance by the Same Hop','Context and Output Rate'];
 const copy=[['Window size: 4 samples.','Wait until the first input is complete.'],['Hop size: 2 samples.','Indexes 2 and 3 stay; 4 and 5 arrive.'],['Indexes 4 and 5 stay.','Append 6 and 7 for the next input.'],['First output needs four samples.','Later outputs arrive every two new samples.']][step];
 return <><Backdrop width={1920} height={1080}/><Kicker text="EDGE AI · STREAMING INFERENCE" frame={local}/><Heading text={headings[step]} frame={local} width={650} size={52}/><Lines items={copy} frame={local} top={335} width={615} size={30}/>
 <svg data-k="figure" data-n="sliding sample identities" width={T.w} height={T.h} viewBox="0 0 950 650" style={{position:'absolute',left:850,top:250,fontFamily:FONT,opacity:fadeIn(local,10,15)}}>
 <Axes width={940} height={300} xDomain={[-.5,8.5]} yDomain={[-2.7,2.7]} pad={{l:50,r:55,t:35,b:50}} xTicks={[0,1,2,3,4,5,6,7]} yTicks={[-2,0,2]}>{s=><SignalWindow s={s} samples={v.samples} start={v.visualStart} size={T.size}/>}</Axes>
 <text x={60} y={350} fill={COLORS.textMuted} fontSize={26}>{v.moving?'MOVING TO THE NEXT INPUT':'CURRENT INFERENCE INPUT'}</text>
 {v.values.map((n,i)=><g key={i} opacity={fadeIn(local,18+i*10,12)}>
  <rect x={75+i*200} y={385} width={165} height={95} rx={12} fill={alpha(i<2&&v.start>0?COLORS.result:COLORS.accent,.16)} stroke={i<2&&v.start>0?COLORS.result:COLORS.accent} strokeWidth={3}/>
  <text x={157+i*200} y={418} textAnchor="middle" fill={COLORS.textMuted} fontSize={23}>index {v.indexes[i]}</text>
  <text x={157+i*200} y={460} textAnchor="middle" fill={COLORS.textStrong} fontSize={34}>{n}</text>
 </g>)}
 {step<3?<text x={75} y={555} fill={COLORS.textStrong} fontSize={32}>RMS of selected values = {v.rms.toFixed(3)}</text>:<g>
  <line x1={70} x2={840} y1={560} y2={560} stroke={COLORS.axis} strokeWidth={4}/>
  {v.outputs.map((n,i)=><g key={n}><circle cx={180+i*280} cy={560} r={13} fill={COLORS.result}/><text x={180+i*280} y={610} textAnchor="middle" fill={COLORS.textStrong} fontSize={25}>after sample {n}</text></g>)}
 </g>}
 </svg></>;
};
const Buffer=({frame}:{frame:number})=><WindowView frame={frame} local={frame} step={0}/>;
const Advance=({frame}:{frame:number})=><WindowView frame={frame+120} local={frame} step={1}/>;
const Next=({frame}:{frame:number})=><WindowView frame={frame+360} local={frame} step={2}/>;
const Schedule=({frame}:{frame:number})=><WindowView frame={frame+630} local={frame} step={3}/>;
export const SCENES=[{id:'buffer',Comp:Buffer,dur:120},{id:'advance',Comp:Advance,dur:240},{id:'next',Comp:Next,dur:270},{id:'latency',Comp:Schedule,dur:180}];
