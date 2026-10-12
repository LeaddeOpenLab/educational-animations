import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm09-potential-energy.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),potential:(m:number,g:number,h:number,ref:number)=>m*g*(h-ref), delta:(m:number,g:number,dh:number)=>m*g*dh,};
const DESIGN_AUDIT = {visualArgument:"A mass rises while the potential-energy point moves on U(h).", motion:"Changing the zero line shifts the absolute U curve but preserves the same change between physical heights.", example:"The descent converts potential decrease into kinetic increase in the model.", antiTemplate:"This lesson tests reference choice; the next asks about allowed regions and turning points on a curved U(x).", sceneRationale:"Five states are needed to expose the reference-level distinction as well as lift, potential-to-kinetic exchange and comparison."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:760}}><Axes width={960} height={590} xDomain={[0,3.2]} yDomain={[-25,65]} xLabel="height h (m)" yLabel="U (J)" xTicks={[0,1,2,3]} yTicks={[0,20,40,60]}>{(scale)=><><Curve s={scale} pts={sampleFn((h)=>T.potential(s.m,s.g,h,s.ref),0,3,80)} color={COLORS.primary} width={7}/><Dot s={scale} x={s.h} y={s.U} r={13}/>{sceneIndex>=2&&<Curve s={scale} pts={sampleFn((h)=>T.potential(s.m,s.g,h,0),0,3,80)} color={COLORS.alt} width={4} dash="9 6"/>}</>}</Axes><div className="readout" style={{fontFamily:FONT,fontSize:32,fontWeight:700,color:COLORS.textStrong,paddingLeft:80,marginTop:0}}>U = {s.U.toFixed(1)} J · ΔU = {s.deltaU.toFixed(1)} J{sceneIndex>=3?` · K = ${s.K.toFixed(1)} J`:""}</div>{sceneIndex>=3&&<svg width={960} height={110} viewBox="0 0 960 110" style={{position:"absolute",left:0,top:635}}><text x={80} y={35} fill={COLORS.textStrong} fontFamily={FONT} fontSize={27}>ΔU</text><rect x={165} y={12} width={330*s.deltaU/60} height={26} fill={COLORS.primary}/><text x={80} y={85} fill={COLORS.textStrong} fontFamily={FONT} fontSize={27}>K</text><rect x={165} y={62} width={330*s.K/60} height={26} fill={COLORS.result}/></svg>}</div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Reference"} heading={"Choose a reference"} copy={"initial U is calculated from chosen reference"} chip={"Choose a reference"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Lift"} heading={"Lifting stores energy"} copy={"\u0394U matches m g \u0394h"} chip={"Lifting stores energy"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={420} index={2} label={"03 \u00b7 Change Zero"} heading={"Zero is arbitrary"} copy={"motion and energy change are unchanged"} chip={"Zero is arbitrary"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={660} index={3} label={"04 \u00b7 Descent"} heading={"Potential becomes kinetic"} copy={"total mechanical energy remains constant in ideal case"} chip={"Potential becomes kinetic"}/>;
const Beat5=({frame}:{frame:number})=><Frame frame={frame} start={810} index={4} label={"05 \u00b7 Close"} heading={"\u0394U, not absolute U"} copy={"only differences determine exchange"} chip={"Only \u0394U=m g \u0394h affects motion"}/>;
export const SCENES=[
  {id:"reference",Comp:Beat1,dur:150},
  {id:"lift",Comp:Beat2,dur:270},
  {id:"change-zero",Comp:Beat3,dur:240},
  {id:"descent",Comp:Beat4,dur:150},
  {id:"close",Comp:Beat5,dur:90}
];
