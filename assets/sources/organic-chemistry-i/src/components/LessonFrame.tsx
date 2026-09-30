import React from 'react';
import { COLORS, FONT, alpha, ramp } from '../theme';
import { Backdrop } from './Backdrop';

/** Course L1: typography, generous two-column composition and a progress rail. */
export const LessonFrame: React.FC<{
  topic:string; heading:string; lines:string[]; takeaway:string; frame:number;
  step:number; steps:number; children:React.ReactNode;
}> = ({topic,heading,lines,takeaway,frame,step,steps,children}) => (
  <div style={{position:'absolute',inset:0,fontFamily:FONT,color:COLORS.textStrong}}>
    <Backdrop width={1920} height={1080}/>
    <div data-k="text" data-n="course" style={{position:'absolute',left:108,top:64,fontSize:22,letterSpacing:5,color:COLORS.textMuted,opacity:ramp(frame,0,12)}}>ORGANIC CHEMISTRY / {String(step).padStart(2,'0')}</div>
    <div data-k="text" data-n="topic" style={{position:'absolute',left:108,top:123,width:630,fontSize:24,lineHeight:1.3,color:COLORS.primary,opacity:ramp(frame,8,12)}}>{topic}</div>
    <div data-k="text" data-n="heading" style={{position:'absolute',left:108,top:209,width:620,fontSize:64,lineHeight:1.08,fontWeight:750,letterSpacing:-2,opacity:ramp(frame,18,14),transform:`translateY(${12*(1-ramp(frame,18,14))}px)`}}>{heading}</div>
    <div style={{position:'absolute',left:108,top:443,width:605,display:'flex',flexDirection:'column',gap:24}}>
      {lines.map((line,i)=><div data-k="text" data-n={`line-${i}`} key={i} style={{fontSize:29,lineHeight:1.45,color:COLORS.textMuted,opacity:ramp(frame,30+i*10,12)}}>{line}</div>)}
    </div>
    <svg data-k="figure" data-n="chemistry-stage" width={1000} height={700} viewBox="0 0 1000 700" style={{position:'absolute',left:820,top:165,overflow:'visible',fontFamily:FONT}}>{children}</svg>
    <div data-k="text" data-n="takeaway" style={{position:'absolute',left:108,top:907,width:1660,fontSize:30,fontWeight:550,lineHeight:1.4,color:COLORS.result,opacity:ramp(frame,54,14)}}>{takeaway}</div>
    <div style={{position:'absolute',left:108,right:108,bottom:44,display:'flex',gap:8}}>{Array.from({length:steps},(_,i)=><div key={i} style={{height:3,flex:1,background:i<step?COLORS.primary:alpha(COLORS.textMuted,.17)}}/>)}</div>
  </div>
);
