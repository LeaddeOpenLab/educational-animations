import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const S=90+20*ramp(f,180,270),delta=bsDelta(S,100,.5,.03,.2),shares=100*delta,hedge=f<450?-100*bsDelta(90,100,.5,.03,.2):-(100*bsDelta(90,100,.5,.03,.2)+(shares-100*bsDelta(90,100,.5,.03,.2))*ramp(f,450,150));return {S,delta,shares,hedge,net:shares+hedge};};
