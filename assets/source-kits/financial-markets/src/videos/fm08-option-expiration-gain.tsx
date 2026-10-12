import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm08-option-expiration-gain.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Distinguish long-call intrinsic payoff from profit after paying the premium. A call can have positive payoff but negative profit; break-even is strike plus premium.",
motion: "Stock is 80; long call payoff is zero and net profit is minus 5. Stock rises past strike 100; intrinsic payoff becomes positive. At 102 intrinsic payoff is 2 while net profit remains minus 3. At 105 payoff equals the premium and profit is zero. At 120 payoff is 20 and profit is 15.",
example: "Stock is 80; long call payoff is zero and net profit is minus 5.",
antiTemplate: "The illustration is per share; it excludes fees and contract multiplier. Specific objects are stock at expiration, strike 100, premium 5, call payoff, net profit; these implement the topic’s quantitative causal sequence.",
sceneRationale: "5 scenes are needed to distinguish Pay the Premium; Cross the Strike Price; Payoff Is Not Yet Profit; Reach the Break-Even Price; Beyond Break-Even. Removing the comparison or final interpretation risks confusing The illustration is per share; it excludes fees and contract multiplier.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<Axes width={900} height={640} xDomain={[75,125]} yDomain={[-10,30]} xTicks={[80,100,105,120]} yTicks={[-5,0,15,25]} xLabel="Stock price at expiration" yLabel="Per-share payoff / net profit" pad={{l:90,r:60,t:80,b:80}}>{s=><><Curve s={s} pts={[[75,0],[100,0],[125,25]]} color={C.alt} progress={1}/><OptionPayoff s={s} kind="call" strike={st.strike} premium={st.premium} showUnderlying={false} showLabels={false} progress={1}/><circle cx={s.px(st.S)} cy={s.py(st.payoff)} r={10} fill={C.alt}/><circle cx={s.px(st.S)} cy={s.py(st.profit)} r={11} fill={st.profit>=0?C.primary:C.result}/><line x1={s.px(st.S)} x2={s.px(st.S)} y1={s.py(st.payoff)} y2={s.py(st.profit)} stroke={C.accent} strokeWidth={3}/><text x={s.px(77)} y={35} fill={C.textStrong} fontSize={26}>{`S ${st.S.toFixed(1)} · payoff ${st.payoff.toFixed(1)} · profit ${st.profit.toFixed(1)}`}</text></>}</Axes>);};
const HEADINGS=["Pay the Premium", "Cross the Strike Price", "Payoff Is Not Yet Profit", "Reach the Break-Even Price", "Beyond Break-Even"];
const COPY=["Stock is 80; long call payoff is zero and net profit is minus 5.", "Stock rises past strike 100; intrinsic payoff becomes positive.", "At 102 intrinsic payoff is 2 while net profit remains minus 3.", "At 105 payoff equals the premium and profit is zero.", "At 120 payoff is 20 and profit is 15."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>A call can have positive payoff but negative profit; break-even is strike plus premium.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={150} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={360} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={540} step={3}/>;
const Scene4:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={720} step={4}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:150,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:210,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:180,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:180,transition:'none' as const},
 {id:'closing',Comp:Scene4,dur:180,transition:'none' as const},
];
