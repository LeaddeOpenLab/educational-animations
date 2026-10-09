import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines} from '../components/ui';
import {Axes} from '../components/Plot';
import {COLORS,FONT,alpha,fadeIn,ramp} from '../theme';
import {ScoreDistribution} from '../components/EdgeAI';
import {confidenceState} from '../mechanisms/edge15-state';
const T = {w:950,h:650,names:['A','B','C']};
const DESIGN_AUDIT = {
 visualArgument:'Class probability bars and a numerical threshold control whether a concrete class or unknown enters the output slot.',
 motion:'A new input redistributes probability mass; the output switches at the precise crossing, and an equality example confirms the chosen rule.',
 example:'0.60 below0.70 abstains,0.82 accepts A, and exactly0.70 passes the inclusive threshold.',
 antiTemplate:'The key operation is a guarded output decision rather than the teacher-target redistribution of knowledge distillation.',
 sceneRationale:'Four scenes separate ranking, abstention, new evidence that crosses the threshold, and the equality boundary; each exposes a distinct misconception.'
};
const ThresholdView=({frame,local,part}:{frame:number;local:number;part:number})=>{
 const v=confidenceState(frame);const titles=['Largest Is Not Always Enough','Below Threshold: Abstain','New Input, New Decision','Equality Uses the Same Rule'];
 const texts=[['A has the largest score: 0.60.','Required confidence: at least 0.70.'],['The winning score is still too low.','Return unknown instead of forcing a class.'],['A rises above the same threshold.','The output changes only when the rule is met.'],['Accept when max(score) ≥ threshold.','A confidence score is not a correctness guarantee.']][part];
 return <><Backdrop width={1920} height={1080}/><Kicker text="EDGE AI · CONFIDENCE THRESHOLD" frame={local}/><Heading text={titles[part]} frame={local} width={650} size={51}/><Lines items={texts} frame={local} top={340} width={615} size={30}/>
 <svg data-k="figure" data-n="probabilities and guarded class output" width={T.w} height={T.h} viewBox="0 0 950 650" style={{position:'absolute',left:850,top:240,fontFamily:FONT,opacity:fadeIn(local,12,15)}}>
 <Axes width={930} height={420} xDomain={[-.7,2.9]} yDomain={[-.15,1.12]} pad={{l:60,r:80,t:45,b:45}} yTicks={[0,.5,1]}>{s=><ScoreDistribution s={s} scores={v.scores} names={T.names} threshold={v.threshold} precision={3}/>}</Axes>
 <text x={65} y={465} fill={COLORS.textStrong} fontSize={32}>{v.decision.score.toFixed(3)} {v.decision.accepted?'≥':'<'} {v.threshold.toFixed(3)}</text>
 <line x1={295} x2={460} y1={458} y2={458} stroke={COLORS.axis} strokeWidth={4}/>
 <circle cx={300+150*ramp(frame,170,65)} cy={458} r={10} fill={v.decision.accepted?COLORS.result:COLORS.warn}/>
 <rect x={480} y={425} width={340} height={135} rx={18} fill={alpha(v.decision.accepted?COLORS.result:COLORS.warn,.13)} stroke={v.decision.accepted?COLORS.result:COLORS.warn} strokeWidth={3}/>
 <text x={650} y={465} textAnchor="middle" fill={COLORS.textMuted} fontSize={23}>OUTPUT</text>
 <text x={650} y={524} textAnchor="middle" fill={COLORS.textStrong} fontSize={44}>{v.output}</text>
 {part===3&&frame>=670&&<text x={85} y={620} fill={COLORS.accent} fontSize={30}>0.70 ≥ 0.70 → A is accepted</text>}
 </svg></>;
};
const Scores=({frame}:{frame:number})=><ThresholdView frame={frame} local={frame} part={0}/>;
const Abstain=({frame}:{frame:number})=><ThresholdView frame={frame+135} local={frame} part={1}/>;
const NewInput=({frame}:{frame:number})=><ThresholdView frame={frame+360} local={frame} part={2}/>;
const Boundary=({frame}:{frame:number})=><ThresholdView frame={frame+630} local={frame} part={3}/>;
export const SCENES=[{id:'scores',Comp:Scores,dur:135},{id:'abstain',Comp:Abstain,dur:225},{id:'newinput',Comp:NewInput,dur:270},{id:'boundary',Comp:Boundary,dur:165}];
