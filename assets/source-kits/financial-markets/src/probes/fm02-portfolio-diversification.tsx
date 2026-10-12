import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm02-portfolio-diversification.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<Axes width={900} height={640} xDomain={[1,18]} yDomain={[0,25]} xTicks={[1,4,8,16]} yTicks={[0,10,20]} xLabel="Number of equal-weight assets" yLabel="Volatility (%)" pad={{l:90,r:100,t:80,b:80}}>{s=><><Diversification s={s} sigma={20} rhos={[st.rho,.8]} progress={1}/><circle cx={s.px(st.n)} cy={s.py(st.low)} r={11} fill={C.accent}/><circle cx={s.px(st.n)} cy={s.py(st.high)} r={11} fill={C.alt}/><text x={s.px(7)} y={s.py(23)} fill={C.accent} fontSize={27}>{`n ${st.n.toFixed(0)} · low ρ σ ${st.low.toFixed(1)}%`}</text></>}</Axes>);};
