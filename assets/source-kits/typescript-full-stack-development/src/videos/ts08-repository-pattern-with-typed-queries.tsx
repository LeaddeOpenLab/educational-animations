import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from '../previews/remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2),s=repositoryState(f),bind=p(f,55,100),map=p(f,130,185);
 return <Shell title="The repository maps a database row to a domain User" note={f<110?'The id is bound as a SQL parameter, not inserted into query text.':f<185?'A nullable row arrives with storage column names.':f<230?'The mapper renames each field into a domain User.':'The no-row branch returns null instead of inventing a User.'}>
  <rect x="100" y="280" width="505" height="300" rx="18" fill={alpha(COLORS.primary,.09)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={130} y={340} text="SELECT user_id," color={COLORS.textStrong}/><Label x={130} y={382} text="display_name" color={COLORS.textStrong}/><Label x={130} y={435} text="WHERE user_id = ?" color={COLORS.accent}/>
  {s.parameter&&<g transform={`translate(${130+bind*325},${475})`}><rect width="125" height="65" rx="12" fill={COLORS.accent}/><text x="20" y="43" fill={COLORS.bg0} fontFamily="monospace" fontSize="27">u7</text></g>}
  {s.row&&<FieldRecord x={760} y={315} width={495} title="database row" fields={[{name:'user_id',value:s.row.user_id},{name:'display_name',value:s.row.display_name}]}/>}
  {s.row&&f>=130&&f<185&&<g transform={`translate(${1110+map*260},${450})`}><rect width="240" height="57" rx="10" fill={COLORS.result}/><text x="15" y="39" fill={COLORS.bg0} fontFamily="monospace" fontSize="23">{map<.5?'user_id':'id'}: {s.row.user_id}</text></g>}
  {s.row&&f>=145&&f<185&&<g transform={`translate(${1110+p(f,145,185)*260},${535})`}><rect width="290" height="57" rx="10" fill={COLORS.result}/><text x="15" y="39" fill={COLORS.bg0} fontFamily="monospace" fontSize="23">{p(f,145,185)<.5?'display_name':'name'}: {s.row.display_name}</text></g>}
  {s.user&&<FieldRecord x={1370} y={315} width={450} title="domain User" fields={[{name:'id',value:s.user.id,state:'accepted'},{name:'name',value:s.user.name,state:'accepted'}]}/>}
  {s.nullBranch&&<g><Label x={795} y={690} text="no matching row → null" color={COLORS.warn}/><Label x={1370} y={690} text="service receives User | null" color={COLORS.result}/></g>}
 </Shell>;
};



const T = { topic: 'Repository Pattern with Typed Queries', input: ['SELECT ... WHERE user_id = ?', 'row: user_id, display_name'], visualArgument: 'The repository binds and maps a row', result: 'Domain User has id and name' };
const DESIGN_AUDIT = {
 visualArgument: 'The repository binds and maps a row',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the the repository binds and maps a row process needs the long central interval, and the domain user has id and name result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Repository Pattern with Typed Queries</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'SELECT ... WHERE user_id = ?'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'row: user_id, display_name'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Repository Pattern with Typed Queries</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">The repository binds and maps a row</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Domain User has id and name</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-8',Comp:TopicOpen,dur:135},
 {id:'mechanism-8',Comp:TopicMechanism,dur:500},
 {id:'result-8',Comp:TopicClose,dur:155},
];
