import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines} from '../components/ui';
import {Axes} from '../components/Plot';
import {COLORS,FONT,alpha,fadeIn,ramp} from '../theme';
import {SignalWindow} from '../components/EdgeAI';
import {featureState} from '../mechanisms/edge11-state';
const T = {samples:4, width:950, height:650, squareY:300, sumY:440};
const DESIGN_AUDIT = {
 visualArgument:'Signed sensor stems turn into nonnegative squared contributions, then a numerical reduction produces RMS.',
 motion:'Each sample feeds its own square cell; four contributions enter a running sum. A different waveform preserves RMS at the end.',
 example:'The alternating sequence [-1,1,-1,1] and constant [1,1,1,1] both have RMS 1 but different means.',
 antiTemplate:'Unlike the next sliding-window lesson, this diagram changes the representation of one fixed input rather than its membership.',
 sceneRationale:'Four scenes are needed to establish samples, explain squaring, show sum/divide/root, and expose the information lost by this summary feature.'
};
const FeatureView=({frame,local,phase}:{frame:number;local:number;phase:number})=>{
 const v=featureState(frame);
 const words=[['From Samples to a Feature','Four signed measurements fill one sensor window.'],['Square Each Amplitude','Each sign disappears after squaring; both directions contribute energy.'],['Reduce the Window','Add the squares, divide by the sample count, then take the square root.'],['Same RMS, Different Signal','RMS summarizes amplitude. It does not preserve waveform shape.']][phase];
 return <><Backdrop width={1920} height={1080}/><Kicker text="EDGE AI · FEATURE EXTRACTION" frame={local}/><Heading text={words[0]} frame={local} width={650} size={53}/><Lines items={[words[1],phase===3?'The mean changes from 0 to 1; RMS stays at 1.':'Example amplitudes are illustrative.']} frame={local} top={345} width={615} size={30}/>
 <svg data-k="figure" data-n="sample squares and RMS" width={T.width} height={T.height} viewBox="0 0 950 650" style={{position:'absolute',left:850,top:250,fontFamily:FONT,opacity:fadeIn(local,12,15)}}>
  <g transform="translate(20,0)"><Axes width={900} height={230} xDomain={[-.5,4.5]} yDomain={[-1.5,1.5]} pad={{l:60,r:70,t:35,b:45}} xTicks={[0,1,2,3]} yTicks={[-1,0,1]}>{s=><SignalWindow s={s} samples={v.samples} start={0} size={T.samples}/>}</Axes></g>
  {phase===0&&<text x={470} y={345} textAnchor="middle" fill={COLORS.textStrong} fontSize={40}>x = [{v.samples.join(', ')}]</text>}
  {phase>=1&&v.samples.map((n,i)=>{
   const x=150+i*185;const progress=ramp(frame,170+i*35,28);
   return <g key={i} opacity={fadeIn(local,20+i*10,12)}>
    <line x1={x} x2={x} y1={225} y2={280} stroke={COLORS.axis} strokeWidth={3}/>
    <circle cx={x} cy={225+55*progress} r={8} fill={COLORS.accent}/>
    <rect x={x-66} y={285} width={132} height={70} rx={12} fill={alpha(COLORS.accent,.12)} stroke={COLORS.accent} strokeWidth={2}/>
    <text x={x} y={330} textAnchor="middle" fill={COLORS.textStrong} fontSize={30}>{i<v.squareCount?`${n<0?`(${n})`:n}² = ${v.squared[i]}`:'·'}</text>
   </g>;
  })}
  {phase>=2&&<g opacity={fadeIn(local,25,16)}>
   <text x={100} y={435} fill={COLORS.textMuted} fontSize={27}>SUM OF SQUARES</text>
   <rect x={425} y={392} width={360*v.count/T.samples} height={58} rx={8} fill={alpha(COLORS.result,.35)}/>
   <text x={465} y={433} fill={COLORS.textStrong} fontSize={38}>{v.sum}</text>
   <text x={130} y={535} fill={COLORS.textStrong} fontSize={34}>{v.rms===null?'Accumulate each contribution':`√(${v.sum} / ${T.samples}) = ${v.rms.toFixed(2)}`}</text>
   {phase===3&&<text x={130} y={603} fill={COLORS.accent} fontSize={31}>Mean = {v.mean.toFixed(2)} · RMS = {v.rms?.toFixed(2)}</text>}
  </g>}
 </svg></>;
};
const Samples=({frame}:{frame:number})=><FeatureView frame={frame} local={frame} phase={0}/>;
const Squares=({frame}:{frame:number})=><FeatureView frame={frame+150} local={frame} phase={1}/>;
const Reduction=({frame}:{frame:number})=><FeatureView frame={frame+360} local={frame} phase={2}/>;
const Compare=({frame}:{frame:number})=><FeatureView frame={frame+660} local={frame} phase={3}/>;
export const SCENES=[{id:'samples',Comp:Samples,dur:150},{id:'squares',Comp:Squares,dur:210},{id:'reduce',Comp:Reduction,dur:300},{id:'compare',Comp:Compare,dur:180}];
