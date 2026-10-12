import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm04-yield-curve.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<Axes width={900} height={640} xDomain={[1,10]} yDomain={[0,6]} xTicks={[1,5,10]} yTicks={[0,2,4,6]} xLabel="Maturity (years)" yLabel="Yield (%)" pad={{l:90,r:130,t:80,b:80}}>{s=><><Curve s={s} pts={sampleFn(st.yc,1,10)} color={C.primary} progress={1}/><circle cx={s.px(1)} cy={s.py(st.short)} r={10} fill={C.accent}/><circle cx={s.px(10)} cy={s.py(st.long)} r={10} fill={C.alt}/><text x={s.px(3)} y={s.py(1)} fill={C.textStrong} fontSize={28}>{`Long − short: ${st.spread.toFixed(2)} pp`}</text></>}</Axes>);};
