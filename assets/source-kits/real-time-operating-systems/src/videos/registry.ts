import {SCENES as rt05_counting} from './rt05-counting-semaphore';
import type {SceneDef} from '../Video';
import {SCENES as rt01_task_state_transitions} from './rt01-task-state-transitions';
import {SCENES as rt02_priority_preemption} from './rt02-priority-preemption';
import {SCENES as rt03_mutex_and_critical_section} from './rt03-mutex-and-critical-section';
import {SCENES as rt04_priority_inversion} from './rt04-priority-inversion';
export type VideoEntry={id:string;title:string;file:string;scenes:SceneDef[];keyFrames:number[]};
export const VIDEOS:VideoEntry[]=[
{id:'rt05-counting-semaphore',title:'Counting Semaphore',file:'05_Counting_Semaphore',scenes:rt05_counting,keyFrames:[90, 240, 435, 585, 690, 855]},
  {id: 'rt01-task-state-transitions', title: 'Task State Transitions', file: '01_Task_State_Transitions', scenes: rt01_task_state_transitions, keyFrames: [105, 285, 465, 650, 790, 870]},
  {id: 'rt02-priority-preemption', title: 'Priority Preemption', file: '02_Priority_Preemption', scenes: rt02_priority_preemption, keyFrames: [100, 290, 460, 655, 790, 870]},
  {id: 'rt03-mutex-and-critical-section', title: 'Mutex and Critical Section', file: '03_Mutex_and_Critical_Section', scenes: rt03_mutex_and_critical_section, keyFrames: [110, 295, 470, 650, 790, 870]},
  {id: 'rt04-priority-inversion', title: 'Priority Inversion', file: '04_Priority_Inversion', scenes: rt04_priority_inversion, keyFrames: [120, 285, 470, 650, 790, 870]},
];
