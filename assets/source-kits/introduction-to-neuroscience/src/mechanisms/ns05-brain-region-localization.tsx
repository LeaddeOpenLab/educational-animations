import React from 'react';
import {BrainMap} from '../components/Neuro';
import {localizationState} from './ns05-brain-region-localization.state';
import {COLORS,FONT} from '../theme';
// Relation exception: distinct task symbols dock at anatomical locations; no signal propagation claimed.
export const LocalizationMechanism:React.FC<{frame:number}>=({frame})=>{
 const s=localizationState(frame);
 return <svg viewBox="0 0 900 750"><BrainMap cx={450} cy={340} scale={1} active={s.selectedLobe}/>
 {s.pairs.map(p=><g key={p.task} data-task={p.task} data-lobe={p.lobe} data-assigned={p.assigned} transform={`translate(${p.position.x} ${p.position.y})`}><circle r={14} fill={COLORS.accent}/><text y={-24} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={24}>{p.task}</text></g>)}
 {s.networkLinks.map(([a,b])=><line key={a} data-network="true" x1={s.pairs[a].x} y1={s.pairs[a].y} x2={s.pairs[b].x} y2={s.pairs[b].y} stroke={COLORS.result} strokeWidth={5}/>)}
 </svg>;
};
