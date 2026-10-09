import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt07-backward-induction.state';

const T = { ...{"standard": [2, 2], "rush_accept": [4, 3], "rush_reject": [0, 1], "retailer_choice": "Accept", "supplier_choice": "Rush"}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "The supplier selects Rush only after the retailer continuation has been solved.",
  motion: "Accept is selected at the last node; its supplier payoff 4 is brought back and compared with Standard payoff 2.",
  example: "A supplier first chooses Rush or Standard shipping; after Rush, a retailer chooses Accept or Reject the surcharge.",
  antiTemplate: "This topic uses GameTree solution to show Compare retailer payoffs at the Rush node: Accept gives 3, Reject gives 1.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 5 scenes separate Supplier sees Rush and Standard but does not yet know which Rush continuation is rational. from Compare retailer payoffs at the Rush node: Accept gives 3, Reject gives 1. and end with The supplier selects Rush only after the retailer continuation has been solved.",
};
void DESIGN_AUDIT;

const shippingNodes: TreeNode[]=[
  {id:'supplier',player:'Supplier',depth:0,branches:[{action:'Standard',to:'standard'},{action:'Rush',to:'retailer'}]},
  {id:'standard',parent:'supplier',depth:1,branches:[],payoff:[2,2]},
  {id:'retailer',parent:'supplier',player:'Retailer',depth:1,branches:[{action:'Accept',to:'accept'},{action:'Reject',to:'reject'}]},
  {id:'accept',parent:'retailer',depth:2,branches:[],payoff:[4,3]},
  {id:'reject',parent:'retailer',depth:2,branches:[],payoff:[0,1]}
];
const BEATS = ["Shipping tree and payoffs", "Compare retailer payoffs after Rush", "Carry the Accept outcome back", "Compare Rush with Standard at supplier root", "Trace the chosen shipping path"];
const COPY = ["Compute backward induction from terminal choices to the root.", "Solve the retailer decision first", "Accept yields the retailer more", "Then the supplier chooses Rush", "The supplier selects Rush only after the retailer continuation has been solved."];
const TOPIC = "Backward induction";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1400 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={shippingNodes} solution={s.solution}/><text x={100} y={850}>{`Carried supplier payoff ${s.carriedValue??'pending'}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={330} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={480} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={690} beat={4}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 180 },
  { id: 'mechanism', Comp: Scene3, dur: 150 },
  { id: 'test', Comp: Scene4, dur: 210 },
  { id: 'result', Comp: Scene5, dur: 210 },
];
