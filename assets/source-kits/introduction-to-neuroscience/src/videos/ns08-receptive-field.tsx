import React from 'react';
import {ReceptiveField} from '../components/Neuro';
import {COLORS,FONT} from '../theme';
import {receptiveState} from './ns08-receptive-field.state';
import type {SceneDef} from '../Video';
const T={radius:160,baseline:20,gain:60};
const DESIGN_AUDIT={
 visualArgument:'One retinal ganglion cell changes its firing when an equal small light probe changes spatial position.',
 motion:'The probe switches through darkness between center, surround and outside; corresponding spike density changes and the trace scrolls.',
 example:'An ON-center cell produces illustrative rates 20, 80, 0 and 20 Hz.',
 antiTemplate:'This spatial stimulus experiment uses a concentric receptive field and a spike raster, rather than receptor trafficking or a memory network.',
 sceneRationale:'Four scenes separately establish baseline, excite the center, suppress via surround and test the outer boundary. Each probe answers a distinct spatial question.'
};
export const ReceptiveMechanism:React.FC<{frame:number}>=({frame})=>{
 const s=receptiveState(frame);
 return <svg viewBox="0 0 760 550" width="100%" height="100%" data-k="diagram" data-rate={s.rate} data-probe={s.probe}>
 <ReceptiveField cx={300} cy={210} r={T.radius} spot={s.spot} baseline={T.baseline} gain={T.gain}/>
 <text x={300} y={20} fill={COLORS.textStrong} textAnchor="middle" fontFamily={FONT} fontSize={28}>One ON-center receptive field</text>
 <text x={300} y={335} fill={COLORS.textMuted} textAnchor="middle" fontFamily={FONT} fontSize={27}>surround</text>
 <text x={578} y={62} fill={COLORS.textMuted} textAnchor="middle" fontFamily={FONT} fontSize={26}>Firing rate</text>
 <path d="M 60 430 H 690" stroke={COLORS.axis} strokeWidth={2}/>
 {s.spikes.map((p,i)=><path key={i} d={`M ${p.x} 430 v -35 v 35`} stroke={COLORS.result} strokeWidth={2}/>)}
 <text x={70} y={480} fill={COLORS.textStrong} fontFamily={FONT} fontSize={28}>Same cell’s spikes</text>
 <text x={690} y={480} textAnchor="end" fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>time →</text>
 <text x={380} y={530} textAnchor="middle" fill={COLORS.textDim} fontFamily={FONT} fontSize={24}>Small spot • fixed brightness • illustrative rates</text>
 </svg>;
};
const FieldView:React.FC<{frame:number;title:string;copy:string;result:string}>=({frame,title,copy,result})=><div data-root style={{position:'absolute',inset:0,background:COLORS.bg0,color:COLORS.textStrong,fontFamily:FONT}}>
 <div data-k="text" style={{position:'absolute',left:108,top:70,fontSize:26,color:COLORS.primary}}>NEUROSCIENCE · RECEPTIVE FIELD</div>
 <div data-k="text" style={{position:'absolute',left:108,top:135,fontSize:58,fontWeight:700}}>{title}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:330,width:570,fontSize:37,lineHeight:1.45}}>{copy}</div>
 <div data-k="text" style={{position:'absolute',left:108,top:650,width:570,fontSize:32,lineHeight:1.45,color:COLORS.result}}>{result}</div>
 <div style={{position:'absolute',left:770,top:260,width:1070,height:700}}><ReceptiveMechanism frame={frame}/></div>
 <div data-k="text" style={{position:'absolute',left:108,top:980,fontSize:25,color:COLORS.textMuted}}>A receptive field is a region where a stimulus changes one neuron’s activity.</div>
</div>;
const Baseline:React.FC<{frame:number}>=({frame})=><FieldView frame={frame} title="Map one neuron’s response" copy="First, measure its activity with no light probe." result="Baseline firing gives us a reference."/>;
const Center:React.FC<{frame:number}>=({frame})=><FieldView frame={frame+150} title="Light in the center" copy="A small bright spot activates the ON-center region." result="More spikes. The same cell fires faster."/>;
const Surround:React.FC<{frame:number}>=({frame})=><FieldView frame={frame+360} title="Light in the surround" copy="Switch the same light to the surrounding ring." result="Fewer spikes. Center and surround act oppositely."/>;
const Outside:React.FC<{frame:number}>=({frame})=><FieldView frame={frame+600} title="Outside this receptive field" copy="Move the probe beyond the region that changes this cell’s activity." result="Firing returns to baseline. Position matters."/>;
export const SCENES:SceneDef[]=[
 {id:'baseline',Comp:Baseline,dur:150,transition:'none'},
 {id:'center',Comp:Center,dur:210,transition:'none'},
 {id:'surround',Comp:Surround,dur:240,transition:'none'},
 {id:'outside',Comp:Outside,dur:240,transition:'none'}
];
