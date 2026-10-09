import React from 'react';
import {COLORS, FONT, fadeIn, slideUp} from '../theme';
import {Axes} from '../components/Plot';
import {TensorBars, QuantizedAxis, ScoreDistribution, quantize} from '../components/EdgeAI';
import {calibrationState,calibrationConstants} from '../mechanisms/edge03-calibration';
const T={...calibrationConstants,state:calibrationState,midrange:.7};
const DESIGN_AUDIT={visualArgument:'Observed activations determine range, and missing coverage clips the same future input.',motion:'Samples extend a running range, a ruler acquires spacing, and identical probes stop at different endpoints.',example:'A narrow0–1 range clips runtime2 to1 while a representative0–2 range preserves2.',antiTemplate:'Here data changes the scale parameter; the preceding lesson holds scale fixed and only changes encoded values.',sceneRationale:'Four scenes distinguish observation from ruler construction, then test an unseen high value and finally compare precision at a shared midrange value.'};

const CalibrationFrame:React.FC<{frame:number;title:string;copy:string[];foot:string;children:React.ReactNode}>=({frame,title,copy,foot,children})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,color:COLORS.textStrong,fontFamily:FONT,padding:'110px 108px 80px',display:'flex',gap:112}}>
 <div style={{width:620,flexShrink:0,display:'flex',flexDirection:'column',gap:34}}>
  <div data-k="text" style={{color:COLORS.primary,fontSize:21,letterSpacing:3,opacity:fadeIn(frame,2)}}>EDGE AI · REPRESENTATIVE DATA</div>
  <div data-k="text" style={{fontSize:54,fontWeight:700,lineHeight:1.17,opacity:fadeIn(frame,12),transform:`translateY(${slideUp(frame,12)}px)`}}>{title}</div>
  {copy.map((line,i)=><div data-k="text" key={i} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted,opacity:fadeIn(frame,24+i*12)}}>{line}</div>)}
  <div data-k="text" style={{marginTop:'auto',fontSize:28,lineHeight:1.4,color:COLORS.accent,opacity:fadeIn(frame,48)}}>{foot}</div>
 </div>
 <svg data-k="figure" width={1000} height={720} viewBox="0 0 1000 720" style={{flexShrink:0,marginTop:70,overflow:'visible',opacity:fadeIn(frame,18)}}>{children}</svg>
</div>;

const text=(x:number,y:number,label:string,size=28,color=COLORS.textStrong)=><text x={x} y={y} fill={color} fontSize={size} fontFamily={FONT} textAnchor="middle">{label}</text>;
const ramp=(f:number,start:number,dur=45)=>Math.max(0,Math.min(1,(f-start)/dur));

const Observe:React.FC<{frame:number}>=({frame})=>{const m=T.state(Math.max(0,frame-35));const px=(v:number)=>130+v*350;return <CalibrationFrame frame={frame} title="Observe activations" copy={['Run representative inputs through the float model.','Calibration observes; it does not retrain weights.']} foot="Include real operating conditions.">
 {text(500,105,'FLOAT MODEL · WEIGHTS FIXED',31,COLORS.alt)}
 <line x1={px(0)} x2={px(m.range.max)} y1={350} y2={350} stroke={COLORS.accent} strokeWidth={14}/>
 {m.observed.map((v,i)=><g key={i}><circle cx={px(v)} cy={350} r={14} fill={COLORS.primary}/>{text(px(v),300,v.toFixed(1),29)}</g>)}
 {text(500,475,`OBSERVED RANGE [${m.range.min.toFixed(1)}, ${m.range.max.toFixed(1)}]`,32,COLORS.accent)}
 {text(500,600,`${m.count} activation observations`,29,COLORS.textMuted)}
 </CalibrationFrame>;};
