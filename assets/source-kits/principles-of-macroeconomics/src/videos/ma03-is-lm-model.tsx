import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma03-is-lm-model.state';

const T = { ...{"rIS": "10 - 0.01Y", "rLM": "2 + 0.005Y", "shiftIS": [0, 1], "equilibria": [[533.333, 4.667], [600, 5]]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Use the same rIS, rLM functions with shiftIS changing and solve both intersections numerically.",
  motion: "Intersection moves to higher Y and higher r; old IS remains dashed for comparison.",
  example: "Government spending increases while money supply is fixed.",
  antiTemplate: "This topic uses IslmModel to show Increase autonomous spending, shifting IS to the right/up at each income.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate Initial IS and LM cross at (Y0,r0). from Increase autonomous spending, shifting IS to the right/up at each income. and end with Use the same rIS, rLM functions with shiftIS changing and solve both intersections numerically.",
};
void DESIGN_AUDIT;


const BEATS = ["Axes and initial equilibrium", "Identify IS and LM", "Increase spending and move IS", "Trace the moving intersection", "Recompute new intersection", "Compare ΔY and Δr"];
const COPY = ["Show how a fiscal IS shift changes both equilibrium income and interest rate.", "Fiscal expansion shifts IS", "LM stays fixed", "Income and interest rate both rise", "Solve the shifted IS against the same LM", "LM stays fixed under this fiscal shock; the exact shift depends on the model."];
const TOPIC = "IS–LM model";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><Axes width={1000} height={650} xDomain={[300,700]} yDomain={[2,8]} children={scale=><IslmModel s={scale} rIS={s.rIS} rLM={s.rLM} shiftIS={s.shiftIS} progress={1}/>}/></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={270} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={450} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={600} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 120 },
  { id: 'mechanism', Comp: Scene3, dur: 180 },
  { id: 'test', Comp: Scene4, dur: 150 },
  { id: 'result', Comp: Scene5, dur: 150 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
