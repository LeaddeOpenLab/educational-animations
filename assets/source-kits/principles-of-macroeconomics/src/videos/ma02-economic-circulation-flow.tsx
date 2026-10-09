import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma02-economic-circulation-flow.state';

const T = { ...{"labor_value": 100, "wages": 100, "household_consumption": 80, "taxes": 20, "government_purchases": 20}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "At the end, follow one dollar from wages through household spending back to firms, with labor/goods on reversed lanes.",
  motion: "Each new labeled flow changes a sector's inflow/outflow, while the real counterpart points in the opposite direction.",
  example: "Households supply labor to firms; firms pay wages; households buy final goods; taxes and public spending add government.",
  antiTemplate: "This topic uses CircularFlow to show Send labor to firms, wages to households, consumption to firms, goods to households, then tax and public purchase.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate All sectors present with zero traced flow. from Send labor to firms, wages to households, consumption to firms, goods to households, then tax and public purchase. and end with At the end, follow one dollar from wages through household spending back to firms, with labor/goods on reversed lanes.",
};
void DESIGN_AUDIT;


const BEATS = ["Sectors", "Labor and wages", "Goods and consumption", "Follow money and real goods in opposite directions", "Taxes and government purchases", "Trace one closed money loop"];
const COPY = ["Trace money and real goods in opposite directions around the economy.", "Resources flow one way", "Payments flow the other", "A circular flow links income and spending", "At the end, follow one dollar from wages through household spending back to firms, with labor/goods on reversed lanes.", "Do not imply money and goods travel in the same direction on one transaction."];
const TOPIC = "Economic circulation flow";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1500 900" width="100%" height="100%"><CircularFlow cx={720} cy={440} r={270} flows={s.visibleFlows}/><text x={100} y={840}>{`Money loop ${s.moneyLoopClosed?'closed':'building'}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={120} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={300} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={450} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={600} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 120 },
  { id: 'setup', Comp: Scene2, dur: 180 },
  { id: 'mechanism', Comp: Scene3, dur: 150 },
  { id: 'test', Comp: Scene4, dur: 150 },
  { id: 'result', Comp: Scene5, dur: 150 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
