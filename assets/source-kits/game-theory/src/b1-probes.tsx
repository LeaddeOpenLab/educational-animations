import React from 'react';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from './components/Game';
import type { TreeNode } from './components/Game';
import { Axes } from './components/Plot';
import { stateAt as dominant } from './videos/gt01-dominant-strategy.state';
import { stateAt as deletion } from './videos/gt02-iterative-deletion.state';
import { stateAt as pureNash } from './videos/gt03-pure-strategy-nash-equilibrium.state';
import { stateAt as mixed } from './videos/gt04-mixed-strategy.state';
import { stateAt as mixedNash } from './videos/gt05-mixed-strategy-nash-equilibrium.state';
import { stateAt as sequential } from './videos/gt06-sequential-game.state';
import { stateAt as backward } from './videos/gt07-backward-induction.state';
import { stateAt as subgame } from './videos/gt08-subgame-refinement.state';
import { stateAt as threat } from './videos/gt09-credible-threat.state';
import { stateAt as asymmetric } from './videos/gt10-asymmetric-information.state';
import { stateAt as signaling } from './videos/gt11-signaling.state';
import { stateAt as lemons } from './videos/gt12-adverse-selection.state';

export const DominantProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=dominant(frame);
  return <svg width={850} height={620}><PayoffMatrix x={160} y={130} cellW={280} cellH={150} rowLabels={['High','Low']} colLabels={['High','Low']} payoffs={s.payoffs} showBest={false} showNash={false}/>{s.winners.map((r,c)=><rect key={c} x={160+280*c} y={130+150*r} width={280} height={150} fill="none" stroke="#cc6677" strokeWidth={7}/>)}<text x={160} y={580}>{s.dominantRow===null?'Compare columns':`Dominant row ${s.dominantRow}`}</text></svg>;
};
export const DeletionProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=deletion(frame);
  return <svg width={1050} height={760}><PayoffMatrix x={200} y={140} cellW={250} cellH={145} rowLabels={['Standard','Premium','Basic']} colLabels={['Regular','Niche','Plus']} payoffs={s.payoffs} crossOut={s.crossOut} showBest={false} showNash={false}/><text x={200} y={700}>{`Remaining ${s.activeRows.length}×${s.activeCols.length}`}</text></svg>;
};
export const PureNashProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=pureNash(frame);
  return <svg width={850} height={620}><PayoffMatrix x={160} y={130} cellW={280} cellH={150} rowLabels={['Cooperate','Defect']} colLabels={['Cooperate','Defect']} payoffs={s.payoffs} showBest={s.showRowBest&&s.showColBest} showNash={s.showNash}/><text x={160} y={580}>{s.nashCell?`Mutual best response ${s.nashCell}`:'Mark best responses'}</text></svg>;
};
export const MixedProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=mixed(frame);
  return <svg width={1100} height={620}><text x={70} y={135} fontSize={42} fill="#0b1220">Choose probabilities before the kick</text><rect x={70} y={205} width={900} height={130} rx={18} fill="#e2e8f0"/><rect x={70} y={205} width={900*s.p} height={130} rx={18} fill="#cc6677"/><text x={70} y={400} fontSize={42} fill="#0b1220">{`Left ${s.p.toFixed(2)}  |  Right ${s.otherProbability.toFixed(2)}`}</text><text x={70} y={510} fontSize={46} fill="#117733">{`Draw: ${s.realizedAction??'not yet'}`}</text></svg>;
};
export const MixedNashProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=mixedNash(frame);
  return <div><Axes width={900} height={520} xDomain={[0,1]} yDomain={[0,4]} children={scale=><MixedSimplex s={scale} payoffs={s.payoffs} forWhom={s.rowTie?'row':'column'} progress={1}/>}/><div style={{width:`${s.p*100}%`,height:14,background:'#cc6677'}}/>{`p=${s.p.toFixed(2)}, q=${s.q.toFixed(2)}; column tie ${s.columnTie}; row tie ${s.rowTie}`}</div>;
};
const entryNodes: TreeNode[]=[
  {id:'entrant',player:'Entrant',depth:0,branches:[{action:'Stay Out',to:'out'},{action:'Enter',to:'incumbent'}]},
  {id:'out',parent:'entrant',depth:1,branches:[],payoff:[2,4]},
  {id:'incumbent',parent:'entrant',player:'Incumbent',depth:1,branches:[{action:'Fight',to:'fight'},{action:'Accommodate',to:'accommodate'}]},
  {id:'fight',parent:'incumbent',depth:2,branches:[],payoff:[-1,0]},
  {id:'accommodate',parent:'incumbent',depth:2,branches:[],payoff:[4,2]}
];
export const SequentialProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=sequential(frame);
  return <svg width={1400} height={900}><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={entryNodes} solution={s.path.length===2?{entrant:'Enter',incumbent:'Accommodate'}:s.path.length?{entrant:'Enter'}:{}}/><text x={100} y={850}>{`Realized payoff ${s.terminal??'pending'}`}</text></svg>;
};
const shippingNodes: TreeNode[]=[
  {id:'supplier',player:'Supplier',depth:0,branches:[{action:'Standard',to:'standard'},{action:'Rush',to:'retailer'}]},
  {id:'standard',parent:'supplier',depth:1,branches:[],payoff:[2,2]},
  {id:'retailer',parent:'supplier',player:'Retailer',depth:1,branches:[{action:'Accept',to:'accept'},{action:'Reject',to:'reject'}]},
  {id:'accept',parent:'retailer',depth:2,branches:[],payoff:[4,3]},
  {id:'reject',parent:'retailer',depth:2,branches:[],payoff:[0,1]}
];
export const BackwardProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=backward(frame);
  return <svg width={1400} height={900}><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={shippingNodes} solution={s.solution}/><text x={100} y={850}>{`Carried supplier payoff ${s.carriedValue??'pending'}`}</text></svg>;
};
export const SubgameProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=subgame(frame);
  return <svg width={1400} height={900}><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={entryNodes} subgames={s.subgames} solution={s.solution}/>{s.localTest?<text x={100} y={790} fontSize={36} fill="#882255">Incumbent: Fight 0 &lt; Accommodate 2</text>:null}<text x={100} y={850}>{s.refined?'All subgames rational':'Test incumbent subgame'}</text></svg>;
};
const laborNodes: TreeNode[]=[
  {id:'workers',player:'Workers',depth:0,branches:[{action:'Accept current',to:'current'},{action:'Demand',to:'firm'}]},
  {id:'current',parent:'workers',depth:1,branches:[],payoff:[2,4]},
  {id:'firm',parent:'workers',player:'Firm',depth:1,branches:[{action:'Close',to:'close'},{action:'Concede',to:'concede'}]},
  {id:'close',parent:'firm',depth:2,branches:[],payoff:[0,1]},
  {id:'concede',parent:'firm',depth:2,branches:[],payoff:[4,3]}
];
export const ThreatProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=threat(frame);
  return <svg width={1400} height={900}><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={laborNodes} solution={{workers:s.workerChoice,firm:s.firmChoice}}/><text x={100} y={850}>{`Firm payoff: ${s.firmPayoffComparison??'not tested'}`}</text></svg>;
};
const qualityNodes: TreeNode[]=[
  {id:'nature',player:'Nature',depth:0,branches:[{action:'High',to:'high'},{action:'Low',to:'low'}]},
  {id:'high',parent:'nature',player:'Buyer',depth:1,infoSet:'buyer-same-price',branches:[{action:'Buy',to:'buyHigh'}]},
  {id:'low',parent:'nature',player:'Buyer',depth:1,infoSet:'buyer-same-price',branches:[{action:'Buy',to:'buyLow'}]},
  {id:'buyHigh',parent:'high',depth:2,branches:[],payoff:[3,7]},
  {id:'buyLow',parent:'low',depth:2,branches:[],payoff:[3,-3]}
];
export const AsymmetricProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=asymmetric(frame);
  return <svg width={1400} height={900}><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={qualityNodes.map(n=>({...n,infoSet:s.infoSet?n.infoSet:undefined}))} progress={s.natureDrawn?1:0.15}/><rect x={90} y={750} width={500} height={100} rx={14} fill="#f7e8ee"/><text x={120} y={810} fontSize={32} fill="#882255">{`Seller knows: ${s.sellerKnows?s.trueType:'?'}`}</text><rect x={700} y={750} width={580} height={100} rx={14} fill="#e8f2e8"/><text x={730} y={810} fontSize={32} fill="#117733">{`Buyer sees: ${s.buyerObservation??'?'}`}</text></svg>;
};
export const SignalingProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=signaling(frame);
  return <svg width={1500} height={650}><SignalingModel x={60} y={130} w={1100} types={s.types} signals={['Certificate','None']} actions={['Hire','Reject']} paths={s.paths} cost={(type,signal)=>signal===0?s.costs[type]:0}/><text x={60} y={550}>{`Net gains ${s.showComparison?s.netGains.join(' / '):'hidden'}`}</text></svg>;
};
export const AdverseSelectionProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=lemons(frame);
  return <Axes width={1000} height={620} xDomain={[0,1]} yDomain={[0,12]} children={scale=><AdverseSelection s={scale} sellerValue={s.sellerValue} buyerValue={s.buyerValue} qMax={s.qMax} progress={1}/>}/>;
};
