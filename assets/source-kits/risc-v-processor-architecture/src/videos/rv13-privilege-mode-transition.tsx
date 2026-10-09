import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Caption} from '../components/ui';
import {RiscBoard,BitFields,RegisterBank,DataTokens,PipelineLanes,AddressParts,MemoryWords} from '../components/RiscV';
import {COLORS,FONT,fadeIn,ramp} from '../theme';
import type {SceneDef} from '../Video';
import {rv13State} from '../mechanisms/rv13-state';
const T = {"modes": ["U", "S", "M"], "mppBits": ["00", "01", "11"], "entry": 240, "restore": 480};
const DESIGN_AUDIT = {visualArgument: "An active-hart token moves between privilege lanes while independent saved-state bit cells copy, restore and reset; their differing values disprove the common MPP=current-mode misconception.", motion: "Mode-token transfer plus discrete stack-field copies at trap and return.", example: "Undelegated S ECALL with MIE1 enters M and saves MPP01; MRET returns S while MPP resets00.", antiTemplate: "This is a privilege-state stack, not a PC-address timeline or generic trap flow. The decisive picture shows active S alongside saved U.", sceneRationale: "Four scenes suffice: distinguish active/saved state, save on entry, consume on return, and compare the three actual snapshots. More handler detail would obscure MPP."};
const ModeMap=({frame,t,phase,title,copy}:{frame:number;t:number;phase:number;title:string;copy:string[]})=>{
 const s=rv13State(t);const entering=ramp(t,195,45),leaving=ramp(t,435,45);
 return <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}><Backdrop width={1920} height={1080}/>
 <Kicker text="RISC-V · PRIVILEGE STATE" frame={frame}/><Heading text={title} frame={frame} width={650} size={50}/><Lines items={copy} frame={frame} start={24} step={12} top={345} width={615} size={30}/>
 <Caption text="Example hart supports M, S and U · trap is not delegated" frame={frame} start={48} top={920} width={1650} size={25}/>
 <div style={{position:'absolute',left:850,top:250,opacity:fadeIn(frame,12)}}><RiscBoard>
 {phase<3?<g>{['M · 11','S · 01','U · 00'].map((m,i)=><g key={m}><rect x={20} y={45+i*145} width={350} height={125} rx={12} fill="none" stroke={COLORS.axis}/><text x={45} y={83+i*145} fill={COLORS.textStrong} fontSize={28}>{m}</text></g>)}
 <DataTokens tokens={[{label:'Active hart',value:s.mode,x:165,y:s.hartY}]}/>
 <BitFields x={425} y={210} width={490} fields={[{label:'MPP',bits:2,value:s.mppBits},{label:'MIE',bits:1,value:s.mie},{label:'MPIE',bits:1,value:s.mpie}]}/>
 <text x={670} y={360} textAnchor="middle" fill={COLORS.textStrong} fontSize={30}>Saved previous mode: {s.mpp}</text>
 {phase===1&&<DataTokens tokens={[{label:'Save old S',value:'01',x:175+270*entering,y:470,width:155},{label:'MIE to MPIE',value:1,x:590+140*entering,y:470,width:155}]}/>}
 {phase===2&&<DataTokens tokens={[{label:'Consume old MPP',value:'S',x:445-260*leaving,y:470,width:240}]}/>}
 </g>:<g>{s.snapshots.map((snap,i)=><g key={i}><text x={165+i*315} y={90} textAnchor="middle" fontSize={27} fill={COLORS.textStrong}>{['Before trap','In handler','After MRET'][i]}</text><MemoryWords x={25+i*315} y={140} width={285} rowHeight={80} words={[{address:'Active',value:snap.mode},{address:'MPP',value:snap.MPP},{address:'MIE',value:snap.MIE},{address:'MPIE',value:snap.MPIE}]} progress={fadeIn(frame,12+i*12)}/></g>)}<text x={480} y={535} textAnchor="middle" fill={COLORS.result} fontSize={30}>Active S does not mean MPP = S</text></g>}
 </RiscBoard></div></div>;
};
const Separate=({frame}:{frame:number})=><ModeMap frame={frame} t={frame} phase={0} title="Active mode and saved mode differ" copy={['The hart is currently in S-mode.','MPP is a separate saved-state field.','Here MPP = 00 means U.']}/>;
const Save=({frame}:{frame:number})=><ModeMap frame={frame} t={180+frame} phase={1} title="A trap saves the old privilege" copy={['Undelegated S-mode ECALL enters M.','MPP receives S: binary 01.','MIE is saved in MPIE, then cleared.']}/>;
const Consume=({frame}:{frame:number})=><ModeMap frame={frame} t={390+frame} phase={2} title="MRET consumes the saved mode" copy={['Old MPP = S selects the return mode.','MIE is restored from MPIE.','MPP resets to U; current mode is S.']}/>;
const Compare=({frame}:{frame:number})=><ModeMap frame={frame} t={630+frame} phase={3} title="Read the complete state transition" copy={['Active privilege follows S → M → S.','Saved MPP follows U → S → U.','Restore first, then reset saved state.']}/>;
export const SCENES:SceneDef[]=[{id:'separate',Comp:Separate,dur:180},{id:'save',Comp:Save,dur:210},{id:'consume',Comp:Consume,dur:240},{id:'compare',Comp:Compare,dur:210}];
