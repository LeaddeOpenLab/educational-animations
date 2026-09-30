import React from 'react';
import { COLORS, FONT, alpha } from '../theme';

/**
 * L1c — charting base. **Shared across courses, never rewritten per course.**
 *
 * Registered in kit.json under `shared`, not `primitives`: this file is copied
 * verbatim from edu-video-kit/template/ and stays byte-identical across kits,
 * so a new course starts with a working coordinate system instead of inheriting
 * one by forking another course's project.
 *
 * It carries an SVG coordinate system with math -> px mapping, plus the marks
 * nearly every quantitative figure needs: continuous curves with draw-on,
 * shaded bands, guides, dots and tags. Every child receives the `Scale` through
 * a render prop, so scenes place things in math coordinates and never
 * hand-compute pixel offsets.
 *
 * Signal-flavoured exports — safe to delete for a subject with no discrete or
 * sampled signals: `Stems`, `Impulse`, `rectPts`, `shifted`.
 */

export type Scale = {
  width: number;
  height: number;
  xDomain: [number, number];
  yDomain: [number, number];
  /** math x -> svg px (measured from the left edge) */
  px: (x: number) => number;
  /** math y -> svg px (measured from the top edge) */
  py: (y: number) => number;
  /** px per math unit */
  ux: number;
  uy: number;
  pad: { l: number; r: number; t: number; b: number };
  /** svg px of the y = 0 line (clamped to the plot box) */
  zeroY: number;
  /** svg px of the x = 0 line (clamped to the plot box) */
  zeroX: number;
};

export const Axes: React.FC<{
  width: number;
  height: number;
  xDomain: [number, number];
  yDomain: [number, number];
  pad?: Partial<{ l: number; r: number; t: number; b: number }>;
  xLabel?: string;
  yLabel?: string;
  xTicks?: number[];
  yTicks?: number[];
  tickFormat?: (v: number) => string;
  children?: (s: Scale) => React.ReactNode;
  opacity?: number;
  showArrows?: boolean;
  style?: React.CSSProperties;
  svgId?: string;
}> = ({
  width,
  height,
  xDomain,
  yDomain,
  pad = {},
  xLabel,
  yLabel,
  xTicks = [],
  yTicks = [],
  tickFormat = (v) => String(v),
  children,
  opacity = 1,
  showArrows = true,
  style,
  svgId,
}) => {
  const p = { l: 46, r: 22, t: 20, b: 42, ...pad };
  const innerW = width - p.l - p.r;
  const innerH = height - p.t - p.b;
  const ux = innerW / (xDomain[1] - xDomain[0]);
  const uy = innerH / (yDomain[1] - yDomain[0]);

  const px = (x: number) => p.l + (x - xDomain[0]) * ux;
  const py = (y: number) => p.t + (yDomain[1] - y) * uy;

  const s: Scale = {
    width,
    height,
    xDomain,
    yDomain,
    px,
    py,
    ux,
    uy,
    pad: p,
    zeroY: Math.min(Math.max(py(0), p.t), p.t + innerH),
    zeroX: Math.min(Math.max(px(0), p.l), p.l + innerW),
  };

  const baseline = Math.abs(yDomain[0]) < 1e-9 ? s.zeroY : s.zeroY;

  return (
    <svg
      id={svgId}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity, overflow: 'visible', ...style }}
    >
      {/* frame */}
      <rect
        x={p.l}
        y={p.t}
        width={innerW}
        height={innerH}
        fill="none"
        stroke={COLORS.grid}
        strokeWidth={1}
      />
      {/* ticks + labels */}
      <g fontFamily={FONT} fontSize={20} fill={COLORS.textMuted}>
        {xTicks.map((t) => (
          <g key={`xt${t}`}>
            <line
              x1={px(t)}
              y1={baseline}
              x2={px(t)}
              y2={baseline + 6}
              stroke={COLORS.axis}
              strokeWidth={1.4}
            />
            <text x={px(t)} y={p.t + innerH + 28} textAnchor="middle">
              {tickFormat(t)}
            </text>
          </g>
        ))}
        {yTicks.map((t) => (
          <g key={`yt${t}`}>
            <line
              x1={p.l - 6}
              y1={py(t)}
              x2={p.l}
              y2={py(t)}
              stroke={COLORS.axis}
              strokeWidth={1.4}
            />
            <text x={p.l - 12} y={py(t) + 7} textAnchor="end">
              {tickFormat(t)}
            </text>
          </g>
        ))}
      </g>

      {/* axes */}
      <g stroke={COLORS.axis} strokeWidth={1.8}>
        <line x1={p.l} y1={baseline} x2={p.l + innerW} y2={baseline} />
        {yDomain[0] < 0 && yDomain[1] > 0 ? (
          <line x1={s.zeroX} y1={p.t} x2={s.zeroX} y2={p.t + innerH} />
        ) : null}
      </g>
      {showArrows ? (
        <>
          <polygon
            points={`${p.l + innerW + 10},${baseline} ${p.l + innerW},${baseline - 6} ${p.l + innerW},${baseline + 6}`}
            fill={COLORS.axis}
          />
          {yDomain[0] < 0 && yDomain[1] > 0 ? (
            <polygon
              points={`${s.zeroX},${p.t - 10} ${s.zeroX - 6},${p.t} ${s.zeroX + 6},${p.t}`}
              fill={COLORS.axis}
            />
          ) : null}
        </>
      ) : null}

      {/* axis names: x at top-right, y at top-left — both outside the tick rows */}
      <g fontFamily={FONT} fontSize={23} fill={COLORS.textMuted} fontStyle="italic">
        {xLabel ? (
          <text x={p.l + innerW - 2} y={p.t - 12} textAnchor="end">
            {xLabel}
          </text>
        ) : null}
        {yLabel ? (
          <text x={p.l + 12} y={p.t + 26}>
            {yLabel}
          </text>
        ) : null}
      </g>

      {children ? children(s) : null}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Sample a function into a point list inside [a, b]. */
