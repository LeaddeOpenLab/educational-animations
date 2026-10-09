import React from 'react';
import {Axes} from '../components/Plot';
import {macState,quantize} from '../components/EdgeAI';
import {COLORS} from '../theme';
export const macConstants={inputs:[5,7,4],weights:[2,-1,3],zeroInput:3,zeroWeight:0,inputScale:.2,weightScale:.1,outputScale:.01,outputZeroPoint:-2};
export const quantizedMacState=(frame:number)=>{
 const count=Math.max(0,Math.min(3,Math.floor(frame/30)));
 const mac=macState(macConstants.inputs,macConstants.weights,count,macConstants.zeroInput,macConstants.zeroWeight);
 const real=mac.accumulator*macConstants.inputScale*macConstants.weightScale;
 return {...mac,centered:macConstants.inputs.map(x=>x-macConstants.zeroInput),real,output:quantize(real,macConstants.outputScale,macConstants.outputZeroPoint)};
};
export const MacCore:React.FC<{frame:number}>=({frame})=>{const m=quantizedMacState(frame);return <Axes width={920} height={450} xDomain={[-5,5]} yDomain={[-1,3]}>{s=><g>
 {m.products.map((p,i)=><g key={i}><rect x={s.px(Math.min(0,p))} y={s.py(2-i)-15} width={Math.abs(p)*s.ux} height={30} fill={i<m.count?COLORS.accent:COLORS.primary}/><text x={s.px(0)} y={s.py(2-i)-30} fill={COLORS.textStrong} fontSize={24}>{m.centered[i]} × {macConstants.weights[i]} = {p}</text></g>)}
 <circle cx={s.px(m.accumulator)} cy={s.py(-.65)} r={14} fill={COLORS.result}/><text x={s.px(m.accumulator)} y={s.py(-.65)-24} textAnchor="middle" fill={COLORS.textStrong} fontSize={26}>sum {m.accumulator}</text>
 </g>}</Axes>;};
