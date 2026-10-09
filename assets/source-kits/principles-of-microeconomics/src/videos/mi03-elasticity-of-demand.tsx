import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi03-elasticity-of-demand.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Elastic revenue rises from 36 to 40; inelastic revenue falls to 32.5.",
motion: "Lower P from 6 to 5; quantity and revenue rectangles change in opposite directions across the examples.",
example: "Two local demand curves share P=6,Q=6; elastic slope dQ/dP=-2 versus inelastic slope -0.5.",
antiTemplate: "Slope alone is not elasticity; use percent changes and the starting point. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Five scenes establish the common baseline, local percentage sensitivity, shared price cut, opposing rectangle changes and revenue implication.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'Elastic D',fn:q=>(18-q)/2,color:COLORS.accent},{name:'Inelastic D',fn:q=>18-2*q,color:COLORS.alt}]} marks={[{q:st.qe,p:st.p,label:'Elastic',color:COLORS.accent},{q:st.qi,p:st.p,label:'Inelastic',color:COLORS.alt}]} areas={[{points:[[0,0],[st.qe,0],[st.qe,st.p],[0,st.p]],color:COLORS.accent},{points:[[0,0],[st.qi,0],[st.qi,st.p],[0,st.p]],color:COLORS.alt}]} footer={`P ${st.p.toFixed(1)} · elastic R ${st.re.toFixed(1)} · inelastic R ${st.ri.toFixed(1)}`} yMax={20}/>);};
const BEATS = ["Same Starting Point", "Compute the Point Elasticity", "Cut Both Prices", "Compare Revenue Rectangles", "Elasticity Predicts Revenue"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Price Elasticity of Demand · 1 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Same Starting Point" frame={frame} size={48} width={650}/>
<Caption text="Both demand curves begin at price six and quantity six." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Price Elasticity of Demand · 2 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Compute the Point Elasticity" frame={frame} size={48} width={650}/>
<Caption text="At this point, |ε| equals two versus one-half." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+150}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Price Elasticity of Demand · 3 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Cut Both Prices" frame={frame} size={48} width={650}/>
<Caption text="Move down each demand curve when price falls." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+360}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Price Elasticity of Demand · 4 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Compare Revenue Rectangles" frame={frame} size={48} width={650}/>
<Caption text="Revenue is the area of the price-times-quantity rectangle." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+570}/></div>
</div>
);
const Scene5:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Price Elasticity of Demand · 5 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Elasticity Predicts Revenue" frame={frame} size={48} width={650}/>
<Caption text="A price cut raises revenue only in the elastic example." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+750}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 150},
{id: 'step2', Comp: Scene2, dur: 210},
{id: 'step3', Comp: Scene3, dur: 210},
{id: 'step4', Comp: Scene4, dur: 180},
{id: 'step5', Comp: Scene5, dur: 150},
];
