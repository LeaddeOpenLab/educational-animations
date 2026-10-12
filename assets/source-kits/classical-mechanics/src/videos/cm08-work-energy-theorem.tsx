import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm08-work-energy-theorem.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),force:(x:number)=>x<=2.3?2+x:-2, work:(x:number)=>2*Math.min(x,2.3)+0.5*Math.min(x,2.3)**2-2*Math.max(0,x-2.3), speed:(work:number)=>Math.sqrt(1+work),};
const DESIGN_AUDIT = {visualArgument:"Area under F against displacement grows while the cart\u2019s speed and kinetic energy respond.", motion:"The final interval applies opposing force and removes part of the gained kinetic energy.", example:"A variable force makes the integral visually necessary.", antiTemplate:"This compares work with \u0394K, rather than the potential-energy reference-level construction.", sceneRationale:"Four states show applied force, swept work area, speed/energy change and opposing work; the equality is checked within the last state."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:760}}><Axes width={960} height={590} xDomain={[0,3]} yDomain={[-2.5,5.5]} xLabel="displacement x (m)" yLabel="force F (N)" xTicks={[0,1,2,3]} yTicks={[-2,0,2,4]}>{(scale)=><><Curve s={scale} pts={sampleFn(T.force,0,3,80)} color={COLORS.primary} width={7}/><AreaShade s={scale} pts={[...sampleFn(T.force,0,3,80).filter(([x])=>x<Math.min(s.x,2.3)),...(s.x>2.3?[[2.3,4.3],[2.3,-2]] as [number,number][]:[]),[s.x,s.force]]} integral={T.work} progress={1} label="work" unit="J" color={COLORS.accent}/>{sceneIndex>=3&&<Curve s={scale} pts={[[2.3,-2],[3,-2]]} color={COLORS.warn} width={6}/>}</>}</Axes><div className="readout" style={{fontFamily:FONT,fontSize:32,fontWeight:700,color:COLORS.textStrong,paddingLeft:80,marginTop:0}}>W = {s.work.toFixed(2)} J · K = {s.kinetic.toFixed(2)} J · ΔK = {(s.kinetic-s.initialK).toFixed(2)} J</div><svg width={960} height={110} viewBox="0 0 960 110" style={{position:"absolute",left:0,top:635}}><line x1={80} y1={75} x2={810} y2={75} stroke={COLORS.axis} strokeWidth={4}/><rect x={80+180*s.x} y={34} width={72} height={40} rx={9} fill={COLORS.primary}/></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Force And Path"} heading={"Work needs displacement"} copy={"force component parallel to path is visible"} chip={"Work needs displacement"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Work Area"} heading={"W = \u222bF dx"} copy={"work counter is integral of force over displacement"} chip={"W = \u222bF dx"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={420} index={2} label={"03 \u00b7 Energy"} heading={"W_net = \u0394K"} copy={"K_final \u2212 K_initial equals accumulated work"} chip={"W_net = \u0394K"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={660} index={3} label={"04 \u00b7 Opposing Force"} heading={"Negative work removes kinetic energy"} copy={"kinetic energy drops with negative net work same numerical result from area and speed"} chip={"Net work is the change in kinetic"}/>;
export const SCENES=[
  {id:"force-and-path",Comp:Beat1,dur:150},
  {id:"work-area",Comp:Beat2,dur:270},
  {id:"energy",Comp:Beat3,dur:240},
  {id:"opposing-force",Comp:Beat4,dur:240}
];
