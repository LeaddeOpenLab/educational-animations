import React from 'react';
import {COLORS, FONT, fadeIn, slideUp} from '../theme';
import {Axes} from '../components/Plot';
import {TensorBars, QuantizedAxis, ScoreDistribution, quantize} from '../components/EdgeAI';
import {quantizedMacState,macConstants} from '../mechanisms/edge05-mac';
const T={...macConstants,state:quantizedMacState};
const DESIGN_AUDIT={visualArgument:'Centered integer products accumulate to a signed sum that represents a scaled real value.',motion:'Zero points are subtracted, matching operands produce signed bars, terms move into a cancelling accumulator, then the sum changes units.',example:'[5,7,4] minus3 times[2,-1,3] gives[4,-4,3], sum3, real.06, output code4.',antiTemplate:'A signed accumulator cancels contributions; other quantization lessons move scalar points or compare scales.',sceneRationale:'Five scenes separate centering, products, accumulation, real-unit conversion and output encoding because accumulator codes and output codes have different meanings.'};

const MacFrame:React.FC<{frame:number;title:string;copy:string[];foot:string;children:React.ReactNode}>=({frame,title,copy,foot,children})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,color:COLORS.textStrong,fontFamily:FONT,padding:'110px 108px 80px',display:'flex',gap:112}}>
 <div style={{width:620,flexShrink:0,display:'flex',flexDirection:'column',gap:34}}>
  <div data-k="text" style={{color:COLORS.primary,fontSize:21,letterSpacing:3,opacity:fadeIn(frame,2)}}>EDGE AI · QUANTIZED MAC</div>
  <div data-k="text" style={{fontSize:54,fontWeight:700,lineHeight:1.17,opacity:fadeIn(frame,12),transform:`translateY(${slideUp(frame,12)}px)`}}>{title}</div>
  {copy.map((line,i)=><div data-k="text" key={i} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted,opacity:fadeIn(frame,24+i*12)}}>{line}</div>)}
  <div data-k="text" style={{marginTop:'auto',fontSize:28,lineHeight:1.4,color:COLORS.accent,opacity:fadeIn(frame,48)}}>{foot}</div>
 </div>
 <svg data-k="figure" width={1000} height={720} viewBox="0 0 1000 720" style={{flexShrink:0,marginTop:70,overflow:'visible',opacity:fadeIn(frame,18)}}>{children}</svg>
</div>;

const text=(x:number,y:number,label:string,size=28,color=COLORS.textStrong)=><text x={x} y={y} fill={color} fontSize={size} fontFamily={FONT} textAnchor="middle">{label}</text>;
const ramp=(f:number,start:number,dur=45)=>Math.max(0,Math.min(1,(f-start)/dur));

const Center:React.FC<{frame:number}>=({frame})=>{const m=T.state(0);const mix=ramp(frame,40,60);return <MacFrame frame={frame} title="Subtract the zero point" copy={['Raw codes include an offset.','Multiplication uses centered codes.']} foot={`Input zero point ${T.zeroInput}; weight zero point ${T.zeroWeight}.`}>
 {T.inputs.map((v,i)=><g key={i}>{text(170+i*310,150,String(v),44,COLORS.primary)}{text(170+i*310,255,`− ${T.zeroInput}`,35,COLORS.accent)}<line x1={170+i*310} x2={170+i*310} y1={285} y2={285+120*mix} stroke={COLORS.axis} strokeWidth={5}/>{mix===1&&text(170+i*310,475,String(m.centered[i]),48,COLORS.result)}</g>)}
 {text(500,625,'CENTERED INPUTS',31,COLORS.result)}
 </MacFrame>;};
const Products:React.FC<{frame:number}>=({frame})=>{const m=T.state(0);const count=Math.min(3,Math.max(0,Math.floor((frame-40)/30)+1));return <MacFrame frame={frame} title="Multiply matching entries" copy={['Each input meets its matching weight.','A negative weight produces a negative term.']} foot="Products retain their signs.">
 {m.products.map((p,i)=><g key={i}>{text(500,125+i*200,`${m.centered[i]} × ${T.weights[i]}`,37)}<line x1={500} x2={500} y1={160+i*200} y2={235+i*200} stroke={COLORS.axis} strokeWidth={3}/>{i<count&&<><rect x={500+Math.min(0,p)*70} y={180+i*200} width={Math.abs(p)*70} height={37} fill={p<0?COLORS.warn:COLORS.primary}/>{text(850,210+i*200,String(p),38,COLORS.accent)}</>}</g>)}
 </MacFrame>;};
