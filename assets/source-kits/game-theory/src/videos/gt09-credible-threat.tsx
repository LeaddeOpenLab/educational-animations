import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt09-credible-threat.state';

const T = { ...{"accept_current": [2, 4], "demand_close": [0, 1], "demand_concede": [4, 3], "threat": "Close", "actual": "Concede"}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "At the reached node the firm takes its higher-payoff continuation; the workers update their earlier choice.",
  motion: "The firm would concede, so the closure promise is discarded and workers rationally demand.",
  example: "A firm threatens to close a factory if workers demand a raise, but closing is costly once a demand arrives.",
  antiTemplate: "This topic uses GameTree solution to show Suppose workers demand a raise and compare the firm payoff from Closing (1) versus Conceding (3).; the adjacent lesson uses another state transition.",
  sceneRationale: "The 5 scenes separate Workers consider accepting current pay because the firm promises closure. from Suppose workers demand a raise and compare the firm payoff from Closing (1) versus Conceding (3). and end with At the reached node the firm takes its higher-payoff continuation; the workers update their earlier choice.",
};
void DESIGN_AUDIT;

const laborNodes: TreeNode[]=[
  {id:'workers',player:'Workers',depth:0,branches:[{action:'Accept current',to:'current'},{action:'Demand',to:'firm'}]},
  {id:'current',parent:'workers',depth:1,branches:[],payoff:[2,4]},
  {id:'firm',parent:'workers',player:'Firm',depth:1,branches:[{action:'Close',to:'close'},{action:'Concede',to:'concede'}]},
  {id:'close',parent:'firm',depth:2,branches:[],payoff:[0,1]},
  {id:'concede',parent:'firm',depth:2,branches:[],payoff:[4,3]}
];
const BEATS = ["Closure threat in wage negotiation", "Workers consider accepting current pay", "Enter the demand node and compare firm payoffs", "Replace Close with Concede", "Workers reconsider their wage demand"];
const COPY = ["Test whether a threat is credible at the moment it would be executed.", "A promise to close must survive the actual choice", "After a demand, Conceding pays the firm more", "Workers look ahead and demand", "At the reached node the firm takes its higher-payoff continuation; the workers update their earlier choice."];
const TOPIC = "Credible threat";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1400 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={laborNodes} solution={{workers:s.workerChoice,firm:s.firmChoice}}/><text x={100} y={850}>{`Firm payoff: ${s.firmPayoffComparison??'not tested'}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={360} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={540} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={4}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 210 },
  { id: 'mechanism', Comp: Scene3, dur: 180 },
  { id: 'test', Comp: Scene4, dur: 210 },
  { id: 'result', Comp: Scene5, dur: 150 },
];
