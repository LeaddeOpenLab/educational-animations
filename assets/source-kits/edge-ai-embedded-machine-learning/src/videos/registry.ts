import type {SceneDef} from '../Video';
import {SCENES as scenes0} from './edge01-edge-inference-pipeline-from-sensor-to-result';
import {SCENES as scenes1} from './edge02-quantization-from-float32-to-int8';
import {SCENES as scenes2} from './edge03-calibration-dataset-for-post-training-quantization';
import {SCENES as scenes3} from './edge04-per-channel-weight-quantization';
import {SCENES as scenes4} from './edge05-quantized-multiply-and-accumulate';
import {SCENES as scenes5} from './edge06-model-operator-compatibility-check';
import {SCENES as scenes6} from './edge07-memory-arena-planning-for-tensor-lifetimes';
import {SCENES as scenes7} from './edge08-flash-and-ram-model-footprint';
import {SCENES as scenes8} from './edge09-structured-pruning-for-edge-deployment';
import {SCENES as scenes9} from './edge10-knowledge-distillation-to-a-small-model';
import {SCENES as scenes10} from './edge11-on-device-feature-extraction';
import {SCENES as scenes11} from './edge12-streaming-inference-with-sliding-windows';
import {SCENES as scenes12} from './edge13-hardware-delegate-operator-partitioning';
import {SCENES as scenes13} from './edge14-latency-and-energy-measurement-on-device';
import {SCENES as scenes14} from './edge15-confidence-threshold-for-edge-classification';
export type VideoEntry={id:string;title:string;file:string;scenes:SceneDef[];keyFrames:number[]};
export const VIDEOS:VideoEntry[]=[
{id:"edge01-edge-inference-pipeline-from-sensor-to-result",title:"Edge Inference Pipeline from Sensor to Result",file:"01_Edge_Inference_Pipeline_from_Sensor_to_Result",scenes:scenes0,keyFrames:[120, 275, 470, 575, 745, 825]},
{id:"edge02-quantization-from-float32-to-int8",title:"Quantization from Float32 to Int8",file:"02_Quantization_from_Float32_to_Int8",scenes:scenes1,keyFrames:[120, 290, 535, 640, 750, 850]},
{id:"edge03-calibration-dataset-for-post-training-quantization",title:"Calibration Dataset for Post-Training Quantization",file:"03_Calibration_Dataset_for_Post_Training_Quantization",scenes:scenes2,keyFrames:[120, 340, 490, 535, 735, 865]},
{id:"edge04-per-channel-weight-quantization",title:"Per-Channel Weight Quantization",file:"04_Per_Channel_Weight_Quantization",scenes:scenes3,keyFrames:[100, 290, 470, 510, 610, 810]},
{id:"edge05-quantized-multiply-and-accumulate",title:"Quantized Multiply and Accumulate",file:"05_Quantized_Multiply_and_Accumulate",scenes:scenes4,keyFrames:[120, 290, 450, 495, 740, 930]},
{id:"edge06-model-operator-compatibility-check",title:"Model Operator Compatibility Check",file:"06_Model_Operator_Compatibility_Check",scenes:scenes5,keyFrames:[90, 290, 430, 560, 745, 850]},
{id:"edge07-memory-arena-planning-for-tensor-lifetimes",title:"Memory Arena Planning for Tensor Lifetimes",file:"07_Memory_Arena_Planning_for_Tensor_Lifetimes",scenes:scenes6,keyFrames:[105, 320, 510, 570, 660, 830]},
{id:"edge08-flash-and-ram-model-footprint",title:"Flash and RAM Model Footprint",file:"08_Flash_and_RAM_Model_Footprint",scenes:scenes7,keyFrames:[90, 240, 330, 500, 630, 800]},
{id:"edge09-structured-pruning-for-edge-deployment",title:"Structured Pruning for Edge Deployment",file:"09_Structured_Pruning_for_Edge_Deployment",scenes:scenes8,keyFrames:[100, 260, 430, 530, 645, 840]},
{id:"edge10-knowledge-distillation-to-a-small-model",title:"Knowledge Distillation to a Small Model",file:"10_Knowledge_Distillation_to_a_Small_Model",scenes:scenes9,keyFrames:[90, 270, 410, 550, 680, 840]},
{id:"edge11-on-device-feature-extraction",title:"On-Device Feature Extraction",file:"edge11-on-device-feature-extraction.tsx",scenes:scenes10,keyFrames:[80, 225, 400, 520, 690, 780]},
{id:"edge12-streaming-inference-with-sliding-windows",title:"Streaming Inference with Sliding Windows",file:"edge12-streaming-inference-with-sliding-windows.tsx",scenes:scenes11,keyFrames:[75, 270, 342, 510, 585, 755]},
{id:"edge13-hardware-delegate-operator-partitioning",title:"Hardware Delegate Operator Partitioning",file:"edge13-hardware-delegate-operator-partitioning.tsx",scenes:scenes12,keyFrames:[75, 230, 380, 475, 615, 775]},
{id:"edge14-latency-and-energy-measurement-on-device",title:"Latency and Energy Measurement on Device",file:"edge14-latency-and-energy-measurement-on-device.tsx",scenes:scenes13,keyFrames:[75, 210, 300, 430, 605, 755]},
{id:"edge15-confidence-threshold-for-edge-classification",title:"Confidence Threshold for Edge Classification",file:"edge15-confidence-threshold-for-edge-classification.tsx",scenes:scenes14,keyFrames:[75, 210, 420, 480, 669, 735]},
];
