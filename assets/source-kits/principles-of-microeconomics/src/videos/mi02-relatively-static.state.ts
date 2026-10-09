export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const shift=4*ramp(f,240,360);return {shift,q:5+shift/2,p:7+shift/2};};
