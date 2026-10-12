import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm04-newtons-laws-of-motion.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><rect x={s.bodyX} y={660} width={110} height={90} fill={COLORS.primary}/><line x1={s.bodyX+55} y1={650} x2={s.bodyX+55+s.netForce*25} y2={650} stroke={COLORS.accent} strokeWidth={8}/><text x={1050} y={880}>{s.acceleration.toFixed(1)} m/s²</text></></svg>;};
