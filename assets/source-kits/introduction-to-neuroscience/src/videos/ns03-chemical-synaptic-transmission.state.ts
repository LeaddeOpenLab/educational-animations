import {ligandState} from '../components/NeuroMechanisms';
const ramp=(f:number,a:number,d:number)=>Math.max(0,Math.min(1,(f-a)/d));
export const synapseState=(frame:number)=>{
 const calcium=ramp(frame,90,90);const release=calcium===1?ramp(frame,210,180):0;
 const binding=release===1?ramp(frame,420,150):0;const clearance=ramp(frame,705,135);
 const ligands=ligandState(release,binding,clearance,6);const occupied=ligands.filter(l=>l.bound).length;
 return {spike:ramp(frame,0,90),calcium,release,binding,clearance,ligands,occupied,response:occupied/6,vesicleVisible:release<1};
};
