import React from 'react';
import {COLORS,FONT,alpha} from '../theme';
import {visualPaths,visualRouteState} from '../mechanisms/ns07-visual-pathway.state';
import type {SceneDef} from '../Video';
const T = {fps:30,state:visualRouteState,midline:500};
const DESIGN_AUDIT = {
 visualArgument:'A left-field stimulus reaches nasal retina in the left eye and temporal retina in the right eye. The two signals take different chiasmal routes but both end in right visual cortex.',
 motion:'Optical guides establish the retinal halves, then two independently visible neural activity markers traverse crossing and noncrossing axons before LGN and cortex arrival.',
 example:'A target in the binocular left hemifield supplies both eyes to the right cerebral hemisphere.',
 antiTemplate:'This lesson preserves two concurrent eye-specific paths with selective chiasmal crossing, whereas the adjacent touch pathway tracks a single right-body input crossing in the medulla.',
 sceneRationale:'Five scenes separate field inversion, optic-nerve conduction, selective crossing, LGN relay and hemifield representation; the crossing interval is longest so both routes can be followed.'
};
const OpticDiagram:React.FC<{frame:number;conclusion?:boolean}>=({frame,conclusion=false})=>{
 const s=T.state(frame);
 const hasRetinalInput=s.retinalActivation.length>0;
 return <svg data-k="figure" data-n="selective optic chiasm crossing" viewBox="0 0 900 750" style={{position:'absolute',left:820,top:155,width:1000,height:820}}>
 <text x={265} y={32} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={28}>LEFT EYE</text>
 <text x={700} y={32} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={28}>RIGHT EYE</text>
 <circle cx={265} cy={110} r={65} fill={alpha(COLORS.primary,.07)} stroke={COLORS.axis} strokeWidth={4}/>
 <circle cx={700} cy={110} r={65} fill={alpha(COLORS.result,.07)} stroke={COLORS.axis} strokeWidth={4}/>
 <path d="M 235 80 Q 265 65 295 80 M 670 80 Q 700 65 730 80" stroke={COLORS.textMuted} strokeWidth={3} fill="none"/>
 <rect x={16} y={55} width={132} height={70} rx={10} fill={alpha(COLORS.accent,.06)} stroke={COLORS.axis} strokeWidth={2}/>
 <path d="M 84 55 V 125" stroke={COLORS.textDim} strokeWidth={2}/>
 <circle cx={46} cy={88} r={8} fill={COLORS.accent}/>
 <text x={82} y={160} textAnchor="middle" fill={COLORS.accent} fontFamily={FONT} fontSize={27}>Left field</text>
 {hasRetinalInput&&<g stroke={COLORS.accent} strokeWidth={2} strokeDasharray="5 5" opacity={.65} fill="none"><path d="M 46 88 L 265 80 L 300 120"/><path d="M 46 88 L 700 80 L 740 120"/></g>}
 <line x1={T.midline} x2={T.midline} y1={180} y2={710} stroke={COLORS.axis} strokeDasharray="8 8" strokeWidth={2}/>
 {Object.entries(visualPaths).map(([k,ps])=><polyline key={k} data-route={k} points={ps.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke={k.startsWith('nasal')?COLORS.primary:COLORS.result} strokeWidth={6}/>)}
 <circle data-retina="left-nasal" cx={300} cy={120} r={16} fill={hasRetinalInput?COLORS.primary:COLORS.bg1} stroke={COLORS.primary} strokeWidth={3}/>
 <circle data-retina="right-temporal" cx={740} cy={120} r={16} fill={hasRetinalInput?COLORS.result:COLORS.bg1} stroke={COLORS.result} strokeWidth={3}/>
 <text x={345} y={150} fill={COLORS.primary} fontFamily={FONT} fontSize={28}>Nasal</text>
 <text x={720} y={202} textAnchor="middle" fill={COLORS.result} fontFamily={FONT} fontSize={28}>Temporal</text>
 <text x={245} y={267} textAnchor="middle" fill={COLORS.textMuted} fontFamily={FONT} fontSize={27}>Optic nerve</text>
 <text x={230} y={362} fill={COLORS.textStrong} fontFamily={FONT} fontSize={28}>Optic chiasm</text>
 <path d="M 430 352 H 476" stroke={COLORS.textMuted} strokeWidth={2}/>
 <text x={710} y={454} textAnchor="middle" fill={COLORS.textMuted} fontFamily={FONT} fontSize={27}>Right optic tract</text>
 <rect data-lgn={s.lgnArrived} x={650} y={470} width={100} height={40} rx={18} fill={s.lgnArrived?alpha(COLORS.accent,.4):COLORS.bg2} stroke={COLORS.accent} strokeWidth={3}/>
 <text x={612} y={500} textAnchor="end" fill={COLORS.textStrong} fontFamily={FONT} fontSize={30}>Right LGN</text>
 <text x={520} y={587} textAnchor="end" fill={COLORS.textMuted} fontFamily={FONT} fontSize={27}>Optic radiations</text>
 <rect data-cortex={s.cortexArrived} x={640} y={638} width={125} height={60} rx={18} fill={s.cortexArrived?alpha(COLORS.result,.35):COLORS.bg2} stroke={COLORS.result} strokeWidth={3}/>
 <text x={600} y={668} textAnchor="end" fill={COLORS.textStrong} fontFamily={FONT} fontSize={28}>Right visual cortex</text>
 {hasRetinalInput&&<><circle data-packet="nasal" cx={s.nasalPoint.x} cy={s.nasalPoint.y} r={12} fill={COLORS.primary} stroke={COLORS.textStrong} strokeWidth={2}/><circle data-packet="temporal" cx={s.temporalPoint.x} cy={s.temporalPoint.y} r={12} fill={COLORS.result} stroke={COLORS.textStrong} strokeWidth={2}/></>}
 {conclusion&&<g><path d="M 701 645 V 690" stroke={COLORS.textMuted} strokeWidth={2}/><circle cx={665} cy={667} r={7} fill={COLORS.accent}/></g>}
 </svg>;
};
const HemifieldScene:React.FC<{frame:number}>=({frame})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>NEUROSCIENCE · VISION</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:640,margin:0,fontSize:64,lineHeight:1.2,color:COLORS.textStrong}}>Visual<br/>pathway</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:390,width:615,fontSize:34,lineHeight:1.45,color:COLORS.textMuted}}>A target to the left<br/>reaches both eyes.</p>
 <p data-k="text" style={{position:'absolute',left:108,top:635,width:600,fontSize:32,lineHeight:1.5,color:COLORS.accent}}>Light falls on the right<br/>retinal half in each eye.</p>
 <OpticDiagram frame={frame}/>
 <div data-k="text" style={{position:'absolute',left:108,top:978,fontSize:23,color:COLORS.textDim}}>Binocular left hemifield · simplified top-down schematic</div>
 </div>;
