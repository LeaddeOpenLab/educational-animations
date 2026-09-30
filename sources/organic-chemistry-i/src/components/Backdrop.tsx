import React from 'react';
import { COLORS,alpha } from '../theme';
export const Backdrop: React.FC<{width:number;height:number;tint?:string}>=({width,height})=><div data-k="bg" style={{position:'absolute',inset:0,width,height,background:`linear-gradient(120deg,${COLORS.bg2},${COLORS.bg1} 48%,${COLORS.bg0})`}}><div style={{position:'absolute',left:'42%',top:90,bottom:140,width:1,background:alpha(COLORS.primary,.13)}}/></div>;
