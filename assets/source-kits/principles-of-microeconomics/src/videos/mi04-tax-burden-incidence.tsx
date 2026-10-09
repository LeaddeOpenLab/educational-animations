import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi04-tax-burden-incidence.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Pc-Pp=4; buyer and seller each bear two per unit in this symmetric example.",
motion: "The supply curve moves up, buyer and seller prices separate to 9 and 5; quantity contracts to three.",
example: "A per-unit tax grows from zero to four in a linear apple market.",
antiTemplate: "The statutory taxpayer does not determine economic incidence. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Four scenes show the no-tax baseline, actual supply displacement, two prices and resulting contraction; buyer and seller burdens need a stable comparison.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'D',fn:q=>12-q,color:COLORS.primary},{name:'S',fn:q=>2+q,color:COLORS.alt},{name:'S + tax',fn:q=>2+q+st.tax,color:COLORS.accent}]} marks={[{q:st.q,p:st.pc,label:'Buyer price',color:COLORS.accent},{q:st.q,p:st.pp,label:'Seller price',color:COLORS.alt}]} areas={[{points:[[0,st.pp],[st.q,st.pp],[st.q,st.pc],[0,st.pc]],color:COLORS.result}]} footer={`Tax ${st.tax.toFixed(1)} · buyers +${st.consumer.toFixed(1)} · sellers −${st.producer.toFixed(1)}`}/>);};
const BEATS = ["Before the Tax", "Insert the Tax Wedge", "Split the Burden", "The Wedge Reduces Trade"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Tax Incidence · 1 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Before the Tax" frame={frame} size={48} width={650}/>
<Caption text="Buyer and seller prices are equal before the policy." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Tax Incidence · 2 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Insert the Tax Wedge" frame={frame} size={48} width={650}/>
<Caption text="Each traded unit now carries a tax wedge." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+180}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Tax Incidence · 3 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Split the Burden" frame={frame} size={48} width={650}/>
<Caption text="The two price changes add up to the tax." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+420}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Tax Incidence · 4 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="The Wedge Reduces Trade" frame={frame} size={48} width={650}/>
<Caption text="The less elastic side generally bears more of the burden." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+660}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 180},
{id: 'step2', Comp: Scene2, dur: 240},
{id: 'step3', Comp: Scene3, dur: 240},
{id: 'step4', Comp: Scene4, dur: 240},
];
