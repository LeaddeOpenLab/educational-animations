import React from 'react';
import type {SceneDef} from '../Video';
import {COLORS,FONT,alpha} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Band} from '../components/SceneShell';
import {ChemicalSynapse,IonTransit} from '../components/NeuroMechanisms';
import {synapseState} from './ns03-chemical-synaptic-transmission.state';
const T={state:synapseState,molecules:6};
const DESIGN_AUDIT={visualArgument:'Follow identifiable transmitter molecules from a vesicle into the cleft and onto receptors, with calcium entry preceding release.',motion:'A spike arrives, calcium crosses inward, vesicle molecules leave, diffuse and dock, then occupancy and the postsynaptic response decline as clearance removes molecules.',example:'One excitatory ionotropic synapse shows the chemical-to-electrical conversion; other receptor effects are outside this short lesson.',antiTemplate:'Uses a persistent two-membrane cleft and material transport, unlike the adjacent electrical waveform and convergent input-summation lessons.',sceneRationale:'Four stages retain causal order and object identity: calcium trigger, release, receptor response and termination.'};
const Txt=({x,y,children,color=COLORS.textMuted}:{x:number;y:number;children:React.ReactNode;color?:string})=><text x={x} y={y} fontFamily={FONT} fontSize={25} fill={color}>{children}</text>;
const CleftBoard=({frame}:{frame:number})=>{
 const s=T.state(frame);
 return <svg data-k="figure" data-n="chemical synapse transmitter transfer" viewBox="0 0 1000 620" style={{width:972,height:603}}>
  <Txt x={175} y={45}>Presynaptic terminal</Txt><Txt x={620} y={45}>Postsynaptic cell</Txt>
  <path d="M 35 130 H 180 V 285" fill="none" stroke={COLORS.primary} strokeWidth={6}/>
  {frame<100&&<circle cx={35+s.spike*145} cy={130} r={13} fill={COLORS.accent}/>}
  <ChemicalSynapse x={430} y={330} release={s.release} binding={s.binding} clearance={s.clearance} count={T.molecules}/>
  <g transform="translate(270 115) scale(.55)"><IonTransit x={0} y={0} open={frame>=90?1:0} transit={s.calcium} ion="Ca²⁺"/></g>
  <Txt x={75} y={215} color={COLORS.result}>Ca2+ entry</Txt>
  <Txt x={460} y={575}>Cleft</Txt><Txt x={645} y={525}>Receptors</Txt>
  <Txt x={175} y={525}>{s.release<1?'Vesicle':'Transmitter released'}</Txt>
  <path d={`M 710 340 H 740 L 775 ${340-s.response*100} L 820 340 H 920`} stroke={COLORS.result} strokeWidth={5} fill="none"/>
  <Txt x={710} y={390}>Postsynaptic</Txt><Txt x={710} y={425}>response</Txt>
  <Txt x={710} y={480} color={COLORS.textStrong}>{`${s.occupied} / ${T.molecules} bound`}</Txt>
  {frame>=690&&<g>
   <path d="M 590 180 Q 570 85 390 90 Q 220 90 200 235" stroke={COLORS.result} strokeWidth={3} strokeDasharray="7 8" fill="none"/>
   {s.ligands.map((m,i)=>{if(m.visible)return null;const p=Math.min(1,(s.clearance-(i+1)/T.molecules)*3);return <circle key={i} cx={590-380*p} cy={180-95*Math.sin(p*Math.PI)} r={9} fill={COLORS.accent}/>;})}
   <rect x={188} y={222} width={25} height={36} rx={6} fill={COLORS.result}/><Txt x={420} y={115}>Clearance</Txt>
  </g>}
  <Txt x={60} y={610}>Excitatory ionotropic example · simplified geometry</Txt>
 </svg>;
};
const Layout=({frame,title,copy,foot}:{frame:number;title:string;copy:string[];foot:string})=><><Backdrop width={1920} height={1080}/><Band top={74} height={145} name="header"><div data-k="text" data-n="course" style={{fontFamily:FONT,fontSize:25,color:COLORS.primary}}>INTRODUCTION TO NEUROSCIENCE</div><h1 data-k="text" data-n="Chemical synaptic transmission" style={{fontFamily:FONT,fontSize:61,color:COLORS.textStrong,margin:'18px 0'}}>Chemical synaptic transmission</h1></Band><Band top={240} height={620} name="body"><div style={{display:'flex',gap:132,alignItems:'center'}}><div style={{width:600,flexShrink:0,fontFamily:FONT}}><h2 data-k="text" data-n={title} style={{fontSize:44,lineHeight:1.2,color:COLORS.accent}}>{title}</h2>{copy.map(c=><p key={c} data-k="text" data-n={c} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted}}>{c}</p>)}</div><CleftBoard frame={frame}/></div></Band><Band top={900} height={90} name="footer"><div data-k="text" data-n={foot} style={{fontFamily:FONT,fontSize:30,color:COLORS.result}}>{foot}</div></Band></>;
const Calcium=({frame}:{frame:number})=><Layout frame={frame} title="An electrical signal arrives" copy={['The spike opens Ca2+ channels.','Calcium enters the terminal before release begins.']} foot="Presynaptic depolarization → Ca2+ influx."/>;
const Release=({frame}:{frame:number})=><Layout frame={frame+210} title="Calcium triggers release" copy={['A docked vesicle fuses with the membrane.','Neurotransmitter leaves the terminal.']} foot="A chemical messenger enters the synaptic cleft."/>;
const Receptors=({frame}:{frame:number})=><Layout frame={frame+420} title="Bind, then respond" copy={['Transmitter crosses the cleft and binds receptors.','Ligand-gated channels produce a postsynaptic response.']} foot="The cleft is crossed chemically, not by a jumping action potential."/>;
const Clearance=({frame}:{frame:number})=><Layout frame={frame+690} title="Clear the messenger" copy={['Dissociation and removal reduce receptor occupancy.','The postsynaptic response subsides.']} foot="Clearance helps end the signal and prepares the next transmission."/>;
export const SCENES:SceneDef[]=[{id:'calcium',Comp:Calcium,dur:210,transition:'none'},{id:'release',Comp:Release,dur:210,transition:'none'},{id:'receptors',Comp:Receptors,dur:270,transition:'none'},{id:'clearance',Comp:Clearance,dur:210,transition:'none'}];
