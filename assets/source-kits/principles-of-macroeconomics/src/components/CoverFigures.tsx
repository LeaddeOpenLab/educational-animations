import React from 'react';
import { Axes } from './Plot';
import { COLORS } from '../theme';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from './Macro';
import { stateAt as state0 } from '../videos/ma01-gdp-accounting.state';
import { stateAt as state1 } from '../videos/ma02-economic-circulation-flow.state';
import { stateAt as state2 } from '../videos/ma03-is-lm-model.state';
import { stateAt as state3 } from '../videos/ma04-exchange-rate.state';
import { stateAt as state4 } from '../videos/ma05-balance-of-payments.state';
import { stateAt as state5 } from '../videos/ma06-solow-growth-model.state';
import { stateAt as state6 } from '../videos/ma07-phillips-curve.state';
import { stateAt as state7 } from '../videos/ma08-inflation-expectations.state';
const FIT: Record<string,{dx:number;dy:number;scale:number}> = {"ma01-gdp-accounting": {"dx": 24.5, "dy": 20.0, "scale": 1}, "ma02-economic-circulation-flow": {"dx": 12.5, "dy": 4.5, "scale": 1}, "ma03-is-lm-model": {"dx": 17.41, "dy": 7.29, "scale": 0.8097}, "ma04-exchange-rate": {"dx": 25.21, "dy": 18.91, "scale": 0.8403}, "ma05-balance-of-payments": {"dx": 80.5, "dy": 11.5, "scale": 1}, "ma06-solow-growth-model": {"dx": -51.57, "dy": 7.62, "scale": 0.8969}, "ma07-phillips-curve": {"dx": -15.32, "dy": 25.54, "scale": 0.9287}, "ma08-inflation-expectations": {"dx": -15.32, "dy": 25.54, "scale": 0.9287}};
const F0: React.FC = () => { const s=state0(899); const T={"components": {"C": 600, "I": 200, "G": 250, "NX": -50}, "GDP": 1000}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma01-gdp-accounting'].dx}px,${FIT['ma01-gdp-accounting'].dy}px) scale(${FIT['ma01-gdp-accounting'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1300 1000" width="100%" height="100%"><GdpBars x={100} y={170} w={1000} components={s.visibleComponents}/><text x={100} y={430} fontSize={36} fill={COLORS.textStrong}>{`GDP ${s.total}`}</text><text x={100} y={750} fontSize={64} fill={COLORS.primary}>600 + 200 + 250 − 50 = 1000</text></svg></div>; };
const F1: React.FC = () => { const s=state1(899); const T={"labor_value": 100, "wages": 100, "household_consumption": 80, "taxes": 20, "government_purchases": 20}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma02-economic-circulation-flow'].dx}px,${FIT['ma02-economic-circulation-flow'].dy}px) scale(${FIT['ma02-economic-circulation-flow'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1500 900" width="100%" height="100%"><CircularFlow cx={720} cy={440} r={330} flows={s.visibleFlows}/><text x={100} y={840}>{`Money loop ${s.moneyLoopClosed?'closed':'building'}`}</text></svg></div>; };
const F2: React.FC = () => { const s=state2(899); const T={"rIS": "10 - 0.01Y", "rLM": "2 + 0.005Y", "shiftIS": [0, 1], "equilibria": [[533.333, 4.667], [600, 5]]}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma03-is-lm-model'].dx}px,${FIT['ma03-is-lm-model'].dy}px) scale(${FIT['ma03-is-lm-model'].scale})`,transformOrigin:'320px 310px'}}><Axes width={640} height={620} xDomain={[300,700]} yDomain={[2,8]} children={scale=><IslmModel s={scale} rIS={s.rIS} rLM={s.rLM} shiftIS={s.shiftIS} progress={1}/>}/></div>; };
const F3: React.FC = () => { const s=state3(899); const T={"quote": "domestic units per foreign unit", "Qd": "120 - 20e", "Qs": "20 + 20e", "shiftS": [0, 20], "e_before": 2.5, "e_after": 2}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma04-exchange-rate'].dx}px,${FIT['ma04-exchange-rate'].dy}px) scale(${FIT['ma04-exchange-rate'].scale})`,transformOrigin:'320px 310px'}}><Axes width={640} height={620} xDomain={[40,120]} yDomain={[1,4]} xLabel="foreign currency quantity" yLabel={s.quote} children={scale=><ExchangeRate s={scale} Qd={s.Qd} Qs={s.Qs} shiftS={s.shiftS} progress={1}/>}/></div>; };
const F4: React.FC = () => { const s=state4(899); const T={"import_current_account": -100, "foreign_loan_financial_account": 100, "net": 0}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma05-balance-of-payments'].dx}px,${FIT['ma05-balance-of-payments'].dy}px) scale(${FIT['ma05-balance-of-payments'].scale})`,transformOrigin:'320px 310px'}}><svg viewBox="0 0 1400 1000" width="100%" height="100%"><BalanceOfPayments x={100} y={120} accounts={s.accounts}/><text x={100} y={620} fontSize={36} fill={COLORS.textStrong}>{`Net ${s.net}`}</text><text x={100} y={850} fontSize={64} fill={COLORS.primary}>−100 + 100 = 0</text></svg></div>; };
const F5: React.FC = () => { const s=state5(899); const T={"f": "sqrt(k)", "save_before": 0.2, "save_after": 0.25, "break_even": 0.05, "k_star_before": 16, "k_star_after": 25, "consumption_before": 3.2, "consumption_after": 3.75}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma06-solow-growth-model'].dx}px,${FIT['ma06-solow-growth-model'].dy}px) scale(${FIT['ma06-solow-growth-model'].scale})`,transformOrigin:'320px 310px'}}><Axes width={640} height={620} xDomain={[0.1,36]} yDomain={[0,7]} children={scale=><SolowModel s={scale} f={s.f} save={s.save} breakEven={s.breakEven} compare={{save:0.2,label:'old'}} progress={1}/>}/></div>; };
const F6: React.FC = () => { const s=state6(899); const T={"u_natural": 5, "baseline_inflation": 2, "stimulus_unemployment": 3, "short_run_inflation": 3, "expected_after": 1, "long_run_inflation": 3}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma07-phillips-curve'].dx}px,${FIT['ma07-phillips-curve'].dy}px) scale(${FIT['ma07-phillips-curve'].scale})`,transformOrigin:'320px 310px'}}><Axes width={640} height={620} xDomain={[2,8]} yDomain={[0,5]} children={scale=><><PhillipsCurve s={scale} SRPC={s.SRPC} uNat={s.uNat} expected={s.expected} progress={1}/><circle cx={scale.px(s.u)} cy={scale.py(s.inflation)} r={12} fill="red"/></>}/></div>; };
const F7: React.FC = () => { const s=state7(899); const T={"u_natural": 5, "SRPC": "2 - 0.5(u-5)", "expected_before": 0, "expected_after": 1.5, "inflation_at_u5_before": 2, "inflation_at_u5_after": 3.5}; 



return <div style={{width:640,height:620,transform:`translate(${FIT['ma08-inflation-expectations'].dx}px,${FIT['ma08-inflation-expectations'].dy}px) scale(${FIT['ma08-inflation-expectations'].scale})`,transformOrigin:'320px 310px'}}><Axes width={640} height={620} xDomain={[2,8]} yDomain={[0,6]} children={scale=><PhillipsCurve s={scale} SRPC={s.SRPC} uNat={s.uNat} expected={s.expected} progress={1}/>}/></div>; };
export const COVER_FIGURES: Record<string,React.FC> = {'ma01-gdp-accounting':F0,
'ma02-economic-circulation-flow':F1,
'ma03-is-lm-model':F2,
'ma04-exchange-rate':F3,
'ma05-balance-of-payments':F4,
'ma06-solow-growth-model':F5,
'ma07-phillips-curve':F6,
'ma08-inflation-expectations':F7};