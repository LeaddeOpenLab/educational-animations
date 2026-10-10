import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z08-message-queue-thread-communication.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Prove fixed-size messages are copied into the queue and received in FIFO order. Receiver gets 42 even after producer changes its buffer to 99.",
  motion: "Producer buffer contains 42. put copies 42 into the first queue slot. Producer reuses its own buffer for 99 while queued 42 remains intact. get copies the oldest queued message into receiver storage.",
  example: "Producer buffer contains 42.",
  antiTemplate: "The queue copies message bytes; it does not retain the producer buffer pointer in this example. This topic uses producer buffer, messages 42 and 99, queue slots, receiver buffer rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Producer Owns a Message; Copy Bytes into FIFO Storage; Reusing the Buffer Preserves the Copy; Receive the Original Message. These steps distinguish the cause from the operation and its visible consequence; removing a step hides The queue copies message bytes; it does not retain the producer buffer pointer in this example."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<PacketQueue slots={st.slots} moving={st.moving} source={`Producer buffer: ${st.producer}`} target={`Receiver: ${st.received===null?"empty":st.received}`} detail="put copies bytes · get receives oldest message"/>);};
const HEADINGS=["Producer Owns a Message", "Copy Bytes into FIFO Storage", "Reusing the Buffer Preserves the Copy", "Receive the Original Message"];
const COPY=["Producer buffer contains 42.", "put copies 42 into the first queue slot.", "Producer reuses its own buffer for 99 while queued 42 remains intact.", "get copies the oldest queued message into receiver storage."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · MESSAGE QUEUE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Receiver gets 42 even after producer changes its buffer to 99.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+180} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+390} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+660} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:180,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:210,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:270,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:240,transition:'none' as const},
];
