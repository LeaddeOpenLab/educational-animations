import React from 'react';
import {RiscBoard,BitFields,DataTokens} from '../components/RiscV';
import {rv03State} from './rv03-state';
export function RV03Probe({frame}:{frame:number}){const s=rv03State(frame);return <RiscBoard><BitFields fields={s.iFields} y={60}/><DataTokens tokens={s.sTokens}/><DataTokens tokens={s.bTokens}/>{s.bLowZero&&<DataTokens tokens={[{label:"imm0",value:"0",x:805,y:450,width:100}]}/>}<text x={40} y={570} fill="white" fontSize={28}>I: {s.iOutput??'—'} · S: {s.sOutput??'—'} · B: {s.bOutput??'—'}</text></RiscBoard>;}
