export const ramp=(f:number,start:number,dur:number)=>Math.max(0,Math.min(1,(f-start)/dur));
export const restingState=(frame:number)=>{
 const ions=Array.from({length:4},(_,i)=>{const p=ramp(frame,150+i*42,55);return {p,y:110-220*p,owner:p===1?'outside':p===0?'inside':'transit'};});
 const escaped=ions.filter(i=>i.owner==='outside').length;
 const pump=ramp(frame,690,130);
 return {ions,escaped,balance:ramp(frame,420,120),voltage:-70*escaped/4,electricPull:escaped/4,channelOpen:frame>=150?1:0,pump,
 sodium:Array.from({length:3},(_,i)=>({x:i*34,y:90-180*pump})),potassium:Array.from({length:2},(_,i)=>({x:130+i*34,y:-90+180*pump}))};
};
