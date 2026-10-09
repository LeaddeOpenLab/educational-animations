export const payoffs = {out:[2,4],fight:[-1,0],accommodate:[4,2]};
export const stateAt = (frame: number) => {
  const path = frame < 210 ? [] : frame < 510 ? ['Enter'] : ['Enter','Accommodate'];
  const terminal = path.length === 2 ? payoffs.accommodate : null;
  return {path,terminal,payoffs,incumbentActive:path.length>0};
};
