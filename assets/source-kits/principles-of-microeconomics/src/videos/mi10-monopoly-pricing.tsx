import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi10-monopoly-pricing.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Monopoly Q=4,P=10; competitive benchmark Q=6,P=8; lost surplus is six.",
motion: "Choose Q where MR=14-2Q meets MC, then trace vertically to demand to set price.",
example: "A single seller faces inverse demand P=14-Q and MC=2+Q.",
antiTemplate: "Reading price from MR incorrectly gives six rather than ten. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Five scenes distinguish demand from marginal revenue, quantity choice, price readout, the competitive counterfactual and the lost surplus region.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'Demand',fn:q=>14-q,color:COLORS.primary},{name:'MR',fn:q=>14-2*q,color:COLORS.accent},{name:'MC',fn:q=>2+q,color:COLORS.alt}]} marks={[{q:st.q,p:st.readPrice,label:f<450?'Choose Q':f<630?'Read upward':'Monopoly price',color:COLORS.accent},{q:6,p:8,label:'Competition',color:COLORS.result}]} areas={f>=630?[{points:[[4,6],[6,8],[4,10]],color:COLORS.warn}]:[]} footer={`Q ${st.q.toFixed(1)} · MR ${st.mr.toFixed(1)} · P ${st.price.toFixed(1)} · DWL ${f>=630?st.dwl.toFixed(0):'—'}`}/>);};
const BEATS = ["Demand Is Above Marginal Revenue", "Choose Quantity at MR = MC", "Read Price from Demand", "Compare Competitive Trade", "A Smaller Quantity at a Higher Price"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Monopoly Pricing · 1 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Demand Is Above Marginal Revenue" frame={frame} size={48} width={650}/>
<Caption text="Selling an extra unit requires lowering price on all units." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Monopoly Pricing · 2 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Choose Quantity at MR = MC" frame={frame} size={48} width={650}/>
<Caption text="Marginal revenue meets marginal cost at quantity four." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+150}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Monopoly Pricing · 3 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Read Price from Demand" frame={frame} size={48} width={650}/>
<Caption text="Follow the chosen quantity upward to the demand curve." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+330}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Monopoly Pricing · 4 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Compare Competitive Trade" frame={frame} size={48} width={650}/>
<Caption text="Competition would trade six units at price eight." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+570}/></div>
</div>
);
const Scene5:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Monopoly Pricing · 5 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="A Smaller Quantity at a Higher Price" frame={frame} size={48} width={650}/>
<Caption text="The untraded gains create a six-unit surplus loss." frame={frame} start={20} top={330} width={630} size={30}/>
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
