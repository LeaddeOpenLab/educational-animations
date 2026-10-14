const clip=(x:number)=>Math.max(0,Math.min(1,x));
export const plasticityState=(frame:number)=>{
 const positions=Array.from({length:6},(_,i)=>{
 const p=i<3?1:clip((frame-(345+(i-3)*45))/45);
 return {id:i,x:360+(115-360)*p,y:(-60+(i%3)*45)*(1-p)+(-75+i*25)*p,inserted:p===1,progress:p};
 });
 const receptors=positions.filter(p=>p.inserted).length;
 const strength=receptors/3;
 return {positions,receptors,strength,input:1,response:strength,baselineResponse:1,induction:frame>=180&&frame<330};
};
