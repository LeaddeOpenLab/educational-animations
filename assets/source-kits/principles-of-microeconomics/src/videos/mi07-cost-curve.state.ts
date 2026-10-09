export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const q=1+5*ramp(f,180,570);return {q,tc:16+2*q+q*q,mc:2+2*q,atc:16/q+2+q,avc:2+q,afc:16/q};};
