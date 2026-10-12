import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm09-potential-energy.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><line x1={920} y1={s.referenceY} x2={1500} y2={s.referenceY} stroke={COLORS.alt} strokeWidth={5}/><rect x={1090} y={s.bodyY} width={80} height={80} fill={COLORS.primary}/><rect x={1300} y={800-Math.max(0,s.deltaU)*4} width={80} height={Math.max(0,s.deltaU)*4} fill={COLORS.result}/><text x={1300} y={900}>{s.U.toFixed(1)} J</text></></svg>;};
