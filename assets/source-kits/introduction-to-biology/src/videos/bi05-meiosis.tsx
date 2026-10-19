import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {ChromosomePair} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={pairCount:1,productCount:4, separation:(f:number)=>ramp(f,18,130),chromatidOffset:(f:number)=>100*ramp(f,18,120)};
const DESIGN_AUDIT={
 visualArgument:'Two homologs separate in the first division, while each replicated chromosome keeps its sisters until the second division.',
 motion:'The colored homologous pair moves to opposite poles, then four chromatids occupy four bounded daughter cells.',
 example:'One illustrative homologous pair produces four cells with one chromosome copy each.',
 antiTemplate:'Unlike genetic linkage next, the motion tracks whole chromosomes and two successive divisions, not allele exchange or map distance.',
 sceneRationale:'Four scenes preserve the two distinct separation events plus starting paired state and four-cell outcome; omitting the middle event would misteach meiosis II.',
};
const Division:React.FC<{frame:number;phase:number}>=({frame,phase})=>{
 const p=T.separation(frame); const y=phase===0?150:phase===1?150:135;
 const heads=['Paired homologs','Meiosis I: homologs separate','Meiosis II: sisters separate','Four haploid cells'];
 const copy=[['Each homolog has two sister chromatids.','The pair carries corresponding genes.'],['Maternal and paternal homologs move apart.','Sisters remain joined at their centromeres.'],['Each chromosome splits its sister chromatids.','Two divisions follow one DNA replication.'],['Four products carry one copy of the pair.','Chromosome number has been halved.']][phase];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="MEIOSIS · TWO DIVISIONS" frame={frame} top={0} left={0}/><Heading text={heads[phase]} frame={frame} top={48} left={0} width={1500}/></>}
 body={<SplitBody ratio={0.34} left={<Lines frame={frame} items={copy} top={0} left={0} width={510} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="homolog and sister separation" viewBox="0 0 900 340" width="100%" height="330">
 {phase<2?<><ellipse cx="455" cy="165" rx="395" ry="145" fill="none" stroke={COLORS.axis} strokeWidth="3"/><ChromosomePair cx={455} cy={y} len={340} separation={phase===0?0:p} maternal={COLORS.primary} paternal={COLORS.alt}/></>:null}
 {phase===2?[-1,1].map((side,i)=><g key={i}><ellipse cx={455+side*220} cy="160" rx="180" ry="132" fill="none" stroke={COLORS.axis} strokeWidth="3"/>{[-1,1].map((s,j)=><line key={j} x1={455+side*220+s*T.chromatidOffset(frame)} y1="72" x2={455+side*220+s*T.chromatidOffset(frame)} y2="240" stroke={i?COLORS.alt:COLORS.primary} strokeWidth="14" strokeLinecap="round"/>)}</g>):null}
 {phase===3?[-1,1].flatMap((col)=>[-1,1].map((row)=><g key={`${col}-${row}`}><circle cx={455+col*230} cy={165+row*90} r="73" fill="none" stroke={COLORS.result} strokeWidth="3"/><line x1={455+col*230} y1={125+row*90} x2={455+col*230} y2={205+row*90} stroke={col<0?COLORS.primary:COLORS.alt} strokeWidth="12" strokeLinecap="round"/></g>)):null}</svg>}/>}
 foot={<Chip text={phase===3?`${T.productCount} haploid products · one copy each`:phase<2?'division I separates homologs':'division II separates sister chromatids'} color={phase===3?COLORS.result:COLORS.primary}/>}/>;
};
const Pair:React.FC<{frame:number}>=({frame})=><Division frame={frame} phase={0}/>;
const First:React.FC<{frame:number}>=({frame})=><Division frame={frame} phase={1}/>;
const Second:React.FC<{frame:number}>=({frame})=><Division frame={frame} phase={2}/>;
const Four:React.FC<{frame:number}>=({frame})=><Division frame={frame} phase={3}/>;
export const SCENES:SceneDef[]=[
{id:'paired-homologs',Comp:Pair,dur:195},
{id:'first-division',Comp:First,dur:235},
{id:'second-division',Comp:Second,dur:245},
{id:'four-products',Comp:Four,dur:225},
];
void DESIGN_AUDIT;
