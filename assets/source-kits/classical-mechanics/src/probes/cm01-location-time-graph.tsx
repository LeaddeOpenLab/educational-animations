import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm01-location-time-graph.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><circle cx={s.walkerX} cy={690} r={32} fill={COLORS.primary}/><line x1={s.probeX-55} y1={460+50*s.v} x2={s.probeX+55} y2={460-50*s.v} stroke={COLORS.result} strokeWidth={7}/><text x={1000} y={850}>{s.v.toFixed(2)} m/s</text></></svg>;};
