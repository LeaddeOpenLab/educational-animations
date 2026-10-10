export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const time=Math.min(96,100*ramp(f,180,600));const callbacks=[30,50,70,90].filter(t=>t<=time);return {time,callbacks,deadline:30+20*callbacks.length,ticks:callbacks, count:callbacks.length};};
