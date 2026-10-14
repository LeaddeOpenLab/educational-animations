import React from 'react';
import {actionState} from './ns02-action-potential.state';
import {IonTransit} from '../components/NeuroMechanisms';
import {COLORS} from '../theme';
export const ActionMechanism=({frame}:{frame:number})=>{const s=actionState(frame);return <svg viewBox="0 0 800 500"><IonTransit x={160} y={180} open={s.naOpen} transit={s.naTransit} ion="Na⁺"/><IonTransit x={480} y={180} open={s.kOpen} transit={s.kTransit} direction="out"/><circle cx={650} cy={260-s.voltage*2} r={12} fill={COLORS.result}/><text x={600} y={450} fill={COLORS.textStrong}>{s.voltage.toFixed(0)} mV</text>{s.patchVoltages.map((v,i)=><rect key={i} x={60+i*130} y={420-(v+70)} width={35} height={Math.max(1,v+70)} fill={COLORS.accent}/>)}</svg>;};
