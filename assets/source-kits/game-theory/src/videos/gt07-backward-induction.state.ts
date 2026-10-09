export const payoffs = {standard:[2,2],rushAccept:[4,3],rushReject:[0,1]};
export const stateAt = (frame: number) => {
  const retailerChoice = frame >= 390 ? 'Accept' : null;
  const supplierChoice = frame >= 660 ? 'Rush' : null;
  const solution = {...(retailerChoice?{retailer:retailerChoice}:{}),...(supplierChoice?{supplier:supplierChoice}:{})};
  return {payoffs,retailerChoice,supplierChoice,solution,carriedValue:retailerChoice?payoffs.rushAccept[0]:null};
};
