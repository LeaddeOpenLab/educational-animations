export const stateAt = (frame: number) => {
  const natureDrawn = frame >= 180;
  const sellerKnows = frame >= 270;
  const buyerSeesPrice = frame >= 360;
  const buyerActs = frame >= 600;
  return {natureDrawn,sellerKnows,buyerSeesPrice,buyerActs,trueType:'High',postedPrice:6,buyerObservation:buyerSeesPrice?'Price 6':null,possibleTypes:['High','Low'],infoSet:buyerActs?'buyer-same-price':null};
};
