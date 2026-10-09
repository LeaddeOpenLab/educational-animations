export const Qd=(e:number)=>120-20*e;
export const Qs=(e:number)=>20+20*e;
export const stateAt = (frame: number) => {
  const shiftS=frame<390?0:frame<600?20*(frame-390)/210:20;
  const e=(100-shiftS)/40;
  return {Qd,Qs,shiftS,e,quote:'domestic units per foreign unit',appreciation:e<2.5};
};
