import React from 'react';
import {integrationState} from './ns04-synaptic-integration.state';
import {COLORS} from '../theme';
export const IntegrationMechanism=({frame}:{frame:number})=>{const s=integrationState(frame);return <svg viewBox="0 0 900 500"><line x1={50} y1={200} x2={700} y2={200} stroke={COLORS.warn}/><polyline points={s.trace.map(p=>`${50+p.t*70},${350-(p.v+70)*10}`).join(' ')} fill="none" stroke={COLORS.primary} strokeWidth={5}/>{s.fired&&<circle cx={720+s.outputProgress*120} cy={200} r={12} fill={COLORS.accent}/>}<text x={50} y={430} fill={COLORS.textStrong}>{s.voltage.toFixed(1)} mV</text></svg>;};
