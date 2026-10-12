import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm03-present-value.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="discounted cash"><CashValue future={st.future} present={st.present} years={st.years} rate={st.rate} tokenX={st.tokenX} tokenValue={st.tokenValue}/></svg>);};
