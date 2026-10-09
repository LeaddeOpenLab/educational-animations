import React from 'react';
import {RiscBoard,DataTokens,PipelineLanes} from '../components/RiscV';
import {loadUseState} from './rv10-state';
export const LoadUseProbe=({frame}:{frame:number})=>{const s=loadUseState(frame);return <RiscBoard>
 <PipelineLanes instructions={[...s.instructions,...(s.bubble.stage>=0?[{id:'bubble',label:'BUBBLE',stage:s.bubble.stage,row:3,value:'write = 0'}]:[])]} y={65} rowHeight={68}/>
 <DataTokens tokens={[{label:'PC',value:'0x'+s.pc.toString(16).toUpperCase(),x:25,y:495},{label:'load data',value:s.loadValue??'pending',x:650,y:495}]}/>
 <text x={350} y={535} fill="white" fontSize={28}>{s.operand??'?'} + 3 = {s.result??'?'}</text>
 {s.resumed&&<DataTokens tokens={[{label:'forward',value:42,x:760-360*s.forwardTravel,y:365,width:150}]}/>}
 </RiscBoard>};
