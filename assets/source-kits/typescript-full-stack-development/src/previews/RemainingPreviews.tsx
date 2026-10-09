import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {FieldRecord,CallStack} from '../components/Mechanisms';
import {inferenceState,genericState,contractState,errorState,repositoryState,injectionState,formState,authState,socketState} from './remaining-state';

const p=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
const Shell:React.FC<{title:string;children:React.ReactNode;note:string}>=({title,children,note})=><AbsoluteFill style={{background:COLORS.bg0}}><svg width="100%" height="100%" viewBox="0 0 1920 1080"><text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49" fontWeight="800">{title}</text>{children}<text x="95" y="975" fill={COLORS.textMuted} fontFamily={FONT} fontSize="29">{note}</text></svg></AbsoluteFill>;
const Label:React.FC<{x:number;y:number;text:string;color?:string}>=({x,y,text,color=COLORS.textMuted})=><text x={x} y={y} fill={color} fontFamily="monospace" fontSize="27">{text}</text>;

export const InferencePreview:React.FC=()=>{
 const f=useCurrentFrame(),s=inferenceState(f),first=p(f,55,100),second=p(f,125,165);
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

export const GenericPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=genericState(f),userMove=p(f,105,155),orderMove=p(f,135,185);
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

export const ContractPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=contractState(f),requestMove=p(f,55,115),responseMove=p(f,180,225);
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

export const ErrorPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=errorState(f),rise=p(f,55,185);
 return <Shell title="A rejected promise unwinds through await frames" note={f<55?'Route awaits service; service awaits repository.':f<155?'NotFound travels upward as each await rejects.':f<210?'The route success path is gone; the handler receives the rejection.':'The handler maps NotFound to HTTP 404.'}>
  <Label x={160} y={270} text="ASYNC CALL STACK" color={COLORS.primary}/>
  <CallStack x={170} y={330} frames={s.frames} errorAt={s.error?Math.max(0,s.frames.length-1):-1}/>
  {s.error&&f<210&&<g transform={`translate(${735+rise*460},${600-rise*235})`}>
    <rect width="330" height="82" rx="12" fill={alpha(COLORS.warn,.18)} stroke={COLORS.warn} strokeWidth="3"/>
    <text x="18" y="51" fill={COLORS.warn} fontFamily="monospace" fontSize="26">{s.error}</text>
  </g>}
  <rect x="1240" y="315" width="505" height="370" rx="20" fill={alpha(COLORS.result,.07)} stroke={COLORS.result} strokeWidth="3"/>
  <Label x={1270} y={375} text="error handler" color={COLORS.result}/>
  <Label x={1270} y={440} text="NotFound → 404"/>
  {s.httpStatus&&<g><Label x={1270} y={550} text={`HTTP ${s.httpStatus}`} color={COLORS.result}/><Label x={1270} y={605} text="{error: not found}" color={COLORS.textStrong}/></g>}
  {!s.httpStatus&&<Label x={1270} y={550} text="response pending" color={COLORS.textMuted}/>}
 </Shell>;
};

export const RepositoryPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=repositoryState(f),bind=p(f,55,100),map=p(f,130,185);
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

export const InjectionPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=injectionState(f),call=p(f,155,190);
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

