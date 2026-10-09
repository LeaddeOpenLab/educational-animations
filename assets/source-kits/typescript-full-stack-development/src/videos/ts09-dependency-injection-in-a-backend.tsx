import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=injectionState(f),call=p(f,155,190);
 return <Shell title="Injection swaps the provider while service code stays fixed" note={f<110?'Production calls the real provider once.':f<155?'The constructor receives FakePaymentPort for the test.':f<210?'The same charge(18) call is recorded by the fake.':'The fake returns receipt fake-1; the real call log does not grow.'}>
  <rect x="120" y="310" width="465" height="285" rx="20" fill={alpha(COLORS.primary,.1)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={155} y={375} text="CheckoutService" color={COLORS.textStrong}/><Label x={155} y={465} text="port.charge(18)" color={COLORS.accent}/>
  <rect x="715" y="310" width="340" height="285" rx="20" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={750} y={375} text="PaymentPort" color={COLORS.accent}/><Label x={750} y={460} text={`provider: ${s.provider}`} color={COLORS.textStrong}/>
  <rect x="1190" y="250" width="535" height="200" rx="18" fill={alpha(s.provider==='real'?COLORS.result:COLORS.textMuted,.1)} stroke={s.provider==='real'?COLORS.result:COLORS.axis} strokeWidth="3"/>
  <Label x={1220} y={310} text="RealPayment" color={s.provider==='real'?COLORS.result:COLORS.textMuted}/><Label x={1220} y={385} text={`charge log: ${s.realCalls}`} />
  <rect x="1190" y="510" width="535" height="230" rx="18" fill={alpha(s.provider==='fake'?COLORS.result:COLORS.textMuted,.1)} stroke={s.provider==='fake'?COLORS.result:COLORS.axis} strokeWidth="3"/>
  <Label x={1220} y={570} text="FakePayment" color={s.provider==='fake'?COLORS.result:COLORS.textMuted}/><Label x={1220} y={640} text={`calls: [${s.fakeCalls.join(', ')}]`}/>
  {s.amount!==null&&f<190&&<g transform={`translate(${585+call*570},${475+call*100})`}><circle r="43" fill={COLORS.accent}/><text x="0" y="10" textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="27">{s.amount}</text></g>}
  {s.receipt&&<Label x={155} y={760} text={`receipt: ${s.receipt}`} color={COLORS.result}/>}
 </Shell>;
};



const T = { topic: 'Dependency Injection in a Backend', input: ['CheckoutService(port: PaymentPort)', 'same charge(18) call in prod and test'], visualArgument: 'The constructor swaps the provider', result: 'Fake logs 18; real log stays unchanged' };
const DESIGN_AUDIT = {
 visualArgument: 'The constructor swaps the provider',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the the constructor swaps the provider process needs the long central interval, and the fake logs 18; real log stays unchanged result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Dependency Injection in a Backend</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'CheckoutService(port: PaymentPort)'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'same charge(18) call in prod and test'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Dependency Injection in a Backend</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">The constructor swaps the provider</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Fake logs 18; real log stays unchanged</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-9',Comp:TopicOpen,dur:140},
 {id:'mechanism-9',Comp:TopicMechanism,dur:500},
 {id:'result-9',Comp:TopicClose,dur:140},
];
