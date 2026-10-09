import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma07-phillips-curve.state';

const T = { ...{"u_natural": 5, "baseline_inflation": 2, "stimulus_unemployment": 3, "short_run_inflation": 3, "expected_after": 1, "long_run_inflation": 3}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "One movement follows SRPC; the longer-run movement ends on the LRPC rather than staying at permanently lower unemployment.",
  motion: "Inflation rises in the short run; later wage/price adjustment moves the economy back toward natural unemployment at higher inflation.",
  example: "Demand stimulus briefly lowers unemployment below its natural rate.",
  antiTemplate: "This topic uses PhillipsCurve to show Demand stimulus moves the point along the given short-run curve toward lower unemployment.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate Economy begins at natural unemployment and baseline inflation. from Demand stimulus moves the point along the given short-run curve toward lower unemployment. and end with One movement follows SRPC; the longer-run movement ends on the LRPC rather than staying at permanently lower unemployment.",
};
void DESIGN_AUDIT;


const BEATS = ["Axes and natural rate", "Stimulus along SRPC", "Adjustment toward LRPC", "Compare horizons"];
const COPY = ["Distinguish a short-run Phillips tradeoff from the long-run natural-rate locus.", "A short-run move trades lower unemployment for higher inflation", "The long-run unemployment rate returns", "The horizons differ"];
const TOPIC = "Phillips Curve";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><Axes width={1000} height={650} xDomain={[2,8]} yDomain={[0,5]} children={scale=><><PhillipsCurve s={scale} SRPC={s.SRPC} uNat={s.uNat} expected={s.expected} progress={1}/><circle cx={scale.px(s.u)} cy={scale.py(s.inflation)} r={12} fill="red"/></>}/></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={420} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={660} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 270 },
  { id: 'mechanism', Comp: Scene3, dur: 240 },
  { id: 'test', Comp: Scene4, dur: 240 },
];