export const FormPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=formState(f),parse=p(f,145,175),send=p(f,180,205),submit=p(f,205,235);
 return <Shell title="Raw form text becomes a validated number before submit" note={f<95?'Typing abc marks the field dirty; blur marks it touched.':f<145?'The schema rejects abc as a number.':f<205?'Correcting the text to 21 produces a numeric parsed value.':f<235?'Only the parsed number enters the submit payload.':'Save completes and dirty resets without losing the field value.'}>
  <rect x="115" y="280" width="520" height="450" rx="20" fill={alpha(COLORS.primary,.1)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={150} y={340} text="AGE INPUT" color={COLORS.primary}/>
  <rect x="150" y="380" width="410" height="105" rx="12" fill={COLORS.bg1} stroke={s.error?COLORS.warn:COLORS.axis} strokeWidth="3"/>
  <text x="178" y="450" fill={COLORS.textStrong} fontFamily="monospace" fontSize="48">{s.raw||'—'}</text>
  <Label x={150} y={545} text={`touched: ${s.touched}`}/><Label x={150} y={600} text={`dirty: ${s.dirty}`}/>
  {s.error&&<Label x={150} y={685} text={s.error} color={COLORS.warn}/>}
  <rect x="760" y="280" width="390" height="450" rx="20" fill={alpha(COLORS.accent,.08)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={800} y={340} text="NUMBER SCHEMA" color={COLORS.accent}/>
  <Label x={800} y={440} text={s.error?'parse failed':s.parsed!==null?`parsed age: ${s.parsed}`:'awaiting value'} color={s.error?COLORS.warn:s.parsed!==null?COLORS.result:COLORS.textMuted}/>
  <Label x={800} y={510} text={s.parsed!==null?'typeof age: number':'no numeric output'} color={s.parsed!==null?COLORS.result:COLORS.textMuted}/>
  {f>=145&&f<175&&<g transform={`translate(${535+parse*245},${390})`}><rect width="100" height="72" rx="11" fill={COLORS.accent}/><text x="20" y="47" fill={COLORS.bg0} fontFamily="monospace" fontSize="28">21</text></g>}
  {f>=180&&f<205&&<g transform={`translate(${1090+send*245},${430})`}><rect width="122" height="72" rx="11" fill={COLORS.result}/><text x="18" y="47" fill={COLORS.bg0} fontFamily="monospace" fontSize="27">age:21</text></g>}
  <rect x="1285" y="280" width="495" height="450" rx="20" fill={alpha(COLORS.result,.07)} stroke={COLORS.result} strokeWidth="3"/>
  <Label x={1320} y={340} text="SUBMISSION" color={COLORS.result}/>
  {s.payload&&<g transform={`translate(${1320+submit*45},${420})`}><rect width="365" height="100" rx="13" fill={alpha(COLORS.result,.16)} stroke={COLORS.result} strokeWidth="3"/><text x="25" y="63" fill={COLORS.textStrong} fontFamily="monospace" fontSize="30">age: {s.payload.age}</text></g>}
  {s.saved&&<Label x={1320} y={640} text="saved age 21" color={COLORS.result}/>}
 </Shell>;
};

export const AuthPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=authState(f),identityMove=p(f,s.attempt==='u8'?95:175,s.attempt==='u8'?115:195);
 return <Shell title="Authentication creates identity; authorization compares owner" note={f<80?'No cookie: middleware returns 401 before a user identity exists.':f<165?'Valid user u8 is authenticated but fails the owner comparison: 403.':'Valid user u7 matches resource owner u7, so the record is revealed.'}>
  <rect x="95" y="305" width="355" height="260" rx="18" fill={alpha(COLORS.primary,.1)} stroke={COLORS.primary} strokeWidth="3"/>
  <Label x={125} y={365} text="REQUEST" color={COLORS.primary}/><Label x={125} y={450} text={`cookie: ${s.attempt}`}/>
  <rect x="555" y="305" width="400" height="260" rx="18" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={590} y={365} text="SESSION VERIFY" color={COLORS.accent}/><Label x={590} y={450} text={s.identity?`identity: ${s.identity}`:s.httpStatus===401?'no identity':'checking…'} color={s.identity?COLORS.result:s.httpStatus===401?COLORS.warn:COLORS.textMuted}/>
  <rect x="1065" y="305" width="380" height="260" rx="18" fill={alpha(COLORS.accent,.09)} stroke={COLORS.accent} strokeWidth="3"/>
  <Label x={1100} y={365} text="OWNER CHECK" color={COLORS.accent}/><Label x={1100} y={450} text="owner: u7"/>
  {s.identity&&<g transform={`translate(${840+identityMove*270},${490})`}><rect width="155" height="65" rx="10" fill={s.identity==='u7'?COLORS.result:COLORS.warn}/><text x="15" y="43" fill={COLORS.bg0} fontFamily="monospace" fontSize="25">{s.identity}</text></g>}
  <rect x="1525" y="305" width="280" height="260" rx="18" fill={alpha(s.resourceVisible?COLORS.result:COLORS.textMuted,.1)} stroke={s.resourceVisible?COLORS.result:COLORS.axis} strokeWidth="3"/>
  <Label x={1550} y={365} text="RESOURCE" color={s.resourceVisible?COLORS.result:COLORS.textMuted}/>
  <Label x={1550} y={450} text={s.resourceVisible?'u7 data':'hidden'} color={s.resourceVisible?COLORS.result:COLORS.textMuted}/>
  {s.httpStatus&&<Label x={600} y={690} text={`HTTP ${s.httpStatus}`} color={COLORS.warn}/>}
  {s.resourceVisible&&<Label x={1495} y={690} text="HTTP 200" color={COLORS.result}/>}
 </Shell>;
};

export const SocketPreview:React.FC=()=>{
 const f=useCurrentFrame(),s=socketState(f),move=p(f,f<145?45:150,f<145?95:195);
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
