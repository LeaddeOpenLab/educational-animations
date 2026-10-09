export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const q=2+2*ramp(f,240,210),mr=14-2*q,mc=2+q,price=14-q,readPrice=mr+(price-mr)*ramp(f,450,180);return {q,mr,mc,price,readPrice,dwl:6};};
