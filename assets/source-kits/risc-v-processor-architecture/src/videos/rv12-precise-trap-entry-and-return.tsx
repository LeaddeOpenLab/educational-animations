import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Caption} from '../components/ui';
import {RiscBoard,BitFields,RegisterBank,DataTokens,PipelineLanes,AddressParts,MemoryWords} from '../components/RiscV';
import {COLORS,FONT,fadeIn,ramp} from '../theme';
import type {SceneDef} from '../Video';
import {rv12State} from '../mechanisms/rv12-state';
const T = {"ecallPC": 260, "handlerPC": 2048, "resumePC": 264, "exceptionCode": 8};
const DESIGN_AUDIT = {visualArgument: "A program cursor and two register cells show exactly which side of the ECALL boundary has executed; address tokens are saved, explicitly adjusted, and restored.", motion: "Older write, simultaneous trap CSR capture, software address addition, PC restoration and delayed younger write.", example: "U ECALL at0x104 traps to0x800; handler adds4 to mepc and MRET resumes0x108.", antiTemplate: "Unlike the privilege lesson, this lesson centers instruction order and the saved/resume PC; MPP and interrupt stack detail remain background.", sceneRationale: "Five scenes are required to distinguish pre-trap precise state, hardware entry, software handling, architectural return and the first resumed effect. The software step cannot be collapsed into entry."};
const hx=(n:number|null)=>n===null?'—':'0x'+n.toString(16).toUpperCase();
const TrapView=({frame,t,section,title,lines}:{frame:number;t:number;section:number;title:string;lines:string[]})=>{
 const s=rv12State(t);const older=ramp(t,40,50),younger=ramp(t,765,45);
 return <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · PRECISE TRAPS" frame={frame}/>
 <Heading text={title} frame={frame} width={650} size={50}/><Lines items={lines} frame={frame} start={24} step={12} top={345} width={615} size={30}/>
 <Caption text="U-mode ECALL · no delegation · direct mtvec = 0x800" frame={frame} start={48} top={915} width={1650} size={25}/>
 <div style={{position:'absolute',left:850,top:250,opacity:fadeIn(frame,12)}}><RiscBoard>
 <MemoryWords x={30} y={55} width={540} rowHeight={80} selectedAddress={hx(s.pc)} words={[{address:'0x100',value:'ADDI x5, 7'},{address:'0x104',value:'ECALL'},{address:'0x108',value:'ADDI x6, 9'}]}/>
 <RegisterBank x={650} y={55} width={255} rowHeight={80} values={[{index:5,value:s.x5},{index:6,value:s.x6}]} writeIndex={section===4&&s.resumed?6:section===0&&s.x5===7?5:null}/>
 <MemoryWords x={30} y={375} width={520} rowHeight={65} words={[{address:'PC',value:hx(s.pc)},{address:'mepc',value:hx(s.mepc)},{address:'mcause',value:s.mcause??'—'}]}/>
 <DataTokens tokens={[{label:'Privilege',value:s.mode,x:690,y:435}]}/>
 {section===0&&<DataTokens tokens={[{label:'Older result',value:7,x:350+290*older,y:300}]}/>}
 {section===1&&<DataTokens tokens={[{label:'Save ECALL address',value:hx(s.transfer.value),x:s.transfer.x,y:290,width:260}]}/>}
 {section===2&&<g><text x={455} y={315} textAnchor="middle" fill={COLORS.accent} fontSize={33}>0x104 + 4 = 0x108</text><text x={740} y={355} textAnchor="middle" fill={COLORS.textMuted} fontSize={24}>SOFTWARE WRITE</text></g>}
 {section===3&&<DataTokens tokens={[{label:'MRET copies mepc',value:hx(s.transfer.value),x:s.transfer.x,y:290,width:250}]}/>}
 {section===4&&<DataTokens tokens={[{label:'Resumed result',value:9,x:350+290*younger,y:300}]}/>}
 </RiscBoard></div></div>;
};
const Boundary=({frame}:{frame:number})=><TrapView frame={frame} t={frame} section={0} title="Stop at a precise boundary" lines={['Older ADDI completes: x5 = 7.','ECALL is next at 0x104.','Younger ADDI has not changed x6.']}/>;
const Entry=({frame}:{frame:number})=><TrapView frame={frame} t={165+frame} section={1} title="Save the trapping address" lines={['ECALL saves its own PC: 0x104.','mcause = 8 identifies U-mode ECALL.','Enter the handler at 0x800.']}/>;
const Handle=({frame}:{frame:number})=><TrapView frame={frame} t={360+frame} section={2} title="The handler chooses where to resume" lines={['This ECALL is 4 bytes long.','Software writes mepc + 4.','Hardware did not skip it automatically.']}/>;
const Return=({frame}:{frame:number})=><TrapView frame={frame} t={570+frame} section={3} title="Return through mepc" lines={['MRET copies 0x108 into PC.','The hart returns to U-mode.','x6 is still 0 at the return boundary.']}/>;
const Resume=({frame}:{frame:number})=><TrapView frame={frame} t={750+frame} section={4} title="Now execute the younger instruction" lines={['The resumed ADDI writes x6 = 9.','The older x5 = 7 is preserved.','Program order spans the trap handler.']}/>;
export const SCENES:SceneDef[]=[{id:'boundary',Comp:Boundary,dur:165},{id:'entry',Comp:Entry,dur:195},{id:'handle',Comp:Handle,dur:210},{id:'return',Comp:Return,dur:180},{id:'resume',Comp:Resume,dur:180}];
