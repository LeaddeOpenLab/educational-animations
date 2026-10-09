export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const p=f<420?9-2*ramp(f,150,210):4+3*ramp(f,450,300);return {p,qd:12-p,qs:p-2,gap:Math.abs((12-p)-(p-2))};};
