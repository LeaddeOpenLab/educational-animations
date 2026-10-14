import React from 'react';
import {COLORS,FONT,alpha} from '../theme';
import {BrainMap} from '../components/Neuro';
import {localizationState} from '../mechanisms/ns05-brain-region-localization.state';
import type {SceneDef} from '../Video';
const T = {fps:30, title:'Brain region localization', state:localizationState};
const DESIGN_AUDIT = {
 visualArgument:'Task glyphs dock at distinct locations on a fixed lateral brain map, then three linked operations form one see-and-reach task.',
 motion:'Vision and sound move to occipital and temporal locations; movement and touch land on different sides of the central boundary.',
 example:'Seeing a target, reaching toward it and feeling contact recruits multiple cortical territories.',
 antiTemplate:'Unlike the adjacent pathway lessons, the teaching target is anatomical association, so task-to-region docking replaces a traveling nerve impulse.',
 sceneRationale:'Four scenes orient the brain, establish sensory locations, distinguish adjacent motor/sensory locations, and combine the established mappings in a network.'
};
const TaskGlyph:React.FC<{kind:string}>=({kind})=><g fill="none" stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
 {kind==='Vision'&&<><path d="M -24 0 Q 0 -24 24 0 Q 0 24 -24 0 Z"/><circle r={7}/></>}
 {kind==='Hearing'&&<><path d="M -13 10 Q -23 -17 -2 -21 Q 20 -22 15 0 Q 12 9 1 13 Q 0 24 -10 19"/><path d="M 27 -15 Q 38 0 27 15"/></>}
 {kind==='Movement'&&<><path d="M -19 17 L -19 -1 Q -14 -10 -9 0 V -19 Q -4 -27 1 -19 V -2 L 8 -12 Q 15 -16 16 -6 L 23 10 L 15 24 H -10 Z"/><path d="M -27 -30 H 20 L 12 -38 M 20 -30 L 12 -22"/></>}
 {kind==='Touch'&&<><path d="M -25 16 H 25 M -14 -23 L 0 1 L 14 -23"/><circle cy={5} r={5}/><path d="M -20 -5 L -28 -11 M 20 -5 L 28 -11"/></>}
 </g>;
const LocalizationCanvas:React.FC<{frame:number}>=({frame})=>{
 const s=T.state(frame);
 return <svg data-k="figure" data-n="anatomical task mapping" viewBox="0 0 900 750" style={{position:'absolute',left:815,top:130,width:1000,height:830}}>
 <text x={180} y={65} fill={COLORS.textMuted} fontFamily={FONT} fontSize={28}>FRONT</text><text x={660} y={65} fill={COLORS.textMuted} fontFamily={FONT} fontSize={28}>BACK</text>
 <path d="M 310 55 H 615" stroke={COLORS.axis} strokeWidth={3}/>
 <BrainMap cx={450} cy={340} scale={1.1} active={s.selectedLobe}/>
 {s.networkLinks.map(([a,b])=><path key={a} data-network="true" d={`M ${s.pairs[a].x} ${s.pairs[a].y} Q 550 90 ${s.pairs[b].x} ${s.pairs[b].y}`} fill="none" stroke={COLORS.result} strokeWidth={5} strokeDasharray="10 7"/>)}
 {s.pairs.map(p=><g key={p.task} data-task={p.task} data-lobe={p.lobe} data-assigned={p.assigned} transform={`translate(${p.position.x} ${p.position.y})`}><circle r={34} fill={COLORS.bg1} stroke={p.assigned?COLORS.accent:COLORS.axis} strokeWidth={3}/><TaskGlyph kind={p.task}/></g>)}
 {s.combinedTask&&<g transform="translate(280 680)"><TaskGlyph kind="Vision"/><path d="M 48 0 H 138 M 208 0 H 298" stroke={COLORS.result} strokeWidth={4}/><g transform="translate(175 0)"><TaskGlyph kind="Movement"/></g><g transform="translate(340 0)"><TaskGlyph kind="Touch"/></g></g>}
 </svg>;
};
const MapScene:React.FC<{frame:number}>=({frame})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>NEUROSCIENCE · CORTICAL ORGANIZATION</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:58,lineHeight:1.15,color:COLORS.textStrong}}>Brain region<br/>localization</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:370,width:590,fontSize:34,lineHeight:1.45,color:COLORS.textMuted}}>Different operations have different cortical locations.</p>
 <p data-k="text" style={{position:'absolute',left:108,top:635,width:570,fontSize:30,lineHeight:1.45,color:COLORS.accent}}>Follow each task symbol<br/>onto the brain.</p>
 <LocalizationCanvas frame={frame}/>
 <div data-k="text" style={{position:'absolute',left:108,top:966,fontSize:24,color:COLORS.textDim}}>Simplified lateral map · selected functions</div>
 </div>;
