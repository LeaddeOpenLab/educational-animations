import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm02-speed-time-graph.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),speed:(t:number)=>t<1?4*t:t<2?4:4*(3-t), distance:(t:number)=>t<1?2*t*t:t<2?2+4*(t-1):6+4*(t-2)-2*(t-2)**2,};
const DESIGN_AUDIT = {visualArgument:"Speed is never drawn below zero; a cart advances while a speed curve rises, levels and falls.", motion:"The filled area grows continuously even while the curve falls during braking.", example:"Cruise has zero slope but still adds distance.", antiTemplate:"Unlike position-time slope or acceleration-time signed area, this graph accumulates nonnegative path length.", sceneRationale:"Four states follow speed-up, cruise and braking; a separate conclusion would repeat the final accumulated-area picture."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:760}}><Axes width={960} height={590} xDomain={[0,3]} yDomain={[0,4.5]} xLabel="time (s)" yLabel="speed (m/s)" xTicks={[0,1,2,3]} yTicks={[0,2,4]}>{(scale)=><><Curve s={scale} pts={sampleFn(T.speed,0,3,90)} width={7} color={COLORS.primary}/><AreaShade s={scale} pts={[...sampleFn(T.speed,0,3,90).filter(([x])=>x<s.t),[s.t,s.speed]]} integral={T.distance} progress={1} label="distance" unit="m" color={COLORS.result}/><Dot s={scale} x={s.t} y={s.speed} r={12}/></>}</Axes><div className="readout" style={{fontFamily:FONT,fontSize:32,fontWeight:700,color:COLORS.textStrong,paddingLeft:80,marginTop:0}}>distance {s.distance.toFixed(2)} m</div><svg width={960} height={110} viewBox="0 0 960 110" style={{position:"absolute",left:0,top:635}}><line x1={80} y1={75} x2={810} y2={75} stroke={COLORS.axis} strokeWidth={4}/><rect x={80+60*s.distance} y={34} width={72} height={40} rx={9} fill={COLORS.primary}/></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Setup"} heading={"Speed is a magnitude"} copy={"speed remains nonnegative"} chip={"Speed is a magnitude"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Accelerate"} heading={"Steeper graph: speeding up"} copy={"cart covers more distance each second"} chip={"Steeper graph: speeding up"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={390} index={2} label={"03 \u00b7 Cruise"} heading={"Flat speed still covers distance"} copy={"zero slope does not mean zero distance"} chip={"Flat speed still covers distance"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={600} index={3} label={"04 \u00b7 Brake"} heading={"Area = \u222bspeed dt"} copy={"cart never reverses and final area equals path length distance equals the accumulated area"} chip={"The area under speed versus time is"}/>;
export const SCENES=[
  {id:"setup",Comp:Beat1,dur:150},
  {id:"accelerate",Comp:Beat2,dur:240},
  {id:"cruise",Comp:Beat3,dur:210},
  {id:"brake",Comp:Beat4,dur:300}
];
