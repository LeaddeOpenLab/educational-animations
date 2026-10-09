import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Chip} from '../components/ui';
import {RiscBoard,DataTokens,PipelineLanes,MemoryWords,RegisterBank} from '../components/RiscV';
import {COLORS} from '../theme';
import {loadUseState} from '../mechanisms/rv10-state';
const T={address:0x3000,loaded:42,addend:3,hex:(v:number)=>'0x'+v.toString(16).toUpperCase()};
const DESIGN_AUDIT={visualArgument:'A load has only an address when the next ALU instruction needs its data; one held front-end cycle lets memory finish while a non-writing bubble enters EX.',motion:'The load advances alone, consumer and PC freeze, an empty EX slot appears, memory returns42, then the consumer resumes and produces45.',example:'LW x5,0(x1) obtains42 and dependent ADD x6,x5,x2 uses3 to produce45 after one hold.',antiTemplate:'Unlike ready-value forwarding, this story preserves repeated stage positions and an empty execution slot while the older producer moves.',sceneRationale:'Five scenes are required to expose unavailable data, the simultaneous hold and drain, the memory response, resumed computation, and the extra cycle visible in the final schedule.'};
const Stage=({frame,title,copy,children,note}:{frame:number;title:string;copy:string[];children:React.ReactNode;note:string})=><><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · Load-use stall" frame={frame}/><Heading text={title} frame={frame} width={650} size={50}/><Lines items={copy} frame={frame} top={345} width={615} size={30}/><div style={{position:'absolute',left:850,top:250}}><RiscBoard>{children}</RiscBoard></div><div style={{position:'absolute',left:108,top:860}}><Chip text={note}/></div></>;
const TooEarly=({frame}:{frame:number})=>{const s=loadUseState(frame);return <Stage frame={frame} title="An address is not the load value." copy={['LW computes 0x3000 in EX.','The next ADD needs the word that memory has not returned.']} note="Five stages · one-cycle memory · data ready at end of MEM">
 <DataTokens tokens={[{label:'LW in EX: address',value:T.hex(T.address),x:30,y:70,width:300},{label:'ADD in ID: operand',value:s.operand??'waiting for x5',x:30,y:320,width:300}]}/>
 <MemoryWords words={[{address:T.hex(T.address),value:T.loaded}]} selectedAddress={T.hex(T.address)} x={560} y={70} width={340}/>
 <text x={560} y={335} fill={COLORS.textMuted} fontSize={30}>42 is still in memory.</text>
 <text x={170} y={520} fill={COLORS.warn} fontSize={30}>Do not forward the address as data.</text>
 </Stage>};
const HoldAndBubble=({frame}:{frame:number})=>{const s=loadUseState(frame+180);return <Stage frame={frame} title="Hold the consumer. Drain the load." copy={['Keep PC and IF/ID unchanged for one cycle.','Let the load enter MEM; insert a non-writing bubble into EX.']} note="The whole pipeline does not freeze">
 <PipelineLanes instructions={[...s.instructions,...(s.bubble.stage>=0?[{id:'bubble',label:'BUBBLE',stage:s.bubble.stage,row:3,value:'write = 0'}]:[])]} y={65} rowHeight={68}/>
 <DataTokens tokens={[{label:'PC holds',value:T.hex(s.pc),x:40,y:490,width:260},{label:'EX slot',value:s.bubble.stage>=0?'valid = 0':'load',x:605,y:490,width:280}]}/>
 </Stage>};
const MemoryReady=({frame}:{frame:number})=>{const s=loadUseState(frame+420);return <Stage frame={frame} title="The memory response supplies 42." copy={['The older load continues through MEM.','At the end of that cycle, its actual data reaches the result latch.']} note="ADD remains in ID while memory finishes">
 <MemoryWords words={[{address:T.hex(T.address),value:T.loaded}]} selectedAddress={T.hex(T.address)} x={30} y={70} width={320}/>
 <DataTokens tokens={[{label:'MEM/WB load value',value:s.loadValue??'empty',x:585,y:70,width:320},{label:'memory response',value:T.loaded,x:140+450*s.dataTravel,y:295,width:190}]}/>
 <text x={100} y={520} fill={COLORS.textMuted} fontSize={32}>ADD stays in ID · EX bubble writes nothing</text>
 </Stage>};
const Resume=({frame}:{frame:number})=>{const s=loadUseState(frame+600);return <Stage frame={frame} title="Resume with the returned value." copy={['The consumer can now enter EX.','Forward 42 and compute 42 + 3 = 45.']} note="One held cycle for this memory timing">
 <PipelineLanes instructions={[...s.instructions,{id:'bubble',label:'BUBBLE',stage:s.bubble.stage,row:3,value:'write = 0'}]} y={65} rowHeight={64}/>
 {s.resumed&&<DataTokens tokens={[{label:'forward load data',value:T.loaded,x:770-365*s.forwardTravel,y:395,width:175}]}/>}
 <text x={90} y={555} fill={COLORS.textStrong} fontSize={35}>EX: {s.operand??'?'} + {T.addend} = {s.result??'?'}</text>
 <text x={615} y={555} fill={COLORS.textMuted} fontSize={28}>PC = {T.hex(s.pc)}</text>
 </Stage>};
const Drain=({frame}:{frame:number})=>{const s=loadUseState(frame+780);return <Stage frame={frame} title="The bubble costs one cycle." copy={['The ADD occupied ID for two cycles.','It resumes once, then writes the correct result 45.']} note="The stall length depends on the microarchitecture">
 <text x={55} y={45} fill={COLORS.textMuted} fontSize={28}>Cycle 3</text><text x={300} y={45} fill={COLORS.textMuted} fontSize={28}>Cycle 4</text><text x={560} y={45} fill={COLORS.textMuted} fontSize={28}>Cycle 5</text>
 <DataTokens tokens={[{label:'load',value:'EX',x:45,y:100,width:170},{label:'load',value:'MEM',x:295,y:100,width:170},{label:'load',value:'WB',x:545,y:100,width:170},{label:'consumer',value:'ID',x:45,y:280,width:170},{label:'consumer held',value:'ID',x:295,y:280,width:170},{label:'consumer resumes',value:'EX',x:545,y:280,width:170}]}/>
 <RegisterBank values={s.registers} x={220} y={440} width={550} rowHeight={66} writeIndex={s.registers[1].value===45?6:null}/>
 </Stage>};
export const SCENES=[{id:'too-early',Comp:TooEarly,dur:180},{id:'hold-and-bubble',Comp:HoldAndBubble,dur:240},{id:'memory-ready',Comp:MemoryReady,dur:180},{id:'resume',Comp:Resume,dur:180},{id:'drain',Comp:Drain,dur:150}];
