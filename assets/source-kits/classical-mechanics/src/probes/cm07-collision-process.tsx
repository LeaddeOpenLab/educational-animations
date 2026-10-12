import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm07-collision-process.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><circle cx={1100-s.separation/2} cy={650} r={44} fill={COLORS.primary}/><circle cx={1100+s.separation/2} cy={650} r={44} fill={COLORS.alt}/><rect x={950} y={780} width={s.choice==='elastic'?s.elastic.kNow*55:s.sticky.kNow*55} height={42} fill={COLORS.result}/><text x={1000} y={900}>{s.choice} · elastic store {s.elastic.stored.toFixed(2)} J</text></></svg>;};
