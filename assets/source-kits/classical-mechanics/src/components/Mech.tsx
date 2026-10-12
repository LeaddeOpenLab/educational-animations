import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';

/**
 * Mech.tsx — Classical Mechanics 的 L2 学科原语。
 *
 * 覆盖 13 个知识点反复出现的图形：力矢量与受力分析图、曲线上一点的切线与
 * rise/run 斜率三角、曲线下面积（位移 ∫v dt、功 ∫F dx）、两体碰撞与动量条、
 * 势能曲线与转折点、无滑滚动的摆线轨迹、刚体的角位移与角速度弧箭头。
 *
 * 写法遵循 edu-video-kit §5：场景只传逻辑量（函数、角度、质量、progress），
 * 原语内部做坐标换算与绘入动画；颜色只取 COLORS 角色，透明一律 alpha()；
 * 屏上一律显示由函数算出的数（toFixed），不写字面量。
 *
 * 注意本课主题是 light（bg1 近纸白）—— 描边用深色角色，切勿假定深底。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

/** 把任意实数夹回 0..1，progress 的统一步伐。 */
const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 确定性 LCG：同一 seed 每次渲染给出同样的点，避免拼图与成片之间重排。 */
const mk = (seed: number): (() => number) => {
  let s = (seed | 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

/** 角度（度，0=向右，逆时针为正）→ 单位方向向量（SVG 的 y 轴向下，故取负）。 */
const dirOf = (deg: number): [number, number] => {
  const r = (deg * Math.PI) / 180;
  return [Math.cos(r), -Math.sin(r)];
};

/** 折线转 path，用于面积填充与轨迹。 */
const toPath = (pts: [number, number][]): string =>
  pts.length ? 'M ' + pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' L ') : '';

/** 箭头头部三角：给定顶点与朝向角（度）。 */
const headPts = (vx: number, vy: number, deg: number, size: number): string => {
  const r = (deg * Math.PI) / 180;
  const ux = Math.cos(r);
  const uy = -Math.sin(r);
  const px = uy;
  const py = ux;
  return [
    `${vx.toFixed(2)},${vy.toFixed(2)}`,
    `${(vx - ux * size + px * size * 0.46).toFixed(2)},${(vy - uy * size + py * size * 0.46).toFixed(2)}`,
    `${(vx - ux * size - px * size * 0.46).toFixed(2)},${(vy - uy * size - py * size * 0.46).toFixed(2)}`,
  ].join(' ');
};

/** 在 [a,b] 上找 f(x)=target 的一个根（二分），用于求势能曲线的转折点。 */
const solveRoot = (
  f: (x: number) => number,
  target: number,
  a: number,
  b: number
): number | null => {
  let lo = a;
  let hi = b;
  const fa = f(lo) - target;
  const fb = f(hi) - target;
  if (fa * fb > 0) return null;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if ((f(lo) - target) * (f(mid) - target) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
};

/* ------------------------------------------------------------------ */
/* 1. 力矢量                                                          */
/* ------------------------------------------------------------------ */

/**
 * 一根力矢量：从 (x,y) 沿 angle 方向长出 length*progress，末端带箭头与标签。
 * 用于受力图、斜面分解、冲量示意——一切"有方向的量"都由它画。
 */
export const Force: React.FC<{
  x: number;
  y: number;
  /** 方向角，度。0 = 向右，90 = 向上，逆时针为正。 */
  angle: number;
  length: number;
  label?: string;
  /** 屏上标注的力的大小（由调用方的函数算出，如 m*g）。 */
  magnitude?: number;
  unit?: string;
  color?: ColorRole | string;
  width?: number;
  progress?: number;
  dashed?: boolean;
  /** 标签沿矢量方向的外推距离。 */
  labelGap?: number;
}> = ({
  x,
  y,
  angle,
  length,
  label,
  magnitude,
  unit = 'N',
  color = COLORS.primary,
  width = 4,
  progress = 1,
  dashed = false,
  labelGap = 22,
}) => {
  const p = clamp01(progress);
  const [ux, uy] = dirOf(angle);
  const tipX = x + ux * length * p;
  const tipY = y + uy * length * p;
  const lx = tipX + ux * labelGap;
  const ly = tipY + uy * labelGap;
  return (
    <g>
      <line
        x1={x}
        y1={y}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '9 7' : undefined}
        opacity={p > 0.02 ? 1 : 0}
      />
      {p > 0.6 ? (
        <polygon points={headPts(tipX, tipY, angle, 15)} fill={color} />
      ) : null}
      {label ? (
        <text
          x={lx}
          y={ly}
          fill={color}
          fontFamily={FONT}
          fontSize={30}
          fontWeight={700}
          textAnchor="middle"
          opacity={p > 0.6 ? 1 : 0}
        >
          {magnitude === undefined
            ? label
            : `${label} = ${magnitude.toFixed(1)} ${unit}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 受力分析图                                                      */
/* ------------------------------------------------------------------ */

type ForceSpec = {
  label: string;
  /** 方向角，度（0 = 向右，逆时针为正）。 */
  angle: number;
  /** 相对大小，按 forces 里的最大值归一化到 scale。 */
  mag: number;
  color?: ColorRole | string;
  magnitude?: number;
};

/**
 * 受力分析图：一个物体（方块 / 圆 / 斜面上的块）加一组从质心发散的力矢量，
 * 可选把某个力沿一组正交方向分解（虚线分量 + 直角标记）。
 * 覆盖 Newton's laws of motion / Free body diagram / 斜面上的重力分解。
 */
export const FreeBody: React.FC<{
  cx: number;
  cy: number;
  body?: 'box' | 'circle' | 'wedge';
  size?: number;
  /** 斜面倾角（度），body='wedge' 时同时画斜面。 */
  incline?: number;
  forces: ForceSpec[];
  /** 力的长度基准：最大 mag 映射到这个像素长度。 */
  scale?: number;
  /** 要分解的力的下标，沿 (incline 方向与法向) 或 decomposeAxes 分解。 */
  decompose?: { index: number; axes?: [number, number]; color?: ColorRole | string };
  progress?: number;
}> = ({
  cx,
  cy,
  body = 'box',
  size = 84,
  incline = 0,
  forces,
  scale = 150,
  decompose,
  progress = 1,
}) => {
  const p = clamp01(progress);
  const maxMag = Math.max(...forces.map((f) => Math.abs(f.mag)), 1e-6);
  const len = (m: number) => (Math.abs(m) / maxMag) * scale;
  const bodyColor = alpha(COLORS.textStrong, 0.14);
  const edge = COLORS.textStrong;

  const wedgeAngle = (incline * Math.PI) / 180;
  const slopeLen = size * 4.2;

  return (
    <g opacity={p}>
      {body === 'wedge' ? (
        <g>
          <line
            x1={cx - (slopeLen / 2) * Math.cos(wedgeAngle)}
            y1={cy + (slopeLen / 2) * Math.sin(wedgeAngle)}
            x2={cx + (slopeLen / 2) * Math.cos(wedgeAngle)}
            y2={cy - (slopeLen / 2) * Math.sin(wedgeAngle)}
            stroke={edge}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <line
            x1={cx - (slopeLen / 2) * Math.cos(wedgeAngle)}
            y1={cy + (slopeLen / 2) * Math.sin(wedgeAngle)}
            x2={cx - (slopeLen / 2) * Math.cos(wedgeAngle)}
            y2={cy + (slopeLen / 2) * Math.sin(wedgeAngle) + 66}
            stroke={edge}
            strokeWidth={4}
            opacity={0.5}
          />
          <text
            x={cx - (slopeLen / 2) * Math.cos(wedgeAngle) + 14}
            y={cy + (slopeLen / 2) * Math.sin(wedgeAngle) + 34}
            fill={COLORS.textMuted}
            fontFamily={FONT}
            fontSize={26}
          >
            {`${incline.toFixed(0)}°`}
          </text>
        </g>
      ) : null}

      {body === 'circle' ? (
        <circle cx={cx} cy={cy} r={size / 2} fill={bodyColor} stroke={edge} strokeWidth={4} />
      ) : (
        <rect
          x={cx - size / 2}
          y={cy - size / 2}
          width={size}
          height={size}
          rx={10}
          fill={bodyColor}
          stroke={edge}
          strokeWidth={4}
          transform={body === 'wedge' ? `rotate(${-incline} ${cx} ${cy})` : undefined}
        />
      )}
      <circle cx={cx} cy={cy} r={5} fill={edge} />

      {forces.map((f, i) => (
        <Force
          key={`${f.label}-${i}`}
          x={cx}
          y={cy}
          angle={f.angle}
          length={len(f.mag)}
          label={f.label}
          magnitude={f.magnitude}
          color={f.color ?? COLORS.primary}
          progress={p}
        />
      ))}

      {decompose && forces[decompose.index] ? (
        <ForceDecomposition
          cx={cx}
          cy={cy}
          angle={forces[decompose.index].angle}
          length={len(forces[decompose.index].mag)}
          axes={decompose.axes ?? [incline + 180, incline + 90]}
          color={decompose.color ?? COLORS.accent}
          progress={p}
        />
      ) : null}
    </g>
  );
};

/** 把一个矢量沿两条给定轴分解：画两条虚线分量与直角方框。 */
const ForceDecomposition: React.FC<{
  cx: number;
  cy: number;
  angle: number;
  length: number;
  axes: [number, number];
  color: string;
  progress: number;
}> = ({ cx, cy, angle, length, axes, color, progress }) => {
  const [ux, uy] = dirOf(angle);
  const tipX = cx + ux * length * progress;
  const tipY = cy + uy * length * progress;
  const [a1x, a1y] = dirOf(axes[0]);
  const [a2x, a2y] = dirOf(axes[1]);
  // 把矢量端点投影到两条轴上，得到分量长度
  const proj1 = (tipX - cx) * a1x + (tipY - cy) * a1y;
  const proj2 = (tipX - cx) * a2x + (tipY - cy) * a2y;
  const c1x = cx + a1x * proj1;
  const c1y = cy + a1y * proj1;
  const c2x = cx + a2x * proj2;
  const c2y = cy + a2y * proj2;
  return (
    <g opacity={progress}>
      <line x1={cx} y1={cy} x2={c1x} y2={c1y} stroke={color} strokeWidth={3} strokeDasharray="8 6" />
      <line x1={cx} y1={cy} x2={c2x} y2={c2y} stroke={color} strokeWidth={3} strokeDasharray="8 6" />
      <line
        x1={c1x}
        y1={c1y}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray="6 6"
        opacity={0.75}
      />
      <line
        x1={c2x}
        y1={c2y}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray="6 6"
        opacity={0.75}
      />
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 切线与斜率三角                                                  */
/* ------------------------------------------------------------------ */

/**
 * 曲线上一点的切线 + rise/run 直角三角形，斜率数值由导数函数算出。
 * 覆盖 Location-time / Speed-time / Acceleration-time graph：一条曲线是另一条
 * 的斜率这件事，必须靠"切线 + 斜率三角"说清楚，光画三条曲线说不明白。
 */
export const SlopeMark: React.FC<{
  s: Scale;
  f: (x: number) => number;
  df: (x: number) => number;
  /** 切点横坐标。 */
  x0: number;
  /** 直角三角形在 x 方向的长度（数域单位）。 */
  run?: number;
  color?: ColorRole | string;
  label?: string;
  progress?: number;
}> = ({ s, f, df, x0, run = 1, color = COLORS.accent, label = 'slope', progress = 1 }) => {
  const p = clamp01(progress);
  const y0 = f(x0);
  const m = df(x0);
  const x1 = x0 + run;
  const y1 = y0 + m * run;
  const P0: [number, number] = [s.px(x0), s.py(y0)];
  const P1: [number, number] = [s.px(x1), s.py(y1)];
  const Elbow: [number, number] = [P1[0], P0[1]];
  // 切线向两端延伸
  const ext = 0.9;
  const A: [number, number] = [s.px(x0 - run * ext), s.py(y0 - m * run * ext)];
  const B: [number, number] = [s.px(x1 + run * ext * 0.4), s.py(y1 + m * run * ext * 0.4)];
  return (
    <g opacity={p}>
      <line
        x1={A[0]}
        y1={A[1]}
        x2={B[0]}
        y2={B[1]}
        stroke={color}
        strokeWidth={3}
        strokeDasharray="10 7"
      />
      <polyline
        points={`${P0[0]},${P0[1]} ${Elbow[0]},${Elbow[1]} ${P1[0]},${P1[1]}`}
        fill="none"
        stroke={color}
        strokeWidth={3.5}
      />
      <circle cx={P0[0]} cy={P0[1]} r={7} fill={color} />
      <text
        x={Elbow[0] + 14}
        y={(P0[1] + P1[1]) / 2}
        fill={color}
        fontFamily={FONT}
        fontSize={28}
        fontWeight={700}
      >
        {`${label} = ${m.toFixed(2)}`}
      </text>
      <text
        x={(P0[0] + Elbow[0]) / 2}
        y={P0[1] + 34}
        fill={COLORS.textMuted}
        fontFamily={FONT}
        fontSize={24}
        textAnchor="middle"
      >
        {`run ${run.toFixed(1)}`}
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 曲线下面积                                                      */
/* ------------------------------------------------------------------ */

/**
 * 曲线到基线之间的面积填充，按 progress 从左向右扫过，并在末端标注累积值。
 * 覆盖 Work-Energy Theorem（∫F dx）与"位移 = v-t 曲线下的面积"。
 * 累积值由传入的 integral 函数算出（调用方给被积函数的解析积分或数值和）。
 */
export const AreaShade: React.FC<{
  s: Scale;
  pts: [number, number][];
  /** 累积面积函数：给定右端 x，返回 0..x 的面积。 */
  integral: (x: number) => number;
  /** 填充的基线（数域 y 值），默认 0。 */
  base?: number;
  color?: ColorRole | string;
  label?: string;
  unit?: string;
  progress?: number;
}> = ({
  s,
  pts,
  integral,
  base = 0,
  color = COLORS.result,
  label = 'area',
  unit = '',
  progress = 1,
}) => {
  const p = clamp01(progress);
  if (pts.length < 2) return null;
  const n = Math.max(2, Math.round(pts.length * p));
  const slice = pts.slice(0, n);
  const baseY = s.py(base);
  const area: [number, number][] = [
    [s.px(slice[0][0]), baseY],
    ...slice.map((q) => [s.px(q[0]), s.py(q[1])] as [number, number]),
    [s.px(slice[slice.length - 1][0]), baseY],
  ];
  const value = integral(slice[slice.length - 1][0]);
  const mid = slice[Math.floor(slice.length / 2)];
  return (
    <g>
      <path d={toPath(area) + ' Z'} fill={alpha(color, 0.22)} stroke="none" />
      <polyline
        points={slice.map((q) => `${s.px(q[0]).toFixed(2)},${s.py(q[1]).toFixed(2)}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={3}
      />
      {p > 0.25 ? (
        <text
          x={s.px(mid[0])}
          y={(baseY + s.py(mid[1])) / 2}
          fill={color}
          fontFamily={FONT}
          fontSize={30}
          fontWeight={700}
          textAnchor="middle"
        >
          {`${label} = ${value.toFixed(2)}${unit ? ' ' + unit : ''}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 两体碰撞                                                        */
/* ------------------------------------------------------------------ */

type Body = {
  r: number;
  mass: number;
  /** 碰撞前速度（向右为正）。 */
  v0: number;
  /** 碰撞后速度。 */
  v1: number;
  color?: ColorRole | string;
  label?: string;
};

/**
 * 两体碰撞：左/右两个球按 progress 从"碰撞前位置"运动到"碰撞后位置"，
 * 各自带速度箭头与动量标注；可选 sticky（完全非弹性，碰后同速贴在一起）。
 * 覆盖 Collision process / Conservation of momentum。
 */
export const Collision: React.FC<{
  /** 轨道中心 y。 */
  y: number;
  /** 碰撞点的 x。 */
  cx: number;
  left: Body;
  right: Body;
  /** 0 = 碰撞前，1 = 碰撞后；中间是接近过程。 */
  progress?: number;
  sticky?: boolean;
  /** 速度箭头的像素/单位比。 */
  vScale?: number;
}> = ({ y, cx, left, right, progress = 0, sticky = false, vScale = 16 }) => {
  const p = clamp01(progress);
  const gap0 = 340;
  const lr = left.r;
  const rr = right.r;
  // Approach until the surfaces touch, then separate or remain joined.
  const contactGap = (lr + rr) / 2;
  const distance = p <= 0.5
    ? gap0 - (gap0 - contactGap) * p * 2
    : contactGap + (sticky ? 0 : 210 - contactGap) * (p - 0.5) * 2;
  const xL = sticky && p > 0.5 ? cx - lr : cx - distance;
  const xR = sticky && p > 0.5 ? cx + rr : cx + distance;
  const vL = left.v0 + (left.v1 - left.v0) * p;
  const vR = right.v0 + (right.v1 - right.v0) * p;
  const pL = left.mass * vL;
  const pR = right.mass * vR;

  const Body0: React.FC<{ x: number; r: number; color: string; label?: string; v: number; mom: number }> = ({
    x,
    r,
    color,
    label,
    v,
    mom,
  }) => (
    <g>
      <circle cx={x} cy={y} r={r} fill={alpha(color, 0.2)} stroke={color} strokeWidth={4} />
      <text
        x={x}
        y={y + 8}
        fill={COLORS.textStrong}
        fontFamily={FONT}
        fontSize={26}
        fontWeight={700}
        textAnchor="middle"
      >
        {label ?? ''}
      </text>
      {Math.abs(v) > 1e-6 ? (
        <g>
          <line
            x1={x}
            y1={y - r - 26}
            x2={x + v * vScale}
            y2={y - r - 26}
            stroke={color}
            strokeWidth={4}
          />
          <polygon
            points={headPts(x + v * vScale, y - r - 26, v > 0 ? 0 : 180, 13)}
            fill={color}
          />
          <text
            x={x + (v * vScale) / 2}
            y={y - r - 44}
            fill={color}
            fontFamily={FONT}
            fontSize={26}
            textAnchor="middle"
          >
            {`v = ${v.toFixed(2)}`}
          </text>
        </g>
      ) : null}
      <text
        x={x}
        y={y + r + 46}
        fill={COLORS.textMuted}
        fontFamily={FONT}
        fontSize={24}
        textAnchor="middle"
      >
        {`p = ${mom.toFixed(2)}`}
      </text>
    </g>
  );

  return (
    <g>
      <line
        x1={cx - 620}
        y1={y + Math.max(lr, rr) + 8}
        x2={cx + 620}
        y2={y + Math.max(lr, rr) + 8}
        stroke={COLORS.axis}
        strokeWidth={3}
      />
      <Body0
        x={xL}
        r={lr}
        color={left.color ?? COLORS.primary}
        label={left.label}
        v={vL}
        mom={pL}
      />
      <Body0
        x={xR}
        r={rr}
        color={right.color ?? COLORS.alt}
        label={right.label}
        v={vR}
        mom={pR}
      />
    </g>
  );
};

/** 碰撞前后的动量/动能条形对比：一行一个物体，左条=碰前，右条=碰后。 */
export const MomentumBars: React.FC<{
  rows: { label: string; before: number; after: number; color?: ColorRole | string }[];
  x: number;
  y: number;
  w: number;
  rowH?: number;
  progress?: number;
  title?: string;
}> = ({ rows, x, y, w, rowH = 46, progress = 1, title }) => {
  const p = clamp01(progress);
  const maxAbs = Math.max(
    ...rows.flatMap((r) => [Math.abs(r.before), Math.abs(r.after)]),
    1e-6
  );
  const total0 = rows.reduce((s, r) => s + r.before, 0);
  const total1 = rows.reduce((s, r) => s + r.after, 0);
  return (
    <g>
      {title ? (
        <text x={x} y={y - 18} fill={COLORS.textMuted} fontFamily={FONT} fontSize={26}>
          {title}
        </text>
      ) : null}
      {rows.map((r, i) => {
        const cy = y + i * rowH + rowH / 2;
        const c = r.color ?? COLORS.primary;
        const bw = (Math.abs(r.before) / maxAbs) * w * p;
        const aw = (Math.abs(r.after) / maxAbs) * w * p;
        return (
          <g key={r.label}>
            <text x={x - 16} y={cy + 9} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} textAnchor="end">
              {r.label}
            </text>
            <rect x={x} y={cy - 15} width={bw} height={13} rx={6} fill={alpha(c, 0.45)} />
            <rect x={x} y={cy + 2} width={aw} height={13} rx={6} fill={c} />
            <text x={x + w + 20} y={cy + 9} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
              {`${r.before.toFixed(2)} → ${r.after.toFixed(2)}`}
            </text>
          </g>
        );
      })}
      <line
        x1={x}
        y1={y + rows.length * rowH + 4}
        x2={x + w}
        y2={y + rows.length * rowH + 4}
        stroke={COLORS.axis}
        strokeWidth={2}
      />
      <text
        x={x}
        y={y + rows.length * rowH + 42}
        fill={COLORS.result}
        fontFamily={FONT}
        fontSize={28}
        fontWeight={700}
      >
        {`total ${total0.toFixed(2)} → ${total1.toFixed(2)}`}
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 势能曲线                                                        */
/* ------------------------------------------------------------------ */

/**
 * 势能曲线 U(x) 与总能量水平线 E：着色允许区、标出转折点与动能 K = E − U。
 * 转折点由 solveRoot 数值求解——场景只给 U 与 E，不手算坐标。
 * 覆盖 Potential energy / Potential energy curve / 势阱中的束缚运动。
 */
export const EnergyLandscape: React.FC<{
  s: Scale;
  U: (x: number) => number;
  /** 总能量。 */
  E: number;
  /** 要标出动能的位置。 */
  probeX?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, U, E, probeX, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [x0, x1] = s.xDomain;
  const n = 260;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    pts.push([s.px(x), s.py(U(x))]);
  }
  const Ey = s.py(E);

  // 允许区：U(x) <= E 的区间，用扫描后的分段折线着色
  const allowed: [number, number][][] = [];
  let cur: [number, number][] = [];
  for (const q of pts) {
    if (q[1] >= Ey) {
      cur.push(q);
    } else if (cur.length) {
      allowed.push(cur);
      cur = [];
    }
  }
  if (cur.length) allowed.push(cur);

  // 转折点：U(x) = E
  const turns: number[] = [];
  const steps = 120;
  for (let i = 0; i < steps; i++) {
    const a = x0 + ((x1 - x0) * i) / steps;
    const b = x0 + ((x1 - x0) * (i + 1)) / steps;
    const r = solveRoot(U, E, a, b);
    if (r !== null) turns.push(r);
  }

  const px = probeX === undefined ? (x0 + x1) / 2 : probeX;
  const K = E - U(px);
  return (
    <g opacity={p}>
      <polyline
        points={pts.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={4}
      />
      <line
        x1={s.px(x0)}
        y1={Ey}
        x2={s.px(x1)}
        y2={Ey}
        stroke={COLORS.result}
        strokeWidth={3}
        strokeDasharray="12 8"
      />
      <text
        x={s.px(x1) + 12}
        y={Ey + 9}
        fill={COLORS.result}
        fontFamily={FONT}
        fontSize={27}
        fontWeight={700}
      >
        {`E = ${E.toFixed(2)}`}
      </text>
      {allowed.map((seg, i) =>
        seg.length > 1 ? (
          <polygon
            key={i}
            points={`${seg[0][0].toFixed(1)},${Ey} ` +
              seg.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ') +
              ` ${seg[seg.length - 1][0].toFixed(1)},${Ey}`}
            fill={alpha(COLORS.result, 0.16)}
            stroke="none"
          />
        ) : null
      )}
      {turns.map((t, i) => (
        <g key={i}>
          <circle cx={s.px(t)} cy={Ey} r={7} fill={COLORS.warn} />
          <text
            x={s.px(t)}
            y={Ey + 34}
            fill={COLORS.warn}
            fontFamily={FONT}
            fontSize={24}
            textAnchor="middle"
          >
            {`x = ${t.toFixed(2)}`}
          </text>
        </g>
      ))}
      {probeX !== undefined ? (
        <g>
          <line
            x1={s.px(px)}
            y1={s.py(U(px))}
            x2={s.px(px)}
            y2={Ey}
            stroke={COLORS.accent}
            strokeWidth={4}
          />
          <circle cx={s.px(px)} cy={s.py(U(px))} r={7} fill={COLORS.accent} />
          <text
            x={s.px(px) + 14}
            y={(s.py(U(px)) + Ey) / 2}
            fill={COLORS.accent}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
          >
            {`K = ${K.toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 7. 无滑滚动                                                        */
/* ------------------------------------------------------------------ */

/**
 * 无滑滚动：轮子沿地面滚过 angle 弧度，同时画出轮缘一点的摆线轨迹。
 * 摆线由参数方程给出（x = r(θ − sinθ), y = r(1 − cosθ)），不手算像素。
 * 覆盖 No slip scrolling / Rigid body rotation。
 */
export const RollingBody: React.FC<{
  /** 起点（圆心在第一帧的 x，地面 y）。 */
  x0: number;
  groundY: number;
  r: number;
  /** Physical radius for the on-screen distance label when r is a drawing scale. */
  physicalRadius?: number;
  /** 滚过的总角度（弧度，通常 2π 的整数倍）。 */
  angle: number;
  /** 轮辐数量。 */
  spokes?: number;
  color?: ColorRole | string;
  progress?: number;
  showTrail?: boolean;
}> = ({
  x0,
  groundY,
  r,
  physicalRadius,
  angle,
  spokes = 8,
  color = COLORS.primary,
  progress = 1,
  showTrail = true,
}) => {
  const p = clamp01(progress);
  const th = angle * p;
  const cy = groundY - r;
  const cx = x0 + r * th;
  const trail: [number, number][] = [];
  const n = 200;
  for (let i = 0; i <= n; i++) {
    const t = (th * i) / n;
    trail.push([x0 + r * (t - Math.sin(t)), groundY - r * (1 - Math.cos(t))]);
  }
  const spokeEnds: [number, number][] = [];
  for (let i = 0; i < spokes; i++) {
    const a = -th + (i * 2 * Math.PI) / spokes;
    spokeEnds.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return (
    <g>
      <line
        x1={x0 - 60}
        y1={groundY}
        x2={x0 + r * angle + 120}
        y2={groundY}
        stroke={COLORS.axis}
        strokeWidth={3}
      />
      {showTrail ? (
        <polyline
          points={trail.map((q) => `${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(' ')}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={3.5}
          strokeDasharray="7 6"
        />
      ) : null}
      <circle cx={cx} cy={cy} r={r} fill={alpha(color, 0.14)} stroke={color} strokeWidth={4} />
      {spokeEnds.map((e, i) => (
        <line key={i} x1={cx} y1={cy} x2={e[0]} y2={e[1]} stroke={color} strokeWidth={2.5} opacity={0.7} />
      ))}
      <circle cx={cx} cy={cy} r={6} fill={color} />
      <circle cx={cx} cy={groundY} r={7} fill={COLORS.warn} />
      <text
        x={cx}
        y={groundY + 44}
        fill={COLORS.textMuted}
        fontFamily={FONT}
        fontSize={25}
        textAnchor="middle"
      >
        {`s = ${((physicalRadius ?? r) * th).toFixed(2)} = rθ = ${(physicalRadius ?? r).toFixed(2)} × ${th.toFixed(2)}`}
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 8. 刚体转动                                                        */
/* ------------------------------------------------------------------ */

/**
 * 刚体绕轴转动：角位移扇形 + ω 弧箭头 + 半径扫过的标记线，
 * 可挂"转动惯量 I = Σ mᵢrᵢ²"的点质量分布。
 * 覆盖 Rigid body rotation / Angular momentum。
 */
export const RigidRotation: React.FC<{
  cx: number;
  cy: number;
  r: number;
  /** 起始角与终止角（度，逆时针为正）。 */
  from: number;
  to: number;
  /** 点质量分布：半径比例 → 质量（用于 L = Iω 与 I = Σmᵢrᵢ² 的标注）。 */
  masses?: { frac: number; m: number; label?: string }[];
  color?: ColorRole | string;
  omegaLabel?: string;
  progress?: number;
}> = ({
  cx,
  cy,
  r,
  from,
  to,
  masses,
  color = COLORS.primary,
  omegaLabel = 'ω',
  progress = 1,
}) => {
  const p = clamp01(progress);
  const theta = from + (to - from) * p;
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (d: number, rr: number): [number, number] => [
    cx + rr * Math.cos(rad(d)),
    cy - rr * Math.sin(rad(d)),
  ];
  const start = pt(from, r * 0.62);
  const end = pt(theta, r * 0.62);
  const largeArc = Math.abs(theta - from) > 180 ? 1 : 0;
  const sweep = to > from ? 0 : 1;
  const I = masses
    ? masses.reduce((s, mm) => s + mm.m * Math.pow(mm.frac * r, 2), 0)
    : null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={alpha(color, 0.12)} stroke={color} strokeWidth={4} />
      <circle cx={cx} cy={cy} r={6} fill={COLORS.textStrong} />
      <path
        d={`M ${cx} ${cy} L ${start[0].toFixed(1)} ${start[1].toFixed(1)} A ${(r * 0.62).toFixed(1)} ${(r * 0.62).toFixed(1)} 0 ${largeArc} ${sweep} ${end[0].toFixed(1)} ${end[1].toFixed(1)} Z`}
        fill={alpha(color, 0.2)}
        stroke="none"
      />
      <line
        x1={cx}
        y1={cy}
        x2={pt(theta, r)[0]}
        y2={pt(theta, r)[1]}
        stroke={color}
        strokeWidth={4}
      />
      <polygon
        points={headPts(end[0], end[1], theta + (sweep === 0 ? 90 : -90), 14)}
        fill={color}
      />
      <text
        x={end[0] + 18}
        y={end[1] - 8}
        fill={color}
        fontFamily={FONT}
        fontSize={28}
        fontWeight={700}
      >
        {`${omegaLabel}, Δθ = ${(theta - from).toFixed(0)}°`}
      </text>
      {masses
        ? masses.map((mm, i) => {
            const q = pt(theta + i * 4, mm.frac * r);
            return (
              <g key={i}>
                <circle cx={q[0]} cy={q[1]} r={11} fill={COLORS.accent} />
                <text
                  x={q[0] + 16}
                  y={q[1] + 8}
                  fill={COLORS.textStrong}
                  fontFamily={FONT}
                  fontSize={24}
                >
                  {`${mm.label ?? 'm'} = ${mm.m.toFixed(1)}`}
                </text>
              </g>
            );
          })
        : null}
      {I !== null ? (
        <text
          x={cx}
          y={cy + r + 46}
          fill={COLORS.textMuted}
          fontFamily={FONT}
          fontSize={26}
          textAnchor="middle"
        >
          {`I = Σ mᵢrᵢ² = ${I.toFixed(0)}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 9. 矢量场（场线）—— 电场/重力场共用的种子点工具                    */
/* ------------------------------------------------------------------ */

/**
 * 由向量函数生成一组种子点（确定性，seed 固定不重排），供场线/流线原语取用。
 * 场景拿到点后自己决定画法；这里只负责"可复现的采样"。
 */
export const fieldSeeds = (
  xDomain: [number, number],
  yDomain: [number, number],
  nx: number,
  ny: number,
  seed = 7
): [number, number][] => {
  const rnd = mk(seed);
  const out: [number, number][] = [];
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      const jx = (rnd() - 0.5) * 0.18;
      const jy = (rnd() - 0.5) * 0.18;
      const x = xDomain[0] + ((xDomain[1] - xDomain[0]) * (i + 0.5 + jx)) / nx;
      const y = yDomain[0] + ((yDomain[1] - yDomain[0]) * (j + 0.5 + jy)) / ny;
      out.push([x, y]);
    }
  }
  return out;
};