const Accumulate:React.FC<{frame:number}>=({frame})=>{const local=Math.max(0,(frame-35)*.6);const m=T.state(local);const inFlight=Math.min(2,m.count);const step=local%30/30;return <MacFrame frame={frame} title="Accumulate in int32" copy={['Add one signed product at a time.','The negative term cancels the first.']} foot="Do not narrow after each product.">
 {m.products.map((p,i)=><g key={i} opacity={i<m.count?.3:1}><rect x={110+i*290} y={95} width={200} height={88} rx={12} fill={COLORS.bg2}/>{text(210+i*290,154,String(p),43,COLORS.primary)}</g>)}
 {m.count<3&&<g transform={`translate(${210+inFlight*290+(500-(210+inFlight*290))*step},${195+140*step})`}><circle r={32} fill={COLORS.accent}/>{text(0,10,String(m.products[inFlight]),28,COLORS.bg0)}</g>}
 <line x1={130} x2={850} y1={500} y2={500} stroke={COLORS.axis} strokeWidth={4}/><circle cx={490+m.accumulator*70} cy={500} r={18} fill={COLORS.result}/>{text(500,430,`INT32 SUM = ${m.accumulator}`,42,COLORS.result)}
 {text(500,620,`Terms accumulated: ${m.count} / ${m.products.length}`,30,COLORS.textMuted)}
 </MacFrame>;};
const Units:React.FC<{frame:number}>=({frame})=>{const m=T.state(90);const factor=T.inputScale*T.weightScale;const ready=frame>70;return <MacFrame frame={frame} title="Restore real units" copy={['Input and weight scales multiply.','Bias is omitted in this example.']} foot="The integer sum represents a real quantity.">
 {text(500,125,`INTEGER SUM ${m.accumulator}`,43,COLORS.primary)}{text(500,290,`× (${T.inputScale} × ${T.weightScale})`,38,COLORS.accent)}
 <line x1={500} x2={500} y1={330} y2={330+110*ramp(frame,35,45)} stroke={COLORS.axis} strokeWidth={5}/>
 {ready&&<g opacity={fadeIn(frame,70)}>{text(500,505,`REAL OUTPUT ${m.real.toFixed(2)}`,45,COLORS.result)}{text(500,635,`Scale product = ${factor.toFixed(2)}`,30,COLORS.textMuted)}</g>}
 </MacFrame>;};
const Requantize:React.FC<{frame:number}>=({frame})=>{const m=T.state(90);const stage=frame<55?0:frame<90?1:2;return <MacFrame frame={frame} title="Encode the next output" copy={['The next operator may use another scale.','Output code and accumulator are different.']} foot={`Output scale ${T.outputScale}; zero point ${T.outputZeroPoint}.`}>
 {text(500,100,`REAL VALUE ${m.real.toFixed(2)}`,38,COLORS.result)}
 {stage>=1&&<g opacity={fadeIn(frame,55)}>{text(500,260,`${m.real.toFixed(2)} / ${T.outputScale} + (${T.outputZeroPoint})`,38,COLORS.accent)}</g>}
 {stage>=2&&<g opacity={fadeIn(frame,90)}><rect x={275} y={365} width={450} height={130} rx={18} fill={COLORS.bg2} stroke={COLORS.result} strokeWidth={3}/>{text(500,447,`INT8 CODE ${m.output.integer}`,43,COLORS.result)}{text(500,610,`Reconstructs to ${m.output.reconstructed.toFixed(2)}`,32)}</g>}
 </MacFrame>;};
export const SCENES=[{id:'center',Comp:Center,dur:180},{id:'products',Comp:Products,dur:180},{id:'accumulate',Comp:Accumulate,dur:270},{id:'units',Comp:Units,dur:180},{id:'requantize',Comp:Requantize,dur:180}];
