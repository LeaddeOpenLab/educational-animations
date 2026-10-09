import React from 'react';
import {COLORS,FONT} from '../theme';
export const pruningState=(frame:number)=>{
 const original=[2,.1,1,3],originalWeights=[[1,.2,2,1],[0,.3,1,2]];
 const removed=frame>=450,indices=removed?[0,2,3]:[0,1,2,3];
 const compact=Math.max(0,Math.min(1,(frame-450)/180));
 const features=indices.map(i=>original[i]);
 const weights=originalWeights.map(row=>indices.map(i=>row[i]));
 const output=weights.map(row=>row.reduce((n,w,i)=>n+w*features[i],0));
 const positions=indices.map((originalIndex,i)=>originalIndex+(i-originalIndex)*compact);
 return {removed,indices,features,weights,output,positions,terms:features.length*weights.length,shape:[weights.length,features.length],selected:frame>=180&&frame<450?1:-1};
};
export const PruningCore:React.FC<{frame:number}>=({frame})=>{
 const v=pruningState(frame);
 return <svg viewBox="0 0 900 520" style={{fontFamily:FONT}}><text x={20} y={38} fill={COLORS.textStrong} fontSize={28}>Channels {v.features.length} · weights {v.shape.join(' × ')} · {v.terms} terms</text>{v.indices.map((channel,i)=><g key={channel}><text x={170+v.positions[i]*140} y={95} fill={COLORS.textMuted} fontSize={24}>c{channel}</text>{[v.features[i],...v.weights.map(row=>row[i])].map((value,row)=><g key={row}><rect x={150+v.positions[i]*140} y={115+row*90} width={100} height={64} fill={v.selected===channel?COLORS.warn:row?COLORS.alt:COLORS.primary}/><text x={178+v.positions[i]*140} y={157+row*90} fontSize={29} fill={COLORS.bg0}>{value}</text></g>)}</g>)}<text x={20} y={440} fill={COLORS.result} fontSize={30}>Output [{v.output.map(x=>x.toFixed(2)).join(', ')}]</text></svg>;
};
