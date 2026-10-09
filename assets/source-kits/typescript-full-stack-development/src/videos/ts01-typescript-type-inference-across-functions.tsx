import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=inferenceState(f),first=p(f,55,100),second=p(f,125,165);
 return <Shell title="The return expression determines the caller's type" note={f<100?'The source has id and name; the return expression selects name.':f<165?'The one-field return record crosses the function boundary.':f<205?'The caller receives name:string, not the original source shape.':'result.id fails because no id crossed the return boundary.'}>
  <FieldRecord x={105} y={310} width={420} title="source" fields={[{name:'id',value:String(s.source.id)},{name:'name',value:s.source.name}]}/>
  <Label x={650} y={270} text="return { name: input.name }" color={COLORS.accent}/>
  <rect x="645" y="310" width="455" height="240" rx="18" fill={alpha(COLORS.accent,.08)} stroke={COLORS.accent} strokeWidth="3"/>
  {f>=55&&f<100&&<g transform={`translate(${490+first*240},${390})`}><rect width="195" height="65" rx="10" fill={COLORS.accent}/><text x="18" y="44" fill={COLORS.bg0} fontFamily="monospace" fontSize="26">name: Ada</text></g>}
  {s.returned&&<FieldRecord x={680} y={365} width={365} title="returned" fields={[{name:'name',value:s.returned.name,state:'accepted'}]}/>}
  {f>=125&&f<165&&<g transform={`translate(${1050+second*240},${390})`}><rect width="195" height="65" rx="10" fill={COLORS.result}/><text x="18" y="44" fill={COLORS.bg0} fontFamily="monospace" fontSize="26">name: Ada</text></g>}
  {s.caller&&<FieldRecord x={1360} y={310} width={420} title="caller result" fields={[{name:'name',value:s.caller.name,state:'accepted'}]}/>}
  {s.idReadRejected&&<g><Label x={1360} y={625} text="result.id" color={COLORS.warn}/><path d="M 1360 640 L 1550 640" stroke={COLORS.warn} strokeWidth="5"/><Label x={1360} y={690} text="no such property" color={COLORS.warn}/></g>}
 </Shell>;
};



const T = { topic: 'TypeScript Type Inference Across Functions', input: ['source = { id: 7, name: "Ada" }', 'return { name: source.name }'], visualArgument: 'Only name crosses the function return', result: 'result.name: string; result.id is absent' };
const DESIGN_AUDIT = {
 visualArgument: 'Only name crosses the function return',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the only name crosses the function return process needs the long central interval, and the result.name: string; result.id is absent result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">TypeScript Type Inference Across Functions</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'source = { id: 7, name: "Ada" }'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'return { name: source.name }'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">TypeScript Type Inference Across Functions</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">Only name crosses the function return</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>result.name: string; result.id is absent</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-1',Comp:TopicOpen,dur:130},
 {id:'mechanism-1',Comp:TopicMechanism,dur:500},
 {id:'result-1',Comp:TopicClose,dur:140},
];
