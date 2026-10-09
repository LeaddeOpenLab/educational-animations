import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS,FONT} from '../theme';
import {BuildTargets,FieldRecord,HydrationDOM,TypeSet,VersionedState} from '../components/Mechanisms';

const Shell:React.FC<{title:string;children:React.ReactNode}>=({title,children})=><AbsoluteFill style={{background:COLORS.bg0}}><svg width="100%" height="100%" viewBox="0 0 1920 1080"><text x="100" y="110" fontFamily={FONT} fontSize="52" fontWeight="800" fill={COLORS.textStrong}>{title}</text>{children}</svg></AbsoluteFill>;
const Caption:React.FC<{text:string}>=({text})=><text x="105" y="870" fontFamily={FONT} fontSize="30" fill={COLORS.textMuted}>{text}</text>;

export const NarrowPreview:React.FC=()=>{const f=useCurrentFrame();return <Shell title="A check removes an impossible type">
  <TypeSet x={170} y={280} predicate={f<60?"result: Ok | Err":"result.kind === 'ok'"} variants={[{name:'Ok',fields:['kind: ok','value: 42']},{name:'Err',fields:['kind: err','message: timeout'],excluded:f>=95}]}/>
  {f>=130&&<FieldRecord x={1100} y={320} title="true branch" fields={[{name:'value',value:'42',state:'accepted'}]} width={420}/>}
  <Caption text={f<60?"Two candidate structures are possible.":f<130?"The discriminant removes Err from this branch.":"Only Ok owns value; the branch now reads 42."}/>
</Shell>};

export const ValidationPreview:React.FC=()=>{const f=useCurrentFrame();const correct=f>=145;return <Shell title="Unknown bytes need runtime checks">
  <FieldRecord x={170} y={290} width={450} title="incoming JSON · unknown" fields={[{name:'id',value:correct?'7':'"7"',state:f<45?'idle':correct?'accepted':'rejected'},{name:'age',value:correct?'21':'"oops"',state:f<95?'idle':correct?'accepted':'rejected'}]}/>
  <text x="760" y="350" fill={COLORS.accent} fontFamily="monospace" fontSize="32">id: number?</text>
  <text x="760" y="415" fill={COLORS.accent} fontFamily="monospace" fontSize="32">age: number?</text>
  {correct&&<FieldRecord x={1290} y={290} width={400} title="service input" fields={[{name:'id',value:'7',state:'accepted'},{name:'age',value:'21',state:'accepted'}]}/>}
  <Caption text={f<95?"Inspect each actual value, not its TypeScript annotation.":f<145?"Both wrong types keep the handler closed.":"Correct numeric fields create a trusted service input."}/>
</Shell>};

export const CachePreview:React.FC=()=>{const f=useCurrentFrame();const server=f>=65?3:2;const cache=f>=170?3:2;return <Shell title="Mutation makes the cache stale">
  <VersionedState x={170} y={310} label="server" version={server===2?1:2} value={`count ${server}`}/>
  <VersionedState x={650} y={310} label="cache" version={cache===2?1:2} value={`count ${cache}`} stale={server!==cache}/>
  <FieldRecord x={1170} y={265} title="two consumers" fields={[{name:'badge',value:String(cache),state:f>=170?'changed':'idle'},{name:'list',value:`${cache} items`,state:f>=170?'changed':'idle'}]} width={430}/>
  <Caption text={f<65?"Both views read cached version 1.":f<120?"Mutation updates only the server to version 2.":f<170?"Invalidation marks cache v1 stale; refetch is pending.":"Refetch replaces cache; both consumers rerender from v2."}/>
</Shell>};

export const HydrationPreview:React.FC=()=>{const f=useCurrentFrame();const rows=f<55?[]:[{tag:'h1',text:'Count 2'},{tag:'button',text:f>=180?'Add · clicked':'Add'}];return <Shell title="Hydration keeps the painted DOM">
  {rows.length>0&&<HydrationDOM x={360} y={265} rows={rows} handlersAttached={f>=120} clicked={f>=180}/>}
  <text x="1100" y="360" fill={COLORS.textMuted} fontFamily="monospace" fontSize="29">{f<55?'server renders HTML':f<120?'browser paints HTML':f<180?'attach handler to same button':'button handles click'}</text>
  <Caption text={f<55?"The browser starts with no content.":f<120?"HTML paints visible nodes before client code.":f<180?"Event handler attaches without replacing those nodes.":"A click now changes interactive state."}/>
</Shell>};

export const BuildPreview:React.FC=()=>{const f=useCurrentFrame();const changed=f>=60,apiFixed=f>=145,webFixed=f>=190;return <Shell title="One shared type change, two build errors">
  <FieldRecord x={130} y={300} title="shared User" fields={[{name:'id',value:'string'},{name:'name',value:'string'},...(changed?[{name:'avatarUrl',value:'string',state:'changed' as const}]:[])]} width={380}/>
  <BuildTargets x={660} y={355} targets={[{name:'API mapper',state:changed?(apiFixed?'fixed':'broken'):'ready',detail:changed?(apiFixed?'adds avatarUrl':'missing avatarUrl'):'builds'},{name:'web fixture',state:changed?(webFixed?'fixed':'broken'):'ready',detail:changed?(webFixed?'adds avatarUrl':'missing avatarUrl'):'builds'}]}/>
  <Caption text={f<60?"Both packages compile against id and name.":f<145?"Required avatarUrl breaks both dependents.":f<190?"API mapper is repaired; web still fails.":"Each dependent now supplies the new field."}/>
</Shell>};
