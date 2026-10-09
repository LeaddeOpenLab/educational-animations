export const featureState=(frame:number)=>{
 const samples=frame>=700?[1,1,1,1]:[-1,1,-1,1];
 const squared=samples.map(x=>x*x);
 const count=Math.max(0,Math.min(4,Math.floor((frame-380)/45)+1));
 const sum=squared.slice(0,count).reduce((a,b)=>a+b,0);
 return {samples,squared,count,sum,meanSquare:count===4?sum/samples.length:null,rms:count===4?Math.sqrt(sum/samples.length):null,mean:samples.reduce((a,b)=>a+b,0)/samples.length,squareCount:Math.max(0,Math.min(4,Math.floor((frame-170)/35)+1))};
};
