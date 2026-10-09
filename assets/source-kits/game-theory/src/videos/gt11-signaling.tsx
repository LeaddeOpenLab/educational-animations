import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt11-signaling.state';

const T = { ...{"types": ["High skill", "Low skill"], "wage_gain": 3, "certificate_costs": [1, 4], "net_gains": [2, -1]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Show incentive comparisons for both types before drawing the separate paths; high type's net gain is positive and low type's is negative.",
  motion: "Observed certificate now maps to high type, so employer's action differs by signal.",
  example: "Two worker types may earn a certificate; it is less costly for the high-skill worker.",
  antiTemplate: "This topic uses SignalingModel to show High type takes certificate; low type compares imitation cost with benefit and declines.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate Employer cannot see type and initially treats both types as possible. from High type takes certificate; low type compares imitation cost with benefit and declines. and end with Show incentive comparisons for both types before drawing the separate paths; high type's net gain is positive and low type's is negative.",
};
void DESIGN_AUDIT;


const BEATS = ["Hidden worker types", "Certificate costs by type", "Test imitation incentives", "Compare both types' net gains", "Reveal separating signal paths", "Employer conditions action on observed signal"];
const COPY = ["Explain a separating signal through different type-specific costs and receiver response.", "A signal must be costly in a type-dependent way", "Low type will not imitate", "High type gains 2; low type loses 1", "Only the high type chooses the certificate", "A different colored arrow is not evidence of incentive compatibility."];
const TOPIC = "Signaling";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1500 650" width="100%" height="100%"><SignalingModel x={60} y={130} w={1100} types={s.types} signals={['Certificate','None']} actions={['Hire','Reject']} paths={s.paths} cost={(type,signal)=>signal===0?s.costs[type]:0}/>{s.showComparison?<text x={60} y={550} fontSize={48} fontWeight={700} fill="#117733">{`Certificate net gain: high +${s.netGains[0]} / low ${s.netGains[1]}`}</text>:null}</svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={120} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={270} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={450} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={600} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 120 },
  { id: 'setup', Comp: Scene2, dur: 150 },
  { id: 'mechanism', Comp: Scene3, dur: 180 },
  { id: 'test', Comp: Scene4, dur: 150 },
  { id: 'result', Comp: Scene5, dur: 150 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
