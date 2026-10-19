import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {Membrane} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={outside:1,inside:.15,postOutside:.65,postInside:.50,flow:(f:number)=>ramp(f,20,135)};
const DESIGN_AUDIT={
  visualArgument:'A dense outside pool drives visible cargo through a channel; ATP then drives cargo in the opposite direction through a pump.',
  motion:'A molecule crosses the actual bilayer, dot densities shift toward equality, and a second molecule moves against the remaining gradient with ATP displayed.',
  example:'Outside concentration begins at 1.00 and inside at 0.15; after passive flux the pools are 0.65 and 0.50.',
  antiTemplate:'Unlike the adjacent electrochemical-gradient lesson, this transport sequence follows cargo and transporter type rather than opposing forces on one ion.',
  sceneRationale:'Four scenes distinguish the membrane barrier, passive passage, changed concentrations, and ATP-driven reverse passage; combining the two mechanisms would hide their energy difference.',
};
const Transport:React.FC<{frame:number;phase:number}>=({frame,phase})=>{
  const p=T.flow(frame);
  const passive=phase<3;
  const outside=phase<2?T.outside:T.postOutside;
  const inside=phase<2?T.inside:T.postInside;
  const title=['A selective boundary','A channel lets solute pass','The gradient becomes smaller','A pump needs ATP'][phase];
  const copy=[
    ['The phospholipid bilayer blocks many solutes.','Outside starts more concentrated.'],
    ['A channel provides a passage.','Solute travels down its concentration gradient.'],
    ['Net diffusion changes both pools.','The difference between sides is reduced.'],
    ['A pump moves solute back toward the dense side.','Going against the gradient costs ATP.'],
  ][phase];
  return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="CELL MEMBRANE TRANSPORT" frame={frame} top={0} left={0}/><Heading text={title} frame={frame} top={48} left={0} width={1500}/></>}
   body={<SplitBody ratio={0.36} left={<Lines frame={frame} items={copy} top={0} left={0} width={545} size={29} bullet={false}/>}
    right={<svg data-k="shape" data-n="molecule crosses bilayer" viewBox="0 0 850 380" width="100%" height="330"><Membrane x={35} y={178} thick={60} w={770} outside={outside} inside={inside} transporters={[{kind:passive?'channel':'pump',at:.5,label:passive?'channel':'ATP pump',atp:!passive}]} cargo={phase===0?undefined:{at:.5,direction:passive?'in':'out',progress:phase===2?1:p}} progress={Math.max(.1,p)}/></svg>}/>}
   foot={<Chip text={passive?'passive: down the gradient':'active: against the gradient + ATP'} color={passive?COLORS.result:COLORS.warn}/>}/>;
};
const Barrier:React.FC<{frame:number}>=({frame})=><Transport frame={frame} phase={0}/>;
const Channel:React.FC<{frame:number}>=({frame})=><Transport frame={frame} phase={1}/>;
const Pools:React.FC<{frame:number}>=({frame})=><Transport frame={frame} phase={2}/>;
const Pump:React.FC<{frame:number}>=({frame})=><Transport frame={frame} phase={3}/>;
export const SCENES:SceneDef[]=[
{id:'barrier',Comp:Barrier,dur:175},
{id:'channel-crossing',Comp:Channel,dur:265},
{id:'pools-change',Comp:Pools,dur:205},
{id:'atp-pump',Comp:Pump,dur:255},
];
void DESIGN_AUDIT;
