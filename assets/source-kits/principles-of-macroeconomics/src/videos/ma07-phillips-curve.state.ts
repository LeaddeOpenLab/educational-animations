export const uNat=5;
export const SRPC=(u:number)=>2-0.5*(u-uNat);
export const stateAt = (frame: number) => {
  const u=frame<360?5:frame<570?5-2*(frame-360)/210:frame<780?3+2*(frame-570)/210:5;
  const expected=frame<570?0:frame<780?(frame-570)/210:1;
  return {uNat,SRPC,u,expected,inflation:SRPC(u)+expected};
};
