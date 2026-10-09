import React from 'react';
import {COLORS,FONT} from '../theme';
import {Axes} from './Plot';
import {TensorBars,QuantizedAxis,ScoreDistribution,quantize,calibrate,channelScales,macState,softmax} from './EdgeAI';
const label=(x:number,y:number,value:string,color=COLORS.textStrong,size=26)=><text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} fontFamily={FONT}>{value}</text>;
const PipelineCover:React.FC=()=>{const raw=[128,160,96,192],normalized=raw.map(x=>(x-128)/64),rms=Math.sqrt(normalized.reduce((n,v)=>n+v*v,0)/normalized.length),scores=softmax([-rms,rms]);return <svg width={640} height={620} viewBox="0 0 640 620">
 {label(320,82,'SAMPLES → FEATURE → RESULT',COLORS.primary,25)}
 <g transform="translate(40,115)"><Axes width={560} height={230} xDomain={[-1.15,1.7]} yDomain={[-3.7,.7]} showArrows={false} pad={{l:25,r:25,t:20,b:15}}>{s=><g><TensorBars s={s} values={normalized} names={raw.map(()=> '')} y={0} step={1} progress={1}/>{raw.map((v,i)=><g key={i}>{label(28,s.py(-i)+8,String(v),COLORS.textMuted,24)}</g>)}</g>}</Axes></g>
 {label(320,392,`RMS = ${rms.toFixed(3)}`,COLORS.accent,34)}
 <g transform="translate(150,420)"><Axes width={340} height={138} xDomain={[-.7,1.7]} yDomain={[-.4,1.25]} showArrows={false} pad={{l:25,r:25,t:5,b:25}}>{s=><ScoreDistribution s={s} scores={scores} names={['idle','active']} progress={1}/>}</Axes></g>
 </svg>;};
const QuantizationCover:React.FC=()=>{const values=[-.26,.14,.87],scale=.1,zeroPoint=-3;return <svg width={640} height={620} viewBox="0 0 640 620">
 {label(320,85,'FLOAT → INT8 → REAL',COLORS.primary,30)}
 <g transform="translate(40,145)"><Axes width={560} height={330} xDomain={[-.5,1.1]} yDomain={[-.7,2.3]} showArrows={false} pad={{l:25,r:25,t:10,b:20}}>{s=><QuantizedAxis s={s} values={values} scale={scale} zeroPoint={zeroPoint} mix={1} y={0} progress={1}/>}</Axes></g>
 {label(320,510,`scale ${scale} · zero point ${zeroPoint}`,COLORS.accent,28)}{label(320,555,'Discrete codes, approximate values',COLORS.textMuted,25)}
 </svg>;};
const CalibrationCover:React.FC=()=>{const narrow=calibrate([0,.4,1]),full=calibrate([0,.4,1,2]),value=2,outputs=[narrow,full].map(c=>quantize(value,c.scale,c.zeroPoint).reconstructed);return <svg width={640} height={620} viewBox="0 0 640 620">
 {label(320,84,'SAME RUNTIME INPUT: 2.0',COLORS.primary,29)}{label(320,135,'Calibration coverage changes the result',COLORS.textMuted,23)}
 <g transform="translate(35,190)"><Axes width={570} height={275} xDomain={[-.9,2.55]} yDomain={[-1.9,.9]} showArrows={false} pad={{l:25,r:40,t:25,b:30}}>{s=><g><TensorBars s={s} values={outputs} names={['0–1','0–2']} y={0} step={1.2} color={COLORS.accent} progress={1}/><line x1={s.px(value)} x2={s.px(value)} y1={s.py(.6)} y2={s.py(-1.65)} stroke={COLORS.result} strokeWidth={3} strokeDasharray="7 6"/></g>}</Axes></g>
 {label(320,505,'Narrow range clips 2.0 to 1.0',COLORS.warn,27)}{label(320,555,'Representative range preserves 2.0',COLORS.result,25)}
 </svg>;};
const ChannelCover:React.FC=()=>{const channels=[[.01,.02,.04],[.5,1,2]],scales=channelScales(channels),shared=Math.max(...scales),base=channels[0].map(v=>quantize(v,shared,0)),fine=channels[0].map(v=>quantize(v,scales[0],0));return <svg width={640} height={620} viewBox="0 0 640 620">
 {label(320,80,'SMALL CHANNEL · SAME WEIGHTS',COLORS.primary,26)}
 {label(320,135,'SHARED SCALE · CODES 1 / 1 / 3',COLORS.warn,25)}
 <g transform="translate(45,160)"><Axes width={550} height={160} xDomain={[-.015,.065]} yDomain={[-2.9,.8]} showArrows={false} pad={{l:25,r:35,t:15,b:20}}>{s=><TensorBars s={s} values={base.map(q=>q.reconstructed)} names={channels[0].map(String)} y={0} step={1} color={COLORS.warn} progress={1}/>}</Axes></g>
 {label(320,365,'PER-CHANNEL · CODES 32 / 64 / 127',COLORS.result,25)}
 <g transform="translate(45,390)"><Axes width={550} height={160} xDomain={[-.015,.065]} yDomain={[-2.9,.8]} showArrows={false} pad={{l:25,r:35,t:15,b:20}}>{s=><TensorBars s={s} values={fine.map(q=>q.reconstructed)} names={channels[0].map(String)} y={0} step={1} color={COLORS.result} progress={1}/>}</Axes></g>
 {label(320,585,'Reconstructed values · same real scale',COLORS.textMuted,22)}
 </svg>;};
const MacCover:React.FC=()=>{const inputs=[5,7,4],weights=[2,-1,3],z=3,centered=inputs.map(v=>v-z),mac=macState(inputs,weights,3,z),real=mac.accumulator*.2*.1;return <svg width={640} height={620} viewBox="0 0 640 620">
 {label(320,80,'CENTER → MULTIPLY → ACCUMULATE',COLORS.primary,23)}{label(320,130,'['+inputs.join(', ')+'] − '+z+' = ['+centered.join(', ')+']',COLORS.textStrong,29)}
 <g transform="translate(45,190)"><Axes width={550} height={235} xDomain={[-5.7,6.3]} yDomain={[-2.9,.8]} showArrows={false} pad={{l:25,r:25,t:20,b:25}}>{s=><g><TensorBars s={s} values={mac.products} names={centered.map(()=> '')} y={0} step={1} progress={1}/>{centered.map((v,i)=><g key={i}>{label(36,s.py(-i)+8,`${v}×${weights[i]}`,COLORS.textMuted,24)}</g>)}</g>}</Axes></g>
 {label(320,486,`INT32 SUM = ${mac.accumulator}`,COLORS.accent,35)}{label(320,555,`× 0.02 → REAL ${real.toFixed(2)}`,COLORS.result,32)}
 </svg>;};
export const EDGE_COVERS_01:Record<string,React.FC>={
 'edge-inference-pipeline-from-sensor-to-result':PipelineCover,
 'quantization-from-float32-to-int8':QuantizationCover,
 'calibration-dataset-for-post-training-quantization':CalibrationCover,
 'per-channel-weight-quantization':ChannelCover,
 'quantized-multiply-and-accumulate':MacCover,
};
