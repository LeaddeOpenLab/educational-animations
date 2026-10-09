import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt04-mixed-strategy.state';

const T = { ...{"p_before": 0, "p_after": 0.65, "draws": ["Left", "Right", "Left", "Left", "Right"]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Display p and 1−p adding to one while outcome tokens alternate across trials.",
  motion: "The allocation of probability mass changes and individual outcomes vary; no single realized kick equals the distribution.",
  example: "A goalkeeper randomizes Left and Right against a penalty taker.",
  antiTemplate: "This topic uses MixedSimplex to show Increase p to a chosen interior probability and run several draws from a fixed sample sequence.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 4 scenes separate p=0: the goalkeeper always chooses Right. from Increase p to a chosen interior probability and run several draws from a fixed sample sequence. and end with Display p and 1−p adding to one while outcome tokens alternate across trials.",
};
void DESIGN_AUDIT;


const BEATS = ["Two pure saves", "Move probability mass to both actions", "Show several draws at fixed p", "Distinguish strategy distribution from one realized action"];
const COPY = ["Explain a mixed strategy as a probability distribution over pure actions.", "Choose probabilities before play", "p + (1−p) = 1", "One outcome is not the strategy"];
const TOPIC = "Mixed strategy";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1100 620" width="100%" height="100%"><text x={70} y={135} fontSize={42} fill="#0b1220">Choose probabilities before the kick</text><rect x={70} y={205} width={900} height={130} rx={18} fill="#e2e8f0"/><rect x={70} y={205} width={900*s.p} height={130} rx={18} fill="#cc6677"/><text x={70} y={400} fontSize={42} fill="#0b1220">{`Left ${s.p.toFixed(2)}  |  Right ${s.otherProbability.toFixed(2)}`}</text><text x={70} y={485} fontSize={40} fill="#117733">{`Latest draw: ${s.realizedAction??'not yet'}`}</text>{T.draws.slice(0,s.drawIndex+1).map((d,i)=><g key={i}><circle cx={105+i*175} cy={565} r={34} fill={d==='Left'?'#cc6677':'#4477aa'}/><text x={105+i*175} y={578} textAnchor="middle" fontSize={34} fontWeight={700} fill="white">{d[0]}</text></g>)}</svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={390} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={690} beat={3}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 240 },
  { id: 'mechanism', Comp: Scene3, dur: 300 },
  { id: 'test', Comp: Scene4, dur: 210 },
];
