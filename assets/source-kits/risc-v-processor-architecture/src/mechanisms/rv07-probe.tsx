import React from 'react';
import {RiscBoard,DataTokens,RegisterBank,MemoryWords} from '../components/RiscV';
import {memoryAddressState} from './rv07-state';
export const MemoryAddressProbe=({frame}:{frame:number})=>{const s=memoryAddressState(frame);return <RiscBoard>
 <RegisterBank values={s.registers} x={25} y={70} width={270} writeIndex={s.loadDone?5:null}/>
 <MemoryWords words={s.words} selectedAddress={'0x'+s.ea.toString(16).toUpperCase()} x={620} y={70} width={310}/>
 <DataTokens tokens={[{label:'effective address',value:'0x'+s.ea.toString(16).toUpperCase(),x:360,y:350},{label:s.isStore?'store data':'load data',value:s.data,x:s.isStore?200+470*s.progress:670-470*s.progress,y:280}]}/>
 <text x={40} y={520} fill="white" fontSize={32}>0x2008 {s.isStore?'+ 4':'− 8'} = 0x{s.ea.toString(16).toUpperCase()}</text>
 </RiscBoard>};
