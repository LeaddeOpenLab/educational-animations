import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines} from '../components/ui';
import {Axes} from '../components/Plot';
import {COLORS,FONT,alpha,fadeIn,ramp} from '../theme';
import {OperatorPartitions} from '../components/EdgeAI';
import {delegateState} from '../mechanisms/edge13-state';
const T = {w:950,h:650,operatorCount:4};
const DESIGN_AUDIT = {
 visualArgument:'Device lanes expose two delegated subgraphs separated by an actual CPU operation, with concrete tensor values at every boundary.',
 motion:'Operators change device membership, then payloads follow the dependency sequence and acquire the receiver operation result.',
 example:'ReLU maps [-2,3] to [0,3]; the CPU adds 1 to get [1,4]; the final delegated sum produces 5.',
 antiTemplate:'This is device partitioning and cross-device execution rather than the missing-kernel preparation failure in the compatibility lesson.',
 sceneRationale:'Four scenes distinguish original dependencies, supported partitions, numerical handoffs, and the two transfer boundaries affecting acceleration.'
};
const PartitionView=({frame,local,chapter}:{frame:number;local:number;chapter:number})=>{
 const v=delegateState(frame);const words=[['A Graph Has an Order','Each operation consumes the previous output.'],['Split by Supported Operations','The CPU-only gap separates two delegated partitions.'],['Follow the Actual Tensor','ReLU, add one, then sum: values change at the receiver.'],['Count the Device Crossings','Two handoffs remain part of the execution cost.']][chapter];
 return <><Backdrop width={1920} height={1080}/><Kicker text="EDGE AI · HARDWARE DELEGATES" frame={local}/><Heading text={words[0]} frame={local} width={650} size={53}/><Lines items={[words[1],'Illustrative operator support and arithmetic.']} frame={local} top={335} width={615} size={30}/>
 <svg data-k="figure" data-n="delegate lanes and tensor handoff" width={T.w} height={T.h} viewBox="0 0 950 650" style={{position:'absolute',left:850,top:245,fontFamily:FONT,opacity:fadeIn(local,12,15)}}>
 <Axes width={940} height={430} xDomain={[-1.4,4.4]} yDomain={[-2,2]} pad={{l:70,r:30,t:70,b:50}}>{s=><OperatorPartitions s={s} operators={v.operators} current={v.current} handoff={v.handoff} partitioned={v.partitioned}/>}</Axes>
 <text x={55} y={478} fill={COLORS.textMuted} fontSize={26}>CURRENT TENSOR</text>
 {v.payload.map((n,i)=><g key={i}><rect x={360+i*130} y={442} width={110} height={62} rx={9} fill={alpha(COLORS.accent,.2)} stroke={COLORS.accent}/><text x={415+i*130} y={486} textAnchor="middle" fill={COLORS.textStrong} fontSize={35}>{n}</text></g>)}
 {chapter>=2&&<text x={55} y={568} fill={COLORS.textStrong} fontSize={30}>{v.current===0?'Conv output: [-2, 3]':v.current===1?'ReLU: max(0, x) → [0, 3]':v.current===2?'CPU: x + 1 → [1, 4]':'Dense sum: 1 + 4 = 5'}</text>}
 {chapter===3&&<text x={55} y={623} fill={COLORS.accent} fontSize={28}>Delegate → CPU → Delegate · {v.crossings} crossings</text>}
 </svg></>;
};
const Graph=({frame}:{frame:number})=><PartitionView frame={frame} local={frame} chapter={0}/>;
const Partition=({frame}:{frame:number})=><PartitionView frame={frame+135} local={frame} chapter={1}/>;
const Execute=({frame}:{frame:number})=><PartitionView frame={frame+345} local={frame} chapter={2}/>;
const Cost=({frame}:{frame:number})=><PartitionView frame={frame+645} local={frame} chapter={3}/>;
export const SCENES=[{id:'graph',Comp:Graph,dur:135},{id:'partition',Comp:Partition,dur:210},{id:'execute',Comp:Execute,dur:300},{id:'cost',Comp:Cost,dur:195}];
