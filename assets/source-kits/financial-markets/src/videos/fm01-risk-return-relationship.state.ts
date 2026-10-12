import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const p=ramp(f,150,240),mu=3+4*p,sigma=2+8*p;const z=[-Math.SQRT2,-1/Math.SQRT2,0,1/Math.SQRT2,Math.SQRT2];const chosen=f<420?-1:f>=660?0:Math.min(4,Math.floor((f-420)/45));return {mu,sigma,samples:z.map(v=>mu+sigma*v),chosen,realized:chosen<0?null:mu+sigma*z[chosen]};};
