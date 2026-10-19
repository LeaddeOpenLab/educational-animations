import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {Punnett} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={gametes:['A','a'], outcomes:['AA','Aa','Aa','aa'], probability:(match:(g:string)=>boolean)=>['AA','Aa','Aa','aa'].filter(match).length/4, fill:(f:number)=>ramp(f,18,140)};
const DESIGN_AUDIT={
 visualArgument:'A square lists equally likely gametes on each axis, then combines them to turn possible genotypes into counted probabilities.',
 motion:'Each of four cells fills in row order; dominant-genotype cells light up before a ratio is calculated from the displayed count.',
 example:'Aa × Aa gives one AA, two Aa, one aa; the dominant phenotype probability is 3/4.',
 antiTemplate:'Unlike the linkage lesson, this one does not swap chromosome segments or estimate map distance; it enumerates possible gamete combinations.',
 sceneRationale:'Gamete generation, cell filling, genotype count, and phenotype probability are four reasoning steps; collapsing counting into the grid fill would make the 3/4 result seem arbitrary.',
};
const Chance:React.FC<{frame:number;stage:number}>=({frame,stage})=>{
 const progress=stage===0?0:stage===1?T.fill(frame):1;
 const headings=['Each parent makes two gametes','Combine gametes one cell at a time','Count the genotypes','Predict the phenotype'];
 const texts=[['Aa parent → A or a gamete.','Each gamete is equally likely.'],['Cross maternal and paternal choices.','The square lists four possible pairings.'],['One AA, two Aa, one aa.','These are genotype probabilities.'],['AA and Aa show the dominant trait.','Three of four pairings are dominant.']][stage];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="GENETIC PROBABILITY · Aa × Aa" frame={frame} top={0} left={0}/><Heading text={headings[stage]} frame={frame} top={48} left={0} width={1580}/></>}
 body={<SplitBody ratio={0.35} left={<Lines frame={frame} items={texts} top={0} left={0} width={525} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="Punnett square cells fill" viewBox="0 0 890 420" width="100%" height="330"><Punnett x={105} y={0} cell={135} gam1={T.gametes} gam2={T.gametes} progress={progress}/>
 {stage>=2?<><text x="590" y="130" fill={COLORS.result} fontSize="30">AA: {T.probability(g=>g==='AA')}</text><text x="590" y="205" fill={COLORS.primary} fontSize="30">Aa: {T.probability(g=>g==='Aa')}</text><text x="590" y="280" fill={COLORS.alt} fontSize="30">aa: {T.probability(g=>g==='aa')}</text></>:null}</svg>}/>}
 foot={<Chip text={stage===3?`P(dominant) = ${T.probability(g=>g!=='aa').toFixed(2)} = 3/4`:'probability = matching cells ÷ all equally likely cells'} color={stage===3?COLORS.result:COLORS.primary}/>}/>;
};
const Gametes:React.FC<{frame:number}>=({frame})=><Chance frame={frame} stage={0}/>;
const Grid:React.FC<{frame:number}>=({frame})=><Chance frame={frame} stage={1}/>;
const Genotypes:React.FC<{frame:number}>=({frame})=><Chance frame={frame} stage={2}/>;
const Phenotype:React.FC<{frame:number}>=({frame})=><Chance frame={frame} stage={3}/>;
export const SCENES:SceneDef[]=[
{id:'gametes',Comp:Gametes,dur:180},
{id:'square-fills',Comp:Grid,dur:260},
{id:'genotype-count',Comp:Genotypes,dur:215},
{id:'phenotype-chance',Comp:Phenotype,dur:245},
];
void DESIGN_AUDIT;
