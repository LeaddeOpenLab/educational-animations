import React from 'react';
import {COLORS as C,FONT,alpha} from '../theme';
import {Axes,Curve,sampleFn} from '../components/Plot';
import {Diversification,OptionPayoff,OptionDelta} from '../components/Fin';
import {ReturnOutcomes,CashValue,CapitalLedger,DepthRows,BankBalance} from '../components/FinanceState';
import {stateAt} from '../videos/fm10-financial-leverage.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<svg width={900} height={640} viewBox="0 0 900 640" data-k="figure" data-n="leveraged balance sheet"><CapitalLedger assets={st.assets} debt={st.debt} equity={st.equity} initial={st.initial}/></svg>);};
