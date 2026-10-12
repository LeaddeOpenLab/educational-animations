import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const time=Math.max(0,Math.min(10,(f-120)/60)),price=f<360?100:120,lag=100+20*ramp(f,360,240);return {time,price,lag,news:f>=360,efficient: (t:number)=>t<4?100:120,slow:(t:number)=>t<4?100:100+20*Math.min(1,(t-4)/4)};};
