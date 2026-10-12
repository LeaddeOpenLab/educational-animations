import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm03-acceleration-time-graph.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),accel:(t:number)=>t<1?1:t<2?0:-1, integral:(t:number)=>t<1?t:t<2?1:3-t,};
const DESIGN_AUDIT = {visualArgument:"The acceleration trace is paired with an integrated velocity readout, not mistaken for velocity itself.", motion:"Positive, zero and negative acceleration segments alter or preserve velocity as expected.", example:"The cart still moves during the zero-acceleration segment.", antiTemplate:"This uses signed area to update velocity, distinct from speed-time area updating distance.", sceneRationale:"Five states distinguish initial velocity, positive integral, zero acceleration and negative integral before the final check."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:760}}><Axes width={960} height={590} xDomain={[0,3]} yDomain={[-1.4,1.4]} xLabel="time (s)" yLabel="a (m/s²)" xTicks={[0,1,2,3]} yTicks={[-1,0,1]}>{(scale)=><><Curve s={scale} pts={[[0,1],[1,1],[1,0],[2,0],[2,-1],[3,-1]]} width={7} color={COLORS.primary}/><AreaShade s={scale} pts={[...sampleFn(T.accel,0,3,90).filter(([x])=>x<s.t),[s.t,s.a]]} integral={T.integral} progress={1} label="Δv" unit="m/s" color={COLORS.accent}/><Dot s={scale} x={s.t} y={s.a} r={12}/></>}</Axes><div className="readout" style={{fontFamily:FONT,fontSize:32,fontWeight:700,color:COLORS.textStrong,paddingLeft:80,marginTop:0}}>v = {s.v.toFixed(2)} m/s</div><svg width={960} height={110} viewBox="0 0 960 110" style={{position:"absolute",left:0,top:635}}><line x1={80} y1={75} x2={810} y2={75} stroke={COLORS.axis} strokeWidth={4}/><rect x={80+60*s.x} y={34} width={72} height={40} rx={9} fill={COLORS.primary}/></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Setup"} heading={"Acceleration changes velocity"} copy={"v starts at the separately shown initial value"} chip={"Acceleration changes velocity"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Integrate"} heading={"\u0394v = \u222ba dt"} copy={"\u0394v equals displayed accumulated area"} chip={"\u0394v = \u222ba dt"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={420} index={2} label={"03 \u00b7 Zero A"} heading={"Zero acceleration can mean constant speed"} copy={"a=0 does not imply v=0"} chip={"Zero acceleration can mean constant"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={600} index={3} label={"04 \u00b7 Negative A"} heading={"Negative area reduces velocity"} copy={"readout matches area sum plus v0"} chip={"Negative area reduces velocity"}/>;
const Beat5=({frame}:{frame:number})=><Frame frame={frame} start={810} index={4} label={"05 \u00b7 Close"} heading={"Area changes v"} copy={"v_final \u2212 v_initial equals signed area"} chip={"The signed area under a(t) is \u0394v, not"}/>;
export const SCENES=[
  {id:"setup",Comp:Beat1,dur:150},
  {id:"integrate",Comp:Beat2,dur:270},
  {id:"zero-a",Comp:Beat3,dur:180},
  {id:"negative-a",Comp:Beat4,dur:210},
  {id:"close",Comp:Beat5,dur:90}
];