const SensoryScene:React.FC<{frame:number}>=({frame})=>{
 const f=frame+150;const s=T.state(f);
 return <div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>LOCATE SENSORY PROCESSING</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:630,margin:0,fontSize:58,lineHeight:1.2,color:COLORS.textStrong}}>Vision and<br/>hearing</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:365,width:580,fontSize:32,lineHeight:1.5,color:COLORS.textMuted}}>Follow the eye to the back.<br/>Follow sound to the side.</p>
 <div data-k="text" style={{position:'absolute',left:108,top:575,fontSize:34,color:s.pairs[0].assigned?COLORS.accent:COLORS.textDim}}>Vision → occipital</div>
 <div data-k="text" style={{position:'absolute',left:108,top:660,fontSize:34,color:s.pairs[1].assigned?COLORS.accent:COLORS.textDim}}>Hearing → temporal</div>
 <LocalizationCanvas frame={f}/>
 <div data-k="text" style={{position:'absolute',left:108,top:966,fontSize:24,color:COLORS.textDim}}>Each lobe contains multiple functional areas.</div>
 </div>;
};
const SensorimotorScene:React.FC<{frame:number}>=({frame})=>{
 const f=frame+420;const s=T.state(f);
 return <div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>NEIGHBORING CORTICAL AREAS</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:635,margin:0,fontSize:58,lineHeight:1.2,color:COLORS.textStrong}}>Move a finger.<br/>Feel a touch.</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:370,width:580,fontSize:32,lineHeight:1.5,color:COLORS.textMuted}}>Motor and sensory areas<br/>sit on opposite sides of<br/>the central boundary.</p>
 <div data-k="text" style={{position:'absolute',left:108,top:650,fontSize:32,color:s.pairs[2].assigned?COLORS.accent:COLORS.textDim}}>Movement → frontal</div>
 <div data-k="text" style={{position:'absolute',left:108,top:735,fontSize:32,color:s.pairs[3].assigned?COLORS.accent:COLORS.textDim}}>Body sensation → parietal</div>
 <LocalizationCanvas frame={f}/>
 <div data-k="text" style={{position:'absolute',left:108,top:966,fontSize:24,color:COLORS.textDim}}>Region markers are schematic, not a detailed cortical atlas.</div>
 </div>;
};
const NetworkScene:React.FC<{frame:number}>=({frame})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:78,fontSize:24,color:COLORS.primary}}>COMBINE THE OPERATIONS</div>
 <h1 data-k="text" style={{position:'absolute',left:108,top:145,width:650,margin:0,fontSize:58,lineHeight:1.2,color:COLORS.textStrong}}>One task.<br/>Several regions.</h1>
 <p data-k="text" style={{position:'absolute',left:108,top:385,width:575,fontSize:34,lineHeight:1.5,color:COLORS.textMuted}}>See the target.<br/>Reach toward it.<br/>Feel contact.</p>
 <p data-k="text" style={{position:'absolute',left:108,top:720,width:630,fontSize:36,lineHeight:1.35,color:COLORS.result}}>Specialized regions<br/>work together.</p>
 <LocalizationCanvas frame={frame+690}/>
 <div data-k="text" style={{position:'absolute',left:108,top:966,fontSize:24,color:COLORS.textDim}}>Localization does not mean one isolated region does everything.</div>
 </div>;
export const SCENES:SceneDef[] = [
 {id:'map',Comp:MapScene,dur:150,transition:'none'},
 {id:'sensory',Comp:SensoryScene,dur:270,transition:'none'},
 {id:'sensorimotor',Comp:SensorimotorScene,dur:270,transition:'none'},
 {id:'network',Comp:NetworkScene,dur:210,transition:'none'},
];
