import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi08-manufacturers-output-decisions.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Continuous optimum Q=5 maximizes profit at seventeen; the sixth unit reduces profit.",
motion: "Add output one unit at a time; revenue and cost bars change, and profit first rises then falls.",
example: "A price-taking firm faces P=12 and TC=8+2Q+Q².",
antiTemplate: "MR=MC is the marginal rule; total revenue is not profit. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Five scenes compare actual revenue and cost totals, marginal gains, a profit peak, an excessive unit and the rule that explains the observed peak.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<svg data-k="figure" width={950} height={620} viewBox="0 0 950 620" style={{fontFamily:FONT}}>
 <text x={90} y={60} fontSize={28} fill={COLORS.textStrong}>Output Q = {st.q} · price = {st.mr.toFixed(0)}</text>
 <line x1={90} x2={850} y1={335} y2={335} stroke={COLORS.axis}/>
 <rect x={150} y={335-st.tr*2.1} width={200} height={st.tr*2.1} fill={COLORS.accent}/><rect x={450} y={335-st.tc*2.1} width={200} height={st.tc*2.1} fill={COLORS.alt}/>
 <text x={150} y={375} fontSize={27} fill={COLORS.accent}>Revenue {st.tr.toFixed(0)}</text><text x={450} y={375} fontSize={27} fill={COLORS.alt}>Cost {st.tc.toFixed(0)}</text>
 <text x={90} y={440} fontSize={34} fill={st.profit>=0?COLORS.result:COLORS.warn}>Profit = {st.profit.toFixed(0)}</text>
 {Array.from({length:8},(_,q)=><g key={q}><circle cx={150+q*85} cy={535-(10*q-q*q-8)*3} r={q===st.q?12:6} fill={q===st.q?COLORS.result:COLORS.textDim}/><text x={150+q*85} y={607} fontSize={22} textAnchor="middle" fill={COLORS.textDim}>{q}</text></g>)}
 <text x={670} y={110} fontSize={27} fill={COLORS.textStrong}>MR {st.mr.toFixed(0)}</text><text x={670} y={155} fontSize={27} fill={COLORS.textStrong}>MC {st.mc.toFixed(0)}</text>
 </svg>);};
const BEATS = ["A Price-Taking Firm", "Add a Profitable Unit", "Find the Profit Peak", "One Unit Too Many", "Use the Marginal Rule"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Profit Maximization · 1 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="A Price-Taking Firm" frame={frame} size={48} width={650}/>
<Caption text="Revenue is price times quantity; profit subtracts total cost." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Profit Maximization · 2 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Add a Profitable Unit" frame={frame} size={48} width={650}/>
<Caption text="Early units add more revenue than cost." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+150}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Profit Maximization · 3 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Find the Profit Peak" frame={frame} size={48} width={650}/>
<Caption text="Five units reach the top of the profit curve." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+330}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Profit Maximization · 4 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="One Unit Too Many" frame={frame} size={48} width={650}/>
<Caption text="The sixth unit costs more at the margin than it earns." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+570}/></div>
</div>
);
const Scene5:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Profit Maximization · 5 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Use the Marginal Rule" frame={frame} size={48} width={650}/>
<Caption text="Choose output where marginal revenue meets marginal cost." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+750}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 150},
{id: 'step2', Comp: Scene2, dur: 180},
{id: 'step3', Comp: Scene3, dur: 240},
{id: 'step4', Comp: Scene4, dur: 180},
{id: 'step5', Comp: Scene5, dur: 150},
];
