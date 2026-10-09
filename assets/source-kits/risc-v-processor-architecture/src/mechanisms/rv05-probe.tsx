import React from 'react';
import {RiscBoard,RegisterBank,DataTokens,MemoryWords} from '../components/RiscV';
import {rv05State,hex} from './rv05-state';
export function RV05Probe({frame}:{frame:number}){const s=rv05State(frame);return <RiscBoard><RegisterBank values={s.values} writeIndex={s.committed?5:null} width={300}/><MemoryWords words={s.words} selectedAddress={s.selectedAddress}/><DataTokens tokens={[s.dataToken,{label:'PC',value:hex(s.pc),x:330,y:420}]}/><text x={50} y={550} fill="white" fontSize={26}>Address: {s.address===null?'—':hex(s.address)} · Next PC: {hex(s.nextPc)}</text></RiscBoard>;}
