import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';

/**
 * Macro.tsx — Principles of Macroeconomics 的 L2 学科原语。
 *
 * 覆盖 8 个知识点反复出现的图形：GDP 支出法构成、经济循环流量图、IS–LM
 * 模型、汇率的供需均衡、国际收支双栏、索洛增长模型的稳态、菲利普斯曲线
 * （含预期导致的短期曲线平移与长期垂直线）。
 *
 * 写法遵循 edu-video-kit §5：稳态资本、均衡利率、均衡汇率一律数值求解；
 * 占比与净额由数据算出；颜色只取 COLORS 角色，透明一律 alpha()。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 在 [a,b] 上求 f(x)=g(x)（二分），用于 IS=LM、投资=折旧、供需均衡。 */
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
/* 1. GDP 支出法构成                                                  */
/* ------------------------------------------------------------------ */

/**
 * GDP 支出法：Y = C + I + G + NX 的堆叠条（或横向条），每块标出数值与占比，
 * 可对比两年（基期 vs 当期）看增长来源。覆盖 GDP accounting。
 */
export const GdpBars: React.FC<{
  x: number;
  y: number;
  w: number;
  barH?: number;
  /** 各分项：名称与数值（NX 可以为负）。 */
  components: { label: string; value: number }[];
  /** 对比组（画在上方的细条）。 */
  previous?: { label: string; value: number }[];
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, barH = 88, components, previous, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const total = components.reduce((s, c) => s + c.value, 0);
  const posSum = components.filter((c) => c.value > 0).reduce((s, c) => s + c.value, 0);
  const palette = [color, COLORS.alt, COLORS.accent, COLORS.result, COLORS.warn];
  let cursor = 0;
  const shownTotal = posSum * p;
  const label = (v: number): string => `${v.toFixed(0)} (${((v / (total || 1)) * 100).toFixed(1)}%)`;
  return (
    <g>
      {previous ? (
        <g>
          <text x={x} y={y - 26} fill={COLORS.textMuted} fontFamily={FONT} fontSize={23}>
            {`previous total ${previous.reduce((s, c) => s + c.value, 0).toFixed(0)}`}
          </text>
          <rect x={x} y={y - 16} width={w * 0.9} height={16} rx={6} fill={alpha(COLORS.textDim, 0.24)} />
        </g>
      ) : null}
      <rect x={x} y={y} width={w} height={barH} rx={10} fill={alpha(COLORS.textDim, 0.08)} stroke={COLORS.axis} strokeWidth={2} />
      {components.map((c, i) => {
        if (c.value <= 0) return null;
        const bw = (c.value / (posSum || 1)) * w * 0.98;
        const bx = x + (cursor / (posSum || 1)) * w * 0.98;
        cursor += c.value;
        if (cursor > shownTotal) return null;
        return (
          <g key={i}>
            <rect x={bx} y={y} width={bw} height={barH} rx={6} fill={alpha(palette[i % palette.length], 0.55)} stroke={palette[i % palette.length]} strokeWidth={2.4} />
            {bw > 92 ? (
              <text
                x={bx + bw / 2}
                y={y + barH / 2 + 9}
                fill={COLORS.textStrong}
                fontFamily={FONT}
                fontSize={24}
                fontWeight={700}
                textAnchor="middle"
              >
                {`${c.label} ${label(c.value)}`}
              </text>
            ) : null}
          </g>
        );
      })}
      {/* 负值（如 NX 为负）向下画 */}
      {components.map((c, i) => {
        if (c.value >= 0) return null;
        const bw = (Math.abs(c.value) / (posSum || 1)) * w * 0.5;
        return (
          <g key={`n${i}`}>
            <rect x={x} y={y + barH + 6} width={bw} height={30} rx={5} fill={alpha(COLORS.warn, 0.5)} stroke={COLORS.warn} strokeWidth={2.4} />
            <text x={x + bw + 12} y={y + barH + 30} fill={COLORS.warn} fontFamily={FONT} fontSize={23}>
              {`${c.label} ${c.value.toFixed(0)}`}
            </text>
          </g>
        );
      })}
      <text x={x} y={y + barH + 82} fill={COLORS.result} fontFamily={FONT} fontSize={30} fontWeight={700}>
        {`GDP = ${total.toFixed(0)}`}
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 经济循环流量                                                    */
/* ------------------------------------------------------------------ */

/**
 * 循环流量图：家庭 / 企业 / 政府 / 国外四个部门，实线是货币流、虚线是实物流，
 * 每笔流标注名称与数值；漏出（储蓄/税收/进口）与注入（投资/政府支出/出口）
 * 分色。覆盖 Economic circulation flow。
 */
export const CircularFlow: React.FC<{
  cx: number;
  cy: number;
  r?: number;
  /** 四个部门名称（顺序：家庭、企业、政府、国外）。 */
  sectors?: string[];
  /** 流量：从哪个部门到哪个部门、名称、数值、类型。 */
  flows: { from: number; to: number; label: string; value: number; kind?: 'money' | 'real' }[];
  color?: ColorRole | string;
  progress?: number;
}> = ({ cx, cy, r = 260, sectors = ['households', 'firms', 'government', 'rest of world'], flows, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const pos = (i: number): [number, number] => {
    const a = (i / 4) * 2 * Math.PI - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const shown = Math.max(0, Math.round(flows.length * p));
  return (
    <g>
      {sectors.map((s, i) => {
        const q = pos(i);
        return (
          <g key={i}>
            <rect x={q[0] - 106} y={q[1] - 40} width={212} height={80} rx={14} fill={alpha(color, 0.14)} stroke={color} strokeWidth={3} />
            <text x={q[0]} y={q[1] + 10} fill={COLORS.textStrong} fontFamily={FONT} fontSize={25} fontWeight={700} textAnchor="middle">
              {s}
            </text>
          </g>
        );
      })}
      {flows.slice(0, shown).map((f, i) => {
        const a = pos(f.from);
        const b = pos(f.to);
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const len = Math.hypot(dx, dy) || 1;
        const off = 60;
        const sx = a[0] + (dx / len) * off;
        const sy = a[1] + (dy / len) * off;
        const tx = b[0] - (dx / len) * off;
        const ty = b[1] - (dy / len) * off;
        const c = f.kind === 'real' ? COLORS.alt : color;
        const canonical = f.from < f.to ? 1 : -1;
        const nx = -dy / len * canonical;
        const ny = dx / len * canonical;
        const lane = canonical * (f.kind === 'real' ? 120 : 45);
        const mx = (sx + tx) / 2 + nx * lane * 2;
        const my = (sy + ty) / 2 + ny * lane * 2;
        const lx = (sx + tx) / 2 + nx * lane;
        const ly = (sy + ty) / 2 + ny * lane;
        return (
          <g key={i}>
            <path
              d={`M ${sx} ${sy} Q ${mx} ${my} ${tx} ${ty}`}
              fill="none"
              stroke={c}
              strokeWidth={3.4}
              strokeDasharray={f.kind === 'real' ? '9 7' : undefined}
            />
            <polygon points={headPts(tx, ty, (Math.atan2(ty - my, tx - mx) * 180) / Math.PI, 13)} fill={c} />
            <rect x={lx-100} y={ly-20} width={200} height={32} rx={4} fill={COLORS.bg0}/>
            <text
              x={lx}
              y={ly+5}
              fill={c}
              fontFamily={FONT}
              fontSize={23}
              textAnchor="middle"
            >
              {`${f.label} ${f.value.toFixed(0)}`}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. IS–LM                                                           */
/* ------------------------------------------------------------------ */

/**
 * IS–LM：横轴收入 Y、纵轴利率 r。IS 由 r_IS(Y) 给出（向右下），LM 由
 * r_LM(Y) 给出（向右上），数值求交点并标注 (Y*, r*)；shift 参数做政策平移。
 * 覆盖 IS–LM model。
 */
export const IslmModel: React.FC<{
  s: Scale;
  /** IS：收入 → 利率（递减）。 */
  rIS: (Y: number) => number;
  /** LM：收入 → 利率（递增）。 */
  rLM: (Y: number) => number;
  /** IS / LM 的平移量。 */
  shiftIS?: number;
  shiftLM?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, rIS, rLM, shiftIS = 0, shiftLM = 0, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [y0, y1] = s.xDomain;
  const is = (Y: number): number => rIS(Y) + shiftIS;
  const lm = (Y: number): number => rLM(Y) + shiftLM;
  const Ystar = intersect(is, lm, y0, y1);
  const rStar = Ystar === null ? null : is(Ystar);
  return (
    <g>
      <path
        d={toPath(s, sample(is, y0, y1))}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, sample(lm, y0, y1))}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <text x={s.px(y1) + 12} y={s.py(is(y1)) + 8} fill={color} fontFamily={FONT} fontSize={27} fontWeight={700}>
        IS
      </text>
      <text x={s.px(y1) + 12} y={s.py(lm(y1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={27} fontWeight={700}>
        LM
      </text>
      {shiftIS !== 0 ? (
        <path d={toPath(s, sample(rIS, y0, y1))} fill="none" stroke={color} strokeWidth={2.6} strokeDasharray="8 7" opacity={0.5} />
      ) : null}
      {shiftLM !== 0 ? (
        <path d={toPath(s, sample(rLM, y0, y1))} fill="none" stroke={COLORS.alt} strokeWidth={2.6} strokeDasharray="8 7" opacity={0.5} />
      ) : null}
      {Ystar !== null && rStar !== null && p > 0.55 ? (
        <g>
          <line x1={s.px(Ystar)} y1={s.py(s.yDomain[0])} x2={s.px(Ystar)} y2={s.py(rStar)} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="7 6" />
          <line x1={s.px(s.xDomain[0])} y1={s.py(rStar)} x2={s.px(Ystar)} y2={s.py(rStar)} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="7 6" />
          <circle cx={s.px(Ystar)} cy={s.py(rStar)} r={8} fill={COLORS.result} />
          <text x={s.px(Ystar)} y={s.py(s.yDomain[0]) - 20} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700} textAnchor="middle">
            {`Y* = ${Ystar.toFixed(0)}`}
          </text>
          <text x={s.px(s.xDomain[0]) - 14} y={s.py(rStar) + 9} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700} textAnchor="end">
            {`r* = ${rStar.toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 汇率                                                            */
/* ------------------------------------------------------------------ */

/**
 * 汇率供需：横轴本币数量、纵轴汇率（本币/外币）。供给与需求曲线求均衡，
 * 标注均衡汇率；shift 表示资本流入/流出导致的曲线平移，并给出升值/贬值判定。
 * 覆盖 Exchange rate。
 */
export const ExchangeRate: React.FC<{
  s: Scale;
  /** 需求：汇率 → 本币需求量。 */
  Qd: (e: number) => number;
  /** 供给：汇率 → 本币供给量。 */
  Qs: (e: number) => number;
  shiftD?: number;
  shiftS?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, Qd, Qs, shiftD = 0, shiftS = 0, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [eLo, eHi] = s.yDomain;
  const d = (e: number): number => Qd(e) + shiftD;
  const sup = (e: number): number => Qs(e) + shiftS;
  const e0 = intersect(Qd, Qs, eLo, eHi);
  const e1 = intersect(d, sup, eLo, eHi);
  const rateCurve = (fn: (e:number)=>number) => 'M ' + sample(fn,eLo,eHi).map(([e,q])=>`${s.px(q).toFixed(1)},${s.py(e).toFixed(1)}`).join(' L ');
  return (
    <g>
      <path d={rateCurve(d)} fill="none" stroke={color} strokeWidth={4.4} pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000 * (1 - p)} />
      <path d={rateCurve(sup)} fill="none" stroke={COLORS.alt} strokeWidth={4.4} pathLength={1000} strokeDasharray={1000} strokeDashoffset={1000 * (1 - p)} />
      <text x={s.px(d(eHi)) + 12} y={s.py(eHi) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        D
      </text>
      <text x={s.px(sup(eHi)) + 12} y={s.py(eHi) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        S
      </text>
      {e0 !== null ? (
        <line x1={s.px(s.xDomain[0])} y1={s.py(e0)} x2={s.px(s.xDomain[1])} y2={s.py(e0)} stroke={COLORS.textDim} strokeWidth={2.2} strokeDasharray="7 6" />
      ) : null}
      {e1 !== null && p > 0.5 ? (
        <g>
          <line x1={s.px(s.xDomain[0])} y1={s.py(e1)} x2={s.px(s.xDomain[1])} y2={s.py(e1)} stroke={COLORS.result} strokeWidth={3} />
          <text x={s.px(s.xDomain[0]) - 14} y={s.py(e1) + 9} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700} textAnchor="end">
            {`e = ${e1.toFixed(2)}`}
          </text>
          {e0 !== null && Math.abs(e1 - e0) > 1e-6 ? (
            <text x={s.px(s.xDomain[1]) - 20} y={s.py(e1) - 26} fill={e1 > e0 ? COLORS.warn : COLORS.accent} fontFamily={FONT} fontSize={27} fontWeight={700} textAnchor="end">
              {`${e1 > e0 ? 'depreciation' : 'appreciation'} ${Math.abs(e1 - e0).toFixed(3)}`}
            </text>
          ) : null}
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 国际收支                                                        */
/* ------------------------------------------------------------------ */

/**
 * 国际收支双栏：经常账户与资本金融账户各自的贷方/借方条目，两栏净额相加
 * 应等于零（含误差与遗漏）。覆盖 Balance of payments。
 */
export const BalanceOfPayments: React.FC<{
  x: number;
  y: number;
  colW?: number;
  /** 两个账户：名称与条目（正值贷方、负值借方）。 */
  accounts: { name: string; items: { label: string; value: number }[] }[];
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, colW = 420, accounts, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const totals = accounts.map((a) => a.items.reduce((s, i) => s + i.value, 0));
  const grand = totals.reduce((s, t) => s + t, 0);
  return (
    <g>
      {accounts.map((acc, ai) => {
        const ax = x + ai * colW;
        const shown = Math.max(0, Math.round(acc.items.length * p));
        return (
          <g key={ai}>
            <text x={ax} y={y} fill={COLORS.textStrong} fontFamily={FONT} fontSize={28} fontWeight={700}>
              {acc.name}
            </text>
            {acc.items.slice(0, shown).map((it, i) => {
              const iy = y + 46 + i * 46;
              const w = Math.min(colW * 0.5, Math.abs(it.value) * 3.2);
              return (
                <g key={i}>
                  <text x={ax} y={iy + 8} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
                    {it.label}
                  </text>
                  <rect
                    x={it.value >= 0 ? ax + colW * 0.52 : ax + colW * 0.52 - w}
                    y={iy - 12}
                    width={w}
                    height={26}
                    rx={5}
                    fill={it.value >= 0 ? alpha(COLORS.result, 0.55) : alpha(COLORS.warn, 0.55)}
                  />
                  <text
                    x={it.value >= 0 ? ax + colW * 0.52 + w + 10 : ax + colW * 0.52 - w - 10}
                    y={iy + 8}
                    fill={COLORS.textStrong}
                    fontFamily={FONT}
                    fontSize={23}
                    textAnchor={it.value >= 0 ? 'start' : 'end'}
                  >
                    {it.value.toFixed(0)}
                  </text>
                </g>
              );
            })}
            {shown >= acc.items.length ? (
              <g>
                <line x1={ax} y1={y + 46 + acc.items.length * 46} x2={ax + colW * 0.86} y2={y + 46 + acc.items.length * 46} stroke={COLORS.axis} strokeWidth={2.4} />
                <text x={ax} y={y + 46 + acc.items.length * 46 + 36} fill={color} fontFamily={FONT} fontSize={27} fontWeight={700}>
                  {`balance ${totals[ai].toFixed(0)}`}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
      {p > 0.85 ? (
        <text
          x={x}
          y={y + 46 + Math.max(...accounts.map((a) => a.items.length)) * 46 + 100}
          fill={Math.abs(grand) < 1e-6 ? COLORS.result : COLORS.warn}
          fontFamily={FONT}
          fontSize={29}
          fontWeight={700}
        >
          {`sum of balances = ${grand.toFixed(0)}${Math.abs(grand) < 1e-6 ? ' (must be zero)' : ' (errors & omissions)'}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 索洛增长模型                                                    */
/* ------------------------------------------------------------------ */

/**
 * 索洛模型：人均产出 y = f(k)、投资 s·f(k)、持平投资 (n+δ)k 三条曲线，
 * 数值求稳态 k*（投资 = 持平投资），并标出稳态产出与消费 c* = f(k*) − (n+δ)k*。
 * 覆盖 Solow growth model。
 */
export const SolowModel: React.FC<{
  s: Scale;
  /** 人均生产函数。 */
  f: (k: number) => number;
  /** 储蓄率。 */
  save: number;
  /** 人口增长率 + 折旧率之和。 */
  breakEven: number;
  /** 对比的第二组参数（如更高的储蓄率）。 */
  compare?: { save: number; label: string };
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, f, save, breakEven, compare, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [k0, k1] = s.xDomain;
  const invest = (k: number): number => save * f(k);
  const deprec = (k: number): number => breakEven * k;
  const kStar = intersect(invest, deprec, k0, k1);
  const yStar = kStar === null ? null : f(kStar);
  const cStar = kStar === null ? null : f(kStar) - breakEven * kStar;
  return (
    <g>
      <path
        d={toPath(s, sample(f, k0, k1))}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, sample(invest, k0, k1))}
        fill="none"
        stroke={COLORS.accent}
        strokeWidth={4}
        strokeDasharray="11 7"
      />
      <path d={toPath(s, sample(deprec, k0, k1))} fill="none" stroke={COLORS.alt} strokeWidth={4} />
      <text x={s.px(k1) + 12} y={s.py(f(k1)) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`y = f(k)`}
      </text>
      <text x={s.px(k1) + 12} y={s.py(invest(k1)) + 8} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`s f(k)`}
      </text>
      <text x={s.px(k1) + 12} y={s.py(deprec(k1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`(n+δ)k`}
      </text>
      {kStar !== null && p > 0.5 ? (
        <g>
          <line x1={s.px(kStar)} y1={s.py(0)} x2={s.px(kStar)} y2={s.py(yStar ?? 0)} stroke={COLORS.result} strokeWidth={2.8} strokeDasharray="7 6" />
          <circle cx={s.px(kStar)} cy={s.py(deprec(kStar))} r={8} fill={COLORS.result} />
          <text x={s.px(kStar)} y={s.py(0) - 20} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700} textAnchor="middle">
            {`k* = ${kStar.toFixed(2)}`}
          </text>
          <text x={s.px(kStar) + 18} y={s.py(yStar ?? 0) - 18} fill={COLORS.result} fontFamily={FONT} fontSize={26}>
            {`y* = ${(yStar ?? 0).toFixed(2)}`}
          </text>
          {cStar !== null ? (
            <text x={s.px(kStar) + 18} y={s.py(deprec(kStar)) + 40} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
              {`c* = ${cStar.toFixed(2)}`}
            </text>
          ) : null}
        </g>
      ) : null}
      {compare && p > 0.7 ? (
        <g>
          <path
            d={toPath(s, sample((k: number) => compare.save * f(k), k0, k1))}
            fill="none"
            stroke={COLORS.warn}
            strokeWidth={3.4}
            strokeDasharray="6 6"
          />
          {(() => {
            const k2 = intersect((k: number) => compare.save * f(k), deprec, k0, k1);
            return k2 === null ? null : (
              <g>
                <circle cx={s.px(k2)} cy={s.py(deprec(k2))} r={7} fill={COLORS.warn} />
                <text x={s.px(k2)} y={s.py(0) - 44} fill={COLORS.warn} fontFamily={FONT} fontSize={24} textAnchor="middle">
                  {`${compare.label}: k* = ${k2.toFixed(2)}`}
                </text>
              </g>
            );
          })()}
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 7. 菲利普斯曲线                                                    */
/* ------------------------------------------------------------------ */

/**
 * 菲利普斯曲线：横轴失业率、纵轴通胀率的向下倾斜短期曲线；
 * expected 为预期通胀（短期曲线随之整体上移），长期曲线是在自然失业率处的
 * 垂直线。覆盖 Phillips Curve / Inflation expectations。
 */
export const PhillipsCurve: React.FC<{
  s: Scale;
  /** 短期菲利普斯：失业率 → 通胀率。 */
  SRPC: (u: number) => number;
  /** 自然失业率（长期曲线的位置）。 */
  uNat: number;
  /** 预期通胀（把短期曲线整体上移）。 */
  expected?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, SRPC, uNat, expected = 0, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [u0, u1] = s.xDomain;
  const sr = (u: number): number => SRPC(u) + expected;
  return (
    <g>
      <path
        d={toPath(s, sample(sr, u0, u1))}
        fill="none"
        stroke={color}
        strokeWidth={4.5}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {expected !== 0 ? (
        <path d={toPath(s, sample(SRPC, u0, u1))} fill="none" stroke={color} strokeWidth={2.6} strokeDasharray="8 7" opacity={0.5} />
      ) : null}
      {p > 0.5 ? (
        <g>
          <line
            x1={s.px(uNat)}
            y1={s.py(s.yDomain[0])}
            x2={s.px(uNat)}
            y2={s.py(s.yDomain[1])}
            stroke={COLORS.result}
            strokeWidth={3.6}
          />
          <text x={s.px(uNat)} y={s.py(s.yDomain[1]) - 18} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700} textAnchor="middle">
            {`LRPC: u* = ${uNat.toFixed(1)}%`}
          </text>
        </g>
      ) : null}
      {expected !== 0 && p > 0.6 ? (
        <text
          x={s.px(u1) - 20}
          y={s.py(sr(u1)) - 26}
          fill={COLORS.warn}
          fontFamily={FONT}
          fontSize={27}
          fontWeight={700}
          textAnchor="end"
        >
          {`expected π = ${expected.toFixed(1)}% shifts SRPC up`}
        </text>
      ) : null}
      {p > 0.7 ? (
        <text x={s.px(u0) + 20} y={s.py(sr(u0)) + 34} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
          {`trade-off only in the short run`}
        </text>
      ) : null}
    </g>
  );
};
