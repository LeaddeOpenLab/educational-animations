export const forwardState=(frame:number)=>{
 const producer=7+5,nearReady=frame>=300,farReady=frame>=540;
 const nearOperand=nearReady?producer:0,farOperand=farReady?producer:0;
 const step=frame<180?0:frame<420?1:frame<690?2:frame<780?3:frame<840?4:5;
 const stages=[[2,1,0],[3,2,1],[4,3,2],[5,4,3],[5,5,4],[5,5,5]][step];
 return {frame,producer,nearOperand,farOperand,nearReady,farReady,nearResult:frame>=330?nearOperand-10:null,farResult:frame>=570?farOperand^15:null,
 nearTravel:Math.max(0,Math.min(1,(frame-240)/60)),farTravel:Math.max(0,Math.min(1,(frame-480)/60)),
 instructions:[{id:'add',label:'ADD x5',stage:stages[0],row:0,value:frame>=120?producer:''},{id:'sub',label:'SUB x6',stage:stages[1],row:1,value:frame>=330?producer-10:''},{id:'xor',label:'XOR x7',stage:stages[2],row:2,value:frame>=570?producer^15:''}],
 registers:[{index:5,value:frame>=690?producer:0},{index:6,value:frame>=780?producer-10:0},{index:7,value:frame>=840?producer^15:0}]};
};
