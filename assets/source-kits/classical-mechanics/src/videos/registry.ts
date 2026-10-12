import type React from 'react';
import type { SceneDef } from '../Video';
import { SCENES as cm01_location_time_graph } from './cm01-location-time-graph';
import { SCENES as cm02_speed_time_graph } from './cm02-speed-time-graph';
import { SCENES as cm03_acceleration_time_graph } from './cm03-acceleration-time-graph';
import { SCENES as cm04_newtons_laws_of_motion } from './cm04-newtons-laws-of-motion';
import { SCENES as cm05_free_body_diagram } from './cm05-free-body-diagram';
import { SCENES as cm06_conservation_of_momentum } from './cm06-conservation-of-momentum';
import { SCENES as cm07_collision_process } from './cm07-collision-process';
import { SCENES as cm08_work_energy_theorem } from './cm08-work-energy-theorem';
import { SCENES as cm09_potential_energy } from './cm09-potential-energy';
import { SCENES as cm10_potential_energy_curve } from './cm10-potential-energy-curve';
import { SCENES as cm11_rigid_body_rotation } from './cm11-rigid-body-rotation';
import { SCENES as cm12_angular_momentum } from './cm12-angular-momentum';
import { SCENES as cm13_no_slip_scrolling } from './cm13-no-slip-scrolling';

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
  { id: 'cm01-location-time-graph', title: 'Location-time graph', file: '01_Location_time_graph', scenes: cm01_location_time_graph, keyFrames: [75,230,430,600,720,845] },
  { id: 'cm02-speed-time-graph', title: 'Speed-time graph', file: '02_Speed_time_graph', scenes: cm02_speed_time_graph, keyFrames: [60,220,350,520,690,850] },
  { id: 'cm03-acceleration-time-graph', title: 'Acceleration-time graph', file: '03_Acceleration_time_graph', scenes: cm03_acceleration_time_graph, keyFrames: [60,225,390,550,720,850] },
  { id: 'cm04-newtons-laws-of-motion', title: 'Newton\'s laws of motion', file: '04_Newtons_laws_of_motion', scenes: cm04_newtons_laws_of_motion, keyFrames: [60,200,360,530,690,850] },
  { id: 'cm05-free-body-diagram', title: 'Free body diagram', file: '05_Free_body_diagram', scenes: cm05_free_body_diagram, keyFrames: [60,220,410,560,720,850] },
  { id: 'cm06-conservation-of-momentum', title: 'Conservation of momentum', file: '06_Conservation_of_momentum', scenes: cm06_conservation_of_momentum, keyFrames: [60,220,420,600,740,850] },
  { id: 'cm07-collision-process', title: 'Collision process', file: '07_Collision_process', scenes: cm07_collision_process, keyFrames: [60,220,410,600,740,850] },
  { id: 'cm08-work-energy-theorem', title: 'Work-Energy Theorem', file: '08_Work_Energy_Theorem', scenes: cm08_work_energy_theorem, keyFrames: [60,230,420,610,740,850] },
  { id: 'cm09-potential-energy', title: 'Potential energy', file: '09_Potential_energy', scenes: cm09_potential_energy, keyFrames: [60,220,420,600,740,850] },
  { id: 'cm10-potential-energy-curve', title: 'Potential energy curve', file: '10_Potential_energy_curve', scenes: cm10_potential_energy_curve, keyFrames: [60,220,420,610,740,850] },
  { id: 'cm11-rigid-body-rotation', title: 'Rigid body rotation', file: '11_Rigid_body_rotation', scenes: cm11_rigid_body_rotation, keyFrames: [60,220,420,610,740,850] },
  { id: 'cm12-angular-momentum', title: 'Angular momentum', file: '12_Angular_momentum', scenes: cm12_angular_momentum, keyFrames: [60,210,390,570,730,850] },
  { id: 'cm13-no-slip-scrolling', title: 'No slip scrolling', file: '13_No_slip_scrolling', scenes: cm13_no_slip_scrolling, keyFrames: [60,220,430,610,750,850] },
];

export type { SceneDef };
export type VideoComponent = React.FC;
