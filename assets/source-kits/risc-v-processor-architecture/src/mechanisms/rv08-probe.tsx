import React from 'react';
import {RiscBoard,DataTokens,RegisterBank} from '../components/RiscV';
import {latchState} from './rv08-state';
export const LatchProbe=({frame}:{frame:number})=>{const s=latchState(frame);return <RiscBoard>
 <DataTokens tokens={[{label:'ID inputs',value:`${s.input.a}, ${s.input.b}; rd${s.input.rd}`,x:25,y:80,width:250},{label:'ID/EX',value:s.idex?`${s.idex.a}, ${s.idex.b}; rd${s.idex.rd}`:'empty',x:340,y:80,width:250},{label:'EX/MEM',value:s.exmem?`${s.exmem.result}; rd${s.exmem.rd}`:'empty',x:655,y:80,width:250},{label:'MEM/WB',value:s.memwb?`${s.memwb.result}; rd${s.memwb.rd}`:'empty',x:655,y:310,width:250}]}/>
 <RegisterBank values={s.registers} x={40} y={330} width={290}/>
 {s.result!==null&&<text x={350} y={280} fill="white" fontSize={36}>7 + 5 = {s.result}</text>}
 </RiscBoard>};
