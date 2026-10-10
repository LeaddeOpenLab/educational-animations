import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z03-kconfig-feature-selection.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Separate requested options from dependency-resolved configuration. Only a dependency-valid resolved feature is compiled.",
  motion: "Requested LOGGER=y but UART=n. Resolved LOGGER remains n while its dependency is false. UART becomes y; the requested LOGGER can resolve to y. autoconf.h and the included logger object update from the resolved values.",
  example: "Requested LOGGER=y but UART=n.",
  antiTemplate: "A request for y does not override an unmet depends-on constraint. This topic uses LOGGER symbol, UART dependency, requested setting, autoconf.h, compiled feature rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Request a Logger; An Unmet Dependency Blocks It; Enable the UART Dependency; Compile the Resolved Feature. These steps distinguish the cause from the operation and its visible consequence; removing a step hides A request for y does not override an unmet depends-on constraint."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<PropertyTable caption="Conceptual depends-on example" rows={[{key:"Request: LOGGER",value:st.request,active:true},{key:"Dependency: UART",value:st.uart?"y":"n",active:st.uart},{key:"Resolved LOGGER",value:st.logger?"y":"n",active:st.logger},{key:"autoconf.h",value:st.logger?"CONFIG_LOGGER=1":"LOGGER undefined",active:st.logger},{key:"logger object",value:st.compiled?"included":"absent",active:st.compiled}]} result={`Included example bytes: ${st.bytes}`}/>);};
const HEADINGS=["Request a Logger", "An Unmet Dependency Blocks It", "Enable the UART Dependency", "Compile the Resolved Feature"];
const COPY=["Requested LOGGER=y but UART=n.", "Resolved LOGGER remains n while its dependency is false.", "UART becomes y; the requested LOGGER can resolve to y.", "autoconf.h and the included logger object update from the resolved values."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · KCONFIG FEATURE SELECTION" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Only a dependency-valid resolved feature is compiled.</div>
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
