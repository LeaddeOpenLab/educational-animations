import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS, FONT, alpha} from '../theme';
import {narrowState} from '../previews/narrow-state';

const ease = (frame: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (frame - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

const TopicMechanism: React.FC = () => {
  const frame = Math.floor(useCurrentFrame()/2);
  const state = narrowState(frame);
  const checkMove = ease(frame, 45, 80);
  const okMove = ease(frame, 125, 165);
  const rejectedMove = ease(frame, 95, 135);
  const valueMove = ease(frame, 170, 205);
  return <AbsoluteFill style={{background: COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
    <text x="100" y="100" fill={COLORS.textStrong} fontFamily={FONT} fontSize="52" fontWeight="800">Discriminant check narrows a union</text>
    <text x="115" y="195" fill={COLORS.textMuted} fontFamily="monospace" fontSize="28">result: Ok | Err</text>
    <rect x="105" y="248" width="525" height="455" rx="22" fill={alpha(COLORS.primary,.08)} stroke={COLORS.primary} strokeWidth="3" />
    <text x="135" y="300" fill={COLORS.textStrong} fontFamily={FONT} fontSize="30">Two possible structures</text>
    <g transform={`translate(${rejectedMove * 15},${rejectedMove * 270})`} opacity={1-rejectedMove*.65}>
      <rect x="145" y="350" width="450" height="110" rx="16" fill={alpha(COLORS.warn,.12)} stroke={COLORS.warn} strokeWidth="3" />
      <text x="170" y="395" fill={COLORS.textStrong} fontFamily="monospace" fontSize="25">kind: 'err'</text>
      <text x="170" y="435" fill={COLORS.textMuted} fontFamily="monospace" fontSize="23">message: 'timeout'</text>
    </g>
    <g transform={`translate(${okMove * 1190},${okMove * -120})`}>
      <rect x="145" y="500" width="450" height="110" rx="16" fill={alpha(COLORS.result,.14)} stroke={COLORS.result} strokeWidth="3" />
      <text x="170" y="545" fill={COLORS.textStrong} fontFamily="monospace" fontSize="25">kind: 'ok'</text>
      <text x="170" y="585" fill={COLORS.textStrong} fontFamily="monospace" fontSize="23">value: 42</text>
    </g>
    <rect x="790" y="248" width="380" height="170" rx="18" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3" />
    <text x="820" y="300" fill={COLORS.textStrong} fontFamily={FONT} fontSize="29">Compare field</text>
    <text x="820" y="350" fill={COLORS.accent} fontFamily="monospace" fontSize="25">kind === 'ok'</text>
    {state.checking && <g transform={`translate(${checkMove*425},${-checkMove*160})`}>
      <rect x="385" y="482" width="140" height="56" rx="10" fill={COLORS.primary}/>
      <text x="455" y="520" textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="25">kind</text>
    </g>}
    {state.comparedErr && <text x="180" y="765" fill={COLORS.warn} fontFamily="monospace" fontSize="27">'err' ≠ 'ok'  →  excluded</text>}
    <rect x="1245" y="248" width="545" height="455" rx="20" fill={alpha(COLORS.result,.08)} stroke={COLORS.result} strokeWidth="3" />
    <text x="1275" y="302" fill={COLORS.textStrong} fontFamily={FONT} fontSize="30">True branch</text>
    {state.comparedOk && <text x="1275" y="374" fill={COLORS.result} fontFamily="monospace" fontSize="26">'ok' === 'ok'</text>}
    {state.branch.length > 0 && <text x="1275" y="672" fill={COLORS.textMuted} fontFamily="monospace" fontSize="26">result: Ok</text>}
    {state.value !== null && <g>
      <rect x="1300" y="524" width="390" height="90" rx="16" fill={alpha(COLORS.result,.16)} stroke={COLORS.result} strokeWidth="3" />
      <text x="1325" y="580" fill={COLORS.textStrong} fontFamily="monospace" fontSize="31">result.value:</text>
      <text x={1690-150*(1-valueMove)} y="580" textAnchor="end" fill={COLORS.result} fontFamily="monospace" fontSize="38" opacity={valueMove}>{state.value}</text>
    </g>}
    <text x="115" y="895" fill={COLORS.textMuted} fontFamily={FONT} fontSize="31">{frame<45?'The union still contains both variants.':frame<125?'The kind field is checked against the literal ok.':frame<160?'Err cannot enter the true branch.': 'Only Ok reaches the read; its value is 42.'}</text>
  </svg></AbsoluteFill>;
};


const T = { topic: 'Union Type Narrowing with Discriminants', input: ['result: Ok | Err', 'if (result.kind === "ok") { ... }'], visualArgument: 'The literal tag removes Err', result: 'The true branch can read value: 42' };
const DESIGN_AUDIT = {
 visualArgument: 'The literal tag removes Err',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the the literal tag removes err process needs the long central interval, and the the true branch can read value: 42 result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Union Type Narrowing with Discriminants</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'result: Ok | Err'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'if (result.kind === "ok") { ... }'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Union Type Narrowing with Discriminants</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">The literal tag removes Err</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>The true branch can read value: 42</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-2',Comp:TopicOpen,dur:135},
 {id:'mechanism-2',Comp:TopicMechanism,dur:480},
 {id:'result-2',Comp:TopicClose,dur:145},
];
