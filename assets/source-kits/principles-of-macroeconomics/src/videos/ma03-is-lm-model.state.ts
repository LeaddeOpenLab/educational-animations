export const rIS=(Y:number)=>10-0.01*Y;
export const rLM=(Y:number)=>2+0.005*Y;
export const stateAt = (frame: number) => {
  const shiftIS=frame<420?0:frame<600?(frame-420)/180:1;
  const Ystar=(8+shiftIS)/0.015;
  return {rIS,rLM,shiftIS,Ystar,rStar:rLM(Ystar)};
};
