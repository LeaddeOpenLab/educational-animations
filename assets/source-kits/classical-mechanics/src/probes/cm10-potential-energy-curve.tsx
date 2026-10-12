import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm10-potential-energy-curve.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><line x1={1050} y1={500} x2={1500} y2={500} stroke={COLORS.alt} strokeWidth={5}/><circle cx={s.markerX} cy={700-s.U*160} r={25} fill={COLORS.primary}/><text x={1200} y={900}>K = {s.K.toFixed(2)} J</text></></svg>;};
