import React from 'react';
import {COLORS, FONT, alpha} from '../theme';
export const SemaphoreBoard:React.FC<{count:number;limit:number;holders:string[];waiting:string[];handoff:number;event:string}>=({count,limit,holders,waiting,handoff,event})=><svg data-k="figure" data-n="permits and waiting tasks" width={950} height={620} viewBox="0 0 950 620" style={{fontFamily:FONT}}>
 <text x={90} y={60} fill={COLORS.textStrong} fontSize={30}>Stored permits: {count} / {limit}</text>
 {Array.from({length:limit},(_,i)=><g key={i}><rect x={120+i*140} y={100} width={96} height={85} rx={18} fill={i<count?alpha(COLORS.accent,.28):'none'} stroke={i<count?COLORS.accent:COLORS.axis} strokeWidth={3}/>{i<count?<circle cx={168+i*140} cy={142} r={24} fill={COLORS.accent}/>:null}</g>)}
 <text x={90} y={255} fill={COLORS.result} fontSize={28}>Permit acquired</text>
 {holders.map((h,i)=><g key={h}><rect x={120+i*170} y={290} width={130} height={76} rx={12} stroke={COLORS.result} fill={alpha(COLORS.result,.15)}/><text x={185+i*170} y={338} textAnchor="middle" fill={COLORS.result} fontSize={32}>Task {h}</text></g>)}
 <text x={90} y={435} fill={COLORS.warn} fontSize={28}>Waiting at count zero</text>
 {waiting.map((h,i)=><g key={h}><rect x={120+i*170} y={465} width={130} height={76} rx={12} stroke={COLORS.warn} fill={alpha(COLORS.warn,.12)}/><text x={185+i*170} y={513} textAnchor="middle" fill={COLORS.warn} fontSize={32}>Task {h}</text></g>)}
 {handoff>0&&handoff<1?<g><circle cx={700} cy={500-handoff*170} r={24} fill={COLORS.accent}/><text x={744} y={420} fill={COLORS.accent} fontSize={25}>A gives → C takes</text></g>:null}
 <text x={90} y={600} fill={COLORS.textStrong} fontSize={26}>{event}</text>
 </svg>;
