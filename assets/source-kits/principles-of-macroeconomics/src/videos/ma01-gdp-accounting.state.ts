export const components = [{label:'C',value:600},{label:'I',value:200},{label:'G',value:250},{label:'NX',value:-50}];
export const stateAt = (frame: number) => {
  const n=frame<180?0:frame<240?1:frame<300?2:frame<480?3:4;
  const visibleComponents=components.slice(0,n);
  return {visibleComponents,total:visibleComponents.reduce((a,b)=>a+b.value,0),n};
};
