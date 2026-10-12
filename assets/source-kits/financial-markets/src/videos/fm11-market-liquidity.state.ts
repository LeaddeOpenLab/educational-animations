import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const q=12*ramp(f,180,480),sizes=[5,5,10],prices=[101,102,103];let remaining=q,cost=0;const asks=prices.map((price,i)=>{const taken=Math.min(sizes[i],remaining);remaining-=taken;cost+=taken*price;return {price,size:sizes[i]-taken};});return {asks,filled:q,cost,original:sizes};};
