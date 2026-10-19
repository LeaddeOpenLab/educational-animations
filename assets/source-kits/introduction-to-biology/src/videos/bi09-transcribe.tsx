import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {CodonFlow} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={template:'TACGGACTT', rna:'AUGCCUGAA', prefix:(n:number)=>'AUGCCUGAA'.slice(0,n*3),cursor:(f:number)=>ramp(f,20,150)};
const DESIGN_AUDIT={
 visualArgument:'RNA polymerase reads one DNA template and builds a complementary RNA sequence; the RNA appears while the DNA stays as a template.',
 motion:'Polymerase cursor advances over TAC, GGA, CTT; matching RNA codons AUG, CCU, GAA are added sequentially, then the mRNA moves away.',
 example:'DNA template TAC GGA CTT is transcribed as mRNA AUG CCU GAA using U in RNA.',
 antiTemplate:'Unlike translation next, this process creates an RNA strand, never amino-acid beads or a peptide chain.',
 sceneRationale:'The template, complementary base-pairing, extension, and released transcript need four scenes; without a separate final mRNA, synthesis could be mistaken for DNA copying.',
};
const RNA:React.FC<{frame:number;part:number}>=({frame,part})=>{
 const progress=part===0?0:part===1?Math.max(.34,T.cursor(frame)*.65):part===2?Math.max(.34,T.cursor(frame)):1;
 const labels=['DNA template is read','RNA bases pair with DNA','The RNA strand extends','mRNA is released'];
 const copy=[['RNA polymerase uses one DNA strand.','The DNA bases are the template.'],['T pairs with A; A pairs with U.','C and G pair with each other.'],['The enzyme advances along the template.','New RNA bases join the growing strand.'],['The result is single-stranded mRNA.','The DNA template is retained.']][part];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="TRANSCRIPTION · DNA → RNA" frame={frame} top={0} left={0}/><Heading text={labels[part]} frame={frame} top={48} left={0} width={1600}/></>}
 body={<SplitBody ratio={0.33} left={<Lines frame={frame} items={copy} top={0} left={0} width={495} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="growing complementary RNA transcript" viewBox="0 0 910 340" width="100%" height="330"><CodonFlow x={30} y={80} dna={T.template} mode="transcription" progress={progress} release={part===3?ramp(frame,15,120):0} cell={53}/>
 {part>=1?<rect x={220+Math.round(progress*3-1)*159} y={15} width={95} height={45} rx={18} fill={COLORS.accent}/>:null}{part>=1?<text x={220+Math.round(progress*3-1)*159+8} y={45} fill={COLORS.bg0} fontSize="21">RNA pol</text>:null}
 </svg>}/>}
 foot={<Chip text={part===3?`DNA ${T.template} → RNA ${T.rna}`:'RNA uses U where DNA uses T'} color={part===3?COLORS.result:COLORS.primary}/>}/>;
};
const Template:React.FC<{frame:number}>=({frame})=><RNA frame={frame} part={0}/>;
const Pair:React.FC<{frame:number}>=({frame})=><RNA frame={frame} part={1}/>;
const Extend:React.FC<{frame:number}>=({frame})=><RNA frame={frame} part={2}/>;
const Release:React.FC<{frame:number}>=({frame})=><RNA frame={frame} part={3}/>;
export const SCENES:SceneDef[]=[
{id:'dna-template',Comp:Template,dur:170},
{id:'rna-pairing',Comp:Pair,dur:250},
{id:'transcript-extends',Comp:Extend,dur:265},
{id:'mrna-product',Comp:Release,dur:215},
];
void DESIGN_AUDIT;
