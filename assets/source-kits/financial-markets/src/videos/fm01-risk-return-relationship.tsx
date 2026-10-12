import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm01-risk-return-relationship.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Distinguish higher expected return from a guaranteed realized gain. A higher expected return does not guarantee a positive realized return.",
motion: "Start with outcomes centered at a low expected return. Increase mean from 3 to 7 and volatility from 2 to 10; outcome bars fan out around zero. Select five possible realized returns in turn, including the negative outcome, while the expected mean stays 7%. Return the realized-outcome selection to the negative outcome; hold it next to the unchanged expected return 7%.",
example: "Start with outcomes centered at a low expected return.",
antiTemplate: "Risk premium is an expectation; this example is illustrative, not an empirical asset forecast. Specific objects are five equally likely outcomes, mean return, volatility; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Expected Is Not Guaranteed; Increase Risk and Expected Return; Inspect the Wider Outcome Range; A Higher Mean Still Allows Losses. Removing the comparison or final interpretation risks confusing Risk premium is an expectation; this example is illustrative, not an empirical asset forecast.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="return outcomes"><ReturnOutcomes mu={st.mu} sigma={st.sigma} samples={st.samples} chosen={st.chosen}/>{st.realized!==null?<text x={450} y={570} fill={st.realized>=0?C.primary:C.result} fontFamily={FONT} textAnchor="middle" fontSize={28}>{`One possible realization: ${st.realized.toFixed(1)}%`}</text>:null}</svg>);};
const HEADINGS=["Expected Is Not Guaranteed", "Increase Risk and Expected Return", "Inspect the Wider Outcome Range", "A Higher Mean Still Allows Losses"];
const COPY=["Start with outcomes centered at a low expected return.", "Increase mean from 3 to 7 and volatility from 2 to 10; outcome bars fan out around zero.", "Select five possible realized returns in turn, including the negative outcome, while the expected mean stays 7%.", "Return the realized-outcome selection to the negative outcome; hold it next to the unchanged expected return 7%."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>A higher expected return does not guarantee a positive realized return.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={150} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={420} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={660} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:150,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:270,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:240,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:210,transition:'none' as const},
];
