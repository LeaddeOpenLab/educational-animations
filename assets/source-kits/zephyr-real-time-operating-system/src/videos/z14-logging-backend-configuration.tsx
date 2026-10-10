import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z14-logging-backend-configuration.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show filtering, deferred storage and output through an enabled backend. Rejected DEBUG produces no output; ERROR arrives at UART later.",
  motion: "UART backend is enabled with INFO threshold. DEBUG is discarded while ERROR is accepted. The accepted ERROR record occupies the deferred buffer while caller returns. Logging processing emits the record via UART and frees the buffer slot.",
  example: "UART backend is enabled with INFO threshold.",
  antiTemplate: "Filtering and backend enablement are distinct; deferred mode separates log call from output. This topic uses debug record, error record, runtime filter, deferred buffer, UART backend rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Enable Logging and a Backend; Filter Before Buffering; Defer the Accepted Record; Process the Buffer through UART. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Filtering and backend enablement are distinct; deferred mode separates log call from output."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<PacketQueue slots={st.slots} moving={st.moving} source="INFO filter · DEBUG discarded" target={st.output} detail={st.buffered?"ERROR buffered · caller has returned":"Enabled UART backend · deferred logging"}/>);};
const HEADINGS=["Enable Logging and a Backend", "Filter Before Buffering", "Defer the Accepted Record", "Process the Buffer through UART"];
const COPY=["UART backend is enabled with INFO threshold.", "DEBUG is discarded while ERROR is accepted.", "The accepted ERROR record occupies the deferred buffer while caller returns.", "Logging processing emits the record via UART and frees the buffer slot."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · LOGGING BACKEND CONFIGURATION" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Rejected DEBUG produces no output; ERROR arrives at UART later.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+180} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+360} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+600} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:180,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:180,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:240,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:300,transition:'none' as const},
];
