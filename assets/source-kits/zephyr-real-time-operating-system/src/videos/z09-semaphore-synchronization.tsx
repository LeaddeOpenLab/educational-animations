import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z09-semaphore-synchronization.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show a blocked consumer woken by an ISR event with no stored-count increase. Consumer resumes and handles one event without polling.",
  motion: "Binary semaphore has count zero. Consumer blocks on take instead of running. ISR gives; event token moves directly toward the waiting consumer. The waiting take completes; count remains zero after the delivered event.",
  example: "Binary semaphore has count zero.",
  antiTemplate: "Semaphores have no mutex ownership; an ISR can give while a thread waits. This topic uses binary semaphore, consumer, ISR event, waiter handoff rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Start with No Event; Consumer Waits at Zero; ISR Gives an Event; Wake the Waiting Consumer. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Semaphores have no mutex ownership; an ISR can give while a thread waits."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ResourcePool values={st.values} count={st.count} waiting={st.waiting} token={st.token} caption={st.awake?`Consumer resumed · events handled ${st.processed}`:"Binary semaphore · direct waiter handoff"}/>);};
const HEADINGS=["Start with No Event", "Consumer Waits at Zero", "ISR Gives an Event", "Wake the Waiting Consumer"];
const COPY=["Binary semaphore has count zero.", "Consumer blocks on take instead of running.", "ISR gives; event token moves directly toward the waiting consumer.", "The waiting take completes; count remains zero after the delivered event."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · SEMAPHORE SYNCHRONIZATION" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Consumer resumes and handles one event without polling.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+360} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+630} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:210,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:270,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:270,transition:'none' as const},
];
