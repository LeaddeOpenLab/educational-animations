import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=genericState(f),userMove=p(f,105,155),orderMove=p(f,135,185);
 return <Shell title="A constraint checks id without erasing extra fields" note={f<105?'Two shapes share id; a third object lacks it.':f<155?'The no-id object is rejected; User passes the id check.':f<185?'User keeps email while Order enters the same function.':'Both returned objects retain their distinct extra fields.'}>
  <rect x="780" y="250" width="320" height="480" rx="22" fill={alpha(COLORS.accent,.1)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={815} y={315} text="T extends" color={COLORS.accent}/><Label x={815} y={360} text="{id: string}" color={COLORS.accent}/>
  <Label x={815} y={560} text="return input" color={COLORS.textStrong}/>
  <g transform={`translate(${120+userMove*1190},${265})`}><FieldRecord x={0} y={0} width={395} title="User" fields={[{name:'id',value:s.user.id},{name:'email',value:s.user.email,state:'accepted'}]}/></g>
  <g transform={`translate(${120+orderMove*1190},${570})`}><FieldRecord x={0} y={0} width={395} title="Order" fields={[{name:'id',value:s.order.id},{name:'total',value:String(s.order.total),state:'accepted'}]}/></g>
  <g opacity={s.noIdRejected?.35:1}><FieldRecord x={420} y={780} width={320} title="NoId" fields={[{name:'email',value:'x@y'}]}/></g>
  {s.noIdRejected&&<Label x={790} y={860} text="NoId rejected: id absent" color={COLORS.warn}/>}
  {s.userReturned&&<Label x={1330} y={490} text="user.email → a@b" color={COLORS.result}/>}
  {s.orderReturned&&<Label x={1330} y={795} text="order.total → 24" color={COLORS.result}/>}
 </Shell>;
};



const T = { topic: 'Generic Constraints and Reusable APIs', input: ['function keepId<T extends {id:string}>(x:T):T', 'User and Order both satisfy the constraint'], visualArgument: 'The same check accepts distinct shapes', result: 'Extra fields survive: email and total' };
const DESIGN_AUDIT = {
 visualArgument: 'The same check accepts distinct shapes',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the the same check accepts distinct shapes process needs the long central interval, and the extra fields survive: email and total result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Generic Constraints and Reusable APIs</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'function keepId<T extends {id:string}>(x:T):T'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'User and Order both satisfy the constraint'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Generic Constraints and Reusable APIs</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">The same check accepts distinct shapes</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Extra fields survive: email and total</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-3',Comp:TopicOpen,dur:140},
 {id:'mechanism-3',Comp:TopicMechanism,dur:500},
 {id:'result-3',Comp:TopicClose,dur:150},
];
