import React from 'react';
import {RiscBoard,BitFields,DataTokens} from '../components/RiscV';
import {rv04State} from './rv04-state';
export function RV04Probe({frame}:{frame:number}){const s=rv04State(frame);return <RiscBoard><BitFields fields={s.fields}/><DataTokens tokens={[{label:'A',value:s.a,x:60,y:220},{label:s.op,value:s.symbol,x:335,y:220},{label:'B',value:s.b,x:610,y:220}]}/><text x={50} y={420} fill="white" fontSize={34}>{s.a} {s.symbol} {s.b} = {s.result??'—'}</text>{s.op==='XOR'?<text x={50} y={500} fill="white" fontSize={30}>{s.aBits.join('')} XOR {s.bBits.join('')} = {s.resultBits.join('')}</text>:Array.from({length:s.unitCount},(_,i)=><rect key={i} x={50+i*40} y={465} width={28} height={35} fill="#34d399"/>)}</RiscBoard>;}
