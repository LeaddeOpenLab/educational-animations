import React from 'react';
import {COLORS, FONT, fadeIn, slideUp} from '../theme';
import {Axes} from '../components/Plot';
import {TensorBars, QuantizedAxis, ScoreDistribution, quantize} from '../components/EdgeAI';
import {quantizationState,quantizationConstants} from '../mechanisms/edge02-quantization';
const T={...quantizationConstants,state:quantizationState,selected:.14};
const DESIGN_AUDIT={visualArgument:'An affine integer code approximates a real value and saturates at int8 endpoints.',motion:'Float markers converge onto lattice locations, an inverse arithmetic path reconstructs one value, and an overflow marker stops at the limit.',example:'0.14 maps to code −2 and reconstructs to0.1; input14 clips from attempted137 to127.',antiTemplate:'The main object is one real-valued ruler and residual distance, not a buffer, calibration range or channel array.',sceneRationale:'Four scenes separate affine coordinates, nearest-code rounding, inverse reconstruction and a distinct clipping example so two error sources cannot be confused.'};

const QuantFrame:React.FC<{frame:number;title:string;copy:string[];foot:string;children:React.ReactNode}>=({frame,title,copy,foot,children})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,color:COLORS.textStrong,fontFamily:FONT,padding:'110px 108px 80px',display:'flex',gap:112}}>
 <div style={{width:620,flexShrink:0,display:'flex',flexDirection:'column',gap:34}}>
  <div data-k="text" style={{color:COLORS.primary,fontSize:21,letterSpacing:3,opacity:fadeIn(frame,2)}}>EDGE AI · INT8 QUANTIZATION</div>
  <div data-k="text" style={{fontSize:54,fontWeight:700,lineHeight:1.17,opacity:fadeIn(frame,12),transform:`translateY(${slideUp(frame,12)}px)`}}>{title}</div>
  {copy.map((line,i)=><div data-k="text" key={i} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted,opacity:fadeIn(frame,24+i*12)}}>{line}</div>)}
  <div data-k="text" style={{marginTop:'auto',fontSize:28,lineHeight:1.4,color:COLORS.accent,opacity:fadeIn(frame,48)}}>{foot}</div>
 </div>
 <svg data-k="figure" width={1000} height={720} viewBox="0 0 1000 720" style={{flexShrink:0,marginTop:70,overflow:'visible',opacity:fadeIn(frame,18)}}>{children}</svg>
</div>;

const text=(x:number,y:number,label:string,size=28,color=COLORS.textStrong)=><text x={x} y={y} fill={color} fontSize={size} fontFamily={FONT} textAnchor="middle">{label}</text>;
const ramp=(f:number,start:number,dur=45)=>Math.max(0,Math.min(1,(f-start)/dur));

const Lattice:React.FC<{frame:number}>=({frame})=>{const q=quantize(T.selected,T.scale,T.zeroPoint);return <QuantFrame frame={frame} title="Real values meet a grid" copy={[`Scale ${T.scale.toFixed(1)}; zero point ${T.zeroPoint}.`,'The grid contains discrete representable values.']} foot="An int8 value is a code, not a real number.">
 <g transform="translate(50,100)"><Axes width={900} height={470} xDomain={[-.5,1.1]} yDomain={[-1,2]}>{s=><QuantizedAxis s={s} values={T.values} scale={T.scale} zeroPoint={T.zeroPoint} mix={0} y={0}/>}</Axes></g>
 {text(500,620,`${T.selected} / ${T.scale} + (${T.zeroPoint}) = ${q.unrounded.toFixed(1)}`,34,COLORS.accent)}
 </QuantFrame>;};
const Round:React.FC<{frame:number}>=({frame})=>{const m=T.state(Math.min(89,frame));return <QuantFrame frame={frame} title="Round to a code" copy={['Each value snaps to its nearest representable point.','The dashed gap is rounding error.']} foot="q = round(x / scale) + zero point">
 <g transform="translate(50,100)"><Axes width={900} height={470} xDomain={[-.5,1.1]} yDomain={[-1,2]}>{s=><QuantizedAxis s={s} values={m.values} scale={T.scale} zeroPoint={T.zeroPoint} mix={m.mix} y={0}/>}</Axes></g>
 {text(500,640,'INTEGER CODE → RECONSTRUCTED REAL',28,COLORS.accent)}
 </QuantFrame>;};
const Reconstruct:React.FC<{frame:number}>=({frame})=>{const q=quantize(T.selected,T.scale,T.zeroPoint);const x=q.value+(q.reconstructed-q.value)*ramp(frame,60,60);const pos=(v:number)=>150+v*3500;return <QuantFrame frame={frame} title="Recover an approximation" copy={['Undo the affine encoding.','Rounding has already discarded detail.']} foot="x̂ = (q − zero point) × scale">
 {text(500,120,`(${q.integer} − (${T.zeroPoint})) × ${T.scale} = ${q.reconstructed.toFixed(2)}`,35)}
 <line x1={150} x2={850} y1={350} y2={350} stroke={COLORS.axis} strokeWidth={4}/>
 <circle cx={pos(q.value)} cy={350} r={16} fill="none" stroke={COLORS.primary} strokeWidth={4}/><circle cx={pos(x)} cy={350} r={11} fill={COLORS.result}/>
 {text(pos(q.value),290,`original ${q.value}`,28,COLORS.primary)}{text(pos(x),420,`reconstructed ${x.toFixed(2)}`,28,COLORS.result)}
 <line x1={pos(q.reconstructed)} x2={pos(q.value)} y1={505} y2={505} stroke={COLORS.accent} strokeWidth={8} opacity={ramp(frame,120,20)}/>{frame>120&&text(500,600,`ABSOLUTE ERROR ${Math.abs(q.value-q.reconstructed).toFixed(2)}`,33,COLORS.accent)}
 </QuantFrame>;};
const Saturate:React.FC<{frame:number}>=({frame})=>{const m=T.state(90+Math.max(0,frame-45));const q=m.entries[0];return <QuantFrame frame={frame} title="Out of range? Clip." copy={['The integer code cannot exceed its endpoint.','Clipping can exceed normal rounding error.']} foot="Signed int8 ends at code 127.">
 {text(500,70,`ATTEMPTED CODE ${q.rounded} → STORED ${q.integer}`,32,COLORS.warn)}
 <g transform="translate(50,150)"><Axes width={900} height={380} xDomain={[12.5,14.5]} yDomain={[-1,1]}>{s=><g><QuantizedAxis s={s} values={m.values} scale={T.scale} zeroPoint={T.zeroPoint} mix={m.mix}/><line x1={s.px(q.reconstructed)} x2={s.px(q.reconstructed)} y1={s.py(-.6)} y2={s.py(.7)} stroke={COLORS.warn} strokeDasharray="8 5" strokeWidth={4}/></g>}</Axes></g>
 {text(500,610,`INPUT ${q.value} → RECONSTRUCTED ${q.reconstructed.toFixed(1)}`,34,COLORS.accent)}
 </QuantFrame>;};
export const SCENES=[{id:'lattice',Comp:Lattice,dur:180},{id:'round',Comp:Round,dur:240},{id:'reconstruct',Comp:Reconstruct,dur:240},{id:'saturate',Comp:Saturate,dur:240}];
