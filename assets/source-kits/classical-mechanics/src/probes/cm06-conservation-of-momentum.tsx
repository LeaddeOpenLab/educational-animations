import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm06-conservation-of-momentum.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><circle cx={s.ball1X} cy={660} r={50} fill={COLORS.primary}/><circle cx={s.ball2X} cy={660} r={35} fill={COLORS.alt}/><rect x={950} y={790} width={Math.max(0,s.p1)*35} height={32} fill={COLORS.primary}/><rect x={950} y={835} width={Math.max(0,s.p2)*35} height={32} fill={COLORS.alt}/><text x={1300} y={900}>{s.total.toFixed(1)} kg·m/s</text></></svg>;};
