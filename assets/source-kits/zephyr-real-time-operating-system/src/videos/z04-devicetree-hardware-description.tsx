import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z04-devicetree-hardware-description.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show an overlay changing hardware-description properties used at build time. The resolved hardware properties feed code generation, not runtime reconfiguration.",
  motion: "UART is disabled with a 9600 baud property. Overlay supplies status okay and current-speed 115200. The merged node replaces both property values. Generated macros contain the merged baud rate and status.",
  example: "UART is disabled with a 9600 baud property.",
  antiTemplate: "Devicetree describes hardware; it does not execute a driver or guarantee initialization success. This topic uses UART node, status property, speed property, overlay, generated macros rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Describe a UART Node; Apply a Board Overlay; Merge Concrete Properties; Generate Compile-Time Data. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Devicetree describes hardware; it does not execute a driver or guarantee initialization success."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<PropertyTable caption="Board UART node + application overlay" rows={[{key:"reg address",value:`0x${st.address.toString(16)}`,active:true},{key:"overlay speed",value:st.overlay?"115200":"not applied",active:st.overlay},{key:"merged status",value:st.status,active:st.merged},{key:"merged current-speed",value:String(st.speed),active:st.merged},{key:"generated speed macro",value:st.generated?String(st.speed):"pending",active:st.generated}]} result="Hardware data is resolved at build time"/>);};
const HEADINGS=["Describe a UART Node", "Apply a Board Overlay", "Merge Concrete Properties", "Generate Compile-Time Data"];
const COPY=["UART is disabled with a 9600 baud property.", "Overlay supplies status okay and current-speed 115200.", "The merged node replaces both property values.", "Generated macros contain the merged baud rate and status."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · DEVICETREE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>The resolved hardware properties feed code generation, not runtime reconfiguration.</div>
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
