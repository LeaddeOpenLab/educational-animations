import React from 'react';
import {RiscBoard,DataTokens,PipelineLanes} from '../components/RiscV';
import {forwardState} from './rv09-state';
export const ForwardProbe=({frame}:{frame:number})=>{const s=forwardState(frame);const far=frame>=420;return <RiscBoard>
 <PipelineLanes instructions={s.instructions} y={65} rowHeight={68}/>
 <DataTokens tokens={[{label:far?'MEM/WB → EX':'EX/MEM → EX',value:s.producer,x:far?760-360*s.farTravel:590-190*s.nearTravel,y:320,width:160}]}/>
 <text x={50} y={535} fill="white" fontSize={30}>{far?`${s.farOperand} XOR 15 = ${s.farResult??'?'}`:`${s.nearOperand} − 10 = ${s.nearResult??'?'}`}</text>
 <text x={530} y={535} fill="white" fontSize={30}>x5 = {s.registers[0].value}</text>
 </RiscBoard>};
