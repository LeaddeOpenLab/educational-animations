import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt10-asymmetric-information.state';

const T = { ...{"types": ["High", "Low"], "type_probabilities": [0.5, 0.5], "posted_price": 6, "buyer_observation": "price only"}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "When the buyer acts, both high and low possible worlds remain visible behind the same observed price.",
  motion: "Buyer still faces two possible quality nodes in one information set and must choose without conditioning on hidden quality.",
  example: "A seller privately knows a used car's quality; a buyer sees only its posted price.",
  antiTemplate: "This topic uses GameTree infoSet + SignalingModel to show Seller posts a common price that does not reveal type.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate Nature draws one quality; seller sees it, buyer does not. from Seller posts a common price that does not reveal type. and end with When the buyer acts, both high and low possible worlds remain visible behind the same observed price.",
};
void DESIGN_AUDIT;

const qualityNodes: TreeNode[]=[
  {id:'nature',player:'Nature',depth:0,branches:[{action:'High',to:'high'},{action:'Low',to:'low'}]},
  {id:'high',parent:'nature',player:'Buyer',depth:1,infoSet:'buyer-same-price',branches:[{action:'Buy',to:'buyHigh'}]},
  {id:'low',parent:'nature',player:'Buyer',depth:1,infoSet:'buyer-same-price',branches:[{action:'Buy',to:'buyLow'}]},
  {id:'buyHigh',parent:'high',depth:2,branches:[],payoff:[3,7]},
  {id:'buyLow',parent:'low',depth:2,branches:[],payoff:[3,-3]}
];
const BEATS = ["Two car qualities", "Seller sees it; buyer sees only the price", "Join buyer nodes in one information set", "Compare full versus partial information choices"];
const COPY = ["Explain asymmetric information by separating true state from observed state.", "The seller knows quality", "The buyer sees the same price in both worlds", "One observation cannot reveal the hidden type"];
const TOPIC = "Asymmetric information";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1400 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={qualityNodes.map(n=>({...n,infoSet:s.infoSet?n.infoSet:undefined}))} progress={s.natureDrawn?1:0.15}/><rect x={90} y={750} width={500} height={100} rx={14} fill="#f7e8ee"/><text x={120} y={810} fontSize={32} fill="#882255">{`Seller knows: ${s.sellerKnows?s.trueType:'?'}`}</text><rect x={700} y={750} width={580} height={100} rx={14} fill="#e8f2e8"/><text x={730} y={810} fontSize={32} fill="#117733">{`Buyer sees: ${s.buyerObservation??'?'}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={360} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={630} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 210 },
  { id: 'mechanism', Comp: Scene3, dur: 270 },
  { id: 'test', Comp: Scene4, dur: 270 },
];
