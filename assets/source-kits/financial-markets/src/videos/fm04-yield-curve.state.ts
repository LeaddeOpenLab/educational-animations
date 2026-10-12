import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const short=2+3*ramp(f,150,480),long=4;return {short,long,spread:long-short,yc:(t:number)=>short+(long-short)*(t-1)/9};};
