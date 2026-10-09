export const delegateState=(frame:number)=>{
 const partitioned=frame>=170;
 const current=frame>=610?3:frame>=500?2:frame>=390?1:0;
 const handoff=frame<390?Math.max(0,Math.min(1,(frame-340)/50)):frame<500?Math.max(0,Math.min(1,(frame-450)/50)):frame<610?Math.max(0,Math.min(1,(frame-560)/50)):0;
 const values=[[-2,3],[0,3],[1,4],[5]];
 return {partitioned,current,handoff,operators:[{name:'Conv',device:'delegate' as const,supported:true,values:values[0]},{name:'ReLU',device:'delegate' as const,supported:true,values:values[1]},{name:'Custom +1',device:'cpu' as const,supported:true,values:values[2]},{name:'Dense sum',device:'delegate' as const,supported:true,values:values[3]}],payload:values[current],crossings:current>=3?2:current>=2?1:0};
};
