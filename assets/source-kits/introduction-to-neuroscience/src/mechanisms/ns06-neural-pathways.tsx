import React from 'react';
import {touchPaths,touchRouteState} from './ns06-neural-pathways.state';
import {COLORS} from '../theme';
export const TouchMechanism:React.FC<{frame:number}>=({frame})=>{
 const s=touchRouteState(frame);
 return <svg viewBox="0 0 900 750"><line x1={450} x2={450} y1={40} y2={710} stroke={COLORS.axis} strokeDasharray="8 8"/>
 {Object.entries(touchPaths).map(([k,ps])=><polyline key={k} data-route={k} points={ps.map(p=>`${p.x},${p.y}`).join(' ')} fill="none" stroke={COLORS.primary} strokeWidth={6}/>)}
 <circle data-relay="medulla" data-arrived={s.medullaArrived} cx={650} cy={330} r={22} fill={s.medullaArrived?COLORS.result:COLORS.bg1}/>
 <circle data-relay="thalamus" data-arrived={s.thalamusArrived} cx={250} cy={140} r={22} fill={s.thalamusArrived?COLORS.result:COLORS.bg1}/>
 <circle data-relay="cortex" data-arrived={s.cortexArrived} cx={170} cy={65} r={28} fill={s.cortexArrived?COLORS.result:COLORS.bg1}/>
 <circle data-packet="touch" data-owner={s.packetOwner} cx={s.point.x} cy={s.point.y} r={12} fill={COLORS.accent}/>
 </svg>;
};
