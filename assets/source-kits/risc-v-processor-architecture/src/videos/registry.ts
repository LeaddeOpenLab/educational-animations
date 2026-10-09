import type {SceneDef} from '../Video';
import {SCENES as scenes0} from './rv01-risc-v-instruction-encoding-fields';
import {SCENES as scenes1} from './rv02-register-file-read-and-write-ports';
import {SCENES as scenes2} from './rv03-immediate-generation-from-instruction-bits';
import {SCENES as scenes3} from './rv04-alu-control-from-opcode-and-function-bits';
import {SCENES as scenes4} from './rv05-single-cycle-datapath-instruction-flow';
import {SCENES as scenes5} from './rv06-program-counter-update-for-branches';
import {SCENES as scenes6} from './rv07-load-and-store-address-calculation';
import {SCENES as scenes7} from './rv08-pipeline-register-data-transfer';
import {SCENES as scenes8} from './rv09-data-hazard-forwarding-paths';
import {SCENES as scenes9} from './rv10-load-use-pipeline-stall';
import {SCENES as scenes10} from './rv11-branch-prediction-and-misprediction-flush';
import {SCENES as scenes11} from './rv12-precise-trap-entry-and-return';
import {SCENES as scenes12} from './rv13-privilege-mode-transition';
import {SCENES as scenes13} from './rv14-sv39-virtual-address-translation';
import {SCENES as scenes14} from './rv15-memory-mapped-i-o-access';
export type VideoEntry={id:string;title:string;file:string;scenes:SceneDef[];keyFrames:number[]};
export const VIDEOS:VideoEntry[]=[
{id:"rv01-risc-v-instruction-encoding-fields",title:"RISC-V Instruction Encoding Fields",file:"01_RISC_V_Instruction_Encoding_Fields",scenes:scenes0,keyFrames:[90, 240, 425, 590, 735, 850]},
{id:"rv02-register-file-read-and-write-ports",title:"Register File Read and Write Ports",file:"02_Register_File_Read_and_Write_Ports",scenes:scenes1,keyFrames:[100, 275, 495, 640, 780, 850]},
{id:"rv03-immediate-generation-from-instruction-bits",title:"Immediate Generation from Instruction Bits",file:"03_Immediate_Generation_from_Instruction_Bits",scenes:scenes2,keyFrames:[100, 270, 430, 580, 760, 865]},
{id:"rv04-alu-control-from-opcode-and-function-bits",title:"ALU Control from Opcode and Function Bits",file:"04_ALU_Control_from_Opcode_and_Function_Bits",scenes:scenes3,keyFrames:[160, 290, 390, 525, 660, 830]},
{id:"rv05-single-cycle-datapath-instruction-flow",title:"Single-Cycle Datapath Instruction Flow",file:"05_Single_Cycle_Datapath_Instruction_Flow",scenes:scenes4,keyFrames:[100, 245, 405, 555, 690, 850]},
{id:"rv06-program-counter-update-for-branches",title:"Program Counter Update for Branches",file:"06_Program_Counter_Update_for_Branches",scenes:scenes5,keyFrames:[120, 300, 425, 490, 720, 845]},
{id:"rv07-load-and-store-address-calculation",title:"Load and Store Address Calculation",file:"07_Load_and_Store_Address_Calculation",scenes:scenes6,keyFrames:[140, 285, 370, 545, 720, 820]},
{id:"rv08-pipeline-register-data-transfer",title:"Pipeline Register Data Transfer",file:"08_Pipeline_Register_Data_Transfer",scenes:scenes7,keyFrames:[120, 320, 490, 555, 705, 865]},
{id:"rv09-data-hazard-forwarding-paths",title:"Data Hazard Forwarding Paths",file:"09_Data_Hazard_Forwarding_Paths",scenes:scenes8,keyFrames:[140, 285, 360, 520, 600, 865]},
{id:"rv10-load-use-pipeline-stall",title:"Load-Use Pipeline Stall",file:"10_Load_Use_Pipeline_Stall",scenes:scenes9,keyFrames:[100, 300, 540, 675, 735, 915]},
{id:"rv11-branch-prediction-and-misprediction-flush",title:"Branch Prediction and Misprediction Flush",file:"11_Branch_Prediction_and_Misprediction_Flush",scenes:scenes10,keyFrames:[90, 240, 390, 615, 780, 850]},
{id:"rv12-precise-trap-entry-and-return",title:"Precise Trap Entry and Return",file:"12_Precise_Trap_Entry_and_Return",scenes:scenes11,keyFrames:[90, 270, 480, 645, 810, 885]},
{id:"rv13-privilege-mode-transition",title:"Privilege Mode Transition",file:"13_Privilege_Mode_Transition",scenes:scenes12,keyFrames:[90, 270, 450, 495, 700, 800]},
{id:"rv14-sv39-virtual-address-translation",title:"Sv39 Virtual Address Translation",file:"14_Sv39_Virtual_Address_Translation",scenes:scenes13,keyFrames:[90, 250, 420, 585, 765, 930]},
{id:"rv15-memory-mapped-i-o-access",title:"Memory-Mapped I/O Access",file:"15_Memory_Mapped_I_O_Access",scenes:scenes14,keyFrames:[90, 240, 420, 600, 690, 840]},
];
