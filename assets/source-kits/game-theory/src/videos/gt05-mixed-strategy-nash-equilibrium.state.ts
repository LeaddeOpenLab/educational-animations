export const payoffs: [number,number][][] = [[[2,0],[0,3]],[[0,4],[3,0]]];
export const stateAt = (frame: number) => {
  const p = frame < 360 ? 0.2 : 4/7;
  const q = frame < 630 ? 0.2 : 3/5;
  const columnValues = [4*(1-p),3*p];
  const rowValues = [2*q,3*(1-q)];
  return {payoffs,p,q,columnValues,rowValues,columnTie:Math.abs(columnValues[0]-columnValues[1])<1e-9,rowTie:Math.abs(rowValues[0]-rowValues[1])<1e-9};
};
