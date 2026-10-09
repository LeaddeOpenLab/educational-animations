export const payoffs = {out:[2,4],fight:[-1,0],accommodate:[4,2]};
export const stateAt = (frame: number) => {
  const boxed = frame >= 240;
  const localTest = frame >= 420;
  const refined = frame >= 660;
  return {payoffs,boxed,localTest,refined,solution:refined?{entrant:'Enter',incumbent:'Accommodate'}:{entrant:'Stay Out',incumbent:'Fight'},subgames:boxed?[{root:'incumbent',label:'proper subgame'}]:[]};
};
