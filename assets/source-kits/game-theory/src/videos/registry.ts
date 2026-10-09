import type React from 'react';
import type { SceneDef } from '../Video';
import { SCENES as gt01_dominant_strategy } from './gt01-dominant-strategy';
import { SCENES as gt02_iterative_deletion } from './gt02-iterative-deletion';
import { SCENES as gt03_pure_strategy_nash_equilibrium } from './gt03-pure-strategy-nash-equilibrium';
import { SCENES as gt04_mixed_strategy } from './gt04-mixed-strategy';
import { SCENES as gt05_mixed_strategy_nash_equilibrium } from './gt05-mixed-strategy-nash-equilibrium';
import { SCENES as gt06_sequential_game } from './gt06-sequential-game';
import { SCENES as gt07_backward_induction } from './gt07-backward-induction';
import { SCENES as gt08_subgame_refinement } from './gt08-subgame-refinement';
import { SCENES as gt09_credible_threat } from './gt09-credible-threat';
import { SCENES as gt10_asymmetric_information } from './gt10-asymmetric-information';
import { SCENES as gt11_signaling } from './gt11-signaling';
import { SCENES as gt12_adverse_selection } from './gt12-adverse-selection';

export type VideoEntry = {
  /** Remotion composition id, also the L3 file stem */
  id: string;
  /** The knowledge point exactly as listed in 知识点表.csv */
  title: string;
  /** Delivered filename stem */
  file: string;
  scenes: SceneDef[];
  /** frames worth sampling for the contact sheet (6 fill a 3x2 grid) */
  keyFrames: number[];
};

export const VIDEOS: VideoEntry[] = [
  { id: 'gt01-dominant-strategy', title: 'Dominant strategy', file: '01_Dominant_strategy', scenes: gt01_dominant_strategy, keyFrames: [90, 285, 450, 510, 570, 765] },
  { id: 'gt02-iterative-deletion', title: 'Iterative deletion', file: '02_Iterative_deletion', scenes: gt02_iterative_deletion, keyFrames: [60, 210, 360, 510, 675, 825] },
  { id: 'gt03-pure-strategy-nash-equilibrium', title: 'Pure strategy Nash equilibrium', file: '03_Pure_strategy_Nash_equilibrium', scenes: gt03_pure_strategy_nash_equilibrium, keyFrames: [75, 255, 465, 517, 660, 825] },
  { id: 'gt04-mixed-strategy', title: 'Mixed strategy', file: '04_Mixed_strategy', scenes: gt04_mixed_strategy, keyFrames: [75, 270, 465, 540, 615, 795] },
  { id: 'gt05-mixed-strategy-nash-equilibrium', title: 'Mixed Strategy Nash Equilibrium', file: '05_Mixed_Strategy_Nash_Equilibrium', scenes: gt05_mixed_strategy_nash_equilibrium, keyFrames: [75, 210, 360, 525, 675, 825] },
  { id: 'gt06-sequential-game', title: 'Sequential game', file: '06_Sequential_game', scenes: gt06_sequential_game, keyFrames: [75, 240, 405, 480, 555, 765] },
  { id: 'gt07-backward-induction', title: 'Backward induction', file: '07_Backward_induction', scenes: gt07_backward_induction, keyFrames: [75, 240, 405, 442, 585, 795] },
  { id: 'gt08-subgame-refinement', title: 'Subgame refinement', file: '08_Subgame_refinement', scenes: gt08_subgame_refinement, keyFrames: [75, 210, 345, 495, 660, 825] },
  { id: 'gt09-credible-threat', title: 'Credible threat', file: '09_Credible_threat', scenes: gt09_credible_threat, keyFrames: [75, 255, 450, 495, 645, 825] },
  { id: 'gt10-asymmetric-information', title: 'Asymmetric information', file: '10_Asymmetric_information', scenes: gt10_asymmetric_information, keyFrames: [75, 255, 427, 495, 562, 765] },
  { id: 'gt11-signaling', title: 'Signaling', file: '11_Signaling', scenes: gt11_signaling, keyFrames: [60, 195, 360, 525, 675, 825] },
  { id: 'gt12-adverse-selection', title: 'Adverse selection', file: '12_Adverse_selection', scenes: gt12_adverse_selection, keyFrames: [75, 225, 390, 555, 690, 825] },
];

export type { SceneDef };
export type VideoComponent = React.FC;
