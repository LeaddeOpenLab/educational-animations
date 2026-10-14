import {receptiveResponse} from '../components/NeuroMechanisms';
export const receptiveState=(frame:number)=>{
 const probe=frame<165?'none':frame<360?'center':frame<390?'none':frame<600?'surround':frame<630?'none':'outside';
 const spot=probe==='none'?undefined:{dx:probe==='center'?0:probe==='surround'?112:-215,dy:0,r:12};
 const rate=receptiveResponse(spot,160,'on',20,60);
 return {probe,spot,rate,spikes:Array.from({length:Math.round(rate/2)},(_,i)=>({x:70+((i*560/Math.max(1,Math.round(rate/2))+frame*2)%560),y:410})),r:160,baseline:20,gain:60};
};
