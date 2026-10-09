import {energyState} from '../components/EdgeAI';
export const powerState=(frame:number)=>{
 const count=Math.max(0,Math.min(10,Math.floor((frame-165)/20)+1));
 const a=energyState(Array(10).fill(100),1,count);
 const b=energyState(Array(5).fill(300),1,Math.min(count,5));
 return {count,a,b,powerA:Array(10).fill(100) as number[],powerB:Array(5).fill(300) as number[],latencyA:10,latencyB:5};
};
