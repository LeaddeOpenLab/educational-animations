import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi07-cost-curve.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "At Q=4, MC and ATC both equal ten, while AFC continues falling.",
motion: "Increase Q through four; MC=2+2Q crosses the falling then rising ATC at its minimum.",
example: "A firm has TC=16+2Q+Q² and averages ATC=16/Q+2+Q, AVC=2+Q.",
antiTemplate: "MC equals ATC at the average minimum, not everywhere. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Four scenes distinguish total-cost components, fixed-cost spreading, the marginal pull on averages and the exact minimum crossing.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'MC',fn:q=>2+2*q,color:COLORS.accent},{name:'ATC',fn:q=>16/Math.max(.2,q)+2+q,color:COLORS.alt},{name:'AVC',fn:q=>2+q,color:COLORS.primary}]} marks={[{q:st.q,p:st.atc,label:'Current ATC',color:COLORS.alt},{q:4,p:10,label:'Minimum ATC'}]} footer={`Q ${st.q.toFixed(1)} · AFC ${st.afc.toFixed(1)} · MC ${st.mc.toFixed(1)}`} xMax={8} yMax={24}/>);};
const BEATS = ["Separate Fixed and Variable Cost", "Spread Fixed Cost", "Marginal Cost Pulls the Average", "The Crossing Is the Minimum"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Cost Curves · 1 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Separate Fixed and Variable Cost" frame={frame} size={48} width={650}/>
<Caption text="Total cost includes a fixed sixteen plus variable cost." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Cost Curves · 2 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Spread Fixed Cost" frame={frame} size={48} width={650}/>
<Caption text="More units reduce fixed cost per unit." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+180}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Cost Curves · 3 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Marginal Cost Pulls the Average" frame={frame} size={48} width={650}/>
<Caption text="Marginal cost below average pulls the average down." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+390}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Cost Curves · 4 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="The Crossing Is the Minimum" frame={frame} size={48} width={650}/>
<Caption text="MC crosses ATC at its minimum, where both equal ten." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+630}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 180},
{id: 'step2', Comp: Scene2, dur: 210},
{id: 'step3', Comp: Scene3, dur: 240},
{id: 'step4', Comp: Scene4, dur: 270},
];
