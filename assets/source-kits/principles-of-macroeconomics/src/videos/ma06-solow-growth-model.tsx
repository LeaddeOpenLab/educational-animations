import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma06-solow-growth-model.state';

const T = { ...{"f": "sqrt(k)", "save_before": 0.2, "save_after": 0.25, "break_even": 0.05, "k_star_before": 16, "k_star_after": 25, "consumption_before": 3.2, "consumption_after": 3.75}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Capital arrow points right only while s f(k)>(n+δ)k; stops at equality.",
  motion: "At old k*, investment exceeds break-even, capital rises until new k*; output increases and consumption is recalculated.",
  example: "An economy raises the share of output invested while population growth and depreciation remain fixed.",
  antiTemplate: "This topic uses SolowModel to show Increase saving rate s, raising investment at each k.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate Old investment intersects break-even at k0*. from Increase saving rate s, raising investment at each k. and end with Capital arrow points right only while s f(k)>(n+δ)k; stops at equality.",
};
void DESIGN_AUDIT;


const BEATS = ["Three curves", "Identify old steady state", "Raise s and show investment gap", "Follow capital toward the new steady state", "Move capital to new intersection", "Compare output and consumption"];
const COPY = ["Derive capital's motion and the new Solow steady state after a savings increase.", "Investment above break-even adds capital", "Capital grows toward a new steady state", "Capital rises while s f(k) exceeds (n+δ)k", "The motion stops where investment equals break-even", "Higher output does not guarantee higher consumption."];
const TOPIC = "Solow growth model";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><Axes width={1000} height={650} xDomain={[0.1,36]} yDomain={[0,7]} children={scale=><SolowModel s={scale} f={s.f} save={s.save} breakEven={s.breakEven} compare={{save:0.2,label:'old'}} progress={1}/>}/></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={300} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={420} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={600} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 150 },
  { id: 'mechanism', Comp: Scene3, dur: 120 },
  { id: 'test', Comp: Scene4, dur: 180 },
  { id: 'result', Comp: Scene5, dur: 150 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
