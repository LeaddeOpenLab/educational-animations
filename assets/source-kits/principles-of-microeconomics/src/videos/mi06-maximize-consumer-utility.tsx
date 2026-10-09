import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi06-maximize-consumer-utility.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "The utility curve touches the budget at (5,5), where MRS equals the price ratio.",
motion: "Move the bundle along the budget from (1,9) to (5,5), then to (8,2); the attainable utility rises then falls.",
example: "A consumer has budget x+y=10 and Cobb-Douglas utility sqrt(xy).",
antiTemplate: "More of one good alone need not raise utility when the other is sacrificed. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Five scenes use the budget constraint, initial imbalance, improving reallocation, overshoot and return to the tangent optimum; overshoot tests the claim.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<UtilityPlane x={st.x} budget={10}/>);};
const BEATS = ["A Fixed Budget", "Try a Lopsided Bundle", "Slide Toward the Tangency", "Go Too Far", "Balance Marginal Utility"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Utility Maximization · 1 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="A Fixed Budget" frame={frame} size={48} width={650}/>
<Caption text="The consumer can afford bundles on or below the line." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Utility Maximization · 2 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Try a Lopsided Bundle" frame={frame} size={48} width={650}/>
<Caption text="Nine units of Y and one of X are feasible but unbalanced." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+150}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Utility Maximization · 3 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Slide Toward the Tangency" frame={frame} size={48} width={650}/>
<Caption text="Reallocation raises utility until the budget line is tangent." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+360}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Utility Maximization · 4 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Go Too Far" frame={frame} size={48} width={650}/>
<Caption text="Eight units of X sacrifice too much of Y." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+600}/></div>
</div>
);
const Scene5:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Utility Maximization · 5 / 5" frame={frame} color={COLORS.accent}/>
<Heading text="Balance Marginal Utility" frame={frame} size={48} width={650}/>
<Caption text="At five of each good, the marginal tradeoff matches prices." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+750}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 150},
{id: 'step2', Comp: Scene2, dur: 210},
{id: 'step3', Comp: Scene3, dur: 240},
{id: 'step4', Comp: Scene4, dur: 150},
{id: 'step5', Comp: Scene5, dur: 150},
];
