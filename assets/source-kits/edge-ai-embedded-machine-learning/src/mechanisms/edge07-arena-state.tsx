import React from 'react';
import {COLORS,FONT} from '../theme';
import {memoryState,TensorMemory,TensorAllocation} from '../components/EdgeAI';
import {Axes} from '../components/Plot';
export const ARENA_ALLOCATIONS:TensorAllocation[]=[{name:'A',offset:0,size:64,start:0,end:2},{name:'B',offset:64,size:32,start:1,end:4},{name:'C',offset:0,size:64,start:2,end:4}];
export const arenaState=(frame:number)=>{
 const time=frame<420?Math.min(1.5,frame/140):Math.min(2.5,1.5+(frame-420)/240);
 return {time,capacity:96,...memoryState(ARENA_ALLOCATIONS,time),all:ARENA_ALLOCATIONS};
};
export const ArenaCore:React.FC<{frame:number}>=({frame})=>{
 const v=arenaState(frame);
 return <div><svg viewBox="0 0 900 245" style={{fontFamily:FONT}}>{v.all.map((a,i)=><g key={a.name}><text x={12} y={55+i*65} fontSize={25} fill={COLORS.textStrong}>{a.name}</text><rect x={100+a.start*170} y={25+i*65} width={(a.end-a.start)*170} height={38} fill={a.name==='B'?COLORS.accent:COLORS.primary}/><text x={115+a.start*170} y={52+i*65} fontSize={23} fill={COLORS.bg0}>{a.size} B</text></g>)}<line x1={100+v.time*170} x2={100+v.time*170} y1={10} y2={220} stroke={COLORS.result} strokeWidth={5}/></svg><Axes width={900} height={200} xDomain={[0,110]} yDomain={[-1,1]} xTicks={[0,32,64,96]}>{s=><TensorMemory s={s} allocations={v.all} time={v.time} capacity={v.capacity}/>}</Axes></div>;
};
