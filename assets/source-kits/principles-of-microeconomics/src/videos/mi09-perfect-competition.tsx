import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './mi09-perfect-competition.state';
import {MarketDiagram,UtilityPlane} from '../components/Market';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "Price reaches min ATC ten; each firm produces four and economic profit reaches zero.",
motion: "Entry increases market supply and lowers market price from 14 to 10; each firm contracts from six to four.",
example: "A competitive market contains many identical firms with TC=16+2Q+Q².",
antiTemplate: "Zero economic profit includes normal returns; it is not zero sales. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Four scenes connect positive profit to entry, market supply expansion, individual firm output and long-run normal returns; the aggregate and firm values both change.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<MarketDiagram curves={[{name:'Demand',fn:q=>26-q,color:COLORS.primary},{name:'S before',fn:q=>2+q,color:COLORS.alt,dashed:true},{name:'S after',fn:q=>2+q-st.entry,color:COLORS.accent}]} marks={[{q:st.marketQ,p:st.p,label:'Market E'}]} xMax={22} yMax={28} footer={`Market P ${st.p.toFixed(1)} · firm q ${st.q.toFixed(1)} · profit ${st.profit.toFixed(1)}`}/>);};
const BEATS = ["Positive Profit Attracts Entry", "Market Supply Expands", "Each Firm Adjusts Output", "Long-Run Zero Economic Profit"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Perfect Competition · 1 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Positive Profit Attracts Entry" frame={frame} size={48} width={650}/>
<Caption text="Identical firms earn positive economic profit at price fourteen." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Perfect Competition · 2 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Market Supply Expands" frame={frame} size={48} width={650}/>
<Caption text="New firms expand market supply and lower the price." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+180}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Perfect Competition · 3 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Each Firm Adjusts Output" frame={frame} size={48} width={650}/>
<Caption text="Each price taker chooses its own quantity at P = MC." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+390}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Perfect Competition · 4 / 4" frame={frame} color={COLORS.accent}/>
<Heading text="Long-Run Zero Economic Profit" frame={frame} size={48} width={650}/>
<Caption text="Price ten equals minimum ATC; normal returns are included." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+660}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 180},
{id: 'step2', Comp: Scene2, dur: 210},
{id: 'step3', Comp: Scene3, dur: 270},
{id: 'step4', Comp: Scene4, dur: 240},
];
