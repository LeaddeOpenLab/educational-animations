export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const started=f>=180,sleeping=f>=390&&f<630,running=started&&!sleeping;const x=f<180?45:f<300?45+610*ramp(f,180,90):sleeping?655-610*ramp(f,390,75):45+610*ramp(f,630,90);return {started,sleeping,running,x,remaining:sleeping?Math.max(0,630-f):0};};
