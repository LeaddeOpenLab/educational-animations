export const RV12={older:90,trap:240,adjust:465,mret:630,resume:810};
const ramp=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
export function rv12State(frame:number){
 const entered=frame>=RV12.trap, adjusted=frame>=RV12.adjust, returned=frame>=RV12.mret, resumed=frame>=RV12.resume;
 const mepc=entered?(adjusted?0x108:0x104):null;
 const pc=returned?0x108:entered?0x800:frame>=90?0x104:0x100;
 const transfer=frame<360?{label:'Save ECALL PC',value:0x104,x:100+380*ramp(frame,190,240),y:350}:frame<570?{label:'Software + 4',value:adjusted?0x108:0x104,x:480,y:350}: {label:'Restore PC',value:0x108,x:480-380*ramp(frame,580,630),y:350};
 return {frame,pc,mepc,mcause:entered?8:null,mode:entered&&!returned?'M':'U',x5:frame>=90?7:0,x6:resumed?9:0,entered,adjusted,returned,resumed,transfer};
}
