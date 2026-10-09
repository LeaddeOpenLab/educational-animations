import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {COLORS,FONT,alpha} from '../theme';
import {transactionState} from './transaction-state';

const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
const smooth=(f:number,a:number,b:number)=>{const p=Math.max(0,Math.min(1,(f-a)/(b-a)));return p*p*(3-2*p)};
const Bank:React.FC<{x:number;y:number;name:string;amount:number;color:string;wide?:number}>=({x,y,name,amount,color,wide=780})=><g>
  <text x={x} y={y-26} fill={COLORS.textStrong} fontFamily={FONT} fontSize="35" fontWeight="800">{name}</text>
  <rect x={x+90} y={y-69} width={wide} height={72} rx={11} fill={alpha(COLORS.textMuted,.12)}/>
  <rect x={x+90} y={y-69} width={amount*wide/100} height={72} rx={11} fill={color}/>
  <text x={x+110+wide} y={y-14} fill={COLORS.textStrong} fontFamily="monospace" fontSize="44" fontWeight="800" textAnchor="end">{Math.round(amount)}</text>
</g>;

/** 5 visible value units move between accounts inside a private write set. */
export const TransactionPreview:React.FC=()=>{
 const f=useCurrentFrame();
 const {coinProgress,pendingA,pendingB,committed,publicA,publicB,showWorkspace}=transactionState(f);
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg width="100%" height="100%" viewBox="0 0 1920 1080">
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
