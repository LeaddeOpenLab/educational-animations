import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';

/**
 * Fin.tsx — Financial Markets 的 L2 学科原语。
 *
 * ⚠️ 本课是 finance-cn 主题，**角色语义被重载**：
 *   primary = 涨 / 正收益（红）    result = 跌 / 负收益（绿）
 * 这是中国内地市场约定，与美欧相反。本文件的涨跌幅、盈亏一律按此取色，
 * **不要照抄别的 kit 里"绿涨红跌"的直觉**。warn 借用天蓝表示"需注意但非坏事"。
 *
 * 覆盖 12 个知识点反复出现的图形：风险-收益前沿与资本市场线、分散化曲线、
 * 现金流时间轴与现值、收益率曲线与形状判定、债券价格-收益率的凸性、
 * 有效市场假说下的价格反应、前景理论的价值函数、期权到期收益与希腊字母、
 * 杠杆对 ROE 的放大、订单簿与买卖价差、危机传染网络。
 *
 * 写法遵循 edu-video-kit §5：现值、久期、Delta、组合波动率一律由函数算出；
 * 颜色只取 COLORS 角色，透明一律 alpha()。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 在 [a,b] 上求 f(x)=g(x)（二分）。 */
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

const sample = (f: (x: number) => number, a: number, b: number, n = 200): [number, number][] => {
  const out: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    out.push([x, f(x)]);
  }
  return out;
};

const toPath = (s: Scale, pts: [number, number][]): string =>
  pts.length
    ? 'M ' + pts.map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' L ')
    : '';

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
/* 求解器                                                             */
/* ------------------------------------------------------------------ */

/** 组合波动率：n 个等权资产、两两相关系数 ρ、单个波动率 σ。 */
export const portfolioSigma = (n: number, sigma: number, rho: number): number =>
  sigma * Math.sqrt(1 / n + ((n - 1) / n) * rho);

/** 债券价格：面值 F、票面利率 c（年）、到期年数 T、到期收益率 y（按年计）。 */
export const bondPrice = (F: number, c: number, T: number, y: number, freq = 1): number => {
  let pv = 0;
  const n = Math.round(T * freq);
  const coupon = (F * c) / freq;
  for (let i = 1; i <= n; i++) pv += coupon / Math.pow(1 + y / freq, i);
  pv += F / Math.pow(1 + y / freq, n);
  return pv;
};

/** 麦考利久期（年）。 */
export const duration = (F: number, c: number, T: number, y: number, freq = 1): number => {
  const n = Math.round(T * freq);
  const coupon = (F * c) / freq;
  let wsum = 0;
  let pv = 0;
  for (let i = 1; i <= n; i++) {
    const cf = coupon + (i === n ? F : 0);
    const d = cf / Math.pow(1 + y / freq, i);
    wsum += (i / freq) * d;
    pv += d;
  }
  return pv === 0 ? 0 : wsum / pv;
};

