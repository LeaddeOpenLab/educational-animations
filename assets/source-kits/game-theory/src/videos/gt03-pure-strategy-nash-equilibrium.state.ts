export const payoffs: [number,number][][] = [[[3,3],[0,5]],[[5,0],[1,1]]];
export const stateAt = (frame: number) => {
  const showRowBest = frame >= 180;
  const showColBest = frame >= 390;
  const showNash = frame >= 600;
  return {payoffs, showRowBest, showColBest, showNash, nashCell: showNash ? [1,1] : null, deviationRow: payoffs[0][1][0], deviationCol: payoffs[1][0][1]};
};
