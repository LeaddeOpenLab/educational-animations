import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm05-bond-price.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Show that fixed bond cash flows are worth less when the required yield rises. Rising required yield lowers the price of a fixed-rate bond.",
motion: "A three-year bond pays 5, 5 and 105; yield equals its 5% coupon. Raise required yield from 5% to 10% with cash flows unchanged. After the bars shrink, add the three discounted payments into a subtotal one at a time. Compare the changed total with the unchanged face value.",
example: "A three-year bond pays 5, 5 and 105; yield equals its 5% coupon.",
antiTemplate: "Price changes; coupons and promised principal do not. Specific objects are three coupons, final principal, yield, discounted cash-flow bars, total price; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Fix the Promised Cash Flows; Raise the Required Yield; Sum the Discounted Cash Flows; Price and Yield Move Oppositely. Removing the comparison or final interpretation risks confusing Price changes; coupons and promised principal do not.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="bond discount bars"><g fontFamily={FONT}>{st.pv.map((v,i)=><g key={i}><rect x={150+i*250} y={470-st.flows[i]*3} width={85} height={st.flows[i]*3} fill={C.bg2} stroke={C.axis}/><rect x={150+i*250} y={470-v*3} width={85} height={v*3} fill={alpha(C.accent,.5)} stroke={C.accent}/><text x={192+i*250} y={515} textAnchor="middle" fill={C.textStrong} fontSize={28}>{`Year ${i+1}`}</text><text x={192+i*250} y={555} textAnchor="middle" fill={C.accent} fontSize={27}>{`PV ${v.toFixed(2)}`}</text><text x={192+i*250} y={100} textAnchor="middle" fill={C.textMuted} fontSize={25}>{`Cash ${st.flows[i].toFixed(0)}`}</text></g>)}<text x={450} y={40} textAnchor="middle" fill={C.textStrong} fontSize={30}>{`Yield ${(st.yieldRate*100).toFixed(1)}% · Price ${st.price.toFixed(2)}`}</text><text x={450} y={610} fill={C.accent} textAnchor="middle" fontSize={28}>{`Sum ${st.summed.toFixed(0)} payments: ${st.subtotal.toFixed(2)}`}</text></g></svg>);};
const HEADINGS=["Fix the Promised Cash Flows", "Raise the Required Yield", "Sum the Discounted Cash Flows", "Price and Yield Move Oppositely"];
const COPY=["A three-year bond pays 5, 5 and 105; yield equals its 5% coupon.", "Raise required yield from 5% to 10% with cash flows unchanged.", "After the bars shrink, add the three discounted payments into a subtotal one at a time.", "Compare the changed total with the unchanged face value."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Rising required yield lowers the price of a fixed-rate bond.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={180} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={450} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={660} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:180,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:270,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:210,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:240,transition:'none' as const},
];
