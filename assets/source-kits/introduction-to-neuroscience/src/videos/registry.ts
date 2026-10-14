import type React from 'react';
import type { SceneDef } from '../Video';
import { SCENES as ns01_resting_potential } from './ns01-resting-potential';
import { SCENES as ns02_action_potential } from './ns02-action-potential';
import { SCENES as ns03_chemical_synaptic_transmission } from './ns03-chemical-synaptic-transmission';
import { SCENES as ns04_synaptic_integration } from './ns04-synaptic-integration';
import { SCENES as ns05_brain_region_localization } from './ns05-brain-region-localization';
import { SCENES as ns06_neural_pathways } from './ns06-neural-pathways';
import { SCENES as ns07_visual_pathway } from './ns07-visual-pathway';
import { SCENES as ns08_receptive_field } from './ns08-receptive-field';
import { SCENES as ns09_synaptic_plasticity } from './ns09-synaptic-plasticity';
import { SCENES as ns10_memory_formation } from './ns10-memory-formation';

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
  { id: 'ns01-resting-potential', title: 'Resting potential', file: '01_Resting_potential', scenes: ns01_resting_potential, keyFrames: [30, 180, 345, 540, 735, 870] },
  { id: 'ns02-action-potential', title: 'Action potential', file: '02_Action_potential', scenes: ns02_action_potential, keyFrames: [30, 180, 360, 555, 735, 900] },
  { id: 'ns03-chemical-synaptic-transmission', title: 'Chemical synaptic transmission', file: '03_Chemical_synaptic_transmission', scenes: ns03_chemical_synaptic_transmission, keyFrames: [30, 195, 375, 555, 735, 870] },
  { id: 'ns04-synaptic-integration', title: 'Synaptic integration', file: '04_Synaptic_integration', scenes: ns04_synaptic_integration, keyFrames: [30, 165, 330, 510, 690, 840] },
  { id: 'ns05-brain-region-localization', title: 'Brain region localization', file: '05_Brain_region_localization', scenes: ns05_brain_region_localization, keyFrames: [105, 240, 390, 525, 645, 825] },
  { id: 'ns06-neural-pathways', title: 'Neural pathways', file: '06_Neural_pathways', scenes: ns06_neural_pathways, keyFrames: [105, 255, 405, 510, 690, 855] },
  { id: 'ns07-visual-pathway', title: 'Visual pathway', file: '07_Visual_pathway', scenes: ns07_visual_pathway, keyFrames: [135, 270, 405, 540, 735, 900] },
  { id: 'ns08-receptive-field', title: 'Receptive field', file: '08_Receptive_field', scenes: ns08_receptive_field, keyFrames: [75, 225, 390, 525, 690, 795] },
  { id: 'ns09-synaptic-plasticity', title: 'Synaptic plasticity', file: '09_Synaptic_plasticity', scenes: ns09_synaptic_plasticity, keyFrames: [75, 225, 375, 510, 690, 840] },
  { id: 'ns10-memory-formation', title: 'Memory formation', file: '10_Memory_formation', scenes: ns10_memory_formation, keyFrames: [90, 270, 450, 600, 765, 915] },
];

export type { SceneDef };
export type VideoComponent = React.FC;
