export const types = [{label:'High skill',share:0.5},{label:'Low skill',share:0.5}];
export const stateAt = (frame: number) => {
  const costs = [1,4], wageGain=3, netGains=costs.map(c=>wageGain-c);
  const showComparison = frame>=360, separated=frame>=600;
  const paths = separated?[{type:0,signal:0,action:0},{type:1,signal:1,action:1}]:[];
  return {types,costs,wageGain,netGains,showComparison,separated,paths};
};
