import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi02-relatively-static.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Compare both equilibrium coordinates, not a path forecast.",
motion: "Demand moves right while the old equilibrium stays as a reference; the new intersection moves from (5,7) to (7,9).",
example: "A population increase shifts apple demand from P=12-Q to P=16-Q with supply fixed.",
antiTemplate: "Comparative statics compares endpoints; it does not predict adjustment speed. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Four scenes separate the held-fixed supply schedule, demand shock, new intersection and endpoint comparison, avoiding a false dynamic path interpretation.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'D₀',fn:q=>12-q,color:COLORS.primary,dashed:true},{name:'D₁',fn:q=>12+st.shift-q,color:COLORS.accent},{name:'S',fn:q=>2+q,color:COLORS.alt}]} marks={[{q:5,p:7,label:'Old E',color:COLORS.textDim},{q:st.q,p:st.p,label:'New E'}]} footer={`Demand shift +${st.shift.toFixed(1)} · Q* ${st.q.toFixed(1)} · P* ${st.p.toFixed(1)}`}/>);};
const BEATS = ["Hold Supply Fixed", "More Buyers at Each Price", "Find the New Intersection", "Compare Two Equilibria"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Comparative Statics · 1 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Hold Supply Fixed" frame={frame} size={48} width={650}/>
<Caption text="Only demand changes; the supply schedule stays fixed." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Comparative Statics · 2 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="More Buyers at Each Price" frame={frame} size={48} width={650}/>
<Caption text="A population increase adds buyers at every price." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+180}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Comparative Statics · 3 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Find the New Intersection" frame={frame} size={48} width={650}/>
<Caption text="The shifted demand curve meets the unchanged supply curve." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+360}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Comparative Statics · 4 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Compare Two Equilibria" frame={frame} size={48} width={650}/>
<Caption text="These are equilibrium comparisons, not a forecast of the path." frame={frame} start={20} top={330} width={630} size={30}/>
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
