import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma08-inflation-expectations.state';

const T = { ...{"u_natural": 5, "SRPC": "2 - 0.5(u-5)", "expected_before": 0, "expected_after": 1.5, "inflation_at_u5_before": 2, "inflation_at_u5_after": 3.5}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "At one fixed u, two vertical values differ by the displayed Δexpected; the whole curve changes, not just the point.",
  motion: "At each unemployment value, actual inflation rises by the expectation shift; SRPC translates upward while the natural rate stays fixed.",
  example: "Workers revise expected inflation upward after persistent price increases.",
  antiTemplate: "This topic uses PhillipsCurve expected to show Raise expected inflation and negotiated wage growth.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate Expected inflation is low; at natural unemployment actual inflation matches the old expectation. from Raise expected inflation and negotiated wage growth. and end with At one fixed u, two vertical values differ by the displayed Δexpected; the whole curve changes, not just the point.",
};
void DESIGN_AUDIT;


const BEATS = ["Old curve and expectation", "Revise wage/price expectation", "Shift entire SRPC upward", "Compare old and new inflation at same u"];
const COPY = ["Show inflation expectations shifting the entire short-run Phillips curve.", "Expected inflation enters wage setting", "Higher expectation shifts SRPC up", "The natural unemployment rate does not move"];
const TOPIC = "Inflation expectations";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><Axes width={1000} height={650} xDomain={[2,8]} yDomain={[0,6]} children={scale=><PhillipsCurve s={scale} SRPC={s.SRPC} uNat={s.uNat} expected={s.expected} progress={1}/>}/></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={180} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={390} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={660} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 180 },
  { id: 'setup', Comp: Scene2, dur: 210 },
  { id: 'mechanism', Comp: Scene3, dur: 270 },
  { id: 'test', Comp: Scene4, dur: 240 },
];
