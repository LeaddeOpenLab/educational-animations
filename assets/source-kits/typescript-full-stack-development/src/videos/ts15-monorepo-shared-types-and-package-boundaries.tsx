import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {alpha,COLORS,FONT} from '../theme';
import {FieldRecord} from '../components/Mechanisms';
import {buildState} from '../previews/build-state';

const progress=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const TopicMechanism:React.FC=()=>{
  const frame=Math.floor(useCurrentFrame()/2),s=buildState(frame),wave=progress(frame,60,100),apiFix=progress(frame,150,175),webFix=progress(frame,205,230);
  return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
    <text x="95" y="100" fill={COLORS.textStrong} fontFamily={FONT} fontSize="51" fontWeight="800">A shared type edit breaks two concrete objects</text>
    <FieldRecord x={90} y={285} width={475} title="shared User" fields={[{name:'id',value:'string'},{name:'name',value:'string'},...(s.sharedRequiresAvatar?[{name:'avatarUrl',value:'string',state:'changed' as const}]:[])]}/>
    <FieldRecord x={750} y={285} width={475} title="API mapper output" fields={[{name:'id',value:'u7'},{name:'name',value:'Ada'},...(s.apiHasAvatar?[{name:'avatarUrl',value:'/ada.png',state:'accepted' as const}]:[])]}/>
    <FieldRecord x={1390} y={285} width={445} title="web fixture" fields={[{name:'id',value:'u7'},{name:'name',value:'Ada'},...(s.webHasAvatar?[{name:'avatarUrl',value:'/ada.png',state:'accepted' as const}]:[])]}/>
    {s.sharedRequiresAvatar&&frame<100&&[0,1].map((n)=><g key={n} opacity={wave}>
      <circle cx={570+wave*(n===0?165:810)} cy={640-wave*190} r="39" fill={COLORS.accent}/>
      <text x={570+wave*(n===0?165:810)} y={650-wave*190} textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="24">+</text>
    </g>)}
    {s.apiError&&<g>
      <rect x="765" y="585" width="450" height="110" rx="13" fill={alpha(COLORS.warn,.14)} stroke={COLORS.warn} strokeWidth="3"/>
      <text x="785" y="630" fill={COLORS.warn} fontFamily="monospace" fontSize="23">API: missing avatarUrl</text>
      <text x="785" y="665" fill={COLORS.textMuted} fontFamily="monospace" fontSize="20">User requires avatarUrl:string</text>
    </g>}
    {s.webError&&<g>
      <rect x="1390" y="585" width="440" height="110" rx="13" fill={alpha(COLORS.warn,.14)} stroke={COLORS.warn} strokeWidth="3"/>
      <text x="1410" y="630" fill={COLORS.warn} fontFamily="monospace" fontSize="23">web: missing avatarUrl</text>
      <text x="1410" y="665" fill={COLORS.textMuted} fontFamily="monospace" fontSize="20">fixture omits required field</text>
    </g>}
    {frame>=150&&frame<175&&<text x={780} y={750-apiFix*80} fill={COLORS.result} fontFamily="monospace" fontSize="26">+ avatarUrl: '/ada.png'</text>}
    {frame>=205&&frame<230&&<text x={1400} y={750-webFix*80} fill={COLORS.result} fontFamily="monospace" fontSize="26">+ avatarUrl: '/ada.png'</text>}
    <text x="115" y="795" fill={s.apiBuilds?COLORS.result:COLORS.warn} fontFamily="monospace" fontSize="27">API build: {s.apiBuilds?'PASS':'FAIL'}</text>
    <text x="740" y="795" fill={s.webBuilds?COLORS.result:COLORS.warn} fontFamily="monospace" fontSize="27">web build: {s.webBuilds?'PASS':'FAIL'}</text>
    <text x="95" y="940" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">{frame<55?'Both outputs satisfy User with id and name.':frame<100?'Shared User gains required avatarUrl; dependents have not changed.':frame<175?'Both concrete outputs lack avatarUrl and fail independently.':frame<230?'API mapper is fixed; web fixture still fails.':'Both objects now supply avatarUrl; both packages build.'}</text>
  </svg></AbsoluteFill>;
};


const T = { topic: 'Monorepo Shared Types and Package Boundaries', input: ['shared type package changes', 'api and web import that type'], visualArgument: 'A type change propagates across packages', result: 'Repair dependent errors at the boundary' };
const DESIGN_AUDIT = {
 visualArgument: 'A type change propagates across packages',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the a type change propagates across packages process needs the long central interval, and the repair dependent errors at the boundary result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Monorepo Shared Types and Package Boundaries</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'shared type package changes'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'api and web import that type'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Monorepo Shared Types and Package Boundaries</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">A type change propagates across packages</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Repair dependent errors at the boundary</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-15',Comp:TopicOpen,dur:140},
 {id:'mechanism-15',Comp:TopicMechanism,dur:580},
 {id:'result-15',Comp:TopicClose,dur:150},
];
