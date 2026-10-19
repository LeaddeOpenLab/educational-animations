import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {CodonFlow} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={rna:['AUG','CCU','GAA'],amino:['Met','Pro','Glu'],dnaTemplate:'TACGGACTT',table:{AUG:'Met',CCU:'Pro',GAA:'Glu'},read:(f:number)=>ramp(f,18,150)};
const DESIGN_AUDIT={
 visualArgument:'A ribosome reads mRNA in codons, each codon recruits an amino acid, and peptide bonds make a growing chain.',
 motion:'The active codon frame moves AUG→CCU→GAA; Met, Pro, then Glu beads appear and join into one chain.',
 example:'mRNA AUG CCU GAA specifies the peptide Met–Pro–Glu.',
 antiTemplate:'Unlike transcription, translation consumes an existing mRNA codon sequence and grows a peptide rather than copying bases to new RNA.',
 sceneRationale:'An initial mRNA, first codon recognition, continuing elongation, and completed peptide need four scenes because the ribosome cursor and product are different objects.',
};
const Peptide:React.FC<{frame:number;beat:number}>=({frame,beat})=>{
 const read=beat===0?0:beat===1?Math.max(.34,T.read(frame)/3):beat===2?Math.max(.34,T.read(frame)):1;
 const n=Math.round(3*read);
 const title=['mRNA carries three codons','AUG recruits methionine','The ribosome advances','A peptide chain grows'];
 const copy=[['The ribosome reads mRNA in triplets.','Each codon has a defined meaning.'],['The first codon is AUG.','Met is added to the growing product.'],['CCU and GAA are read in order.','Pro and Glu are added next.'],['Peptide bonds connect the amino acids.','The product is a protein chain, not RNA.']][beat];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="TRANSLATION · mRNA → PEPTIDE" frame={frame} top={0} left={0}/><Heading text={title[beat]} frame={frame} top={48} left={0} width={1550}/></>}
 body={<SplitBody ratio={0.34} left={<Lines frame={frame} items={copy} top={0} left={0} width={510} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="ribosome reads codons and peptide grows" viewBox="0 0 900 340" width="100%" height="330"><CodonFlow x={25} y={65} dna={T.dnaTemplate} mode="translation" codonTable={T.table} progress={read} cell={51}/>
 {beat>0?<rect x={220+(Math.max(n,1)-1)*153} y={85} width="145" height="92" rx="30" fill="none" stroke={COLORS.accent} strokeWidth="6"/>:null}
 </svg>}/>}
 foot={<Chip text={beat===3?T.amino.join(' – '):`codon ${Math.max(n,1)} of ${T.rna.length}: ${T.rna[Math.max(n,1)-1]}`} color={beat===3?COLORS.result:COLORS.primary}/>}/>;
};
const Read:React.FC<{frame:number}>=({frame})=><Peptide frame={frame} beat={0}/>;
const Start:React.FC<{frame:number}>=({frame})=><Peptide frame={frame} beat={1}/>;
const Elongate:React.FC<{frame:number}>=({frame})=><Peptide frame={frame} beat={2}/>;
const Product:React.FC<{frame:number}>=({frame})=><Peptide frame={frame} beat={3}/>;
export const SCENES:SceneDef[]=[
{id:'mrna-codons',Comp:Read,dur:185},
{id:'start-codon',Comp:Start,dur:220},
{id:'elongation',Comp:Elongate,dur:285},
{id:'peptide-product',Comp:Product,dur:210},
];
void DESIGN_AUDIT;
