import type {VideoEntry} from './registry-types';
import {SCENES as s0} from './z01-zephyr-thread-lifecycle-and-scheduling';
import {SCENES as s1} from './z02-thread-priority-and-preemption';
import {SCENES as s2} from './z03-kconfig-feature-selection';
import {SCENES as s3} from './z04-devicetree-hardware-description';
import {SCENES as s4} from './z05-device-driver-initialization-order';
import {SCENES as s5} from './z06-gpio-callback-and-interrupt-handling';
import {SCENES as s6} from './z07-work-queue-deferred-processing';
import {SCENES as s7} from './z08-message-queue-thread-communication';
import {SCENES as s8} from './z09-semaphore-synchronization';
import {SCENES as s9} from './z10-mutex-priority-inheritance';
import {SCENES as s10} from './z11-timer-callback-and-deadline';
import {SCENES as s11} from './z12-kernel-tickless-idle';
import {SCENES as s12} from './z13-memory-slab-allocation';
import {SCENES as s13} from './z14-logging-backend-configuration';
import {SCENES as s14} from './z15-west-manifest-and-module-resolution';
export const VIDEOS:VideoEntry[] = [
{id:"z01-zephyr-thread-lifecycle-and-scheduling",title:"Zephyr Thread Lifecycle and Scheduling",file:"01_Zephyr_Thread_Lifecycle_and_Scheduling",scenes:s0,keyFrames:[90,270,420,570,720,870]},
{id:"z02-thread-priority-and-preemption",title:"Thread Priority and Preemption",file:"02_Thread_Priority_and_Preemption",scenes:s1,keyFrames:[90,270,420,570,720,870]},
{id:"z03-kconfig-feature-selection",title:"Kconfig Feature Selection",file:"03_Kconfig_Feature_Selection",scenes:s2,keyFrames:[90,270,420,570,720,870]},
{id:"z04-devicetree-hardware-description",title:"Devicetree Hardware Description",file:"04_Devicetree_Hardware_Description",scenes:s3,keyFrames:[90,270,420,570,720,870]},
{id:"z05-device-driver-initialization-order",title:"Device Driver Initialization Order",file:"05_Device_Driver_Initialization_Order",scenes:s4,keyFrames:[90,270,420,570,720,870]},
{id:"z06-gpio-callback-and-interrupt-handling",title:"GPIO Callback and Interrupt Handling",file:"06_GPIO_Callback_and_Interrupt_Handling",scenes:s5,keyFrames:[90,270,420,570,720,870]},
{id:"z07-work-queue-deferred-processing",title:"Work Queue Deferred Processing",file:"07_Work_Queue_Deferred_Processing",scenes:s6,keyFrames:[90,270,420,570,720,870]},
{id:"z08-message-queue-thread-communication",title:"Message Queue Thread Communication",file:"08_Message_Queue_Thread_Communication",scenes:s7,keyFrames:[90,270,420,570,720,870]},
{id:"z09-semaphore-synchronization",title:"Semaphore Synchronization",file:"09_Semaphore_Synchronization",scenes:s8,keyFrames:[90,270,420,570,720,870]},
{id:"z10-mutex-priority-inheritance",title:"Mutex Priority Inheritance",file:"10_Mutex_Priority_Inheritance",scenes:s9,keyFrames:[90,270,420,570,720,870]},
{id:"z11-timer-callback-and-deadline",title:"Timer Callback and Deadline",file:"11_Timer_Callback_and_Deadline",scenes:s10,keyFrames:[90,270,420,570,720,870]},
{id:"z12-kernel-tickless-idle",title:"Kernel Tickless Idle",file:"12_Kernel_Tickless_Idle",scenes:s11,keyFrames:[90,270,420,570,720,870]},
{id:"z13-memory-slab-allocation",title:"Memory Slab Allocation",file:"13_Memory_Slab_Allocation",scenes:s12,keyFrames:[90,270,420,570,720,870]},
{id:"z14-logging-backend-configuration",title:"Logging Backend Configuration",file:"14_Logging_Backend_Configuration",scenes:s13,keyFrames:[90,270,420,570,720,870]},
{id:"z15-west-manifest-and-module-resolution",title:"West Manifest and Module Resolution",file:"15_West_Manifest_and_Module_Resolution",scenes:s14,keyFrames:[90,270,420,570,720,870]},
];