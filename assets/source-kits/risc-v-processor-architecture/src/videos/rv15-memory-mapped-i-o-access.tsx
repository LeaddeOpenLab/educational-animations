import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Caption} from '../components/ui';
import {RiscBoard,BitFields,RegisterBank,DataTokens,PipelineLanes,AddressParts,MemoryWords} from '../components/RiscV';
import {COLORS,FONT,fadeIn,ramp} from '../theme';
import type {SceneDef} from '../Video';
import {rv15State} from '../mechanisms/rv15-state';
const T = {"gpioBase": 268435456, "statusOffset": 4, "ramBase": 2147483648, "writeData": 1};
const DESIGN_AUDIT = {visualArgument: "One numeric address steers a data payload to a real device register; a pin waveform and lamp geometry change with the accepted write, then a reversed transfer returns status.", motion: "Address decode and routing, register replacement, pin rising edge and lamp rays, status readback into aCPU register.", example: "SW1 to illustrativeGPIO0x10000000 turns theLED on; FENCE O,I precedes LW from status0x10000004, returning1.", antiTemplate: "Unlike load/store address calculation, the core consequence is a physical peripheral output with platform-defined register semantics; aRAM comparison proves address-dependent destination.", sceneRationale: "Five scenes separate mapping, address selection, device effect, reverse readback and same-instruction/different-target contrast. The physical change needs its own hold so it cannot be mistaken for a normalRAM store."};
const MMIO=({frame,t,step,title,lines}:{frame:number;t:number;step:number;title:string;lines:string[]})=>{
 const s=rv15State(t);const decode=ramp(t,180,90);
 return <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · MEMORY-MAPPED I/O" frame={frame}/>
 <Heading text={title} frame={frame} width={650} size={50}/><Lines items={lines} frame={frame} start={24} step={12} top={345} width={615} size={30}/>
 <Caption text="Illustrative platform map · aligned 32-bit accesses · permitted physical addresses" frame={frame} start={48} top={915} width={1650} size={25}/>
 <div style={{position:'absolute',left:850,top:250,opacity:fadeIn(frame,12)}}><RiscBoard>
 {step===0?<g><MemoryWords x={35} y={80} width={865} rowHeight={95} words={[{address:'0x80000000 · RAM',value:s.ram},{address:'0x10000000 · OUTPUT',value:s.output},{address:'0x10000004 · STATUS',value:s.status}]}/><DataTokens tokens={[{label:'SW address',value:'0x10000000',x:80,y:425,width:275},{label:'Write data',value:1,x:570,y:425}]}/></g>:<g>
 <MemoryWords x={420} y={65} width={485} rowHeight={80} selectedAddress={s.decoded} words={[{address:'GPIO output',value:s.output},{address:'GPIO status',value:s.status},{address:'RAM',value:s.ram}]}/>
 <RegisterBank x={35} y={65} width={290} values={[{index:2,value:1},{index:3,value:s.x3}]}/>
 {step===1&&<g><DataTokens tokens={[{label:'Region decode',value:'0x10000000',x:70+320*decode,y:350,width:290}]}/><text x={480} y={495} textAnchor="middle" fontSize={29} fill={COLORS.result}>Select OUTPUT register, offset 0</text></g>}
 {step===2&&<g><DataTokens tokens={[{label:'Store payload',value:s.data,x:s.requestX,y:465}]}/><path d={`M390 430 H620 V${s.pinY+100} H760`} fill="none" stroke={COLORS.primary} strokeWidth={7}/><circle cx={825} cy={s.pinY+100} r={s.ledRadius} stroke={COLORS.result} strokeWidth={4} fill={s.ledOn?COLORS.result:'none'}/>{s.ledOn&&[0,1,2,3].map(i=><line key={i} x1={825+43*Math.cos(i*Math.PI/2)} y1={s.pinY+100+43*Math.sin(i*Math.PI/2)} x2={825+62*Math.cos(i*Math.PI/2)} y2={s.pinY+100+62*Math.sin(i*Math.PI/2)} stroke={COLORS.result} strokeWidth={5}/>)}</g>}
 {step===3&&<g><text x={480} y={360} textAnchor="middle" fill={COLORS.accent} fontSize={29}>FENCE O,I {s.fenceCompleted?'complete':'ordering'}</text><DataTokens tokens={[{label:'Status → x3',value:s.status,x:s.requestX,y:435}]}/><text x={480} y={550} textAnchor="middle" fill={COLORS.textMuted} fontSize={26}>LW x3, 4(x1) · address 0x10000004</text></g>}
 {step===4&&<g><text x={475} y={355} textAnchor="middle" fontSize={26} fill={COLORS.textMuted}>Separate RAM-store example</text><MemoryWords x={140} y={390} width={690} words={[{address:'0x80000000',value:s.comparisonRam}]}/><DataTokens tokens={[{label:'Same SW data',value:1,x:190+330*ramp(t,765,45),y:510}]}/></g>}
 </g>}
 </RiscBoard></div></div>;
};
const Map=({frame}:{frame:number})=><MMIO frame={frame} t={frame} step={0} title="A device can own an address" lines={['RAM and device registers share an address space.','SW uses address 0x10000000.','The platform defines this GPIO mapping.']}/>;
const Decode=({frame}:{frame:number})=><MMIO frame={frame} t={150+frame} step={1} title="Decode where the store goes" lines={['The address matches the GPIO region.','Offset 0 selects its output register.','The RAM branch receives no request.']}/>;
const Write=({frame}:{frame:number})=><MMIO frame={frame} t={330+frame} step={2} title="Change the physical output" lines={['The device accepts write data 1.','Output changes 0 → 1; the pin rises.','The LED lights while RAM stays 55.']}/>;
const Readback=({frame}:{frame:number})=><MMIO frame={frame} t={540+frame} step={3} title="Read the device state back" lines={['FENCE O,I orders device output before input.','LW selects status at offset 4.','Returned status 1 is written into x3.']}/>;
const Contrast=({frame}:{frame:number})=><MMIO frame={frame} t={750+frame} step={4} title="The address determines the effect" lines={['The completed GPIO store changed an output.','A separate store to RAM changes a memory cell.','Same data and opcode; different recipient.']}/>;
export const SCENES:SceneDef[]=[{id:'map',Comp:Map,dur:150},{id:'decode',Comp:Decode,dur:180},{id:'write',Comp:Write,dur:210},{id:'readback',Comp:Readback,dur:210},{id:'contrast',Comp:Contrast,dur:150}];
