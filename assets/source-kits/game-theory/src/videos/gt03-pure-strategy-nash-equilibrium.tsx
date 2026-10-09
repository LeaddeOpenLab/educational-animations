import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt03-pure-strategy-nash-equilibrium.state';

const T = { ...{"rows": ["Cooperate", "Defect"], "cols": ["Cooperate", "Defect"], "payoffs": [[[3, 3], [0, 5]], [[5, 0], [1, 1]]], "nash": [1, 1]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "At the chosen cell, independently compare each player's alternative while the other action stays fixed.",
  motion: "Two sets of marks intersect in one cell; deviations from that cell reduce the deviator's own payoff.",
  example: "Two firms choose Advertise or Stay Quiet; each receives the two payoffs in a cell.",
  antiTemplate: "This topic uses PayoffMatrix + bestResponses + nashCells to show Hold each rival action fixed while computing one player's best response, then switch players.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 5 scenes separate No best responses marked. from Hold each rival action fixed while computing one player's best response, then switch players. and end with At the chosen cell, independently compare each player's alternative while the other action stays fixed.",
};
void DESIGN_AUDIT;


const BEATS = ["Define cell payoffs", "Mark A's best response in each column", "Mark B's best response in each row", "Reveal the intersection", "Try both unilateral deviations"];
const COPY = ["Locate a pure Nash equilibrium as mutual best responses, not a global maximum.", "Best for A given B", "Best for B given A", "Neither wants to move alone", "At the chosen cell, independently compare each player's alternative while the other action stays fixed."];
const TOPIC = "Pure strategy Nash equilibrium";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 850 620" width="100%" height="100%"><PayoffMatrix x={160} y={130} cellW={280} cellH={150} rowLabels={['Cooperate','Defect']} colLabels={['Cooperate','Defect']} payoffs={s.payoffs} showBest={s.showRowBest&&s.showColBest} showNash={s.showNash}/><text x={160} y={580}>{s.nashCell?`Mutual best response ${s.nashCell}`:'Mark best responses'}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={360} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={570} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={4}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 210 },
  { id: 'mechanism', Comp: Scene3, dur: 210 },
  { id: 'test', Comp: Scene4, dur: 180 },
  { id: 'result', Comp: Scene5, dur: 150 },
];
