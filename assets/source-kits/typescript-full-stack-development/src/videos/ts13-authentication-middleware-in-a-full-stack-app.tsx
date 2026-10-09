import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=authState(f),identityMove=p(f,s.attempt==='u8'?95:175,s.attempt==='u8'?115:195);
 return <Shell title="Authentication creates identity; authorization compares owner" note={f<80?'No cookie: middleware returns 401 before a user identity exists.':f<165?'Valid user u8 is authenticated but fails the owner comparison: 403.':'Valid user u7 matches resource owner u7, so the record is revealed.'}>
  <rect x="95" y="305" width="355" height="260" rx="18" fill={alpha(COLORS.primary,.1)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={125} y={365} text="REQUEST" color={COLORS.primary}/><Label x={125} y={450} text={`cookie: ${s.attempt}`}/>
  <rect x="555" y="305" width="400" height="260" rx="18" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={590} y={365} text="SESSION VERIFY" color={COLORS.accent}/><Label x={590} y={450} text={s.identity?`identity: ${s.identity}`:s.httpStatus===401?'no identity':'checking…'} color={s.identity?COLORS.result:s.httpStatus===401?COLORS.warn:COLORS.textMuted}/>
  <rect x="1065" y="305" width="380" height="260" rx="18" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={1100} y={365} text="OWNER CHECK" color={COLORS.accent}/><Label x={1100} y={450} text="owner: u7"/>
  {s.identity&&<g transform={`translate(${840+identityMove*270},${490})`}><rect width="155" height="65" rx="10" fill={s.identity==='u7'?COLORS.result:COLORS.warn}/><text x="15" y="43" fill={COLORS.bg0} fontFamily="monospace" fontSize="25">{s.identity}</text></g>}
  <rect x="1525" y="305" width="280" height="260" rx="18" fill={alpha(s.resourceVisible?COLORS.result:COLORS.textMuted,.1)} stroke={s.resourceVisible?COLORS.result:COLORS.axis} strokeWidth="3"/>
  <Label x={1550} y={365} text="RESOURCE" color={s.resourceVisible?COLORS.result:COLORS.textMuted}/>
  <Label x={1550} y={450} text={s.resourceVisible?'u7 data':'hidden'} color={s.resourceVisible?COLORS.result:COLORS.textMuted}/>
  {s.httpStatus&&<Label x={600} y={690} text={`HTTP ${s.httpStatus}`} color={COLORS.warn}/>}
  {s.resourceVisible&&<Label x={1495} y={690} text="HTTP 200" color={COLORS.result}/>}
 </Shell>;
};



const T = { topic: 'Authentication Middleware in a Full-Stack App', input: ['anonymous / user u8 / user u7', 'resource owner = u7'], visualArgument: 'Session identity and owner are separate checks', result: '401, 403 and 200 have distinct causes' };
const DESIGN_AUDIT = {
 visualArgument: 'Session identity and owner are separate checks',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the session identity and owner are separate checks process needs the long central interval, and the 401, 403 and 200 have distinct causes result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Authentication Middleware in a Full-Stack App</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'anonymous / user u8 / user u7'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'resource owner = u7'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Authentication Middleware in a Full-Stack App</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">Session identity and owner are separate checks</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>401, 403 and 200 have distinct causes</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-13',Comp:TopicOpen,dur:130},
 {id:'mechanism-13',Comp:TopicMechanism,dur:500},
 {id:'result-13',Comp:TopicClose,dur:140},
];
