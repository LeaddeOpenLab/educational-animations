import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord} from '../components/Mechanisms';
import {validationState} from '../previews/validation-state';

const progress=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const FieldToken:React.FC<{name:string;value:string;x:number;y:number;p:number;color:string}>=({name,value,x,y,p,color})=><g transform={`translate(${x+p*575},${y})`}>
  <rect width="225" height="65" rx="10" fill={alpha(color,.18)} stroke={color} strokeWidth="3"/>
  <text x="17" y="42" fill={COLORS.textStrong} fontFamily="monospace" fontSize="25">{name}: {value}</text>
</g>;
const TopicMechanism:React.FC=()=>{
  const frame=Math.floor(useCurrentFrame()/2),s=validationState(frame);
  const idMove=progress(frame,s.corrected?178:30,s.corrected?205:60);
  const ageMove=progress(frame,s.corrected?207:70,s.corrected?235:100);
  return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
    <text x="95" y="100" fill={COLORS.textStrong} fontFamily={FONT} fontSize="52" fontWeight="800">Runtime checks inspect the actual JSON fields</text>
    <FieldRecord x={105} y={275} width={455} title="network JSON · unknown" fields={[{name:'id',value:JSON.stringify(s.raw.id),state:s.checkedId?(s.validId?'accepted':'rejected'):'idle'},{name:'age',value:JSON.stringify(s.raw.age),state:s.checkedAge?(s.validAge?'accepted':'rejected'):'idle'}]}/>
    <rect x="790" y="255" width="380" height="480" rx="18" fill={alpha(COLORS.accent,.07)} stroke={COLORS.accent} strokeWidth="3" />
    <text x="825" y="308" fill={COLORS.textStrong} fontFamily={FONT} fontSize="30">Schema predicates</text>
    <text x="825" y="395" fill={s.checkedId?(s.validId?COLORS.result:COLORS.warn):COLORS.textMuted} fontFamily="monospace" fontSize="27">id: number? {s.checkedId?(s.validId?'yes':'no'):'…'}</text>
    <text x="825" y="470" fill={s.checkedAge?(s.validAge?COLORS.result:COLORS.warn):COLORS.textMuted} fontFamily="monospace" fontSize="27">age: number? {s.checkedAge?(s.validAge?'yes':'no'):'…'}</text>
    {(frame>=30&&!s.checkedId)&&<FieldToken name="id" value={JSON.stringify(s.raw.id)} x={360} y={520} p={idMove} color={s.validId?COLORS.result:COLORS.warn}/>}
    {(frame>=70&&!s.checkedAge||s.corrected&&frame>=207&&!s.checkedAge)&&<FieldToken name="age" value={JSON.stringify(s.raw.age)} x={360} y={625} p={ageMove} color={s.validAge?COLORS.result:COLORS.warn}/>}
    <rect x="1325" y="255" width="480" height="310" rx="18" fill={alpha(COLORS.result,.07)} stroke={COLORS.result} strokeWidth="3" />
    <text x="1360" y="308" fill={COLORS.textStrong} fontFamily={FONT} fontSize="30">Trusted service input</text>
    {s.service&&<FieldRecord x={1365} y={355} width={390} title="parsed record" fields={[{name:'id',value:String(s.service.id),state:'accepted'},{name:'age',value:String(s.service.age),state:'accepted'}]}/>}
    {s.rejected&&<g>
      <path d="M 925 735 L 925 785" stroke={COLORS.warn} strokeWidth="5"/>
      <rect x="710" y="790" width="460" height="100" rx="16" fill={alpha(COLORS.warn,.16)} stroke={COLORS.warn} strokeWidth="3"/>
      <text x="940" y="851" textAnchor="middle" fill={COLORS.warn} fontFamily="monospace" fontSize="28">reject string fields</text>
    </g>}
    <text x="105" y="970" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{frame<100?'Inspect each field value in the unknown payload.':frame<175?'String values fail the number predicates; nothing enters the service.':frame<265?'A corrected numeric payload passes both independent checks.':'Only the parsed numeric record enters the service.'}</text>
  </svg></AbsoluteFill>;
};


const T = { topic: 'Runtime Validation at an API Boundary', input: ['JSON arrives as unknown', 'qty: "many"  /  qty: 2'], visualArgument: 'Runtime evidence decides acceptance', result: 'Invalid input stops before the handler' };
const DESIGN_AUDIT = {
 visualArgument: 'Runtime evidence decides acceptance',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the runtime evidence decides acceptance process needs the long central interval, and the invalid input stops before the handler result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Runtime Validation at an API Boundary</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'JSON arrives as unknown'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'qty: "many"  /  qty: 2'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Runtime Validation at an API Boundary</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">Runtime evidence decides acceptance</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Invalid input stops before the handler</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-4',Comp:TopicOpen,dur:130},
 {id:'mechanism-4',Comp:TopicMechanism,dur:620},
 {id:'result-4',Comp:TopicClose,dur:155},
];
