export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const p=6-ramp(f,300,240),qe=18-2*p,qi=9-.5*p;return {p,qe,qi,re:p*qe,ri:p*qi,epsE:2*6/6,epsI:.5*6/6};};
