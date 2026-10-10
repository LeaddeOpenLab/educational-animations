import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z07-work-queue-deferred-processing.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show ISR submission decoupled from worker execution and FIFO processing. Deferred processing preserves FIFO order while ISR returns promptly.",
  motion: "ISR has work A ready to defer. A and B enter the work queue without executing their handlers. ISR returns; both work items remain stored. Worker dequeues A and completes it before processing B. Both handlers finish and the worker returns to waiting.",
  example: "ISR has work A ready to defer.",
  antiTemplate: "Submitting work does not execute its handler immediately; pending items must remain valid. This topic uses ISR, work items A and B, queue, worker thread rather than a generic call-chain diagram.",
  sceneRationale: "5 scenes separately establish Keep the ISR Short; Submit Two Work Items; Return While Work Waits; Worker Processes FIFO; The Queue Drains. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Submitting work does not execute its handler immediately; pending items must remain valid."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<PacketQueue slots={st.slots} moving={st.moving} source={st.source} target={st.target} detail={`Completed handlers: ${st.done}`}/>);};
const HEADINGS=["Keep the ISR Short", "Submit Two Work Items", "Return While Work Waits", "Worker Processes FIFO", "The Queue Drains"];
const COPY=["ISR has work A ready to defer.", "A and B enter the work queue without executing their handlers.", "ISR returns; both work items remain stored.", "Worker dequeues A and completes it before processing B.", "Both handlers finish and the worker returns to waiting."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · WORK QUEUE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Deferred processing preserves FIFO order while ISR returns promptly.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+330} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+570} step={3}/>;
const Step5:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+750} step={4}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:180,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:240,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:180,transition:'none' as const},
 {id:'step5',Comp:Step5,dur:150,transition:'none' as const},
];
