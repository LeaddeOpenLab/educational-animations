import React from 'react';
import type {SceneDef} from '../Video';
import {COLORS,FONT,alpha} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Band} from '../components/SceneShell';
import {sumPotential} from '../components/NeuroMechanisms';
import {integrationState} from './ns04-synaptic-integration.state';
const T={state:integrationState,rest:-70,threshold:-55,px:(t:number)=>80+t*95,py:(v:number)=>490-(v+70)*7};
const DESIGN_AUDIT={visualArgument:'Signals arriving at one or several dendrites contribute actual voltage curves, and only the total determines whether an axonal spike leaves.',motion:'Single EPSP decays; repeated input adds before decay; simultaneous branches combine; a third inhibitory contribution lowers the sum and prevents output.',example:'10 mV EPSPs at t=1 and t=2 sum temporally; two 9 mV inputs sum spatially; an additional minus 8 mV term returns the spatial sum below threshold.',antiTemplate:'A branching neuron with converging inputs and summed curves replaces the preceding synaptic molecule transport; input locations and timings differ across examples.',sceneRationale:'Four cases isolate amplitude, temporal overlap, spatial convergence and inhibition without equating input count with firing.'};
const Txt=({x,y,children,color=COLORS.textMuted}:{x:number;y:number;children:React.ReactNode;color?:string})=><text x={x} y={y} fontFamily={FONT} fontSize={24} fill={color}>{children}</text>;
const Integrator=({frame}:{frame:number})=>{
 const s=T.state(frame);const branches=s.index>=2?[[100,70],[100,170],[100,270]]:[[100,100]];
 return <svg data-k="figure" data-n="dendritic inputs and total voltage" viewBox="0 0 1000 620" style={{width:972,height:603}}>
  {branches.map(([x,y],i)=><g key={i}><path d={`M ${x} ${y} Q 240 ${y} 365 180`} fill="none" stroke={i===2?COLORS.result:COLORS.primary} strokeWidth={5}/><circle cx={x} cy={y} r={20} fill={alpha(i===2?COLORS.result:COLORS.primary,.3)} stroke={i===2?COLORS.result:COLORS.primary} strokeWidth={3}/><Txt x={135} y={y-14}>{i===2?'Inhibitory':'Excitatory'}</Txt></g>)}
  <circle cx={405} cy={180} r={53} stroke={COLORS.primary} fill={alpha(COLORS.primary,.14)} strokeWidth={4}/>
  <path d="M 460 180 H 880" stroke={COLORS.axis} strokeWidth={8}/><Txt x={500} y={130}>Axon initial segment</Txt><Txt x={800} y={225}>Axon</Txt>
  {s.inputs.map((input,i)=>{const branch=s.index<2?0:i;const source=branches[branch]??branches[0];const p=Math.max(0,Math.min(1,(s.time-(input.at-.8))/.8));if(s.time<input.at-.8||s.time>input.at+.12)return null;return <circle key={i} cx={source[0]+(365-source[0])*p} cy={source[1]+(180-source[1])*p} r={12} fill={input.amp<0?COLORS.result:COLORS.accent}/>;})}
  {s.fired&&<circle cx={470+s.outputProgress*410} cy={180} r={14} fill={COLORS.accent}/>}
  <Txt x={520} y={280} color={s.fired?COLORS.result:COLORS.textMuted}>{s.fired?'Threshold crossed → spike':'Below threshold → no spike'}</Txt>
  <line x1={80} y1={530} x2={875} y2={530} stroke={COLORS.axis} strokeWidth={3}/><line x1={80} y1={330} x2={80} y2={530} stroke={COLORS.axis} strokeWidth={3}/>
  <line x1={80} y1={T.py(T.threshold)} x2={875} y2={T.py(T.threshold)} stroke={COLORS.warn} strokeWidth={3} strokeDasharray="7 8"/>
  <Txt x={700} y={T.py(T.threshold)-12}>{`${T.threshold} mV threshold`}</Txt>
  {s.inputs.map((input,i)=><polyline key={i} points={s.trace.map(p=>`${T.px(p.t)},${T.py(sumPotential(p.t,[input],T.rest,6))}`).join(' ')} fill="none" stroke={alpha(input.amp<0?COLORS.result:COLORS.accent,.48)} strokeWidth={2}/>)}
  <polyline points={s.trace.map(p=>`${T.px(p.t)},${T.py(p.v)}`).join(' ')} fill="none" stroke={COLORS.primary} strokeWidth={5}/>
  <circle cx={T.px(s.time)} cy={T.py(s.voltage)} r={7} fill={COLORS.primary}/>
  <Txt x={80} y={580} color={COLORS.textStrong}>{`Total ${s.voltage.toFixed(1)} mV`}</Txt><Txt x={400} y={580}>Simplified linear summation</Txt><Txt x={800} y={580}>Time →</Txt>
 </svg>;
};
const Layout=({frame,title,copy,foot}:{frame:number;title:string;copy:string[];foot:string})=><><Backdrop width={1920} height={1080}/><Band top={74} height={140} name="header"><div data-k="text" data-n="course" style={{fontFamily:FONT,fontSize:25,color:COLORS.primary}}>INTRODUCTION TO NEUROSCIENCE</div><h1 data-k="text" data-n="Synaptic integration" style={{fontFamily:FONT,fontSize:64,color:COLORS.textStrong,margin:'18px 0'}}>Synaptic integration</h1></Band><Band top={240} height={620} name="body"><div style={{display:'flex',gap:132,alignItems:'center'}}><div style={{width:600,flexShrink:0,fontFamily:FONT}}><h2 data-k="text" data-n={title} style={{fontSize:44,lineHeight:1.2,color:COLORS.accent}}>{title}</h2>{copy.map(c=><p key={c} data-k="text" data-n={c} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted}}>{c}</p>)}</div><Integrator frame={frame}/></div></Band><Band top={900} height={90} name="footer"><div data-k="text" data-n={foot} style={{fontFamily:FONT,fontSize:30,color:COLORS.result}}>{foot}</div></Band></>;
const Single=({frame}:{frame:number})=><Layout frame={frame} title="One input can be too small" copy={['A single excitatory input raises voltage.','Its EPSP decays below spike threshold.']} foot="The total membrane voltage determines output."/>;
const Temporal=({frame}:{frame:number})=><Layout frame={frame+180} title="Add inputs close in time" copy={['A second input arrives before the first fades.','Their remaining effects add.']} foot="Temporal summation: repeated activity at one synapse."/>;
const Spatial=({frame}:{frame:number})=><Layout frame={frame+420} title="Add inputs across space" copy={['Two excitatory synapses activate together.','Their combined voltage crosses threshold.']} foot="Spatial summation: separate synapses contribute to one neuron."/>;
const Inhibition=({frame}:{frame:number})=><Layout frame={frame+630} title="Inhibition changes the total" copy={['An inhibitory contribution opposes excitation.','The same excitatory inputs now remain subthreshold.']} foot="Excitation and inhibition are integrated before a spike is generated."/>;
export const SCENES:SceneDef[]=[{id:'single',Comp:Single,dur:180,transition:'none'},{id:'temporal',Comp:Temporal,dur:240,transition:'none'},{id:'spatial',Comp:Spatial,dur:210,transition:'none'},{id:'inhibition',Comp:Inhibition,dur:240,transition:'none'}];
