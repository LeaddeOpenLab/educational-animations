import {pointOnPath} from '../components/MotionActions';
export const visualPaths={nasal:[{x:300,y:120},{x:340,y:230},{x:500,y:340},{x:680,y:425}],temporal:[{x:740,y:120},{x:770,y:230},{x:760,y:340},{x:720,y:425}],nasalRelay:[{x:680,y:425},{x:680,y:490}],temporalRelay:[{x:720,y:425},{x:720,y:490}],nasalRadiation:[{x:680,y:490},{x:630,y:560},{x:680,y:670}],temporalRadiation:[{x:720,y:490},{x:800,y:560},{x:720,y:670}]};
export const visualRouteState=(frame:number)=>{
 const p=(a:number,b:number)=>Math.max(0,Math.min(1,(frame-a)/(b-a)));
 // 0–0.25 is optic nerve entry, 0.25–1 traverses the chiasm.
 const travel=frame<330?.25*p(180,300):.25+.75*p(330,570);
 const lgnTravel=p(600,660),radiationTravel=p(690,795),lgnArrived=frame>=660,cortexArrived=frame>=795;
 const nasalPoint=frame<600?pointOnPath(visualPaths.nasal,travel):frame<690?pointOnPath(visualPaths.nasalRelay,lgnTravel):pointOnPath(visualPaths.nasalRadiation,radiationTravel);
 const temporalPoint=frame<600?pointOnPath(visualPaths.temporal,travel):frame<690?pointOnPath(visualPaths.temporalRelay,lgnTravel):pointOnPath(visualPaths.temporalRadiation,radiationTravel);
 return {retinalActivation:frame>=90?['left-nasal','right-temporal']:[],nasalTravel:travel,temporalTravel:travel,nasalPoint,temporalPoint,lgnTravel,radiationTravel,lgnArrived,cortexArrived,leftCortexActive:false};
};
