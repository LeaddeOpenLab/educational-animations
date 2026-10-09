import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';

/**
 * Micro.tsx — Principles of Microeconomics 的 L2 学科原语。
 *
 * 覆盖 11 个知识点反复出现的图形：供需曲线与均衡、比较静态的曲线平移、
 * 弹性对比、税收楔形与归宿、无谓损失、预算线与无差异曲线的切点、
 * MC/ATC/AVC 成本曲线族、MR=MC 的产量决策、消费者/生产者剩余面积。
 *
 * 经济学的图形本质是三件事：曲线求交、面积填充、楔形分割。这三条做成
 * 可复用原语，其余都是参数变化。
 *
 * 写法遵循 edu-video-kit §5：曲线由函数给出，均衡点／弹性／税负一律数值求解，
 * 不写字面量；颜色只取 COLORS 角色，透明一律 alpha()。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 在 [a,b] 上求 f(x)=g(x) 的交点（二分），用于均衡点与 MR=MC。 */
const intersect = (
  f: (x: number) => number,
  g: (x: number) => number,
  a: number,
  b: number
): number | null => {
  const h = (x: number): number => f(x) - g(x);
  let lo = a;
  let hi = b;
  if (h(lo) * h(hi) > 0) return null;
  for (let i = 0; i < 70; i++) {
    const mid = (lo + hi) / 2;
    if (h(lo) * h(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
};

/** 在 [a,b] 上求 f(x)=target（二分），用于由价格反解数量等。 */
const solveAt = (f: (x: number) => number, target: number, a: number, b: number): number | null => {
  const h = (x: number): number => f(x) - target;
  let lo = a;
  let hi = b;
  if (h(lo) * h(hi) > 0) return null;
  for (let i = 0; i < 70; i++) {
    const mid = (lo + hi) / 2;
    if (h(lo) * h(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
};

/** 采样一条曲线（数域坐标）。 */
const sample = (f: (x: number) => number, a: number, b: number, n = 200): [number, number][] => {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    out.push([x, f(x)]);
  }
  return out;
};

/** 折线转 SVG path（已给数域点，用 s 映射）。 */
const toPath = (s: Scale, pts: [number, number][]): string =>
  pts.length
    ? 'M ' + pts.map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' L ')
    : '';

/** 多边形（用于面积块与楔形）。 */
const poly = (s: Scale, pts: [number, number][]): string =>
  pts.map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' ');

/* ------------------------------------------------------------------ */
/* 1. 供需与均衡                                                      */
/* ------------------------------------------------------------------ */

/**
 * 供需图：需求与供给曲线（价格 → 数量的反函数形式），数值求解均衡点，
 * 标注均衡价格与数量；shift 参数让某条曲线整体平移（比较静态）。
 * 覆盖 Supply and demand balance / Relatively static。
 */
export const SupplyDemand: React.FC<{
  s: Scale;
  /** 需求：价格 → 数量（右下倾斜）。 */
  Qd: (p: number) => number;
  /** 供给：价格 → 数量（右上倾斜）。 */
  Qs: (p: number) => number;
  /** 需求曲线的平移量（数量方向，>0 右移）。 */
  shiftD?: number;
  shiftS?: number;
  color?: ColorRole | string;
  /** 是否标出均衡点。 */
  showEq?: boolean;
  progress?: number;
}> = ({ s, Qd, Qs, shiftD = 0, shiftS = 0, color = COLORS.primary, showEq = true, progress = 1 }) => {
  const p = clamp01(progress);
  const [pLo, pHi] = s.yDomain;
  const [qLo, qHi] = s.xDomain;
  const d = (pp: number): number => Qd(pp) + shiftD;
  const sup = (pp: number): number => Qs(pp) + shiftS;
  const eqP = intersect(d, sup, pLo, pHi);
  const eqQ = eqP === null ? null : d(eqP);
  const dPts = sample(d, pLo, pHi);
  const sPts = sample(sup, pLo, pHi);
  return (
    <g>
      <path
        d={toPath(s, dPts)}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, sPts)}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <text x={s.px(qHi) + 12} y={s.py(d(pHi)) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        D
      </text>
      <text x={s.px(qHi) + 12} y={s.py(sup(pHi)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        S
      </text>
      {showEq && eqP !== null && eqQ !== null && p > 0.55 ? (
        <g>
          <line x1={s.px(0)} y1={s.py(eqP)} x2={s.px(eqQ)} y2={s.py(eqP)} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="7 6" />
          <line x1={s.px(eqQ)} y1={s.py(0)} x2={s.px(eqQ)} y2={s.py(eqP)} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="7 6" />
          <circle cx={s.px(eqQ)} cy={s.py(eqP)} r={8} fill={COLORS.result} />
          <text x={s.px(0) - 14} y={s.py(eqP) + 9} fill={COLORS.result} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="end">
            {`P* = ${eqP.toFixed(2)}`}
          </text>
          <text x={s.px(eqQ)} y={s.py(0) - 18} fill={COLORS.result} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
            {`Q* = ${eqQ.toFixed(1)}`}
          </text>
        </g>
      ) : null}
      {shiftD !== 0 && p > 0.3 ? (
        <g>
          <path d={toPath(s, sample(Qd, pLo, pHi))} fill="none" stroke={color} strokeWidth={2.6} strokeDasharray="8 7" opacity={0.5} />
          <text x={s.px(Qd(pHi)) + 20} y={s.py(pHi) - 14} fill={color} fontFamily={FONT} fontSize={23} opacity={0.75}>
            D₀
          </text>
        </g>
      ) : null}
      {shiftS !== 0 && p > 0.3 ? (
        <g>
          <path d={toPath(s, sample(Qs, pLo, pHi))} fill="none" stroke={COLORS.alt} strokeWidth={2.6} strokeDasharray="8 7" opacity={0.5} />
          <text x={s.px(Qs(pHi)) + 20} y={s.py(pHi) - 14} fill={COLORS.alt} fontFamily={FONT} fontSize={23} opacity={0.75}>
            S₀
          </text>
        </g>
      ) : null}
      {qLo !== 0 ? null : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 弹性                                                            */
/* ------------------------------------------------------------------ */

/**
 * 弹性对比：两条需求曲线（陡 = 缺乏弹性、平 = 富有弹性）在同一价格处比较，
 * 数值算出点弹性 ε = (dQ/dP)(P/Q)，并给出"富有弹性时降价增收"的总收益矩形。
 * 覆盖 Elasticity of demand。
 */
export const Elasticity: React.FC<{
  s: Scale;
  /** 需求：价格 → 数量。 */
  Qd: (p: number) => number;
  /** 参考价格。 */
  p0: number;
  /** 对比的第二条需求曲线（可选）。 */
  Qd2?: (p: number) => number;
  color?: ColorRole | string;
  /** 是否画总收益矩形 P×Q。 */
  showRevenue?: boolean;
  progress?: number;
}> = ({ s, Qd, p0, Qd2, color = COLORS.primary, showRevenue = true, progress = 1 }) => {
  const p = clamp01(progress);
  const [pLo, pHi] = s.yDomain;
  const eps = 0.01;
  const q0 = Qd(p0);
  const slope = (Qd(p0 + eps) - Qd(p0 - eps)) / (2 * eps);
  const elast = slope * (p0 / Math.max(q0, 1e-9));
  const label = Math.abs(elast) > 1 ? 'elastic' : Math.abs(elast) < 1 ? 'inelastic' : 'unit elastic';
  return (
    <g>
      <path
        d={toPath(s, sample(Qd, pLo, pHi))}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {Qd2 ? (
        // 虚线条件不能同时用 pathLength+strokeDasharray 做绘入（抢同一个属性），
        // 改成按 progress 截断采样
        <path
          d={toPath(s, sample(Qd2, pLo, pHi).slice(0, Math.max(2, Math.round(200 * p))))}
          fill="none"
          stroke={COLORS.alt}
          strokeWidth={4}
          strokeDasharray="10 7"
        />
      ) : null}
      <circle cx={s.px(q0)} cy={s.py(p0)} r={8} fill={COLORS.accent} />
      {showRevenue && p > 0.4 ? (
        <polygon
          points={poly(s, [
            [0, 0],
            [q0, 0],
            [q0, p0],
            [0, p0],
          ])}
          fill={alpha(COLORS.accent, 0.16)}
        />
      ) : null}
      {p > 0.5 ? (
        <text
          x={s.px(q0) + 20}
          y={s.py(p0) - 20}
          fill={COLORS.accent}
          fontFamily={FONT}
          fontSize={28}
          fontWeight={700}
        >
          {`ε = ${elast.toFixed(2)} (${label})`}
        </text>
      ) : null}
      {showRevenue && p > 0.6 ? (
        <text
          x={s.px(q0 / 2)}
          y={s.py(p0 / 2)}
          fill={COLORS.textStrong}
          fontFamily={FONT}
          fontSize={26}
          textAnchor="middle"
        >
          {`R = ${(p0 * q0).toFixed(0)}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 税收楔形                                                        */
/* ------------------------------------------------------------------ */

/**
 * 税收楔形：从量税 t 把供给曲线上移，形成消费者价 Pc 与生产者价 Pp 之间的楔形。
 * 税负归宿由供需斜率决定（弹性小的一侧承担更多），税收收入 = t × Qt 矩形，
 * 无谓损失 = 交易量损失对应的三角。覆盖 Tax burden incidence / Deadweight loss。
 */
export const TaxWedge: React.FC<{
  s: Scale;
  Qd: (p: number) => number;
  Qs: (p: number) => number;
  /** 从量税（价格单位）。 */
  t: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, Qd, Qs, t, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [pLo, pHi] = s.yDomain;
  // 无税均衡
  const eq0 = intersect(Qd, Qs, pLo, pHi);
  // 有税：消费者面对的供给 = Qs(Pc - t)
  const eqC = intersect(Qd, (pp: number) => Qs(pp - t), pLo, pHi + t);
  if (eq0 === null || eqC === null) return null;
  const Pp = eqC - t;
  const Q0 = Qd(eq0);
  const Q1 = Qd(eqC);
  const burdenC = eqC - eq0;
  const burdenP = eq0 - Pp;
  return (
    <g>
      <path d={toPath(s, sample(Qd, pLo, pHi + t))} fill="none" stroke={color} strokeWidth={4.2} />
      <path d={toPath(s, sample(Qs, pLo, pHi))} fill="none" stroke={COLORS.alt} strokeWidth={4.2} />
      <path
        d={toPath(s, sample((pp: number) => Qs(pp - t), pLo + t, pHi + t))}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={3.4}
        strokeDasharray="9 7"
      />
      {p > 0.35 ? (
        <g>
          {/* 楔形：Pp 到 Pc 之间、0 到 Q1 */}
          <polygon
            points={poly(s, [
              [0, Pp],
              [Q1, Pp],
              [Q1, eqC],
              [0, eqC],
            ])}
            fill={alpha(COLORS.warn, 0.14)}
          />
          <line x1={s.px(0)} y1={s.py(eqC)} x2={s.px(Q1)} y2={s.py(eqC)} stroke={COLORS.warn} strokeWidth={3} />
          <line x1={s.px(0)} y1={s.py(Pp)} x2={s.px(Q1)} y2={s.py(Pp)} stroke={COLORS.accent} strokeWidth={3} />
          <text x={s.px(0) - 14} y={s.py(eqC) + 9} fill={COLORS.warn} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="end">
            {`P_c = ${eqC.toFixed(2)}`}
          </text>
          <text x={s.px(0) - 14} y={s.py(Pp) + 9} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="end">
            {`P_p = ${Pp.toFixed(2)}`}
          </text>
        </g>
      ) : null}
      {p > 0.55 ? (
        <g>
          {/* 税收收入矩形 */}
          <polygon
            points={poly(s, [
              [0, Pp],
              [Q1, Pp],
              [Q1, eqC],
              [0, eqC],
            ])}
            fill={alpha(COLORS.result, 0.2)}
          />
          <text x={s.px(Q1 / 2)} y={s.py((Pp + eqC) / 2)} fill={COLORS.result} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
            {`tax revenue = ${(t * Q1).toFixed(0)}`}
          </text>
        </g>
      ) : null}
      {p > 0.7 ? (
        <g>
          {/* 无谓损失三角 */}
          <polygon
            points={poly(s, [
              [Q1, Qd === null ? Pp : Pp],
              [Q0, Q0 === Q1 ? Pp : eq0],
              [Q1, eq0],
            ])}
            fill={alpha(COLORS.warn, 0.3)}
          />
          <text x={s.px((Q0 + Q1) / 2)} y={s.py(eq0) + 34} fill={COLORS.warn} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
            {`DWL = ${(0.5 * t * (Q0 - Q1)).toFixed(0)}`}
          </text>
          <text
            x={s.px(Q0) + 20}
            y={s.py(eq0) - 24}
            fill={COLORS.textStrong}
            fontFamily={FONT}
            fontSize={26}
          >
            {`burden: consumer ${burdenC.toFixed(2)} / producer ${burdenP.toFixed(2)}`}
          </text>
        </g>
      ) : null}
      {p > 0.4 ? (
        <text x={s.px(Q1)} y={s.py(0) - 18} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25} textAnchor="middle">
          {`Q ${Q0.toFixed(0)} → ${Q1.toFixed(0)}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 无谓损失（独立）                                                */
/* ------------------------------------------------------------------ */

/**
 * 独立的无谓损失三角：给定社会最优量 Q* 与实际量 Q1，以及两条边际曲线
 * （需求 = 边际社会收益、供给 = 边际社会成本），画出损失掉的那一块。
 * 用于价格管制、配额、垄断等"偏离最优量"的所有场合。
 */
export const DeadweightLoss: React.FC<{
  s: Scale;
  /** 边际收益曲线（价格 → 数量）。 */
  MB: (p: number) => number;
  /** 边际成本曲线。 */
  MC: (p: number) => number;
  /** 实际交易量。 */
  Q1: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, MB, MC, Q1, color = COLORS.warn, progress = 1 }) => {
  const p = clamp01(progress);
  const [pLo, pHi] = s.yDomain;
  const eqP = intersect(MB, MC, pLo, pHi);
  if (eqP === null) return null;
  const Q0 = MB(eqP);
  // 在 Q1 处的 MB 与 MC 价格（反解）
  const pMB = solveAt(MB, Q1, pLo, pHi);
  const pMC = solveAt(MC, Q1, pLo, pHi);
  if (pMB === null || pMC === null) return null;
  const area = 0.5 * Math.abs(pMB - pMC) * Math.abs(Q0 - Q1);
  return (
    <g>
      <path d={toPath(s, sample(MB, pLo, pHi))} fill="none" stroke={COLORS.primary} strokeWidth={4} />
      <path d={toPath(s, sample(MC, pLo, pHi))} fill="none" stroke={COLORS.alt} strokeWidth={4} />
      {p > 0.5 ? (
        <g>
          <polygon
            points={poly(s, [
              [Q1, pMC],
              [Q0, eqP],
              [Q1, pMB],
            ])}
            fill={alpha(color, 0.32)}
            stroke={color}
            strokeWidth={2.6}
          />
          <text
            x={s.px((Q0 + Q1) / 2)}
            y={s.py((pMB + pMC) / 2) + 8}
            fill={color}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
            textAnchor="middle"
          >
            {`DWL = ${area.toFixed(0)}`}
          </text>
          <line x1={s.px(Q1)} y1={s.py(pMC)} x2={s.px(Q1)} y2={s.py(pMB)} stroke={color} strokeWidth={3} />
          <text x={s.px(Q1)} y={s.py(0) - 18} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25} textAnchor="middle">
            {`Q₁ = ${Q1.toFixed(0)}`}
          </text>
          <text x={s.px(Q0)} y={s.py(0) - 18} fill={COLORS.result} fontFamily={FONT} fontSize={25} textAnchor="middle">
            {`Q* = ${Q0.toFixed(0)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 预算线与无差异曲线                                              */
/* ------------------------------------------------------------------ */

/**
 * 预算线与无差异曲线：预算线由收入与两价给出（斜率 = −Px/Py），无差异曲线
 * 由效用函数取等值线（U(x,y)=ū），最优在切点（MRS = Px/Py）。
 * 覆盖 Maximize consumer utility。
 */
export const BudgetIndifference: React.FC<{
  s: Scale;
  /** 效用函数（数域 x, y → 效用）。 */
  U: (x: number, y: number) => number;
  /** 预算线：给定 x 数量的商品，返回能买的 y 数量。 */
  budget: (x: number) => number;
  /** 要画的无差异曲线效用水平。 */
  levels: number[];
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, U, budget, levels, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [x0, x1] = s.xDomain;
  const [y0, y1] = s.yDomain;
  // 预算线上效用最高的点（黄金分割搜索）
  let a = x0;
  let b = x1;
  const gr = 0.618;
  for (let i = 0; i < 80; i++) {
    const c = b - (b - a) * gr;
    const d = a + (b - a) * gr;
    const yc = budget(c);
    const yd = budget(d);
    if (yc < y0 || yd < y0) break;
    if (U(c, yc) > U(d, yd)) b = d;
    else a = c;
  }
  const xOpt = (a + b) / 2;
  const yOpt = budget(xOpt);
  const uOpt = U(xOpt, yOpt);

  // 无差异曲线：对每个水平，扫描 x 求 y（二分）
  const iso = (level: number): [number, number][] => {
    const out: [number, number][] = [];
    const n = 120;
    for (let i = 0; i <= n; i++) {
      const x = x0 + ((x1 - x0) * i) / n;
      const r = solveAt((yy: number) => U(x, yy), level, y0, y1);
      if (r !== null) out.push([x, r]);
    }
    return out;
  };
  return (
    <g>
      <path
        d={toPath(s, sample(budget, x0, x1).filter((q) => q[1] >= y0))}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.2}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <text x={s.px(x1) + 12} y={s.py(budget(x1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        budget
      </text>
      {levels.map((lv, i) => {
        const pts = iso(lv);
        if (pts.length < 2) return null;
        const on = Math.abs(lv - uOpt) < Math.abs(uOpt) * 0.02;
        return (
          <path
            key={i}
            d={toPath(s, pts)}
            fill="none"
            stroke={on ? COLORS.result : color}
            strokeWidth={on ? 4.4 : 3}
            opacity={p > (i + 1) / (levels.length + 1) ? 1 : 0.2}
          />
        );
      })}
      {p > 0.6 ? (
        <g>
          <circle cx={s.px(xOpt)} cy={s.py(yOpt)} r={9} fill={COLORS.result} />
          <text
            x={s.px(xOpt) + 20}
            y={s.py(yOpt) - 20}
            fill={COLORS.result}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
          >
            {`optimal (${xOpt.toFixed(1)}, ${yOpt.toFixed(1)})`}
          </text>
          <text
            x={s.px(xOpt) + 20}
            y={s.py(yOpt) + 22}
            fill={COLORS.textMuted}
            fontFamily={FONT}
            fontSize={24}
          >
            {`U = ${uOpt.toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 成本曲线族                                                      */
/* ------------------------------------------------------------------ */

/**
 * 成本曲线族：MC / ATC / AVC / AFC，标出 MC 与 ATC、AVC 的交点（最低点），
 * 并给出当前产量下的 ATC。覆盖 Cost curve / Manufacturer's output decisions。
 */
export const CostCurves: React.FC<{
  s: Scale;
  MC: (q: number) => number;
  ATC: (q: number) => number;
  AVC?: (q: number) => number;
  /** 当前产量（画竖直参考线）。 */
  q?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, MC, ATC, AVC, q, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [q0, q1] = s.xDomain;
  const mcPts = sample(MC, q0, q1);
  const atcPts = sample(ATC, q0, q1);
  const avcPts = AVC ? sample(AVC, q0, q1) : null;
  // MC 与 ATC 的交点
  const qMinATC = intersect(MC, ATC, q0, q1);
  const qMinAVC = AVC ? intersect(MC, AVC, q0, q1) : null;
  return (
    <g>
      <path
        d={toPath(s, mcPts)}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, atcPts)}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.2}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {avcPts ? (
        <path
          d={toPath(s, avcPts)}
          fill="none"
          stroke={COLORS.accent}
          strokeWidth={3.6}
          strokeDasharray="10 7"
          opacity={p}
        />
      ) : null}
      <text x={s.px(q1) + 12} y={s.py(MC(q1)) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        MC
      </text>
      <text x={s.px(q1) + 12} y={s.py(ATC(q1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        ATC
      </text>
      {qMinATC !== null && p > 0.6 ? (
        <g>
          <circle cx={s.px(qMinATC)} cy={s.py(ATC(qMinATC))} r={8} fill={COLORS.result} />
          <text
            x={s.px(qMinATC)}
            y={s.py(ATC(qMinATC)) + 40}
            fill={COLORS.result}
            fontFamily={FONT}
            fontSize={25}
            textAnchor="middle"
          >
            {`min ATC at q = ${qMinATC.toFixed(1)}`}
          </text>
        </g>
      ) : null}
      {qMinAVC !== null && AVC && p > 0.7 ? (
        <g>
          <circle cx={s.px(qMinAVC)} cy={s.py(AVC(qMinAVC))} r={7} fill={COLORS.warn} />
          <text
            x={s.px(qMinAVC)}
            y={s.py(AVC(qMinAVC)) - 22}
            fill={COLORS.warn}
            fontFamily={FONT}
            fontSize={24}
            textAnchor="middle"
          >
            {`shutdown ${qMinAVC.toFixed(1)}`}
          </text>
        </g>
      ) : null}
      {q !== undefined && p > 0.4 ? (
        <g>
          <line
            x1={s.px(q)}
            y1={s.py(s.yDomain[0])}
            x2={s.px(q)}
            y2={s.py(ATC(q))}
            stroke={COLORS.textDim}
            strokeWidth={2.6}
            strokeDasharray="7 6"
          />
          <text x={s.px(q)} y={s.py(ATC(q)) - 20} fill={COLORS.textStrong} fontFamily={FONT} fontSize={25} textAnchor="middle">
            {`ATC(${q.toFixed(0)}) = ${ATC(q).toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 7. MR = MC 的产量决策                                              */
/* ------------------------------------------------------------------ */

/**
 * 产量决策：需求 D、边际收益 MR、边际成本 MC 三条曲线，MR=MC 定产量，
 * 再由需求曲线定价格；利润矩形 = (P − ATC) × Q。
 * market='competition' 时 P = MR（水平需求），'monopoly' 时 MR 在 D 之下。
 * 覆盖 Perfect competition / Monopoly pricing / Manufacturer's output decisions。
 */
export const ProfitMax: React.FC<{
  s: Scale;
  /** 需求：价格 → 数量。 */
  D: (p: number) => number;
  /** 边际收益：价格 → 数量。 */
  MR: (p: number) => number;
  /** 边际成本：价格 → 数量。 */
  MC: (p: number) => number;
  /** 平均总成本：价格 → 数量。 */
  ATC?: (p: number) => number;
  market?: 'competition' | 'monopoly';
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, D, MR, MC, ATC, market = 'monopoly', color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [pLo, pHi] = s.yDomain;
  const eqP = intersect(MR, MC, pLo, pHi);
  if (eqP === null) return null;
  const Q = MR(eqP);
  const price = solveAt(D, Q, pLo, pHi);
  const atcP = ATC ? solveAt(ATC, Q, pLo, pHi) : null;
  const profit = price !== null && atcP !== null ? (price - atcP) * Q : null;
  return (
    <g>
      <path d={toPath(s, sample(D, pLo, pHi))} fill="none" stroke={color} strokeWidth={4.4} />
      <path d={toPath(s, sample(MR, pLo, pHi))} fill="none" stroke={COLORS.accent} strokeWidth={4} strokeDasharray="11 7" />
      <path d={toPath(s, sample(MC, pLo, pHi))} fill="none" stroke={COLORS.alt} strokeWidth={4.4} />
      {ATC ? (
        <path d={toPath(s, sample(ATC, pLo, pHi))} fill="none" stroke={COLORS.textDim} strokeWidth={3.4} />
      ) : null}
      <text x={s.px(s.xDomain[1]) + 12} y={s.py(D(pHi)) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        D
      </text>
      <text x={s.px(s.xDomain[1]) + 12} y={s.py(MR(pHi)) + 8} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700}>
        MR
      </text>
      <text x={s.px(s.xDomain[1]) + 12} y={s.py(MC(pHi)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        MC
      </text>
      {p > 0.5 ? (
        <g>
          <line x1={s.px(Q)} y1={s.py(0)} x2={s.px(Q)} y2={s.py(eqP)} stroke={COLORS.result} strokeWidth={2.8} strokeDasharray="7 6" />
          <circle cx={s.px(Q)} cy={s.py(eqP)} r={8} fill={COLORS.result} />
          <text x={s.px(Q) + 18} y={s.py(eqP) - 18} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700}>
            {`MR = MC at Q = ${Q.toFixed(1)}`}
          </text>
          {price !== null ? (
            <g>
              <circle cx={s.px(Q)} cy={s.py(price)} r={8} fill={color} />
              <text x={s.px(Q) + 18} y={s.py(price) + 30} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
                {`P = ${price.toFixed(2)}`}
              </text>
            </g>
          ) : null}
        </g>
      ) : null}
      {profit !== null && atcP !== null && price !== null && p > 0.75 ? (
        <g>
          <polygon
            points={poly(s, [
              [0, atcP],
              [Q, atcP],
              [Q, price],
              [0, price],
            ])}
            fill={profit >= 0 ? alpha(COLORS.result, 0.22) : alpha(COLORS.warn, 0.28)}
          />
          <text
            x={s.px(Q / 2)}
            y={s.py((atcP + price) / 2)}
            fill={profit >= 0 ? COLORS.result : COLORS.warn}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
            textAnchor="middle"
          >
            {`profit = ${profit.toFixed(0)}`}
          </text>
        </g>
      ) : null}
      {p > 0.85 ? (
        <text x={s.px(s.xDomain[0]) + 20} y={s.py(pHi) - 20} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
          {market === 'monopoly' ? 'monopoly: P > MR, P > MC' : 'competition: P = MR = MC'}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 8. 剩余与总福利                                                    */
/* ------------------------------------------------------------------ */

/**
 * 消费者剩余与生产者剩余：均衡价以上的需求三角是 CS，以下是 PS，
 * 并给出总福利 = CS + PS（有税时再减去 DWL）。覆盖 Market welfare。
 */
export const SurplusAreas: React.FC<{
  s: Scale;
  Qd: (p: number) => number;
  Qs: (p: number) => number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, Qd, Qs, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [pLo, pHi] = s.yDomain;
  const eqP = intersect(Qd, Qs, pLo, pHi);
  if (eqP === null) return null;
  const Q = Qd(eqP);
  // 需求曲线在 Q→0 处的价格（保留价格）
  const pMax = solveAt(Qd, 0, pLo, pHi * 3) ?? pHi;
  const pMin = solveAt(Qs, 0, pLo, pHi) ?? pLo;
  const CS = 0.5 * Q * (pMax - eqP);
  const PS = 0.5 * Q * (eqP - pMin);
  return (
    <g>
      <path d={toPath(s, sample(Qd, pLo, pMax))} fill="none" stroke={color} strokeWidth={4.4} />
      <path d={toPath(s, sample(Qs, pMin, pHi))} fill="none" stroke={COLORS.alt} strokeWidth={4.4} />
      {p > 0.45 ? (
        <polygon
          points={poly(s, [
            [0, eqP],
            [Q, eqP],
            [0, pMax],
          ])}
          fill={alpha(color, 0.22)}
        />
      ) : null}
      {p > 0.6 ? (
        <polygon
          points={poly(s, [
            [0, eqP],
            [Q, eqP],
            [0, pMin],
          ])}
          fill={alpha(COLORS.alt, 0.22)}
        />
      ) : null}
      {p > 0.5 ? (
        <text x={s.px(Q * 0.28)} y={s.py((eqP + pMax) / 2)} fill={color} fontFamily={FONT} fontSize={27} fontWeight={700}>
          {`CS = ${CS.toFixed(0)}`}
        </text>
      ) : null}
      {p > 0.65 ? (
        <text x={s.px(Q * 0.28)} y={s.py((eqP + pMin) / 2)} fill={COLORS.alt} fontFamily={FONT} fontSize={27} fontWeight={700}>
          {`PS = ${PS.toFixed(0)}`}
        </text>
      ) : null}
      {p > 0.8 ? (
        <text
          x={s.px(s.xDomain[1]) - 20}
          y={s.py(pHi) - 20}
          fill={COLORS.result}
          fontFamily={FONT}
          fontSize={29}
          fontWeight={700}
          textAnchor="end"
        >
          {`total welfare = ${(CS + PS).toFixed(0)}`}
        </text>
      ) : null}
    </g>
  );
};
