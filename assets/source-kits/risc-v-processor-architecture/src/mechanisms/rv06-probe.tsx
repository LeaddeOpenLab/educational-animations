import React from 'react';
import {RiscBoard,DataTokens,RegisterBank,MemoryWords} from '../components/RiscV';
import {branchState} from './rv06-state';
export const BranchProbe=({frame}:{frame:number})=>{const s=branchState(frame);const hx=(v:number)=>'0x'+v.toString(16).toUpperCase();return <RiscBoard>
 <RegisterBank values={[{index:1,value:s.a},{index:2,value:s.b}]} x={30} y={50} width={260}/>
 <DataTokens tokens={[{label:'PC',value:hx(s.pc),x:350,y:50},{label:'PC + 4',value:hx(s.sequential),x:30,y:290},{label:'PC + 16',value:hx(s.target),x:300,y:290}]}/>
 <MemoryWords words={['0x100','0x104','0x108','0x110'].map(address=>({address,value:address===hx(s.pc)?'FETCH':''}))} selectedAddress={hx(s.pc)} x={650} y={70} width={270}/>
 {s.selected!==null&&<DataTokens tokens={[{label:'next PC',value:hx(s.selected),x:350,y:220-100*s.travel}]}/>}
 <text x={40} y={490} fill="white" fontSize={34}>{s.a} {s.equal?'=':'≠'} {s.b}</text>
 </RiscBoard>};
