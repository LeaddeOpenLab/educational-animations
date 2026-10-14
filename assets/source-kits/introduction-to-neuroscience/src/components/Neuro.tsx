import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';
import { voltageAt, sumPotential, receptiveResponse } from './NeuroMechanisms';

/**
 * Neuro.tsx — Introduction to Neuroscience 的 L2 学科原语。
 *
 * 覆盖 10 个知识点反复出现的图形：膜电位时程（静息/阈电位/去极化/复极化）、
 * 电压门控离子通道、化学突触的囊泡释放与受体结合、EPSP/IPSP 的突触整合、
 * 脑区定位图、神经通路连接图、视觉通路与视交叉、同心圆拮抗感受野、
 * LTP/LTD 的突触可塑性曲线、记忆巩固通路。
 *
 * 写法遵循 edu-video-kit §5：电位与放电率一律由函数算出，随机（囊泡位置、
 * 递质扩散）用确定性 LCG；颜色只取 COLORS 角色，透明一律 alpha()。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 确定性 LCG：囊泡与递质点必须可复现。 */
const mk = (seed: number): (() => number) => {
  let s = (seed | 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

const headPts = (vx: number, vy: number, deg: number, size: number): string => {
  const r = (deg * Math.PI) / 180;
  const ux = Math.cos(r);
  const uy = -Math.sin(r);
  return [
    `${vx.toFixed(1)},${vy.toFixed(1)}`,
    `${(vx - ux * size + uy * size * 0.46).toFixed(1)},${(vy - uy * size + ux * size * 0.46).toFixed(1)}`,
    `${(vx - ux * size - uy * size * 0.46).toFixed(1)},${(vy - uy * size - ux * size * 0.46).toFixed(1)}`,
  ].join(' ');
};

/* ------------------------------------------------------------------ */
/* 1. 膜电位时程                                                      */
/* ------------------------------------------------------------------ */

/**
 * 膜电位随时间：静息 → 去极化 → 峰值 → 复极化 → 超极化 → 恢复，
 * 标出阈电位与静息电位，并在各阶段挂上主导离子（Na⁺ 内流 / K⁺ 外流）箭头。
 * 波形由参数化函数给出，场景改参数不改曲线代码。
 * 覆盖 Resting potential / Action potential。
 */
export const MembranePotential: React.FC<{
  s: Scale;
  /** 静息电位（mV，通常 −70）。 */
  rest: number;
  /** 阈电位（mV，通常 −55）。 */
  threshold: number;
  /** 峰值（mV，通常 +40）。 */
  peak: number;
  /** 动作电位起始时间（数域 t）。 */
  onset: number;
  /** 总时长（数域 t）。 */
  dur: number;
  /** 超极化深度（mV）。 */
  undershoot?: number;
  color?: ColorRole | string;
  progress?: number;
  showIons?: boolean;
}> = ({
  s,
  rest,
  threshold,
  peak,
  onset,
  dur,
  undershoot = 12,
  color = COLORS.primary,
  progress = 1,
  showIons = true,
}) => {
  const p = clamp01(progress);
  const v = (t: number): number => voltageAt(t, {rest, threshold, peak, onset, dur, undershoot});
  const [t0, t1] = s.xDomain;
  const n = 420;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    pts.push([t, v(t)]);
  }
  const d = 'M ' + pts.map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' L ');
  const shown = Math.max(2, Math.round(n * p));
  const cur = pts[shown - 1];
  return (
    <g>
      <line
        x1={s.px(t0)}
        y1={s.py(rest)}
        x2={s.px(t1)}
        y2={s.py(rest)}
        stroke={COLORS.axis}
        strokeWidth={2.4}
        strokeDasharray="10 8"
      />
      <text x={s.px(t1) + 12} y={s.py(rest) + 8} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        {`${rest.toFixed(0)} mV`}
      </text>
      <line
        x1={s.px(t0)}
        y1={s.py(threshold)}
        x2={s.px(t1)}
        y2={s.py(threshold)}
        stroke={COLORS.warn}
        strokeWidth={2.4}
        strokeDasharray="6 6"
      />
      <text x={s.px(t1) + 12} y={s.py(threshold) + 8} fill={COLORS.warn} fontFamily={FONT} fontSize={24}>
        {`threshold ${threshold.toFixed(0)}`}
      </text>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {showIons && p > 0.2 ? (
        <g>
          <circle cx={s.px(cur[0])} cy={s.py(cur[1])} r={8} fill={COLORS.accent} />
          <text
            x={s.px(cur[0]) + 16}
            y={s.py(cur[1]) - 16}
            fill={COLORS.accent}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
          >
            {`${cur[1].toFixed(0)} mV`}
          </text>
        </g>
      ) : null}
      {showIons && p > 0.3 ? (
        <g>
          <text
            x={s.px(onset + dur * 0.2)}
            y={s.py(peak) - 30}
            fill={COLORS.primary}
            fontFamily={FONT}
            fontSize={24}
            textAnchor="middle"
          >
            Na⁺ in
          </text>
          <text
            x={s.px(onset + dur * 0.5)}
            y={s.py(rest) + 52}
            fill={COLORS.alt}
            fontFamily={FONT}
            fontSize={24}
            textAnchor="middle"
          >
            K⁺ out
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 电压门控离子通道                                                */
/* ------------------------------------------------------------------ */

/**
 * 膜上的离子通道：闸门随 open（0..1）开合，离子按浓度差方向穿过，
 * 可标注通道类型（Na⁺/K⁺/Ca²⁺）与当前电导。
 * 覆盖 Resting potential / Action potential 的机制层。
 */
export const IonChannel: React.FC<{
  x: number;
  y: number;
  /** 膜厚。 */
  thick?: number;
  /** 开合进度 0..1。 */
  open?: number;
  ion?: string;
  color?: ColorRole | string;
  /** 通过的离子数（由开度决定）。 */
  progress?: number;
  seed?: number;
}> = ({ x, y, thick = 74, open = 0, ion = 'Na⁺', color = COLORS.primary, progress = 1, seed = 9 }) => {
  const p = clamp01(progress);
  const o = clamp01(open);
  const rnd = mk(seed);
  const gap = 10 + 26 * o;
  const n = Math.round(6 * o * p);
  return (
    <g>
      <rect x={x - 34} y={y - thick / 2} width={20} height={thick} rx={6} fill={color} />
      <rect x={x + 14} y={y - thick / 2} width={20} height={thick} rx={6} fill={color} />
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={x + (rnd() - 0.5) * 14}
          cy={y - thick / 2 + ((rnd() * 1.0 + p * 0.6) % 1) * thick}
          r={6}
          fill={COLORS.accent}
        />
      ))}
      <text
        x={x}
        y={y - thick / 2 - 20}
        fill={color}
        fontFamily={FONT}
        fontSize={25}
        fontWeight={700}
        textAnchor="middle"
      >
        {ion}
      </text>
      <text
        x={x}
        y={y + thick / 2 + 34}
        fill={COLORS.textMuted}
        fontFamily={FONT}
        fontSize={22}
        textAnchor="middle"
      >
        {`open ${(o * 100).toFixed(0)}%`}
      </text>
      <text
        x={x - 34 - gap}
        y={y + 8}
        fill={COLORS.textDim}
        fontFamily={FONT}
        fontSize={20}
        textAnchor="end"
      >
        gate
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 化学突触                                                        */
/* ------------------------------------------------------------------ */

/**
 * 化学突触：突触前终扣（含囊泡）→ 突触间隙 → 突触后膜受体。
 * release 控制囊泡与递质的释放扩散，binding 控制与受体结合。
 * 覆盖 Chemical synaptic transmission。
 */
export const Synapse: React.FC<{
  /** 突触前终扣中心。 */
  preX: number;
  preY: number;
  /** 间隙宽度。 */
  cleft?: number;
  /** 释放进度 0..1（囊泡移向膜并释放递质）。 */
  release?: number;
  /** 结合进度 0..1（递质到受体）。 */
  binding?: number;
  /** 递质数量。 */
  quanta?: number;
  color?: ColorRole | string;
  progress?: number;
  seed?: number;
}> = ({
  preX,
  preY,
  cleft = 96,
  release = 0,
  binding = 0,
  quanta = 14,
  color = COLORS.primary,
  progress = 1,
  seed = 3,
}) => {
  const p = clamp01(progress);
  const rel = clamp01(release);
  const bind = clamp01(binding);
  const rnd = mk(seed);
  const postX = preX + 250 + cleft;
  return (
    <g opacity={p}>
      {/* 突触前终扣 */}
      <path
        d={`M ${preX - 190} ${preY - 130} q 190 -40 380 0 q -60 130 -190 130 q -130 0 -190 -130 Z`}
        fill={alpha(color, 0.16)}
        stroke={color}
        strokeWidth={3.6}
      />
      {/* 囊泡 */}
      {Array.from({ length: 7 }, (_, i) => {
        const vx = preX - 130 + rnd() * 260;
        const vy = preY - 70 + rnd() * 90;
        const moved = rel * 90;
        return (
          <circle key={i} cx={vx} cy={vy + moved * (1 - i / 7)} r={17} fill={alpha(COLORS.accent, 0.5)} stroke={COLORS.accent} strokeWidth={2.6} />
        );
      })}
      {/* 递质 */}
      {Array.from({ length: quanta }, (_, i) => {
        const t = rel * (0.5 + 0.5 * rnd());
        const dx = preX + 60 + t * (cleft * 0.9);
        const dy = preY + 20 + (rnd() - 0.5) * 120 * (1 - bind * 0.7);
        if (t <= 0.02) return null;
        return <circle key={`q${i}`} cx={dx} cy={dy} r={6} fill={COLORS.accent} opacity={0.9} />;
      })}
      {/* 突触后膜 */}
      <path
        d={`M ${postX - 150} ${preY - 150} q 150 -40 300 0 q -50 300 -150 300 q -100 0 -150 -300 Z`}
        fill={alpha(COLORS.alt, 0.14)}
        stroke={COLORS.alt}
        strokeWidth={3.6}
      />
      {/* 受体 */}
      {Array.from({ length: 4 }, (_, i) => {
        const ry = preY - 70 + i * 60;
        const active = bind > 0.35 + i * 0.1;
        return (
          <g key={`r${i}`}>
            <rect
              x={postX - 150}
              y={ry - 18}
              width={44}
              height={38}
              rx={9}
              fill={active ? COLORS.result : alpha(COLORS.result, 0.32)}
              stroke={COLORS.result}
              strokeWidth={2.8}
            />
            {active ? <circle cx={postX - 128} cy={ry + 1} r={7} fill={COLORS.accent} /> : null}
          </g>
        );
      })}
      <text x={preX} y={preY + 176} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24} textAnchor="middle">
        presynaptic
      </text>
      <text x={postX} y={preY + 220} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24} textAnchor="middle">
        postsynaptic
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 突触整合                                                        */
/* ------------------------------------------------------------------ */

/**
 * 突触整合：若干输入（EPSP 正向、IPSP 负向）汇聚到轴丘，按时间与空间求和，
 * 越过阈电位才发放。每条输入的幅度与到达时间由数组给出，求和曲线由函数算出。
 * 覆盖 Synaptic integration。
 */
export const Summation: React.FC<{
  s: Scale;
  /** 输入：幅度（mV，正为 EPSP、负为 IPSP）与到达时间。 */
  inputs: { amp: number; at: number; label?: string; excitatory?: boolean }[];
  /** 阈电位。 */
  threshold: number;
  rest: number;
  /** EPSP 衰减时间常数。 */
  tau?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, inputs, threshold, rest, tau = 6, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const total = (t: number): number => sumPotential(t, inputs, rest, tau);
  const [t0, t1] = s.xDomain;
  const n = 420;
  const pts: [number, number][] = [];
  for (let k = 0; k <= n; k++) {
    const t = t0 + ((t1 - t0) * k) / n;
    pts.push([t, total(t)]);
  }
  const shown = Math.max(2, Math.round(n * p));
  const d = 'M ' + pts.slice(0, shown).map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' L ');
  const peakVal = Math.max(...pts.map((q) => q[1]));
  const fired = peakVal >= threshold;
  return (
    <g>
      <line
        x1={s.px(t0)}
        y1={s.py(threshold)}
        x2={s.px(t1)}
        y2={s.py(threshold)}
        stroke={COLORS.warn}
        strokeWidth={2.6}
        strokeDasharray="8 6"
      />
      <text x={s.px(t1) + 12} y={s.py(threshold) + 8} fill={COLORS.warn} fontFamily={FONT} fontSize={24}>
        {`${threshold.toFixed(0)} mV`}
      </text>
      <path d={d} fill="none" stroke={color} strokeWidth={4.5} strokeLinecap="round" />
      {inputs.map((i, k) => {
        if (p < (k + 1) / (inputs.length + 1)) return null;
        const c = i.excitatory === false ? COLORS.alt : COLORS.accent;
        return (
          <g key={k}>
            <line
              x1={s.px(i.at)}
              y1={s.py(rest)}
              x2={s.px(i.at)}
              y2={s.py(rest + i.amp)}
              stroke={c}
              strokeWidth={3}
            />
            <polygon
              points={headPts(s.px(i.at), s.py(rest + i.amp), i.amp >= 0 ? 90 : -90, 12)}
              fill={c}
            />
            {i.label ? (
              <text
                x={s.px(i.at)}
                y={s.py(rest) + (i.amp >= 0 ? 46 : -34)}
                fill={c}
                fontFamily={FONT}
                fontSize={23}
                textAnchor="middle"
              >
                {i.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {p > 0.85 ? (
        <text
          x={s.px((t0 + t1) / 2)}
          y={s.py(peakVal) - 34}
          fill={fired ? COLORS.result : COLORS.textMuted}
          fontFamily={FONT}
          fontSize={29}
          fontWeight={700}
          textAnchor="middle"
        >
          {fired ? `fires — peak ${peakVal.toFixed(0)} mV` : `no spike — peak ${peakVal.toFixed(0)} mV`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 脑区定位                                                        */
/* ------------------------------------------------------------------ */

/**
 * 脑区定位：简化的脑侧面轮廓（额叶/顶叶/颞叶/枕叶/小脑/脑干分区），
 * 按 active 高亮某一区。覆盖 Brain region localization。
 */
export const BrainMap: React.FC<{
  cx: number;
  cy: number;
  scale?: number;
  /** 要高亮的区域名。 */
  active?: string;
  color?: ColorRole | string;
  progress?: number;
}> = ({ cx, cy, scale = 1, active, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const S = (v: number): number => v * scale;
  const region = (name: string, d: string, lx: number, ly: number): React.ReactNode => {
    const on = active === name;
    return (
      <g opacity={p}>
        <path
          d={d}
          fill={on ? alpha(COLORS.accent, 0.4) : alpha(color, 0.14)}
          stroke={on ? COLORS.accent : color}
          strokeWidth={on ? 4.5 : 3}
        />
        <text
          x={cx + S(lx)}
          y={cy + S(ly)}
          fill={on ? COLORS.textStrong : COLORS.textMuted}
          fontFamily={FONT}
          fontSize={S(24)}
          fontWeight={on ? 700 : 400}
          textAnchor="middle"
        >
          {name}
        </text>
      </g>
    );
  };
  return (
    <g>
      {region(
        'frontal',
        `M ${cx - S(230)} ${cy - S(60)} q ${S(20)} ${-S(150)} ${S(180)} ${-S(140)} q ${S(120)} ${S(10)} ${S(70)} ${S(150)} l ${-S(60)} ${S(90)} q ${-S(150)} ${S(40)} ${-S(190)} ${-S(100)} Z`,
        -100,
        -110
      )}
      {region(
        'parietal',
        `M ${cx + S(20)} ${cy - S(190)} q ${S(130)} ${S(30)} ${S(150)} ${S(170)} l ${-S(110)} ${S(60)} q ${-S(50)} ${-S(120)} ${-S(40)} ${-S(230)} Z`,
        110,
        -80
      )}
      {region(
        'temporal',
        `M ${cx - S(120)} ${cy + S(50)} q ${S(60)} ${-S(70)} ${S(170)} ${-S(60)} q ${S(40)} ${S(70)} ${-S(30)} ${S(130)} q ${-S(140)} ${S(40)} ${-S(140)} ${-S(70)} Z`,
        -20,
        110
      )}
      {region(
        'occipital',
        `M ${cx + S(170)} ${cy - S(20)} q ${S(80)} ${S(30)} ${S(50)} ${S(140)} q ${-S(80)} ${S(50)} ${-S(110)} ${-S(60)} q ${-S(20)} ${-S(70)} ${S(60)} ${-S(80)} Z`,
        190,
        60
      )}
      {region(
        'cerebellum',
        `M ${cx + S(120)} ${cy + S(130)} q ${S(90)} ${-S(20)} ${S(110)} ${S(60)} q ${-S(30)} ${S(80)} ${-S(120)} ${S(40)} q ${-S(40)} ${-S(90)} ${S(10)} ${-S(100)} Z`,
        180,
        180
      )}
      {region(
        'brainstem',
        `M ${cx + S(10)} ${cy + S(150)} q ${S(60)} ${S(10)} ${S(50)} ${S(110)} l ${-S(60)} ${S(20)} q ${-S(40)} ${-S(60)} ${S(10)} ${-S(130)} Z`,
        40,
        230
      )}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 神经通路                                                        */
/* ------------------------------------------------------------------ */

/**
 * 神经通路：一串核团节点与有向连线，支持在某一节点处交叉（如视交叉的
 * 鼻侧纤维交叉到对侧）。覆盖 Neural pathways / Visual pathway。
 */
export const Pathway: React.FC<{
  /** 节点：位置与名称。 */
  nodes: { x: number; y: number; label: string; color?: ColorRole | string }[];
  /** 连线：from/to 下标，可选 crossing（在 midpoint 处交叉）与标签。 */
  edges: { from: number; to: number; label?: string; crossing?: boolean }[];
  /** 高亮的边下标（按 progress 逐个点亮）。 */
  progress?: number;
  color?: ColorRole | string;
}> = ({ nodes, edges, progress = 1, color = COLORS.primary }) => {
  const p = clamp01(progress);
  const shown = Math.max(0, Math.round(edges.length * p));
  return (
    <g>
      {edges.slice(0, shown).map((e, i) => {
        const a = nodes[e.from];
        const b = nodes[e.to];
        if (!a || !b) return null;
        const c = b.color ?? color;
        if (e.crossing) {
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          return (
            <g key={i}>
              <path
                d={`M ${a.x} ${a.y} Q ${mx} ${a.y} ${mx} ${my} Q ${mx} ${b.y} ${b.x} ${b.y}`}
                fill="none"
                stroke={c}
                strokeWidth={3.6}
              />
              <polygon
                points={headPts(b.x, b.y, (Math.atan2(b.y - my, b.x - mx) * 180) / Math.PI, 13)}
                fill={c}
              />
              {e.label ? (
                <text x={mx + 16} y={my - 12} fill={COLORS.textMuted} fontFamily={FONT} fontSize={22}>
                  {e.label}
                </text>
              ) : null}
            </g>
          );
        }
        const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x - 34} y2={b.y} stroke={c} strokeWidth={3.6} />
            <polygon points={headPts(b.x - 30, b.y, deg, 13)} fill={c} />
            {e.label ? (
              <text
                x={(a.x + b.x) / 2}
                y={(a.y + b.y) / 2 - 12}
                fill={COLORS.textMuted}
                fontFamily={FONT}
                fontSize={22}
                textAnchor="middle"
              >
                {e.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {nodes.map((nd, i) => (
        <g key={i}>
          <circle cx={nd.x} cy={nd.y} r={34} fill={alpha(nd.color ?? color, 0.22)} stroke={nd.color ?? color} strokeWidth={3.4} />
          <text
            x={nd.x}
            y={nd.y + 9}
            fill={COLORS.textStrong}
            fontFamily={FONT}
            fontSize={23}
            fontWeight={700}
            textAnchor="middle"
          >
            {nd.label}
          </text>
        </g>
      ))}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 7. 感受野                                                          */
/* ------------------------------------------------------------------ */

/**
 * 同心圆拮抗感受野：中心圆 + 环形外周，光斑位置决定响应强度
 * （on-center：中心给光兴奋、外周给光抑制；off-center 相反）。
 * 右侧给出放电率条与数值。覆盖 Receptive field。
 */
export const ReceptiveField: React.FC<{
  cx: number;
  cy: number;
  r?: number;
  /** 光斑中心（相对感受野中心的偏移）与半径。 */
  spot?: { dx: number; dy: number; r: number };
  /** 'on' = on-center（中心兴奋），'off' = off-center。 */
  type?: 'on' | 'off';
  /** 自发放电率（Hz）与最大调制。 */
  baseline?: number;
  gain?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({
  cx,
  cy,
  r = 120,
  spot,
  type = 'on',
  baseline = 20,
  gain = 60,
  color = COLORS.primary,
  progress = 1,
}) => {
  const p = clamp01(progress);
  const resp = receptiveResponse(spot, r, type, baseline, gain);
  const barH = Math.max(4, (resp / (baseline + gain)) * 220);
  return (
    <g opacity={p}>
      <circle cx={cx} cy={cy} r={r} fill={alpha(COLORS.alt, 0.16)} stroke={COLORS.alt} strokeWidth={3} />
      <circle cx={cx} cy={cy} r={r * 0.45} fill={alpha(color, 0.3)} stroke={color} strokeWidth={3.4} />
      <text x={cx} y={cy - 42} fill={COLORS.textStrong} fontFamily={FONT} fontSize={24} fontWeight={700} textAnchor="middle">
        {type === 'on' ? 'ON' : 'OFF'}
      </text>
      {spot ? (
        <circle cx={cx + spot.dx} cy={cy + spot.dy} r={spot.r} fill={alpha(COLORS.accent, 0.55)} stroke={COLORS.accent} strokeWidth={2.6} />
      ) : null}
      <g>
        <rect x={cx + r + 90} y={cy - 110} width={44} height={220} fill={alpha(COLORS.textDim, 0.12)} />
        <rect x={cx + r + 90} y={cy + 110 - barH} width={44} height={barH} fill={resp >= baseline ? COLORS.result : COLORS.warn} />
        <text x={cx + r + 112} y={cy + 142} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24} textAnchor="middle">
          {`${resp.toFixed(0)} Hz`}
        </text>
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 8. 突触可塑性                                                      */
/* ------------------------------------------------------------------ */

/**
 * LTP/LTD：以 EPSP 斜率（相对基线）随时间变化呈现——高频刺激后增强（LTP），
 * 低频刺激后减弱（LTD）。数值由传入的诱导函数给出。
 * 覆盖 Synaptic plasticity。
 */
export const Plasticity: React.FC<{
  s: Scale;
  /** 相对基线的突触强度函数：t → 倍数。 */
  strength: (t: number) => number;
  /** 刺激施加的时刻（画竖直标记线）。 */
  stimuli?: number[];
  color?: ColorRole | string;
  progress?: number;
  label?: string;
}> = ({ s, strength, stimuli = [], color = COLORS.primary, progress = 1, label }) => {
  const p = clamp01(progress);
  const [t0, t1] = s.xDomain;
  const n = 380;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    pts.push([t, strength(t)]);
  }
  const d = 'M ' + pts.map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' L ');
  const end = strength(t1);
  return (
    <g>
      <line
        x1={s.px(t0)}
        y1={s.py(1)}
        x2={s.px(t1)}
        y2={s.py(1)}
        stroke={COLORS.axis}
        strokeWidth={2.4}
        strokeDasharray="10 8"
      />
      <text x={s.px(t0) - 12} y={s.py(1) + 8} fill={COLORS.textMuted} fontFamily={FONT} fontSize={23} textAnchor="end">
        baseline
      </text>
      {stimuli.map((st, i) => (
        <g key={i}>
          <line
            x1={s.px(st)}
            y1={s.py(s.yDomain[0])}
            x2={s.px(st)}
            y2={s.py(s.yDomain[1])}
            stroke={COLORS.warn}
            strokeWidth={2.4}
            strokeDasharray="6 6"
            opacity={0.7}
          />
          <text x={s.px(st)} y={s.py(s.yDomain[1]) - 14} fill={COLORS.warn} fontFamily={FONT} fontSize={22} textAnchor="middle">
            stim
          </text>
        </g>
      ))}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {p > 0.9 ? (
        <text
          x={s.px(t1) - 20}
          y={s.py(end) - 30}
          fill={end >= 1 ? COLORS.result : COLORS.warn}
          fontFamily={FONT}
          fontSize={30}
          fontWeight={700}
          textAnchor="end"
        >
          {`${label ?? ''} ${(end * 100).toFixed(0)}% ${end >= 1 ? '(LTP)' : '(LTD)'}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 9. 记忆形成通路                                                    */
/* ------------------------------------------------------------------ */

/**
 * 记忆形成：编码 → 海马（短期/巩固）→ 皮层（长期储存）→ 提取，
 * 带时间轴与"巩固需要时间"的渐进条。覆盖 Memory formation。
 */
export const MemoryPath: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 各阶段名称。 */
  stages?: string[];
  /** 巩固进度 0..1（海马 → 皮层的转移程度）。 */
  consolidation?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({
  x,
  y,
  w,
  stages = ['encode', 'hippocampus', 'consolidate', 'cortex', 'retrieve'],
  consolidation = 0,
  color = COLORS.primary,
  progress = 1,
}) => {
  const p = clamp01(progress);
  const cons = clamp01(consolidation);
  const n = stages.length;
  const gap = w / (n - 1);
  return (
    <g>
      {stages.map((st, i) => {
        const cx = x + i * gap;
        const active = i / (n - 1) <= Math.max(p, 0.001);
        return (
          <g key={i} opacity={active ? 1 : 0.25}>
            <rect
              x={cx - 82}
              y={y - 36}
              width={164}
              height={72}
              rx={14}
              fill={alpha(i === 1 ? COLORS.accent : color, 0.2)}
              stroke={i === 1 ? COLORS.accent : color}
              strokeWidth={3.2}
            />
            <text
              x={cx}
              y={y + 9}
              fill={COLORS.textStrong}
              fontFamily={FONT}
              fontSize={25}
              fontWeight={700}
              textAnchor="middle"
            >
              {st}
            </text>
            {i < n - 1 ? (
              <line x1={cx + 84} y1={y} x2={cx + gap - 84} y2={y} stroke={COLORS.textDim} strokeWidth={3} />
            ) : null}
          </g>
        );
      })}
      {/* 巩固条：海马 → 皮层的转移 */}
      <rect x={x + gap} y={y + 74} width={gap * 2} height={18} rx={9} fill={alpha(COLORS.textDim, 0.14)} />
      <rect x={x + gap} y={y + 74} width={gap * 2 * cons} height={18} rx={9} fill={COLORS.result} />
      <text x={x + gap * 2} y={y + 122} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24} textAnchor="middle">
        {`consolidation ${(cons * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};
