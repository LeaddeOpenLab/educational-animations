import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm11-rigid-body-rotation.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><circle cx={1200} cy={650} r={180} fill="none" stroke={COLORS.primary} strokeWidth={8}/><line x1={1200} y1={650} x2={s.outerX} y2={650-180*Math.sin(s.angle)} stroke={COLORS.accent} strokeWidth={8}/><text x={1000} y={900}>v outer = {s.vOuter.toFixed(1)}</text></></svg>;};
