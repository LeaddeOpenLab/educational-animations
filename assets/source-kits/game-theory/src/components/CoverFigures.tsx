import React from 'react';
import { Axes } from './Plot';
import { COLORS } from '../theme';
import { ProbabilityAllocation, PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from './Game';
import type { TreeNode } from './Game';
import { stateAt as state0 } from '../videos/gt01-dominant-strategy.state';
import { stateAt as state1 } from '../videos/gt02-iterative-deletion.state';
import { stateAt as state2 } from '../videos/gt03-pure-strategy-nash-equilibrium.state';
import { stateAt as state3 } from '../videos/gt04-mixed-strategy.state';
import { stateAt as state4 } from '../videos/gt05-mixed-strategy-nash-equilibrium.state';
import { stateAt as state5 } from '../videos/gt06-sequential-game.state';
import { stateAt as state6 } from '../videos/gt07-backward-induction.state';
import { stateAt as state7 } from '../videos/gt08-subgame-refinement.state';
import { stateAt as state8 } from '../videos/gt09-credible-threat.state';
import { stateAt as state9 } from '../videos/gt10-asymmetric-information.state';
import { stateAt as state10 } from '../videos/gt11-signaling.state';
import { stateAt as state11 } from '../videos/gt12-adverse-selection.state';
const FIT: Record<string,{dx:number;dy:number;scale:number}> = {"gt01-dominant-strategy": {"dx": 16.5, "dy": -5.5, "scale": 1}, "gt02-iterative-deletion": {"dx": 11.0, "dy": -3.5, "scale": 1}, "gt03-pure-strategy-nash-equilibrium": {"dx": 46.5, "dy": -8.0, "scale": 1}, "gt04-mixed-strategy": {"dx": 3.0, "dy": -25.5, "scale": 1}, "gt05-mixed-strategy-nash-equilibrium": {"dx": -20.39, "dy": 1.27, "scale": 0.8498}, "gt06-sequential-game": {"dx": -11.18, "dy": -8.75, "scale": 0.9724}, "gt07-backward-induction": {"dx": -11.18, "dy": -8.75, "scale": 0.9724}, "gt08-subgame-refinement": {"dx": -11.18, "dy": -8.75, "scale": 0.9724}, "gt09-credible-threat": {"dx": -11.18, "dy": -8.75, "scale": 0.9724}, "gt10-asymmetric-information": {"dx": -17.5, "dy": -7.0, "scale": 1}, "gt11-signaling": {"dx": 28.0, "dy": 27.5, "scale": 1}, "gt12-adverse-selection": {"dx": -73.04, "dy": 9.4, "scale": 0.6962}};
const F0: React.FC = () => { const s=state0(899); const T={"rows": ["High", "Low"], "cols": ["High", "Low"], "payoffs": [[[3, 3], [1, 4]], [[4, 1], [2, 2]]], "dominant_row": "Low"}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt01-dominant-strategy'].dx}px,${FIT['gt01-dominant-strategy'].dy}px) scale(${FIT['gt01-dominant-strategy'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 850 620" width="100%" height="100%"><PayoffMatrix x={160} y={130} cellW={280} cellH={150} rowLabels={['High','Low']} colLabels={['High','Low']} payoffs={s.payoffs} showBest={false} showNash={false}/>{s.winners.map((r,c)=><rect key={c} x={160+280*c} y={130+150*r} width={280} height={150} fill="none" stroke="#cc6677" strokeWidth={7}/>)}<text x={160} y={580} fontSize={36} fill={COLORS.textStrong}>{s.dominantRow===null?'Compare columns':`Dominant row ${s.dominantRow}`}</text></svg></div>; };
const F1: React.FC = () => { const s=state1(899); const T={"rows": ["Standard", "Premium", "Basic"], "cols": ["Regular", "Niche", "Plus"], "payoffs": [[[4, 3], [4, 2], [4, 5]], [[2, 0], [2, 1], [2, 0]], [[3, 3], [5, 2], [1, 0]]], "first_delete_row": "Premium", "then_delete_col": "Niche"}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt02-iterative-deletion'].dx}px,${FIT['gt02-iterative-deletion'].dy}px) scale(${FIT['gt02-iterative-deletion'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1050 760" width="100%" height="100%"><PayoffMatrix x={200} y={140} cellW={250} cellH={145} rowLabels={['Standard','Premium','Basic']} colLabels={['Regular','Niche','Plus']} payoffs={s.payoffs} crossOut={s.crossOut} showBest={false} showNash={false}/><text x={200} y={700} fontSize={36} fill={COLORS.textStrong}>{`Remaining ${s.activeRows.length}×${s.activeCols.length}`}</text></svg></div>; };
const F2: React.FC = () => { const s=state2(899); const T={"rows": ["Cooperate", "Defect"], "cols": ["Cooperate", "Defect"], "payoffs": [[[3, 3], [0, 5]], [[5, 0], [1, 1]]], "nash": [1, 1]}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt03-pure-strategy-nash-equilibrium'].dx}px,${FIT['gt03-pure-strategy-nash-equilibrium'].dy}px) scale(${FIT['gt03-pure-strategy-nash-equilibrium'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 850 620" width="100%" height="100%"><PayoffMatrix x={160} y={130} cellW={280} cellH={150} rowLabels={['Cooperate','Defect']} colLabels={['Cooperate','Defect']} payoffs={s.payoffs} showBest={s.showRowBest&&s.showColBest} showNash={s.showNash}/><text x={160} y={580} fontSize={36} fill={COLORS.textStrong}>{s.nashCell?`Mutual best response ${s.nashCell}`:'Mark best responses'}</text></svg></div>; };
const F3: React.FC = () => { const s=state3(899); const T={"p_before": 0, "p_after": 0.65, "draws": ["Left", "Right", "Left", "Left", "Right"]}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt04-mixed-strategy'].dx}px,${FIT['gt04-mixed-strategy'].dy}px) scale(${FIT['gt04-mixed-strategy'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1050 620" width="100%" height="100%"><ProbabilityAllocation p={s.p} draws={T.draws}/></svg></div>; };
const F4: React.FC = () => { const s=state4(899); const T={"rows": ["Heads", "Tails"], "cols": ["Heads", "Tails"], "payoffs": [[[2, 0], [0, 3]], [[0, 4], [3, 0]]], "p_row_heads": 0.5714285714285714, "q_col_heads": 0.6}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt05-mixed-strategy-nash-equilibrium'].dx}px,${FIT['gt05-mixed-strategy-nash-equilibrium'].dy}px) scale(${FIT['gt05-mixed-strategy-nash-equilibrium'].scale})`,transformOrigin:'320px 310px'}}><div><Axes width={640} height={620} xDomain={[0,1]} yDomain={[0,4]} children={scale=><MixedSimplex s={scale} payoffs={s.payoffs} forWhom={s.rowTie?'row':'column'} progress={1}/>}/><div style={{width:`${s.p*100}%`,height:14,background:'#cc6677'}}/>{`p=${s.p.toFixed(2)}, q=${s.q.toFixed(2)}; column tie ${s.columnTie}; row tie ${s.rowTie}`}</div></div>; };
const F5: React.FC = () => { const s=state5(899); const T={"out": [2, 4], "enter_fight": [-1, 0], "enter_accommodate": [4, 2], "play_path": ["Enter", "Accommodate"]}; 

const entryNodes: TreeNode[]=[
  {id:'entrant',player:'Entrant',depth:0,branches:[{action:'Stay Out',to:'out'},{action:'Enter',to:'incumbent'}]},
  {id:'out',parent:'entrant',depth:1,branches:[],payoff:[2,4]},
  {id:'incumbent',parent:'entrant',player:'Incumbent',depth:1,branches:[{action:'Fight',to:'fight'},{action:'Accommodate',to:'accommodate'}]},
  {id:'fight',parent:'incumbent',depth:2,branches:[],payoff:[-1,0]},
  {id:'accommodate',parent:'incumbent',depth:2,branches:[],payoff:[4,2]}
];

return <div style={{width:640,height:620,transform:`translate(${FIT['gt06-sequential-game'].dx}px,${FIT['gt06-sequential-game'].dy}px) scale(${FIT['gt06-sequential-game'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1300 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={entryNodes} solution={s.path.length===2?{entrant:'Enter',incumbent:'Accommodate'}:s.path.length?{entrant:'Enter'}:{}}/><text x={100} y={850} fontSize={36} fill={COLORS.textStrong}>{`Realized payoff ${s.terminal??'pending'}`}</text></svg></div>; };
const F6: React.FC = () => { const s=state6(899); const T={"standard": [2, 2], "rush_accept": [4, 3], "rush_reject": [0, 1], "retailer_choice": "Accept", "supplier_choice": "Rush"}; 

const shippingNodes: TreeNode[]=[
  {id:'supplier',player:'Supplier',depth:0,branches:[{action:'Standard',to:'standard'},{action:'Rush',to:'retailer'}]},
  {id:'standard',parent:'supplier',depth:1,branches:[],payoff:[2,2]},
  {id:'retailer',parent:'supplier',player:'Retailer',depth:1,branches:[{action:'Accept',to:'accept'},{action:'Reject',to:'reject'}]},
  {id:'accept',parent:'retailer',depth:2,branches:[],payoff:[4,3]},
  {id:'reject',parent:'retailer',depth:2,branches:[],payoff:[0,1]}
];

return <div style={{width:640,height:620,transform:`translate(${FIT['gt07-backward-induction'].dx}px,${FIT['gt07-backward-induction'].dy}px) scale(${FIT['gt07-backward-induction'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1300 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={shippingNodes} solution={s.solution}/><text x={100} y={850} fontSize={36} fill={COLORS.textStrong}>{`Carried supplier payoff ${s.carriedValue??'pending'}`}</text></svg></div>; };
const F7: React.FC = () => { const s=state7(899); const T={"out": [2, 4], "enter_fight": [-1, 0], "enter_accommodate": [4, 2], "candidate": ["Stay Out", "Fight"], "refined": ["Enter", "Accommodate"]}; 

const entryNodes: TreeNode[]=[
  {id:'entrant',player:'Entrant',depth:0,branches:[{action:'Stay Out',to:'out'},{action:'Enter',to:'incumbent'}]},
  {id:'out',parent:'entrant',depth:1,branches:[],payoff:[2,4]},
  {id:'incumbent',parent:'entrant',player:'Incumbent',depth:1,branches:[{action:'Fight',to:'fight'},{action:'Accommodate',to:'accommodate'}]},
  {id:'fight',parent:'incumbent',depth:2,branches:[],payoff:[-1,0]},
  {id:'accommodate',parent:'incumbent',depth:2,branches:[],payoff:[4,2]}
];

return <div style={{width:640,height:620,transform:`translate(${FIT['gt08-subgame-refinement'].dx}px,${FIT['gt08-subgame-refinement'].dy}px) scale(${FIT['gt08-subgame-refinement'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1300 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={entryNodes} subgames={s.subgames} solution={s.solution}/>{s.localTest?<text x={100} y={790} fontSize={36} fill="#882255">Incumbent: Fight 0 &lt; Accommodate 2</text>:null}<text x={100} y={850} fontSize={36} fill={COLORS.textStrong}>{s.refined?'All subgames rational':'Test incumbent subgame'}</text></svg></div>; };
const F8: React.FC = () => { const s=state8(899); const T={"accept_current": [2, 4], "demand_close": [0, 1], "demand_concede": [4, 3], "threat": "Close", "actual": "Concede"}; 

const laborNodes: TreeNode[]=[
  {id:'workers',player:'Workers',depth:0,branches:[{action:'Accept current',to:'current'},{action:'Demand',to:'firm'}]},
  {id:'current',parent:'workers',depth:1,branches:[],payoff:[2,4]},
  {id:'firm',parent:'workers',player:'Firm',depth:1,branches:[{action:'Close',to:'close'},{action:'Concede',to:'concede'}]},
  {id:'close',parent:'firm',depth:2,branches:[],payoff:[0,1]},
  {id:'concede',parent:'firm',depth:2,branches:[],payoff:[4,3]}
];

return <div style={{width:640,height:620,transform:`translate(${FIT['gt09-credible-threat'].dx}px,${FIT['gt09-credible-threat'].dy}px) scale(${FIT['gt09-credible-threat'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1300 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={laborNodes} solution={{workers:s.workerChoice,firm:s.firmChoice}}/><text x={100} y={850} fontSize={36} fill={COLORS.textStrong}>{`Firm payoff: ${s.firmPayoffComparison??'not tested'}`}</text></svg></div>; };
const F9: React.FC = () => { const s=state9(899); const T={"types": ["High", "Low"], "type_probabilities": [0.5, 0.5], "posted_price": 6, "buyer_observation": "price only"}; 

const qualityNodes: TreeNode[]=[
  {id:'nature',player:'Nature',depth:0,branches:[{action:'High',to:'high'},{action:'Low',to:'low'}]},
  {id:'high',parent:'nature',player:'Buyer',depth:1,infoSet:'buyer-same-price',branches:[{action:'Buy',to:'buyHigh'}]},
  {id:'low',parent:'nature',player:'Buyer',depth:1,infoSet:'buyer-same-price',branches:[{action:'Buy',to:'buyLow'}]},
  {id:'buyHigh',parent:'high',depth:2,branches:[],payoff:[3,7]},
  {id:'buyLow',parent:'low',depth:2,branches:[],payoff:[3,-3]}
];

return <div style={{width:640,height:620,transform:`translate(${FIT['gt10-asymmetric-information'].dx}px,${FIT['gt10-asymmetric-information'].dy}px) scale(${FIT['gt10-asymmetric-information'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1300 900" width="100%" height="100%"><GameTree cx={700} cy={130} nodeGap={360} levelH={240} nodes={qualityNodes.map(n=>({...n,infoSet:s.infoSet?n.infoSet:undefined}))} progress={s.natureDrawn?1:0.15}/><rect x={90} y={750} width={500} height={100} rx={14} fill="#f7e8ee"/><text x={120} y={810} fontSize={32} fill="#882255">{`Seller knows: ${s.sellerKnows?s.trueType:'?'}`}</text><rect x={700} y={750} width={580} height={100} rx={14} fill="#e8f2e8"/><text x={730} y={810} fontSize={32} fill="#117733">{`Buyer sees: ${s.buyerObservation??'?'}`}</text></svg></div>; };
const F10: React.FC = () => { const s=state10(899); const T={"types": ["High skill", "Low skill"], "wage_gain": 3, "certificate_costs": [1, 4], "net_gains": [2, -1]}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt11-signaling'].dx}px,${FIT['gt11-signaling'].dy}px) scale(${FIT['gt11-signaling'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1250 1000" width="100%" height="100%"><SignalingModel x={60} y={130} w={1100} types={s.types} signals={['Certificate','None']} actions={['Hire','Reject']} paths={s.paths} cost={(type,signal)=>signal===0?s.costs[type]:0}/>{s.showComparison?<text x={60} y={550} fontSize={48} fontWeight={700} fill="#117733">{`Certificate net gain: high +${s.netGains[0]} / low ${s.netGains[1]}`}</text>:null}<text x={60} y={800} fontSize={48} fill={COLORS.primary}>Certificate costs: High 1 / Low 4</text></svg></div>; };
const F11: React.FC = () => { const s=state11(899); const T={"quality_range": [0, 1], "seller_value": "10q", "buyer_value": "12q", "q_max_sequence": [1, 0.6, 0.36], "offer_sequence": [6, 3.6, 2.16]}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['gt12-adverse-selection'].dx}px,${FIT['gt12-adverse-selection'].dy}px) scale(${FIT['gt12-adverse-selection'].scale})`,transformOrigin:'320px 310px'}}><Axes width={640} height={620} xDomain={[0,1]} yDomain={[0,12]} children={scale=><AdverseSelection s={scale} sellerValue={s.sellerValue} buyerValue={s.buyerValue} qMax={s.qMax} progress={1}/>}/></div>; };
export const COVER_FIGURES: Record<string,React.FC> = {'gt01-dominant-strategy':F0,
'gt02-iterative-deletion':F1,
'gt03-pure-strategy-nash-equilibrium':F2,
'gt04-mixed-strategy':F3,
'gt05-mixed-strategy-nash-equilibrium':F4,
'gt06-sequential-game':F5,
'gt07-backward-induction':F6,
'gt08-subgame-refinement':F7,
'gt09-credible-threat':F8,
'gt10-asymmetric-information':F9,
'gt11-signaling':F10,
'gt12-adverse-selection':F11};