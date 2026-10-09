import React from 'react';
import {COLORS, FONT, alpha} from '../theme';
export type Trace={name:string; fn:(q:number)=>number; color:string; dashed?:boolean};
export type Mark={q:number;p:number;label:string;color?:string};
export type Area={points:number[][];color:string;label?:string};
/** Inverse price curves: x is always quantity, y is always price/cost. */
export const MarketDiagram:React.FC<{curves:Trace[];marks?:Mark[];areas?:Area[];xMax?:number;yMax?:number;xLabel?:string;yLabel?:string;footer?:string}> = ({curves,marks=[],areas=[],xMax=10,yMax=18,xLabel='Quantity',yLabel='Price / cost',footer=''})=>{
 const px=(q:number)=>95+q/xMax*740,py=(p:number)=>490-p/yMax*380;
 const path=(fn:Trace['fn'])=>Array.from({length:121},(_,i)=>{const q=i*xMax/120;return {q,p:fn(q)};}).filter(({p})=>Number.isFinite(p)&&p>=0&&p<=yMax).map(({q,p},i)=>`${i?'L':'M'}${px(q)},${py(p)}`).join(' ');
 return <svg data-k="figure" data-n="economic curves" width={950} height={620} viewBox="0 0 950 620" style={{fontFamily:FONT,overflow:'visible'}}>
 <defs><clipPath id="plot"><rect x={95} y={95} width={740} height={395}/></clipPath></defs>
 {[0,1,2,3,4].map(i=><g key={i}><line x1={95} x2={835} y1={py(i*yMax/4)} y2={py(i*yMax/4)} stroke={COLORS.grid}/><text x={78} y={py(i*yMax/4)+7} textAnchor="end" fontSize={21} fill={COLORS.textDim}>{(i*yMax/4).toFixed(1)}</text><text x={px(i*xMax/4)} y={523} textAnchor="middle" fontSize={21} fill={COLORS.textDim}>{(i*xMax/4).toFixed(1)}</text></g>)}
 <path d="M95 95 V490 H845" fill="none" stroke={COLORS.axis} strokeWidth={2}/>
 <text x={95} y={32} fontSize={26} fill={COLORS.textStrong}>{yLabel}</text><text x={720} y={563} fontSize={26} fill={COLORS.textStrong}>{xLabel}</text>
 <g clipPath="url(#plot)">{areas.map((a,i)=><polygon key={i} points={a.points.map(([q,p])=>`${px(q)},${py(p)}`).join(' ')} fill={alpha(a.color,.22)} stroke={a.color} strokeWidth={2}/>)}
 {curves.map(c=><path key={c.name} d={path(c.fn)} stroke={c.color} fill="none" strokeWidth={4} strokeDasharray={c.dashed?'9 7':undefined}/>)}
 {marks.map((m,i)=><g key={i}><path d={`M95 ${py(m.p)} H${px(m.q)} V490`} fill="none" stroke={m.color||COLORS.result} strokeWidth={2} strokeDasharray="5 5"/><circle cx={px(m.q)} cy={py(m.p)} r={9} fill={m.color||COLORS.result}/></g>)}
 </g>
 {curves.filter(c=>c.name).map((c,i)=><g key={c.name}><line x1={220+i*155} x2={252+i*155} y1={60} y2={60} stroke={c.color} strokeWidth={4}/><text x={260+i*155} y={69} fill={c.color} fontSize={23}>{c.name}</text></g>)}
 {marks.map((m,i)=><text key={i} x={600} y={120+i*34} fontSize={24} fill={m.color||COLORS.result}>{m.label}</text>)}
 <text x={95} y={605} fontSize={26} fontWeight={700} fill={COLORS.textStrong}>{footer}</text>
 </svg>;
};
/** Bundle position and utility level are real state inputs, not reveal flags. */
export const UtilityPlane:React.FC<{x:number;budget:number}> = ({x,budget})=>{
 const y=budget-x,u=Math.sqrt(x*y),px=(q:number)=>90+q*55,py=(q:number)=>510-q*38;
 return <svg data-k="figure" width={950} height={620} viewBox="0 0 950 620" style={{fontFamily:FONT}}>
 <path d="M90 90 V510 H790" fill="none" stroke={COLORS.axis} strokeWidth={2}/>
 <text x={90} y={65} fill={COLORS.textStrong} fontSize={28}>Good Y</text><text x={670} y={555} fill={COLORS.textStrong} fontSize={28}>Good X</text>
 {[2,4,6,8,10].map(v=><g key={v}><text x={px(v)} y={538} fill={COLORS.textDim} fontSize={22}>{v}</text><text x={55} y={py(v)} fill={COLORS.textDim} fontSize={22}>{v}</text></g>)}
 <line x1={px(0)} y1={py(budget)} x2={px(budget)} y2={py(0)} stroke={COLORS.alt} strokeWidth={4}/>
 {[3,4,5].map(level=><path key={level} d={Array.from({length:90},(_,i)=>{const q=Math.max(1,level*level/10)+i*(10-Math.max(1,level*level/10))/89;return `${i?'L':'M'} ${px(q)} ${py(level*level/q)}`}).join(' ')} fill="none" stroke={level===5?COLORS.result:COLORS.primary} strokeWidth={3} opacity={.8}/>)}
 <path d={`M${px(x)} 510 V${py(y)} H90`} fill="none" stroke={COLORS.accent} strokeDasharray="6 6"/><circle cx={px(x)} cy={py(y)} r={12} fill={COLORS.accent}/>
 <text x={715} y={150} fill={COLORS.alt} fontSize={25}>x + y = {budget.toFixed(0)}</text><text x={715} y={200} fill={COLORS.accent} fontSize={25}>x = {x.toFixed(1)}</text><text x={715} y={240} fill={COLORS.accent} fontSize={25}>y = {y.toFixed(1)}</text><text x={715} y={280} fill={COLORS.result} fontSize={25}>U = {u.toFixed(2)}</text>
 <text x={90} y={600} fill={COLORS.textStrong} fontSize={27}>Utility = √(xy) · maximum at equal spending</text>
 </svg>;
};
