import React from 'react';
import {SynapticWeight} from '../components/NeuroMechanisms';
import {COLORS,FONT} from '../theme';
import {plasticityState} from './ns09-synaptic-plasticity.state';
import type {SceneDef} from '../Video';
const T={testInput:1,initialReceptors:3,finalReceptors:6};
const DESIGN_AUDIT={
 visualArgument:'Changing the postsynaptic receptor population changes the response to an identical presynaptic test.',
 motion:'Three receptors travel from an intracellular pool into membrane slots; insertion increases efficacy and the EPSP geometry.',
 example:'The illustrative response doubles from 1.0 to 2.0 with the same test pulse amplitude.',
 antiTemplate:'Material receptor trafficking and overlaid EPSP traces distinguish this lesson from a light-position test and distributed memory replay.',
 sceneRationale:'Five steps separate baseline, induction, insertion, controlled retest and persistence; insertion is the causal bridge and retesting controls input.'
};
export const PlasticityMechanism:React.FC<{frame:number}>=({frame})=>{
 const s=plasticityState(frame);
 const testStart=frame<180?20:frame<750?555:765;
 const pulse=frame>=180&&frame<330?(frame-180)%35/35:Math.max(0,Math.min(1,(frame-testStart)/50));
 return <svg viewBox="0 0 840 620" width="100%" height="100%" data-k="diagram" data-receptors={s.receptors} data-response={s.response}>
 <text x={80} y={35} fill={COLORS.textStrong} fontFamily={FONT} fontSize={29}>Presynaptic input</text>
 <text x={580} y={35} fill={COLORS.textStrong} fontFamily={FONT} fontSize={29}>Postsynaptic cell</text>
 <path d="M 60 90 H 305" fill="none" stroke={COLORS.axis} strokeWidth={5}/>
 <circle cx={60+245*pulse} cy={90} r={13} fill={COLORS.accent}/>
 <text x={60} y={138} fill={COLORS.textMuted} fontFamily={FONT} fontSize={27}>{s.induction?'Inducing activity':`Test input = ${T.testInput.toFixed(1)}`}</text>
 <g transform="translate(250 315)">
 <SynapticWeight x={0} y={0} strength={s.strength} receptors={0} input={s.input}/>
 {s.positions.map(p=><rect key={p.id} data-inserted={p.inserted} x={p.x-15} y={p.y} width={30} height={12} fill={COLORS.accent}/>)}
 <path d={`M 170 65 L 190 65 L 215 ${65-70*s.baselineResponse} L 265 65 L 300 65`} fill="none" stroke={COLORS.textMuted} strokeWidth={3} strokeDasharray="6 5"/>
 </g>
 <text x={360} y={200} fill={COLORS.accent} textAnchor="middle" fontFamily={FONT} fontSize={28}>AMPA receptors</text>
 {s.receptors<T.finalReceptors&&<text x={600} y={218} fill={COLORS.textMuted} textAnchor="middle" fontFamily={FONT} fontSize={26}>receptor pool</text>}
 <text x={710} y={405} fill={COLORS.result} textAnchor="middle" fontFamily={FONT} fontSize={27}>EPSP</text>
 <text x={130} y={510} fill={COLORS.textStrong} fontFamily={FONT} fontSize={29}>{`${s.receptors} receptors in membrane`}</text>
 <path d="M 80 565 H 125" stroke={COLORS.textMuted} strokeWidth={3} strokeDasharray="6 5"/>
 <text x={145} y={574} fill={COLORS.textMuted} fontFamily={FONT} fontSize={26}>Before</text>
 <path d="M 355 565 H 400" stroke={COLORS.result} strokeWidth={4}/>
 <text x={420} y={574} fill={COLORS.result} fontFamily={FONT} fontSize={26}>Current response</text>
 </svg>;
};
const SynapticView:React.FC<{frame:number;heading:string;explanation:string;note:string}>=({frame,heading,explanation,note})=><div data-root style={{position:'absolute',inset:0,fontFamily:FONT,background:COLORS.bg0,color:COLORS.textStrong}}>
 <div data-k="text" style={{position:'absolute',left:108,top:72,fontSize:26,color:COLORS.primary}}>NEUROSCIENCE · SYNAPTIC PLASTICITY</div>
 <div data-k="text" style={{position:'absolute',left:108,top:137,fontSize:57,fontWeight:700}}>{heading}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:340,width:550,fontSize:37,lineHeight:1.45}}>{explanation}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:700,width:550,fontSize:31,lineHeight:1.45,color:COLORS.accent}}>{note}</div>
 <div style={{position:'absolute',left:760,top:270,width:1080,height:690}}><PlasticityMechanism frame={frame}/></div>
 <div data-k="text" style={{position:'absolute',left:108,top:985,fontSize:25,color:COLORS.textMuted}}>One mechanism of long-term potentiation · Schematic amplitudes and compressed time</div>
</div>;
const Test:React.FC<{frame:number}>=({frame})=><SynapticView frame={frame} heading="Test the connection" explanation="A fixed input produces a baseline excitatory postsynaptic potential." note="Keep this response for comparison."/>;
const Induction:React.FC<{frame:number}>=({frame})=><SynapticView frame={frame+180} heading="Activity can change a synapse" explanation="A potentiating activity pattern initiates receptor recruitment." note="The inducing activity differs from our test pulse."/>;
const Insertion:React.FC<{frame:number}>=({frame})=><SynapticView frame={frame+330} heading="Add receptors to the membrane" explanation="AMPA receptors move from a pool into postsynaptic membrane slots." note="More functional receptors increase responsiveness."/>;
const Retest:React.FC<{frame:number}>=({frame})=><SynapticView frame={frame+540} heading="Same input. Larger response." explanation="Repeat the original test pulse. The EPSP is now larger." note="The synapse changed; test strength stayed fixed."/>;
const Persistence:React.FC<{frame:number}>=({frame})=><SynapticView frame={frame+750} heading="The change outlasts induction" explanation="A later test still evokes the strengthened response." note="Synaptic plasticity changes connection strength."/>;
export const SCENES:SceneDef[]=[
 {id:'test',Comp:Test,dur:180,transition:'none'},
 {id:'induction',Comp:Induction,dur:150,transition:'none'},
 {id:'insertion',Comp:Insertion,dur:210,transition:'none'},
 {id:'retest',Comp:Retest,dur:210,transition:'none'},
 {id:'persistence',Comp:Persistence,dur:150,transition:'none'}
];
