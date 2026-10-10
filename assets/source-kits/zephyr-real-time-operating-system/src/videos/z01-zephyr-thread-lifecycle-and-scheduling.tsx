import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z01-zephyr-thread-lifecycle-and-scheduling.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Distinguish eligibility from CPU selection and automatic wakeup. The CPU selects only ready threads; sleep blocks until timeout.",
  motion: "A begins in the unready lane. k_thread_start moves A into ready then CPU selection. A sleeps; its card leaves the CPU and a timeout advances. The timeout expires; A returns to the ready set and resumes.",
  example: "A begins in the unready lane.",
  antiTemplate: "Running is a scheduling condition of a ready thread, not an independent readiness state. This topic uses thread A, ready set, CPU, sleep timeout rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Created but Not Started; Start Makes the Thread Ready; Sleep Removes CPU Eligibility; Timeout Restores Readiness. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Running is a scheduling condition of a ready thread, not an independent readiness state."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ThreadLanes tasks={[{label:"A",value:st.sleeping?`sleep: ${st.remaining}f`:st.started?"ready = true":"not started",x:st.x,y:190}]} running={st.running?"A":"idle"} trace="Start → sleep → timeout → ready"/>);};
const HEADINGS=["Created but Not Started", "Start Makes the Thread Ready", "Sleep Removes CPU Eligibility", "Timeout Restores Readiness"];
const COPY=["A begins in the unready lane.", "Start moves A into ready then CPU selection.", "A sleeps; its card leaves the CPU and a timeout advances.", "The timeout expires; A returns to the ready set and resumes."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · THREAD LIFECYCLE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>The CPU selects only ready threads; sleep blocks until timeout.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+360} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+660} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:210,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:300,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:240,transition:'none' as const},
];
