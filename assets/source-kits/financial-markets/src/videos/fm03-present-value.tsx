import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm03-present-value.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Discount a fixed future cash flow by rate and waiting time. PV = FV / (1+r)^t; rate and delay reduce present value for positive future cash.",
motion: "Begin with a fixed future claim of 121 and zero discount rate. Raise discount rate to 10% over two years; present value falls to 100. Extend waiting time to three years while future cash remains 121; present value falls further. Move a cash packet from today to year 3 while its value compounds from present value 90.91 to the unchanged future claim 121.",
example: "Begin with a fixed future claim of 121 and zero discount rate.",
antiTemplate: "Discounting changes today’s valuation, not the contractual future cash amount. Specific objects are future cash 121, present cash bar, discount rate, years, backward token; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish A Fixed Future Claim; Discount Back to Today; Waiting Longer Lowers Value; Verify by Compounding Forward. Removing the comparison or final interpretation risks confusing Discounting changes today’s valuation, not the contractual future cash amount.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="discounted cash"><CashValue future={st.future} present={st.present} years={st.years} rate={st.rate} tokenX={st.tokenX} tokenValue={st.tokenValue}/></svg>);};
const HEADINGS=["A Fixed Future Claim", "Discount Back to Today", "Waiting Longer Lowers Value", "Verify by Compounding Forward"];
const COPY=["Begin with a fixed future claim of 121 and zero discount rate.", "Raise discount rate to 10% over two years; present value falls to 100.", "Extend waiting time to three years while future cash remains 121; present value falls further.", "Move a cash packet from today to year 3 while its value compounds from present value 90.91 to the unchanged future claim 121."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>PV = FV / (1+r)^t; rate and delay reduce present value for positive future cash.</div>
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