export const sampleFn = (
  f: (x: number) => number,
  a: number,
  b: number,
  n = 240
): [number, number][] => {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    const y = f(x);
    out.push([x, Number.isFinite(y) ? y : 0]);
  }
  return out;
};

/** Deterministic pseudo-random source (LCG). Use it instead of `Math.random()` so a
 *  point cloud is identical on every render — otherwise the figure reshuffles between
 *  the contact sheet and the final mp4, and any label quoting a value drifts.
 *
 *    const rnd = mk(11);
 *    const pts = Array.from({ length: 12 }, () => ({ x: -2 + rnd() * 4, y: rnd() }));
 */
export const mk = (seed: number): (() => number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

/** Point list for a rectangle pulse: value `hi` on [a, b], `lo` elsewhere. */
export const rectPts = (
  a: number,
  b: number,
  dom: [number, number],
  hi = 1,
  lo = 0
): [number, number][] => [
  [dom[0], lo],
  [a, lo],
  [a, hi],
  [b, hi],
  [b, lo],
  [dom[1], lo],
];

/** Sample a sum of weighted, delayed, scaled copies of a base shape. */
export const shifted = (
  base: (x: number) => number,
  shift = 0,
  gain = 1
): ((x: number) => number) => (x) => gain * base(x - shift);

/* ------------------------------------------------------------------ */
/* marks                                                               */
/* ------------------------------------------------------------------ */

export const Curve: React.FC<{
  s: Scale;
  pts: [number, number][];
  color?: string;
  width?: number;
  dash?: string;
  /** 0..1 draw-on reveal */
  progress?: number;
  opacity?: number;
  linecap?: 'round' | 'butt' | 'square';
  glow?: boolean;
}> = ({
  s,
  pts,
  color = COLORS.primary,
  width = 4,
  dash,
  progress = 1,
  opacity = 1,
  linecap = 'round',
  glow = false,
}) => {
  const d = pts
    .map((pt, i) => `${i === 0 ? 'M' : 'L'}${s.px(pt[0]).toFixed(2)},${s.py(pt[1]).toFixed(2)}`)
    .join(' ');
  const p = Math.max(0, Math.min(1, progress));
  return (
    <g opacity={opacity}>
      {glow ? (
        <path
          d={d}
          fill="none"
          stroke={alpha(color, 0.22)}
          strokeWidth={width + 8}
          strokeLinecap={linecap}
          strokeLinejoin="round"
          pathLength={1000}
          strokeDasharray={1000}
          strokeDashoffset={1000 * (1 - p)}
        />
      ) : null}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap={linecap}
        strokeLinejoin="round"
        strokeDasharray={dash ? dash : 1000}
        strokeDashoffset={dash ? 0 : 1000 * (1 - p)}
        pathLength={dash ? undefined : 1000}
        opacity={dash ? p : 1}
      />
    </g>
  );
};

/** Discrete sequence drawn as stems. `xs` are the integer sample locations. */
export const Stems: React.FC<{
  s: Scale;
  xs: number[];
  fn: (x: number) => number;
  color?: string;
  width?: number;
  r?: number;
  progress?: number;
  opacity?: number;
  /** reveal window in index units, offset by progress */
  baseline?: number;
}> = ({
  s,
  xs,
  fn,
  color = COLORS.primary,
  width = 3,
  r = 7,
  progress = 1,
  opacity = 1,
  baseline = 0,
}) => (
  <g opacity={opacity}>
    {xs.map((x, i) => {
      const a = i / Math.max(1, xs.length);
      const reveal = Math.max(0, Math.min(1, (progress - a) * xs.length));
      if (reveal <= 0) return null;
      const y = fn(x);
      const xpx = s.px(x);
      const ypx = s.py(baseline + (y - baseline) * reveal);
      return (
        <g key={`st${x}`}>
          <line
            x1={xpx}
            y1={s.py(baseline)}
            x2={xpx}
            y2={ypx}
            stroke={color}
            strokeWidth={width}
            strokeLinecap="round"
          />
          <circle cx={xpx} cy={ypx} r={r} fill={color} />
        </g>
      );
    })}
  </g>
);

/** Unit impulse: a vertical arrow up to `amp` with a solid head. */
export const Impulse: React.FC<{
  s: Scale;
  x: number;
  amp?: number;
  base?: number;
  color?: string;
  width?: number;
  progress?: number;
  opacity?: number;
  label?: string;
}> = ({ s, x, amp = 1, base = 0, color = COLORS.accent, width = 4, progress = 1, opacity = 1, label }) => {
  const p = Math.max(0, Math.min(1, progress));
  const tip = base + (amp - base) * p;
  const xpx = s.px(x);
  return (
    <g opacity={opacity}>
      <line
        x1={xpx}
        y1={s.py(base)}
        x2={xpx}
        y2={s.py(tip)}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
      />
      {p > 0.65 ? (
        <polygon
          points={`${xpx},${s.py(tip) - 13} ${xpx - 10},${s.py(tip) + 4} ${xpx + 10},${s.py(tip) + 4}`}
          fill={color}
        />
      ) : null}
      {label ? (
        <text
          x={xpx + 10}
          y={s.py(tip) - 14}
          fill={color}
          fontFamily={FONT}
          fontSize={22}
          fontWeight={600}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};

/** Shaded vertical band over [x0, x1]. */
export const Band: React.FC<{
  s: Scale;
  x0: number;
  x1: number;
  color?: string;
  opacity?: number;
  progress?: number;
  from?: 'left' | 'center';
  label?: string;
  labelColor?: string;
}> = ({
  s,
  x0,
  x1,
  color = COLORS.accent,
  opacity = 0.14,
  progress = 1,
  from = 'left',
  label,
  labelColor,
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const mid = (x0 + x1) / 2;
  const half = (x1 - x0) / 2;
  const left = from === 'left' ? x0 : mid - half * p;
  const right = from === 'left' ? x0 + (x1 - x0) * p : mid + half * p;
  const wpx = Math.max(0, s.px(right) - s.px(left));
  const top = s.pad.t;
  const h = s.height - s.pad.t - s.pad.b;
  return (
    <g opacity={p}>
      <rect x={s.px(left)} y={top} width={wpx} height={h} fill={alpha(color, opacity)} />
      {label ? (
        <text
          x={s.px(left) + 10}
          y={top + 26}
          fill={labelColor ?? color}
          fontFamily={FONT}
          fontSize={21}
          fontWeight={600}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};

export const VLine: React.FC<{
  s: Scale;
  x: number;
  color?: string;
  dash?: string;
  width?: number;
  opacity?: number;
  progress?: number;
  label?: string;
}> = ({ s, x, color = COLORS.textDim, dash = '8 8', width = 2, opacity = 1, progress = 1, label }) => {
  const p = Math.max(0, Math.min(1, progress));
  const y0 = s.py(0);
  const top = s.pad.t;
  const bottom = s.height - s.pad.b;
  return (
    <g opacity={opacity * p}>
      <line
        x1={s.px(x)}
        y1={top}
        x2={s.px(x)}
        y2={y0}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dash}
      />
      <line
        x1={s.px(x)}
        y1={y0}
        x2={s.px(x)}
        y2={bottom}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dash}
      />
      {label ? (
        <text
          x={s.px(x) + 9}
          y={top + 22}
          fill={color}
          fontFamily={FONT}
          fontSize={21}
          fontWeight={600}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};

export const HLine: React.FC<{
  s: Scale;
  y: number;
  color?: string;
  dash?: string;
  width?: number;
  opacity?: number;
  label?: string;
  labelAt?: number;
}> = ({ s, y, color = COLORS.textDim, dash = '8 8', width = 2, opacity = 1, label, labelAt = 0 }) => (
  <g opacity={opacity}>
    <line
      x1={s.pad.l}
      y1={s.py(y)}
      x2={s.width - s.pad.r}
      y2={s.py(y)}
      stroke={color}
      strokeWidth={width}
      strokeDasharray={dash}
    />
    {label ? (
      <text
        x={labelAt ? s.px(labelAt) : s.width - s.pad.r}
        y={s.py(y) - 10}
        textAnchor={labelAt ? 'start' : 'end'}
        fill={color}
        fontFamily={FONT}
        fontSize={21}
        fontWeight={600}
      >
        {label}
      </text>
    ) : null}
  </g>
);

export const Dot: React.FC<{
  s: Scale;
  x: number;
  y: number;
  r?: number;
  color?: string;
  opacity?: number;
  hollow?: boolean;
}> = ({ s, x, y, r = 8, color = COLORS.accent, opacity = 1, hollow = false }) => (
  <circle
    cx={s.px(x)}
    cy={s.py(y)}
    r={r}
    fill={hollow ? COLORS.bg0 : color}
    stroke={color}
    strokeWidth={hollow ? 2.5 : 0}
    opacity={opacity}
  />
);

/** Pole marker (an "x") on a complex / s plane. */
export const PoleMark: React.FC<{
  s: Scale;
  x: number;
  y?: number;
  size?: number;
  color?: string;
  opacity?: number;
  strokeWidth?: number;
  progress?: number;
  label?: string;
}> = ({
  s,
  x,
  y = 0,
  size = 12,
  color = COLORS.warn,
  opacity = 1,
  strokeWidth = 3.6,
  progress = 1,
  label,
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = s.px(x);
  const cy = s.py(y);
  const d = size * p;
  return (
    <g opacity={opacity}>
      <line x1={cx - d} y1={cy - d} x2={cx + d} y2={cy + d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1={cx - d} y1={cy + d} x2={cx + d} y2={cy - d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      {label ? (
        <text
          x={cx + size + 10}
          y={cy - size - 8}
          fill={color}
          fontFamily={FONT}
          fontSize={22}
          fontWeight={600}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
};

/** Zero marker (a hollow circle) on a complex / s plane. */
export const ZeroMark: React.FC<{
  s: Scale;
  x: number;
  y?: number;
  r?: number;
  color?: string;
  opacity?: number;
  progress?: number;
  label?: string;
}> = ({ s, x, y = 0, r = 10, color = COLORS.result, opacity = 1, progress = 1, label }) => (
  <g opacity={opacity * Math.max(0, Math.min(1, progress))}>
    <circle
      cx={s.px(x)}
      cy={s.py(y)}
      r={r}
      fill="none"
      stroke={color}
      strokeWidth={3.4}
    />
    {label ? (
      <text
        x={s.px(x) + r + 10}
        y={s.py(y) - r - 8}
        fill={color}
        fontFamily={FONT}
        fontSize={22}
        fontWeight={600}
      >
        {label}
      </text>
    ) : null}
  </g>
);

export const Tag: React.FC<{
  s: Scale;
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: number;
  align?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
  opacity?: number;
  weight?: number;
  pill?: boolean;
  italic?: boolean;
}> = ({
  s,
  x,
  y,
  text,
  color = COLORS.textStrong,
  size = 23,
  align = 'middle',
  dx = 0,
  dy = 0,
  opacity = 1,
  weight = 600,
  pill = false,
  italic = false,
}) => {
  const tx = s.px(x) + dx;
  const ty = s.py(y) + dy;
  const wEst = text.length * size * 0.55;
  return (
    <g opacity={opacity}>
      {pill ? (
        <rect
          x={align === 'middle' ? tx - wEst / 2 - 9 : align === 'end' ? tx - wEst - 9 : tx - 9}
          y={ty - size * 0.95}
          width={wEst + 18}
          height={size * 1.45}
          rx={7}
          fill={alpha(COLORS.bg0, 0.72)}
          stroke={alpha(color, 0.35)}
          strokeWidth={1.2}
        />
      ) : null}
      <text
        x={tx}
        y={ty}
        textAnchor={align}
        fill={color}
        fontFamily={FONT}
        fontSize={size}
        fontWeight={weight}
        fontStyle={italic ? 'italic' : undefined}
      >
        {text}
      </text>
    </g>
  );
};

/**
 * Highlight halo around one point: a soft filled disc, a ring and a solid core,
 * scaled by `progress` so it pops in. Use it for "look at THIS sample" emphasis
 * instead of hand-writing three `<circle>`s per scene (which is what every batch
 * did before this existed).
 *
 * Pass `progress` from `popIn(frame, start)` or `ramp(frame, start, dur)` — the
 * figure stays free of animation imports so timing stays in the scene.
 */
export const Halo: React.FC<{
  s: Scale;
  x: number;
  y: number;
  color?: string;
  /** outer radius in px */
  r?: number;
  /** 0..1 reveal */
  progress?: number;
  opacity?: number;
}> = ({ s, x, y, color = COLORS.accent, r = 24, progress = 1, opacity = 1 }) => {
  const p = Math.max(0, Math.min(1, progress));
  const cx = s.px(x);
  const cy = s.py(y);
  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={r * p} fill={alpha(color, 0.18)} />
      <circle cx={cx} cy={cy} r={r * 0.46} fill="none" stroke={color} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={r * 0.25} fill={color} />
    </g>
  );
};
