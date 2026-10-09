import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=errorState(f),rise=p(f,55,185);
 return <Shell title="A rejected promise unwinds through await frames" note={f<55?'Route awaits service; service awaits repository.':f<155?'NotFound travels upward as each await rejects.':f<210?'The route success path is gone; the handler receives the rejection.':'The handler maps NotFound to HTTP 404.'}>
  <Label x={160} y={270} text="ASYNC CALL STACK" color={COLORS.primary}/>
  <CallStack x={170} y={330} frames={s.frames} errorAt={s.error?Math.max(0,s.frames.length-1):-1}/>
  {s.error&&f<210&&<g transform={`translate(${735+rise*460},${600-rise*235})`}>
    <rect width="330" height="82" rx="12" fill={alpha(COLORS.warn,.18)} stroke={COLORS.warn} strokeWidth="3"/>
    <text x="18" y="51" fill={COLORS.warn} fontFamily="monospace" fontSize="26">{s.error}</text>
  </g>}
  <rect x="1240" y="315" width="505" height="370" rx="20" fill={alpha(COLORS.result,.07)} stroke={COLORS.result} strokeWidth="3"/>
  <Label x={1270} y={375} text="error handler" color={COLORS.result}/>
  <Label x={1270} y={440} text="NotFound → 404"/>
  {s.httpStatus&&<g><Label x={1270} y={550} text={`HTTP ${s.httpStatus}`} color={COLORS.result}/><Label x={1270} y={605} text="{error: not found}" color={COLORS.textStrong}/></g>}
  {!s.httpStatus&&<Label x={1270} y={550} text="response pending" color={COLORS.textMuted}/>}
 </Shell>;
};



const T = { topic: 'Async Error Propagation in a Server Route', input: ['route → service → repository', 'repository rejects NotFound'], visualArgument: 'The rejection unwinds each await', result: 'The handler maps NotFound to HTTP 404' };
const DESIGN_AUDIT = {
 visualArgument: 'The rejection unwinds each await',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the the rejection unwinds each await process needs the long central interval, and the the handler maps notfound to http 404 result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Async Error Propagation in a Server Route</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'route → service → repository'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'repository rejects NotFound'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Async Error Propagation in a Server Route</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">The rejection unwinds each await</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>The handler maps NotFound to HTTP 404</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-6',Comp:TopicOpen,dur:140},
 {id:'mechanism-6',Comp:TopicMechanism,dur:500},
 {id:'result-6',Comp:TopicClose,dur:145},
];
