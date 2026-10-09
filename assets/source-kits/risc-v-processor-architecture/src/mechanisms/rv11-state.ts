export const RV11 = {flush:360, remove:420, redirect:570, commit:780};
const ramp=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
export function rv11State(frame:number){
 const flushed=frame>=RV11.flush, removed=frame>=RV11.remove, redirected=frame>=RV11.redirect, committed=frame>=RV11.commit;
 const wrong=[{id:'A',label:'ADDI 99',stage:Math.min(1,ramp(frame,40,140)),row:1,value:99,killed:flushed},{id:'W',label:'STORE 99',stage:0,row:2,value:99,killed:flushed}];
 const branch={id:'B',label:'BEQ 4,4',stage:Math.min(2,2*ramp(frame,0,150)),row:0,value:'0x110',killed:false};
 const target={id:'T',label:'ADDI 42',stage:4*ramp(frame,570,780),row:1,value:42,killed:false};
 const instructions=[...(frame<570?[branch]:[]),...(!removed?wrong:[]),...(redirected&&!committed?[target]:[])];
 return {frame,flushed,removed,instructions,liveIds:instructions.filter(x=>!x.killed).map(x=>x.id),x5:committed?42:7,memory200:0,fetchPc:redirected?0x110:0x104,predictedPc:0x104,actualPc:0x110,discardX:520+300*ramp(frame,360,420),discardedPayloadVisible:flushed&&!removed,writeback:committed};
}
