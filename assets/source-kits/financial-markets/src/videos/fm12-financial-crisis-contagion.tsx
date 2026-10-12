import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {Backdrop} from '../components/Backdrop';
import {stateAt} from './fm12-financial-crisis-contagion.state';
const T = {fps:30,state:stateAt};
const DESIGN_AUDIT =  {
visualArgument: "Show a stylized counterparty loss propagating until capital buffers absorb it. Counterparty exposure can transmit insolvency; adequate capital can absorb a loss and stop propagation.",
motion: "Four banks start with positive capital; B and D hold claims on A, and C holds a claim on B. A receives external loss 10 and becomes insolvent. Zero-recovery illustration: B loses 6 and D loses 2 on A; B becomes insolvent but D retains capital 4. B default passes loss 4 to C, exhausting its capital 3. D remains solvent because its capital buffer exceeds the loss.",
example: "Four banks start with positive capital; B and D hold claims on A, and C holds a claim on B.",
antiTemplate: "Stylized zero-recovery chain; real recovery rates and interventions can change the outcome. Specific objects are bank A capital 8, bank B capital 5, bank C capital 3, bank D capital 6, credit losses, moving loss tokens; these implement the topic’s quantitative causal sequence.",
sceneRationale: "5 scenes are needed to distinguish Four Banks with Capital Buffers; An External Loss Hits Bank A; Credit Loss Reaches the Holders; A Second Default Transmits Loss; A Larger Buffer Stops the Chain. Removing the comparison or final interpretation risks confusing Stylized zero-recovery chain; real recovery rates and interventions can change the outcome.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.state(f);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="credit loss propagation"><g stroke={C.axis} strokeWidth={3}><line x1={190} y1={130} x2={450} y2={330}/><line x1={190} y1={130} x2={190} y2={480}/><line x1={450} y1={330} x2={730} y2={480}/></g><BankBalance x={190} y={130} name="A" capital={8} loss={st.a} failed={st.failed[0]}/><BankBalance x={450} y={330} name="B" capital={5} loss={st.b} failed={st.failed[1]}/><BankBalance x={730} y={480} name="C" capital={3} loss={st.c} failed={st.failed[2]}/><BankBalance x={190} y={480} name="D" capital={6} loss={st.d} failed={false}/>{st.p>0&&st.p<1?<g><circle cx={190+260*st.p} cy={130+200*st.p} r={23} fill={C.result}/><circle cx={190} cy={130+350*st.p} r={17} fill={C.result}/></g>:null}{st.q>0&&st.q<1?<circle cx={450+280*st.q} cy={330+150*st.q} r={23} fill={C.result}/>:null}<text x={450} y={45} fill={C.textStrong} fontSize={27} textAnchor="middle">Credit losses reduce the holders’ capital</text></svg>);};
const HEADINGS=["Four Banks with Capital Buffers", "An External Loss Hits Bank A", "Credit Loss Reaches the Holders", "A Second Default Transmits Loss", "A Larger Buffer Stops the Chain"];
const COPY=["Four banks start with positive capital; B and D hold claims on A, and C holds a claim on B.", "A receives external loss 10 and becomes insolvent.", "Zero-recovery illustration: B loses 6 and D loses 2 on A; B becomes insolvent but D retains capital 4.", "B default passes loss 4 to C, exhausting its capital 3.", "D remains solvent because its capital buffer exceeds the loss."];
const Stage=({frame,elapsed,step}:{frame:number;elapsed:number;step:number})=> <div data-root style={{position:'absolute',inset:0,fontFamily:FONT}}>
 <Backdrop width={1920} height={1080}/>
 <div style={{position:'absolute',inset:0,padding:'70px 108px 80px',boxSizing:'border-box',display:'flex',gap:82,alignItems:'center'}}>
  <div style={{flex:'0 0 650px',display:'flex',flexDirection:'column',gap:34}}>
   <div data-k="text" data-n="course kicker" style={{fontSize:22,color:C.accent,fontWeight:700,letterSpacing:4}}>FINANCIAL MARKETS</div>
   <div data-k="text" data-n="scene heading" style={{fontSize:54,lineHeight:1.12,color:C.textStrong,fontWeight:800}}>{HEADINGS[step]}</div>
   <div data-k="text" data-n="cause and operation" style={{fontSize:31,lineHeight:1.45,color:C.textMuted}}>{COPY[step]}</div>
   <div data-k="text" data-n="interpretation" style={{fontSize:25,lineHeight:1.45,color:C.textStrong}}>Counterparty exposure can transmit insolvency; adequate capital can absorb a loss and stop propagation.</div>
  </div>
  <div data-k="figure" data-n="topic mechanism" style={{flex:'0 0 950px',height:680,display:'flex',alignItems:'center',justifyContent:'center'}}><Mechanism f={elapsed+frame}/></div>
 </div>
</div>;
const Scene0:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={0} step={0}/>;
const Scene1:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={150} step={1}/>;
const Scene2:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={330} step={2}/>;
const Scene3:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={540} step={3}/>;
const Scene4:React.FC<{frame:number}>=({frame})=><Stage frame={frame} elapsed={750} step={4}/>;
export const SCENES = [
 {id:'setup',Comp:Scene0,dur:150,transition:'none' as const},
 {id:'mechanism',Comp:Scene1,dur:180,transition:'none' as const},
 {id:'comparison',Comp:Scene2,dur:210,transition:'none' as const},
 {id:'conclusion',Comp:Scene3,dur:210,transition:'none' as const},
 {id:'closing',Comp:Scene4,dur:180,transition:'none' as const},
];
