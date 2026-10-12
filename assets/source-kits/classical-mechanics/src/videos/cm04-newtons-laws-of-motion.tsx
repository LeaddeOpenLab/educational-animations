import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm04-newtons-laws-of-motion.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),net:(push:number)=>push, acceleration:(push:number,mass:number)=>push/mass,};
const DESIGN_AUDIT = {visualArgument:"Force arrows originate on the relevant cart, and the cart translates only after net force becomes nonzero.", motion:"The same push produces different acceleration after the mass change.", example:"Third-law arrows are shown on separate carts, not canceled as forces on one body.", antiTemplate:"This is a motion-and-body comparison, not the isolated inclined-plane diagram used next.", sceneRationale:"Six states separate balanced and unbalanced motion, mass comparison, contact event and the cross-body third-law comparison."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{
  const s=stateAt(T.modelFrame(global));
  return <div data-k="figure" data-n="force and motion" style={{position:'absolute',left:840,top:245,width:1000,height:625}}>
    <svg viewBox="750 220 1150 720" width="1000" height="625">
      <line x1={850} y1={790} x2={1820} y2={790} stroke={COLORS.axis} strokeWidth={5}/>
      <FreeBody cx={s.bodyX+45} cy={650} body="box" size={230} forces={sceneIndex>=3?[]:[
        {label:'push',angle:0,mag:s.push,color:COLORS.primary,magnitude:s.push},
        {label:'drag',angle:180,mag:s.drag,color:COLORS.alt,magnitude:s.drag},
      ]} scale={240}/><text x={s.bodyX+45} y={715} fill={COLORS.textStrong} fontFamily={FONT} fontSize={31} textAnchor="middle">m = {s.mass} kg</text>
      {sceneIndex>=3&&s.pair&&<>
        <rect x={1560} y={540} width={175} height={175} rx={18} fill={COLORS.bg2} stroke={COLORS.alt} strokeWidth={5}/>
        <text x={1625} y={640} fill={COLORS.textStrong} fontFamily={FONT} fontSize={32}>B</text>
        <Force x={1645} y={475} angle={0} length={125} label="A on B" magnitude={s.pair.onA} progress={1}/>
        <Force x={s.bodyX+45} y={475} angle={180} length={125} label="B on A" magnitude={Math.abs(s.pair.onB)} progress={1} color={COLORS.alt}/>
      </>}
      <text x={1000} y={895} fill={COLORS.result} fontFamily={FONT} fontSize={35}>{sceneIndex>=3?"F(A on B) = −F(B on A)":"ΣF = "+s.netForce.toFixed(1)+" N · a = "+T.acceleration(s.netForce,s.mass).toFixed(1)+" m/s²"}</text>
    </svg>
  </div>;
};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Balanced"} heading={"Balanced forces: no acceleration"} copy={"\u03a3F=0 and acceleration readout remains zero"} chip={"Balanced forces: no acceleration"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Unbalanced"} heading={"Net force changes motion"} copy={"a=\u03a3F/m matches the growing speed"} chip={"Net force changes motion"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={390} index={2} label={"03 \u00b7 Mass"} heading={"a = F/m"} copy={"acceleration readouts scale inversely with mass"} chip={"a = F/m"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={570} index={3} label={"04 \u00b7 Interaction"} heading={"Third-law pair: different bodies"} copy={"forces do not cancel within either single-body diagram"} chip={"Third-law pair: different bodies"}/>;
const Beat5=({frame}:{frame:number})=><Frame frame={frame} start={720} index={4} label={"05 \u00b7 Different Bodies"} heading={"Third-law forces belong to different bodies"} copy={"neither force pair cancels within one cart"} chip={"Third-law forces belong to different"}/>;
const Beat6=({frame}:{frame:number})=><Frame frame={frame} start={810} index={5} label={"06 \u00b7 Close"} heading={"Sum forces per body"} copy={"\u03a3F of each object predicts its own acceleration"} chip={"Net force determines acceleration"}/>;
export const SCENES=[
  {id:"balanced",Comp:Beat1,dur:150},
  {id:"unbalanced",Comp:Beat2,dur:240},
  {id:"mass",Comp:Beat3,dur:180},
  {id:"interaction",Comp:Beat4,dur:150},
  {id:"different-bodies",Comp:Beat5,dur:90},
  {id:"close",Comp:Beat6,dur:90}
];
