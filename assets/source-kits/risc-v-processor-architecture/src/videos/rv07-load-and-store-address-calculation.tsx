import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Chip} from '../components/ui';
import {RiscBoard,DataTokens,RegisterBank,MemoryWords,BitFields} from '../components/RiscV';
import {COLORS,ramp} from '../theme';
import {memoryAddressState} from '../mechanisms/rv07-state';
const T={base:0x2008,hx:(v:number)=>'0x'+v.toString(16).toUpperCase()};
const DESIGN_AUDIT={visualArgument:'An address calculation selects a concrete memory row, then a separate payload changes its destination register or memory word.',motion:'Sign bits extend, base and offset combine, and numeric payloads cross between memory and registers in opposite directions.',example:'LW x5,-8(x1) reads42 from0x2000;SW x6,4(x1) writes99 at0x200C.',antiTemplate:'A bidirectional payload copy between register and memory differs from the previous branch cursor and next lesson clocked-latch bundles.',sceneRationale:'Four scenes separate address formation from data movement for each direction; negative and positive offsets expose sign extension and prevent confusing store data with the address operand.'};
const Sheet=({frame,title,copy,children,tag}:{frame:number;title:string;copy:string[];children:React.ReactNode;tag:string})=><><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · Address & data" frame={frame}/><Heading text={title} frame={frame} width={650} size={50}/><Lines items={copy} frame={frame} top={345} width={615} size={30}/><div style={{position:'absolute',left:850,top:250}}><RiscBoard>{children}</RiscBoard></div><div style={{position:'absolute',left:108,top:860}}><Chip text={tag}/></div></>;
const SignedOffset=({frame}:{frame:number})=>{const s=memoryAddressState(frame),p=ramp(frame,35,65);return <Sheet frame={frame} title="A signed offset forms the address." copy={['LW x5, −8(x1)','Sign-extend the 12-bit offset before adding it to x1.']} tag="Byte address · aligned RV32I word load">
 <BitFields fields={[{label:'12-bit immediate',bits:12,value:'1111 1111 1000'}]} x={90} y={65} width={760}/>
 <BitFields fields={[{label:'replicated sign',bits:20,value:p===1?'FFFFF':'…'},{label:'low 12 bits',bits:12,value:'FF8'}]} x={90} y={245} width={760}/>
 <DataTokens tokens={[{label:'base x1',value:T.hx(T.base),x:60,y:440},{label:'signed offset',value:s.signedOffset,x:360,y:440},{label:'effective address',value:p===1?T.hx(s.ea):'…',x:655,y:440,width:250}]}/>
 </Sheet>};
const ReadWord=({frame}:{frame:number})=>{const s=memoryAddressState(frame+210);return <Sheet frame={frame} title="LW copies the selected word." copy={['The address selects 0x2000.','The word 42 travels into x5; memory keeps its value.']} tag="Address selects · data transfers">
 <RegisterBank values={s.registers} x={25} y={65} width={270} writeIndex={s.loadDone?5:null}/>
 <MemoryWords words={s.words} selectedAddress={T.hx(s.ea)} x={610} y={65} width={320}/>
 <path d="M685 360 H200" stroke={COLORS.axis} strokeWidth={4}/>
 <DataTokens tokens={[{label:'loaded word',value:s.data,x:670-550*s.progress,y:340,width:150}]}/>
 <text x={350} y={520} fill={COLORS.textStrong} fontSize={32}>x5 ← memory[{T.hx(s.ea)}]</text>
 </Sheet>};
const StoreAddress=({frame}:{frame:number})=>{const s=memoryAddressState(frame+420),p=ramp(frame,25,65);return <Sheet frame={frame} title="Store data is a separate input." copy={['SW x6, 4(x1)','Add the base and offset. Keep x6 = 99 for the later write.']} tag="The address does not use rs2 data">
 <RegisterBank values={s.registers.filter(v=>v.index!==5)} readIndices={[1,6]} x={30} y={60} width={300}/>
 <DataTokens tokens={[{label:'offset',value:4,x:410,y:60},{label:'effective address',value:p===1?T.hx(s.ea):'…',x:650,y:240,width:255}]}/>
 <path d="M340 105 L640 270 M500 150 L640 270" stroke={COLORS.axis} strokeWidth={3}/>
 <DataTokens tokens={[{label:'store data x6',value:s.data,x:80+220*p,y:390,width:240}]}/>
 <text x={590} y={500} fill={COLORS.accent} fontSize={32}>99 stays data</text>
 </Sheet>};
const WriteWord=({frame}:{frame:number})=>{const s=memoryAddressState(frame+630);return <Sheet frame={frame} title="SW replaces one memory word." copy={['Send 99 to the computed address 0x200C.','x6 stays 99. The other memory words are unchanged.']} tag="Same address rule · opposite data direction">
 <RegisterBank values={s.registers} readIndices={[6]} x={25} y={60} width={270}/>
 <MemoryWords words={s.words} selectedAddress={T.hx(s.ea)} x={620} y={60} width={310}/>
 <DataTokens tokens={[{label:'store payload',value:s.data,x:140+530*s.progress,y:350,width:150}]}/>
 <text x={220} y={530} fill={COLORS.textStrong} fontSize={33}>memory[{T.hx(s.ea)}] ← x6</text>
 </Sheet>};
export const SCENES=[{id:'signed-offset',Comp:SignedOffset,dur:210},{id:'read-word',Comp:ReadWord,dur:210},{id:'store-address',Comp:StoreAddress,dur:210},{id:'write-word',Comp:WriteWord,dur:270}];
