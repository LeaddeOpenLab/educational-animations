import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm08-option-expiration-gain.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<Axes width={900} height={640} xDomain={[75,125]} yDomain={[-10,30]} xTicks={[80,100,105,120]} yTicks={[-5,0,15,25]} xLabel="Stock price at expiration" yLabel="Per-share payoff / net profit" pad={{l:90,r:60,t:80,b:80}}>{s=><><Curve s={s} pts={[[75,0],[100,0],[125,25]]} color={C.alt} progress={1}/><OptionPayoff s={s} kind="call" strike={st.strike} premium={st.premium} showUnderlying={false} showLabels={false} progress={1}/><circle cx={s.px(st.S)} cy={s.py(st.payoff)} r={10} fill={C.alt}/><circle cx={s.px(st.S)} cy={s.py(st.profit)} r={11} fill={st.profit>=0?C.primary:C.result}/><line x1={s.px(st.S)} x2={s.px(st.S)} y1={s.py(st.payoff)} y2={s.py(st.profit)} stroke={C.accent} strokeWidth={3}/><text x={s.px(77)} y={35} fill={C.textStrong} fontSize={26}>{`S ${st.S.toFixed(1)} · payoff ${st.payoff.toFixed(1)} · profit ${st.profit.toFixed(1)}`}</text></>}</Axes>);};
