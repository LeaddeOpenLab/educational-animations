import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const S=80+20*ramp(f,150,150)+2*ramp(f,360,90)+3*ramp(f,540,90)+15*ramp(f,720,90),strike=100,premium=5,payoff=Math.max(S-strike,0);return {S,strike,premium,payoff,profit:payoff-premium};};
