import React from 'react';
import {COLORS, FONT} from '../theme';
// Frame 450 registers RELU; inference tensors stay absent until preparation succeeds.
export const operatorState=(frame:number)=>{
 const registry=frame>=450?['MUL','RELU']:['MUL'];
 const required=['MUL','RELU'];
 const prepared=required.every(op=>registry.includes(op));
 const input=[2,-1,3], multiplier=[1,2,1];
 const intermediate=prepared&&frame>=690?input.map((v,i)=>v*multiplier[i]):[];
 const output=intermediate.length&&frame>=780?intermediate.map(v=>Math.max(0,v)):[];
 return {registry,required,prepared,input,multiplier,intermediate,output};
};
export const OperatorCore:React.FC<{frame:number}>=({frame})=>{
 const v=operatorState(frame);
 return <svg viewBox="0 0 900 520" style={{fontFamily:FONT}}>
  {v.required.map((op,i)=><g key={op}><text x={25} y={65+i*75} fill={COLORS.textStrong} fontSize={28}>{op} required</text><rect x={285} y={25+i*75} width={235} height={55} fill="none" stroke={COLORS.axis}/><text x={305} y={62+i*75} fill={COLORS.primary} fontSize={27}>{v.registry.includes(op)?`${op} kernel`:'— empty —'}</text></g>)}
  {[['Input',v.input],['MUL',v.intermediate],['RELU',v.output]].map(([label,values],row)=><g key={String(label)}><text x={25} y={270+row*85} fontSize={25} fill={COLORS.textMuted}>{String(label)}</text>{[0,1,2].map(i=><g key={i}><rect x={225+i*150} y={230+row*85} width={120} height={58} fill="none" stroke={COLORS.axis}/><text x={275+i*150} y={270+row*85} fill={row===2?COLORS.result:COLORS.textStrong} fontSize={30}>{(values as number[])[i]??'—'}</text></g>)}</g>)}
 </svg>;
};
