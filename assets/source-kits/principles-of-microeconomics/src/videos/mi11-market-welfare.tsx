import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi11-market-welfare.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Consumer and producer surplus are each 12.5; total gains peak at 25.",
motion: "Accumulate value and cost for units from zero to five, split total gains at P=7, then try a sixth unit with negative gains.",
example: "Consumers and producers trade with demand P=12-Q and supply P=2+Q.",
antiTemplate: "Market price divides surplus; it is not the entire social value. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Five scenes construct gains from trades, sum them, split the total by price, test a harmful extra unit and return to the efficient total.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'MB',fn:q=>12-q,color:COLORS.primary},{name:'MC',fn:q=>2+q,color:COLORS.alt}]} marks={[{q:st.q,p:st.mb,label:'Next benefit',color:COLORS.accent}]} areas={[{points:[[0,7],[st.q,7],[st.q,12-st.q],[0,12]],color:COLORS.primary},{points:[[0,2],[st.q,2+st.q],[st.q,7],[0,7]],color:COLORS.alt}]} footer={`Q ${st.q.toFixed(1)} · CS ${st.cs.toFixed(1)} + PS ${st.ps.toFixed(1)} = ${st.total.toFixed(1)}`}/>);};
const BEATS = ["Trace Gains from Each Trade", "Build Total Surplus", "Split Gains at the Market Price", "A Sixth Trade Destroys Value", "Maximize Total Gains"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Welfare · 1 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Trace Gains from Each Trade" frame={frame} size={48} width={650}/>
<Caption text="Every unit has a willingness to pay and a resource cost." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Welfare · 2 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Build Total Surplus" frame={frame} size={48} width={650}/>
<Caption text="Add the benefit-cost gaps from the first five trades." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+150}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Welfare · 3 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Split Gains at the Market Price" frame={frame} size={48} width={650}/>
<Caption text="Price seven divides the gains between buyers and sellers." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+360}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Welfare · 4 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="A Sixth Trade Destroys Value" frame={frame} size={48} width={650}/>
<Caption text="For unit six, marginal cost exceeds marginal benefit." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+600}/></div>
</div>
);
const Scene5:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Market Welfare · 5 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Maximize Total Gains" frame={frame} size={48} width={650}/>
<Caption text="Total surplus peaks at five units, with twenty-five in gains." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+780}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 150},
{id: 'step2', Comp: Scene2, dur: 210},
{id: 'step3', Comp: Scene3, dur: 240},
{id: 'step4', Comp: Scene4, dur: 180},
{id: 'step5', Comp: Scene5, dur: 120},
];
