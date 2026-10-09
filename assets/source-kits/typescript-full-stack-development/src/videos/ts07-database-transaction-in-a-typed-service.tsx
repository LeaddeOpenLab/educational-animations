import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {transactionState} from '../previews/transaction-state';

const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
const smooth=(f:number,a:number,b:number)=>{const p=Math.max(0,Math.min(1,(f-a)/(b-a)));return p*p*(3-2*p)};
const Bank:React.FC<{x:number;y:number;name:string;amount:number;color:string;wide?:number}>=({x,y,name,amount,color,wide=780})=><g>
  <text x={x} y={y-26} fill={COLORS.textStrong} fontFamily={FONT} fontSize="35" fontWeight="800">{name}</text>
  <rect x={x+90} y={y-69} width={wide} height={72} rx={11} fill={alpha(COLORS.textMuted,.12)}/>
  <rect x={x+90} y={y-69} width={amount*wide/100} height={72} rx={11} fill={color}/>
  <text x={x+110+wide} y={y-14} fill={COLORS.textStrong} fontFamily="monospace" fontSize="44" fontWeight="800" textAnchor="end">{Math.round(amount)}</text>
</g>;

/** 5 visible value units move between accounts inside a private write set. */
const TopicMechanism:React.FC=()=>{
 const f=Math.floor(useCurrentFrame()/2);
 const {coinProgress,pendingA,pendingB,committed,publicA,publicB,showWorkspace}=transactionState(f);
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
   <text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="53" fontWeight="800">Transfer 25: debit and credit share one commit</text>
   <text x="95" y="173" fill={COLORS.primary} fontFamily="monospace" fontSize="30">PUBLISHED DATABASE</text>
   <Bank x={145} y={305} name="A" amount={publicA} color={COLORS.primary}/>
   <Bank x={145} y={440} name="B" amount={publicB} color={COLORS.primary}/>
   <path d="M 95 515 H 1790" stroke={COLORS.axis} strokeWidth="3" strokeDasharray="16 15"/>
   {showWorkspace&&<g>
     <text x="95" y="595" fill={COLORS.accent} fontFamily="monospace" fontSize="30">PRIVATE WRITE SET · not published</text>
     <Bank x={145} y={725} name="A" amount={pendingA} color={COLORS.accent}/>
     <Bank x={145} y={885} name="B" amount={pendingB} color={COLORS.accent}/>
     {coinProgress.map((p,i)=>p>0&&p<1&&<g key={i}>
       <circle cx={lerp(1100-i*34,620+i*34,p)} cy={lerp(665,825,p)-Math.sin(p*Math.PI)*110} r={17} fill={COLORS.textStrong} stroke={COLORS.accent} strokeWidth={5}/>
     </g>)}
   </g>}
   {f>=145&&f<205&&<g opacity={smooth(f,145,155)*(1-smooth(f,190,205))}>
     <text x="1170" y="700" fill={COLORS.warn} fontFamily={FONT} fontSize="44" fontWeight="800">FAILURE</text>
     <text x="1170" y="760" fill={COLORS.warn} fontFamily={FONT} fontSize="30">discard pending writes</text>
   </g>}
   {f>=300&&<g>
     <rect x="1110" y="300" width="580" height="130" rx={18} fill={alpha(COLORS.result,.14)} stroke={COLORS.result} strokeWidth={3}/>
     <text x="1145" y="360" fill={COLORS.result} fontFamily={FONT} fontSize="34" fontWeight="800">{committed?'COMMITTED TOGETHER':'COMMIT BOUNDARY'}</text>
     <text x="1145" y="404" fill={COLORS.textMuted} fontFamily="monospace" fontSize="24">{committed?'A = 75   B = 65':'public still A = 100   B = 40'}</text>
   </g>}
   <text x="95" y="1005" fill={COLORS.textMuted} fontFamily={FONT} fontSize="27">{f<145?'Only the private copy changes.':f<205?'Rollback removes both pending values.':f<320?'Retry builds a complete private write set.':'One commit publishes both balances at once.'}</text>
 </svg></AbsoluteFill>
};


const T = { topic: 'Database Transaction in a Typed Service', input: ['public balances: 100 and 40', 'pending transfer: −25 and +25'], visualArgument: 'Writes remain private until commit', result: 'Retry commits both balances together' };
const DESIGN_AUDIT = {
 visualArgument: 'Writes remain private until commit',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the writes remain private until commit process needs the long central interval, and the rollback leaves public values unchanged result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Database Transaction in a Typed Service</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'public balances: 100 and 40'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'pending transfer: −25 and +25'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Database Transaction in a Typed Service</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">Writes remain private until commit</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>Retry commits both balances together</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-7',Comp:TopicOpen,dur:130},
 {id:'mechanism-7',Comp:TopicMechanism,dur:720},
 {id:'result-7',Comp:TopicClose,dur:150},
];
