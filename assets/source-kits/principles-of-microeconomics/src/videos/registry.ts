import type {SceneDef} from '../Video';
import {SCENES as s0} from './mi01-supply-and-demand-balance';
import {SCENES as s1} from './mi02-relatively-static';
import {SCENES as s2} from './mi03-elasticity-of-demand';
import {SCENES as s3} from './mi04-tax-burden-incidence';
import {SCENES as s4} from './mi05-deadweight-loss';
import {SCENES as s5} from './mi06-maximize-consumer-utility';
import {SCENES as s6} from './mi07-cost-curve';
import {SCENES as s7} from './mi08-manufacturers-output-decisions';
import {SCENES as s8} from './mi09-perfect-competition';
import {SCENES as s9} from './mi10-monopoly-pricing';
import {SCENES as s10} from './mi11-market-welfare';
export type VideoEntry={id:string;title:string;file:string;scenes:SceneDef[];keyFrames:number[]};
export const VIDEOS:VideoEntry[]=[
{id:"mi01-supply-and-demand-balance",title:"Supply and demand balance",file:"01_Market_Equilibrium",scenes:s0,keyFrames:[90, 285, 435, 540, 720, 855]},
{id:"mi02-relatively-static",title:"Relatively static",file:"02_Comparative_Statics",scenes:s1,keyFrames:[90, 270, 420, 600, 735, 855]},
{id:"mi03-elasticity-of-demand",title:"Elasticity of demand",file:"03_Price_Elasticity_of_Demand",scenes:s2,keyFrames:[90, 270, 400, 540, 690, 840]},
{id:"mi04-tax-burden-incidence",title:"Tax burden incidence",file:"04_Tax_Incidence",scenes:s3,keyFrames:[90, 270, 400, 600, 720, 850]},
{id:"mi05-deadweight-loss",title:"Deadweight loss",file:"05_Deadweight_Loss",scenes:s4,keyFrames:[90, 270, 420, 675, 735, 850]},
{id:"mi06-maximize-consumer-utility",title:"Maximize consumer utility",file:"06_Utility_Maximization",scenes:s5,keyFrames:[90, 270, 450, 540, 735, 860]},
{id:"mi07-cost-curve",title:"Cost curve",file:"07_Cost_Curves",scenes:s6,keyFrames:[90, 270, 420, 522, 720, 855]},
{id:"mi08-manufacturers-output-decisions",title:"Manufacturer's output decisions",file:"08_Profit_Maximization",scenes:s7,keyFrames:[90, 270, 430, 510, 610, 850]},
{id:"mi09-perfect-competition",title:"Perfect competition",file:"09_Perfect_Competition",scenes:s8,keyFrames:[90, 270, 420, 630, 735, 850]},
{id:"mi10-monopoly-pricing",title:"Monopoly pricing",file:"10_Monopoly_Pricing",scenes:s9,keyFrames:[90, 270, 420, 540, 650, 850]},
{id:"mi11-market-welfare",title:"Market welfare",file:"11_Market_Welfare",scenes:s10,keyFrames:[90, 270, 430, 540, 690, 850]},
];