const Range:React.FC<{frame:number}>=({frame})=>{const m=T.state(100);const intervals=10;const mix=ramp(frame,40,70);return <CalibrationFrame frame={frame} title="Build the quantized ruler" copy={['A finite code range covers the observed span.','Scale is the real distance per code.']} foot="Displayed ticks are a schematic subset.">
 <line x1={130} x2={850} y1={325} y2={325} stroke={COLORS.axis} strokeWidth={5}/>
 {Array.from({length:intervals+1},(_,i)=><line key={i} x1={130+i*72} x2={130+i*72} y1={325-25*mix} y2={325+25*mix} stroke={COLORS.primary} strokeWidth={4}/>)}
 {text(130,415,m.full.min.toFixed(1),32)}{text(850,415,m.full.max.toFixed(1),32)}
 {text(500,125,'255 INTERVALS BETWEEN INT8 ENDPOINTS',28,COLORS.accent)}
 {text(500,520,`scale = (${m.full.max} − ${m.full.min}) / 255`,33)}{text(500,610,`scale = ${m.full.scale.toFixed(5)}`,38,COLORS.result)}
 </CalibrationFrame>;};
const Missing:React.FC<{frame:number}>=({frame})=>{const m=T.state(120+Math.max(0,frame-60));const px=(v:number)=>130+v*350;return <CalibrationFrame frame={frame} title="Test the same new value" copy={[`Both branches receive activation ${T.runtime.toFixed(1)}.`,'Only calibration coverage changes.']} foot="A missing condition can cause clipping.">
 {[m.narrow,m.full].map((c,i)=><g key={i}>{text(500,110+i*295,i===0?'NARROW CALIBRATION':'REPRESENTATIVE CALIBRATION',28,i===0?COLORS.warn:COLORS.result)}<line x1={px(0)} x2={px(c.max)} y1={215+i*295} y2={215+i*295} stroke={COLORS.axis} strokeWidth={10}/><line x1={px(c.max)} x2={px(c.max)} y1={175+i*295} y2={255+i*295} stroke={COLORS.accent} strokeWidth={5}/><circle cx={px(m.positions[i])} cy={215+i*295} r={17} fill={i===0?COLORS.warn:COLORS.result}/>{text(px(m.positions[i]),290+i*295,m.mix<1?'clipping input…':`stored real ${m.probes[i].reconstructed.toFixed(2)}`,29)}</g>)}
 </CalibrationFrame>;};
const Tradeoff:React.FC<{frame:number}>=({frame})=>{const m=T.state(150);const ranges=[m.narrow,m.full];const mix=ramp(frame,50,60);const px=(v:number)=>140+(v-.675)*14000;return <CalibrationFrame frame={frame} title="Coverage costs resolution" copy={['Wider range means larger steps.','Validate accuracy after quantization.']} foot="Same number of codes; a different real span.">
 {ranges.map((c,i)=>{const q=quantize(T.midrange,c.scale,c.zeroPoint);const x=T.midrange+(q.reconstructed-T.midrange)*mix;return <g key={i}>{text(500,80+i*310,`STEP ${c.scale.toFixed(5)}`,30,i?COLORS.result:COLORS.primary)}<line x1={100} x2={900} y1={195+i*310} y2={195+i*310} stroke={COLORS.axis} strokeWidth={3}/>{Array.from({length:9},(_,j)=>{const v=q.reconstructed+(j-4)*c.scale;return <line key={j} x1={px(v)} x2={px(v)} y1={180+i*310} y2={210+i*310} stroke={COLORS.textDim} strokeWidth={3}/>})}<circle cx={px(x)} cy={195+i*310} r={13} fill={COLORS.accent}/>{text(500,265+i*310,`${T.midrange.toFixed(1)} → ${x.toFixed(4)}`,32)}</g>})}
 </CalibrationFrame>;};
export const SCENES=[{id:'observe',Comp:Observe,dur:210},{id:'range',Comp:Range,dur:210},{id:'missing',Comp:Missing,dur:270},{id:'tradeoff',Comp:Tradeoff,dur:240}];
