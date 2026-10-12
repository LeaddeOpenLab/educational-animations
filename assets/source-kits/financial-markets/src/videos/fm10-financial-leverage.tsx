import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm10-financial-leverage.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Show fixed debt amplifying both gains and losses on equity. Leverage magnifies gains and losses; debt does not shrink with asset prices.",
motion: "Start with assets 100, debt 80 and equity 20. Raise assets to 110; debt stays 80 and equity rises to 30. Reduce assets to 90; debt stays 80 and equity falls to 10. Compare minus 10% asset return with minus 50% equity return.",
example: "Start with assets 100, debt 80 and equity 20.",
antiTemplate: "One-period mark-to-market example ignores interest, taxes and margin calls. Specific objects are assets 100, debt 80, equity 20, asset return, equity return; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Finance Assets with Debt and Equity; Assets Gain Ten Percent; Assets Fall Below the Starting Value; Fixed Debt Magnifies Both Directions. Removing the comparison or final interpretation risks confusing One-period mark-to-market example ignores interest, taxes and margin calls.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="leveraged balance sheet"><CapitalLedger assets={st.assets} debt={st.debt} equity={st.equity} initial={st.initial}/></svg>);};
const HEADINGS=["Finance Assets with Debt and Equity", "Assets Gain Ten Percent", "Assets Fall Below the Starting Value", "Fixed Debt Magnifies Both Directions"];
const COPY=["Start with assets 100, debt 80 and equity 20.", "Raise assets to 110; debt stays 80 and equity rises to 30.", "Reduce assets to 90; debt stays 80 and equity falls to 10.", "Compare minus 10% asset return with minus 50% equity return."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Leverage magnifies gains and losses; debt does not shrink with asset prices.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={180} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={450} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={690} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:180,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:270,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:240,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:210,transition:'none' as const},
];
