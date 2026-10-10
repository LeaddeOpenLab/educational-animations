import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z15-west-manifest-and-module-resolution.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show imported project definitions resolved to explicit checkout revisions. Included HAL is at its declared revision and exposes module metadata to the build.",
  motion: "Manifest lists Zephyr and imports its project definitions. HAL from the import is included while an inactive project remains excluded. west update replaces the HAL checkout revision old with v2. Build module discovery finds the included HAL module metadata.",
  example: "Manifest lists Zephyr and imports its project definitions.",
  antiTemplate: "The manifest declares revisions; west update aligns repositories. Module discovery is a separate build step. This topic uses west.yml, Zephyr project, HAL imported project, excluded module, checkout revision rather than a generic call-chain diagram.",
  sceneRationale: "4 scenes separately establish Declare Project Revisions; Resolve Imported Projects; Update Included Checkouts; Discover Build Modules. These steps distinguish the cause from the operation and its visible consequence; removing a step hides The manifest declares revisions; west update aligns repositories. Module discovery is a separate build step."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ModuleGraph modules={st.modules} progress={st.progress} resolved={st.resolved}/>);};
const HEADINGS=["Declare Project Revisions", "Resolve Imported Projects", "Update Included Checkouts", "Discover Build Modules"];
const COPY=["Manifest lists Zephyr and imports its project definitions.", "HAL from the import is included while an inactive project remains excluded.", "west update replaces the HAL checkout revision old with v2.", "Build module discovery finds the included HAL module metadata."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · WEST MANIFEST" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>Included HAL is at its declared revision and exposes module metadata to the build.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+360} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+600} step={3}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:210,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:240,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:300,transition:'none' as const},
];
