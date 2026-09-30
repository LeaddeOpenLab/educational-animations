import React from 'react';
import { COLORS, FONT, alpha } from '../theme';
export type P=[number,number];
export const Atom:React.FC<{x:number;y:number;label:string;color?:string;charge?:string;opacity?:number}>=({x,y,label,color=COLORS.textStrong,charge,opacity=1})=><g opacity={opacity}><text x={x} y={y+10} textAnchor="middle" fill={color} fontFamily={FONT} fontSize={32} fontWeight={650} stroke={COLORS.bg1} strokeWidth={8} paintOrder="stroke">{label}</text>{charge&&<text x={x+label.length*10+10} y={y-16} fill={color} fontSize={23}>{charge}</text>}</g>;
export const Bond:React.FC<{a:P;b:P;order?:number;color?:string;progress?:number;style?:'dash'|'wedge'|'partial'}>=({a,b,order=1,color=COLORS.primary,progress=1,style})=>{
 const p=Math.max(0,Math.min(1,progress)),dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len;
 if(style==='wedge')return <polygon opacity={p} points={`${a} ${b[0]+nx*13},${b[1]+ny*13} ${b[0]-nx*13},${b[1]-ny*13}`} fill={color}/>;
 if(style==='dash')return <g opacity={p}>{Array.from({length:7},(_,i)=>{const t=(i+1)/8,w=12*t;return <line key={i} x1={a[0]+dx*t-nx*w} y1={a[1]+dy*t-ny*w} x2={a[0]+dx*t+nx*w} y2={a[1]+dy*t+ny*w} stroke={color} strokeWidth={3}/>;})}</g>;
 return <g>{Array.from({length:order>=2?2:1},(_,i)=>{const off=order>=2?(i-.5)*12:0;return <line key={i} x1={a[0]+nx*off} y1={a[1]+ny*off} x2={a[0]+dx*p+nx*off} y2={a[1]+dy*p+ny*off} stroke={color} strokeWidth={5} strokeLinecap="round" strokeDasharray={style==='partial'?'9 8':undefined}/>;})}</g>;
};
export type A={x:number;y:number;label:string;charge?:string;color?:string};
export type B={a:number;b:number;order?:number;style?:'dash'|'wedge'|'partial';color?:string};
export const Molecule:React.FC<{atoms:A[];bonds:B[];progress?:number}>=({atoms,bonds,progress=1})=><g>{bonds.map((b,i)=><Bond key={i} a={[atoms[b.a].x,atoms[b.a].y]} b={[atoms[b.b].x,atoms[b.b].y]} order={b.order} style={b.style} color={b.color} progress={Math.min(1,Math.max(0,(progress-i*.06)*1.6))}/>)}{atoms.map((a,i)=><Atom key={i} {...a} opacity={Math.min(1,progress*2)}/>)}</g>;
export const ElectronArrow:React.FC<{from:P;to:P;bend?:number;progress?:number;color?:string}>=({from,to,bend=65,progress=1,color=COLORS.accent})=>{
 const dx=to[0]-from[0],dy=to[1]-from[1],l=Math.hypot(dx,dy)||1,c:P=[(from[0]+to[0])/2-dy/l*bend,(from[1]+to[1])/2+dx/l*bend];
 const a=Math.atan2(to[1]-c[1],to[0]-c[0]);const head=`${to} ${to[0]-17*Math.cos(a-.4)},${to[1]-17*Math.sin(a-.4)} ${to[0]-17*Math.cos(a+.4)},${to[1]-17*Math.sin(a+.4)}`;
 return <g opacity={progress}><path d={`M${from} Q${c} ${to}`} fill="none" stroke={color} strokeWidth={4} pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/>{progress>.9&&<polygon points={head} fill={color}/>}</g>;
};
export const ReactionArrow:React.FC<{x:number;y:number;w?:number;label?:string;resonance?:boolean;progress?:number}>=({x,y,w=140,label,resonance=false,progress=1})=><g opacity={progress}><line x1={x} y1={y} x2={x+w} y2={y} stroke={COLORS.textMuted} strokeWidth={3}/><path d={`M${x+w-13},${y-7} L${x+w},${y} L${x+w-13},${y+7}`} fill="none" stroke={COLORS.textMuted} strokeWidth={3}/>{resonance&&<path d={`M${x+13},${y-7} L${x},${y} L${x+13},${y+7}`} fill="none" stroke={COLORS.textMuted} strokeWidth={3}/>}<text x={x+w/2} y={y-22} textAnchor="middle" fill={COLORS.accent} fontSize={23}>{label}</text></g>;
export const Newman:React.FC<{cx:number;cy:number;r?:number;angle:number;front?:string[];back?:string[];progress?:number}>=({cx,cy,r=100,angle,front=['H','H','H'],back=['H','H','H'],progress=1})=>{
 const point=(deg:number,len:number):P=>[cx+len*Math.cos(deg*Math.PI/180),cy+len*Math.sin(deg*Math.PI/180)];
 return <g opacity={progress}><circle cx={cx} cy={cy} r={r*.55} fill={alpha(COLORS.primary,.08)} stroke={COLORS.textMuted} strokeWidth={3}/>{back.map((s,i)=>{const a=-90+120*i+angle,tip=point(a,r*1.5);return <g key={i}><Bond a={point(a,r*.55)} b={point(a,r*1.17)} color={COLORS.accent}/><Atom x={tip[0]} y={tip[1]} label={s} color={COLORS.accent}/></g>;})}{front.map((s,i)=>{const a=-90+120*i,tip=point(a,r*1.07);return <g key={i}><Bond a={[cx,cy]} b={point(a,r*.76)} color={COLORS.primary}/><Atom x={tip[0]} y={tip[1]} label={s} color={COLORS.primary}/></g>;})}<circle cx={cx} cy={cy} r={8} fill={COLORS.primary}/></g>;
};
export const Chair:React.FC<{cx:number;cy:number;flip:number;sub?:string;progress?:number}>=({cx,cy,flip,sub='CH₃',progress=1})=>{
 const f=Math.max(0,Math.min(1,flip));const base:P[]=[[-210,30],[-110,-45],[80,-10],[210,-95],[110,65],[-80,30]];
 const p=base.map(([x,y])=>[cx+x,cy+y*(1-2*f)] as P);const tip:P=[p[0][0]-100*f,p[0][1]-110+65*f];
 return <g opacity={progress}>{p.map((q,i)=><Bond key={i} a={q} b={p[(i+1)%6]} color={COLORS.primary}/>)}<Bond a={p[0]} b={tip} color={COLORS.accent}/><Atom x={tip[0]} y={tip[1]-24} label={sub} color={COLORS.accent}/><text x={cx} y={cy+155} textAnchor="middle" fill={COLORS.textMuted} fontSize={25}>{f<.5?'axial, up':'equatorial, up'}</text></g>;
};
export const Orbitals:React.FC<{xs:number[];y:number;overlap?:boolean;progress?:number;gap?:number}>=({xs,y,overlap=false,progress=1,gap=-1})=><g opacity={progress}>{overlap&&xs.slice(1).map((x,i)=>i===gap?null:<g key={i}><ellipse cx={(x+xs[i])/2} cy={y-75} rx={(x-xs[i])/2+23} ry={38} fill={alpha(COLORS.accent,.23)}/><ellipse cx={(x+xs[i])/2} cy={y+75} rx={(x-xs[i])/2+23} ry={38} fill={alpha(COLORS.accent,.23)}/></g>)}{xs.map((x,i)=><g key={x}><ellipse cx={x} cy={y-70} rx={30} ry={66} fill={alpha(COLORS.primary,.16)} stroke={COLORS.primary} strokeWidth={3}/><ellipse cx={x} cy={y+70} rx={30} ry={66} fill={alpha(COLORS.result,.14)} stroke={COLORS.result} strokeWidth={3}/><circle cx={x} cy={y} r={9} fill={COLORS.textStrong}/></g>)}</g>;
export const Stereo:React.FC<{cx:number;cy:number;groups?:string[];mirror?:boolean;labels?:boolean;progress?:number}>=({cx,cy,groups=['Br','Cl','F','H'],mirror=false,labels=false,progress=1})=>{
 const sign=mirror?-1:1;const ends:P[]=[[-130,-75],[130,-75],[0,150],[90,80]];
 return <g opacity={progress}>{ends.map(([x,y],i)=><g key={i}><Bond a={[cx,cy]} b={[cx+sign*x,cy+y]} style={i===2?'wedge':i===3?'dash':undefined} color={i===2?COLORS.accent:COLORS.primary}/><Atom x={cx+sign*x*1.3} y={cy+y*1.25} label={groups[i]}/>{labels&&<text x={cx+sign*x*1.5} y={cy+y*1.25-28} fill={COLORS.accent} fontSize={23}>{i+1}</text>}</g>)}<Atom x={cx} y={cy} label="C"/></g>;
};
export const EnergyCurve:React.FC<{points:P[];progress?:number;label?:string}>=({points,progress=1,label})=>{
 const path=points.map((p,i)=>`${i?'L':'M'}${p}`).join(' ');
 return <g><path d="M90 560 H910 M90 560 V100" stroke={COLORS.textMuted} fill="none" strokeWidth={2}/><text x={500} y={615} textAnchor="middle" fill={COLORS.textMuted} fontSize={24}>reaction coordinate</text><text x={80} y={78} fill={COLORS.textMuted} fontSize={24}>energy</text><path d={path} stroke={COLORS.primary} strokeWidth={6} strokeLinejoin="round" fill="none" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/><text x={500} y={665} fill={COLORS.accent} textAnchor="middle" fontSize={27}>{label}</text></g>;
};
