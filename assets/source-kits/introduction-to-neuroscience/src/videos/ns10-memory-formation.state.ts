const clip=(x:number)=>Math.max(0,Math.min(1,x));
export const memoryState=(frame:number)=>{
 const association=frame>=180;
 const replay=frame>=240&&frame<750;
 const replayLocal=replay?(frame-240)%120:0;
 const travel=frame<240?clip(frame/180):frame<750?clip(replayLocal/90):clip((frame-750)/105);
 const replayCount=frame<240?0:Math.min(4,Math.floor((frame-240)/120));
 const weight=.25+.75*clip((frame-300)/420);
 const retrieved=frame>=855;
 return {association,replay,replayCount,travel,weight,hippocampusPresent:true,
 placeActive:frame<180?frame>=45:frame<240?true:frame<750?travel>=.5:retrieved,
 soundActive:frame<180?frame>=90:frame<240?true:frame<750?travel>=1:true,
 route:frame>=750?[{x:630,y:130},{x:400,y:70},{x:150,y:130}]:[{x:390,y:320},{x:150,y:130},{x:630,y:130}],retrieved};
};
