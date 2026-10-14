import {sumPotential, SynapticInput} from '../components/NeuroMechanisms';
export const cases:SynapticInput[][]=[[{amp:10,at:1}],[{amp:10,at:1},{amp:10,at:2}],[{amp:9,at:1},{amp:9,at:1}],[{amp:9,at:1},{amp:9,at:1},{amp:-8,at:1}]];
export const integrationState=(frame:number)=>{
 const index=frame<180?0:frame<420?1:frame<630?2:3;
 const starts=[0,180,420,630];const time=(frame-starts[index])/30;
 const inputs=cases[index];const voltage=sumPotential(time,inputs,-70,6);
 const crossing=inputs.map(x=>x.at).filter(t=>sumPotential(t,inputs,-70,6)>=-55).sort((a,b)=>a-b)[0];
 const fired=crossing!==undefined&&time>=crossing;
 return {index,time,inputs,voltage,crossing,fired,outputProgress:fired?Math.min(1,(time-crossing)/1.5):0,threshold:-55,rest:-70,trace:Array.from({length:Math.max(1,Math.floor(time*20)+1)},(_,i)=>({t:i/20,v:sumPotential(i/20,inputs,-70,6)}))};
};
