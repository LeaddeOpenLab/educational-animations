import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm06-efficient-market-hypothesis.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Demonstrate rapid price adjustment to newly public information in the idealized semi-strong hypothesis. Semi-strong efficiency models rapid incorporation of public information, not perfect future prediction.",
motion: "Price remains at 100 before the event; future observations remain hidden. At the public announcement, the idealized price jumps from 100 to 120. The efficient path stays at 120 while the lagged comparison adjusts progressively. Show both completed reactions with no predictable post-news drift on the idealized path.",
example: "Price remains at 100 before the event; future observations remain hidden.",
antiTemplate: "The sudden upward news surprise is illustrative; surprises may also reduce price. Specific objects are public news event, idealized efficient price, lagged contrast price, revealed time series; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Before the Public Announcement; New Information Arrives; Price Adjusts Immediately; A Delayed Reaction Is a Contrast. Removing the comparison or final interpretation risks confusing The sudden upward news surprise is illustrative; surprises may also reduce price.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<Axes width={900} height={640} xDomain={[0,10]} yDomain={[90,130]} xTicks={[0,4,8,10]} yTicks={[100,120]} xLabel="Time around public news" yLabel="Price" pad={{l:90,r:60,t:80,b:80}}>{s=><><Curve s={s} pts={[[0,100],[Math.min(st.time,4),100],...(st.news?[[4,120],[st.time,120]]:[])] as [number,number][]} color={C.primary} progress={1}/><Curve s={s} pts={sampleFn(st.slow,0,st.time)} color={C.alt} progress={1}/><line x1={s.px(4)} x2={s.px(4)} y1={s.py(95)} y2={s.py(125)} stroke={C.accent} strokeDasharray="8 6"/><circle cx={s.px(st.time)} cy={s.py(st.price)} r={10} fill={C.accent}/><text x={s.px(5)} y={s.py(95)} fill={C.textStrong} fontSize={25}>{st.news?`Efficient ${st.price.toFixed(0)} · lagged ${st.lag.toFixed(0)}`:"News not yet public"}</text></>}</Axes>);};
const HEADINGS=["Before the Public Announcement", "New Information Arrives", "Price Adjusts Immediately", "A Delayed Reaction Is a Contrast"];
const COPY=["Price remains at 100 before the event; future observations remain hidden.", "At the public announcement, the idealized price jumps from 100 to 120.", "The efficient path stays at 120 while the lagged comparison adjusts progressively.", "Show both completed reactions with no predictable post-news drift on the idealized path."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Semi-strong efficiency models rapid incorporation of public information, not perfect future prediction.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={210} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={420} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={660} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:210,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:210,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:240,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:210,transition:'none' as const},
];
