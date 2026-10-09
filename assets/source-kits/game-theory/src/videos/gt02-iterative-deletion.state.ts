export const payoffs: [number,number][][] = [[[4,3],[4,2],[4,5]],[[2,0],[2,1],[2,0]],[[3,3],[5,2],[1,0]]];
export const stateAt = (frame: number) => {
  const firstDeleted = frame >= 360;
  const secondDeleted = frame >= 660;
  return {payoffs, activeRows: firstDeleted ? [0,2] : [0,1,2], activeCols: secondDeleted ? [0,2] : [0,1,2], crossOut: {rows:firstDeleted?[1]:[],cols:secondDeleted?[1]:[]}, firstDeleted, secondDeleted};
};
