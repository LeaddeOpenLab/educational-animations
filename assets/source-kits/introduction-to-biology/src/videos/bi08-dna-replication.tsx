import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {DnaHelix} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={fork:(f:number)=>ramp(f,18,140), daughters:2, oldPerDaughter:1,newPerDaughter:1};
const DESIGN_AUDIT={
 visualArgument:'The two original DNA strands become separate templates and each gains a complementary new partner.',
 motion:'A closed helix opens into a fork, green leading strand extends continuously while orange lagging fragments appear, then two mixed old/new duplexes stand side by side.',
 example:'An original double helix yields two double helices, each with exactly one parental and one newly synthesized strand.',
 antiTemplate:'Unlike transcription, this produces double-stranded DNA on both templates and highlights leading versus lagging synthesis rather than an mRNA transcript.',
 sceneRationale:'A closed duplex, opening fork, complementary synthesis, and semi-conservative product require four scenes; showing only fork opening would not prove the inheritance rule.',
};
const Replicate:React.FC<{frame:number;stage:number}>=({frame,stage})=>{
 const rep=stage===0?0:stage===1?T.fork(frame):1;
 const names=['One parental double helix','The strands separate','Each old strand is a template','Two semi-conservative products'];
 const copy=[['Two complementary strands are paired.','The sequence can be copied.'],['Helicase opens a replication fork.','Each parental strand is exposed.'],['New DNA is built 5′→3′.','Leading is continuous; lagging uses fragments.'],['Each daughter keeps one original strand.','A new strand completes each double helix.']][stage];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="DNA REPLICATION · SEMI-CONSERVATIVE" frame={frame} top={0} left={0}/><Heading text={names[stage]} frame={frame} top={48} left={0} width={1600}/></>}
 body={<SplitBody ratio={0.34} left={<Lines frame={frame} items={copy} top={0} left={0} width={510} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="replication fork and old new strands" viewBox="0 0 900 350" width="100%" height="330">
 {stage<3?<DnaHelix x={70} y={175} w={760} amp={35} turns={2.5} replication={rep} synthesis={stage===2} progress={Math.max(.25,T.fork(frame))}/>:null}
 {stage===3? [0,1].map((i)=><g key={i} transform={`translate(${i*420},0)`}><path d="M 70 115 Q 180 200 300 115" fill="none" stroke={i?COLORS.alt:COLORS.primary} strokeWidth="10"/><path d="M 70 200 Q 180 115 300 200" fill="none" stroke={COLORS.result} strokeWidth="10"/><text x="80" y="280" fill={COLORS.textMuted} fontSize="25">old + new</text></g>):null}</svg>}/>}
 foot={<Chip text={stage===3?`${T.daughters} daughter DNAs · ${T.oldPerDaughter} old + ${T.newPerDaughter} new strand each`:'base pairing guides synthesis of a complementary strand'} color={stage===3?COLORS.result:COLORS.primary}/>}/>;
};
const Parent:React.FC<{frame:number}>=({frame})=><Replicate frame={frame} stage={0}/>;
const Fork:React.FC<{frame:number}>=({frame})=><Replicate frame={frame} stage={1}/>;
const Synthesis:React.FC<{frame:number}>=({frame})=><Replicate frame={frame} stage={2}/>;
const Daughters:React.FC<{frame:number}>=({frame})=><Replicate frame={frame} stage={3}/>;
export const SCENES:SceneDef[]=[
{id:'parent-duplex',Comp:Parent,dur:185},
{id:'fork-opens',Comp:Fork,dur:240},
{id:'new-strands',Comp:Synthesis,dur:255},
{id:'two-daughters',Comp:Daughters,dur:220},
];
void DESIGN_AUDIT;
