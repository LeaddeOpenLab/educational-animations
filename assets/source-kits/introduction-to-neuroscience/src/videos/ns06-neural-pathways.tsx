import React from 'react';
import {COLORS,FONT,alpha} from '../theme';
import {touchPaths,touchRouteState} from '../mechanisms/ns06-neural-pathways.state';
import type {SceneDef} from '../Video';
const T = {fps:30,state:touchRouteState,midline:450};
const DESIGN_AUDIT = {
 visualArgument:'A right-hand tactile input physically travels up the same side, crosses at the medulla, and reaches the left cortex only after its thalamic relay.',
 motion:'A bright impulse advances through anatomically placed segments; each relay activates on actual packet arrival and hands off to the next neuron.',
 example:'Fine touch from the right hand follows the dorsal column–medial lemniscus route.',
 antiTemplate:'Unlike the two-eye visual lesson this is one body pathway with a medullary crossing; unlike brain mapping it must show actual propagation and arrival ordering.',
 sceneRationale:'Five scenes separate trigger, ipsilateral ascent, crossing, thalamic/cortical relay and a completed three-neuron route, preserving the difficult laterality transition.'
};
const TouchRoute:React.FC<{frame:number;overview?:boolean}>=({frame,overview=false})=>{
 const s=T.state(frame);
 const names=[{x:170,y:65,name:'Left sensory cortex',lx:260,ly:72,on:s.cortexArrived},{x:250,y:140,name:'Thalamus',lx:65,ly:150,on:s.thalamusArrived},{x:650,y:330,name:'Medulla',lx:705,ly:337,on:s.medullaArrived}];
 return <svg data-k="figure" data-n="right hand touch pathway" viewBox="0 0 900 770" style={{position:'absolute',left:820,top:120,width:1000,height:850}}>
 <path d="M 85 60 Q 180 -25 300 55 Q 365 90 320 195 Q 215 230 125 175 Z" fill={alpha(COLORS.primary,.07)} stroke={COLORS.axis} strokeWidth={3}/>
 <rect x={612} y={295} width={77} height={305} rx={35} fill={alpha(COLORS.primary,.08)} stroke={COLORS.axis} strokeWidth={3}/>
 <path d="M 620 710 L 620 675 Q 625 660 635 676 L 645 690 V 633 Q 660 620 663 642 L 670 670 L 688 650 Q 704 651 700 668 L 717 683 L 712 720 Z" fill={alpha(COLORS.primary,.15)} stroke={COLORS.primary} strokeWidth={4}/>
 <line x1={T.midline} x2={T.midline} y1={200} y2={720} stroke={COLORS.axis} strokeDasharray="8 8" strokeWidth={2}/>
 <text x={325} y={740} textAnchor="middle" fill={COLORS.textMuted} fontFamily={FONT} fontSize={28}>LEFT</text>
 <text x={595} y={740} textAnchor="middle" fill={COLORS.textMuted} fontFamily={FONT} fontSize={28}>RIGHT</text>
 {Object.entries(touchPaths).map(([k,ps])=><polyline key={k} data-route={k} points={ps.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke={k==='cross'?COLORS.result:COLORS.primary} strokeWidth={7}/>)}
 {names.map(n=><g key={n.name}><circle data-relay={n.name.startsWith('Left')?'cortex':n.name.toLowerCase()} data-arrived={n.on} cx={n.x} cy={n.y} r={22} fill={n.on?COLORS.result:COLORS.bg1} stroke={COLORS.primary} strokeWidth={4}/><text x={n.lx} y={n.ly} fontFamily={FONT} fontSize={28} fill={COLORS.textStrong}>{n.name}</text></g>)}
 <text x={695} y={540} fill={COLORS.textMuted} fontFamily={FONT} fontSize={28}>Spinal cord</text>
 <text x={690} y={635} fill={COLORS.textStrong} fontFamily={FONT} fontSize={28}>Right hand</text>
 <path d={`M 750 685 L ${frame>65?706:735} 685`} stroke={COLORS.accent} strokeWidth={8} strokeLinecap="round"/>
 {frame>=65&&<circle cx={702} cy={685} r={18+Math.max(0,1-(frame-65)/40)*14} fill="none" stroke={COLORS.accent} strokeWidth={3}/>}
 <circle data-packet="touch" data-owner={s.packetOwner} cx={s.point.x} cy={s.point.y} r={13} fill={COLORS.accent}/>
 {frame>=390&&<text x={370} y={380} textAnchor="middle" fill={COLORS.result} fontFamily={FONT} fontSize={28}>Cross here</text>}
 {overview&&<g fill={COLORS.bg0} fontFamily={FONT} fontSize={26} textAnchor="middle">
 <circle cx={590} cy={480} r={20} fill={COLORS.accent}/><text x={590} y={489}>1</text>
 <circle cx={300} cy={240} r={20} fill={COLORS.accent}/><text x={300} y={249}>2</text>
 <circle cx={202} cy={101} r={20} fill={COLORS.accent}/><text x={202} y={110}>3</text>
 </g>}
 </svg>;
};
const RouteFrame:React.FC<{children:React.ReactNode;figure:React.ReactNode}>=({children,figure})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>{children}{figure}<div data-k="text" style={{position:'absolute',left:108,top:966,fontSize:24,color:COLORS.textDim}}>Schematic fine-touch pathway · timing slowed for clarity</div></div>;
const RouteScene:React.FC<{frame:number}>=({frame})=><RouteFrame figure={<TouchRoute frame={frame}/>}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>NEUROSCIENCE · CONNECTED NEURONS</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:64,lineHeight:1.2,color:COLORS.textStrong}}>Neural<br/>pathways</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:380,width:600,fontSize:35,lineHeight:1.45,color:COLORS.textMuted}}>A touch starts a signal.<br/>Where does it travel?</p>
 <div data-k="text" style={{position:'absolute',left:108,top:655,width:610,fontSize:32,color:COLORS.accent}}>Example: fine touch<br/>from the right hand</div>
 </RouteFrame>;
