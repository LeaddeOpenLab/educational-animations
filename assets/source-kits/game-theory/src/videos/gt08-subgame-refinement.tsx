import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt08-subgame-refinement.state';

const T = { ...{"out": [2, 4], "enter_fight": [-1, 0], "enter_accommodate": [4, 2], "candidate": ["Stay Out", "Fight"], "refined": ["Enter", "Accommodate"]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "The final strategy is optimal in the whole game and in the boxed proper subgame.",
  motion: "The threatened continuation fails locally; substitute Accommodate and recompute the root choice.",
  example: "A market-entry threat: incumbent promises to Fight entry, but would earn more by Accommodating if entry occurs.",
  antiTemplate: "This topic uses GameTree subgames + solution to show Enter the proper subgame and compare incumbent payoffs there.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate Candidate full-game strategy includes Fight after Enter. from Enter the proper subgame and compare incumbent payoffs there. and end with The final strategy is optimal in the whole game and in the boxed proper subgame.",
};
void DESIGN_AUDIT;

const entryNodes: TreeNode[]=[
  {id:'entrant',player:'Entrant',depth:0,branches:[{action:'Stay Out',to:'out'},{action:'Enter',to:'incumbent'}]},
  {id:'out',parent:'entrant',depth:1,branches:[],payoff:[2,4]},
  {id:'incumbent',parent:'entrant',player:'Incumbent',depth:1,branches:[{action:'Fight',to:'fight'},{action:'Accommodate',to:'accommodate'}]},
  {id:'fight',parent:'incumbent',depth:2,branches:[],payoff:[-1,0]},
  {id:'accommodate',parent:'incumbent',depth:2,branches:[],payoff:[4,2]}
];
const BEATS = ["Candidate Nash strategy", "Draw proper subgame boundary", "Test Fight versus Accommodate inside it", "The final strategy is optimal in the whole game and in the boxed proper subgame.", "Replace failed continuation and revisit root", "Conclude every subgame must pass"];
const COPY = ["Show why subgame perfection rejects a Nash threat that fails in a proper subgame.", "A full-game Nash threat can fail locally", "Test every proper subgame", "Keep only sequentially rational plans", "The final strategy is optimal in the whole game and in the boxed proper subgame.", "Do not describe every node as a subgame; an information set cannot be cut."];
const TOPIC = "Subgame refinement";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1400 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={entryNodes} subgames={s.subgames} solution={s.solution}/>{s.localTest?<text x={100} y={790} fontSize={36} fill="#882255">Incumbent: Fight 0 &lt; Accommodate 2</text>:null}<text x={100} y={850}>{s.refined?'All subgames rational':'Test incumbent subgame'}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={270} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={420} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={570} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 120 },
  { id: 'mechanism', Comp: Scene3, dur: 150 },
  { id: 'test', Comp: Scene4, dur: 150 },
  { id: 'result', Comp: Scene5, dur: 180 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
