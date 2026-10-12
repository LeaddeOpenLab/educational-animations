import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm06-conservation-of-momentum.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),momentum:(m:number,v:number)=>m*v, total:(m1:number,v1:number,m2:number,v2:number)=>m1*v1+m2*v2,};
const DESIGN_AUDIT = {visualArgument:"Two individual momentum bars trade value while the isolated-system total stays fixed.", motion:"An external force is introduced only after the isolated case, changing the system total.", example:"The example uses masses two and one with velocities chosen to conserve 5 kg\u00b7m/s.", antiTemplate:"This tracks system accounting, distinct from the next lesson\u2019s collision-type energy outcomes.", sceneRationale:"Four states track before, internal exchange, after and an external-force counterexample; the totals remain in the last state."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><svg viewBox="700 220 1250 720" width="1000" height="625"><Collision y={560} cx={1320} left={{r:85,mass:s.m1,v0:3,v1:1,color:COLORS.primary,label:'A'}} right={{r:70,mass:s.m2,v0:-1,v1:3,color:COLORS.alt,label:'B'}} progress={s.exchange}/><MomentumBars rows={[{label:'A',before:6,after:s.p1,color:COLORS.primary},{label:'B',before:-1,after:s.p2,color:COLORS.alt}]} x={1080} y={730} w={380} title="individual momentum"/>{s.external>0&&<Force x={1640} y={620} angle={180} length={115} label="external" progress={1} color={COLORS.warn}/>}<text x={1520} y={900} fill={COLORS.result} fontFamily={FONT} fontSize={31}>system p = {s.total.toFixed(1)}</text></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Before"} heading={"Measure momentum before"} copy={"sum is the baseline total"} chip={"Measure momentum before"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Interaction"} heading={"Internal forces exchange momentum"} copy={"bar changes cancel algebraically"} chip={"Internal forces exchange momentum"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={420} index={2} label={"03 \u00b7 After"} heading={"p_before = p_after"} copy={"after total equals before total"} chip={"p_before = p_after"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={660} index={3} label={"04 \u00b7 External Force"} heading={"Conservation requires an isolated system"} copy={"boundary explains when conservation fails individual changes differ but sum agrees"} chip={"Equal opposite impulses redistribute"}/>;
export const SCENES=[
  {id:"before",Comp:Beat1,dur:150},
  {id:"interaction",Comp:Beat2,dur:270},
  {id:"after",Comp:Beat3,dur:240},
  {id:"external-force",Comp:Beat4,dur:240}
];
