import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt05-mixed-strategy-nash-equilibrium.state';

const T = { ...{"rows": ["Heads", "Tails"], "cols": ["Heads", "Tails"], "payoffs": [[[2, 0], [0, 3]], [[0, 4], [3, 0]]], "p_row_heads": 0.5714285714285714, "q_col_heads": 0.6}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "At the final p,q both within-player expected payoff differences equal zero.",
  motion: "Each opponent becomes indifferent at its computed crossing; both conditions jointly determine equilibrium.",
  example: "Matching Pennies: row player chooses Heads/Tails, column player guesses Heads/Tails.",
  antiTemplate: "This topic uses MixedSimplex + mixedEquilibrium to show Move p until column payoffs tie; independently move q until row payoffs tie.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate An arbitrary p leaves one column response better; an arbitrary q leaves one row response better. from Move p until column payoffs tie; independently move q until row payoffs tie. and end with At the final p,q both within-player expected payoff differences equal zero.",
};
void DESIGN_AUDIT;


const BEATS = ["Matching-payoff matrix", "Column player's expected payoffs against p", "Solve p at the crossing", "At the final p,q both within-player expected payoff differences equal zero.", "Row player's expected payoffs against q", "Show both ties together"];
const COPY = ["Derive mixing probabilities from two indifference conditions.", "Your mix makes the opponent indifferent", "Solve p and q separately", "Both ties define the mixed equilibrium", "At the final p,q both within-player expected payoff differences equal zero.", "Do not confuse p (row mix) with q (column mix), or choose 50% without calculation in a non-symmetric example."];
const TOPIC = "Mixed Strategy Nash Equilibrium";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><div><Axes width={900} height={520} xDomain={[0,1]} yDomain={[0,4]} children={scale=><MixedSimplex s={scale} payoffs={s.payoffs} forWhom={s.rowTie?'row':'column'} progress={1}/>}/><div style={{width:`${s.p*100}%`,height:14,background:'#cc6677'}}/>{`p=${s.p.toFixed(2)}, q=${s.q.toFixed(2)}; column tie ${s.columnTie}; row tie ${s.rowTie}`}</div></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={270} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={450} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={600} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 120 },
  { id: 'mechanism', Comp: Scene3, dur: 180 },
  { id: 'test', Comp: Scene4, dur: 150 },
  { id: 'result', Comp: Scene5, dur: 150 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
