import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha,fadeIn} from '../theme';
import type {SceneDef} from '../Video';
import {arenaState} from '../mechanisms/edge07-arena-state';
const T={title:'Reuse bytes after a tensor expires',unit:'bytes',course:'EDGE AI · MEMORY'};
const DESIGN_AUDIT={
 visualArgument:'Temporal intervals establish that A and C never coexist; the same physical byte range changes owner at the exact boundary.',
 motion:'A time cursor advances through lifetime intervals while the arena releases A and assigns offset zero to C; B is preserved.',
 example:'A=64 B at [0,2), B=32 B at [1,4), C=64 B at [2,4); arena size 96 B instead of the 160 B sum.',
 antiTemplate:'The key event is a temporal-to-spatial ownership transfer, unlike flash weight compression or channel deletion.',
 sceneRationale:'Four scenes build lifetime reasoning, place simultaneously live tensors, demonstrate the exact reuse handoff, and compare reserved capacity.'
};
const Layout:React.FC<{title:string;lines:string[];foot:string;children:React.ReactNode}>=({title,lines,foot,children})=>{const f=useCurrentFrame();return <div data-root style={{height:'100%',boxSizing:'border-box',padding:'110px 108px',display:'grid',gridTemplateColumns:'610px 960px',gap:132,alignItems:'center',background:COLORS.bg0,fontFamily:FONT}}><section><div data-k="text" style={{opacity:fadeIn(f,2,12),fontSize:22,letterSpacing:3,color:COLORS.primary}}>{T.course}</div><h1 data-k="text" style={{opacity:fadeIn(f,12,15),fontSize:55,lineHeight:1.18,margin:'30px 0 42px',color:COLORS.textStrong}}>{title}</h1>{lines.map((t,i)=><p data-k="text" key={t} style={{opacity:fadeIn(f,24+i*10,14),fontSize:30,lineHeight:1.45,color:COLORS.textMuted,margin:'0 0 28px'}}>{t}</p>)}<p data-k="text" style={{opacity:fadeIn(f,45,14),fontSize:23,lineHeight:1.45,marginTop:45,color:COLORS.accent}}>{foot}</p></section><section style={{opacity:fadeIn(f,12,15)}}>{children}</section></div>};
const LifetimesFigure:React.FC<{frame:number}>=({frame})=>{
 const v=arenaState(frame);
 return <svg data-k="figure" viewBox="0 0 960 385" width={960} height={385}><text x={90} y={35} fill={COLORS.textStrong} fontSize={28}>TENSOR LIFETIMES</text>{v.all.map((a,i)=><g key={a.name}><text x={20} y={118+i*88} fill={COLORS.textStrong} fontSize={31}>{a.name}</text><rect x={105+a.start*180} y={76+i*88} width={(a.end-a.start)*180} height={57} fill={alpha(a.name==='B'?COLORS.accent:COLORS.primary,.55)} stroke={a.name==='B'?COLORS.accent:COLORS.primary} strokeWidth={2}/><text x={125+a.start*180} y={114+i*88} fill={COLORS.textStrong} fontSize={27}>{a.size} B</text></g>)}{[0,1,2,3,4].map(t=><text key={t} x={100+t*180} y={369} fontSize={24} fill={COLORS.textMuted}>{t}</text>)}<line x1={105+v.time*180} x2={105+v.time*180} y1={61} y2={334} stroke={COLORS.result} strokeWidth={5}/></svg>;
};
const ArenaFigure:React.FC<{frame:number}>=({frame})=>{
 const v=arenaState(frame);
 return <svg data-k="figure" width={960} height={245} viewBox="0 0 960 245"><text x={35} y={36} fontSize={27} fill={COLORS.textStrong}>ARENA · {v.liveBytes} bytes live</text><rect x={35} y={65} width={816} height={85} fill="none" stroke={COLORS.axis} strokeWidth={3}/>{v.allocations.map(a=><g key={a.name}><rect x={35+a.offset*8.5} y={65} width={a.size*8.5} height={85} fill={alpha(a.name==='B'?COLORS.accent:COLORS.primary,.65)} stroke={COLORS.textStrong} strokeWidth={2}/><text x={35+(a.offset+a.size/2)*8.5} y={120} textAnchor="middle" fontSize={33} fill={COLORS.textStrong}>{a.name}</text></g>)}{[0,32,64,96].map(n=><text key={n} x={35+n*8.5} y={190} textAnchor="middle" fill={COLORS.textMuted} fontSize={24}>{n}</text>)}<text x={375} y={233} fontSize={24} fill={COLORS.textMuted}>byte offset</text></svg>;
};
const Lifetimes:React.FC<{frame:number}>=({frame})=><Layout title="Memory has a lifetime" lines={['A tensor occupies memory only while its values are needed.','A and C never live together. B overlaps both.']} foot="Intervals end just before the next owner begins."><LifetimesFigure frame={frame}/></Layout>;
const Coexist:React.FC<{frame:number}>=({frame})=><Layout title="Live tensors stay separate" lines={['At t = 1.5, A and B are both live.','Give A 64 bytes and B a separate 32 bytes.']} foot="A + B = 96 bytes occupied"><div><LifetimesFigure frame={210+frame}/><ArenaFigure frame={210+frame}/></div></Layout>;
const Reuse:React.FC<{frame:number}>=({frame})=>{
 const absolute=420+frame,v=arenaState(absolute);
 return <Layout title={T.title} lines={['At t = 2, A is no longer needed.','C takes A’s old bytes. B remains untouched.']} foot={`Current time: ${v.time.toFixed(2)} · capacity stays 96 B`}><div><LifetimesFigure frame={absolute}/><ArenaFigure frame={absolute}/></div></Layout>;
};
const Footprint:React.FC<{frame:number}>=({frame})=>{
 const v=arenaState(690+frame);
 return <Layout title="Plan for overlap, not the sum" lines={['Separate reservations would use 160 bytes.','Lifetime reuse fits this example into 96 bytes.']} foot="Toy example excludes alignment and runtime metadata."><svg data-k="figure" width={960} height={560} viewBox="0 0 960 560"><text x={30} y={55} fontSize={29} fill={COLORS.textStrong}>SEPARATE RESERVATIONS · 160 B</text>{[64,32,64].map((size,i)=><g key={i}><rect x={30+[0,64,96][i]*5} y={90} width={size*5} height={105} fill={alpha([COLORS.primary,COLORS.accent,COLORS.alt][i],.7)} stroke={COLORS.textStrong}/><text x={50+[0,64,96][i]*5} y={151} fontSize={32} fill={COLORS.textStrong}>{['A','B','C'][i]}</text></g>)}<text x={30} y={280} fontSize={29} fill={COLORS.textStrong}>REUSED ARENA · {v.capacity} B</text>{v.allocations.map(a=><g key={a.name}><rect x={30+a.offset*5} y={320} width={a.size*5} height={105} fill={alpha(a.name==='B'?COLORS.accent:COLORS.result,.7)} stroke={COLORS.textStrong}/><text x={50+a.offset*5} y={381} fontSize={32} fill={COLORS.textStrong}>{a.name}</text></g>)}<text x={30} y={500} fontSize={30} fill={COLORS.result}>64 bytes saved through reuse</text></svg></Layout>;
};
export const SCENES:SceneDef[]=[{id:'lifetimes',Comp:Lifetimes,dur:210},{id:'coexist',Comp:Coexist,dur:210},{id:'reuse',Comp:Reuse,dur:270},{id:'footprint',Comp:Footprint,dur:210}];
