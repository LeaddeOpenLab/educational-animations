export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const tax=4*ramp(f,210,390),q=5-tax/2,pc=7+tax/2,pp=7-tax/2;return {tax,q,pc,pp,consumer:pc-7,producer:7-pp,revenue:tax*q};};
