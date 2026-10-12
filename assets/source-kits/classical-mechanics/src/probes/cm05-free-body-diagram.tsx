import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm05-free-body-diagram.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><rect x={1070} y={640} width={100} height={90} fill={COLORS.primary}/>{s.isolated&&<line x1={1120} y1={650} x2={1120} y2={650+s.mg*9} stroke={COLORS.warn} strokeWidth={7}/ >}{s.components&&<line x1={1120} y1={650} x2={1120+s.gravityParallel*10} y2={650} stroke={COLORS.accent} strokeWidth={7}/>}<text x={1000} y={900}>{s.netAlong.toFixed(1)} N</text></></svg>;};
