import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt06-sequential-game.state';

const T = { ...{"out": [2, 4], "enter_fight": [-1, 0], "enter_accommodate": [4, 2], "play_path": ["Enter", "Accommodate"]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "A time-order marker moves root → incumbent → terminal without showing the later move before entry.",
  motion: "Only the reached terminal payoff is realized, while Stay Out remains a visible alternative.",
  example: "An entrant decides Enter or Stay Out; incumbent then chooses Fight or Accommodate after entry.",
  antiTemplate: "This topic uses GameTree to show Entrant chooses Enter, revealing the incumbent's decision node; incumbent then chooses a branch.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate Entrant is at the root and the incumbent has no move yet. from Entrant chooses Enter, revealing the incumbent's decision node; incumbent then chooses a branch. and end with A time-order marker moves root → incumbent → terminal without showing the later move before entry.",
};
void DESIGN_AUDIT;

const entryNodes: TreeNode[]=[
  {id:'entrant',player:'Entrant',depth:0,branches:[{action:'Stay Out',to:'out'},{action:'Enter',to:'incumbent'}]},
  {id:'out',parent:'entrant',depth:1,branches:[],payoff:[2,4]},
  {id:'incumbent',parent:'entrant',player:'Incumbent',depth:1,branches:[{action:'Fight',to:'fight'},{action:'Accommodate',to:'accommodate'}]},
  {id:'fight',parent:'incumbent',depth:2,branches:[],payoff:[-1,0]},
  {id:'accommodate',parent:'incumbent',depth:2,branches:[],payoff:[4,2]}
];
const BEATS = ["Players and available actions", "Incumbent observes entry", "Incumbent chooses and payoff arrives", "Compare the unreached Stay Out branch"];
const COPY = ["Make action order and observed choices explicit in an extensive-form game.", "First move changes the next choice set", "The second player observes entry", "Payoffs arrive only at a terminal node"];
const TOPIC = "Sequential game";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1400 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={entryNodes} solution={s.path.length===2?{entrant:'Enter',incumbent:'Accommodate'}:s.path.length?{entrant:'Enter'}:{}}/><text x={100} y={850}>{`Realized payoff ${s.terminal??'pending'}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={330} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={630} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 180 },
  { id: 'mechanism', Comp: Scene3, dur: 300 },
  { id: 'test', Comp: Scene4, dur: 270 },
];
