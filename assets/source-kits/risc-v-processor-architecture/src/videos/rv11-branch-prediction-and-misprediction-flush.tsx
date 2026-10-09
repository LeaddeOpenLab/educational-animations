import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Caption} from '../components/ui';
import {RiscBoard,BitFields,RegisterBank,DataTokens,PipelineLanes,AddressParts,MemoryWords} from '../components/RiscV';
import {COLORS,FONT,fadeIn,ramp} from '../theme';
import type {SceneDef} from '../Video';
import {rv11State} from '../mechanisms/rv11-state';
const T = {"branch": 256, "target": 272, "wrongValue": 99, "correctValue": 42};
const DESIGN_AUDIT = {visualArgument: "Two wrong-path instruction cards and their write payloads are physically discarded while committed cells remain unchanged; a fresh target card later writes 42.", motion: "Stage progression, simultaneous younger-entry invalidation, discarded payload removal, target refill and single writeback.", example: "BEQ at 0x100 compares 4 and 4, cancelling addi 99 and a store before target addi 42 commits.", antiTemplate: "Unlike data forwarding or stalls, this scene deletes instruction identities and payloads rather than delaying or rerouting a retained instruction.", sceneRationale: "Five scenes separate speculative fetch, branch resolution, actual discard, refill, and allowed writeback; merging discard with writeback would hide preservation of committed state."};
const BranchStage=({frame,global,heading,copy,mode}:{frame:number;global:number;heading:string;copy:string[];mode:number})=>{
 const s=rv11State(global);const compare=ramp(global,180,60);const payload=ramp(global,735,45);
 return <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}><Backdrop width={1920} height={1080}/>
 <Kicker text="RISC-V · BRANCH RECOVERY" frame={frame}/><Heading text={heading} frame={frame} width={650} size={50}/>
 <Lines items={copy} frame={frame} start={24} step={12} top={345} width={615} size={30}/>
 <Caption text="Illustrative five-stage pipeline · EX resolves the branch" frame={frame} start={48} top={900} width={1650} size={25}/>
 <div style={{position:'absolute',left:850,top:250,opacity:fadeIn(frame,12)}}><RiscBoard>
 <PipelineLanes instructions={s.instructions} x={35} y={60} rowHeight={78}/>
 <RegisterBank values={[{index:5,value:s.x5}]} x={40} y={485} width={245}/>
 <MemoryWords words={[{address:'RAM 0x200',value:s.memory200}]} x={325} y={485} width={290}/>
 <DataTokens tokens={[{label:'Fetch PC',value:'0x'+s.fetchPc.toString(16),x:670,y:485}]}/>
 {mode===0&&<DataTokens tokens={[{label:'Target waits',value:'0x110',x:645,y:355}]}/>}
 {mode===1&&<g><DataTokens tokens={[{label:'x1',value:4,x:75+170*compare,y:340},{label:'x2',value:4,x:675-170*compare,y:340}]}/><text x={465} y={388} textAnchor="middle" fill={COLORS.result} fontSize={36}>=</text><text x={475} y={460} textAnchor="middle" fill={COLORS.textStrong} fontSize={26}>0x100 + 0x10 = 0x110</text></g>}
 {mode===2&&<g><path d="M600 310 H895 V435 H600 Z" stroke={COLORS.warn} strokeWidth={2} fill="none"/>{s.discardedPayloadVisible&&<DataTokens tokens={[{label:'A / W payloads',value:99,x:Math.min(720,s.discardX),y:350,width:145}]}/>}</g>}
 {mode===3&&<g><text x={475} y={425} fill={COLORS.result} textAnchor="middle" fontSize={30}>Correct target: 0x110</text><text x={475} y={460} fill={COLORS.textMuted} textAnchor="middle" fontSize={23}>The empty slots are recovery work.</text></g>}
 {mode===4&&<g><DataTokens tokens={[{label:'Correct result',value:42,x:700-660*payload,y:350+65*payload}]}/><text x={475} y={330} fill={COLORS.result} textAnchor="middle" fontSize={30}>Only T may write x5</text></g>}
 </RiscBoard></div></div>;
};
const Predict=({frame}:{frame:number})=><BranchStage frame={frame} global={frame} mode={0} heading="Predict before knowing" copy={['BEQ at 0x100 compares x1 and x2.','Guess not taken: fetch 0x104.','ADDI 99 and STORE 99 enter behind it.']}/>;
const Resolve=({frame}:{frame:number})=><BranchStage frame={frame} global={frame+150} mode={1} heading="Resolve the real path" copy={['4 = 4, so BEQ is taken.','Actual target is 0x110.','Predicted next PC was 0x104.']}/>;
const Flush=({frame}:{frame:number})=><BranchStage frame={frame} global={frame+330} mode={2} heading="Remove the wrong work" copy={['Invalidate both younger instructions.','Discard their pending writes.','x5 stays 7; RAM stays 0.']}/>;
const Redirect=({frame}:{frame:number})=><BranchStage frame={frame} global={frame+540} mode={3} heading="Fetch the correct target" copy={['PC redirects to 0x110.','Target ADDI 42 enters the empty pipeline.','Wrong-path instructions stay absent.']}/>;
const Commit=({frame}:{frame:number})=><BranchStage frame={frame} global={frame+720} mode={4} heading="Commit only the right result" copy={['The target reaches writeback.','x5 changes from 7 to 42.','The discarded store never changes RAM.']}/>;
export const SCENES:SceneDef[]=[{id:'predict',Comp:Predict,dur:150},{id:'resolve',Comp:Resolve,dur:180},{id:'flush',Comp:Flush,dur:210},{id:'redirect',Comp:Redirect,dur:180},{id:'commit',Comp:Commit,dur:180}];
