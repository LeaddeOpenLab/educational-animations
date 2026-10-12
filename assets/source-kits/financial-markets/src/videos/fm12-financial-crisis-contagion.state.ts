import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const a=10*ramp(f,150,120),p=ramp(f,330,120),b=6*p,d=2*p,q=ramp(f,570,120),c=4*q;return {a,b,c,d,p,q,failed:[a>=8,b>=5,c>=3,false]};};
