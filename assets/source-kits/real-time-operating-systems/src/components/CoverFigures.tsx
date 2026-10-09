import React from 'react';
import {COLORS,FONT} from '../theme';
import {SemaphoreBoard} from './Semaphore';
const FIT: Record<string,{dx:number;dy:number;scale:number}> = {"rt05-counting-semaphore": {"dx": 112.0, "dy": 79.0, "scale": 0.72}};
import {stateAt as state0} from '../videos/rt05-counting-semaphore.state';
const Figure0:React.FC = ()=>{const f=615;const st=state0(f);const fit=FIT['rt05-counting-semaphore'];return <div style={{width:640,height:620}}><div style={{width:950,height:620,transform:`translate(${fit.dx}px,${fit.dy}px) scale(${fit.scale})`,transformOrigin:'0 0'}}><SemaphoreBoard {...st}/></div></div>;};
export const COVER_FIGURES:Record<string,React.FC> = {'rt05-counting-semaphore':Figure0};