import React from 'react';
import {RiscBoard,BitFields,DataTokens} from '../components/RiscV';
import {COLORS} from '../theme';
import {rv13State} from './rv13-state';
export const Rv13Probe=({frame}:{frame:number})=>{const s=rv13State(frame);return <RiscBoard>{(['M','S','U'] as const).map((m,i)=><g key={m}><line x1={30} x2={360} y1={100+i*140} y2={100+i*140} stroke={COLORS.axis}/><text x={35} y={80+i*140} fill={COLORS.textStrong} fontSize={30}>{m}</text></g>)}<DataTokens tokens={[{label:'Active hart',value:s.mode,x:140,y:s.hartY}]}/><BitFields x={430} y={180} width={470} fields={[{label:'MPP',bits:2,value:s.mppBits},{label:'MIE',bits:1,value:s.mie},{label:'MPIE',bits:1,value:s.mpie}]}/><text x={470} y={340} fill={COLORS.textStrong} fontSize={30}>Saved mode: {s.mpp}</text></RiscBoard>;};
