import React from 'react';
import { alpha, COLORS, FONT } from '../theme';

type Field = { name: string; value: string; state?: 'idle' | 'checking' | 'accepted' | 'rejected' | 'changed' };
const tone = (state?: Field['state']) => state === 'rejected' ? COLORS.warn : state === 'accepted' || state === 'changed' ? COLORS.result : state === 'checking' ? COLORS.accent : COLORS.textMuted;

/** A real record: each field can be checked, changed, removed, or added independently. */
export const FieldRecord: React.FC<{ x: number; y: number; title: string; fields: Field[]; width?: number; opacity?: number }> = ({x,y,title,fields,width=390,opacity=1}) => <g opacity={opacity}>
  <rect x={x} y={y} width={width} height={68+fields.length*62} rx={16} fill={COLORS.bg1} stroke={COLORS.axis} strokeWidth={2}/>
  <text x={x+24} y={y+43} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700}>{title}</text>
  {fields.map((f,i)=><g key={f.name}>
    <rect x={x+15} y={y+58+i*62} width={width-30} height={55} rx={9} fill={alpha(tone(f.state), f.state==='idle'?.04:.15)}/>
    <text x={x+27} y={y+94+i*62} fill={tone(f.state)} fontFamily="monospace" fontSize={23}>{f.name}</text>
    <text x={x+width-28} y={y+94+i*62} textAnchor="end" fill={COLORS.textStrong} fontFamily="monospace" fontSize={23}>{f.value}</text>
  </g>)}
</g>;

/** Candidate types remain visible while a predicate removes impossible variants. */
export const TypeSet: React.FC<{x:number;y:number;variants:{name:string;fields:string[];excluded?:boolean}[]; predicate:string}> = ({x,y,variants,predicate}) => <g>
  <text x={x} y={y} fill={COLORS.accent} fontFamily="monospace" fontSize={25}>{predicate}</text>
  {variants.map((v,i)=><g key={v.name} opacity={v.excluded?.25:1}>
    <rect x={x+i*340} y={y+35} width={310} height={160} rx={14} fill={alpha(v.excluded?COLORS.warn:COLORS.primary,.12)} stroke={v.excluded?COLORS.warn:COLORS.primary} strokeWidth={3}/>
    <text x={x+i*340+20} y={y+78} fill={COLORS.textStrong} fontFamily={FONT} fontSize={28} fontWeight={700}>{v.name}</text>
    {v.fields.map((f,j)=><text key={f} x={x+i*340+20} y={y+116+j*30} fill={COLORS.textMuted} fontFamily="monospace" fontSize={20}>{f}</text>)}
    {v.excluded&&<path d={`M ${x+i*340+10} ${y+185} L ${x+i*340+300} ${y+45}`} stroke={COLORS.warn} strokeWidth={6}/>}
  </g>)}
</g>;

/** Published state and pending writes are separate; commit copies every pending value atomically. */
export const WriteSetLedger: React.FC<{x:number;y:number;title:string;balances:{account:string;amount:number}[];kind:'published'|'pending';opacity?:number}> = ({x,y,title,balances,kind,opacity=1}) => <g opacity={opacity}>
  <rect x={x} y={y} width={360} height={290} rx={20} fill={alpha(kind==='pending'?COLORS.accent:COLORS.primary,.1)} stroke={kind==='pending'?COLORS.accent:COLORS.primary} strokeWidth={3}/>
  <text x={x+28} y={y+50} fill={COLORS.textStrong} fontFamily={FONT} fontSize={27} fontWeight={700}>{title}</text>
  {balances.map((b,i)=><g key={b.account}>
    <text x={x+30} y={y+118+i*91} fill={COLORS.textMuted} fontFamily={FONT} fontSize={27}>{b.account}</text>
    <rect x={x+135} y={y+77+i*91} width={Math.max(12,b.amount*1.55)} height={48} rx={7} fill={kind==='pending'?COLORS.accent:COLORS.primary}/>
    <text x={x+320} y={y+115+i*91} textAnchor="end" fill={COLORS.textStrong} fontFamily="monospace" fontSize={31} fontWeight={700}>{b.amount}</text>
  </g>)}
