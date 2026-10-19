import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {IonGradient} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={insideK:140,outsideK:5,rtf:26.7, charge:(outside:number,inside:number)=>26.7*Math.log(outside/inside), advance:(f:number)=>ramp(f,14,120)};
const DESIGN_AUDIT={
 visualArgument:'Two opposed arrows exert different forces on K+: concentration drives K+ out, increasing internal negativity pulls K+ back in.',
 motion:'Ions first spread outward through a channel; internal charge separation increases an inward electrical arrow until the two arrows balance.',
 example:'With K+ about 140 inside and 5 outside, the single-ion equilibrium potential is approximately -89 mV at 37°C.',
 antiTemplate:'Unlike the neighboring membrane-transport clip, the same ion is pulled in opposite directions and the final result is force balance rather than cargo crossing.',
 sceneRationale:'The initial concentration difference, outward flow, growing voltage, and balanced final state require four scenes; a single membrane diagram cannot establish why flow stops.',
};
const Forces:React.FC<{frame:number;step:number}>=({frame,step})=>{
 const p=T.advance(frame);
 const charge=step===0?0:step===1?.35:step===2?.75:1;
 const titles=['K+ is concentrated inside','Chemical force pushes K+ out','Charge separation pulls K+ in','Forces balance'];
 const notes=[
  ['Inside K+ is high; outside K+ is low.','Open channels permit outward diffusion.'],
  ['K+ follows the concentration gradient.','Positive charge begins leaving the cell.'],
  ['The inside becomes relatively negative.','Electrical attraction opposes further exit.'],
  ['Outward and inward forces can match.','Net K+ flux is zero at equilibrium.'],
 ][step];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="ELECTROCHEMICAL GRADIENT · K+" frame={frame} top={0} left={0}/><Heading text={titles[step]} frame={frame} top={48} left={0} width={1560}/></>}
 body={<SplitBody ratio={0.35} left={<Lines frame={frame} items={notes} top={0} left={0} width={530} size={28} bullet={false}/>}
 right={<svg data-k="shape" data-n="opposing chemical electrical forces" viewBox="0 0 850 380" width="100%" height="330"><IonGradient x={110} y={20} w={650} h={320} out={T.outsideK} in_={T.insideK} progress={Math.max(.2,p)} showPotential={step===3}/>
 <path d={`M 52 275 L 52 ${275-110*Math.max(.2,p)}`} stroke={COLORS.accent} strokeWidth="9"/><polygon points={`52,${263-110*Math.max(.2,p)} 37,${285-110*Math.max(.2,p)} 67,${285-110*Math.max(.2,p)}`} fill={COLORS.accent}/>
 {step>0?<circle cx="500" cy={275-175*(step===1?p:1)} r="14" fill={COLORS.primary} stroke={COLORS.textStrong} strokeWidth="3"/>:null}
 {step>1?<text x="650" y="315" fill={COLORS.result} fontSize="26">inside −</text>:null}
 {step>0?<path d={`M 810 88 L 810 ${88+110*charge}`} stroke={COLORS.result} strokeWidth="9"/>:null}{step>0?<polygon points={`810,${100+110*charge} 795,${78+110*charge} 825,${78+110*charge}`} fill={COLORS.result}/>:null}
 <text x="5" y="365" fill={COLORS.accent} fontSize="22">chemical: out</text>{step>0?<text x="650" y="26" fill={COLORS.result} fontSize="22">electrical: in</text>:null}</svg>}/>}
 foot={<Chip text={step===3?`Eₖ ≈ ${T.charge(T.outsideK,T.insideK).toFixed(0)} mV · one-ion equilibrium`:'concentration + voltage determine net force'} color={step===3?COLORS.result:COLORS.primary}/>}/>;
};
const Concentration:React.FC<{frame:number}>=({frame})=><Forces frame={frame} step={0}/>;
const Outward:React.FC<{frame:number}>=({frame})=><Forces frame={frame} step={1}/>;
const Pullback:React.FC<{frame:number}>=({frame})=><Forces frame={frame} step={2}/>;
const Balance:React.FC<{frame:number}>=({frame})=><Forces frame={frame} step={3}/>;
export const SCENES:SceneDef[]=[
{id:'concentration',Comp:Concentration,dur:180},
{id:'outward-diffusion',Comp:Outward,dur:225},
{id:'charge-separation',Comp:Pullback,dur:260},
{id:'equilibrium',Comp:Balance,dur:235},
];
void DESIGN_AUDIT;
