import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm04-yield-curve.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Relate short-versus-long maturity yields to upward, flat and inverted curves. An inverted curve has short yields above long yields; it is a signal, not a guaranteed forecast.",
motion: "Start with short yield 2% and long yield 4%. Raise short yield while holding ten-year yield fixed. At short yield 4%, the linear example becomes flat. Short yield reaches 5%; the long-minus-short spread is negative.",
example: "Start with short yield 2% and long yield 4%.",
antiTemplate: "This is an illustrative linear term structure; maturity is not elapsed calendar time. Specific objects are one-year yield, ten-year yield, curve geometry, term spread; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Compare Maturities; Raise the Short End; Pass through a Flat Curve; Read an Inversion Carefully. Removing the comparison or final interpretation risks confusing This is an illustrative linear term structure; maturity is not elapsed calendar time.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<Axes width={900} height={640} xDomain={[1,10]} yDomain={[0,6]} xTicks={[1,5,10]} yTicks={[0,2,4,6]} xLabel="Maturity (years)" yLabel="Yield (%)" pad={{l:90,r:130,t:80,b:80}}>{s=><><Curve s={s} pts={sampleFn(st.yc,1,10)} color={C.primary} progress={1}/><circle cx={s.px(1)} cy={s.py(st.short)} r={10} fill={C.accent}/><circle cx={s.px(10)} cy={s.py(st.long)} r={10} fill={C.alt}/><text x={s.px(3)} y={s.py(1)} fill={C.textStrong} fontSize={28}>{`Long − short: ${st.spread.toFixed(2)} pp`}</text></>}</Axes>);};
const HEADINGS=["Compare Maturities", "Raise the Short End", "Pass through a Flat Curve", "Read an Inversion Carefully"];
const COPY=["Start with short yield 2% and long yield 4%.", "Raise short yield while holding ten-year yield fixed.", "At short yield 4%, the linear example becomes flat.", "Short yield reaches 5%; the long-minus-short spread is negative."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>An inverted curve has short yields above long yields; it is a signal, not a guaranteed forecast.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={150} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={420} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={630} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:150,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:270,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:210,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:270,transition:'none' as const},
];
