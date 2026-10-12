import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm06-efficient-market-hypothesis.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<Axes width={900} height={640} xDomain={[0,10]} yDomain={[90,130]} xTicks={[0,4,8,10]} yTicks={[100,120]} xLabel="Time around public news" yLabel="Price" pad={{l:90,r:60,t:80,b:80}}>{s=><><Curve s={s} pts={[[0,100],[Math.min(st.time,4),100],...(st.news?[[4,120],[st.time,120]]:[])] as [number,number][]} color={C.primary} progress={1}/><Curve s={s} pts={sampleFn(st.slow,0,st.time)} color={C.alt} progress={1}/><line x1={s.px(4)} x2={s.px(4)} y1={s.py(95)} y2={s.py(125)} stroke={C.accent} strokeDasharray="8 6"/><circle cx={s.px(st.time)} cy={s.py(st.price)} r={10} fill={C.accent}/><text x={s.px(5)} y={s.py(95)} fill={C.textStrong} fontSize={25}>{st.news?`Efficient ${st.price.toFixed(0)} · lagged ${st.lag.toFixed(0)}`:"News not yet public"}</text></>}</Axes>);};
