import React from 'react';
import {COLORS,FONT} from '../theme';
import {BrainMap,MembranePotential,Summation,ReceptiveField} from './Neuro';
import {IonTransit,ChemicalSynapse,CircuitSignal,SynapticWeight} from './NeuroMechanisms';
import type {Scale} from './Plot';
const Svg=({children}:{children:React.ReactNode})=><svg width={640} height={620} viewBox="0 0 640 620" style={{overflow:'visible'}}>{children}</svg>;
const Label=({x,y,children}:{x:number;y:number;children:React.ReactNode})=><text x={x} y={y} fontFamily={FONT} fill={COLORS.textStrong} fontSize={26} textAnchor="middle">{children}</text>;
const scale=(x1:number,y1:number,x2:number,y2:number,xd:[number,number],yd:[number,number]):Scale=>({width:640,height:620,xDomain:xd,yDomain:yd,px:x=>x1+(x-xd[0])/(xd[1]-xd[0])*(x2-x1),py:y=>y2-(y-yd[0])/(yd[1]-yd[0])*(y2-y1),ux:(x2-x1)/(xd[1]-xd[0]),uy:(y2-y1)/(yd[1]-yd[0]),pad:{l:x1,r:640-x2,t:y1,b:620-y2},zeroX:x1,zeroY:y2});
export const COVER_FIGURES:Record<string,React.FC>={
 'ns01-resting-potential':()=> <Svg><IonTransit x={320} y={300} open={1} transit={1} direction="out" ion="K⁺"/>{[0,1,2,3,4,5].map(i=><circle key={i} cx={190+i*50} cy={430} r={13} fill={COLORS.accent}/>)}<Label x={320} y={135}>K+ leaks out</Label><Label x={320} y={510}>Inside negative</Label><Label x={320} y={370}>−  −  −  −</Label></Svg>,
 'ns02-action-potential':()=> <Svg><MembranePotential s={scale(65,125,400,475,[0,16],[-90,50])} rest={-70} threshold={-55} peak={40} onset={2} dur={12} showIons={false} progress={1}/><Label x={290} y={520}>Na+ in → K+ out</Label></Svg>,
 'ns03-chemical-synaptic-transmission':()=> <Svg><ChemicalSynapse x={320} y={310} release={1} binding={1} clearance={0} count={6} progress={1}/></Svg>,
 'ns04-synaptic-integration':()=> <Svg><g transform="translate(31 -42)"><Summation s={scale(65,130,425,470,[0,8],[-72,-45])} inputs={[{amp:10,at:2,label:'A'},{amp:10,at:3,label:'B'}]} threshold={-55} rest={-70} tau={6} progress={1}/><Label x={310} y={540}>Inputs add toward threshold</Label></g></Svg>,
 'ns05-brain-region-localization':()=> <Svg><BrainMap cx={320} cy={270} scale={.95} active="occipital" progress={1}/></Svg>,
 'ns06-neural-pathways':()=> <Svg><CircuitSignal points={[{x:485,y:490},{x:485,y:300},{x:320,y:260},{x:190,y:180},{x:160,y:90}]} labels={['Right hand','Medulla','','Thalamus','Left cortex']} travel={1} progress={1}/><path d="M 325 140 V 485" stroke={COLORS.axis} strokeDasharray="7 8" strokeWidth={2}/><Label x={280} y={345}>Cross midline</Label></Svg>,
 'ns07-visual-pathway':()=> <Svg><CircuitSignal points={[{x:175,y:105},{x:200,y:220},{x:390,y:370},{x:390,y:500}]} labels={['Left eye','','Right LGN','Right cortex']} travel={1} color={COLORS.primary} progress={1}/><CircuitSignal points={[{x:480,y:105},{x:490,y:220},{x:410,y:370},{x:430,y:500}]} labels={['Right eye','','','']} travel={1} color={COLORS.result} progress={1}/><Label x={315} y={295}>Nasal fibers cross</Label></Svg>,
 'ns08-receptive-field':()=> <Svg><ReceptiveField cx={230} cy={310} r={155} spot={{dx:0,dy:0,r:28}} type="on" baseline={20} gain={60} progress={1}/></Svg>,
 'ns09-synaptic-plasticity':()=> <Svg><SynapticWeight x={270} y={180} strength={1} receptors={3} input={1} progress={1}/><SynapticWeight x={270} y={420} strength={1.5} receptors={5} input={1} progress={1}/><Label x={255} y={75}>Same input · stronger response</Label></Svg>,
 'ns10-memory-formation':()=> <Svg><path d="M 150 190 Q 320 40 490 190" fill="none" stroke={COLORS.result} strokeWidth={12}/><CircuitSignal points={[{x:150,y:190},{x:320,y:400},{x:490,y:190}]} labels={['Place','Hippocampus','Sound']} travel={1} progress={1}/><circle cx={150} cy={190} r={12} fill={COLORS.accent}/></Svg>
};
