export const f=(k:number)=>Math.sqrt(k);
export const breakEven=0.05;
export const stateAt = (frame: number) => {
  const save=frame<390?0.2:frame<570?0.2+0.05*(frame-390)/180:0.25;
  const kStar=(save/breakEven)**2;
  const capital=frame<570?16:frame<780?16+(kStar-16)*(frame-570)/210:kStar;
  const investment=save*f(capital),replacement=breakEven*capital;
  return {f,save,breakEven,kStar,capital,investment,replacement,consumption:f(kStar)-breakEven*kStar};
};
