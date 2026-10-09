import React from 'react';
import {RiscBoard,MemoryWords,RegisterBank,DataTokens} from '../components/RiscV';
import {rv12State} from './rv12-state';
const hex=(n:number|null)=>n===null?'—':'0x'+n.toString(16);
export const Rv12Probe=({frame}:{frame:number})=>{const s=rv12State(frame);return <RiscBoard><MemoryWords x={30} y={65} width={400} words={[{address:'PC',value:hex(s.pc)},{address:'mepc',value:hex(s.mepc)},{address:'mcause',value:s.mcause??'—'}]}/><RegisterBank x={500} y={65} width={370} values={[{index:5,value:s.x5},{index:6,value:s.x6}]}/><DataTokens tokens={[{label:s.transfer.label,value:hex(s.transfer.value),x:s.transfer.x,y:s.transfer.y},{label:'Current mode',value:s.mode,x:700,y:400}]}/></RiscBoard>;};
