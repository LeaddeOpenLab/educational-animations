export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const time=Math.min(80,100*ramp(f,150,600)),woke=time>=80;return {time,deadline:80,ticks:woke?[0,10,20,80]:[0,10,20].filter(t=>t<=time),callbacks:woke?[80]:[],sleep:time>=20?[20,80] as [number,number]:null,accounted:time<20?Math.floor(time/10)*10:woke?80:20};};
