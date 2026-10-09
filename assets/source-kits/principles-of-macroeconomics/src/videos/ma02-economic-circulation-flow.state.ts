export const flows = [
  {from:0,to:1,label:'labor',value:100,kind:'real' as const},
  {from:1,to:0,label:'wages',value:100,kind:'money' as const},
  {from:1,to:0,label:'goods',value:80,kind:'real' as const},
  {from:0,to:1,label:'consumption',value:80,kind:'money' as const},
  {from:0,to:2,label:'taxes',value:20,kind:'money' as const},
  {from:2,to:1,label:'purchases',value:20,kind:'money' as const}];
export const stateAt = (frame: number) => {
  const n=frame<150?0:frame<300?2:frame<480?4:frame<660?5:6;
  return {visibleFlows:flows.slice(0,n),n,moneyLoopClosed:n===6};
};
