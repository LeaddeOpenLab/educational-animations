export const RV02={a:9,b:4,writeFrame:600,zeroFrame:810};
export function rv02State(frame:number){
 const sum=RV02.a+RV02.b,readProgress=Math.max(0,Math.min(1,(frame-150)/120)),written=frame>=600,zeroAttempt=frame>=810;
 const values=[{index:0,value:0},{index:5,value:written?sum:0},{index:6,value:RV02.a},{index:7,value:RV02.b}];
 const ready=frame>=480;
 return {values,readIndices:[6,7],readA:RV02.a,readB:RV02.b,readProgress,sum,ready,written,zeroAttempt,writeIndex:frame>=720?0:5,writeData:ready?sum:null,discarded:zeroAttempt,
  tokens:[{label:'Read A',value:RV02.a,x:270+230*readProgress,y:185-120*readProgress},{label:'Read B',value:RV02.b,x:270+430*readProgress,y:250-80*readProgress}],
  writeToken:{label:frame>=720?'Write x0':'Write x5',value:ready?sum:'—',x:frame>=720?500:500-(written?450:0),y:frame>=720?390:330},clock:written?1:0};
}
