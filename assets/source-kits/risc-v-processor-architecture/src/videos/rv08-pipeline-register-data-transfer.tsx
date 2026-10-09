import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Chip} from '../components/ui';
import {RiscBoard,DataTokens,RegisterBank} from '../components/RiscV';
import {COLORS,ramp} from '../theme';
import {latchState} from '../mechanisms/rv08-state';
const T={a:7,b:5,rd:5,labels:['operands','destination','write enable']};
const DESIGN_AUDIT={visualArgument:'Capturing a concrete bundle separates stable stored operands from changing upstream values, and its destination tag follows the result to writeback.',motion:'Fields assemble, a clock edge copies them into a latch, ALU operands become12, and result plus rd5 advance through later latches.',example:'ADD x5,x1,x2 carries7,5,rd5,write1 and finally writes12 into x5.',antiTemplate:'This lesson proves between-edge preservation and metadata continuity, whereas forwarding bypasses those normal boundaries.',sceneRationale:'Five phases are needed for assembling data/control, capturing with an upstream-change counterexample, computing and latching, carrying through MEM, and writing the tagged destination.'};
const Panel=({frame,title,copy,children}:{frame:number;title:string;copy:string[];children:React.ReactNode})=><><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · Pipeline registers" frame={frame}/><Heading text={title} frame={frame} width={650} size={50}/><Lines items={copy} frame={frame} top={345} width={615} size={30}/><div style={{position:'absolute',left:850,top:250}}><RiscBoard>{children}</RiscBoard></div><div style={{position:'absolute',left:108,top:860}}><Chip text="Illustrative five-stage pipeline · not an ISA requirement"/></div></>;
const Bundle=({frame}:{frame:number})=>{const p=ramp(frame,25,60);return <Panel frame={frame} title="Carry data and control together." copy={['ADD x5, x1, x2 uses 7 and 5.','Later stages also need the destination x5 and write enable.']}>
 <DataTokens tokens={[{label:'operand A',value:T.a,x:40+340*p,y:60},{label:'operand B',value:T.b,x:40+340*p,y:195},{label:'destination',value:'rd = '+T.rd,x:680-300*p,y:330},{label:'RegWrite',value:1,x:680-300*p,y:465}]}/>
 <rect x={345} y={30} width={250} height={530} fill="none" stroke={COLORS.axis} strokeDasharray="9 7" strokeWidth={3}/>
 </Panel>};
const Capture=({frame}:{frame:number})=>{const s=latchState(frame+180);return <Panel frame={frame} title="Capture once. Then hold." copy={['The edge stores the whole bundle in ID/EX.','The next instruction changes ID inputs; the stored operands stay 7 and 5.']}>
 <text x={50} y={50} fill={COLORS.textStrong} fontSize={32}>ID inputs</text><text x={600} y={50} fill={COLORS.textStrong} fontSize={32}>ID/EX contents</text>
 <DataTokens tokens={[{label:'A / B / destination',value:`${s.input.a} / ${s.input.b} / x${s.input.rd}`,x:40,y:120,width:300},{label:'captured A / B',value:s.idex?`${s.idex.a} / ${s.idex.b}`:'empty',x:590,y:120,width:300},{label:'captured destination',value:s.idex?'x'+s.idex.rd:'empty',x:590,y:330,width:300}]}/>
 {frame<80&&<DataTokens tokens={[{label:'bundle',value:'7 / 5 / x5',x:40+550*s.transfer,y:225,width:260}]}/>}
 <path d="M70 500 H360 V455 H480 V500 H865" fill="none" stroke={COLORS.primary} strokeWidth={4}/>
 <text x={320} y={550} fill={COLORS.textMuted} fontSize={26}>clock edge captures the bundle</text>
 </Panel>};
const ResultLatch=({frame}:{frame:number})=>{const s=latchState(frame+390),travel=ramp(frame,80,40);return <Panel frame={frame} title="Latch the result with its tag." copy={['The ALU computes 7 + 5 = 12.','The next edge stores both 12 and destination x5 in EX/MEM.']}>
 <DataTokens tokens={[{label:'ID/EX A',value:s.idex?.a??'',x:35,y:70},{label:'ID/EX B',value:s.idex?.b??'',x:275,y:70},{label:'ALU result',value:s.result??'…',x:170,y:285,width:240},{label:'EX/MEM result',value:s.exmem?.result??'empty',x:650,y:285,width:255},{label:'carried destination',value:s.exmem?'x'+s.exmem.rd:'empty',x:650,y:445,width:255}]}/>
 <path d="M440 320 H615" stroke={COLORS.axis} strokeWidth={3}/>
 {s.computed&&frame<120&&<DataTokens tokens={[{label:'result + tag',value:'12 / x5',x:370+220*travel,y:180,width:230}]}/>}
 </Panel>};
const PassThrough=({frame}:{frame:number})=>{const s=latchState(frame+600),p=ramp(frame,25,65);return <Panel frame={frame} title="An ADD passes through MEM." copy={['An ALU instruction does not access data memory.','Its result and destination still advance into MEM/WB.']}>
 <DataTokens tokens={[{label:'EX/MEM',value:`${s.exmem?.result} / x${s.exmem?.rd}`,x:45,y:60,width:300},{label:'MEM/WB',value:s.memwb?`${s.memwb.result} / x${s.memwb.rd}`:'empty',x:585,y:60,width:300}]}/>
 <DataTokens tokens={[{label:'value / destination',value:'12 / x5',x:80+510*p,y:270,width:280}]}/>
 <text x={180} y={490} fill={COLORS.textMuted} fontSize={32}>Memory read = 0 · Memory write = 0</text>
 </Panel>};
const Writeback=({frame}:{frame:number})=>{const s=latchState(frame+750),p=ramp(frame,20,40);return <Panel frame={frame} title="The destination tag selects x5." copy={['The final bundle still carries result 12 and rd = 5.','RegWrite copies the value to that register.']}>
 <DataTokens tokens={[{label:'MEM/WB result',value:s.memwb?.result??'',x:50,y:70,width:280},{label:'destination tag',value:'x'+s.memwb?.rd,x:50,y:260,width:280},{label:'RegWrite',value:s.memwb?.write??0,x:50,y:440,width:280}]}/>
 <RegisterBank values={s.registers} writeIndex={s.registers[0].value===12?5:null} x={590} y={120} width={310} rowHeight={110}/>
 {frame<60&&<DataTokens tokens={[{label:'write data',value:s.memwb?.result??'',x:350+230*p,y:440,width:200}]}/>}
 </Panel>};
export const SCENES=[{id:'bundle',Comp:Bundle,dur:180},{id:'capture',Comp:Capture,dur:210},{id:'result-latch',Comp:ResultLatch,dur:210},{id:'pass-through',Comp:PassThrough,dur:150},{id:'writeback',Comp:Writeback,dur:150}];
