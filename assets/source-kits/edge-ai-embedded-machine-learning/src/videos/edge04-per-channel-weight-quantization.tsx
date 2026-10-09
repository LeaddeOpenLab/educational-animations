import React from 'react';
import {COLORS, FONT, fadeIn, slideUp} from '../theme';
import {Axes} from '../components/Plot';
import {TensorBars, QuantizedAxis, ScoreDistribution, quantize} from '../components/EdgeAI';
import {channelState,channelConstants} from '../mechanisms/edge04-per-channel';
const T={...channelConstants,state:channelState,plotMax:.055};
const DESIGN_AUDIT={visualArgument:'One large channel sets a coarse shared ruler that collapses distinct small weights.',motion:'Bars reveal unequal ranges, small values collapse to one code, a channel ruler contracts, and residual lengths shrink.',example:'Small weights .01 and .02 share code1 under scale2/127, but become32 and64 with scale.04/127.',antiTemplate:'A cross-channel same-axis error experiment replaces calibration samples and runtime probes.',sceneRationale:'Four scenes first establish unequal channel magnitudes, expose code collapse, assign per-channel scales and verify errors on identical axes.'};

const ChannelFrame:React.FC<{frame:number;title:string;copy:string[];foot:string;children:React.ReactNode}>=({frame,title,copy,foot,children})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,color:COLORS.textStrong,fontFamily:FONT,padding:'110px 108px 80px',display:'flex',gap:112}}>
 <div style={{width:620,flexShrink:0,display:'flex',flexDirection:'column',gap:34}}>
  <div data-k="text" style={{color:COLORS.primary,fontSize:21,letterSpacing:3,opacity:fadeIn(frame,2)}}>EDGE AI · PER-CHANNEL WEIGHTS</div>
  <div data-k="text" style={{fontSize:54,fontWeight:700,lineHeight:1.17,opacity:fadeIn(frame,12),transform:`translateY(${slideUp(frame,12)}px)`}}>{title}</div>
  {copy.map((line,i)=><div data-k="text" key={i} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted,opacity:fadeIn(frame,24+i*12)}}>{line}</div>)}
  <div data-k="text" style={{marginTop:'auto',fontSize:28,lineHeight:1.4,color:COLORS.accent,opacity:fadeIn(frame,48)}}>{foot}</div>
 </div>
 <svg data-k="figure" width={1000} height={720} viewBox="0 0 1000 720" style={{flexShrink:0,marginTop:70,overflow:'visible',opacity:fadeIn(frame,18)}}>{children}</svg>
</div>;

const text=(x:number,y:number,label:string,size=28,color=COLORS.textStrong)=><text x={x} y={y} fill={color} fontSize={size} fontFamily={FONT} textAnchor="middle">{label}</text>;
const ramp=(f:number,start:number,dur=45)=>Math.max(0,Math.min(1,(f-start)/dur));

const Ranges:React.FC<{frame:number}>=({frame})=>{const mix=ramp(frame,25,65);return <ChannelFrame frame={frame} title="Channels have unequal ranges" copy={['One filter contains small weights.','Another has much larger weights.']} foot="Each row is an output channel.">
 {T.channels.map((row,c)=><g key={c}>{text(500,80+c*290,`CHANNEL ${c?'B':'A'} · MAX ${Math.max(...row).toFixed(2)}`,29,c?COLORS.alt:COLORS.primary)}{row.map((v,i)=><g key={i}><rect x={130} y={130+c*290+i*53} width={v*300*mix} height={28} fill={c?COLORS.alt:COLORS.primary}/>{text(850,152+c*290+i*53,v.toFixed(2),27)}</g>)}</g>)}
 {text(500,670,'Shared real-value scale',27,COLORS.textMuted)}
 </ChannelFrame>;};
const Shared:React.FC<{frame:number}>=({frame})=>{const m=T.state(0);const mix=ramp(frame,50,60);const px=(v:number)=>120+v/T.plotMax*690;return <ChannelFrame frame={frame} title="A shared scale loses detail" copy={['The largest channel sets the common step.','Two small weights become the same code.']} foot={`Shared scale = ${m.scales[0].toFixed(5)}`}>
 {text(500,60,'CHANNEL A · MAGNIFIED REAL AXIS',29)}
 {m.entries[0].map((q,i)=>{const x=q.value+(q.reconstructed-q.value)*mix;return <g key={i}><line x1={120} x2={830} y1={200+i*160} y2={200+i*160} stroke={COLORS.axis} strokeWidth={3}/><circle cx={px(q.value)} cy={200+i*160} r={14} fill="none" stroke={COLORS.primary} strokeWidth={3}/><circle cx={px(x)} cy={200+i*160} r={10} fill={COLORS.accent}/>{text(500,260+i*160,`${q.value.toFixed(2)} → code ${q.integer} → ${q.reconstructed.toFixed(4)}`,29)}</g>})}
 </ChannelFrame>;};
const Separate:React.FC<{frame:number}>=({frame})=>{const m=T.state(Math.max(0,frame));const px=(v:number)=>120+v/T.plotMax*690;return <ChannelFrame frame={frame} title="Give each channel its ruler" copy={['Channel A gets a finer scale.','Channel B keeps its original scale.']} foot={`A scale ${m.scales[0].toFixed(5)} · B scale ${m.scales[1].toFixed(5)}`}>
 {text(500,70,m.separate?'PER-CHANNEL SCALES':'ONE SHARED SCALE',30,COLORS.accent)}
 {m.entries[0].map((q,i)=><g key={i}><line x1={px(q.value)} x2={px(q.reconstructed)} y1={200+i*150} y2={200+i*150} stroke={COLORS.accent} strokeWidth={8}/><circle cx={px(q.value)} cy={200+i*150} r={13} fill="none" stroke={COLORS.primary} strokeWidth={3}/><circle cx={px(q.reconstructed)} cy={200+i*150} r={8} fill={COLORS.result}/>{text(500,255+i*150,`code ${q.integer} · real ${q.reconstructed.toFixed(5)}`,30)}</g>)}
 {text(500,650,'Original weights stay fixed',28,COLORS.textMuted)}
 </ChannelFrame>;};
const Compare:React.FC<{frame:number}>=({frame})=>{const old=T.state(0),fresh=T.state(100);const grow=ramp(frame,30,70);return <ChannelFrame frame={frame} title="Verify the reconstruction" copy={['Compare identical original weights.','Residuals use the same horizontal scale.']} foot="Per-channel scaling reduces this channel’s error.">
 {text(500,75,'ABSOLUTE ERROR · CHANNEL A',31)}
 {old.errors[0].map((v,i)=><g key={i}>{text(125,190+i*145,T.channels[0][i].toFixed(2),28)}<rect x={230} y={153+i*145} width={v*65000*grow} height={30} fill={COLORS.warn}/><rect x={230} y={199+i*145} width={Math.max(2,fresh.errors[0][i]*65000*grow)} height={30} fill={COLORS.result}/></g>)}
 {text(500,610,`SHARED MAE ${old.means[0].toFixed(5)}`,30,COLORS.warn)}{text(500,675,`PER-CHANNEL MAE ${fresh.means[0].toFixed(5)}`,30,COLORS.result)}
 </ChannelFrame>;};
export const SCENES=[{id:'ranges',Comp:Ranges,dur:150},{id:'shared',Comp:Shared,dur:240},{id:'separate',Comp:Separate,dur:300},{id:'compare',Comp:Compare,dur:210}];
