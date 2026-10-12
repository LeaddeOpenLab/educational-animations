import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
export const ReturnOutcomes:React.FC<{mu:number;sigma:number;samples:number[];chosen?:number}> = ({mu,sigma,samples,chosen=-1})=> <g fontFamily={FONT}>
 <text x={450} y={50} fontSize={28} fill={C.textStrong} textAnchor="middle">Illustrative one-period outcomes</text>
 {samples.map((v,i)=><g key={i} opacity={chosen<0||chosen===i?1:.22}><line x1={450} y1={110+i*70} x2={450+v*11} y2={110+i*70} stroke={v>=0?C.primary:C.result} strokeWidth={26}/><text x={v>=0?460+v*11:440+v*11} y={119+i*70} fill={v>=0?C.primary:C.result} fontSize={27} textAnchor={v>=0?'start':'end'}>{v.toFixed(1)}%</text></g>)}
 <line x1={450} y1={80} x2={450} y2={420} stroke={C.axis} strokeWidth={2}/>
 <text x={450} y={500} textAnchor="middle" fill={C.accent} fontSize={28}>Expected {mu.toFixed(1)}% · volatility {sigma.toFixed(1)}%</text>
 </g>;
export const CashValue:React.FC<{future:number;present:number;years:number;rate:number;tokenX?:number;tokenValue?:number}> = ({future,present,years,rate,tokenX,tokenValue})=> <g fontFamily={FONT}>
 <text x={170} y={55} fill={C.textStrong} fontSize={28} textAnchor="middle">Today</text><text x={700} y={55} fill={C.textStrong} fontSize={28} textAnchor="middle">Year {years.toFixed(0)}</text>
 <line x1={170} y1={260} x2={700} y2={260} stroke={C.axis} strokeWidth={3}/>
 <rect x={105} y={470-present*3} width={130} height={present*3} fill={alpha(C.accent,.3)} stroke={C.accent} strokeWidth={3}/>
 <rect x={635} y={470-future*3} width={130} height={future*3} fill={alpha(C.primary,.3)} stroke={C.primary} strokeWidth={3}/>
 <text x={170} y={520} textAnchor="middle" fill={C.accent} fontSize={28}>PV {present.toFixed(2)}</text><text x={700} y={520} textAnchor="middle" fill={C.primary} fontSize={28}>FV {future.toFixed(2)}</text>
 <text x={450} y={585} textAnchor="middle" fill={C.textMuted} fontSize={26}>Discount rate {(rate*100).toFixed(0)}% · equal future purchasing claim</text>
 {tokenX!==undefined?<g transform={`translate(${tokenX},260)`}><circle r={28} fill={C.accent}/><text y={8} textAnchor="middle" fill={C.bg0} fontSize={22}>{tokenValue===undefined?'PV':tokenValue.toFixed(0)}</text></g>:null}
 </g>;
export const CapitalLedger:React.FC<{assets:number;debt:number;equity:number;initial:number}> = ({assets,debt,equity,initial})=> <g fontFamily={FONT}>
 <text x={450} y={55} textAnchor="middle" fontSize={30} fill={C.textStrong}>Assets = Debt + Equity</text>
 <rect x={100} y={480-assets*3} width={200} height={assets*3} fill={alpha(C.alt,.4)} stroke={C.alt} strokeWidth={3}/>
 <rect x={580} y={480-debt*3} width={200} height={debt*3} fill={alpha(C.warn,.35)} stroke={C.warn} strokeWidth={3}/>
 <rect x={580} y={480-assets*3} width={200} height={Math.max(0,equity)*3} fill={alpha(equity>=initial?C.primary:C.result,.4)} stroke={equity>=initial?C.primary:C.result} strokeWidth={3}/>
 <text x={200} y={540} textAnchor="middle" fill={C.alt} fontSize={28}>Assets {assets.toFixed(0)}</text><text x={680} y={540} textAnchor="middle" fill={C.warn} fontSize={28}>Debt {debt.toFixed(0)}</text>
 <text x={680} y={130} textAnchor="middle" fill={equity>=initial?C.primary:C.result} fontSize={28}>Equity {equity.toFixed(0)}</text>
 <text x={450} y={600} textAnchor="middle" fill={C.accent} fontSize={29}>Equity return {((equity/initial-1)*100).toFixed(1)}%</text>
 </g>;
export const DepthRows:React.FC<{asks:{price:number;size:number}[];filled:number;cost:number;original:number[]}> = ({asks,filled,cost,original})=> <g fontFamily={FONT}>
 <text x={450} y={55} fill={C.textStrong} fontSize={30} textAnchor="middle">Buy order consumes the lowest asks first</text>
 {asks.map((a,i)=><g key={i}><rect x={180} y={140+i*120} width={original[i]*40} height={62} fill={alpha(C.textDim,.12)} stroke={C.axis}/><rect x={180} y={140+i*120} width={a.size*40} height={62} fill={alpha(C.result,.45)} stroke={C.result}/><text x={140} y={180+i*120} fill={C.textStrong} fontSize={28} textAnchor="end">{a.price.toFixed(0)}</text><text x={630} y={180+i*120} fill={C.textStrong} fontSize={28}>{a.size.toFixed(1)} remaining</text></g>)}
 <text x={450} y={550} fill={C.accent} fontSize={28} textAnchor="middle">Filled {filled.toFixed(1)} · cost {cost.toFixed(2)}</text><text x={450} y={600} fill={C.textMuted} fontSize={27} textAnchor="middle">Average execution {filled? (cost/filled).toFixed(2):'—'}</text>
 </g>;
export const BankBalance:React.FC<{x:number;y:number;name:string;capital:number;loss:number;failed:boolean}> = ({x,y,name,capital,loss,failed})=> <g transform={`translate(${x},${y})`} fontFamily={FONT}>
 <rect x={-100} y={-60} width={200} height={155} rx={12} fill={C.bg2} stroke={failed?C.result:C.alt} strokeWidth={3}/><text y={-24} textAnchor="middle" fill={C.textStrong} fontSize={28}>{name}</text>
 <rect x={-80} y={4} width={160} height={20} fill={alpha(C.alt,.18)}/><rect x={-80} y={4} width={Math.max(0,capital-loss)*20} height={20} fill={C.alt}/><text y={56} textAnchor="middle" fill={C.textMuted} fontSize={24}>Capital {(capital-loss).toFixed(1)}</text><text y={84} textAnchor="middle" fill={C.result} fontSize={22}>{failed?'Insolvent':`Loss ${loss.toFixed(1)}`}</text>
 </g>;
