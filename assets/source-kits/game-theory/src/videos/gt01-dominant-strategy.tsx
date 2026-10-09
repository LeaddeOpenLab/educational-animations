import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt01-dominant-strategy.state';

const T = { ...{"rows": ["High", "Low"], "cols": ["High", "Low"], "payoffs": [[[3, 3], [1, 4]], [[4, 1], [2, 2]]], "dominant_row": "Low"}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Highlight each column maximum before labeling the common row; show why B's payoff is irrelevant to A's dominance test.",
  motion: "The winning row remains Low in both comparisons, so A has a strictly dominant action.",
  example: "Two competing cafés choose high or low prices; compare Café A's payoff for each fixed Café B price.",
  antiTemplate: "This topic uses PayoffMatrix + bestResponses to show Hold B at High, compare A's two payoffs; repeat with B at Low.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate Both columns visible, with no selected row. from Hold B at High, compare A's two payoffs; repeat with B at Low. and end with Highlight each column maximum before labeling the common row; show why B's payoff is irrelevant to A's dominance test.",
};
void DESIGN_AUDIT;


const BEATS = ["Café pricing choices and payoff meaning", "Compare A when B is High", "Compare B's Low choice, then align the winners", "Conclude dominance is conditional on every opponent choice"];
const COPY = ["Distinguish a dominant action from a merely good response.", "A gets 4 with Low versus 3 with High", "A gets 2 with Low versus 1 with High", "Dominance requires every comparison"];
const TOPIC = "Dominant strategy";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 850 620" width="100%" height="100%"><PayoffMatrix x={160} y={130} cellW={280} cellH={150} rowLabels={['High','Low']} colLabels={['High','Low']} payoffs={s.payoffs} showBest={false} showNash={false}/>{s.winners.map((r,c)=><rect key={c} x={160+280*c} y={130+150*r} width={280} height={150} fill="none" stroke="#cc6677" strokeWidth={7}/>)}<text x={160} y={580}>{s.dominantRow===null?'Compare columns':`Dominant row ${s.dominantRow}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={180} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={390} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={630} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 180 },
  { id: 'setup', Comp: Scene2, dur: 210 },
  { id: 'mechanism', Comp: Scene3, dur: 240 },
  { id: 'test', Comp: Scene4, dur: 270 },
];
