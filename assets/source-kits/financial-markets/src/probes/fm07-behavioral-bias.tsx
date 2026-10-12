import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm07-behavioral-bias.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<Axes width={900} height={640} xDomain={[-15,15]} yDomain={[-24,16]} xTicks={[-10,0,10]} yTicks={[-20,0,10]} xLabel="Gain / loss relative to reference" yLabel="Subjective value (illustrative)" pad={{l:90,r:60,t:80,b:80}}>{s=><><Curve s={s} pts={sampleFn(st.curve,-15,15)} color={C.primary} progress={1}/><circle cx={s.px(st.x)} cy={s.py(st.value)} r={12} fill={st.x>=0?C.primary:C.result}/><line x1={s.px(st.x)} x2={s.px(st.x)} y1={s.py(0)} y2={s.py(st.value)} stroke={C.accent} strokeWidth={3}/><text x={s.px(-13)} y={35} fill={C.accent} fontSize={27}>{`Money ${st.x.toFixed(1)} · value ${st.value.toFixed(1)}`}</text></>}</Axes>);};
