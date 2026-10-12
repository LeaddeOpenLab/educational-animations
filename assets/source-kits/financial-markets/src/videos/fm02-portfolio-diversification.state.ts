import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const n=1+Math.floor(15*ramp(f,150,300));const rho=.2+.4*ramp(f,450,180);return {n,rho,low:portfolioSigma(n,20,rho),high:portfolioSigma(n,20,.8),floor:20*Math.sqrt(rho)};};
