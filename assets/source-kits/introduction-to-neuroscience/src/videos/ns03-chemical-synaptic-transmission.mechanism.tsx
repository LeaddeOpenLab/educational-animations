import React from 'react';
import {synapseState} from './ns03-chemical-synaptic-transmission.state';
import {ChemicalSynapse,IonTransit} from '../components/NeuroMechanisms';
import {COLORS} from '../theme';
export const SynapseMechanism=({frame}:{frame:number})=>{const s=synapseState(frame);return <svg viewBox="0 0 900 550"><ChemicalSynapse x={400} y={300} release={s.release} binding={s.binding} clearance={s.clearance}/><IonTransit x={170} y={150} open={1} transit={s.calcium} ion="Ca²⁺"/><path d={`M 630 450 L 665 ${450-s.response*90} L 730 450`} fill="none" stroke={COLORS.result} strokeWidth={5}/><text x={620} y={490} fill={COLORS.textStrong}>{s.occupied} receptors bound</text></svg>;};
