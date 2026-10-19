import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {EnzymeKinetics, mmRate} from '../components/Bio';
import {Axes} from '../components/Plot';
import {COLORS, ramp} from '../theme';

const T={Vmax:10,Km:2, concentrations:[.5,2,8], rate:(s:number)=>mmRate(s,10,2), move:(frame:number)=>ramp(frame,15,125)};
const DESIGN_AUDIT={
  visualArgument:'The moving measured point slows its climb although substrate concentration keeps increasing; the curve approaches a fixed Vmax.',
  motion:'A substrate marker moves from low concentration to Km and then to four times Km while the velocity readout follows Michaelis–Menten arithmetic.',
  example:'At Km=2 and Vmax=10, v=5; at substrate 8, v=8, still below Vmax.',
  antiTemplate:'Unlike protein folding, the spatial positions encode two numerical variables and the half-max marker stays fixed while substrate moves.',
  sceneRationale:'Three measured concentration scenes plus a saturation conclusion are required to see the nonlinearity; a single before-after point would imply a straight-line relationship.',
};
const Plot:React.FC<{frame:number;stage:number}>=({frame,stage})=>{
  const target=T.concentrations[Math.min(stage,2)];
  const s=stage===0?target:stage===1?T.concentrations[0]+(target-T.concentrations[0])*T.move(frame):T.concentrations[1]+(target-T.concentrations[1])*T.move(frame);
  const title=['Low substrate','Half-max at Km','Approaching saturation','Saturation is a limit'][stage];
  const desc=[
    ['Few enzyme sites are occupied.','Initial increases in substrate raise rate quickly.'],
    ['At Km, the reaction reaches half of Vmax.','This marker is fixed by the enzyme.'],
    ['More substrate produces a smaller rate gain.','The working point bends toward the plateau.'],
    ['The curve approaches Vmax.','Adding substrate cannot exceed the enzyme capacity.'],
  ][stage];
  const scale={xDomain:[0,10] as [number,number],yDomain:[0,11] as [number,number],width:700,height:260,px:(x:number)=>80+x*70,py:(y:number)=>275-y*23.5,ux:70,uy:23.5,pad:{l:80,r:20,t:15,b:20},zeroY:275,zeroX:80};
  return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="ENZYME KINETICS · MICHAELIS–MENTEN" frame={frame} top={0} left={0}/><Heading text={title} frame={frame} top={48} left={0} width={1500}/></>}
    body={<SplitBody ratio={0.35} left={<Lines frame={frame} items={desc} top={0} left={0} width={525} size={29} bullet={false}/>}
    right={<svg data-k="shape" data-n="enzyme velocity curve" viewBox="0 0 930 330" width="100%" height="330"><line x1="80" y1="275" x2="790" y2="275" stroke={COLORS.axis} strokeWidth="3"/><line x1="80" y1="275" x2="80" y2="20" stroke={COLORS.axis} strokeWidth="3"/><text x="795" y="288" fill={COLORS.textMuted} fontSize="24">[S]</text><text x="40" y="28" fill={COLORS.textMuted} fontSize="24">v</text><EnzymeKinetics s={scale} Vmax={T.Vmax} Km={T.Km} substrate={stage===3?8:s} progress={Math.max(.65,ramp(frame,10,110))}/></svg>}/>}
    foot={<Chip text={`[S] ${stage===3?8:s.toFixed(1)} → v ${(stage===3?T.rate(8):T.rate(s)).toFixed(1)} of Vmax ${T.Vmax}`} color={COLORS.result}/>}/>;
};
const Low:React.FC<{frame:number}>=({frame})=><Plot frame={frame} stage={0}/>;
const Half:React.FC<{frame:number}>=({frame})=><Plot frame={frame} stage={1}/>;
const Rise:React.FC<{frame:number}>=({frame})=><Plot frame={frame} stage={2}/>;
const Limit:React.FC<{frame:number}>=({frame})=><Plot frame={frame} stage={3}/>;
export const SCENES:SceneDef[]=[
{id:'low-substrate',Comp:Low,dur:175},
{id:'half-max',Comp:Half,dur:230},
{id:'slowing-gain',Comp:Rise,dur:260},
{id:'saturation',Comp:Limit,dur:235},
];
void DESIGN_AUDIT;
