import React from 'react';
import {Axes} from '../components/Plot';
import {calibrate,quantize} from '../components/EdgeAI';
import {COLORS} from '../theme';
export const calibrationConstants={samples:[0,.4,1,2],narrow:[0,.4,1],runtime:2};
export const calibrationState=(frame:number)=>{
 const count=Math.max(1,Math.min(4,Math.floor(frame/30)+1));
 const observed=calibrationConstants.samples.slice(0,count);
 const range=calibrate(observed),narrow=calibrate(calibrationConstants.narrow),full=calibrate(calibrationConstants.samples);
 const mix=Math.max(0,Math.min(1,(frame-120)/30));
 const probes=[narrow,full].map(c=>quantize(calibrationConstants.runtime,c.scale,c.zeroPoint));
 return {count,observed,range,narrow,full,probes,mix,positions:probes.map(q=>q.value+(q.reconstructed-q.value)*mix)};
};
export const CalibrationCore:React.FC<{frame:number}>=({frame})=>{const m=calibrationState(frame);return <Axes width={920} height={450} xDomain={[-.2,2.4]} yDomain={[-1,2]}>{s=><g>
 <line x1={s.px(m.range.min)} x2={s.px(m.range.max)} y1={s.py(1.5)} y2={s.py(1.5)} stroke={COLORS.accent} strokeWidth={12}/>
 {m.observed.map((v,i)=><circle key={i} cx={s.px(v)} cy={s.py(1.5)} r={9} fill={COLORS.primary}/>)}
 {m.positions.map((v,i)=><g key={i}><line x1={s.px(0)} x2={s.px(i===0?m.narrow.max:m.full.max)} y1={s.py(.4-i*.8)} y2={s.py(.4-i*.8)} stroke={COLORS.axis} strokeWidth={5}/><circle cx={s.px(v)} cy={s.py(.4-i*.8)} r={13} fill={i===0?COLORS.warn:COLORS.result}/><text x={s.px(v)} y={s.py(.4-i*.8)-20} fill={COLORS.textStrong} fontSize={24} textAnchor="middle">{v.toFixed(2)}</text></g>)}
 </g>}</Axes>;};
