import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm07-collision-process.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),K:(m:number,v:number)=>0.5*m*v*v, stickyV:(m1:number,u1:number,m2:number,u2:number)=>(m1*u1+m2*u2)/(m1+m2),};
const DESIGN_AUDIT = {visualArgument:"Bodies first approach, visibly contact and then display elastic or sticking velocities.", motion:"The kinetic-energy bar remains full for elastic impact and shrinks for the sticky outcome.", example:"Equal masses give a clear speed exchange in the elastic case.", antiTemplate:"This compares collision outcomes, unlike momentum-conservation\u2019s system-boundary demonstration.", sceneRationale:"Five states show approach, contact, elastic rebound and sticking as different moving outcomes before comparing energy."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><svg viewBox="700 220 1250 720" width="1000" height="625"><Collision y={570} cx={1320} left={{r:85,mass:1,v0:3,v1:s.choice==='elastic'?0:T.stickyV(1,3,1,0),color:COLORS.primary,label:'A'}} right={{r:85,mass:1,v0:0,v1:s.choice==='elastic'?3:T.stickyV(1,3,1,0),color:COLORS.alt,label:'B'}} progress={s.progress} sticky={s.choice==='inelastic'}/><rect x={1000} y={785} width={340} height={38} rx={12} fill={COLORS.accent}/><rect x={1000} y={845} width={(s.choice==='elastic'?s.elastic.kNow:s.sticky.kNow)/4.5*340} height={38} rx={12} fill={COLORS.result}/><rect x={1000} y={902} width={s.choice==='elastic'?s.elastic.stored/4.5*340:0} height={20} rx={10} fill={COLORS.warn}/><text x={1360} y={880} fill={COLORS.textStrong} fontFamily={FONT} fontSize={30}>K now = {(s.choice==='elastic'?s.elastic.kNow:s.sticky.kNow).toFixed(2)} J</text></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Approach"} heading={"Before contact"} copy={"arrows and distance agree"} chip={"Before contact"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Contact"} heading={"Impulse during contact"} copy={"momentum labels change as the balls interact"} chip={"Impulse during contact"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={390} index={2} label={"03 \u00b7 Rebound"} heading={"Elastic energy returns after contact"} copy={"temporary elastic energy returns to motion"} chip={"K returns after contact"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={600} index={3} label={"04 \u00b7 Stick"} heading={"Inelastic: some kinetic energy transforms"} copy={"momentum total same, kinetic energy smaller"} chip={"Inelastic: some kinetic energy"}/>;
const Beat5=({frame}:{frame:number})=><Frame frame={frame} start={810} index={4} label={"05 \u00b7 Close"} heading={"Momentum survives both cases"} copy={"process, not labels, distinguishes outcomes"} chip={"Contact forces change each body\u2019s"}/>;
export const SCENES=[
  {id:"approach",Comp:Beat1,dur:150},
  {id:"contact",Comp:Beat2,dur:240},
  {id:"rebound",Comp:Beat3,dur:210},
  {id:"stick",Comp:Beat4,dur:210},
  {id:"close",Comp:Beat5,dur:90}
];