/** 布莱克-舒尔斯的看涨 Delta：N(d1)。 */
export const bsDelta = (S: number, K: number, T: number, r: number, sigma: number, q = 0): number => {
  const ncdf = (x: number): number => {
    // Abramowitz-Stegun 近似
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp((-x * x) / 2);
    const p =
      d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  };
  if (T <= 0) return S > K ? 1 : 0;
  const d1 =
    (Math.log(S / K) + (r - q + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
  return ncdf(d1);
};

/* ------------------------------------------------------------------ */
/* 1. 风险-收益前沿                                                   */
/* ------------------------------------------------------------------ */

/**
 * 风险-收益图：横轴波动率 σ、纵轴期望收益 μ。画出可行集的上缘（有效前沿）、
 * 无风险利率出发的资本市场线（CML）、投资者的无差异曲线，并标出切点组合。
 * 覆盖 Risk-return relationship / Portfolio diversification 的最优组合层。
 */
export const RiskReturn: React.FC<{
  s: Scale;
  /** 有效前沿：给定 σ 返回前沿上最高的 μ。 */
  frontier: (sigma: number) => number;
  /** 无风险利率。 */
  rf: number;
  /** 投资者无差异曲线（给定 μ 与 σ 返回效用；画等值线）。 */
  utility?: (mu: number, sigma: number) => number;
  /** 要画的无差异水平。 */
  levels?: number[];
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, frontier, rf, utility, levels = [], color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [s0, s1] = s.xDomain;
  const [m0, m1] = s.yDomain;
  // 资本市场线：从 (0, rf) 出发与前沿相切
  const sharpe = (sg: number): number => (frontier(sg) - rf) / Math.max(sg, 1e-9);
  let bestS = s0;
  let best = -Infinity;
  for (let i = 0; i <= 400; i++) {
    const sg = s0 + ((s1 - s0) * i) / 400;
    const v = sharpe(sg);
    if (v > best) {
      best = v;
      bestS = sg;
    }
  }
  const tangency = bestS > s0 + 1e-6 ? bestS : null;
  // 无差异曲线：对每个水平，扫描 σ 求 μ
  const iso = (level: number): [number, number][] => {
    if (!utility) return [];
    const out: [number, number][] = [];
    for (let i = 0; i <= 120; i++) {
      const sg = s0 + ((s1 - s0) * i) / 120;
      const r = intersect((mu: number) => utility(mu, sg), () => level, m0, m1);
      if (r !== null) out.push([sg, r]);
    }
    return out;
  };
  return (
    <g>
      <path
        d={toPath(s, sample(frontier, Math.max(s0, 0.02), s1))}
        fill="none"
        stroke={color}
        strokeWidth={4.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <circle cx={s.px(0)} cy={s.py(rf)} r={8} fill={COLORS.accent} />
      <text x={s.px(0) - 14} y={s.py(rf) + 9} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="end">
        {`r_f = ${rf.toFixed(2)}`}
      </text>
      {tangency !== null && p > 0.45 ? (
        <g>
          <line
            x1={s.px(0)}
            y1={s.py(rf)}
            x2={s.px(s1)}
            y2={s.py(rf + best * s1)}
            stroke={COLORS.result}
            strokeWidth={3.4}
            strokeDasharray="11 7"
          />
          <circle cx={s.px(tangency)} cy={s.py(frontier(tangency))} r={9} fill={COLORS.result} />
          <text
            x={s.px(tangency) + 18}
            y={s.py(frontier(tangency)) - 20}
            fill={COLORS.result}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
          >
            {`tangency σ = ${tangency.toFixed(2)}, μ = ${frontier(tangency).toFixed(2)}`}
          </text>
          <text
            x={s.px(tangency) + 18}
            y={s.py(frontier(tangency)) + 22}
            fill={COLORS.textMuted}
            fontFamily={FONT}
            fontSize={24}
          >
            {`Sharpe = ${best.toFixed(2)}`}
          </text>
        </g>
      ) : null}
      {utility
        ? levels.map((lv, i) => {
            const pts = iso(lv);
            if (pts.length < 2) return null;
            return (
              <path
                key={i}
                d={toPath(s, pts)}
                fill="none"
                stroke={COLORS.alt}
                strokeWidth={3}
                strokeDasharray="8 7"
                opacity={p > (i + 1) / (levels.length + 1) ? 0.9 : 0.2}
              />
            );
          })
        : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 分散化                                                          */
/* ------------------------------------------------------------------ */

/**
 * 分散化曲线：横轴资产数量、纵轴组合波动率。曲线由 portfolioSigma 算出，
 * 可叠加不同相关系数 ρ 的对比曲线，显示"ρ 越低分散化收益越大"。
 * 覆盖 Portfolio diversification。
 */
export const Diversification: React.FC<{
  s: Scale;
  /** 单个资产波动率。 */
  sigma: number;
  /** 要画的相关系数（多条对比）。 */
  rhos?: number[];
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, sigma, rhos = [0.2, 0.6], color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [n0, n1] = s.xDomain;
  const palette = [color, COLORS.alt, COLORS.accent, COLORS.warn];
  return (
    <g>
      {/* 不可分散的系统性风险下限：σ√ρ */}
      {rhos.map((rho, i) => {
        const pts = sample((n: number) => portfolioSigma(Math.max(n, 1), sigma, rho), n0, n1, 160);
        return (
          <g key={i}>
            <path
              d={toPath(s, pts)}
              fill="none"
              stroke={palette[i % palette.length]}
              strokeWidth={4.2}
              pathLength={1000}
              strokeDasharray={1000}
              strokeDashoffset={1000 * (1 - p)}
            />
            {p > 0.7 ? (
              <text
                x={s.px(n1) + 12}
                y={s.py(portfolioSigma(n1, sigma, rho)) + 8}
                fill={palette[i % palette.length]}
                fontFamily={FONT}
                fontSize={25}
                fontWeight={700}
              >
                {`ρ = ${rho.toFixed(2)}`}
              </text>
            ) : null}
            <line
              x1={s.px(n0)}
              y1={s.py(sigma * Math.sqrt(Math.max(rho, 0)))}
              x2={s.px(n1)}
              y2={s.py(sigma * Math.sqrt(Math.max(rho, 0)))}
              stroke={palette[i % palette.length]}
              strokeWidth={2}
              strokeDasharray="6 6"
              opacity={0.45}
            />
          </g>
        );
      })}
      {p > 0.6 ? (
        <text x={s.px(n0) + 20} y={s.py(2)} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
          {`single-asset σ = ${sigma.toFixed(2)}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 现金流时间轴                                                    */
/* ------------------------------------------------------------------ */

/**
 * 现金流时间轴：各期现金流箭头（正向上 result 绿？——注意本课 primary=涨，
 * 收到现金用 primary、付出现金用 result），配折现后的现值条与 NPV 数值。
 * 现值由贴现函数算出。覆盖 Present value。
 */
export const CashFlowTimeline: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 各期现金流（第 0 期通常是初始投入，为负）。 */
  flows: number[];
  /** 贴现率。 */
  rate: number;
  /** 是否同时画折现后的现值条。 */
  showPV?: boolean;
  showTotal?: boolean;
  pvDecimals?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, flows, rate, showPV = true, showTotal = true, pvDecimals = 0, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const n = flows.length;
  const gap = n > 1 ? w / (n - 1) : w;
  const maxAbs = Math.max(...flows.map(Math.abs), 1);
  const pv = (i: number): number => flows[i] / Math.pow(1 + rate, i);
  const npv = flows.reduce((s, _f, i) => s + pv(i), 0);
  const shown = Math.max(1, Math.round(n * p));
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={COLORS.axis} strokeWidth={3} />
      {flows.slice(0, shown).map((f, i) => {
        const cx = x + i * gap;
        const h = (Math.abs(f) / maxAbs) * 150;
        const up = f >= 0;
        // 本课角色重载：收到（正）用 primary 红，付出（负）用 result 绿
        const c = up ? color : COLORS.result;
        return (
          <g key={i}>
            <line x1={cx} y1={y} x2={cx} y2={up ? y - h : y + h} stroke={c} strokeWidth={4.5} />
            <polygon points={headPts(cx, up ? y - h : y + h, up ? 90 : -90, 15)} fill={c} />
            <text
              x={cx}
              y={up ? y - h - 20 : y + h + 40}
              fill={c}
              fontFamily={FONT}
              fontSize={26}
              fontWeight={700}
              textAnchor="middle"
            >
              {`${f > 0 ? '+' : ''}${f.toFixed(0)}`}
            </text>
            <text x={cx} y={y + 26} fill={COLORS.textDim} fontFamily={FONT} fontSize={22} textAnchor="middle">
              {`t=${i}`}
            </text>
            {showPV ? (
              <text
                x={cx}
                y={up ? y - h - 54 : y + h + 74}
                fill={COLORS.accent}
                fontFamily={FONT}
                fontSize={23}
                textAnchor="middle"
              >
                {`PV ${pv(i).toFixed(pvDecimals)}`}
              </text>
            ) : null}
          </g>
        );
      })}
      {showTotal && p > 0.85 ? (
        <text
          x={x + w + 30}
          y={y + 10}
          fill={npv >= 0 ? COLORS.primary : COLORS.result}
          fontFamily={FONT}
          fontSize={30}
          fontWeight={700}
        >
          {`NPV = ${npv.toFixed(0)} @ ${(rate * 100).toFixed(1)}%`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 收益率曲线                                                      */
/* ------------------------------------------------------------------ */

/**
 * 收益率曲线：期限 → 收益率，并判定形状（normal 向上倾斜 / inverted 倒挂 /
 * flat 平坦）。可叠加另一期（如一年后）的曲线对比。
 * 覆盖 Yield curve。
 */
export const YieldCurve: React.FC<{
  s: Scale;
  /** 期限 → 收益率（小数）。 */
  yc: (t: number) => number;
  /** 对比曲线。 */
  compare?: { yc: (t: number) => number; label: string };
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, yc, compare, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [t0, t1] = s.xDomain;
  const longEnd = yc(t1) - yc(t0);
  const shape = longEnd > 0.0025 ? 'normal (upward sloping)' : longEnd < -0.0025 ? 'inverted' : 'flat';
  return (
    <g>
      <path
        d={toPath(s, sample(yc, t0, t1))}
        fill="none"
        stroke={color}
        strokeWidth={4.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {compare ? (
        <g>
          <path
            d={toPath(s, sample(compare.yc, t0, t1))}
            fill="none"
            stroke={COLORS.alt}
            strokeWidth={3.6}
            strokeDasharray="10 7"
            opacity={p}
          />
          {p > 0.8 ? (
            <text x={s.px(t1) + 12} y={s.py(compare.yc(t1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={24}>
              {compare.label}
            </text>
          ) : null}
        </g>
      ) : null}
      {p > 0.5 ? (
        <g>
          <circle cx={s.px(t1)} cy={s.py(yc(t1))} r={8} fill={color} />
          <text x={s.px(t1) + 12} y={s.py(yc(t1)) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
            {`${(yc(t1) * 100).toFixed(2)}%`}
          </text>
          <text
            x={s.px((t0 + t1) / 2)}
            y={s.py(yc((t0 + t1) / 2)) - 34}
            fill={COLORS.textMuted}
            fontFamily={FONT}
            fontSize={26}
            textAnchor="middle"
          >
            {`${shape}: spread ${(longEnd * 100).toFixed(2)}%`}
          </text>
        </g>
      ) : null}
      <text x={s.px(t0)} y={s.py(s.yDomain[0]) - 20} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        maturity
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 债券价格与久期                                                  */
/* ------------------------------------------------------------------ */

/**
 * 债券价格-收益率：凸性曲线（价格随收益率上升而下降、且是凸的），
 * 在给定收益率处画出久期切线（一阶近似）并标出两者的误差（凸性）。
 * 价格与久期由 bondPrice / duration 算出。覆盖 Bond price。
 */
export const BondPriceCurve: React.FC<{
  s: Scale;
  face: number;
  coupon: number;
  maturity: number;
  /** 当前收益率（切线所在处）。 */
  y0: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, face, coupon, maturity, y0, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [yA, yB] = s.xDomain;
  const price = (y: number): number => bondPrice(face, coupon, maturity, y);
  const D = duration(face, coupon, maturity, y0);
  const p0 = price(y0);
  // 久期一阶近似：ΔP/P ≈ −D·Δy
  const tangent = (y: number): number => p0 * (1 - D * (y - y0));
  return (
    <g>
      <path
        d={toPath(s, sample(price, yA, yB))}
        fill="none"
        stroke={color}
        strokeWidth={4.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <line x1={s.px(face)} y1={s.py(s.yDomain[0])} x2={s.px(face)} y2={s.py(s.yDomain[1])} stroke={COLORS.axis} strokeWidth={2} strokeDasharray="7 7" opacity={0.5} />
      <text x={s.px(face) + 10} y={s.py(s.yDomain[1]) + 30} fill={COLORS.textDim} fontFamily={FONT} fontSize={23}>
        {`par ${face.toFixed(0)}`}
      </text>
      {p > 0.45 ? (
        <g>
          <line
            x1={s.px(yA)}
            y1={s.py(tangent(yA))}
            x2={s.px(yB)}
            y2={s.py(tangent(yB))}
            stroke={COLORS.accent}
            strokeWidth={3}
            strokeDasharray="10 7"
          />
          <circle cx={s.px(y0)} cy={s.py(p0)} r={9} fill={COLORS.accent} />
          <text x={s.px(y0) + 18} y={s.py(p0) - 22} fill={COLORS.accent} fontFamily={FONT} fontSize={27} fontWeight={700}>
            {`P = ${p0.toFixed(2)} at y = ${(y0 * 100).toFixed(2)}%`}
          </text>
          <text x={s.px(y0) + 18} y={s.py(p0) + 26} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
            {`duration D = ${D.toFixed(2)} yrs`}
          </text>
        </g>
      ) : null}
      {p > 0.7 ? (
        <text
          x={s.px(yB) - 20}
          y={s.py(price(yB)) + 44}
          fill={COLORS.result}
          fontFamily={FONT}
          fontSize={25}
          textAnchor="end"
        >
          {`convexity: actual − linear = ${(price(yB) - tangent(yB)).toFixed(2)}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 有效市场下的价格反应                                            */
/* ------------------------------------------------------------------ */

/**
 * 价格对新信息的反应：一条价格路径，在信息到达的瞬间跳到新水平；
 * form 控制三种形式（weak / semi-strong / strong）的对比——半强式下
 * 公开信息立即被消化，之后的漂移为零。覆盖 Efficient market hypothesis。
 */
export const PriceReaction: React.FC<{
  s: Scale;
  /** 信息到达时刻（数域 t）。 */
  at: number;
  /** 信息到达前的价格路径。 */
  before: (t: number) => number;
  /** 信息到达后的价格路径。 */
  after: (t: number) => number;
  /** 若画"低效"对照：价格缓慢调整的路径。 */
  lagged?: (t: number) => number;
  color?: ColorRole | string;
  progress?: number;
  note?: string;
}> = ({ s, at, before, after, lagged, color = COLORS.primary, progress = 1, note }) => {
  const p = clamp01(progress);
  const [t0, t1] = s.xDomain;
  const jump = after(at) - before(at);
  return (
    <g>
      <path
        d={toPath(s, sample(before, t0, at))}
        fill="none"
        stroke={COLORS.textDim}
        strokeWidth={3.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - Math.min(1, p * 2))}
      />
      {p > 0.5 ? (
        <path
          d={toPath(s, sample(after, at, t1))}
          fill="none"
          stroke={color}
          strokeWidth={4.6}
          pathLength={1000}
          strokeDasharray={1000}
          strokeDashoffset={1000 * (1 - Math.max(0, p * 2 - 1))}
        />
      ) : null}
      {lagged ? (
        <path
          d={toPath(s, sample(lagged, at, t1))}
          fill="none"
          stroke={COLORS.warn}
          strokeWidth={3.4}
          strokeDasharray="10 7"
          opacity={p}
        />
      ) : null}
      {p > 0.5 ? (
        <g>
          <line x1={s.px(at)} y1={s.py(s.yDomain[0])} x2={s.px(at)} y2={s.py(s.yDomain[1])} stroke={COLORS.accent} strokeWidth={2.8} strokeDasharray="8 6" />
          <circle cx={s.px(at)} cy={s.py(after(at))} r={9} fill={color} />
          <circle cx={s.px(at)} cy={s.py(before(at))} r={7} fill={COLORS.textDim} />
          <text
            x={s.px(at) + 18}
            y={s.py(after(at)) - 22}
            fill={jump >= 0 ? COLORS.primary : COLORS.result}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
          >
            {`${jump >= 0 ? '+' : ''}${jump.toFixed(2)} (${((jump / before(at)) * 100).toFixed(1)}%)`}
          </text>
          <text x={s.px(at) + 18} y={s.py(before(at)) + 30} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
            news arrives
          </text>
        </g>
      ) : null}
      {note && p > 0.85 ? (
        <text x={s.px(t0) + 20} y={s.py(s.yDomain[1]) - 24} fill={COLORS.textMuted} fontFamily={FONT} fontSize={26}>
          {note}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 7. 前景理论价值函数                                                */
/* ------------------------------------------------------------------ */

/**
 * 前景理论的价值函数：收益区凹、损失区凸，且损失侧更陡（损失厌恶 λ）。
 * 参考点处标出 kink，两侧斜率差即为 λ。覆盖 Behavioral bias。
 */
export const ProspectValue: React.FC<{
  s: Scale;
  /** 风险态度系数 α（<1 = 收益区风险厌恶）。 */
  alpha?: number;
  /** 损失厌恶系数 λ。 */
  lambda?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, alpha = 0.88, lambda = 2.25, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const v = (x: number): number => (x >= 0 ? Math.pow(x, alpha) : -lambda * Math.pow(-x, alpha));
  const [x0, x1] = s.xDomain;
  return (
    <g>
      <line x1={s.px(x0)} y1={s.py(0)} x2={s.px(x1)} y2={s.py(0)} stroke={COLORS.axis} strokeWidth={2.6} />
      <line x1={s.px(0)} y1={s.py(s.yDomain[0])} x2={s.px(0)} y2={s.py(s.yDomain[1])} stroke={COLORS.accent} strokeWidth={2.6} strokeDasharray="8 6" />
      <text x={s.px(0) + 12} y={s.py(s.yDomain[0]) + 34} fill={COLORS.accent} fontFamily={FONT} fontSize={24}>
        reference point
      </text>
      <path
        d={toPath(s, sample(v, 0, x1))}
        fill="none"
        stroke={COLORS.primary}
        strokeWidth={4.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, sample(v, x0, 0))}
        fill="none"
        stroke={COLORS.result}
        strokeWidth={4.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <circle cx={s.px(0)} cy={s.py(0)} r={8} fill={COLORS.textStrong} />
      {p > 0.7 ? (
        <g>
          {/* 损失侧的镜像对照：虚线表示"若无损失厌恶" */}
          <path
            d={toPath(s, sample((x: number) => -Math.pow(Math.max(-x, 0), alpha), x0, 0))}
            fill="none"
            stroke={COLORS.result}
            strokeWidth={2.8}
            strokeDasharray="7 7"
            opacity={0.55}
          />
          <text
            x={s.px(x0) + 20}
            y={s.py(v(x0)) + 34}
            fill={COLORS.result}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
          >
            {`λ = ${lambda.toFixed(2)} (loss aversion)`}
          </text>
          <text x={s.px(x1) - 20} y={s.py(v(x1)) - 26} fill={COLORS.primary} fontFamily={FONT} fontSize={26} textAnchor="end">
            {`gains: concave, α = ${alpha.toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 8. 期权到期收益                                                    */
/* ------------------------------------------------------------------ */

/**
 * 期权到期收益图：call / put / 标的资产 / 卖出期权的多头空头 payoff 折线，
 * 标出盈亏平衡点、行权价与权利金。覆盖 Option expiration gain / Options exposure。
 */
export const OptionPayoff: React.FC<{
  s: Scale;
  showLabels?: boolean;
  /** 'call' 或 'put'。 */
  kind: 'call' | 'put';
  strike: number;
  premium: number;
  /** 'long' 或 'short'。 */
  side?: 'long' | 'short';
  /** 是否叠加标的资产的直线。 */
  showUnderlying?: boolean;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, kind, strike, premium, side = 'long', showUnderlying = true, showLabels = true, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [s0, s1] = s.xDomain;
  const intrinsic = (S: number): number => (kind === 'call' ? Math.max(0, S - strike) : Math.max(0, strike - S));
  const payoff = (S: number): number => (side === 'long' ? intrinsic(S) - premium : premium - intrinsic(S));
  const sign = side === 'long' ? 1 : -1;
  const breakeven = kind === 'call' ? strike + premium * sign : strike - premium * sign;
  return (
    <g>
      <line x1={s.px(s0)} y1={s.py(0)} x2={s.px(s1)} y2={s.py(0)} stroke={COLORS.axis} strokeWidth={2.6} />
      {showUnderlying ? (
        <line
          x1={s.px(s0)}
          y1={s.py(s0 - strike)}
          x2={s.px(s1)}
          y2={s.py(s1 - strike)}
          stroke={COLORS.textDim}
          strokeWidth={2.6}
          strokeDasharray="8 7"
          opacity={0.7}
        />
      ) : null}
      <path
        d={toPath(s, sample(payoff, s0, s1))}
        fill="none"
        stroke={color}
        strokeWidth={4.8}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {showLabels && p > 0.4 ? (
        <g>
          <line x1={s.px(strike)} y1={s.py(s.yDomain[0])} x2={s.px(strike)} y2={s.py(s.yDomain[1])} stroke={COLORS.accent} strokeWidth={2.6} strokeDasharray="8 6" />
          <text x={s.px(strike) + 12} y={s.py(s.yDomain[0]) + 34} fill={COLORS.accent} fontFamily={FONT} fontSize={25} fontWeight={700}>
            {`K = ${strike.toFixed(0)}`}
          </text>
          <line x1={s.px(breakeven)} y1={s.py(0)} x2={s.px(breakeven)} y2={s.py(s.yDomain[0]) + 60} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="6 6" />
          <text x={s.px(breakeven)} y={s.py(0) + 40} fill={COLORS.result} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
            {`B/E ${breakeven.toFixed(0)}`}
          </text>
          <text x={s.px(s1) - 20} y={s.py(payoff(s1)) - 24} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="end">
            {`${side} ${kind}, premium ${premium.toFixed(0)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 9. 希腊字母                                                        */
/* ------------------------------------------------------------------ */

/**
 * Delta 随标的价格变化的曲线（S 形），标出平值处的 Delta ≈ 0.5 与
 * 实值/虚值两端的极限。覆盖 Options exposure。
 */
export const OptionDelta: React.FC<{
  s: Scale;
  showLabels?: boolean;
  strike: number;
  /** 剩余期限（年）。 */
  T: number;
  /** 无风险利率。 */
  r?: number;
  /** 波动率。 */
  vol: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, strike, T, r = 0.03, vol, showLabels = true, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [s0, s1] = s.xDomain;
  return (
    <g>
      <path
        d={toPath(s, sample((S: number) => bsDelta(S, strike, T, r, vol), s0, s1))}
        fill="none"
        stroke={color}
        strokeWidth={4.6}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {showLabels ? <><line x1={s.px(strike)} y1={s.py(0)} x2={s.px(strike)} y2={s.py(1)} stroke={COLORS.accent} strokeWidth={2.6} strokeDasharray="8 6" />
      <text x={s.px(strike) + 12} y={s.py(0.5)} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`ATM Δ ≈ ${bsDelta(strike, strike, T, r, vol).toFixed(2)}`}
      </text>
      </> : null}
      {showLabels && p > 0.7 ? (
        <g>
          <text x={s.px(s1) - 20} y={s.py(0.92)} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25} textAnchor="end">
            {`deep ITM → ${bsDelta(s1, strike, T, r, vol).toFixed(2)}`}
          </text>
          <text x={s.px(s0) + 20} y={s.py(0.1)} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
            {`deep OTM → ${bsDelta(s0, strike, T, r, vol).toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 10. 杠杆                                                           */
/* ------------------------------------------------------------------ */

/**
 * 杠杆：资本结构条（权益 vs 负债）与 ROE 的放大对比——同一资产收益率下，
 * 有杠杆的 ROE 被放大（正向放大用 primary 红、负向放大用 result 绿）。
 * 覆盖 Financial leverage。
 */
export const LeverageBar: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 权益与负债金额。 */
  equity: number;
  debt: number;
  /** 资产收益率（ROA）。 */
  roa: number;
  /** 债务利率。 */
  cost: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, equity, debt, roa, cost, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const total = equity + debt;
  const assets = total;
  const profit = assets * roa - debt * cost;
  const roe = profit / Math.max(equity, 1e-9);
  const unlevered = roa;
  const eW = (equity / total) * w * p;
  const dW = (debt / total) * w * p;
  const gain = roe - unlevered;
  return (
    <g>
      <rect x={x} y={y} width={w} height={62} rx={10} fill={alpha(COLORS.textDim, 0.1)} stroke={COLORS.axis} strokeWidth={2} />
      <rect x={x} y={y} width={eW} height={62} rx={10} fill={alpha(color, 0.5)} stroke={color} strokeWidth={2.6} />
      <rect x={x + eW} y={y} width={dW} height={62} rx={10} fill={alpha(COLORS.warn, 0.5)} stroke={COLORS.warn} strokeWidth={2.6} />
      {eW > 110 ? (
        <text x={x + eW / 2} y={y + 40} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
          equity
        </text>
      ) : null}
      {dW > 90 ? (
        <text x={x + eW + dW / 2} y={y + 40} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
          debt
        </text>
      ) : null}
      {p > 0.5 ? (
        <g>
          <text x={x} y={y + 118} fill={COLORS.textMuted} fontFamily={FONT} fontSize={26}>
            {`D/E = ${(debt / Math.max(equity, 1e-9)).toFixed(2)}`}
          </text>
          <text x={x + 260} y={y + 118} fill={COLORS.textMuted} fontFamily={FONT} fontSize={26}>
            {`ROA = ${(roa * 100).toFixed(1)}%`}
          </text>
          <text
            x={x + 520}
            y={y + 118}
            fill={gain >= 0 ? COLORS.primary : COLORS.result}
            fontFamily={FONT}
            fontSize={30}
            fontWeight={700}
          >
            {`ROE = ${(roe * 100).toFixed(1)}%`}
          </text>
          <text
            x={x + 860}
            y={y + 118}
            fill={gain >= 0 ? COLORS.primary : COLORS.result}
            fontFamily={FONT}
            fontSize={26}
          >
            {`${gain >= 0 ? '+' : ''}${(gain * 100).toFixed(1)} pp from leverage`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 11. 订单簿与流动性                                                 */
/* ------------------------------------------------------------------ */

/**
 * 订单簿深度：买盘（bid）与卖盘（ask）的累积深度梯形，中间是买卖价差，
 * 标出价差宽度与最优买卖价；可叠加一笔大单的市场冲击（被吃掉的档位会高亮）。
 * 覆盖 Market liquidity。
 */
export const OrderBook: React.FC<{
  cx: number;
  cy: number;
  w?: number;
  h?: number;
  /** 买盘档位：价格与数量（从最优价往外）。 */
  bids: { price: number; size: number }[];
  asks: { price: number; size: number }[];
  /** 一笔大单要吃掉的数量：累计到这个量的档位会被高亮，展示市场冲击。 */
 impactSize?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ cx, cy, w = 620, h = 300, bids, asks, impactSize = 0, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const maxSize = Math.max(...bids.concat(asks).map((l) => l.size), 1);
  const bestBid = bids[0]?.price ?? 0;
  const bestAsk = asks[0]?.price ?? 0;
  const spread = bestAsk - bestBid;
  const levels = Math.max(bids.length, asks.length);
  const rowH = h / Math.max(levels, 1);
  let cum = 0;
  const hit = impactSize > 0;
  return (
    <g>
      <line x1={cx} y1={cy - h / 2 - 20} x2={cx} y2={cy + h / 2 + 20} stroke={COLORS.axis} strokeWidth={2.6} />
      {asks.map((l, i) => {
        const bw = (l.size / maxSize) * (w / 2 - 30);
        cum += l.size;
        const eaten = hit && cum <= impactSize;
        return (
          <g key={`a${i}`}>
            <rect x={cx + 8} y={cy - h / 2 + i * rowH} width={bw} height={rowH - 6} rx={4} fill={alpha(COLORS.result, eaten ? 0.75 : 0.35)} />
            <text x={cx + 16} y={cy - h / 2 + i * rowH + rowH / 2 + 7} fill={COLORS.textStrong} fontFamily={FONT} fontSize={22}>
              {`${l.price.toFixed(2)}  ${l.size.toFixed(0)}`}
            </text>
          </g>
        );
      })}
      {(() => {
        cum = 0;
        return bids.map((l, i) => {
          const bw = (l.size / maxSize) * (w / 2 - 30);
          cum += l.size;
          const eaten = hit && cum <= impactSize;
          return (
            <g key={`b${i}`}>
              <rect x={cx - 8 - bw} y={cy + h / 2 - (i + 1) * rowH} width={bw} height={rowH - 6} rx={4} fill={alpha(color, eaten ? 0.75 : 0.35)} />
              <text
                x={cx - 16}
                y={cy + h / 2 - (i + 1) * rowH + rowH / 2 + 7}
                fill={COLORS.textStrong}
                fontFamily={FONT}
                fontSize={22}
                textAnchor="end"
              >
                {`${l.price.toFixed(2)}  ${l.size.toFixed(0)}`}
              </text>
            </g>
          );
        });
      })()}
      {p > 0.5 ? (
        <g>
          <text x={cx} y={cy - h / 2 - 44} fill={COLORS.textMuted} fontFamily={FONT} fontSize={26} textAnchor="middle">
            {`spread = ${spread.toFixed(2)} (${((spread / Math.max(bestBid, 1e-9)) * 10000).toFixed(0)} bp)`}
          </text>
          <text x={cx - w / 2 - 20} y={cy - h / 2 - 44} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="end">
            {`bid ${bestBid.toFixed(2)}`}
          </text>
          <text x={cx + w / 2 + 20} y={cy - h / 2 - 44} fill={COLORS.result} fontFamily={FONT} fontSize={26} fontWeight={700}>
            {`ask ${bestAsk.toFixed(2)}`}
          </text>
        </g>
      ) : null}
      {hit && p > 0.7 ? (
        <text x={cx} y={cy + h / 2 + 62} fill={COLORS.warn} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
          {`market impact: eating ${impactSize.toFixed(0)} moves the price`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 12. 危机传染                                                       */
/* ------------------------------------------------------------------ */

/**
 * 危机传染网络：机构为节点、风险敞口为有向边；违约从一个节点出发沿敞口传播，
 * 按 progress 逐级点亮被传染的节点（并标出损失传导量）。
 * 覆盖 Financial crisis contagion。
 */
export const ContagionNetwork: React.FC<{
  nodes: { id: string; label: string; x: number; y: number; capital?: number }[];
  /** 敞口：from 持有 to 的债务，amount 为规模。 */
  exposures: { from: string; to: string; amount: number }[];
  /** 最先违约的节点 id。 */
  origin: string;
  color?: ColorRole | string;
  progress?: number;
}> = ({ nodes, exposures, origin, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  // 传播：从 origin 出发，损失沿敞口传导，资本被击穿的节点违约
  const loss = new Map<string, number>();
  const failed = new Set<string>([origin]);
  let frontier = [origin];
  while (frontier.length) {
    const next: string[] = [];
    for (const f of frontier) {
      for (const e of exposures.filter((x) => x.to === f)) {
        const holder = byId.get(e.from);
        if (!holder || failed.has(e.from)) continue;
        const acc = (loss.get(e.from) ?? 0) + e.amount;
        loss.set(e.from, acc);
        if ((holder.capital ?? Infinity) <= acc && !failed.has(e.from)) {
          failed.add(e.from);
          next.push(e.from);
        }
      }
    }
    frontier = next;
  }
  const order = [...failed];
  const shown = Math.max(1, Math.round(order.length * p));
  const active = new Set(order.slice(0, shown));
  return (
    <g>
      {exposures.map((e, i) => {
        const a = byId.get(e.from);
        const b = byId.get(e.to);
        if (!a || !b) return null;
        const hot = active.has(e.from) && active.has(e.to);
        return (
          <g key={i}>
            <line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={hot ? COLORS.warn : COLORS.textDim}
              strokeWidth={hot ? 4 : 2.4}
              strokeDasharray={hot ? undefined : '7 7'}
            />
            <text
              x={(a.x + b.x) / 2}
              y={(a.y + b.y) / 2 - 10}
              fill={hot ? COLORS.warn : COLORS.textDim}
              fontFamily={FONT}
              fontSize={21}
              textAnchor="middle"
            >
              {e.amount.toFixed(0)}
            </text>
          </g>
        );
      })}
      {nodes.map((n) => {
        const isFailed = active.has(n.id);
        const lossAmt = loss.get(n.id) ?? 0;
        return (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={42}
              fill={isFailed ? alpha(COLORS.warn, 0.32) : alpha(color, 0.14)}
              stroke={isFailed ? COLORS.warn : color}
              strokeWidth={isFailed ? 4.4 : 3}
            />
            <text x={n.x} y={n.y + 9} fill={COLORS.textStrong} fontFamily={FONT} fontSize={24} fontWeight={700} textAnchor="middle">
              {n.label}
            </text>
            {n.capital !== undefined ? (
              <text x={n.x} y={n.y + 66} fill={isFailed ? COLORS.warn : COLORS.textMuted} fontFamily={FONT} fontSize={21} textAnchor="middle">
                {isFailed ? `loss ${lossAmt.toFixed(0)}` : `capital ${n.capital.toFixed(0)}`}
              </text>
            ) : null}
          </g>
        );
      })}
      {p > 0.85 ? (
        <text
          x={Math.min(...nodes.map((n) => n.x))}
          y={Math.max(...nodes.map((n) => n.y)) + 120}
          fill={COLORS.warn}
          fontFamily={FONT}
          fontSize={29}
          fontWeight={700}
        >
          {`contagion: ${order.length} of ${nodes.length} institutions fail`}
        </text>
      ) : null}
    </g>
  );
};
