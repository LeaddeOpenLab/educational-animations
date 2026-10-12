import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm13-no-slip-scrolling.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><line x1={850} y1={830} x2={1700} y2={830} stroke={COLORS.axis} strokeWidth={5}/><circle cx={s.centerX} cy={650} r={180} fill="none" stroke={COLORS.primary} strokeWidth={8}/><line x1={s.centerX} y1={650} x2={s.centerX+180*Math.sin(s.spokeAngle)} y2={650+180*Math.cos(s.spokeAngle)} stroke={COLORS.accent} strokeWidth={7}/><text x={1000} y={920}>s={s.noSlipX.toFixed(2)}, contact v={s.contactVelocity.toFixed(1)}</text></></svg>;};
