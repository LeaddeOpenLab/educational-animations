const samples=[0,1,0,-1,2,-2,1,1];
const ramp=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
export const streamState=(frame:number)=>{
 const start=frame>=580?4:frame>=340?2:0;
 const visualStart=2*ramp(frame,260,340)+2*ramp(frame,500,580);
 const values=samples.slice(start,start+4);
 return {samples,start,visualStart,values,indexes:[start,start+1,start+2,start+3],rms:Math.sqrt(values.reduce((n,v)=>n+v*v,0)/values.length),outputs:[90,340,580].filter(f=>frame>=f).map((_,i)=>3+i*2),moving:visualStart!==start};
};
