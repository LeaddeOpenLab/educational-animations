export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const stateAt=(f:number)=>{const x=f<600?1+4*ramp(f,240,300):f<780?5+3*ramp(f,600,150):8-3*ramp(f,780,75);return {x,y:10-x,u:Math.sqrt(x*(10-x)),mrs:(10-x)/x};};