const OpticScene:React.FC<{frame:number}>=({frame})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>TWO EYES · TWO SIGNALS</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:640,margin:0,fontSize:59,lineHeight:1.2,color:COLORS.textStrong}}>Retina to<br/>optic nerve</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:395,width:600,fontSize:34,lineHeight:1.5,color:COLORS.textMuted}}>The signals travel toward<br/>the optic chiasm.</p>
 <div data-k="text" style={{position:'absolute',left:108,top:640,fontSize:32,color:COLORS.primary}}>Left eye: nasal retina</div>
 <div data-k="text" style={{position:'absolute',left:108,top:725,fontSize:32,color:COLORS.result}}>Right eye: temporal retina</div>
 <OpticDiagram frame={frame+180}/>
 <div data-k="text" style={{position:'absolute',left:108,top:978,fontSize:23,color:COLORS.textDim}}>Nasal = toward the nose · temporal = toward the temple</div>
 </div>;
const ChiasmScene:React.FC<{frame:number}>=({frame})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>SELECTIVE CROSSING</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:640,margin:0,fontSize:59,lineHeight:1.2,color:COLORS.textStrong}}>Nasal fibers<br/>cross the midline</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:410,width:600,fontSize:34,lineHeight:1.5,color:COLORS.primary}}>Follow the pink signal<br/>across the chiasm.</p>
 <p data-k="text" style={{position:'absolute',left:108,top:625,width:600,fontSize:34,lineHeight:1.5,color:COLORS.result}}>The blue temporal signal<br/>stays on its own side.</p>
 <OpticDiagram frame={frame+330}/>
 <div data-k="text" style={{position:'absolute',left:108,top:978,fontSize:23,color:COLORS.textDim}}>Both signals carry the same left visual field.</div>
 </div>;
const ThalamusScene:React.FC<{frame:number}>=({frame})=>{
 const s=T.state(frame+600);
 return <div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>RIGHT-SIDED RELAY</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:640,margin:0,fontSize:59,lineHeight:1.2,color:COLORS.textStrong}}>LGN first.<br/>Then visual cortex.</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:415,width:590,fontSize:33,lineHeight:1.5,color:COLORS.textMuted}}>Both inputs continue<br/>through the right side.</p>
 <div data-k="text" style={{position:'absolute',left:108,top:660,fontSize:32,color:s.lgnArrived?COLORS.accent:COLORS.textDim}}>LGN reached: {s.lgnArrived?'yes':'not yet'}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:745,fontSize:32,color:s.cortexArrived?COLORS.result:COLORS.textDim}}>Cortex reached: {s.cortexArrived?'yes':'not yet'}</div>
 <OpticDiagram frame={frame+600}/>
 <div data-k="text" style={{position:'absolute',left:108,top:978,fontSize:23,color:COLORS.textDim}}>LGN = lateral geniculate nucleus of the thalamus</div>
 </div>;
};
const RuleScene:React.FC<{frame:number}>=({frame})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>ORGANIZED BY VISUAL FIELD</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:640,margin:0,fontSize:59,lineHeight:1.2,color:COLORS.textStrong}}>Left visual field.<br/>Right cortex.</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:410,width:590,fontSize:35,lineHeight:1.5,color:COLORS.textMuted}}>Both eyes contribute<br/>to this representation.</p>
 <p data-k="text" style={{position:'absolute',left:108,top:665,width:620,fontSize:34,lineHeight:1.5,color:COLORS.result}}>Nasal crosses.<br/>Temporal stays.</p>
 <OpticDiagram frame={frame+810} conclusion/>
 <div data-k="text" style={{position:'absolute',left:108,top:978,fontSize:23,color:COLORS.textDim}}>The opposite hemifield reaches the opposite hemisphere.</div>
 </div>;
export const SCENES:SceneDef[] = [
 {id:'hemifield',Comp:HemifieldScene,dur:180,transition:'none'},
 {id:'optic',Comp:OpticScene,dur:150,transition:'none'},
 {id:'chiasm',Comp:ChiasmScene,dur:270,transition:'none'},
 {id:'thalamus',Comp:ThalamusScene,dur:210,transition:'none'},
 {id:'rule',Comp:RuleScene,dur:150,transition:'none'},
];
