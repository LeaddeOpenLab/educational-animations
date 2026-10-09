import React from 'react';
import {RiscBoard,PipelineLanes,RegisterBank,MemoryWords,DataTokens} from '../components/RiscV';
import {rv11State} from './rv11-state';
export const Rv11Probe=({frame}:{frame:number})=>{const s=rv11State(frame);return <RiscBoard><PipelineLanes instructions={s.instructions} y={40} rowHeight={70}/><RegisterBank values={[{index:5,value:s.x5}]} x={30} y={475} width={250}/><MemoryWords words={[{address:'RAM 0x200',value:s.memory200}]} x={310} y={475} width={280}/><DataTokens tokens={[{label:'Fetch PC',value:'0x'+s.fetchPc.toString(16),x:630,y:475},...(s.discardedPayloadVisible?[{label:'Discard A/W',value:99,x:s.discardX,y:340}]:[])]}/></RiscBoard>;};
