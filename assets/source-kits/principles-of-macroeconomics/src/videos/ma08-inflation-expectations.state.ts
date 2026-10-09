export const uNat=5;
export const SRPC=(u:number)=>2-0.5*(u-uNat);
export const stateAt = (frame: number) => {
  const expected=frame<390?0:frame<600?1.5*(frame-390)/210:1.5;
  return {uNat,SRPC,expected,inflationAtNatural:SRPC(uNat)+expected,oldInflation:SRPC(uNat)};
};
