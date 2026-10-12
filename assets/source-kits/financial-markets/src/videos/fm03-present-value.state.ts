import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const rate=.1*ramp(f,180,180),years=f<420?2:2+ramp(f,420,150),future=121,present=future/(1+rate)**years;return {rate,years,future,present,tokenX:f<660?700-530*ramp(f,180,180):170+530*ramp(f,660,120),tokenValue:f<660?undefined:present*(1+rate)**(years*ramp(f,660,120)),reconstructed:present*(1+rate)**years};};
