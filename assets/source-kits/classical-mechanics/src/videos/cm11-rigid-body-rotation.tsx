import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm11-rigid-body-rotation.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),tangential:(r:number,omega:number)=>r*omega, degrees:(radians:number)=>radians*180/Math.PI,};
const DESIGN_AUDIT = {visualArgument:"Two marks share angular advance on one disk but trace arcs of unequal length.", motion:"The outer tangential-speed readout is twice the inner one when its radius is doubled.", example:"An added torque raises omega after the radius comparison.", antiTemplate:"This compares radii under shared rotation; angular momentum instead moves masses and changes inertia.", sceneRationale:"Four states establish a fixed axis, sweep common angle, compare radius-dependent speeds and add torque as an extension."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><svg viewBox="760 220 1120 720" width="1000" height="625"><RigidRotation cx={1310} cy={610} r={295} from={0} to={T.degrees(s.angle)} omegaLabel="ω" progress={1}/><circle cx={1310+148*Math.cos(s.angle)} cy={610-148*Math.sin(s.angle)} r={12} fill={COLORS.alt}/><circle cx={1310+295*Math.cos(s.angle)} cy={610-295*Math.sin(s.angle)} r={14} fill={COLORS.accent}/><text x={950} y={880} fill={COLORS.result} fontFamily={FONT} fontSize={32}>v inner = {T.tangential(s.rInner,s.omega).toFixed(1)} · v outer = {T.tangential(s.rOuter,s.omega).toFixed(1)}</text></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Axis"} heading={"One fixed axis"} copy={"both belong to one rigid body"} chip={"One fixed axis"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Sweep"} heading={"Same \u0394\u03b8, different arc length"} copy={"angular displacement is common, outer arc is longer"} chip={"Same \u0394\u03b8, different arc length"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={420} index={2} label={"03 \u00b7 Speed"} heading={"v = r\u03c9"} copy={"v_outer/v_inner equals r_outer/r_inner"} chip={"v = r\u03c9"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={660} index={3} label={"04 \u00b7 Torque"} heading={"Torque changes rotation"} copy={"rotation responds to net torque shared \u03c9 and different v are simultaneously visible"} chip={"All points share angular speed in a"}/>;
export const SCENES=[
  {id:"axis",Comp:Beat1,dur:150},
  {id:"sweep",Comp:Beat2,dur:270},
  {id:"speed",Comp:Beat3,dur:240},
  {id:"torque",Comp:Beat4,dur:240}
];
