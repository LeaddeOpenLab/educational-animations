import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm03-acceleration-time-graph.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><rect x={950} y={600-s.deltaV*180} width={130} height={s.deltaV*180} fill={COLORS.accent}/><circle cx={s.cartX} cy={800} r={28} fill={COLORS.primary}/><text x={1100} y={900}>{s.v.toFixed(2)} m/s</text></></svg>;};
