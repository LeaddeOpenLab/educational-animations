const clamp=(v:number)=>Math.max(0,Math.min(1,v));
const smooth=(f:number,a:number,b:number)=>{const p=clamp((f-a)/(b-a));return p*p*(3-2*p)};
export const transactionState=(frame:number)=>{
 const retry=frame>=205;
 const coinProgress=Array.from({length:5},(_,i)=>{
  const outward=smooth(frame,retry?210+i*10:42+i*10,retry?257+i*10:94+i*10);
  return retry?outward:outward*(1-smooth(frame,158+i*3,191+i*3));
 });
 const moved=coinProgress.reduce((a,b)=>a+b,0)*5;
 const committed=frame>=320;
 return {coinProgress,pendingA:100-moved,pendingB:40+moved,committed,
  publicA:committed?75:100,publicB:committed?65:40,
  showWorkspace:(frame>=32&&frame<200)||(frame>=205&&frame<328)};
};
