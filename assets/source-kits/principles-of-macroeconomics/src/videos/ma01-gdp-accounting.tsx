import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma01-gdp-accounting.state';

const T = { ...{"components": {"C": 600, "I": 200, "G": 250, "NX": -50}, "GDP": 1000}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Segment amounts and final GDP equal the displayed formula Y=C+I+G+NX; the negative segment is outside the positive stack.",
  motion: "Running total grows with first three components then falls by negative NX.",
  example: "A small economy records household spending, business investment, government purchases and net exports.",
  antiTemplate: "This topic uses GdpBars to show Add C, I, G, then subtract imports exceeding exports.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate No components counted; GDP total is zero. from Add C, I, G, then subtract imports exceeding exports. and end with Segment amounts and final GDP equal the displayed formula Y=C+I+G+NX; the negative segment is outside the positive stack.",
};
void DESIGN_AUDIT;


const BEATS = ["Spending categories", "Build domestic spending: C + I + G", "Subtract negative net exports", "Reconcile displayed total"];
const COPY = ["Compute GDP by expenditure and distinguish a negative net export contribution.", "Add consumption, investment and government purchases", "NX = −50 reduces GDP from 1,050 to 1,000", "Net exports may reduce the total"];
const TOPIC = "GDP accounting";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1300 500" width="100%" height="100%"><GdpBars x={100} y={170} w={1000} components={s.visibleComponents}/><text x={100} y={430}>{`GDP ${s.total}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={360} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={630} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 210 },
  { id: 'mechanism', Comp: Scene3, dur: 270 },
  { id: 'test', Comp: Scene4, dur: 270 },
];
