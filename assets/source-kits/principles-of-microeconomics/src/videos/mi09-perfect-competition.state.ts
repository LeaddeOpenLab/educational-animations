export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const entry=8*ramp(f,240,390),p=14-entry/2,q=(p-2)/2;return {entry,p,marketQ:12+entry/2,q,atc:16/q+2+q,profit:p*q-(16+2*q+q*q)};};
