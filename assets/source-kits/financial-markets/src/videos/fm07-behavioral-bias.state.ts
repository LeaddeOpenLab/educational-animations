import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const x=f<360?10*ramp(f,150,120):10-20*ramp(f,360,210);const value=(v:number)=>v>=0?v**.88:-2*(-v)**.88;return {x,value:value(x),gain:value(10),loss:value(-10),curve:value};};
