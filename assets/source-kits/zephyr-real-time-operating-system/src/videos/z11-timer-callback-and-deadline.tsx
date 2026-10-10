import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z11-timer-callback-and-deadline.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Distinguish timer expiration scheduling from handler execution context. Periodic deadlines follow the timing schedule; callbacks execute in interrupt context.",
  motion: "Timer begins with initial deadline 30 and period 20. Logical time advances until first deadline is reached. Expirations occur at 30, 50, 70 and 90 and advance next deadline. The callback count matches the expiry marks on the clock trace.",
  example: "Timer begins with initial deadline 30 and period 20.",
  antiTemplate: "Timer expiry functions run in system-clock interrupt context and must not block. This topic uses logical clock, initial delay 30, period 20, expiry callbacks, next deadline rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Schedule Delay and Period; Advance to the First Deadline; Count Periodic Expirations; Keep the Callback Short. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Timer expiry functions run in system-clock interrupt context and must not block."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ClockTrace time={st.time} deadline={st.deadline} callbacks={st.callbacks} ticks={st.ticks} sleep={null} description="Initial delay 30 · period 20 · illustrative time units"/>);};
const HEADINGS=["Schedule Delay and Period", "Advance to the First Deadline", "Count Periodic Expirations", "Keep the Callback Short"];
const COPY=["Timer begins with initial deadline 30 and period 20.", "Logical time advances until first deadline is reached.", "Expirations occur at 30, 50, 70 and 90 and advance next deadline.", "The callback count matches the expiry marks on the clock trace."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · TIMER CALLBACK AND DEADLINE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Periodic deadlines follow the timing schedule; callbacks execute in interrupt context.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+180} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+420} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+660} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:180,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:240,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:240,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:240,transition:'none' as const},
];
