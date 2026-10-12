import {portfolioSigma,bondPrice,bsDelta} from '../components/Fin';
export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const assets=f<450?100+10*ramp(f,180,180):110-20*ramp(f,450,180),debt=80,equity=assets-debt;return {assets,debt,equity,initial:20,assetReturn:(assets/100-1)*100,equityReturn:(equity/20-1)*100};};
