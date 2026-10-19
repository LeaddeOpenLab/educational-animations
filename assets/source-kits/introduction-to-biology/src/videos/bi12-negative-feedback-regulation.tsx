import React from 'react';
import type {SceneDef} from '../Video';
import {Backdrop} from '../components/Backdrop';
import {SceneShell, SplitBody} from '../components/SceneShell';
import {Kicker, Heading, Lines, Chip} from '../components/ui';
import {FeedbackLoop} from '../components/Bio';
import {COLORS, ramp} from '../theme';

const T={setPoint:.5,peak:.9,home:.55, rise:(f:number)=>ramp(f,15,110),recover:(f:number)=>ramp(f,15,135), value:(stage:number,p:number)=>stage===0?.5:stage===1?.5+.4*p:stage===2?.9-.2*p:.9-.35*p};
const DESIGN_AUDIT={
 visualArgument:'The controlled value first departs from its set point; sensing and effector action reduce that same deviation.',
 motion:'A gauge climbs from 0.5 to 0.9, the sensor-effector path activates, and the gauge descends toward 0.5 while the suppressive return path appears.',
 example:'An illustrative variable rises to 0.9 against a 0.5 target and settles near 0.55 after feedback.',
 antiTemplate:'Unlike signal transduction, this mechanism must return influence to the original stimulus and visibly shrink the error rather than end at an output node.',
 sceneRationale:'Baseline, perturbation, compensating action and restored value are four distinct causal states; omitting the recovery would leave only a circular diagram.',
};
const Control:React.FC<{frame:number;state:number}>=({frame,state})=>{
 const p=state===1?T.rise(frame):T.recover(frame); const v=T.value(state,p);
 const labels=['A stable set point','A disturbance raises the value','An effector opposes the change','The original signal falls'];
 const copy=[['The system tracks a target value.','Sensor, controller and effector are ready.'],['The measured value rises above target.','The sensor detects the error.'],['The effector produces an opposing response.','The value begins to decline.'],['The deviation is smaller.','The reduced signal weakens the response.']][state];
 return <SceneShell backdrop={<Backdrop width={1920} height={1080}/>} header={<><Kicker text="NEGATIVE FEEDBACK REGULATION" frame={frame} top={0} left={0}/><Heading text={labels[state]} frame={frame} top={48} left={0} width={1580}/></>}
 body={<SplitBody ratio={0.34} left={<Lines frame={frame} items={copy} top={0} left={0} width={510} size={29} bullet={false}/>}
 right={<svg data-k="shape" data-n="feedback loop and controlled-value gauge" viewBox="0 0 900 360" width="100%" height="330"><FeedbackLoop cx={420} cy={185} r={95} nodes={['disturbance','sensor','effector','response']} value={v} setPoint={T.setPoint} range={[0,1]} progress={state===0?.35:state===1?.5:state===2?.8:1}/>
 {state>=2?<path d="M 770 145 Q 825 20 550 15" fill="none" stroke={COLORS.warn} strokeWidth="5" strokeDasharray="10 6"/>:null}</svg>}/>}
 foot={<Chip text={state===3?`error: ${(T.peak-T.setPoint).toFixed(2)} → ${(v-T.setPoint).toFixed(2)} · feedback reduces deviation`:`value ${v.toFixed(2)} · set point ${T.setPoint.toFixed(2)}`} color={state===3?COLORS.result:COLORS.primary}/>}/>;
};
const Baseline:React.FC<{frame:number}>=({frame})=><Control frame={frame} state={0}/>;
const Disturbance:React.FC<{frame:number}>=({frame})=><Control frame={frame} state={1}/>;
const Oppose:React.FC<{frame:number}>=({frame})=><Control frame={frame} state={2}/>;
const Recover:React.FC<{frame:number}>=({frame})=><Control frame={frame} state={3}/>;
export const SCENES:SceneDef[]=[
{id:'set-point',Comp:Baseline,dur:190},
{id:'disturbance',Comp:Disturbance,dur:245},
{id:'opposing-response',Comp:Oppose,dur:240},
{id:'recovery',Comp:Recover,dur:225},
];
void DESIGN_AUDIT;
