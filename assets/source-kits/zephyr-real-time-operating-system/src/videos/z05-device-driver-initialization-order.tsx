import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z05-device-driver-initialization-order.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Demonstrate explicit init levels and within-level priorities before driver use. Sensor readiness follows completed prerequisite initialization.",
  motion: "All three drivers start uninitialized. Clock becomes ready in PRE_KERNEL_1 before the bus. Bus is initialized next, then the sensor at POST_KERNEL. Sensor can be used only after the initialization chain has succeeded.",
  example: "All three drivers start uninitialized.",
  antiTemplate: "Dependency order must be configured; devicetree does not automatically schedule all dependencies. This topic uses clock driver, bus driver, sensor driver, init stages, device_is_ready rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Configure Explicit Init Ordering; Clock Before the Bus; Bus Before the Sensor; Check Readiness Before Use. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Dependency order must be configured; devicetree does not automatically schedule all dependencies."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<InitTimeline clock={st.clock} bus={st.bus} sensor={st.sensor} read={st.read}/>);};
const HEADINGS=["Configure Explicit Init Ordering", "Clock Before the Bus", "Bus Before the Sensor", "Check Readiness Before Use"];
const COPY=["All three drivers start uninitialized.", "Clock becomes ready in PRE_KERNEL_1 before the bus.", "Bus is initialized next, then the sensor at POST_KERNEL.", "Sensor can be used only after the initialization chain has succeeded."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · DRIVER INITIALIZATION" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Sensor readiness follows completed prerequisite initialization.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+180} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+360} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+660} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:180,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:180,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:300,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:240,transition:'none' as const},
];
