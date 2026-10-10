import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z06-gpio-callback-and-interrupt-handling.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Connect a physical rising edge with interrupt dispatch and a callback counter. One edge produces one callback increment in this simplified trace.",
  motion: "Pin 3 is low and callback count zero. The callback mask and rising-edge trigger are configured. A rising transition delivers a pin event into the callback. The callback increments its counter and returns to interrupted work.",
  example: "Pin 3 is low and callback count zero.",
  antiTemplate: "Keep callback work short; interrupt-context callbacks must not wait on blocking APIs. This topic uses pin 3, rising edge, registered callback mask, callback count rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Register a Pin Mask; Enable Rising-Edge Interrupts; Deliver the Edge to the Callback; Count the Event, Return Quickly. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Keep callback work short; interrupt-context callbacks must not wait on blocking APIs."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<PinTrace {...st}/>);};
const HEADINGS=["Register a Pin Mask", "Enable Rising-Edge Interrupts", "Deliver the Edge to the Callback", "Count the Event, Return Quickly"];
const COPY=["Pin 3 is low and callback count zero.", "The callback mask and rising-edge trigger are configured.", "A rising transition delivers a pin event into the callback.", "The callback increments its counter and returns to interrupted work."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · GPIO INTERRUPT CALLBACK" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>One edge produces one callback increment in this simplified trace.</div>
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
