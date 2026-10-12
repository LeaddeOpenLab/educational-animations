import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm08-work-energy-theorem.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><rect x={950} y={790-s.work*26} width={120} height={s.work*26} fill={COLORS.accent}/><circle cx={s.cartX} cy={800} r={30} fill={COLORS.primary}/><text x={1080} y={900}>{s.kinetic.toFixed(2)} J</text></></svg>;};
