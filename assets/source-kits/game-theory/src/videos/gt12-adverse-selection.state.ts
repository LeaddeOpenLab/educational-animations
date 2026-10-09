export const sellerValue = (q:number)=>10*q;
export const buyerValue = (q:number)=>12*q;
export const stateAt = (frame: number) => {
  const qMax = frame<330?1:frame<600?0.6:0.36;
  const offer = buyerValue(qMax/2);
  const exitCutoff = offer/10;
  return {qMax,offer,exitCutoff,sellerValue,buyerValue};
};
