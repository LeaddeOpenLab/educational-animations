import type {SceneDef} from '../Video';
export type VideoEntry={id:string;title:string;file:string;scenes:SceneDef[];keyFrames:number[]};
import {SCENES as V0} from './fm01-risk-return-relationship';
import {SCENES as V1} from './fm02-portfolio-diversification';
import {SCENES as V2} from './fm03-present-value';
import {SCENES as V3} from './fm04-yield-curve';
import {SCENES as V4} from './fm05-bond-price';
import {SCENES as V5} from './fm06-efficient-market-hypothesis';
import {SCENES as V6} from './fm07-behavioral-bias';
import {SCENES as V7} from './fm08-option-expiration-gain';
import {SCENES as V8} from './fm09-options-exposure';
import {SCENES as V9} from './fm10-financial-leverage';
import {SCENES as V10} from './fm11-market-liquidity';
import {SCENES as V11} from './fm12-financial-crisis-contagion';
export const VIDEOS:VideoEntry[] = [
{id:"fm01-risk-return-relationship",title:"Risk-Return Relationship",file:"01_Risk_Return_Relationship",scenes:V0,keyFrames:[75, 100, 330, 580, 800, 815]},
{id:"fm02-portfolio-diversification",title:"Portfolio Diversification",file:"02_Portfolio_Diversification",scenes:V1,keyFrames:[75, 100, 350, 610, 830, 845]},
{id:"fm03-present-value",title:"Present Value",file:"03_Present_Value",scenes:V2,keyFrames:[75, 120, 340, 580, 800, 815]},
{id:"fm04-yield-curve",title:"Yield Curve",file:"04_Yield_Curve",scenes:V3,keyFrames:[75, 100, 330, 560, 810, 845]},
{id:"fm05-bond-price",title:"Bond Price",file:"05_Bond_Price",scenes:V4,keyFrames:[75, 120, 360, 590, 820, 845]},
{id:"fm06-efficient-market-hypothesis",title:"Efficient Market Hypothesis",file:"06_Efficient_Market_Hypothesis",scenes:V5,keyFrames:[75, 140, 350, 580, 800, 815]},
{id:"fm07-behavioral-bias",title:"Behavioral Bias",file:"07_Behavioral_Bias",scenes:V6,keyFrames:[75, 100, 290, 540, 790, 815]},
{id:"fm08-option-expiration-gain",title:"Option Payoff at Expiration",file:"08_Option_Expiration_Gain",scenes:V7,keyFrames:[75, 290, 480, 660, 840, 845]},
{id:"fm09-options-exposure",title:"Options Exposure",file:"09_Options_Exposure",scenes:V8,keyFrames:[75, 120, 360, 610, 830, 845]},
{id:"fm10-financial-leverage",title:"Financial Leverage",file:"10_Financial_Leverage",scenes:V9,keyFrames:[75, 120, 360, 610, 830, 845]},
{id:"fm11-market-liquidity",title:"Market Liquidity",file:"11_Market_Liquidity",scenes:V10,keyFrames:[75, 120, 340, 580, 800, 815]},
{id:"fm12-financial-crisis-contagion",title:"Financial Crisis Contagion",file:"12_Financial_Crisis_Contagion",scenes:V11,keyFrames:[75, 270, 470, 680, 870, 875]},
];