import React from 'react';
import {visualPaths,visualRouteState} from './ns07-visual-pathway.state';
import {COLORS} from '../theme';
export const VisualMechanism:React.FC<{frame:number}>=({frame})=>{
 const s=visualRouteState(frame);
 return <svg viewBox="0 0 900 750"><line x1={500} x2={500} y1={40} y2={710} stroke={COLORS.axis} strokeDasharray="8 8"/>
 {Object.entries(visualPaths).map(([k,ps])=><polyline key={k} data-route={k} points={ps.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke={k.startsWith('nasal')?COLORS.primary:COLORS.result} strokeWidth={5}/>)}
 <circle data-retina="left-nasal" cx={300} cy={120} r={20} fill={s.retinalActivation.includes('left-nasal')?COLORS.accent:COLORS.bg1}/>
 <circle data-retina="right-temporal" cx={740} cy={120} r={20} fill={s.retinalActivation.includes('right-temporal')?COLORS.accent:COLORS.bg1}/>
 <rect data-lgn={s.lgnArrived} x={650} y={465} width={100} height={50} rx={20} fill={s.lgnArrived?COLORS.primary:COLORS.bg2}/>
 <rect data-cortex={s.cortexArrived} x={645} y={640} width={110} height={55} rx={15} fill={s.cortexArrived?COLORS.result:COLORS.bg2}/>
 <circle data-packet="nasal" cx={s.nasalPoint.x} cy={s.nasalPoint.y} r={12} fill={COLORS.primary}/>
 <circle data-packet="temporal" cx={s.temporalPoint.x} cy={s.temporalPoint.y} r={12} fill={COLORS.result}/>
 </svg>;
};
