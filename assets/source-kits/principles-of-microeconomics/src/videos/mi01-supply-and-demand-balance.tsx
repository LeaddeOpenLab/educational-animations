import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi01-supply-and-demand-balance.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "At P=7, both schedules have Q=5.",
motion: "Price falls from 9 to 7 as surplus shrinks, then rises from 4 to 7 as shortage shrinks.",
example: "An apple market with inverse demand P=12-Q and supply P=2+Q.",
antiTemplate: "A crossing alone does not show why price adjusts. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Four scenes contrast surplus correction and shortage correction before the common equilibrium; showing just the crossing would omit the price incentives.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'D',fn:q=>12-q,color:COLORS.primary},{name:'S',fn:q=>2+q,color:COLORS.alt}]} marks={[{q:st.qd,p:st.p,label:`Demand ${st.qd.toFixed(1)}`,color:COLORS.accent},{q:st.qs,p:st.p,label:`Supply ${st.qs.toFixed(1)}`,color:COLORS.alt}]} areas={[{points:[[st.qd,st.p-.16],[st.qs,st.p-.16],[st.qs,st.p+.16],[st.qd,st.p+.16]],color:COLORS.warn}]} footer={`Price ${st.p.toFixed(1)} · ${st.qs>st.qd?'surplus':st.qd>st.qs?'shortage':'balanced'} ${st.gap.toFixed(1)}`}/>);};
const BEATS = ["Start with a Surplus", "Unsold Apples Lower the Price", "A Shortage Raises the Price", "Both Plans Agree"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Equilibrium · 1 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Start with a Surplus" frame={frame} size={48} width={650}/>
<Caption text="At a high posted price, sellers plan more units than buyers want." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Equilibrium · 2 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Unsold Apples Lower the Price" frame={frame} size={48} width={650}/>
<Caption text="Unsold inventory creates pressure to cut the price." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+150}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Equilibrium · 3 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="A Shortage Raises the Price" frame={frame} size={48} width={650}/>
<Caption text="At a low price, buyers compete for scarce apples." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+390}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Equilibrium · 4 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Both Plans Agree" frame={frame} size={48} width={650}/>
<Caption text="Demand and supply match at the same price and quantity." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+630}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 150},
{id: 'step2', Comp: Scene2, dur: 240},
{id: 'step3', Comp: Scene3, dur: 240},
{id: 'step4', Comp: Scene4, dur: 270},
];
