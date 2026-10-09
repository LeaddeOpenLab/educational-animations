export const draws = ['Left','Right','Left','Left','Right'];
export const stateAt = (frame: number) => {
  const p = frame < 300 ? 0 : frame < 570 ? 0.65 * (frame-300)/270 : 0.65;
  const drawIndex = frame < 570 ? -1 : Math.min(draws.length-1,Math.floor((frame-570)/60));
  return {p, otherProbability:1-p, drawIndex, realizedAction:drawIndex < 0 ? null : draws[drawIndex]};
};
