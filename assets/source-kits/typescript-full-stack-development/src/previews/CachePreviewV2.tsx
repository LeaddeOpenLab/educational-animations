import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {alpha,COLORS,FONT} from '../theme';
import {cacheState} from './cache-state';

const progress=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const Box:React.FC<{x:number;y:number;label:string;count:number;version:number;stale?:boolean}>=({x,y,label,count,version,stale})=><g>
  <rect x={x} y={y} width="390" height="220" rx="20" fill={alpha(stale?COLORS.warn:COLORS.primary,.12)} stroke={stale?COLORS.warn:COLORS.primary} strokeWidth="3"/>
  <text x={x+25} y={y+50} fill={COLORS.textStrong} fontFamily={FONT} fontSize="30" fontWeight="700">{label}</text>
  <text x={x+25} y={y+125} fill={COLORS.textStrong} fontFamily="monospace" fontSize="50" fontWeight="800">{count}</text>
  <text x={x+25} y={y+182} fill={stale?COLORS.warn:COLORS.textMuted} fontFamily="monospace" fontSize="26">version {version}{stale?' · stale':''}</text>
</g>;

export const CachePreviewV2:React.FC=()=>{
  const frame=useCurrentFrame(); const s=cacheState(frame);
  const fetch=progress(frame,120,165),publish=progress(frame,170,210);
  return <AbsoluteFill style={{background:COLORS.bg0}}><svg width="100%" height="100%" viewBox="0 0 1920 1080">
    <text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="52" fontWeight="800">A mutation does not refresh cached views</text>
    <Box x={105} y={300} label="SERVER" count={s.serverCount} version={s.serverVersion}/>
    <Box x={765} y={300} label="QUERY CACHE" count={s.cacheCount} version={s.cacheVersion} stale={s.stale}/>
    <Box x={1455} y={170} label="Badge" count={s.consumerCount} version={s.consumerVersion}/>
    <Box x={1455} y={470} label="List" count={s.consumerCount} version={s.consumerVersion}/>
    {frame>=60&&frame<100&&<g>
      <circle cx={300} cy={650} r="42" fill={COLORS.accent}/>
      <text x="300" y="660" textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="28">+1</text>
    </g>}
    {s.stale&&<g>
      <text x="560" y="240" fill={COLORS.warn} fontFamily="monospace" fontSize="28">server v2 ≠ cache v1</text>
      <path d="M 505 420 L 745 420" stroke={COLORS.warn} strokeWidth="4" strokeDasharray="14 10"/>
    </g>}
    {s.refetching&&<g>
      <circle cx={lerp(510,745,fetch)} cy="420" r="43" fill={COLORS.result}/>
      <text x={lerp(510,745,fetch)} y="430" textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="26">v2:3</text>
    </g>}
    {s.publishing&&[0,1].map((n)=><g key={n}>
      <circle cx={lerp(1170,1430,publish)} cy={lerp(410,n===0?280:580,publish)} r="40" fill={COLORS.result}/>
      <text x={lerp(1170,1430,publish)} y={lerp(420,n===0?290:590,publish)} textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="25">3</text>
    </g>)}
    <text x="105" y="850" fill={COLORS.textMuted} fontFamily={FONT} fontSize="32">{frame<60?'All copies start at version 1 and count 2.':frame<95?'The write changes only the server.':frame<120?'Both consumers still read stale cache v1.':frame<165?'Invalidation fetches a fresh version 2 payload.':frame<210?'The cache pushes count 3 to both views.':'Server, cache and both views now agree on version 2.'}</text>
  </svg></AbsoluteFill>;
};
