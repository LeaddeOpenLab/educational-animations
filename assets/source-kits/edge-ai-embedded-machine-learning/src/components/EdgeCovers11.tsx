import React from 'react';
import {Axes} from './Plot';
import {SignalWindow,OperatorPartitions,EnergyTimeline,ScoreDistribution} from './EdgeAI';
import {COLORS as C,FONT,alpha} from '../theme';
const Frame=({children}:{children:React.ReactNode})=><svg width={640} height={620} viewBox="0 0 640 620" style={{fontFamily:FONT,overflow:'visible'}}>{children}</svg>;
const Label=({x=320,y,children,size=28,color=C.textStrong}:{x?:number;y:number;children:React.ReactNode;size?:number;color?:string})=><text x={x} y={y} textAnchor="middle" fill={color} fontSize={size} fontWeight={600}>{children}</text>;
const Feature=()=> <Frame>
 <Label y={75}>FOUR SAMPLES</Label>
 <g transform="translate(30,95)"><Axes width={580} height={230} xDomain={[-.5,4.5]} yDomain={[-1.5,1.5]} pad={{l:35,r:35,t:25,b:35}} xTicks={[0,1,2,3]} yTicks={[-1,0,1]}>{s=><SignalWindow s={s} samples={[-1,1,-1,1]} start={0} size={4}/>}</Axes></g>
 <path d="M320 330 V380 M305 365 L320 380 L335 365" stroke={C.accent} strokeWidth={5} fill="none"/>
 <rect x={90} y={412} width={460} height={112} rx={20} fill={alpha(C.result,.18)} stroke={C.result} strokeWidth={3}/>
 <Label y={458} size={26}>√( (1 + 1 + 1 + 1) / 4 )</Label><Label y={499} size={34}>RMS = 1</Label>
</Frame>;
const Streaming=()=> <Frame>
 <Label y={70}>WINDOW 4 · HOP 2</Label>
 <g transform="translate(25,110)"><Axes width={590} height={240} xDomain={[-.5,8]} yDomain={[-2.5,2.5]} pad={{l:40,r:35,t:20,b:30}} xTicks={[0,1,2,3,4,5,6,7]} yTicks={[-2,0,2]}>{s=><SignalWindow s={s} samples={[0,1,0,-1,2,-2,1,1]} start={2} size={4}/>}</Axes></g>
 <Label y={401} size={25}>REUSE TWO · RECEIVE TWO</Label>
 {[0,-1,2,-2].map((v,i)=><g key={i}><rect x={62+i*133} y={440} width={117} height={95} rx={12} fill={alpha(i<2?C.result:C.accent,.17)} stroke={i<2?C.result:C.accent} strokeWidth={3}/><Label x={120+i*133} y={477} size={22}>index {i+2}</Label><Label x={120+i*133} y={516} size={32}>{v}</Label></g>)}
</Frame>;
const Delegate=()=> <Frame>
 <Label y={80}>SUPPORTED PARTITIONS</Label>
 <g transform="translate(15,120)"><Axes width={610} height={330} xDomain={[-1.2,4.5]} yDomain={[-1.7,1.8]} pad={{l:20,r:20,t:45,b:30}} showArrows={false} xTicks={[]} yTicks={[]}>{s=><OperatorPartitions s={s} operators={[{name:'Conv',device:'delegate',supported:true,values:[-2,3]},{name:'ReLU',device:'delegate',supported:true,values:[0,3]},{name:'Custom +1',device:'cpu',supported:false,values:[1,4]},{name:'Sum',device:'delegate',supported:true,values:[5]}]} partitioned current={3} handoff={0}/>}</Axes></g>
 <Label y={491} size={28} color={C.accent}>Delegate → CPU → Delegate</Label>
 <Label y={544} size={35}>2 Device Crossings</Label>
</Frame>;
const Energy=()=> <Frame>
 <Label y={68}>LATENCY ≠ ENERGY</Label>
 <Label x={320} y={119} size={25}>A · 100 mW × 10 ms = 1 mJ</Label>
 <g transform="translate(40,143)"><Axes width={560} height={150} xDomain={[0,10.5]} yDomain={[0,370]} pad={{l:35,r:35,t:30,b:20}} xTicks={[0,5,10]} yTicks={[]} showArrows={false}>{s=><EnergyTimeline s={s} power={Array(10).fill(100)} dt={1} count={10}/>}</Axes></g>
 <Label x={320} y={350} size={25}>B · 300 mW × 5 ms = 1.5 mJ</Label>
 <g transform="translate(40,374)"><Axes width={560} height={150} xDomain={[0,10.5]} yDomain={[0,370]} pad={{l:35,r:35,t:30,b:20}} xTicks={[0,5,10]} yTicks={[]} showArrows={false}>{s=><EnergyTimeline s={s} power={Array(5).fill(300)} dt={1} count={5}/>}</Axes></g>
 <Label y={570} size={23} color={C.textMuted}>Illustrative Power Traces</Label>
</Frame>;
const Confidence=()=> <Frame>
 <Label y={78}>ACCEPT WHEN SCORE ≥ 0.70</Label>
 <g transform="translate(35,125)"><Axes width={570} height={350} xDomain={[-.6,2.9]} yDomain={[-.15,1.1]} pad={{l:45,r:50,t:30,b:35}} xTicks={[]} yTicks={[0,.5,1]}>{s=><ScoreDistribution s={s} scores={[.7,.2,.1]} names={['A','B','C']} threshold={.7}/>}</Axes></g>
 <rect x={160} y={484} width={320} height={70} rx={15} fill={alpha(C.result,.17)} stroke={C.result} strokeWidth={3}/><Label y={531} size={34}>OUTPUT: A</Label>
</Frame>;
export const EDGE_COVERS_11:Record<string,React.FC>={
 'on-device-feature-extraction':Feature,
 'streaming-inference-with-sliding-windows':Streaming,
 'hardware-delegate-operator-partitioning':Delegate,
 'latency-and-energy-measurement-on-device':Energy,
 'confidence-threshold-for-edge-classification':Confidence,
};
