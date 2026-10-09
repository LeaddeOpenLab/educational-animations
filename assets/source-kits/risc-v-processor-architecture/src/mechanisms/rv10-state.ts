export const loadUseState=(frame:number)=>{
 const stalled=frame>=270&&frame<660,dataReady=frame>=510,resumed=frame>=660,operandReady=frame>=690;
 const loadStage=frame<270?2:frame<660?3:frame<750?4:5;
 const addStage=frame<660?1:frame<780?2:frame<870?3:frame<900?4:5;
 const youngerStage=frame<660?0:frame<780?1:frame<870?2:frame<900?3:4;
 const bubbleStage=frame<270?-1:frame<660?2:frame<780?3:frame<870?4:5;
 const instructions=[{id:'load',label:'LW x5',stage:loadStage,row:0,value:dataReady?42:'0x3000'},{id:'add',label:'ADD x6',stage:addStage,row:1,value:frame>=720?45:''},{id:'young',label:'NEXT',stage:youngerStage,row:2,value:''}];
 return {frame,stalled,dataReady,resumed,operandReady,pc:resumed?0x10c:0x108,loadValue:dataReady?42:null,operand:operandReady?42:null,result:frame>=720?42+3:null,
 bubble:{stage:bubbleStage,valid:false,regWrite:false,memWrite:false},instructions,
 dataTravel:Math.max(0,Math.min(1,(frame-450)/60)),forwardTravel:Math.max(0,Math.min(1,(frame-660)/30)),
 registers:[{index:5,value:frame>=750?42:0},{index:6,value:frame>=900?45:0}]};
};
