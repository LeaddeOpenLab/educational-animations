import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi05-deadweight-loss.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "The triangle reaches area nine at Q=2; lost trades have MB greater than MC.",
motion: "Remove units from Q=5 to Q=2, shade the foregone positive-surplus trades and integrate their value.",
example: "A quota contracts trade in a market with MB=12-Q and MC=2+Q.",
antiTemplate: "Tax revenue is a transfer; the lost gains from trade are the loss. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Four scenes move from efficiency to restriction to the excluded trades and their integrated loss, making the triangle represent a concrete mechanism.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'MB',fn:q=>12-q,color:COLORS.primary},{name:'MC',fn:q=>2+q,color:COLORS.alt}]} marks={[{q:st.q,p:st.mb,label:'Excluded benefit',color:COLORS.accent},{q:st.q,p:st.mc,label:'Excluded cost',color:COLORS.alt}]} areas={[{points:[[st.q,st.mc],[5,7],[st.q,st.mb]],color:COLORS.warn}]} footer={`Trade limit Q ${st.q.toFixed(1)} · lost gains = ${st.loss.toFixed(2)}`}/>);};
const BEATS = ["Efficient Trade at Five", "Impose a Quantity Limit", "Reveal the Lost Trades", "Sum the Foregone Gains"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Deadweight Loss · 1 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Efficient Trade at Five" frame={frame} size={48} width={650}/>
<Caption text="Trade continues while marginal benefit exceeds marginal cost." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Deadweight Loss · 2 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Impose a Quantity Limit" frame={frame} size={48} width={650}/>
<Caption text="A binding quota removes mutually beneficial units." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+180}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Deadweight Loss · 3 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Reveal the Lost Trades" frame={frame} size={48} width={650}/>
<Caption text="The excluded benefit-cost gap forms the loss region." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+360}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Deadweight Loss · 4 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Sum the Foregone Gains" frame={frame} size={48} width={650}/>
<Caption text="Integrate the missing gains; the lost triangle has area nine." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+630}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 180},
{id: 'step2', Comp: Scene2, dur: 180},
{id: 'step3', Comp: Scene3, dur: 270},
{id: 'step4', Comp: Scene4, dur: 270},
];
