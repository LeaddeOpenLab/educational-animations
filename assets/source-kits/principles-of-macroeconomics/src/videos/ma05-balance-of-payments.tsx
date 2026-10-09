import React from 'react';
import type { SceneDef } from '../Video';
import { Backdrop } from '../components/Backdrop';
import { Axes } from '../components/Plot';
import { Kicker, Heading, Caption, Chip } from '../components/ui';
import { GdpBars, CircularFlow, IslmModel, ExchangeRate, BalanceOfPayments, SolowModel, PhillipsCurve } from '../components/Macro';
import { stateAt } from './ma05-balance-of-payments.state';

const T = { ...{"import_current_account": -100, "foreign_loan_financial_account": 100, "net": 0}, stateAt };
const DESIGN_AUDIT = {
  visualArgument: "Amounts are equal and opposite; both entries refer to the same transaction rather than unrelated data.",
  motion: "Net temporarily shows the debit, then returns to zero when the matching credit enters.",
  example: "A resident imports machinery and pays using a foreign loan.",
  antiTemplate: "This topic uses BalanceOfPayments to show Record the machinery import as a current-account debit, then the loan financing as financial-account credit.; the adjacent lesson uses another state transition.",
  sceneRationale: "The 5 scenes separate Both account ledgers are empty and net balance is zero. from Record the machinery import as a current-account debit, then the loan financing as financial-account credit. and end with Amounts are equal and opposite; both entries refer to the same transaction rather than unrelated data.",
};
void DESIGN_AUDIT;


const BEATS = ["Import transaction", "Enter current-account debit", "Identify financing source", "Enter financial-account credit", "Reconcile the two-account balance"];
const COPY = ["Show that a cross-border transaction has offsetting balance-of-payments entries.", "An import is a current-account debit", "Borrowing is a financial-account credit", "The pair balances", "Amounts are equal and opposite; both entries refer to the same transaction rather than unrelated data."];
const TOPIC = "Balance of payments";
const Story: React.FC<{frame:number;offset:number;beat:number}> = ({frame,offset,beat}) => {
  const globalFrame=offset+frame;
  const s=T.stateAt(globalFrame);
  return <div data-root style={{position:'absolute',inset:0,overflow:'hidden'}}>
    <Backdrop width={1920} height={1080}/>
    <Kicker text={`${String(beat+1).padStart(2,'0')} · ${TOPIC}`} frame={frame}/>
    <Heading text={BEATS[beat]} frame={frame} size={50} width={1600}/>
    <Caption text={COPY[beat]} frame={frame} start={18} top={285} width={570} size={30}/>
    <div data-k="figure" data-n={TOPIC} style={{position:'absolute',left:760,top:265,width:1050,height:640}}><svg viewBox="0 0 1400 700" width="100%" height="100%"><BalanceOfPayments x={100} y={120} accounts={s.accounts}/><text x={100} y={620}>{`Net ${s.net}`}</text></svg></div>
    <div style={{position:'absolute',left:108,top:940}}><Chip text={beat===BEATS.length-1?'Key result':`Step ${beat+1} / ${BEATS.length}`} opacity={frame<25?0:1}/></div>
  </div>;
};

const Scene1: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={0} beat={0}/>;
const Scene2: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={150} beat={1}/>;
const Scene3: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={330} beat={2}/>;
const Scene4: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={510} beat={3}/>;
const Scene5: React.FC<{frame:number}> = ({frame}) => <Story frame={frame} offset={720} beat={4}/>;

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: Scene1, dur: 150 },
  { id: 'setup', Comp: Scene2, dur: 180 },
  { id: 'mechanism', Comp: Scene3, dur: 180 },
  { id: 'test', Comp: Scene4, dur: 210 },
  { id: 'result', Comp: Scene5, dur: 180 },
];
