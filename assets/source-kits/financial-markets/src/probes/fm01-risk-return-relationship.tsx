import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm01-risk-return-relationship.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="return outcomes"><ReturnOutcomes mu={st.mu} sigma={st.sigma} samples={st.samples} chosen={st.chosen}/>{st.realized!==null?<text x={450} y={570} fill={st.realized>=0?C.primary:C.result} fontFamily={FONT} textAnchor="middle" fontSize={28}>{`One possible realization: ${st.realized.toFixed(1)}%`}</text>:null}</svg>);};
