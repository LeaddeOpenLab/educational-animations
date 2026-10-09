import React from 'react';
import {Axes} from '../components/Plot';
import {TensorBars, softmax} from '../components/EdgeAI';
import {COLORS} from '../theme';
export const pipelineConstants={raw:[128,160,96,192],offset:128,divisor:64};
export const pipelineState=(frame:number)=>{
  const count=Math.max(0,Math.min(4,Math.floor((frame-30)/20)+1));
  const normalized=pipelineConstants.raw.map(x=>(x-pipelineConstants.offset)/pipelineConstants.divisor);
  const squares=normalized.map(x=>x*x);
  const meanSquare=squares.reduce((a,b)=>a+b,0)/squares.length;
  const rms=Math.sqrt(meanSquare);
  return {count,normalized,visible:normalized.slice(0,count),squares,meanSquare,rms,scores:softmax([-rms,rms])};
};
export const PipelineCore:React.FC<{frame:number}>=({frame})=>{const m=pipelineState(frame);return <Axes width={920} height={460} xDomain={[-.8,1.8]} yDomain={[-3.7,.7]}>{s=><g>
  <TensorBars s={s} values={m.visible} names={pipelineConstants.raw.slice(0,m.count).map(String)} y={0} step={1}/>
  <text x={470} y={430} fill={COLORS.textStrong} fontSize={25}>RMS: {m.rms.toFixed(3)} · active score: {m.scores[1].toFixed(3)}</text>
</g>}</Axes>;};