const AscendScene:React.FC<{frame:number}>=({frame})=><RouteFrame figure={<TouchRoute frame={frame+150}/>}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>FOLLOW THE FIRST NEURON</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:59,lineHeight:1.2,color:COLORS.textStrong}}>Ascend on<br/>the same side</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:395,width:590,fontSize:34,lineHeight:1.45,color:COLORS.textMuted}}>The signal rises through<br/>the right dorsal column.</p>
 <p data-k="text" style={{position:'absolute',left:108,top:660,width:610,fontSize:35,lineHeight:1.4,color:COLORS.accent}}>First relay:<br/>the medulla</p>
 </RouteFrame>;
const CrossScene:React.FC<{frame:number}>=({frame})=><RouteFrame figure={<TouchRoute frame={frame+360}/>}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>THE SECOND NEURON</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:60,lineHeight:1.2,color:COLORS.textStrong}}>Cross in<br/>the medulla</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:385,width:600,fontSize:34,lineHeight:1.5,color:COLORS.textMuted}}>After the relay, activity<br/>moves to the other side.</p>
 <div data-k="text" style={{position:'absolute',left:108,top:680,fontSize:38,color:COLORS.result}}>Right body → left brain</div>
 </RouteFrame>;
const RelayScene:React.FC<{frame:number}>=({frame})=>{
 const s=T.state(frame+540);
 return <RouteFrame figure={<TouchRoute frame={frame+540}/>}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>ONE HANDOFF AT A TIME</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:60,lineHeight:1.2,color:COLORS.textStrong}}>Relay through<br/>the thalamus</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:395,width:600,fontSize:34,lineHeight:1.5,color:COLORS.textMuted}}>The next neuron carries<br/>activity to sensory cortex.</p>
 <div data-k="text" style={{position:'absolute',left:108,top:660,fontSize:34,color:s.thalamusArrived?COLORS.result:COLORS.textDim}}>Thalamus reached: {s.thalamusArrived?'yes':'not yet'}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:740,fontSize:34,color:s.cortexArrived?COLORS.result:COLORS.textDim}}>Cortex reached: {s.cortexArrived?'yes':'not yet'}</div>
 </RouteFrame>;
};
const SequenceScene:React.FC<{frame:number}>=({frame})=><RouteFrame figure={<TouchRoute frame={frame+750} overview/>}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>THE COMPLETED ROUTE</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:60,lineHeight:1.2,color:COLORS.textStrong}}>Connected steps<br/>carry information</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:395,width:610,fontSize:32,lineHeight:1.65,color:COLORS.textMuted}}>1 · Right hand to medulla<br/>2 · Cross, then reach thalamus<br/>3 · Arrive at left cortex</p>
 <p data-k="text" style={{position:'absolute',left:108,top:760,width:600,fontSize:30,lineHeight:1.4,color:COLORS.result}}>Different pathways have<br/>different relay sequences.</p>
 </RouteFrame>;
export const SCENES:SceneDef[] = [
 {id:'route',Comp:RouteScene,dur:150,transition:'none'},
 {id:'ascend',Comp:AscendScene,dur:210,transition:'none'},
 {id:'cross',Comp:CrossScene,dur:180,transition:'none'},
 {id:'relay',Comp:RelayScene,dur:210,transition:'none'},
 {id:'sequence',Comp:SequenceScene,dur:150,transition:'none'},
];
