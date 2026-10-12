export const stateAt=(f:number)=>{const t=Math.max(0,Math.min(3,f/30));const x=2*t-.5*t*t;const v=2-t;return {t,x,v,walkerX:980+110*x,probeX:980+110*t,tangentAngle:Math.atan(v)};};
