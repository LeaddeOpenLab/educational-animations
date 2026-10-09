import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines,Chip} from '../components/ui';
import {RiscBoard,DataTokens,PipelineLanes,RegisterBank} from '../components/RiscV';
import {COLORS,ramp} from '../theme';
import {forwardState} from '../mechanisms/rv09-state';
const T={producer:7+5,subtrahend:10,mask:15,binary:(v:number)=>v.toString(2).padStart(4,'0')};
const DESIGN_AUDIT={visualArgument:'A producer result12 replaces stale operand0 in two consumers before x5 changes in the register file.',motion:'Instructions advance normally; the carried12 takes the near then older bypass route, updates operand cells, and produces2 and3.',example:'ADD gives12; dependent SUB12−10 gives2; later XOR12 XOR15 gives3.',antiTemplate:'Unlike the following load-use stall, all three instructions advance without a bubble because the ALU value is already ready.',sceneRationale:'Four scenes establish the stale value, demonstrate EX/MEM replacement, demonstrate the older MEM/WB route with a different operation, and reconcile early operands with eventual writes.'};
const Canvas=({frame,title,copy,children,tag}:{frame:number;title:string;copy:string[];children:React.ReactNode;tag:string})=><><Backdrop width={1920} height={1080}/><Kicker text="RISC-V · Forwarding" frame={frame}/><Heading text={title} frame={frame} width={650} size={50}/><Lines items={copy} frame={frame} top={345} width={615} size={30}/><div style={{position:'absolute',left:850,top:250}}><RiscBoard>{children}</RiscBoard></div><div style={{position:'absolute',left:108,top:860}}><Chip text={tag}/></div></>;
const Dependency=({frame}:{frame:number})=>{const s=forwardState(frame);return <Canvas frame={frame} title="The newest value is in flight." copy={['ADD x5, x1, x2 computes 7 + 5.','The next SUB and XOR need x5; the register still holds 0.']} tag="Illustrative five-stage pipeline with forwarding">
 <PipelineLanes instructions={s.instructions} y={65} rowHeight={74}/>
 <DataTokens tokens={[{label:'architectural x5',value:s.registers[0].value,x:40,y:480,width:280},{label:'new ALU result',value:frame>=120?s.producer:'7 + 5',x:600,y:480,width:280}]}/>
 </Canvas>};
const NearBypass=({frame}:{frame:number})=>{const s=forwardState(frame+180);return <Canvas frame={frame} title="Forward from EX/MEM to EX." copy={['The matching destination tag selects the new value.','Replace the stale operand before subtracting 10.']} tag="x5 is still 0 · EX receives 12">
 <PipelineLanes instructions={s.instructions} y={60} rowHeight={68}/>
 <path d="M670 325 V405 H455 V325" fill="none" stroke={COLORS.accent} strokeWidth={4}/>
 <DataTokens tokens={[{label:'forwarded payload',value:s.producer,x:610-225*s.nearTravel,y:340,width:180}]}/>
 <text x={45} y={525} fill={COLORS.textStrong} fontSize={35}>EX: {s.nearOperand} − {T.subtrahend} = {s.nearResult??'?'}</text>
 <text x={580} y={525} fill={COLORS.textMuted} fontSize={30}>Register x5 = {s.registers[0].value}</text>
 </Canvas>};
const FarBypass=({frame}:{frame:number})=>{const s=forwardState(frame+420);return <Canvas frame={frame} title="An older result takes another path." copy={['The producer reaches MEM/WB as XOR reaches EX.','The same carried 12 replaces its stale operand.']} tag="MEM/WB → EX · no waiting for register writeback">
 <PipelineLanes instructions={s.instructions} y={60} rowHeight={68}/>
 <path d="M835 325 V405 H455 V325" fill="none" stroke={COLORS.result} strokeWidth={4}/>
 <DataTokens tokens={[{label:'MEM/WB payload',value:s.producer,x:760-365*s.farTravel,y:335,width:170}]}/>
 <text x={65} y={510} fill={COLORS.textStrong} fontSize={32}>{T.binary(s.farOperand)} XOR {T.binary(T.mask)} = {s.farResult===null?'????':T.binary(s.farResult)}</text>
 <text x={235} y={565} fill={COLORS.result} fontSize={29}>{s.farOperand} XOR 15 = {s.farResult??'?'}</text>
 </Canvas>};
const CommitResults=({frame}:{frame:number})=>{const s=forwardState(frame+690),p=ramp(frame,20,65);return <Canvas frame={frame} title="Writeback still finishes the work." copy={['Forwarding supplied the operands early.','Normal writeback commits each result to its destination.']} tag="Final registers: x5 = 12 · x6 = 2 · x7 = 3">
 <RegisterBank values={s.registers} x={550} y={65} width={350} rowHeight={120}/>
 <DataTokens tokens={[{label:'ADD result → x5',value:s.producer,x:40+Math.min(p,.65)*150,y:65,width:270},{label:'SUB result → x6',value:s.nearResult??'',x:40+Math.min(p,.65)*150,y:220,width:270},{label:'XOR result → x7',value:s.farResult??'',x:40+Math.min(p,.65)*150,y:375,width:270}]}/>
 <text x={180} y={555} fill={COLORS.textMuted} fontSize={30}>No bubble was inserted.</text>
 </Canvas>};
export const SCENES=[{id:'dependency',Comp:Dependency,dur:180},{id:'near-bypass',Comp:NearBypass,dur:240},{id:'far-bypass',Comp:FarBypass,dur:270},{id:'commit-results',Comp:CommitResults,dur:210}];
