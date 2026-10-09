import React from 'react';
import {COLORS, FONT, fadeIn, slideUp} from '../theme';
import {Axes} from '../components/Plot';
import {TensorBars, QuantizedAxis, ScoreDistribution, quantize} from '../components/EdgeAI';
import {pipelineState,pipelineConstants} from '../mechanisms/edge01-pipeline';
const T={...pipelineConstants,state:pipelineState,framesPerSample:28};
const DESIGN_AUDIT={visualArgument:'Track a concrete sample block as each computation changes its representation.',motion:'Samples fill slots, signed normalized bars become squares, a sum becomes RMS, then scores select a class.',example:'128,160,96,192 become 0,.5,-.5,1; RMS sqrt(.375) feeds a toy softmax.',antiTemplate:'This is a data acquisition and representation chain; the next lesson instead snaps float values to a lattice.',sceneRationale:'Four scenes isolate acquisition, normalization, feature arithmetic and inference because each changes the data type or meaning.'};

const PipelineFrame:React.FC<{frame:number;title:string;copy:string[];foot:string;children:React.ReactNode}>=({frame,title,copy,foot,children})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,color:COLORS.textStrong,fontFamily:FONT,padding:'110px 108px 80px',display:'flex',gap:112}}>
 <div style={{width:620,flexShrink:0,display:'flex',flexDirection:'column',gap:34}}>
  <div data-k="text" style={{color:COLORS.primary,fontSize:21,letterSpacing:3,opacity:fadeIn(frame,2)}}>EDGE AI · SENSOR TO RESULT</div>
  <div data-k="text" style={{fontSize:54,fontWeight:700,lineHeight:1.17,opacity:fadeIn(frame,12),transform:`translateY(${slideUp(frame,12)}px)`}}>{title}</div>
  {copy.map((line,i)=><div data-k="text" key={i} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted,opacity:fadeIn(frame,24+i*12)}}>{line}</div>)}
  <div data-k="text" style={{marginTop:'auto',fontSize:28,lineHeight:1.4,color:COLORS.accent,opacity:fadeIn(frame,48)}}>{foot}</div>
 </div>
 <svg data-k="figure" width={1000} height={720} viewBox="0 0 1000 720" style={{flexShrink:0,marginTop:70,overflow:'visible',opacity:fadeIn(frame,18)}}>{children}</svg>
</div>;

const text=(x:number,y:number,label:string,size=28,color=COLORS.textStrong)=><text x={x} y={y} fill={color} fontSize={size} fontFamily={FONT} textAnchor="middle">{label}</text>;
const ramp=(f:number,start:number,dur=45)=>Math.max(0,Math.min(1,(f-start)/dur));

const Capture:React.FC<{frame:number}>=({frame})=>{const count=Math.min(T.raw.length,Math.max(0,Math.floor((frame-30)/T.framesPerSample)+1));return <PipelineFrame frame={frame} title="Capture a block" copy={['A sensor produces an ordered stream.','Four samples fill the input buffer.']} foot="Keep the sample order.">
 {T.raw.map((v,i)=><g key={i}><rect x={100+i*215} y={320} width={160} height={112} rx={12} fill={COLORS.bg1} stroke={COLORS.axis} strokeWidth={3}/>{text(180+i*215,475,`x[${i}]`,25,COLORS.textMuted)}{i<count&&<g opacity={fadeIn(frame,30+i*T.framesPerSample)}>{text(180+i*215,387,String(v),38,COLORS.primary)}</g>}</g>)}
 {text(500,185,'SENSOR → INPUT BUFFER',31)}
 <line x1={95} x2={95+count*215} y1={525} y2={525} stroke={COLORS.result} strokeWidth={9}/>{text(500,595,`${count} / ${T.raw.length} samples stored`,30,COLORS.result)}
 </PipelineFrame>;};
const Normalize:React.FC<{frame:number}>=({frame})=>{const m=T.state(frame);return <PipelineFrame frame={frame} title="Convert into model units" copy={['Subtract the sensor offset.','Divide by the training-time scale.']} foot={`(sample − ${T.offset}) / ${T.divisor}`}>
 <g transform="translate(25,100)"><Axes width={945} height={480} xDomain={[-1.2,1.8]} yDomain={[-3.7,.7]}>{s=><TensorBars s={s} values={m.visible} names={T.raw.slice(0,m.count).map(String)} y={0} step={1}/>}</Axes></g>
 {text(500,55,'RAW VALUE → NORMALIZED VALUE',30)}{text(500,650,'Below the offset becomes negative',29,COLORS.accent)}
 </PipelineFrame>;};
const Features:React.FC<{frame:number}>=({frame})=>{const m=T.state(120);const n=Math.min(4,Math.max(0,Math.floor((frame-30)/24)+1));const sum=m.squares.slice(0,n).reduce((a,b)=>a+b,0);const complete=n===4;return <PipelineFrame frame={frame} title="Extract one feature" copy={['Square each normalized sample.','Average, then take the square root.']} foot="RMS captures signal magnitude.">
 {m.normalized.map((x,i)=><g key={i} opacity={fadeIn(frame,20+i*10)}>{text(145+i*230,110,x.toFixed(2),31,COLORS.primary)}{text(145+i*230,175,'square',23,COLORS.textMuted)}<rect x={80+i*230} y={335-m.squares[i]*130*ramp(frame,30+i*24,18)} width={130} height={m.squares[i]*130*ramp(frame,30+i*24,18)} fill={COLORS.accent}/>{text(145+i*230,380,i<n?m.squares[i].toFixed(2):'—',31)}</g>)}
 {text(500,470,`SUM = ${sum.toFixed(2)}`,34,COLORS.accent)}
 {complete&&<g opacity={fadeIn(frame,108)}>{text(500,550,`MEAN SQUARE = ${m.meanSquare.toFixed(3)}`,31)}{text(500,640,`RMS = ${m.rms.toFixed(3)}`,43,COLORS.result)}</g>}
 </PipelineFrame>;};
const Infer:React.FC<{frame:number}>=({frame})=>{const m=T.state(120);const mix=ramp(frame,50,60);const scores=m.scores;return <PipelineFrame frame={frame} title="Compute a local result" copy={['The feature enters a small model.','A softmax converts logits into scores.']} foot="Illustrative model; choose the larger score.">
 {text(500,50,`RMS ${m.rms.toFixed(3)} → logits [−r, +r]`,31)}
 <g transform="translate(110,145)" opacity={mix}><Axes width={780} height={380} xDomain={[-.8,1.8]} yDomain={[-.15,1.15]}>{s=><ScoreDistribution s={s} scores={scores} names={['idle','active']}/>}</Axes></g>
 {frame>110&&<g opacity={fadeIn(frame,110)}><rect x={260} y={585} width={480} height={84} rx={14} fill={COLORS.result}/>{text(500,639,`LOCAL RESULT: ACTIVE`,33)}</g>}
 </PipelineFrame>;};
export const SCENES=[{id:'capture',Comp:Capture,dur:180},{id:'normalize',Comp:Normalize,dur:210},{id:'features',Comp:Features,dur:240},{id:'infer',Comp:Infer,dur:240}];
