import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm02-portfolio-diversification.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Demonstrate the correlation-dependent decline and floor of portfolio volatility. More assets reduce risk most when correlation is low; systematic risk remains.",
motion: "One asset has volatility 20%. Increase equal-weight asset count from 1 to 16; markers move down two correlation curves. With 16 assets fixed, raise shared correlation from 0.2 to 0.6; the risk floor and moving portfolio marker rise. Compare the current rho 0.6 portfolio with the rho 0.8 benchmark at the same asset count.",
example: "One asset has volatility 20%.",
antiTemplate: "More holdings do not eliminate correlated risk. Specific objects are asset count, two correlation curves, moving volatility markers; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish One Asset Carries All Its Risk; Add Equally Weighted Assets; Increase the Shared Correlation; Compare Correlation Floors. Removing the comparison or final interpretation risks confusing More holdings do not eliminate correlated risk.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<Axes width={900} height={640} xDomain={[1,18]} yDomain={[0,25]} xTicks={[1,4,8,16]} yTicks={[0,10,20]} xLabel="Number of equal-weight assets" yLabel="Volatility (%)" pad={{l:90,r:100,t:80,b:80}}>{s=><><Diversification s={s} sigma={20} rhos={[st.rho,.8]} progress={1}/><circle cx={s.px(st.n)} cy={s.py(st.low)} r={11} fill={C.accent}/><circle cx={s.px(st.n)} cy={s.py(st.high)} r={11} fill={C.alt}/><text x={s.px(7)} y={s.py(23)} fill={C.accent} fontSize={27}>{`n ${st.n.toFixed(0)} · low ρ σ ${st.low.toFixed(1)}%`}</text></>}</Axes>);};
const HEADINGS=["One Asset Carries All Its Risk", "Add Equally Weighted Assets", "Increase the Shared Correlation", "Compare Correlation Floors"];
const COPY=["One asset has volatility 20%.", "Increase equal-weight asset count from 1 to 16; markers move down two correlation curves.", "With 16 assets fixed, raise shared correlation from 0.2 to 0.6; the risk floor and moving portfolio marker rise.", "Compare the current rho 0.6 portfolio with the rho 0.8 benchmark at the same asset count."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>More assets reduce risk most when correlation is low; systematic risk remains.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={150} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={450} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={690} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:150,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:300,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:240,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:210,transition:'none' as const},
];
