export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const q=5-3*ramp(f,240,390);return {q,mb:12-q,mc:2+q,loss:(5-q)*(5-q)};};
