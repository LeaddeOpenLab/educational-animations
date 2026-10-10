import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z02-thread-priority-and-preemption.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show a higher-priority ready thread displacing a preemptible thread. Preemption preserves the displaced thread for later resumption.",
  motion: "Low runs alone with high unready. High priority 1 wakes while low priority 5 runs. High takes the CPU and low remains in the ready set. High blocks, so low resumes its unfinished work.",
  example: "Low runs alone with high unready.",
  antiTemplate: "This example uses preemptible threads and an unlocked scheduler. Cooperative threads have different behavior. This topic uses low thread priority 5, high thread priority 1, CPU ownership rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Low-Priority Thread Runs; High-Priority Thread Becomes Ready; Save Low, Run High; Blocking Returns the CPU. These steps distinguish the cause from the operation and its visible consequence; removing a step hides This example uses preemptible threads and an unlocked scheduler. Cooperative threads have different behavior."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ThreadLanes tasks={[{label:"Low · priority 5",value:`work ${st.lowWork.toFixed(0)}`,x:st.lowX,y:190},{label:"High · priority 1",value:st.highReady?"ready":"unready",x:st.highX,y:350,color:C.accent}]} running={st.current} trace="Preemptible threads · scheduler unlocked"/>);};
const HEADINGS=["Low-Priority Thread Runs", "High-Priority Thread Becomes Ready", "Save Low, Run High", "Blocking Returns the CPU"];
const COPY=["Low runs alone with high unready.", "High priority 1 wakes while low priority 5 runs.", "High takes the CPU and low remains in the ready set.", "High blocks, so low resumes its unfinished work."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · THREAD PREEMPTION" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Preemption preserves the displaced thread for later resumption.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+390} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+600} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:240,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:210,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:300,transition:'none' as const},
];
