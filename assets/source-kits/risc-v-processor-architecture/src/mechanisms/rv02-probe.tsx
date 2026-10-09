import React from 'react';
import {RiscBoard,RegisterBank,DataTokens} from '../components/RiscV';
import {rv02State} from './rv02-state';
export function RV02Probe({frame}:{frame:number}){const s=rv02State(frame);return <RiscBoard><RegisterBank values={s.values} readIndices={s.readIndices} writeIndex={s.writeIndex} width={330}/><DataTokens tokens={s.tokens}/>{!s.discarded&&<DataTokens tokens={[s.writeToken]}/>}<text x={480} y={510} fill="white" fontSize={28}>{s.discarded?'x0 discards write; stored value = 0':s.written?'Edge: x5 = '+s.sum:'Pending write = '+(s.writeData??'—')}</text></RiscBoard>;}
