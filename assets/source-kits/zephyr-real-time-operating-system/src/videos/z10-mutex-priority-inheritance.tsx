import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z10-mutex-priority-inheritance.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show a low-priority mutex owner inheriting a blocked high-priority waiter priority. The owner completes without medium extending priority inversion.",
  motion: "Low owns the lock at base priority 5. High priority 1 waits for the mutex; medium priority 3 is ready. Low inherits priority 1 and runs to complete its critical section. Low unlocks; high acquires and low returns to base priority 5. High runs with the lock while medium stays ready.",
  example: "Low owns the lock at base priority 5.",
  antiTemplate: "Inheritance changes effective scheduling priority, not base priority or mutex ownership. This topic uses Low owner base priority 5, High waiter priority 1, Medium priority 3, mutex ownership rather than a generic call-chain diagram.",
  sceneRationale: "5 scenes separately establish Low Holds the Mutex; High Blocks on the Owner; Boost the Owner, Bypass Medium; Unlock Transfers Ownership; Restore the Base Priority. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Inheritance changes effective scheduling priority, not base priority or mutex ownership."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ThreadLanes tasks={[{label:`Low · effective ${st.priority}`,value:`base 5 · ${st.owner==="Low"?"owns mutex":"unlocked"}`,x:st.lowX,y:150},{label:"High · priority 1",value:st.owner==="High"?"owns mutex":"waiting for lock",x:st.highX,y:320,color:C.accent},{label:"Medium · priority 3",value:"ready",x:350,y:430,color:C.alt}]} running={st.current} trace="Inheritance changes effective priority, not base"/>);};
const HEADINGS=["Low Holds the Mutex", "High Blocks on the Owner", "Boost the Owner, Bypass Medium", "Unlock Transfers Ownership", "Restore the Base Priority"];
const COPY=["Low owns the lock at base priority 5.", "High priority 1 waits for the mutex; medium priority 3 is ready.", "Low inherits priority 1 and runs to complete its critical section.", "Low unlocks; high acquires and low returns to base priority 5.", "High runs with the lock while medium stays ready."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · MUTEX PRIORITY INHERITANCE" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>The owner completes without medium extending priority inversion.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+330} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+570} step={3}/>;
const Step5:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+750} step={4}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:180,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:240,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:180,transition:'none' as const},
 {id:'step5',Comp:Step5,dur:150,transition:'none' as const},
];
