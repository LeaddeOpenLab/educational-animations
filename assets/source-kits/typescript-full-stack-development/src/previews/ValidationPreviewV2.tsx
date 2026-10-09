import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord} from '../components/Mechanisms';
import {validationState} from './validation-state';

const progress=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const FieldToken:React.FC<{name:string;value:string;x:number;y:number;p:number;color:string}>=({name,value,x,y,p,color})=><g transform={`translate(${x+p*575},${y})`}>
  <rect width="225" height="65" rx="10" fill={alpha(color,.18)} stroke={color} strokeWidth="3"/>
  <text x="17" y="42" fill={COLORS.textStrong} fontFamily="monospace" fontSize="25">{name}: {value}</text>
</g>;
export const ValidationPreviewV2:React.FC=()=>{
  const frame=useCurrentFrame(),s=validationState(frame);
  const idMove=progress(frame,s.corrected?178:30,s.corrected?205:60);
  const ageMove=progress(frame,s.corrected?207:70,s.corrected?235:100);
  return <AbsoluteFill style={{background:COLORS.bg0}}><svg width="100%" height="100%" viewBox="0 0 1920 1080">
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
