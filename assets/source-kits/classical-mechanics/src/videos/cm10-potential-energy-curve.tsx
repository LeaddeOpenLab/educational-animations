import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm10-potential-energy-curve.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global<=570?global*75/570:75+(global-570)*15/330)),U:(x:number)=>(x-2)**2, K:(E:number,x:number)=>Math.max(0,E-(x-2)**2), force:(x:number)=>-2*(x-2),};
const DESIGN_AUDIT = {visualArgument:"The particle is permitted only where the U curve lies below the total-energy line.", motion:"At the root U=E, the particle slows to zero kinetic energy and reverses.", example:"A quadratic well makes two visible turning points and one stable minimum.", antiTemplate:"This is an energy-landscape constraint, distinct from the preceding reference-level shift.", sceneRationale:"Four states show landscape, allowed interval, turning point and local stability; the final state retains all energy markers."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><Axes width={960} height={590} xDomain={[0,4]} yDomain={[0,4]} xLabel="position x" yLabel="U (J)" xTicks={[0,1,2,3,4]} yTicks={[0,1,2,3,4]}>{(scale)=><><EnergyLandscape s={scale} U={T.U} E={s.E} probeX={s.x} color={COLORS.primary}/><Dot s={scale} x={s.x} y={s.U} r={14}/>{sceneIndex>=2&&<text x={scale.px(3)+12} y={scale.py(1)-18} fill={COLORS.warn} fontFamily={FONT} fontSize={26}>turn</text>}</>}</Axes><div className="readout" style={{fontFamily:FONT,fontSize:32,fontWeight:700,color:COLORS.textStrong,paddingLeft:80,marginTop:0}}>K = E − U = {T.K(s.E,s.x).toFixed(2)} J</div></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Landscape"} heading={"Compare U with total E"} copy={"vertical gap reads K=E\u2212U"} chip={"Compare U with total E"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Allowed"} heading={"Motion needs K\u22650"} copy={"K readout never negative on allowed path"} chip={"Motion needs K\u22650"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={390} index={2} label={"03 \u00b7 Turning"} heading={"Turning point: U=E"} copy={"K=0 at reversal and root U(x)=E is marked"} chip={"Turning point: U=E"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={660} index={3} label={"04 \u00b7 Stability"} heading={"Minimum is stable"} copy={"slope F=\u2212dU/dx changes sign across minimum energy line predicts reachable positions"} chip={"A particle can occupy U(x)\u2264E"}/>;
export const SCENES=[
  {id:"landscape",Comp:Beat1,dur:150},
  {id:"allowed",Comp:Beat2,dur:240},
  {id:"turning",Comp:Beat3,dur:270},
  {id:"stability",Comp:Beat4,dur:240}
];
