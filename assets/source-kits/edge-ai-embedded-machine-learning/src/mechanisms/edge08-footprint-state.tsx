import React from 'react';
import {COLORS,FONT} from '../theme';
export const footprintState=(frame:number)=>{
 const weightKiB=frame>=300?64:256;
 const flash=[{name:'Weights',size:weightKiB},{name:'Other',size:32}];
 const ram=[{name:'Input',size:16},{name:'Activations',size:80},{name:'Scratch',size:24},{name:'Persistent',size:8}];
 return {weightKiB,bytesPerWeight:frame>=300?1:4,flash,ram,flashTotal:flash.reduce((n,x)=>n+x.size,0),ramTotal:ram.reduce((n,x)=>n+x.size,0)};
};
export const FootprintCore:React.FC<{frame:number}>=({frame})=>{
 const v=footprintState(frame);
 return <svg viewBox="0 0 900 500" style={{fontFamily:FONT}}>{[{name:'FLASH',parts:v.flash,total:v.flashTotal,y:110},{name:'RAM',parts:v.ram,total:v.ramTotal,y:330}].map(bank=><g key={bank.name}><text x={25} y={bank.y-35} fill={COLORS.textStrong} fontSize={28}>{bank.name} · {bank.total} KiB</text>{bank.parts.map((p,i)=>{const offset=bank.parts.slice(0,i).reduce((n,x)=>n+x.size,0);return <g key={p.name}><rect x={25+offset*2.6} y={bank.y} width={p.size*2.6} height={58} fill={[COLORS.primary,COLORS.alt,COLORS.accent,COLORS.result][i]} stroke={COLORS.bg0} strokeWidth={2}/><text x={25+i*200} y={bank.y+108} fill={COLORS.textMuted} fontSize={21}>{p.name}: {p.size}</text></g>;})}</g>)}</svg>;
};
