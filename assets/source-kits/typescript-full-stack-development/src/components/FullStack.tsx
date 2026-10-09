import React from 'react';
import { COLORS, FONT, alpha } from '../theme';

const bounded = (n: number) => Math.max(0, Math.min(1, n));

/** A typed boundary in a request, state, module, or data pipeline. */
export const TypedNode: React.FC<{
  x: number; y: number; w?: number; h?: number; label: string; type?: string;
  state?: 'idle' | 'active' | 'valid' | 'error'; progress?: number;
}> = ({ x, y, w = 240, h = 118, label, type, state = 'idle', progress = 1 }) => {
  const color = state === 'error' ? COLORS.warn : state === 'valid' ? COLORS.result : state === 'active' ? COLORS.accent : COLORS.primary;
  return <g opacity={bounded(progress)}>
    <rect x={x} y={y} width={w} height={h} rx={22} fill={alpha(COLORS.bg2, .96)} stroke={color} strokeWidth={state === 'active' ? 5 : 3}/>
    <text x={x+w/2} y={y+(type ? 48 : h/2+8)} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={Math.min(28, 440/Math.max(8,label.length))} fontWeight={700}>{label}</text>
    {type && <text x={x+w/2} y={y+h-22} textAnchor="middle" fill={color} fontFamily={FONT} fontSize={21}>{type}</text>}
  </g>;
};

/** Moves the actual value between two typed boundaries. */
export const TypedWire: React.FC<{
  x1: number; y1: number; x2: number; y2: number; label?: string;
  state?: 'active' | 'valid' | 'error'; progress?: number;
}> = ({ x1, y1, x2, y2, label, state = 'active', progress = 1 }) => {
  const p = bounded(progress), ex = x1+(x2-x1)*p, ey = y1+(y2-y1)*p;
  const color = state === 'error' ? COLORS.warn : state === 'valid' ? COLORS.result : COLORS.accent;
  const dx=x2-x1,dy=y2-y1,len=Math.max(1,Math.hypot(dx,dy));
  const tx=ex-dx/len*18,ty=ey-dy/len*18;
  return <g>
    <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={5}/>
    {p>.9 && <path d={`M ${ex} ${ey} L ${tx-dy/len*12} ${ty+dx/len*12} L ${tx+dy/len*12} ${ty-dx/len*12} Z`} fill={color}/>}
    {label && p>.45 && <text x={(x1+ex)/2} y={(y1+ey)/2-18} textAnchor="middle" fill={COLORS.textMuted} fontFamily={FONT} fontSize={21}>{label}</text>}
  </g>;
};

/** The same payload changes stage and shape as it crosses an app boundary. */
export const Payload: React.FC<{
  x: number; y: number; w?: number; lines: string[]; title?: string;
  state?: 'active' | 'valid' | 'error'; progress?: number;
}> = ({x,y,w=280,lines,title,state='active',progress=1}) => {
  const color=state==='error'?COLORS.warn:state==='valid'?COLORS.result:COLORS.primary;
  return <g opacity={bounded(progress)}>
    <rect x={x} y={y} width={w} height={Math.max(74,42+lines.length*37+(title?28:0))} rx={16} fill={alpha(color,.12)} stroke={color} strokeWidth={2}/>
    {title && <text x={x+20} y={y+29} fill={color} fontFamily={FONT} fontSize={22} fontWeight={700}>{title}</text>}
    {lines.map((line,i)=><text key={i} x={x+20} y={y+(title?68:39)+i*37} fill={COLORS.textStrong} fontFamily="monospace" fontSize={23}>{line}</text>)}
  </g>;
};

/** Explicit pass/fail check for runtime data, auth, schema, or module contracts. */
export const BoundaryGate: React.FC<{
  x: number; y: number; label: string; verdict?: 'pending' | 'pass' | 'fail'; progress?: number;
}> = ({x,y,label,verdict='pending',progress=1}) => {
  const color=verdict==='pass'?COLORS.result:verdict==='fail'?COLORS.warn:COLORS.accent;
  return <g opacity={bounded(progress)}>
    <path d={`M ${x+90} ${y} L ${x+180} ${y+78} L ${x+90} ${y+156} L ${x} ${y+78} Z`} fill={alpha(color,.14)} stroke={color} strokeWidth={4}/>
    <text x={x+90} y={y+70} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={19} fontWeight={700}>{label}</text>
    <text x={x+90} y={y+103} textAnchor="middle" fill={color} fontFamily={FONT} fontSize={24} fontWeight={800}>{verdict==='pass'?'PASS':verdict==='fail'?'REJECT':'CHECK'}</text>
  </g>;
};

/** A code or inferred-type pane with one live, highlighted line. */
export const CodePanel: React.FC<{
  x: number; y: number; w?: number; lines: string[]; active?: number; progress?: number;
}> = ({x,y,w=640,lines,active=-1,progress=1}) => <g opacity={bounded(progress)}>
  <rect x={x} y={y} width={w} height={42+lines.length*45} rx={18} fill={alpha(COLORS.bg0,.9)} stroke={COLORS.primary} strokeWidth={2}/>
  {lines.map((line,i)=><g key={i}>
    {i===active && <rect x={x+10} y={y+14+i*45} width={w-20} height={42} rx={8} fill={alpha(COLORS.accent,.18)}/>}
    <text x={x+20} y={y+45+i*45} fill={i===active?COLORS.accent:COLORS.textStrong} fontFamily="monospace" fontSize={23}>{line}</text>
  </g>)}
</g>;
