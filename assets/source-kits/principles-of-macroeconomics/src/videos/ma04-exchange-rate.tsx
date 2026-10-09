import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma04-exchange-rate.state';

const T = { ...{"quote": "domestic units per foreign unit", "Qd": "120 - 20e", "Qs": "20 + 20e", "shiftS": [0, 20], "e_before": 2.5, "e_after": 2}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Axis unit, computed quote and appreciation label follow the same convention.",
  motion: "The new intersection has a lower domestic-units-per-foreign quote, so one domestic unit buys more foreign currency: domestic appreciation.",
  example: "Exporters earn more foreign currency and sell it for domestic currency.",
  antiTemplate: "This topic uses ExchangeRate to show Exporters supply more foreign currency at each quote.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate Foreign-currency demand and supply intersect at the initial domestic-units-per-foreign quote. from Exporters supply more foreign currency at each quote. and end with Axis unit, computed quote and appreciation label follow the same convention.",
};
void DESIGN_AUDIT;


const BEATS = ["Define domestic units per foreign unit", "Exporters shift foreign-currency supply right", "Compute the lower quote", "Interpret domestic appreciation"];
const COPY = ["Connect foreign-currency supply to a consistent domestic-per-foreign exchange-rate quote.", "Quote one foreign unit in domestic currency", "More foreign supply lowers this quote", "A lower quote means domestic appreciation"];
const TOPIC = "Exchange rate";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><Axes width={1000} height={650} xDomain={[40,120]} yDomain={[1,4]} xLabel="foreign currency quantity" yLabel={s.quote} children={scale=><ExchangeRate s={scale} Qd={s.Qd} Qs={s.Qs} shiftS={s.shiftS} progress={1}/>}/></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={390} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={630} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 240 },
  { id: 'mechanism', Comp: Scene3, dur: 240 },
  { id: 'test', Comp: Scene4, dur: 270 },
];
