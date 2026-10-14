import React from 'react';
import {CircuitSignal} from '../components/NeuroMechanisms';
import {COLORS,FONT,alpha} from '../theme';
import {memoryState} from './ns10-memory-formation.state';
import type {SceneDef} from '../Video';
const T={initialWeight:.25,finalWeight:1,episode:['place','sound']};
const DESIGN_AUDIT={
 visualArgument:'Two experienced features become associated and later reactivate through a strengthened distributed network.',
 motion:'Experience signals converge on hippocampus; replay travels across retained ensembles; a cortical link thickens and its response increases; a single cue reinstates another feature.',
 example:'A bell heard in a park later acts as a cue for recalling the place.',
 antiTemplate:'This circuit-level account retains all three ensembles and reorganizes their interactions, unlike receptor-scale trafficking or sensory spot mapping.',
 sceneRationale:'Four scenes distinguish initial association, reactivation, accumulating connection change and cue-driven recall. Combining replay with recall would hide the difference between internal activity and a new cue.'
};
export const MemoryMechanism:React.FC<{frame:number}>=({frame})=>{
 const s=memoryState(frame);
 const encoding=frame<240;
 const pulseRadius=10+4*Math.sin(frame*.35);
 const signal=encoding?Math.max(0,Math.min(1,frame/180)):s.travel;
 const soundX=630,placeX=150;
 return <svg viewBox="0 0 820 650" width="100%" height="100%" data-k="diagram" data-weight={s.weight} data-retrieved={s.retrieved}>
 <text x={390} y={30} fill={COLORS.textMuted} textAnchor="middle" fontFamily={FONT} fontSize={27}>Distributed cortical features</text>
 <path d="M 150 130 Q 400 10 630 130" fill="none" stroke={COLORS.result} strokeWidth={3+12*s.weight}/>
 {encoding?<>
 <CircuitSignal points={[{x:placeX,y:130},{x:390,y:320}]} travel={signal}/>
 <CircuitSignal points={[{x:soundX,y:130},{x:390,y:320}]} travel={signal}/>
 </>:<CircuitSignal points={s.route} travel={s.travel}/>}
 <circle cx={placeX} cy={130} r={44} fill={COLORS.bg1} stroke={COLORS.primary} strokeWidth={3}/>
 <circle cx={soundX} cy={130} r={44} fill={COLORS.bg1} stroke={COLORS.primary} strokeWidth={3}/>
 {[-1,0,1].map(i=><g key={i}>
 <circle cx={placeX+i*18} cy={130} r={s.placeActive?pulseRadius:5} fill={s.placeActive?COLORS.accent:COLORS.textDim}/>
 <circle cx={soundX+i*18} cy={130} r={s.soundActive?pulseRadius:5} fill={s.soundActive?COLORS.accent:COLORS.textDim}/>
 </g>)}
 <text x={placeX} y={215} fill={COLORS.textStrong} textAnchor="middle" fontFamily={FONT} fontSize={30}>Park / place</text>
 <text x={soundX} y={215} fill={COLORS.textStrong} textAnchor="middle" fontFamily={FONT} fontSize={30}>Bell / sound</text>
 {s.hippocampusPresent&&<g data-hippocampus="retained">
 <ellipse cx={390} cy={320} rx={100} ry={45} fill={alpha(COLORS.primary,.2)} stroke={COLORS.primary} strokeWidth={4}/>
 {s.association&&[-1,0,1].map(i=><circle key={i} cx={390+i*28} cy={320} r={12} fill={COLORS.accent}/>)}
 <text x={390} y={400} fill={COLORS.textStrong} textAnchor="middle" fontFamily={FONT} fontSize={30}>Hippocampus</text>
 </g>}
 {frame>=750&&<g><path d="M 755 75 L 690 110" stroke={COLORS.accent} strokeWidth={5}/><circle cx={755} cy={75} r={15} fill={COLORS.accent}/><text x={720} y={45} fill={COLORS.accent} textAnchor="middle" fontFamily={FONT} fontSize={25}>cue</text></g>}
 <text x={60} y={490} fill={COLORS.result} fontFamily={FONT} fontSize={27}>Cortical influence</text>
 <rect x={60} y={515} width={280} height={22} rx={5} fill={COLORS.bg2}/>
 <rect x={60} y={515} width={280*s.weight/T.finalWeight} height={22} rx={5} fill={COLORS.result}/>
 <path d={`M 440 535 H 465 L 500 ${535-85*s.weight} L 570 535 H 675`} fill="none" stroke={COLORS.result} strokeWidth={4}/>
 <path d={`M 440 535 H 465 L 500 ${535-85*T.initialWeight} L 570 535 H 675`} fill="none" stroke={COLORS.textMuted} strokeWidth={2} strokeDasharray="6 5"/>
 <text x={540} y={590} fill={COLORS.textMuted} textAnchor="middle" fontFamily={FONT} fontSize={26}>Response to equal input</text>
 </svg>;
};
const MemoryView:React.FC<{frame:number;title:string;copy:string;note:string}>=({frame,title,copy,note})=><div data-root style={{position:'absolute',inset:0,fontFamily:FONT,background:COLORS.bg0,color:COLORS.textStrong}}>
 <div data-k="text" style={{position:'absolute',left:108,top:74,fontSize:26,color:COLORS.primary}}>NEUROSCIENCE · MEMORY FORMATION</div>
 <div data-k="text" style={{position:'absolute',left:108,top:140,fontSize:58,fontWeight:700}}>{title}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:345,width:540,fontSize:37,lineHeight:1.45}}>{copy}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:715,width:540,fontSize:31,lineHeight:1.45,color:COLORS.result}}>{note}</div>
 <div style={{position:'absolute',left:755,top:275,width:1100,height:675}}><MemoryMechanism frame={frame}/></div>
 <div data-k="text" style={{position:'absolute',left:108,top:987,fontSize:25,color:COLORS.textMuted}}>Simplified episodic-memory example · Consolidation reorganizes connections over time</div>
</div>;
const Association:React.FC<{frame:number}>=({frame})=><MemoryView frame={frame} title="Bind features of an episode" copy="A bell sounds in a park. Cortical features become linked through hippocampal activity." note="An experience involves a distributed network."/>;
const Reactivation:React.FC<{frame:number}>=({frame})=><MemoryView frame={frame+240} title="Reactivate the pattern" copy="During rest, coordinated activity can replay elements of the experience." note="The activity returns without a new sensory event."/>;
const Strengthening:React.FC<{frame:number}>=({frame})=><MemoryView frame={frame+510} title="Strengthen cortical connections" copy="Repeated coordinated activity supports stronger interactions between cortical ensembles." note="No memory object is transferred or emptied out."/>;
const Retrieval:React.FC<{frame:number}>=({frame})=><MemoryView frame={frame+750} title="A partial cue helps recall" copy="Hear the bell again. Activity can reinstate the associated place." note="Hippocampal involvement varies with the memory."/>;
export const SCENES:SceneDef[]=[
 {id:'association',Comp:Association,dur:240,transition:'none'},
 {id:'reactivation',Comp:Reactivation,dur:270,transition:'none'},
 {id:'strengthening',Comp:Strengthening,dur:240,transition:'none'},
 {id:'retrieval',Comp:Retrieval,dur:210,transition:'none'}
];
