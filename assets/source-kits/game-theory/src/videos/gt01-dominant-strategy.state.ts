export const payoffs: [number,number][][] = [[[3,3],[1,4]],[[4,1],[2,2]]];
export const stateAt = (frame: number) => {
  const comparedColumns = frame < 180 ? 0 : frame < 510 ? 1 : 2;
  const winners = [0,1].slice(0,comparedColumns).map(c => payoffs[0][c][0] > payoffs[1][c][0] ? 0 : 1);
  return {payoffs, comparedColumns, winners, dominantRow: winners.length === 2 && winners.every(r => r === winners[0]) ? winners[0] : null};
};
