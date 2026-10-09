export const payoffs = {current:[2,4],close:[0,1],concede:[4,3]};
export const stateAt = (frame: number) => {
  const inspectFirm = frame >= 360;
  const rejectThreat = frame >= 600;
  return {payoffs,inspectFirm,rejectThreat,firmChoice:rejectThreat?'Concede':'Close',workerChoice:rejectThreat?'Demand':'Accept current',firmPayoffComparison:inspectFirm?[payoffs.close[1],payoffs.concede[1]]:null};
};