</g>;

/** Cache/server or local/remote replicas show both value and version during propagation. */
export const VersionedState: React.FC<{x:number;y:number;label:string;version:number;value:string;stale?:boolean}> = ({x,y,label,version,value,stale=false}) => <g>
  <rect x={x} y={y} width={290} height={185} rx={18} fill={alpha(stale?COLORS.warn:COLORS.result,.11)} stroke={stale?COLORS.warn:COLORS.result} strokeWidth={3}/>
  <text x={x+22} y={y+45} fill={COLORS.textStrong} fontFamily={FONT} fontSize={27}>{label}</text>
  <text x={x+22} y={y+102} fill={COLORS.textStrong} fontFamily="monospace" fontSize={37} fontWeight={700}>{value}</text>
  <text x={x+22} y={y+153} fill={stale?COLORS.warn:COLORS.result} fontFamily="monospace" fontSize={22}>version {version}</text>
</g>;

/** Removing stack frames makes exception unwinding visible, beyond a red status badge. */
export const CallStack: React.FC<{x:number;y:number;frames:string[];errorAt?:number}> = ({x,y,frames,errorAt=-1}) => <g>
  {frames.map((name,i)=><g key={name}>
    <rect x={x+i*33} y={y+i*80} width={440-i*30} height={69} rx={12} fill={alpha(i===errorAt?COLORS.warn:COLORS.primary,.15)} stroke={i===errorAt?COLORS.warn:COLORS.primary} strokeWidth={2}/>
    <text x={x+i*33+20} y={y+i*80+44} fill={COLORS.textStrong} fontFamily="monospace" fontSize={25}>{name}</text>
  </g>)}
</g>;

/** The same DOM nodes change from static markup to nodes with attached handlers. */
export const HydrationDOM: React.FC<{x:number;y:number;rows:{tag:string;text:string}[];handlersAttached:boolean;clicked?:boolean}> = ({x,y,rows,handlersAttached,clicked=false}) => <g>
  <rect x={x} y={y} width={550} height={120+rows.length*75} rx={18} fill={COLORS.bg1} stroke={COLORS.primary} strokeWidth={3}/>
  <text x={x+25} y={y+46} fill={COLORS.textMuted} fontFamily="monospace" fontSize={23}>DOM · same nodes</text>
  {rows.map((r,i)=><g key={i}>
    <rect x={x+25} y={y+65+i*75} width={500} height={62} rx={8} fill={alpha(COLORS.primary,.12)} stroke={COLORS.axis}/>
    <text x={x+42} y={y+105+i*75} fill={COLORS.textStrong} fontFamily="monospace" fontSize={22}>{`<${r.tag}> ${r.text}`}</text>
    {handlersAttached&&r.tag==='button'&&<circle cx={x+493} cy={y+96+i*75} r={clicked?13:9} fill={clicked?COLORS.result:COLORS.accent}/>}
  </g>)}
</g>;

/** Individual build targets change when a shared type contract propagates. */
export const BuildTargets: React.FC<{x:number;y:number;targets:{name:string;state:'ready'|'broken'|'fixed';detail:string}[]}> = ({x,y,targets}) => <g>
  {targets.map((t,i)=>{const c=t.state==='broken'?COLORS.warn:t.state==='fixed'?COLORS.result:COLORS.primary;return <g key={t.name}>
    <rect x={x+i*355} y={y} width={330} height={180} rx={16} fill={alpha(c,.12)} stroke={c} strokeWidth={3}/>
    <text x={x+i*355+20} y={y+49} fill={COLORS.textStrong} fontFamily={FONT} fontSize={27} fontWeight={700}>{t.name}</text>
    <text x={x+i*355+20} y={y+104} fill={c} fontFamily="monospace" fontSize={20}>{t.detail}</text>
  </g>})}
</g>;
