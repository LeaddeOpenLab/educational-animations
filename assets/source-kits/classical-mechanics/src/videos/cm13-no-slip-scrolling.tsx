import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm13-no-slip-scrolling.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),distance:(r:number,theta:number)=>r*theta, contact:(v:number,omega:number,r:number)=>v-r*omega,};
const DESIGN_AUDIT = {visualArgument:"A wheel translates while its spoke rotates and a rim point traces a cycloid.", motion:"The contact marker is still at the no-slip instant; a later ghost slip creates a mismatch.", example:"Two metres radius links angular travel to physical path length.", antiTemplate:"This combines translation and rotation, unlike fixed-axis rotation\u2019s shared angle comparison.", sceneRationale:"Four states compare translation, instantaneous contact rest and a deliberately slipping counterexample."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><svg viewBox="700 190 1300 750" width="1000" height="625"><g opacity={sceneIndex>=3?0.18:1}><RollingBody x0={900} groundY={790} r={180} physicalRadius={s.r} angle={s.theta} color={COLORS.primary} showTrail/></g>{sceneIndex>=3&&<g><circle cx={s.centerX} cy={610} r={180} fill="none" stroke={COLORS.warn} strokeWidth={7}/><line x1={s.centerX} y1={610} x2={s.centerX+180*Math.sin(s.theta)} y2={610+180*Math.cos(s.theta)} stroke={COLORS.warn} strokeWidth={6}/><circle cx={s.centerX} cy={790} r={13} fill={COLORS.warn}/><text x={s.centerX-110} y={520} fill={COLORS.warn} fontFamily={FONT} fontSize={30}>slipping</text></g>}{sceneIndex>=2&&<circle cx={s.centerX} cy={790} r={13} fill={s.contactVelocity===0?COLORS.result:COLORS.warn}/ >}{sceneIndex>=3&&<line x1={s.centerX} y1={820} x2={s.centerX+90*s.slip} y2={820} stroke={COLORS.warn} strokeWidth={8}/>}<text x={850} y={910} fill={COLORS.textStrong} fontFamily={FONT} fontSize={30}>s = {T.distance(s.r,s.theta).toFixed(2)} m · contact v = {s.contactVelocity.toFixed(1)} m/s</text></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Setup"} heading={"Track translation and rotation"} copy={"radius and ground line establish geometry"} chip={"Track translation and rotation"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Roll"} heading={"No slip: s=r\u03b8"} copy={"distance ruler equals r\u03b8"} chip={"No slip: s=r\u03b8"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={420} index={2} label={"03 \u00b7 Contact"} heading={"Contact point is instantaneously still"} copy={"center velocity and rotation contribution cancel at contact"} chip={"Contact point is instantaneously still"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={660} index={3} label={"04 \u00b7 Slip Contrast"} heading={"Slip breaks s=r\u03b8"} copy={"mismatched s and r\u03b8 exposes slip both constraints describe same rolling motion"} chip={"A no-slip wheel travels s=r\u03b8 and its"}/>;
export const SCENES=[
  {id:"setup",Comp:Beat1,dur:150},
  {id:"roll",Comp:Beat2,dur:270},
  {id:"contact",Comp:Beat3,dur:240},
  {id:"slip-contrast",Comp:Beat4,dur:240}
];
