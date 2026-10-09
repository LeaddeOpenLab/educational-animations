import type React from 'react';
import type { SceneDef } from '../Video';
import { SCENES as ma01_gdp_accounting } from './ma01-gdp-accounting';
import { SCENES as ma02_economic_circulation_flow } from './ma02-economic-circulation-flow';
import { SCENES as ma03_is_lm_model } from './ma03-is-lm-model';
import { SCENES as ma04_exchange_rate } from './ma04-exchange-rate';
import { SCENES as ma05_balance_of_payments } from './ma05-balance-of-payments';
import { SCENES as ma06_solow_growth_model } from './ma06-solow-growth-model';
import { SCENES as ma07_phillips_curve } from './ma07-phillips-curve';
import { SCENES as ma08_inflation_expectations } from './ma08-inflation-expectations';

export type VideoEntry = {
  /** Remotion composition id, also the L3 file stem */
  id: string;
  /** The knowledge point exactly as listed in 知识点表.csv */
  title: string;
  /** Delivered filename stem */
  file: string;
  scenes: SceneDef[];
  /** frames worth sampling for the contact sheet (6 fill a 3x2 grid) */
  keyFrames: number[];
};

export const VIDEOS: VideoEntry[] = [
  { id: 'ma01-gdp-accounting', title: 'GDP accounting', file: '01_GDP_accounting', scenes: ma01_gdp_accounting, keyFrames: [75, 255, 427, 495, 562, 765] },
  { id: 'ma02-economic-circulation-flow', title: 'Economic circulation flow', file: '02_Economic_circulation_flow', scenes: ma02_economic_circulation_flow, keyFrames: [60, 210, 375, 525, 675, 825] },
  { id: 'ma03-is-lm-model', title: 'IS–LM model', file: '03_IS_LM_model', scenes: ma03_is_lm_model, keyFrames: [75, 210, 360, 525, 675, 825] },
  { id: 'ma04-exchange-rate', title: 'Exchange rate', file: '04_Exchange_rate', scenes: ma04_exchange_rate, keyFrames: [75, 270, 450, 510, 570, 765] },
  { id: 'ma05-balance-of-payments', title: 'Balance of payments', file: '05_Balance_of_payments', scenes: ma05_balance_of_payments, keyFrames: [75, 240, 420, 465, 615, 810] },
  { id: 'ma06-solow-growth-model', title: 'Solow growth model', file: '06_Solow_growth_model', scenes: ma06_solow_growth_model, keyFrames: [75, 225, 360, 510, 675, 825] },
  { id: 'ma07-phillips-curve', title: 'Phillips Curve', file: '07_Phillips_Curve', scenes: ma07_phillips_curve, keyFrames: [75, 285, 480, 540, 600, 780] },
  { id: 'ma08-inflation-expectations', title: 'Inflation expectations', file: '08_Inflation_expectations', scenes: ma08_inflation_expectations, keyFrames: [90, 285, 457, 525, 592, 780] },
];

export type { SceneDef };
export type VideoComponent = React.FC;
