import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {AreaShade,FreeBody,Force,Collision,MomentumBars,EnergyLandscape,RollingBody,RigidRotation} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm12-angular-momentum.state';

const T = {fps:30, modelFrame:(global:number)=>Math.min(90,Math.round(global/10)),inertia:(m:number,r:number)=>2*m*r*r, omega:(L:number,I:number)=>L/I, product:(I:number,omega:number)=>I*omega,};
const DESIGN_AUDIT = {visualArgument:"External torque first changes L; after torque removal, masses move outward while L stays fixed.", motion:"The geometry makes increased radius and reduced spin rate visible together.", example:"Two equal masses give I=2mr\u00b2 before and after redistribution.", antiTemplate:"This changes mass distribution and angular speed, unlike the prior fixed-body radius comparison.", sceneRationale:"Five states distinguish applied torque, torque removal and mass redistribution so constant L is not confused with constant omega."};
const Diagram:React.FC<{global:number;sceneIndex:number}>=({global,sceneIndex})=>{const s=stateAt(T.modelFrame(global));return <div data-k="figure" data-n="mechanism figure" style={{position:'absolute',left:840,top:245,width:1000,height:625}}><svg viewBox="760 220 1120 720" width="1000" height="625"><RigidRotation cx={1300} cy={600} r={290} from={0} to={s.angle*180/Math.PI} omegaLabel="ω" progress={1}/><circle cx={1300+125*s.r*Math.cos(s.angle)} cy={600-125*s.r*Math.sin(s.angle)} r={16} fill={COLORS.accent}/><circle cx={1300-125*s.r*Math.cos(s.angle)} cy={600+125*s.r*Math.sin(s.angle)} r={16} fill={COLORS.accent}/>{sceneIndex>=3&&<line x1={1050} y1={870} x2={1550} y2={870} stroke={COLORS.result} strokeWidth={5}/>}<text x={910} y={930} fill={COLORS.textStrong} fontFamily={FONT} fontSize={31}>I = {s.I.toFixed(2)} · ω = {s.omega.toFixed(2)} · L = {T.product(s.I,s.omega).toFixed(2)}</text></svg></div>;};
const Frame:React.FC<{frame:number;start:number;index:number;label:string;heading:string;copy:string;chip:string}>=({frame,start,index,label,heading,copy,chip})=><><Backdrop width={1920} height={1080}/><Kicker text={label} frame={frame}/><Heading text={heading} frame={frame} width={645} size={44}/><Caption text={copy} frame={frame} start={12} top={310} width={620} size={29}/><Diagram global={start+frame} sceneIndex={index}/><div style={{position:'absolute',left:108,top:845}}><Chip text={chip} color={COLORS.result} size={23}/></div></>;
const Beat1=({frame}:{frame:number})=><Frame frame={frame} start={0} index={0} label={"01 \u00b7 Spin"} heading={"Angular momentum of a rotor"} copy={"L=I\u03c9 establishes initial state"} chip={"Angular momentum of a rotor"}/>;
const Beat2=({frame}:{frame:number})=><Frame frame={frame} start={150} index={1} label={"02 \u00b7 Torque"} heading={"Torque changes L"} copy={"\u0394L equals torque impulse"} chip={"Torque changes L"}/>;
const Beat3=({frame}:{frame:number})=><Frame frame={frame} start={360} index={2} label={"03 \u00b7 Release"} heading={"No external torque: L holds"} copy={"no torque means L is conserved"} chip={"No external torque: L holds"}/>;
const Beat4=({frame}:{frame:number})=><Frame frame={frame} start={540} index={3} label={"04 \u00b7 Redistribute"} heading={"Outward mass slows spin"} copy={"product I\u03c9 remains equal to earlier L"} chip={"Outward mass slows spin"}/>;
const Beat5=({frame}:{frame:number})=><Frame frame={frame} start={810} index={4} label={"05 \u00b7 Close"} heading={"Same L, different spin rate"} copy={"conservation is visible in product"} chip={"External torque changes angular"}/>;
export const SCENES=[
  {id:"spin",Comp:Beat1,dur:150},
  {id:"torque",Comp:Beat2,dur:210},
  {id:"release",Comp:Beat3,dur:180},
  {id:"redistribute",Comp:Beat4,dur:270},
  {id:"close",Comp:Beat5,dur:90}
];
