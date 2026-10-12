import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm09-options-exposure.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Show how call delta and a local delta hedge change as the underlying price changes. Current delta neutrality requires rebalancing as delta changes.",
motion: "Begin at underlying price 90 with a long call position. Raise underlying price to 110, increasing call delta and equivalent-share exposure. Increase the magnitude of the short-share hedge to offset the new delta. Display equal and opposite current share exposures and warn that future delta can change.",
example: "Begin at underlying price 90 with a long call position.",
antiTemplate: "The Black–Scholes example fixes volatility, rate and remaining time; a local delta hedge does not remove all risks. Specific objects are call delta curve, stock price, 100-share multiplier, equivalent shares, short-stock hedge; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Delta Measures Local Sensitivity; Move the Underlying Price; Rebalance the Share Hedge; A Local Hedge Is Not Permanent. Removing the comparison or final interpretation risks confusing The Black–Scholes example fixes volatility, rate and remaining time; a local delta hedge does not remove all risks.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="delta and separate share exposures"><Axes width={900} height={420} xDomain={[75,125]} yDomain={[0,1]} xTicks={[80,100,120]} yTicks={[0,.5,1]} xLabel="Underlying stock price" yLabel="Long-call delta" pad={{l:90,r:60,t:90,b:60}}>{s=><><OptionDelta s={s} strike={100} T={.5} r={.03} vol={.2} showLabels={false} progress={1}/><circle cx={s.px(st.S)} cy={s.py(st.delta)} r={12} fill={C.accent}/><text x={s.px(78)} y={35} fill={C.textStrong} fontSize={26}>{`S ${st.S.toFixed(0)} · call Δ ${st.delta.toFixed(2)}`}</text></>}</Axes><g fontFamily={FONT}><text x={450} y={450} textAnchor="middle" fill={C.textStrong} fontSize={27}>Equivalent shares · one 100-share call</text><line x1={450} x2={450} y1={465} y2={575} stroke={C.axis} strokeWidth={2}/><line x1={450} x2={450+st.shares*3} y1={490} y2={490} stroke={C.primary} strokeWidth={16}/><line x1={450} x2={450+st.hedge*3} y1={550} y2={550} stroke={C.result} strokeWidth={16}/><text x={105} y={497} fill={C.primary} fontSize={26}>Call</text><text x={105} y={557} fill={C.result} fontSize={26}>Hedge</text><text x={790} y={497} fill={C.primary} fontSize={26}>{st.shares.toFixed(1)}</text><text x={790} y={557} fill={C.result} fontSize={26}>{st.hedge.toFixed(1)}</text><text x={450} y={620} textAnchor="middle" fill={C.accent} fontSize={28}>{`Net exposure ${st.net.toFixed(1)} shares`}</text></g></svg>);};
const HEADINGS=["Delta Measures Local Sensitivity", "Move the Underlying Price", "Rebalance the Share Hedge", "A Local Hedge Is Not Permanent"];
const COPY=["Begin at underlying price 90 with a long call position.", "Raise underlying price to 110, increasing call delta and equivalent-share exposure.", "Increase the magnitude of the short-share hedge to offset the new delta.", "Display equal and opposite current share exposures and warn that future delta can change."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Current delta neutrality requires rebalancing as delta changes.</div>
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
