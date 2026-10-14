import React from 'react';
import type {SceneDef} from '../Video';
import {COLORS, FONT, alpha} from '../theme';
import {Backdrop} from '../components/Backdrop';
import {Band} from '../components/SceneShell';
import {IonTransit} from '../components/NeuroMechanisms';
import {restingState} from './ns01-resting-potential.state';
const T={state:restingState,rest:-70,insideK:12,outsideK:3};
const DESIGN_AUDIT={
 visualArgument:'Positive potassium leaves the cell while fixed negative charge remains; opposing electrical attraction grows before a pump maintains the gradient.',
 motion:'Four tracked K ions cross the entire membrane; escaped count drives negative markers and voltage. Three sodium and two potassium ions then move oppositely through a pump.',
 example:'A deliberately simplified build-up model ends near a typical neuronal resting voltage of minus 70 mV, not the potassium-only equilibrium value.',
 antiTemplate:'Unlike the next voltage-spike lesson, this board preserves unequal concentration pools and separates passive leak from ATP-powered maintenance.',
 sceneRationale:'Four stages distinguish gradient, charge separation, opposing forces and maintenance; deleting one confuses why voltage appears or why gradients persist.'
};
const Label=({x,y,children,color=COLORS.textMuted}:{x:number;y:number;children:React.ReactNode;color?:string})=><text x={x} y={y} fill={color} fontSize={25} fontFamily={FONT}>{children}</text>;
const Membrane=({frame}:{frame:number})=>{
 const s=T.state(frame);const phase=frame<150?0:frame<390?1:frame<660?2:3;
 return <svg data-k="figure" data-n="ion gradient and selective membrane" viewBox="0 0 1000 620" style={{width:972,height:603}}>
  <rect x={30} y={38} width={920} height={205} rx={20} fill={alpha(COLORS.result,.055)}/>
  <rect x={30} y={285} width={920} height={180} rx={20} fill={alpha(COLORS.primary,.055)}/>
  <Label x={45} y={80}>Outside</Label><Label x={45} y={330}>Inside</Label>
  <Label x={700} y={80} color={COLORS.primary}>More Na+</Label><Label x={700} y={420} color={COLORS.accent}>More K+</Label>
  {Array.from({length:T.outsideK},(_,i)=><circle key={i} cx={745+i*54} cy={150} r={11} fill={COLORS.accent}/>)}
  {Array.from({length:T.insideK},(_,i)=><circle key={i} cx={700+(i%6)*36} cy={340+Math.floor(i/6)*38} r={11} fill={COLORS.accent}/>)}
  {s.ions.map((ion,i)=><IonTransit key={i} x={180+i*135} y={260} open={s.channelOpen} transit={ion.p} direction="out" ion="K⁺"/>)}
  {Array.from({length:s.escaped},(_,i)=><text key={i} x={190+i*55} y={410} fill={COLORS.primary} fontFamily={FONT} fontSize={46}>−</text>)}
  <Label x={365} y={110}>K+ leak channels</Label>
  <Label x={45} y={505} color={COLORS.textStrong}>{`Inside relative to outside: ${s.voltage.toFixed(0)} mV`}</Label>
  {phase===2&&<g><circle cx={830} cy={370-220*s.balance} r={16} fill={COLORS.accent}/><circle cx={900} cy={150+220*s.balance} r={16} fill={COLORS.result}/><path d="M 830 245 V 195 l -10 15 m 10 -15 l 10 15" stroke={COLORS.accent} strokeWidth={5} fill="none"/><path d={`M 900 195 V ${195+50*s.electricPull} l -10 -15 m 10 15 l 10 -15`} stroke={COLORS.result} strokeWidth={5} fill="none"/><Label x={630} y={550}>Diffusion out ↔ electrical pull in</Label></g>}
  {phase===3&&<g transform="translate(670 525) scale(.55)">
   <rect x={-25} y={-25} width={225} height={50} rx={10} fill={alpha(COLORS.result,.15)} stroke={COLORS.result} strokeWidth={4}/>
   {s.sodium.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={12} fill={COLORS.primary}/>)}
   {s.potassium.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={12} fill={COLORS.accent}/>)}
   <Label x={210} y={8}>ATP pump</Label>
  </g>}
  <Label x={45} y={590}>Simplified charge build-up · not to scale</Label>
 </svg>;
};
const Frame=({frame,headline,copy,foot}:{frame:number;headline:string;copy:string[];foot:string})=><>
 <Backdrop width={1920} height={1080}/><Band top={74} height={140} name="header"><div data-k="text" data-n="course" style={{fontFamily:FONT,fontSize:25,color:COLORS.primary}}>INTRODUCTION TO NEUROSCIENCE</div><h1 data-k="text" data-n="Resting potential" style={{fontSize:64,margin:'18px 0',color:COLORS.textStrong,fontFamily:FONT}}>Resting potential</h1></Band>
 <Band top={240} height={620} name="body"><div style={{display:'flex',gap:132,alignItems:'center'}}><div style={{width:600,flexShrink:0,fontFamily:FONT}}><h2 data-k="text" data-n={headline} style={{fontSize:44,lineHeight:1.2,color:COLORS.accent}}>{headline}</h2>{copy.map(c=><p key={c} data-k="text" data-n={c} style={{fontSize:31,lineHeight:1.45,color:COLORS.textMuted}}>{c}</p>)}</div><Membrane frame={frame}/></div></Band>
 <Band top={900} height={90} name="footer"><div data-k="text" data-n={foot} style={{fontFamily:FONT,fontSize:30,color:COLORS.result}}>{foot}</div></Band>
</>;
const Gradient=({frame}:{frame:number})=><Frame frame={frame} headline="Begin with an ion gradient" copy={['More K+ inside; more Na+ outside.','A simplified uncharged membrane reveals how voltage develops.']} foot="Ion gradients store potential energy."/>;
const Leak=({frame}:{frame:number})=><Frame frame={frame+150} headline="K+ can leave" copy={['A selective leak pathway opens.','Positive charge exits; fixed negative charge stays inside.']} foot="Only a tiny charge separation is needed."/>;
const Balance=({frame}:{frame:number})=><Frame frame={frame+390} headline="An opposing electrical pull" copy={['Negative inside attracts K+ inward.','Electrical attraction opposes outward diffusion.']} foot="Typical neuronal resting voltage is near −70 mV; values vary."/>;
const Maintain=({frame}:{frame:number})=><Frame frame={frame+660} headline="Maintain the gradients" copy={['The ATP-powered pump moves 3 Na+ out and 2 K+ in.','It preserves gradients over time.']} foot="Gradients + selective permeability → resting potential."/>;
export const SCENES:SceneDef[]=[{id:'gradient',Comp:Gradient,dur:150,transition:'none'},{id:'leak',Comp:Leak,dur:240,transition:'none'},{id:'balance',Comp:Balance,dur:270,transition:'none'},{id:'maintain',Comp:Maintain,dur:240,transition:'none'}];
