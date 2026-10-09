import React from 'react';
import {RiscBoard,BitFields,DataTokens} from '../components/RiscV';
import {rv01State} from './rv01-state';
export function RV01Probe({frame}:{frame:number}){const s=rv01State(frame);return <RiscBoard><BitFields fields={s.fields}/><DataTokens tokens={s.tokens}/><text x={45} y={470} fill="white" fontSize={30}>{s.operation} x{s.rd}, x{s.rs1}, x{s.rs2}</text></RiscBoard>;}
