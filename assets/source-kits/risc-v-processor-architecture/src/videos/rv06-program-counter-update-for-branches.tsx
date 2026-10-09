import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Chip} from '../components/ui';
import {RiscBoard,DataTokens,RegisterBank,MemoryWords} from '../components/RiscV';
import {COLORS,ramp} from '../theme';
import {branchState} from '../mechanisms/rv06-state';
const T={base:0x100,offset:16,hx:(v:number)=>'0x'+v.toString(16).toUpperCase()};
const DESIGN_AUDIT={visualArgument:'Two actual arithmetic candidates enter one PC; a register comparison chooses which address becomes the fetched row.',motion:'Address tokens converge on the PC and the fetch cursor relocates after the update; the false case restarts the same branch.',example:'BEQ at0x100:7=7 selects0x110;7!=9 selects0x104.',antiTemplate:'Address selection and a discontinuous fetch cursor differ from adjacent register-memory data transfer and pipeline latches.',sceneRationale:'Five scenes separate address arithmetic, comparison, the taken PC update, a false-condition replay and outcome comparison; without replay both paths could be mistaken for one execution.'};
const Page=({frame,title,copy,children,note}:{frame:number;title:string;copy:string[];children:React.ReactNode;note:string})=><><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · Branch PC" frame={frame}/><Heading text={title} frame={frame} width={650} size={50}/><Lines items={copy} frame={frame} top={345} width={615} size={30}/><div style={{position:'absolute',left:850,top:250}}><RiscBoard>{children}</RiscBoard></div><div style={{position:'absolute',left:108,top:860}}><Chip text={note}/></div></>;
const Candidates=({frame}:{frame:number})=>{const s=branchState(frame);const p=ramp(frame,24,65);return <Page frame={frame} title="One PC. Two candidates." copy={['A branch starts at 0x100.','Compute the fall-through and the target separately.']} note="RV32I · 32-bit instructions · byte offsets">
 <DataTokens tokens={[{label:'branch PC',value:T.hx(s.base),x:350,y:30}]}/>
 <path d="M440 125 L200 280 M440 125 L700 280" fill="none" stroke={COLORS.axis} strokeWidth={3}/>
 <DataTokens tokens={[{label:'+ 4 bytes',value:T.hx(s.base),x:350-240*p,y:125+100*p},{label:'+ 16 bytes',value:T.hx(s.base),x:350+240*p,y:125+100*p}]}/>
 {p===1&&<DataTokens tokens={[{label:'fall-through',value:T.hx(s.sequential),x:100,y:390},{label:'target',value:T.hx(s.target),x:590,y:390}]}/>}
 </Page>};
const Equal=({frame}:{frame:number})=>{const s=branchState(frame+180);return <Page frame={frame} title="Equality selects the target." copy={['BEQ compares the two register values.','The chosen input is 0x110; the PC has not changed yet.']} note="Target = branch PC + displacement">
 <RegisterBank values={[{index:1,value:s.a},{index:2,value:s.b}]} x={40} y={40} width={270} readIndices={[1,2]}/>
 <text x={420} y={115} fill={COLORS.textStrong} fontSize={40}>{s.a} = {s.b}</text>
 <DataTokens tokens={[{label:'fall-through',value:T.hx(s.sequential),x:40,y:300},{label:'target',value:T.hx(s.target),x:355,y:300}]}/>
 {s.selected!==null&&<DataTokens tokens={[{label:'selected next PC',value:T.hx(s.selected),x:675,y:300,color:COLORS.result,width:240}]}/>}
 <DataTokens tokens={[{label:'PC still holds',value:T.hx(s.pc),x:660,y:50,width:250}]}/>
 </Page>};
const Taken=({frame}:{frame:number})=>{const s=branchState(frame+390);return <Page frame={frame} title="Install the selected address." copy={['Copy the selected target into the PC.','The next fetch skips 0x104 and 0x108.']} note="A branch has no architectural delay slot">
 <DataTokens tokens={[{label:'PC',value:T.hx(s.pc),x:40,y:60,width:250},{label:'selected input',value:T.hx(s.target),x:40+300*s.travel,y:270-100*s.travel,width:220}]}/>
 <MemoryWords words={[0x100,0x104,0x108,0x110].map(a=>({address:T.hx(a),value:a===s.pc?'FETCH':''}))} selectedAddress={T.hx(s.pc)} x={590} y={50} width={330} rowHeight={95}/>
 <path d={`M550 ${95+s.cursorRow*95} L578 ${95+s.cursorRow*95}`} stroke={COLORS.result} strokeWidth={8}/>
 </Page>};
const Unequal=({frame}:{frame:number})=>{const s=branchState(frame+570);return <Page frame={frame} title="Replay with unequal values." copy={['Reset the same branch to 0x100.','Now 7 ≠ 9: select the next instruction.']} note="Not taken → PC + 4">
 <RegisterBank values={[{index:1,value:s.a},{index:2,value:s.b}]} x={40} y={50} width={270} readIndices={[1,2]}/>
 <text x={420} y={120} fill={COLORS.warn} fontSize={40}>7 ≠ 9</text>
 <DataTokens tokens={[{label:'PC',value:T.hx(s.pc),x:660,y:50,width:250},{label:'fall-through input',value:T.hx(s.sequential),x:60+530*s.travel,y:330-130*s.travel,width:250}]}/>
 <MemoryWords words={[0x100,0x104,0x110].map(a=>({address:T.hx(a),value:a===s.pc?'FETCH':''}))} selectedAddress={T.hx(s.pc)} x={570} y={345} width={350}/>
 </Page>};
const Compare=({frame}:{frame:number})=>{const yes=branchState(450),no=branchState(690);return <Page frame={frame} title="The condition chooses the PC." copy={['Both candidates use the original branch address.','Only the chosen address becomes the next PC.']} note="Never add the branch offset to PC + 4">
 <text x={60} y={55} fill={COLORS.textStrong} fontSize={34}>7 = 7 · taken</text><DataTokens tokens={[{label:'branch PC',value:T.hx(T.base),x:60,y:120},{label:'next PC',value:T.hx(yes.pc),x:610,y:120}]}/>
 <path d="M300 158 H565" stroke={COLORS.result} strokeWidth={5}/>
 <text x={60} y={330} fill={COLORS.textStrong} fontSize={34}>7 ≠ 9 · not taken</text><DataTokens tokens={[{label:'branch PC',value:T.hx(T.base),x:60,y:390},{label:'next PC',value:T.hx(no.pc),x:610,y:390}]}/>
 <path d="M300 425 H565" stroke={COLORS.primary} strokeWidth={5}/>
 </Page>};
export const SCENES=[{id:'candidates',Comp:Candidates,dur:180},{id:'equal',Comp:Equal,dur:210},{id:'taken',Comp:Taken,dur:180},{id:'unequal',Comp:Unequal,dur:210},{id:'compare',Comp:Compare,dur:120}];
