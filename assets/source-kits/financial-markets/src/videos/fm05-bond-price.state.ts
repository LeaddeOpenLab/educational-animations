import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const yieldRate=.05+.05*ramp(f,180,270);const flows=[5,5,105],pv=flows.map((v,i)=>v/(1+yieldRate)**(i+1));const summed=Math.min(3,Math.max(0,Math.floor((f-450)/60)+1));return {yieldRate,flows,pv,summed,subtotal:pv.slice(0,summed).reduce((a,b)=>a+b,0),price:bondPrice(100,.05,3,yieldRate)};};
