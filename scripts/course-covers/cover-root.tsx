import React from 'react';
import {AbsoluteFill, Composition, Img, registerRoot} from 'remotion';

type Theme = {mode: string; colors: Record<string, string>; backdrop?: {gridSize?: number}};
type Props = {course: string; subject: string; topics: {label: string}[]; theme: Theme; diagram: string; brand: string; audit?: boolean};
const Cover: React.FC<Props> = ({course, subject, topics, theme, diagram, brand, audit}) => {
  if (audit) return <AbsoluteFill style={{background:'#000'}}><Img src={diagram} style={{position:'absolute',left:180,top:140,width:640,height:620,objectFit:'contain'}}/></AbsoluteFill>;
  const c=theme.colors;
  const size=course.length<=22?112:course.length<=36?96:course.length<=48?86:78;
  const grid=theme.backdrop?.gridSize??60;
  return <AbsoluteFill style={{background:c.bg0,color:c.textStrong,fontFamily:'Helvetica Neue, Arial, sans-serif'}}>
    <AbsoluteFill style={{background:`radial-gradient(ellipse at 78% 42%, ${c.primary}12, transparent 57%), linear-gradient(135deg, transparent, ${c.bg1})`}}/>
    <AbsoluteFill style={{opacity:.3,backgroundImage:`linear-gradient(${c.grid} 1px, transparent 1px), linear-gradient(90deg, ${c.grid} 1px, transparent 1px)`,backgroundSize:`${grid}px ${grid}px`}}/>
    <AbsoluteFill style={{background:`linear-gradient(95deg, ${c.bg0}f0 0%, ${c.bg0}d6 40%, ${c.bg0}4d 62%, transparent 78%)`}}/>
    <div style={{position:'absolute',left:150,width:810,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:30}}>
      <div style={{fontSize:27,fontWeight:700,letterSpacing:4.5,textTransform:'uppercase',color:c.primary}}>{subject}</div>
      <div style={{fontSize:size,fontWeight:800,lineHeight:1.08,letterSpacing:-1.4}}>{course}</div>
      <div style={{width:196,height:7,borderRadius:7,background:c.primary,marginTop:6}}/>
      <div style={{fontSize:23,letterSpacing:2.4,textTransform:'uppercase',color:c.textDim}}>Course overview</div>
    </div>
    <Img src={diagram} style={{position:'absolute',right:108,top:148,width:780,height:756,objectFit:'contain'}}/>
    <Img src={brand} style={{position:'absolute',right:108,bottom:44,width:56,height:56}}/>
  </AbsoluteFill>;
};
registerRoot(() => <>
  <Composition id="cover" component={Cover} width={1920} height={1080} fps={30} durationInFrames={1}/>
  <Composition id="audit" component={Cover} width={1000} height={900} fps={30} durationInFrames={1}/>
</>);
