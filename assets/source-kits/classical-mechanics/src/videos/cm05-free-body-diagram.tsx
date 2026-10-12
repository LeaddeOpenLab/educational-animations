import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm05-free-body-diagram.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),gravity:(m:number,g:number)=>m*g, parallel:(m:number,g:number,theta:number)=>m*g*Math.sin(theta),};
const DESIGN_AUDIT = {visualArgument:"The block is isolated before contact forces appear, then gravity is resolved in the plane frame.", motion:"Component arrows grow after the original vertical gravity arrow is present.", example:"A friction arrow appears only when the tendency to slide is discussed.", antiTemplate:"This builds one-body force bookkeeping, unlike Newton\u2019s laws\u2019 cross-body interaction.", sceneRationale:"Four states move from physical situation to isolation, components and the friction/check result without a redundant closing diagram."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><svg viewBox="750 220 1150 720" width="1000" height="625"><FreeBody cx={1310} cy={610} body="wedge" incline={30} forces={s.isolated?[{label:'mg',angle:270,mag:s.mg,color:COLORS.warn,magnitude:s.mg},{label:'N',angle:120,mag:s.gravityNormal,color:COLORS.primary,magnitude:s.gravityNormal},...(s.friction?[{label:'f',angle:30,mag:s.friction,color:COLORS.alt,magnitude:s.friction}]:[])]:[]} size={230} decompose={s.components?{index:0,axes:[210,120],color:COLORS.accent}:undefined} scale={235}/><text x={900} y={890} fill={COLORS.result} fontFamily={FONT} fontSize={32}>mg sinθ = {T.parallel(s.m,s.g,s.theta).toFixed(1)} N</text></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Situation"} heading={"Isolate the block"} copy={"system boundary identifies one object"} chip={"Isolate the block"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Replace Contacts"} heading={"Forces act on the block"} copy={"arrows originate on selected block"} chip={"Forces act on the block"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={360} index={2} label={"03 \u00b7 Resolve"} heading={"Resolve gravity along slope"} copy={"mg sin\u03b8 and mg cos\u03b8 align with axes"} chip={"Resolve gravity along slope"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={630} index={3} label={"04 \u00b7 Friction Check"} heading={"Friction opposes relative motion"} copy={"parallel sum predicts sliding or rest no force from block on ramp is included"} chip={"Isolate one object"}/>;
export const SCENES=[
  {id:"situation",Comp:Beat1,dur:150},
  {id:"replace-contacts",Comp:Beat2,dur:210},
  {id:"resolve",Comp:Beat3,dur:270},
  {id:"friction-check",Comp:Beat4,dur:270}
];
