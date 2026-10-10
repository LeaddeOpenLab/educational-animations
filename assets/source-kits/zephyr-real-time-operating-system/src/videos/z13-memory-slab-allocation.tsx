import React from 'react';
import {COLORS as C,FONT} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Heading,Kicker,Lines,Chip} from '../components/ui';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from './z13-memory-slab-allocation.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT = {
  visualArgument: "Show fixed-size block ownership, exhaustion and immediate reuse. A returned block is reused without changing block size.",
  motion: "Three fixed-size blocks are free. A, B and C each acquire one whole block. D requests without waiting while free count is zero and cannot allocate. B frees its block; D acquires the exact same slot. A, D and C own the three slots; free count is zero.",
  example: "Three fixed-size blocks are free.",
  antiTemplate: "Allocation consumes an entire fixed-size block; a freed block can be reused without heap splitting. This topic uses three equal blocks, tasks A B C D, free block count, allocation failure rather than a generic call-chain diagram.",
  sceneRationale: "5 scenes separately establish Three Equal Free Blocks; Allocate Blocks to A, B, C; A Fourth Request Finds No Free Block; Free B, Then Reuse Its Block; Track Ownership and Free Count. These steps distinguish the cause from the operation and its visible consequence; removing a step hides Allocation consumes an entire fixed-size block; a freed block can be reused without heap splitting."
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<ResourcePool values={st.owners} count={st.free} waiting={st.request} token={st.transfer>0&&st.transfer<1?{label:"D allocates",x:600-260*st.transfer,y:290-190*st.transfer}:null} caption="Fixed-size blocks · 64 bytes each"/>);};
const HEADINGS=["Three Equal Free Blocks", "Allocate Blocks to A, B, C", "A Fourth Request Finds No Free Block", "Free B, Then Reuse Its Block", "Track Ownership and Free Count"];
const COPY=["Three fixed-size blocks are free.", "A, B and C each acquire one whole block.", "D requests without waiting while free count is zero and cannot allocate.", "B frees its block; D acquires the exact same slot.", "A, D and C own the three slots; free count is zero."];
const Stage=({f,step}:{f:number;step:number})=>(
  <><Backdrop width={1920} height={1080}/>
  <Kicker text="ZEPHYR · MEMORY SLAB ALLOCATION" frame={f} top={70}/>
  <Heading text={HEADINGS[step]} frame={f} top={142} width={700} size={54}/>
  <Lines items={[COPY[step]]} frame={f} top={320} width={635} size={31} gap={22}/>
  <div style={{position:'absolute',left:840,top:300,width:950,height:620}}><Mechanism f={f}/></div>
  <div data-k="text" data-n="conclusion" style={{position:'absolute',left:108,top:730,width:620,fontFamily:FONT,fontSize:25,lineHeight:1.45,color:C.textStrong}}>A returned block is reused without changing block size.</div>
  </>
);
const Step1:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+0} step={0}/>;
const Step2:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+150} step={1}/>;
const Step3:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+360} step={2}/>;
const Step4:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+570} step={3}/>;
const Step5:React.FC<{frame:number}> = ({frame})=> <Stage f={frame+750} step={4}/>;
export const SCENES = [
 {id:'step1',Comp:Step1,dur:150,transition:'none' as const},
 {id:'step2',Comp:Step2,dur:210,transition:'none' as const},
 {id:'step3',Comp:Step3,dur:210,transition:'none' as const},
 {id:'step4',Comp:Step4,dur:180,transition:'none' as const},
 {id:'step5',Comp:Step5,dur:150,transition:'none' as const},
];
