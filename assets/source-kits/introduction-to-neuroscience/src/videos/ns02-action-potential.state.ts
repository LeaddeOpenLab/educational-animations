import {voltageAt} from '../components/NeuroMechanisms';
const ramp=(f:number,a:number,d:number)=>Math.max(0,Math.min(1,(f-a)/d));
export const AP={rest:-70,threshold:-55,peak:40,onset:0,dur:14,undershoot:12};
export const actionState=(frame:number)=>{
 const t=frame<390?1.68+3.08*ramp(frame,180,210):4.76+9.24*ramp(frame,390,210);
 const voltage=frame<180?-70+15*ramp(frame,110,70):voltageAt(t,AP);
 const naOpen=frame>=180&&frame<390?1:0; const kOpen=frame>=390&&frame<570?1:0;
 const patchTimes=[0,2,4].map(delay=>(frame-600)/30-delay);
 const refractory=frame>=810&&frame<885;
 return {t,voltage,naOpen,kOpen,naTransit:ramp(frame,195,105),kTransit:ramp(frame,405,135),patchTimes,patchVoltages:patchTimes.map(t=>voltageAt(t,{...AP,dur:4})),signal:ramp(frame,600,180),refractory,secondSpike:false,availability:frame>=885?1:0};
};
