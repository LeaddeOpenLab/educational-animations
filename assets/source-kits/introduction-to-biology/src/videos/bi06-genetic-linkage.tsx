import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {ChromosomePair, LinkageMap} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={recombinants:20,total:100, rf:()=>20/100, crossing:(f:number)=>ramp(f,20,130), loci:[{at:.25,label:'A'},{at:.75,label:'B'}]};
const DESIGN_AUDIT={
 visualArgument:'Genes on the same chromosome tend to travel together; a physical crossing-over swaps the distal alleles and makes rare recombinant types.',
 motion:'Colored chromatid tips change owners at a chiasma, allele pairs change from AB/ab to Ab/aB, and the counted fraction maps to 20 cM.',
 example:'20 recombinants among 100 scored offspring imply 20% recombination frequency and an approximate 20 cM map distance.',
 antiTemplate:'Unlike meiosis, which separates whole chromosomes twice, this lesson exchanges distal segments and then counts recombinant allele combinations.',
 sceneRationale:'Four scenes are necessary to show original linkage, the exchange operation, observable recombinant products, and the frequency calculation; a chiasma icon alone is insufficient.',
};
const Linkage:React.FC<{frame:number;part:number}>=({frame,part})=>{
 const x=T.crossing(frame), exchanged=part<2?x:1;
 const title=['A and B travel together','Crossing-over swaps a segment','Recombinant alleles appear','Distance from recombination'][part];
 const lines=[['AB and ab are the parental combinations.','Both loci sit on the same chromosome.'],['Homologs pair and break between A and B.','Distal segments trade places.'],['The exchange creates Ab and aB.','These are recombinant chromatids.'],['Count recombinant offspring.','The fraction estimates map distance.']][part];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="GENETIC LINKAGE · CROSSING OVER" frame={frame} top={0} left={0}/><Heading text={title} frame={frame} top={48} left={0} width={1600}/></>}
 body={<SplitBody ratio={0.35} left={<Lines frame={frame} items={lines} top={0} left={0} width={525} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="exchanged distal alleles" viewBox="0 0 910 350" width="100%" height="330"><ChromosomePair cx={440} cy={100} len={680} chiasma={.5} exchange={exchanged} loci={T.loci} maternalLoci={['A','B']} paternalLoci={['a','b']} maternal={COLORS.primary} paternal={COLORS.alt}/>
 {part===2?<><text x="250" y="245" fill={COLORS.primary} fontSize="40" fontWeight="700">A b</text><text x="580" y="245" fill={COLORS.alt} fontSize="40" fontWeight="700">a B</text></>:null}
 {part===3?<LinkageMap x={230} y={230} w={450} loci={[{cM:0,label:'A'},{cM:T.rf()*100,label:'B'}]} highlight={[0,1]} rf={T.rf()}/>:null}</svg>}/>}
 foot={<Chip text={part===3?`RF = ${T.recombinants}/${T.total} = ${(T.rf()*100).toFixed(0)}% ≈ ${(T.rf()*100).toFixed(0)} cM`:'parental AB, ab → recombinants Ab, aB'} color={part===3?COLORS.result:COLORS.primary}/>}/>;
};
const Linked:React.FC<{frame:number}>=({frame})=><Linkage frame={frame} part={0}/>;
const Cross:React.FC<{frame:number}>=({frame})=><Linkage frame={frame} part={1}/>;
const Products:React.FC<{frame:number}>=({frame})=><Linkage frame={frame} part={2}/>;
const Map:React.FC<{frame:number}>=({frame})=><Linkage frame={frame} part={3}/>;
export const SCENES:SceneDef[]=[
{id:'parental-linkage',Comp:Linked,dur:200},
{id:'segment-exchange',Comp:Cross,dur:250},
{id:'recombinant-products',Comp:Products,dur:210},
{id:'map-distance',Comp:Map,dur:240},
];
void DESIGN_AUDIT;
