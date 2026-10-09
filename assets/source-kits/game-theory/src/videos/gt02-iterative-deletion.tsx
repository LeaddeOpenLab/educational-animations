import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { PayoffMatrix, MixedSimplex, GameTree, SignalingModel, AdverseSelection } from '../components/Game';
import type { TreeNode } from '../components/Game';
import { stateAt } from './gt02-iterative-deletion.state';

const T = { ...{"rows": ["Standard", "Premium", "Basic"], "cols": ["Regular", "Niche", "Plus"], "payoffs": [[[4, 3], [4, 2], [4, 5]], [[2, 0], [2, 1], [2, 0]], [[3, 3], [5, 2], [1, 0]]], "first_delete_row": "Premium", "then_delete_col": "Niche"}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Second crossed-out column is absent from the original full-game dominance result and appears only after the row deletion.",
  motion: "Premium vanishes first; only then is B's Niche column strictly dominated and removed.",
  example: "A 3×3 product launch game where A's Premium line is dominated first, then B's niche response becomes dominated in the remaining rows.",
  antiTemplate: "This topic uses PayoffMatrix + dominatedStrategies to show Compare Premium with Standard for every B column and delete Premium; recompute B's payoffs on remaining rows.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 6 scenes separate All three actions for each firm are available. from Compare Premium with Standard for every B column and delete Premium; recompute B's payoffs on remaining rows. and end with Second crossed-out column is absent from the original full-game dominance result and appears only after the row deletion.",
};
void DESIGN_AUDIT;


const BEATS = ["Full action menu", "Compare Premium versus Standard across all columns", "Delete Premium row", "Recheck the remaining columns", "Recompute B's choices in the reduced game", "Delete Niche and identify the survivor set"];
const COPY = ["Show why iterative deletion requires recomputing the reduced game.", "Strictly worse in every remaining case", "Delete one action", "Recheck the smaller game", "Second crossed-out column is absent from the original full-game dominance result and appears only after the row deletion.", "Never delete a strategy merely because it loses at one cell."];
const TOPIC = "Iterative deletion";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1050 760" width="100%" height="100%"><PayoffMatrix x={200} y={140} cellW={250} cellH={145} rowLabels={['Standard','Premium','Basic']} colLabels={['Regular','Niche','Plus']} payoffs={s.payoffs} crossOut={s.crossOut} showBest={false} showNash={false}/><text x={200} y={700}>{`Remaining ${s.activeRows.length}×${s.activeCols.length}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={120} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={300} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={420} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={600} beat={4}/>;
const Scene6: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={750} beat={5}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 120 },
  { id: 'setup', Comp: Scene2, dur: 180 },
  { id: 'mechanism', Comp: Scene3, dur: 120 },
  { id: 'test', Comp: Scene4, dur: 180 },
  { id: 'result', Comp: Scene5, dur: 150 },
  { id: 'closing', Comp: Scene6, dur: 150 },
];
