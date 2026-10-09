export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const q=f<600?5*ramp(f,150,390):f<750?5+ramp(f,600,90):6-ramp(f,750,90);return {q,mb:12-q,mc:2+q,cs:5*q-.5*q*q,ps:5*q-.5*q*q,total:10*q-q*q};};
