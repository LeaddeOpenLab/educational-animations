import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=socketState(f),move=p(f,f<145?45:150,f<145?95:195);
 return <Shell title="Typed socket events still require runtime packet checks" note={f<105?'A valid chat:new packet carries roomId and text across the socket.':f<145?'The parser admits it and the callback log gains one message.':f<200?'A remote packet without text reaches the same boundary.':'The malformed packet is rejected; the callback log remains unchanged.'}>
  <rect x="110" y="260" width="420" height="475" rx="20" fill={alpha(COLORS.primary,.1)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={145} y={325} text="CLIENT" color={COLORS.primary}/><Label x={145} y={405} text="event: chat:new"/>
  <rect x="760" y="260" width="390" height="475" rx="20" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={795} y={325} text="PACKET PARSER" color={COLORS.accent}/><Label x={795} y={405} text="roomId:string"/><Label x={795} y={455} text="text:string"/>
  <rect x="1360" y="260" width="445" height="475" rx="20" fill={alpha(COLORS.result,.08)} stroke={COLORS.result} strokeWidth="3"/>
  <Label x={1395} y={325} text="CALLBACK LOG" color={COLORS.result}/>
  {s.inFlight&&<g transform={`translate(${300+move*570},${530})`}><rect width="330" height="120" rx="14" fill={alpha(f<145?COLORS.result:COLORS.warn,.25)} stroke={f<145?COLORS.result:COLORS.warn} strokeWidth="3"/><text x="17" y="45" fill={COLORS.textStrong} fontFamily="monospace" fontSize="24">roomId: r1</text><text x="17" y="87" fill={COLORS.textStrong} fontFamily="monospace" fontSize="24">text: {'text' in s.packet?s.packet.text:'MISSING'}</text></g>}
  {s.validReceived&&s.callbackLog.map((item,i)=><g key={i}><Label x={1400} y={420+i*65} text={`r1: ${item.text}`} color={COLORS.result}/></g>)}
  {s.invalidRejected&&<Label x={795} y={655} text="reject: text absent" color={COLORS.warn}/>}
 </Shell>;
};


const T = { topic: 'WebSocket Event Types Across Client and Server', input: ['socket packet has a literal event type', 'client and server share the event union'], visualArgument: 'The event tag selects its payload shape', result: 'Unknown packet cannot reach the handler' };
const DESIGN_AUDIT = {
 visualArgument: 'The event tag selects its payload shape',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the the event tag selects its payload shape process needs the long central interval, and the unknown packet cannot reach the handler result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">WebSocket Event Types Across Client and Server</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'socket packet has a literal event type'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'client and server share the event union'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">WebSocket Event Types Across Client and Server</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">The event tag selects its payload shape</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Unknown packet cannot reach the handler</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-14',Comp:TopicOpen,dur:135},
 {id:'mechanism-14',Comp:TopicMechanism,dur:500},
 {id:'result-14',Comp:TopicClose,dur:145},
];
