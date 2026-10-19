import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {ProteinLevels} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T = {
  aminoAcids: 26,
  level: (step: number): 1|2|3|4 => Math.min(4, step+1) as 1|2|3|4,
  fold: (frame: number) => ramp(frame, 12, 95),
  names: ['primary sequence','secondary motifs','tertiary fold','quaternary assembly'],
};
const DESIGN_AUDIT = {
  visualArgument: 'One sequence remains visible while its organisation gains local motifs, a full fold, and then multiple subunits.',
  motion: 'The helix draws over residues, the chain folds into one body, and four bodies assemble without changing the underlying sequence.',
  example: 'A 26-residue illustrative chain is traced through four nested structural levels.',
  antiTemplate: 'Unlike enzyme kinetics next door, this graphic transforms spatial organisation rather than moving a point on a quantitative curve.',
  sceneRationale: 'Four scenes are needed because each of the four protein structure levels introduces a distinct scale; merging folds and assembly would confuse one chain with multiple chains.',
};
const Structure: React.FC<{frame:number; step:number}> = ({frame,step}) => {
  const level=T.level(step);
  const copy=[
    ['Amino-acid order is the starting information.','Peptide bonds hold the sequence.'],
    ['Local hydrogen bonds stabilize helices and sheets.','The sequence is still the same chain.'],
    ['Side-chain interactions fold one chain in space.','A functional shape emerges.'],
    ['Several folded chains can assemble.','One complex, multiple subunits.'],
  ][step];
  return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text={`0${step+1} · PROTEIN STRUCTURE`} frame={frame} top={0} left={0}/><Heading text={T.names[step]} frame={frame} top={48} left={0} width={1600}/></>}
    body={<SplitBody ratio={0.34} left={<Lines frame={frame} items={copy} top={0} left={0} width={500} size={29} bullet={false}/>}
      right={<svg data-k="shape" data-n="protein structure levels" viewBox="0 0 1000 440" width="100%" height="340"><ProteinLevels x={35} y={34} w={900} residues={T.aminoAcids} level={level} progress={Math.max(.1,T.fold(frame))}/></svg>}/>}
    foot={<Chip text={`${level} of ${T.names.length} structural levels`} color={step===3?COLORS.result:COLORS.primary}/>}/>;
};
const Primary:React.FC<{frame:number}>=({frame})=><Structure frame={frame} step={0}/>;
const Secondary:React.FC<{frame:number}>=({frame})=><Structure frame={frame} step={1}/>;
const Tertiary:React.FC<{frame:number}>=({frame})=><Structure frame={frame} step={2}/>;
const Quaternary:React.FC<{frame:number}>=({frame})=><Structure frame={frame} step={3}/>;
export const SCENES:SceneDef[]=[
  {id:'sequence',Comp:Primary,dur:195},
  {id:'local-folds',Comp:Secondary,dur:215},
  {id:'chain-fold',Comp:Tertiary,dur:235},
  {id:'subunit-assembly',Comp:Quaternary,dur:255},
];
void DESIGN_AUDIT;
