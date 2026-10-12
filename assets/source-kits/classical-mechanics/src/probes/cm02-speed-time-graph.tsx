import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm02-speed-time-graph.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><rect x={900} y={700-s.speed*75} width={s.areaWidth} height={s.speed*75} fill={COLORS.accent}/><circle cx={s.cartX} cy={790} r={28} fill={COLORS.primary}/><text x={1000} y={900}>{s.distance.toFixed(2)} m</text></></svg>;};
