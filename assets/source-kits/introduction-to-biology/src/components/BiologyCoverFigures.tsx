import React from 'react';
import {COLORS, FONT} from '../theme';
import {Axes} from './Plot';
import {ProteinLevels, EnzymeKinetics, Membrane, IonGradient, ChromosomePair, LinkageMap, Punnett, DnaHelix, CodonFlow, SignalingCascade, FeedbackLoop} from './Bio';

const Frame: React.FC<{children: React.ReactNode}> = ({children}) => <svg width={640} height={620} viewBox="0 0 640 620">{children}</svg>;
const label=(x:number,y:number,s:string,color=COLORS.textStrong)=><text x={x} y={y} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">{s}</text>;

export const BiologyCoverFigures: Record<string, React.FC> = {
  'bi01-protein-structure': () => <Frame><ProteinLevels x={70} y={100} w={500} level={4} progress={1}/></Frame>,
  'bi02-enzyme-kinetics': () => <Frame><g transform="translate(13 100)"><Axes width={550} height={420} xDomain={[0,10]} yDomain={[0,11]} xLabel="[S]" yLabel="v" xTicks={[0,2,4,6,8,10]} yTicks={[0,5,10]}>{s=><EnzymeKinetics s={s} Vmax={10} Km={2} substrate={8} progress={1}/>}</Axes></g></Frame>,
  'bi03-cell-membrane-transport': () => <Frame><Membrane x={62} y={310} w={510} outside={1} inside={0.25} transporters={[{kind:'channel',at:0.35,label:'channel'},{kind:'pump',at:0.72,label:'ATP pump',atp:true}]} cargo={{at:0.35,direction:'in',progress:0.8}} progress={1}/></Frame>,
  'bi04-electrochemical-gradient': () => <Frame><IonGradient x={50} y={110} w={540} h={395} out={5} in_={140} showPotential progress={1}/>{label(320,552,'chemical out  ↔  electrical in',COLORS.result)}</Frame>,
  'bi05-meiosis': () => <Frame><g transform="translate(0 -12)"><ChromosomePair cx={320} cy={245} len={430} separation={0.45} progress={1}/><path d="M 320 375 v 50 M 320 425 l -120 48 M 320 425 l 120 48 M 200 473 l -35 30 M 200 473 l 35 30 M 440 473 l -35 30 M 440 473 l 35 30" stroke={COLORS.result} strokeWidth={5} fill="none"/>{[165,235,405,475].map(x=><g key={x}><circle cx={x} cy={530} r={28} fill="none" stroke={COLORS.result} strokeWidth={3}/><circle cx={x} cy={530} r={8} fill={x<320?COLORS.primary:COLORS.alt}/></g>)}</g></Frame>,
  'bi06-genetic-linkage': () => <Frame><g transform="translate(0 -6)"><ChromosomePair cx={320} cy={210} len={430} chiasma={0.55} exchange={1} maternalLoci={['A','B']} paternalLoci={['a','b']} loci={[{at:.25,label:'A'},{at:.75,label:'B'}]} progress={1}/><LinkageMap x={95} y={440} w={420} loci={[{cM:0,label:'A'},{cM:20,label:'B'}]} highlight={[0,1]} rf={0.2} progress={1}/></g></Frame>,
  'bi07-genetic-probability': () => <Frame><g transform="translate(0 -6)"><Punnett x={85} y={82} cell={145} gam1={['A','a']} gam2={['A','a']} progress={1}/>{label(320,552,'AA : Aa : aa = 1 : 2 : 1',COLORS.result)}</g></Frame>,
  'bi08-dna-replication': () => <Frame><DnaHelix x={60} y={285} w={520} replication={1} synthesis progress={1}/>{label(320,526,'old strand + new strand',COLORS.result)}</Frame>,
  'bi09-transcribe': () => <Frame><DnaHelix x={92} y={155} w={460} amp={37} turns={3} progress={1}/><path d="M 320 224 v 92" stroke={COLORS.result} strokeWidth={5}/><polygon points="320,332 307,310 333,310" fill={COLORS.result}/><CodonFlow x={48} y={372} dna="TACGGACTT" mode="transcription" release={1} cell={38} progress={1}/></Frame>,
  'bi10-translate': () => <Frame>{label(320,120,'AUG  ·  CCU  ·  GAA',COLORS.accent)}<CodonFlow x={42} y={225} dna="TACGGACTT" mode="translation" codonTable={{AUG:'Met',CCU:'Pro',GAA:'Glu'}} cell={39} progress={1}/><path d="M 320 442 v 52" stroke={COLORS.result} strokeWidth={5}/><polygon points="320,511 307,487 333,487" fill={COLORS.result}/>{label(320,563,'Met — Pro — Glu',COLORS.result)}</Frame>,
  'bi11-signal-transduction': () => <Frame><g transform="translate(38 0)">{label(320,112,'ligand binds receptor',COLORS.accent)}<path d="M 320 135 v 95" stroke={COLORS.accent} strokeWidth={5}/><polygon points="320,246 307,222 333,222" fill={COLORS.accent}/><SignalingCascade x={82} y={326} steps={['R','K1','K2','K3']} gap={130} progress={1}/>{label(320,514,'phosphorylation → response',COLORS.result)}</g></Frame>,
  'bi12-negative-feedback-regulation': () => <Frame><FeedbackLoop cx={320} cy={310} r={175} nodes={['stimulus','sensor','effector','response']} value={0.55} setPoint={0.5} range={[0,1]} progress={1}/></Frame>,
};
