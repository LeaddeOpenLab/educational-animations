import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm07-behavioral-bias.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Make reference-dependent loss aversion visible for equal-sized monetary gains and losses. Equal monetary losses have larger subjective magnitude than equal gains in this prospect-theory example.",
motion: "Start at the reference point with subjective value zero. Move to a gain of 10 along the concave gain branch. Return through the reference and move to a loss of 10 along the steeper loss branch. Compare subjective gain and loss magnitudes for equal monetary amounts.",
example: "Start at the reference point with subjective value zero.",
antiTemplate: "Subjective value is illustrative; it is not dollars, utility certainty or a universal measured parameter. Specific objects are reference point zero, gain 10, loss 10, prospect value function, current outcome; these implement the topic’s quantitative causal sequence.",
sceneRationale: "4 scenes are needed to distinguish Evaluate Relative to a Reference; An Equal-Sized Gain; An Equal-Sized Loss; Loss Feels Larger in This Model. Removing the comparison or final interpretation risks confusing Subjective value is illustrative; it is not dollars, utility certainty or a universal measured parameter.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<Axes width={900} height={640} xDomain={[-15,15]} yDomain={[-24,16]} xTicks={[-10,0,10]} yTicks={[-20,0,10]} xLabel="Gain / loss relative to reference" yLabel="Subjective value (illustrative)" pad={{l:90,r:60,t:80,b:80}}>{s=><><Curve s={s} pts={sampleFn(st.curve,-15,15)} color={C.primary} progress={1}/><circle cx={s.px(st.x)} cy={s.py(st.value)} r={12} fill={st.x>=0?C.primary:C.result}/><line x1={s.px(st.x)} x2={s.px(st.x)} y1={s.py(0)} y2={s.py(st.value)} stroke={C.accent} strokeWidth={3}/><text x={s.px(-13)} y={35} fill={C.accent} fontSize={27}>{`Money ${st.x.toFixed(1)} · value ${st.value.toFixed(1)}`}</text></>}</Axes>);};
const HEADINGS=["Evaluate Relative to a Reference", "An Equal-Sized Gain", "An Equal-Sized Loss", "Loss Feels Larger in This Model"];
const COPY=["Start at the reference point with subjective value zero.", "Move to a gain of 10 along the concave gain branch.", "Return through the reference and move to a loss of 10 along the steeper loss branch.", "Compare subjective gain and loss magnitudes for equal monetary amounts."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Equal monetary losses have larger subjective magnitude than equal gains in this prospect-theory example.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={150} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={360} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={630} step={3}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:150,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:210,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:270,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:240,transition:'none' as const},
];
