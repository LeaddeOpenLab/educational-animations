import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {SignalingCascade} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={kinases:['R','K1','K2','K3'],active:(f:number)=>ramp(f,16,145),response:(p:number)=>Math.round(p*100)};
const DESIGN_AUDIT={
 visualArgument:'A ligand activates a membrane receptor and a sequence of intracellular proteins passes the signal to a response.',
 motion:'Ligand crosses toward the receptor, phosphorylation marks light up on K1, K2 and K3 in order, and a response meter grows after the relay.',
 example:'One ligand-receptor event can trigger a multi-step kinase cascade before the target cell response.',
 antiTemplate:'Unlike the negative-feedback lesson next, the signal propagates forward through ordered phosphorylation and does not loop back to suppress the ligand.',
 sceneRationale:'Ligand binding, receptor activation, intracellular relay and final response require four scenes; a line of boxes would omit the causal activation timing.',
};
const Relay:React.FC<{frame:number;step:number}>=({frame,step})=>{
 const p=T.active(frame); const phase=step===0?.12:step===1?.5:step===2?Math.max(.5,p):1;
 const heads=['A ligand arrives','The receptor activates','Kinases relay the signal','The cell responds'];
 const note=[['A signal begins outside the cell.','Its target is a membrane receptor.'],['Binding changes the receptor state.','The message crosses the boundary.'],['K1 activates K2, then K3.','Phosphate marks show each active stage.'],['The last active kinase reaches a target.','The cell response is switched on.']][step];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="SIGNAL TRANSDUCTION" frame={frame} top={0} left={0}/><Heading text={heads[step]} frame={frame} top={48} left={0} width={1500}/></>}
 body={<SplitBody ratio={0.33} left={<Lines frame={frame} items={note} top={0} left={0} width={495} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="sequential phosphorylation relay" viewBox="0 0 930 360" width="100%" height="330"><line x1="80" y1="185" x2="850" y2="185" stroke={COLORS.axis} strokeWidth="6" strokeDasharray="14 8"/><text x="80" y="135" fill={COLORS.textMuted} fontSize="23">outside</text><text x="80" y="325" fill={COLORS.textMuted} fontSize="23">inside</text>
 <circle cx="210" cy={55+110*(step===0?p:1)} r="20" fill={COLORS.accent}/><text x="238" y={45+110*(step===0?p:1)} fill={COLORS.textStrong} fontSize="22">ligand</text>
 <SignalingCascade x={210} y={230} steps={T.kinases} gap={155} progress={phase} response={step===3?'response':undefined}/>
 {step===3?<><rect x="250" y="322" width={500*p} height="14" rx="7" fill={COLORS.result}/><text x="770" y="339" fill={COLORS.result} fontSize="23">{T.response(p)}%</text></>:null}</svg>}/>}
 foot={<Chip text={step===3?'receptor activation → intracellular response':'activation propagates in sequence'} color={step===3?COLORS.result:COLORS.primary}/>}/>;
};
const Ligand:React.FC<{frame:number}>=({frame})=><Relay frame={frame} step={0}/>;
const Receptor:React.FC<{frame:number}>=({frame})=><Relay frame={frame} step={1}/>;
const Kinases:React.FC<{frame:number}>=({frame})=><Relay frame={frame} step={2}/>;
const Output:React.FC<{frame:number}>=({frame})=><Relay frame={frame} step={3}/>;
export const SCENES:SceneDef[]=[
{id:'ligand-arrival',Comp:Ligand,dur:190},
{id:'receptor-activation',Comp:Receptor,dur:225},
{id:'kinase-relay',Comp:Kinases,dur:270},
{id:'cell-response',Comp:Output,dur:215},
];
void DESIGN_AUDIT;
