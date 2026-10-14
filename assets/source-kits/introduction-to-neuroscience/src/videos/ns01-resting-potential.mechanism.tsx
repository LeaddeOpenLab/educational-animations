import React from 'react';
import {restingState} from './ns01-resting-potential.state';
import {IonTransit} from '../components/NeuroMechanisms';
import {COLORS} from '../theme';
export const RestingMechanism=({frame}:{frame:number})=>{const s=restingState(frame);return <svg viewBox="0 0 800 500"><g transform="translate(250 230)">{s.ions.map((v,i)=><IonTransit key={i} x={i*90-130} y={0} open={s.channelOpen} transit={v.p} direction="out"/>)}{Array.from({length:s.escaped},(_,i)=><text key={i} x={i*30} y={65} fill={COLORS.primary}>−</text>)}<text x={0} y={170} fill={COLORS.textStrong}>{s.voltage.toFixed(0)} mV</text><g transform="translate(280 0)">{s.sodium.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={10} fill={COLORS.primary}/>)}{s.potassium.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={10} fill={COLORS.accent}/>)}</g></g></svg>;};
