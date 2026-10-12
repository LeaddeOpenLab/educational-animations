import React from 'react';
import {COLORS} from '../theme';
import {stateAt} from '../videos/cm12-angular-momentum.state';
export const Minimal=({frame}:{frame:number})=>{const s=stateAt(frame);return <svg width={1920} height={1080}><><circle cx={1200} cy={650} r={s.massRadiusPx} fill="none" stroke={COLORS.primary} strokeWidth={7}/><circle cx={1200+s.massRadiusPx} cy={650} r={22} fill={COLORS.accent}/><text x={1000} y={900}>Iω = {(s.I*s.omega).toFixed(1)}</text></></svg>;};
