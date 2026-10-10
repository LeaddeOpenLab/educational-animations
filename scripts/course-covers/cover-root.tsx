import React from 'react';
import {AbsoluteFill, Composition, Img, registerRoot} from 'remotion';

type Props = {name: string; course: string; subject: string; foot: string; primary: string; accent: string; diagram: string; brand: string; audit?: boolean};
const Cover: React.FC<Props> = ({name, course, subject, foot, primary, accent, diagram, brand, audit}) => {
  const size = name.length <= 18 ? 116 : name.length <= 30 ? 96 : name.length <= 44 ? 78 : 66;
  if (audit) return <AbsoluteFill style={{background: '#000'}}><Img src={diagram} style={{position:'absolute',left:180,top:140,width:640,height:620,objectFit:'contain'}}/></AbsoluteFill>;
  return <AbsoluteFill style={{background:'#080d15',color:'#F4F7FF',fontFamily:'Helvetica Neue, Arial, sans-serif'}}>
    <AbsoluteFill style={{background:`radial-gradient(ellipse at 78% 32%, ${primary}22, transparent 58%), linear-gradient(135deg, transparent, #101b2c88)`}}/>
    <AbsoluteFill style={{opacity:.07,backgroundImage:'linear-gradient(#8EA6C1 1px, transparent 1px), linear-gradient(90deg, #8EA6C1 1px, transparent 1px)',backgroundSize:'72px 72px'}}/>
    <AbsoluteFill style={{background:'linear-gradient(95deg, #080d15f0 0%, #080d15d6 40%, #080d154d 62%, transparent 78%)'}}/>
    <div style={{position:'absolute',left:150,width:1010,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',gap:30}}>
      <div style={{fontSize:27,fontWeight:700,letterSpacing:5.5,textTransform:'uppercase',color:accent}}>{course}</div>
      <div style={{fontSize:size,fontWeight:800,lineHeight:1.08,letterSpacing:-1.4}}>{name}</div>
      <div style={{width:196,height:7,borderRadius:7,background:primary,marginTop:6}}/>
      <div style={{fontSize:23,letterSpacing:2.4,textTransform:'uppercase',color:'#95A6BF'}}>{subject} · {foot}</div>
    </div>
    <Img src={diagram} style={{position:'absolute',right:108,top:232,width:640,height:620,objectFit:'contain',opacity:.96}}/>
    <Img src={brand} style={{position:'absolute',right:108,bottom:44,width:56,height:56}}/>
  </AbsoluteFill>;
};
registerRoot(() => <>
  <Composition id="cover" component={Cover} width={1920} height={1080} fps={30} durationInFrames={1}/>
  <Composition id="audit" component={Cover} width={1000} height={900} fps={30} durationInFrames={1}/>
</>);
