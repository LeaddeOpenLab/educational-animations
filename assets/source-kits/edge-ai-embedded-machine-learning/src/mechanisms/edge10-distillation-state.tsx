import React from 'react';
import {COLORS,FONT} from '../theme';
import {ScoreDistribution} from '../components/EdgeAI';
import {Axes} from '../components/Plot';
const STUDENT_STEPS=[[.33,.34,.33],[.45,.30,.25],[.55,.28,.17],[.60,.27,.13]];
export const distillationState=(frame:number)=>{
 const teacher=[.65,.25,.10];
 const update=Math.max(0,Math.min(3,(frame-360)/110));
 const index=Math.floor(update),mix=update-index;
 const student=STUDENT_STEPS[index].map((x,i)=>x+((STUDENT_STEPS[Math.min(3,index+1)][i])-x)*mix);
 return {teacher,student,update,studentParameters:[.2+update*.15,.8-update*.12,.1+update*.08],teacherParameters:[.7,.2,.9],deployed:frame>=720,names:['cat','dog','bird'],gap:student.reduce((n,x,i)=>n+Math.abs(x-teacher[i]),0)};
};
export const DistillationCore:React.FC<{frame:number}>=({frame})=>{
 const v=distillationState(frame);
 return <div style={{fontFamily:FONT,color:COLORS.textStrong}}><div style={{display:'flex',gap:35}}>{[{name:'Fixed teacher',scores:v.teacher,parameters:v.teacherParameters},{name:v.deployed?'Student on device':'Learning student',scores:v.student,parameters:v.studentParameters}].map((model,index)=><div key={index} style={{width:420,border:v.deployed&&index===1?`3px solid ${COLORS.result}`:'3px solid transparent'}}><div style={{fontSize:28,textAlign:'center'}}>{model.name}</div><Axes width={414} height={290} xDomain={[-.7,2.7]} yDomain={[0,1]}>{s=><ScoreDistribution s={s} names={v.names} scores={model.scores}/>}</Axes><svg viewBox="0 0 420 65">{model.parameters.map((p,i)=><rect key={i} x={70+i*90} y={10} width={55} height={p*48} fill={index?COLORS.accent:COLORS.alt}/>)}</svg></div>)}</div></div>;
};
