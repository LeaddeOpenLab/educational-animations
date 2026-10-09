import React from 'react';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from './components/Macro';
import { Axes } from './components/Plot';
import { stateAt as gdp } from './videos/ma01-gdp-accounting.state';
import { stateAt as flow } from './videos/ma02-economic-circulation-flow.state';
import { stateAt as islm } from './videos/ma03-is-lm-model.state';
import { stateAt as fx } from './videos/ma04-exchange-rate.state';
import { stateAt as bop } from './videos/ma05-balance-of-payments.state';
import { stateAt as solow } from './videos/ma06-solow-growth-model.state';
import { stateAt as phillips } from './videos/ma07-phillips-curve.state';
import { stateAt as expectations } from './videos/ma08-inflation-expectations.state';

export const GdpProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=gdp(frame);
  return <svg width={1300} height={500}><GdpBars x={100} y={170} w={1000} components={s.visibleComponents}/><text x={100} y={430}>{`GDP ${s.total}`}</text></svg>;
};
export const FlowProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=flow(frame);
  return <svg width={1500} height={900}><CircularFlow cx={720} cy={440} r={270} flows={s.visibleFlows}/><text x={100} y={840}>{`Money loop ${s.moneyLoopClosed?'closed':'building'}`}</text></svg>;
};
export const IslmProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=islm(frame);
  return <Axes width={1000} height={650} xDomain={[300,700]} yDomain={[2,8]} children={scale=><IslmModel s={scale} rIS={s.rIS} rLM={s.rLM} shiftIS={s.shiftIS} progress={1}/>}/>;
};
export const ExchangeProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=fx(frame);
  return <Axes width={1000} height={650} xDomain={[40,120]} yDomain={[1,4]} xLabel="foreign currency quantity" yLabel={s.quote} children={scale=><ExchangeRate s={scale} Qd={s.Qd} Qs={s.Qs} shiftS={s.shiftS} progress={1}/>}/>;
};
export const BalanceProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=bop(frame);
  return <svg width={1400} height={700}><BalanceOfPayments x={100} y={120} accounts={s.accounts}/><text x={100} y={620}>{`Net ${s.net}`}</text></svg>;
};
export const SolowProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=solow(frame);
  return <Axes width={1000} height={650} xDomain={[0.1,36]} yDomain={[0,7]} children={scale=><SolowModel s={scale} f={s.f} save={s.save} breakEven={s.breakEven} compare={{save:0.2,label:'old'}} progress={1}/>}/>;
};
export const PhillipsProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=phillips(frame);
  return <Axes width={1000} height={650} xDomain={[2,8]} yDomain={[0,5]} children={scale=><><PhillipsCurve s={scale} SRPC={s.SRPC} uNat={s.uNat} expected={s.expected} progress={1}/><circle cx={scale.px(s.u)} cy={scale.py(s.inflation)} r={12} fill="red"/></>}/>;
};
export const ExpectationsProbe: React.FC<{frame:number}> = ({frame}) => {
  const s=expectations(frame);
  return <Axes width={1000} height={650} xDomain={[2,8]} yDomain={[0,6]} children={scale=><PhillipsCurve s={scale} SRPC={s.SRPC} uNat={s.uNat} expected={s.expected} progress={1}/>}/>;
};
