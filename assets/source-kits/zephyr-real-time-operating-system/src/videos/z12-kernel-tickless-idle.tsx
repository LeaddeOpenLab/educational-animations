import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z12-kernel-tickless-idle.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show idle interrupt suppression with a programmed wake deadline and logical-time catchup. Logical time advances while needless periodic wakes are avoided.",
  motion: "CPU receives illustrative periodic ticks before entering idle at time 20. Next timeout is at 80; the timer is programmed for that deadline. CPU remains idle from 20 to 80 without intermediate periodic interrupts. One wake interrupt advances accounted logical time to 80 and services the timeout.",
  example: "CPU receives illustrative periodic ticks before entering idle at time 20.",
  antiTemplate: "Tickless suppresses periodic interrupts, not logical time or scheduled deadlines. This topic uses logical ticks, CPU idle interval, next timeout 80, timer interrupt rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Periodic Ticks Wake the CPU; Find the Next Required Timeout; Sleep Until One Programmed Interrupt; Account for the Elapsed Time. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Tickless suppresses periodic interrupts, not logical time or scheduled deadlines."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ClockTrace time={st.time} deadline={st.deadline} ticks={st.ticks} callbacks={st.callbacks} sleep={st.sleep} description={`Accounted logical time: ${st.accounted}`}/>);};
const HEADINGS=["Periodic Ticks Wake the CPU", "Find the Next Required Timeout", "Sleep Until One Programmed Interrupt", "Account for the Elapsed Time"];
const COPY=["CPU receives illustrative periodic ticks before entering idle at time 20.", "Next timeout is at 80; the timer is programmed for that deadline.", "CPU remains idle from 20 to 80 without intermediate periodic interrupts.", "One wake interrupt advances accounted logical time to 80 and services the timeout."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · KERNEL TICKLESS IDLE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Logical time advances while needless periodic wakes are avoided.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+390} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+660} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:240,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:270,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:240,transition:'none' as const},
];
