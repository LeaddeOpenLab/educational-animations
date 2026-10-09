import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=formState(f),parse=p(f,145,175),send=p(f,180,205),submit=p(f,205,235);
 return <Shell title="Raw form text becomes a validated number before submit" note={f<95?'Typing abc marks the field dirty; blur marks it touched.':f<145?'The schema rejects abc as a number.':f<205?'Correcting the text to 21 produces a numeric parsed value.':f<235?'Only the parsed number enters the submit payload.':'Save completes and dirty resets without losing the field value.'}>
  <rect x="115" y="280" width="520" height="450" rx="20" fill={alpha(COLORS.primary,.1)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={150} y={340} text="AGE INPUT" color={COLORS.primary}/>
  <rect x="150" y="380" width="410" height="105" rx="12" fill={COLORS.bg1} stroke={s.error?COLORS.warn:COLORS.axis} strokeWidth="3"/>
  <text x="178" y="450" fill={COLORS.textStrong} fontFamily="monospace" fontSize="48">{s.raw||'—'}</text>
  <Label x={150} y={545} text={`touched: ${s.touched}`}/><Label x={150} y={600} text={`dirty: ${s.dirty}`}/>
  {s.error&&<Label x={150} y={685} text={s.error} color={COLORS.warn}/>}
  <rect x="760" y="280" width="390" height="450" rx="20" fill={alpha(COLORS.accent,.08)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={800} y={340} text="NUMBER SCHEMA" color={COLORS.accent}/>
  <Label x={800} y={440} text={s.error?'parse failed':s.parsed!==null?`parsed age: ${s.parsed}`:'awaiting value'} color={s.error?COLORS.warn:s.parsed!==null?COLORS.result:COLORS.textMuted}/>
  <Label x={800} y={510} text={s.parsed!==null?'typeof age: number':'no numeric output'} color={s.parsed!==null?COLORS.result:COLORS.textMuted}/>
  {f>=145&&f<175&&<g transform={`translate(${535+parse*245},${390})`}><rect width="100" height="72" rx="11" fill={COLORS.accent}/><text x="20" y="47" fill={COLORS.bg0} fontFamily="monospace" fontSize="28">21</text></g>}
  {f>=180&&f<205&&<g transform={`translate(${1090+send*245},${430})`}><rect width="122" height="72" rx="11" fill={COLORS.result}/><text x="18" y="47" fill={COLORS.bg0} fontFamily="monospace" fontSize="27">age:21</text></g>}
  <rect x="1285" y="280" width="495" height="450" rx="20" fill={alpha(COLORS.result,.07)} stroke={COLORS.result} strokeWidth="3"/>
  <Label x={1320} y={340} text="SUBMISSION" color={COLORS.result}/>
  {s.payload&&<g transform={`translate(${1320+submit*45},${420})`}><rect width="365" height="100" rx="13" fill={alpha(COLORS.result,.16)} stroke={COLORS.result} strokeWidth="3"/><text x="25" y="63" fill={COLORS.textStrong} fontFamily="monospace" fontSize="30">age: {s.payload.age}</text></g>}
  {s.saved&&<Label x={1320} y={640} text="saved age 21" color={COLORS.result}/>}
 </Shell>;
};



const T = { topic: 'Form State and Schema Validation', input: ['raw age = "abc"', 'schema expects number'], visualArgument: 'Parse the text before submitting', result: 'Only parsed age: 21 enters payload' };
const DESIGN_AUDIT = {
 visualArgument: 'Parse the text before submitting',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the parse the text before submitting process needs the long central interval, and the only parsed age: 21 enters payload result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Form State and Schema Validation</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'raw age = "abc"'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'schema expects number'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Form State and Schema Validation</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">Parse the text before submitting</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Only parsed age: 21 enters payload</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-12',Comp:TopicOpen,dur:140},
 {id:'mechanism-12',Comp:TopicMechanism,dur:500},
 {id:'result-12',Comp:TopicClose,dur:155},
];
