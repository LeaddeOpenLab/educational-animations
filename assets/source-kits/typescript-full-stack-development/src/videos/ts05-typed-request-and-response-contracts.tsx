import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=contractState(f),requestMove=p(f,55,115),responseMove=p(f,180,225);
 return <Shell title="Typed requests and responses cross different boundaries" note={f<115?'The browser sends itemId and qty as a request.':f<175?'The server validates the received JSON before building an order.':f<225?'The server returns a new orderId and total response.':'The browser reads fields from the response contract.'}>
  <rect x="95" y="250" width="505" height="505" rx="20" fill={alpha(COLORS.primary,.08)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={130} y={315} text="BROWSER" color={COLORS.primary}/>
  <rect x="1310" y="250" width="505" height="505" rx="20" fill={alpha(COLORS.result,.08)} stroke={COLORS.result} strokeWidth="3"/>
  <Label x={1345} y={315} text="SERVER" color={COLORS.result}/>
  <Label x={750} y={290} text="POST /orders" color={COLORS.accent}/>
  <Label x={710} y={390} text="request: itemId, qty"/>
  <Label x={710} y={690} text="response: orderId, total"/>
  {f<115&&<g transform={`translate(${160+requestMove*1180},${410})`}><FieldRecord x={0} y={0} width={385} title="request JSON" fields={[{name:'itemId',value:s.request.itemId},{name:'qty',value:String(s.request.qty)}]}/></g>}
  {f>=115&&f<175&&<FieldRecord x={1350} y={405} width={385} title="received JSON" fields={[{name:'itemId',value:s.request.itemId,state:s.serverValidated?'accepted':'checking'},{name:'qty',value:String(s.request.qty),state:s.serverValidated?'accepted':'checking'}]}/>}
  {f>=115&&f<175&&<Label x={1360} y={695} text={`typeof qty: ${s.serverValidated?'number ✓':'checking 2…'}`} color={s.serverValidated?COLORS.result:COLORS.accent}/>}
  {s.serverValidated&&f>=175&&<g><Label x={1360} y={395} text="qty is number: yes" color={COLORS.result}/><Label x={1360} y={445} text="handler accepts order" color={COLORS.result}/></g>}
  {s.response&&f<225&&<g transform={`translate(${1350-responseMove*1180},${540})`}><FieldRecord x={0} y={0} width={385} title="response JSON" fields={[{name:'orderId',value:s.response.orderId},{name:'total',value:String(s.response.total)}]}/></g>}
  {s.browserOrder&&<FieldRecord x={155} y={535} width={385} title="browser order" fields={[{name:'orderId',value:s.browserOrder.orderId,state:'accepted'},{name:'total',value:String(s.browserOrder.total),state:'accepted'}]}/>}
 </Shell>;
};



const T = { topic: 'Typed Request and Response Contracts', input: ['POST /orders  {itemId, qty}', 'Response  {orderId, total}'], visualArgument: 'A request and response have different shapes', result: 'Validate JSON before trusting its fields' };
const DESIGN_AUDIT = {
 visualArgument: 'A request and response have different shapes',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the a request and response have different shapes process needs the long central interval, and the validate json before trusting its fields result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Typed Request and Response Contracts</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'POST /orders  {itemId, qty}'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'Response  {orderId, total}'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Typed Request and Response Contracts</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">A request and response have different shapes</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Validate JSON before trusting its fields</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-5',Comp:TopicOpen,dur:135},
 {id:'mechanism-5',Comp:TopicMechanism,dur:500},
 {id:'result-5',Comp:TopicClose,dur:140},
];
