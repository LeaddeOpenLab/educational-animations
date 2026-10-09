export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const q=f<720?Math.min(6,Math.floor(Math.max(0,f-150)/70)):5;return {q,tr:12*q,tc:8+2*q+q*q,profit:10*q-q*q-8,mr:12,mc:2+2*q};};
