import {classify} from '../components/EdgeAI';
export const confidenceState=(frame:number)=>{
 const mix=Math.max(0,Math.min(1,(frame-390)/100));
 const scores=frame>=670?[.7,.2,.1]:[.6+.22*mix,.25-.15*mix,.15-.07*mix];
 const threshold=.7;const decision=classify(scores,threshold);
 return {scores,threshold,decision,output:frame<170?'—':decision.accepted?'A':'unknown',mix};
};
