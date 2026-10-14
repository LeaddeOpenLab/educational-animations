import {pointOnPath} from '../components/MotionActions';
export const touchPaths={first:[{x:680,y:690},{x:650,y:540},{x:650,y:330}],cross:[{x:650,y:330},{x:550,y:310},{x:450,y:270},{x:250,y:240}],thalamic:[{x:250,y:240},{x:250,y:140}],cortical:[{x:250,y:140},{x:170,y:65}]};
export const touchRouteState=(frame:number)=>{
 const p=(a:number,b:number)=>Math.max(0,Math.min(1,(frame-a)/(b-a)));
 const firstTravel=p(150,330),crossTravel=p(390,510),thalamicTravel=p(540,630),corticalTravel=p(660,735);
 const medullaArrived=frame>=330,thalamusArrived=frame>=630,cortexArrived=frame>=735;
 const packetOwner=frame<330?'afferent':frame<390?'medulla':frame<510?'crossing':frame<630?'ascending':frame<660?'thalamus':frame<735?'radiation':'cortex';
 const point=frame<390?pointOnPath(touchPaths.first,firstTravel):frame<540?pointOnPath(touchPaths.cross,crossTravel):frame<660?pointOnPath(touchPaths.thalamic,thalamicTravel):pointOnPath(touchPaths.cortical,corticalTravel);
 return {firstTravel,crossTravel,thalamicTravel,corticalTravel,medullaArrived,thalamusArrived,cortexArrived,packetOwner,point};
};
