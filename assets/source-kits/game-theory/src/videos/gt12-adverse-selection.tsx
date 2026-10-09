import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt12-adverse-selection.state';

const T = { ...{"quality_range": [0, 1], "seller_value": "10q", "buyer_value": "12q", "q_max_sequence": [1, 0.6, 0.36], "offer_sequence": [6, 3.6, 2.16]}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "At each step the retained quality interval qMax shrinks and the offer is recomputed from that interval.",
  motion: "Remaining average quality falls, buyers lower offer, and another range exits.",
  example: "Used-car market where buyers bid for average quality, prompting the best sellers to leave.",
  antiTemplate: "This topic uses AdverseSelection to show High-quality sellers compare offer with reservation price and exit.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate Quality range includes low and high cars; buyers offer based on its initial average. from High-quality sellers compare offer with reservation price and exit. and end with At each step the retained quality interval qMax shrinks and the offer is recomputed from that interval.",
};
void DESIGN_AUDIT;


const BEATS = ["Quality spectrum", "Initial average-based offer", "First high-quality exit", "Reprice the remaining cars", "Recompute lower offer and second exit", "Identify the spiral"];
const COPY = ["Show the feedback loop behind adverse selection.", "A pooled price can drive good sellers away", "The remaining average quality falls", "The next bid falls too", "At each step the retained quality interval qMax shrinks and the offer is recomputed from that interval.", "Do not confuse high quality leaving with buyers deliberately rejecting it."];
const TOPIC = "Adverse selection";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><Axes width={1000} height={620} xDomain={[0,1]} yDomain={[0,12]} children={scale=><AdverseSelection s={scale} sellerValue={s.sellerValue} buyerValue={s.buyerValue} qMax={s.qMax} progress={1}/>}/></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={300} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={480} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={630} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 150 },
  { id: 'mechanism', Comp: Scene3, dur: 180 },
  { id: 'test', Comp: Scene4, dur: 150 },
  { id: 'result', Comp: Scene5, dur: 120 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
