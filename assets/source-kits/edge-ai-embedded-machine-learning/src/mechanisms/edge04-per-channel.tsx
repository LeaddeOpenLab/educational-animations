import React from 'react';
import {Axes} from '../components/Plot';
import {channelScales,quantize} from '../components/EdgeAI';
import {COLORS} from '../theme';
export const channelConstants={channels:[[.01,.02,.04],[.5,1,2]]};
export const channelState=(frame:number)=>{
 const separate=frame>=90;
 const individual=channelScales(channelConstants.channels);
 const shared=Math.max(...individual);
 const scales=separate?individual:[shared,shared];
 const entries=channelConstants.channels.map((row,c)=>row.map(v=>quantize(v,scales[c],0,-127,127)));
 const errors=entries.map(row=>row.map(q=>Math.abs(q.reconstructed-q.value)));
 return {separate,scales,entries,errors,means:errors.map(row=>row.reduce((a,b)=>a+b,0)/row.length)};
};
export const ChannelCore:React.FC<{frame:number}>=({frame})=>{const m=channelState(frame);return <Axes width={920} height={460} xDomain={[-.005,.06]} yDomain={[-1,3]}>{s=><g>
 {m.entries[0].map((q,i)=><g key={i}><line x1={s.px(q.value)} x2={s.px(q.reconstructed)} y1={s.py(i)} y2={s.py(i)} stroke={COLORS.accent} strokeWidth={8}/><circle cx={s.px(q.value)} cy={s.py(i)} r={11} fill="none" stroke={COLORS.primary} strokeWidth={3}/><circle cx={s.px(q.reconstructed)} cy={s.py(i)} r={7} fill={COLORS.result}/><text x={s.px(.054)} y={s.py(i)+8} textAnchor="middle" fill={COLORS.textStrong} fontSize={24}>{q.integer}</text></g>)}
 </g>}</Axes>;};
