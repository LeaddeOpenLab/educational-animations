import type React from 'react';
import type { SceneDef } from '../Video';
import { SCENES as bi01_protein_structure } from './bi01-protein-structure';
import { SCENES as bi02_enzyme_kinetics } from './bi02-enzyme-kinetics';
import { SCENES as bi03_cell_membrane_transport } from './bi03-cell-membrane-transport';
import { SCENES as bi04_electrochemical_gradient } from './bi04-electrochemical-gradient';
import { SCENES as bi05_meiosis } from './bi05-meiosis';
import { SCENES as bi06_genetic_linkage } from './bi06-genetic-linkage';
import { SCENES as bi07_genetic_probability } from './bi07-genetic-probability';
import { SCENES as bi08_dna_replication } from './bi08-dna-replication';
import { SCENES as bi09_transcribe } from './bi09-transcribe';
import { SCENES as bi10_translate } from './bi10-translate';
import { SCENES as bi11_signal_transduction } from './bi11-signal-transduction';
import { SCENES as bi12_negative_feedback_regulation } from './bi12-negative-feedback-regulation';

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
  { id: 'bi01-protein-structure', title: 'Protein structure', file: '01_Protein_structure', scenes: bi01_protein_structure, keyFrames: [42, 175, 315, 505, 690, 865] },
  { id: 'bi02-enzyme-kinetics', title: 'Enzyme kinetics', file: '02_Enzyme_kinetics', scenes: bi02_enzyme_kinetics, keyFrames: [45, 178, 340, 550, 730, 865] },
  { id: 'bi03-cell-membrane-transport', title: 'Cell membrane transport', file: '03_Cell_membrane_transport', scenes: bi03_cell_membrane_transport, keyFrames: [55, 190, 380, 560, 740, 870] },
  { id: 'bi04-electrochemical-gradient', title: 'Electrochemical gradient', file: '04_Electrochemical_gradient', scenes: bi04_electrochemical_gradient, keyFrames: [44, 193, 373, 555, 745, 870] },
  { id: 'bi05-meiosis', title: 'Meiosis', file: '05_Meiosis', scenes: bi05_meiosis, keyFrames: [45, 180, 370, 560, 750, 870] },
  { id: 'bi06-genetic-linkage', title: 'Genetic linkage', file: '06_Genetic_linkage', scenes: bi06_genetic_linkage, keyFrames: [42, 195, 370, 560, 740, 868] },
  { id: 'bi07-genetic-probability', title: 'Genetic probability', file: '07_Genetic_probability', scenes: bi07_genetic_probability, keyFrames: [43, 192, 390, 555, 740, 870] },
  { id: 'bi08-dna-replication', title: 'DNA replication', file: '08_DNA_replication', scenes: bi08_dna_replication, keyFrames: [48, 190, 375, 570, 738, 866] },
  { id: 'bi09-transcribe', title: 'Transcribe', file: '09_Transcribe', scenes: bi09_transcribe, keyFrames: [42, 175, 390, 580, 735, 867] },
  { id: 'bi10-translate', title: 'Translate', file: '10_Translate', scenes: bi10_translate, keyFrames: [43, 195, 375, 570, 745, 870] },
  { id: 'bi11-signal-transduction', title: 'Signal transduction', file: '11_Signal_transduction', scenes: bi11_signal_transduction, keyFrames: [40, 190, 365, 550, 730, 870] },
  { id: 'bi12-negative-feedback-regulation', title: 'Negative feedback regulation', file: '12_Negative_feedback_regulation', scenes: bi12_negative_feedback_regulation, keyFrames: [43, 185, 375, 560, 740, 868] },
];

export type { SceneDef };
export type VideoComponent = React.FC;
