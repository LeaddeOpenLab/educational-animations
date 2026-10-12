import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm11-market-liquidity.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Demonstrate depth consumption and volume-weighted execution price for a market buy. Limited depth makes a larger order execute at multiple prices above the initial best ask.",
motion: "The ask book offers 5 units at 101, 5 at 102 and 10 at 103. A market buy consumes the 5 units at 101. The order consumes the 5 units at 102, then 2 at 103; residual sizes actually decrease. Twelve units cost 1221, for average price 101.75; eight units remain at 103.",
example: "The ask book offers 5 units at 101, 5 at 102 and 10 at 103.",
antiTemplate: "Displayed depth is illustrative; the example ignores fees, hidden liquidity and new orders. Specific objects are asks at 101,102,103, market buy of 12 units, remaining depth, filled quantity, total cost; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Read the Available Ask Depth; Execute the First Price Level; Continue into Higher Prices; Measure the Average Fill. Removing the comparison or final interpretation risks confusing Displayed depth is illustrative; the example ignores fees, hidden liquidity and new orders.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="consumed ask book"><DepthRows asks={st.asks} filled={st.filled} cost={st.cost} original={st.original}/></svg>);};
const HEADINGS=["Read the Available Ask Depth", "Execute the First Price Level", "Continue into Higher Prices", "Measure the Average Fill"];
const COPY=["The ask book offers 5 units at 101, 5 at 102 and 10 at 103.", "A market buy consumes the 5 units at 101.", "The order consumes the 5 units at 102, then 2 at 103; residual sizes actually decrease.", "Twelve units cost 1221, for average price 101.75; eight units remain at 103."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Limited depth makes a larger order execute at multiple prices above the initial best ask.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={180} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={420} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={660} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:180,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:240,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:240,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:210,transition:'none' as const},
];
