export const branchState=(frame:number)=>{
 const replay=frame>=570,base=0x100,offset=16,a=7,b=replay?9:7;
 const target=base+offset,sequential=base+4,equal=a===b;
 const decision=frame>=(replay?630:240),commit=frame>=(replay?690:450);
 const selected=decision?(equal?target:sequential):null;
 const travel=Math.max(0,Math.min(1,(frame-(replay?660:390))/(replay?30:60)));
 return {frame,replay,a,b,equal,base,offset,target,sequential,selected,pc:commit?selected!:base,travel,committed:commit,cursorRow:commit?(equal?3:1):0};
};
