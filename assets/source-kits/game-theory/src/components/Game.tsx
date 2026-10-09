import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';

/**
 * Game.tsx — Game Theory 的 L2 学科原语。
 *
 * 覆盖 12 个知识点反复出现的图形：2×2（及 n×m）收益矩阵与最优反应、
 * 迭代剔除劣势策略、纯策略纳什均衡的格内高亮、混合策略的概率单形与无差异
 * 交点、连续博弈的反应曲线、序贯博弈的博弈树（信息集 + 逆向归纳 + 子博弈框）、
 * 信号传递的分离/混同均衡、逆向选择的柠檬市场。
 *
 * 博弈论图形的关键不是画格子，而是把"谁在给定对方策略时最优"算出来：
 * 最优反应、纳什均衡、被支配策略全部由本文件的函数求解，场景只给矩阵。
 *
 * 写法遵循 edu-video-kit §5：颜色只取 COLORS 角色，透明一律 alpha()；
 * 期望收益与混合均衡概率一律由函数算出，不写字面量。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 在 [a,b] 上求 f(x)=g(x)（二分），用于反应曲线与无差异交点。 */
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
/* 求解器（场景用它们，不手算）                                        */
/* ------------------------------------------------------------------ */

/**
 * 行玩家的最优反应：给定列玩家的每一列，返回使行玩家收益最大的行下标集合。
 * 覆盖 Dominant strategy / Pure strategy Nash equilibrium 的计算部分。
 */
export const bestResponses = (
  payoffs: [number, number][][]
): { row: number[][]; col: number[][] } => {
  const R = payoffs.length;
  const C = payoffs[0]?.length ?? 0;
  const row: number[][] = [];
  const col: number[][] = [];
  for (let c = 0; c < C; c++) {
    let best = -Infinity;
    for (let r = 0; r < R; r++) best = Math.max(best, payoffs[r][c][0]);
    const idx: number[] = [];
    for (let r = 0; r < R; r++) if (payoffs[r][c][0] === best) idx.push(r);
    row.push(idx);
  }
  for (let r = 0; r < R; r++) {
    let best = -Infinity;
    for (let c = 0; c < C; c++) best = Math.max(best, payoffs[r][c][1]);
    const idx: number[] = [];
    for (let c = 0; c < C; c++) if (payoffs[r][c][1] === best) idx.push(c);
    col.push(idx);
  }
  return { row, col };
};

/** 纯策略纳什均衡：双方互为最优反应的格子。 */
export const nashCells = (payoffs: [number, number][][]): [number, number][] => {
  const br = bestResponses(payoffs);
  const out: [number, number][] = [];
  for (let r = 0; r < payoffs.length; r++) {
    for (let c = 0; c < (payoffs[0]?.length ?? 0); c++) {
      if (br.row[c].includes(r) && br.col[r].includes(c)) out.push([r, c]);
    }
  }
  return out;
};

/**
 * 严格劣势策略：若某行在所有列上收益都严格小于另一行，则该行被支配。
 * 迭代剔除就是反复调用它。覆盖 Dominant strategy / Iterative deletion。
 */
export const dominatedStrategies = (
  payoffs: [number, number][][]
): { rows: number[]; cols: number[] } => {
  const R = payoffs.length;
  const C = payoffs[0]?.length ?? 0;
  const rows: number[] = [];
  const cols: number[] = [];
  for (let r = 0; r < R; r++) {
    for (let r2 = 0; r2 < R; r2++) {
      if (r === r2) continue;
      let all = true;
      for (let c = 0; c < C; c++) if (payoffs[r][c][0] >= payoffs[r2][c][0]) { all = false; break; }
      if (all) { rows.push(r); break; }
    }
  }
  for (let c = 0; c < C; c++) {
    for (let c2 = 0; c2 < C; c2++) {
      if (c === c2) continue;
      let all = true;
      for (let r = 0; r < R; r++) if (payoffs[r][c][1] >= payoffs[r][c2][1]) { all = false; break; }
      if (all) { cols.push(c); break; }
    }
  }
  return { rows: [...new Set(rows)], cols: [...new Set(cols)] };
};

/**
 * 2×2 混合策略纳什均衡：行玩家以 p 取第一行，使列玩家无差异；列玩家以 q
 * 取第一列，使行玩家无差异。返回 [p, q]，无解时返回 null。
 */
export const mixedEquilibrium = (
  payoffs: [number, number][][]
): { p: number; q: number } | null => {
  if (payoffs.length !== 2 || payoffs[0].length !== 2) return null;
  // 列玩家无差异：p·b00 + (1−p)·b10 = p·b01 + (1−p)·b11
  const b00 = payoffs[0][0][1];
  const b10 = payoffs[1][0][1];
  const b01 = payoffs[0][1][1];
  const b11 = payoffs[1][1][1];
  const denP = b00 - b10 - b01 + b11;
  const p = Math.abs(denP) < 1e-9 ? null : (b11 - b10) / denP;
  // 行玩家无差异：q·a00 + (1−q)·a01 = q·a10 + (1−q)·a11
  const a00 = payoffs[0][0][0];
  const a01 = payoffs[0][1][0];
  const a10 = payoffs[1][0][0];
  const a11 = payoffs[1][1][0];
  const denQ = a00 - a01 - a10 + a11;
  const q = Math.abs(denQ) < 1e-9 ? null : (a11 - a01) / denQ;
  if (p === null || q === null) return null;
  return { p: clamp01(p), q: clamp01(q) };
};

/* ------------------------------------------------------------------ */
/* 1. 收益矩阵                                                        */
/* ------------------------------------------------------------------ */

/**
 * 收益矩阵：行/列玩家各带策略名，每格写 (行收益, 列收益)。
 * 三件事都由求解器算出后画出来：最优反应（格内描边）、纳什均衡（填充高亮）、
 * 被支配策略（按 crossOut 划掉整行/整列）。
 * 覆盖 Dominant strategy / Iterative deletion / Pure strategy Nash equilibrium。
 */
export const PayoffMatrix: React.FC<{
  x: number;
  y: number;
  cellW?: number;
  cellH?: number;
  /** 行玩家策略名。 */
  rowLabels: string[];
  colLabels: string[];
  /** payoffs[r][c] = [行玩家收益, 列玩家收益]。 */
  payoffs: [number, number][][];
  /** 已剔除的行/列下标（迭代剔除的过程）。 */
  crossOut?: { rows?: number[]; cols?: number[] };
  /** 是否标最优反应与纳什均衡。 */
  showBest?: boolean;
  showNash?: boolean;
  color?: ColorRole | string;
  progress?: number;
  rowName?: string;
  colName?: string;
}> = ({
  x,
  y,
  cellW = 190,
  cellH = 108,
  rowLabels,
  colLabels,
  payoffs,
  crossOut,
  showBest = true,
  showNash = true,
  color = COLORS.primary,
  progress = 1,
  rowName = 'row',
  colName = 'column',
}) => {
  const p = clamp01(progress);
  const br = bestResponses(payoffs);
  const nash = nashCells(payoffs);
  const dead = {
    rows: new Set(crossOut?.rows ?? []),
    cols: new Set(crossOut?.cols ?? []),
  };
  const shownRows = Math.max(1, Math.round(rowLabels.length * p));
  const shownCols = Math.max(1, Math.round(colLabels.length * p));
  return (
    <g>
      <text x={x - 20} y={y - 24} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24} textAnchor="end">
        {rowName}
      </text>
      <text x={x + 40} y={y - 58} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        {colName}
      </text>
      {colLabels.slice(0, shownCols).map((cl, c) => (
        <text
          key={`c${c}`}
          x={x + cellW * c + cellW / 2}
          y={y - 22}
          fill={dead.cols.has(c) ? COLORS.textDim : COLORS.textStrong}
          fontFamily={FONT}
          fontSize={27}
          fontWeight={700}
          textAnchor="middle"
        >
          {cl}
        </text>
      ))}
      {rowLabels.slice(0, shownRows).map((rl, r) => (
        <text
          key={`r${r}`}
          x={x - 20}
          y={y + cellH * r + cellH / 2 + 9}
          fill={dead.rows.has(r) ? COLORS.textDim : COLORS.textStrong}
          fontFamily={FONT}
          fontSize={27}
          fontWeight={700}
          textAnchor="end"
        >
          {rl}
        </text>
      ))}
      {rowLabels.slice(0, shownRows).map((_rl, r) =>
        colLabels.slice(0, shownCols).map((_cl, c) => {
          const q = payoffs[r]?.[c] ?? [0, 0];
          const isNash = showNash && nash.some((n) => n[0] === r && n[1] === c);
          const bestRow = showBest && br.row[c].includes(r);
          const bestCol = showBest && br.col[r].includes(c);
          const deadCell = dead.rows.has(r) || dead.cols.has(c);
          return (
            <g key={`${r}-${c}`} opacity={deadCell ? 0.32 : 1}>
              <rect
                x={x + cellW * c}
                y={y + cellH * r}
                width={cellW}
                height={cellH}
                fill={isNash ? alpha(COLORS.result, 0.2) : alpha(color, 0.07)}
                stroke={isNash ? COLORS.result : COLORS.axis}
                strokeWidth={isNash ? 4 : 2.2}
              />
              <text
                x={x + cellW * c + cellW / 2}
                y={y + cellH * r + cellH / 2 + 10}
                fill={COLORS.textStrong}
                fontFamily={FONT}
                fontSize={30}
                fontWeight={700}
                textAnchor="middle"
              >
                {`${q[0].toFixed(0)}, ${q[1].toFixed(0)}`}
              </text>
              {/* 最优反应角标：行玩家在左下、列玩家在右上 */}
              {bestRow ? (
                <circle cx={x + cellW * c + 18} cy={y + cellH * r + cellH - 18} r={7} fill={color} />
              ) : null}
              {bestCol ? (
                <circle cx={x + cellW * c + cellW - 18} cy={y + cellH * r + 18} r={7} fill={COLORS.alt} />
              ) : null}
            </g>
          );
        })
      )}
      {/* 剔除线 */}
      {[...dead.rows].map((r) => (
        <line
          key={`x${r}`}
          x1={x}
          y1={y + cellH * r}
          x2={x + cellW * colLabels.length}
          y2={y + cellH * r + cellH}
          stroke={COLORS.warn}
          strokeWidth={3.4}
        />
      ))}
      {[...dead.cols].map((c) => (
        <line
          key={`xc${c}`}
          x1={x + cellW * c}
          y1={y}
          x2={x + cellW * c + cellW}
          y2={y + cellH * rowLabels.length}
          stroke={COLORS.warn}
          strokeWidth={3.4}
        />
      ))}
      {showNash && nash.length && p > 0.8 ? (
        <text
          x={x}
          y={y + cellH * rowLabels.length + 44}
          fill={COLORS.result}
          fontFamily={FONT}
          fontSize={27}
          fontWeight={700}
        >
          {`Nash: ${nash.map((n) => `(${rowLabels[n[0]]}, ${colLabels[n[1]]})`).join('  ')}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 连续策略的反应曲线                                              */
/* ------------------------------------------------------------------ */

/**
 * 最优反应曲线：连续策略（如古诺产量）下双方的反应函数，交点即纳什均衡。
 * 曲线由函数给出，交点数值求解。覆盖 Pure strategy Nash equilibrium 的连续版。
 */
export const ReactionCurves: React.FC<{
  s: Scale;
  /** 玩家 1 对玩家 2 策略的最优反应。 */
  R1: (x2: number) => number;
  /** 玩家 2 对玩家 1 策略的最优反应（以玩家 1 策略为自变量，返回玩家 2 策略）。 */
  R2: (x1: number) => number;
  color?: ColorRole | string;
  progress?: number;
  labels?: [string, string];
}> = ({ s, R1, R2, color = COLORS.primary, progress = 1, labels = ['R₁', 'R₂'] }) => {
  const p = clamp01(progress);
  const [x0, x1] = s.xDomain;
  // R1 定义在 x2 轴上、R2 定义在 x1 轴上，交点需解 x1 = R1(R2(x1))
  const eq = intersect((x: number) => x, (x: number) => R1(R2(x)), x0, x1);
  return (
    <g>
      {/* R1：以对方策略为自变量，画在 (x1 = R1(x2), x2) 上（横轴仍是玩家 1） */}
      <polyline
        points={sample(R1, x0, x1)
          .slice(0, Math.max(2, Math.round(200 * p)))
          .map((q) => `${s.px(q[1]).toFixed(1)},${s.py(q[0]).toFixed(1)}`)
          .join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={4.4}
      />
      {/* R2：以自己策略为自变量 */}
      <polyline
        points={sample(R2, x0, x1)
          .slice(0, Math.max(2, Math.round(200 * p)))
          .map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`)
          .join(' ')}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.4}
      />
      <text x={s.px(x1) + 12} y={s.py(R2(x1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {labels[1]}
      </text>
      <text x={s.px(R1(x1)) + 12} y={s.py(x1) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {labels[0]}
      </text>
      {eq !== null && p > 0.6 ? (
        <g>
          <circle cx={s.px(eq)} cy={s.py(R2(eq))} r={9} fill={COLORS.result} />
          <line x1={s.px(eq)} y1={s.py(0)} x2={s.px(eq)} y2={s.py(R2(eq))} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="7 6" />
          <text x={s.px(eq) + 18} y={s.py(R2(eq)) - 22} fill={COLORS.result} fontFamily={FONT} fontSize={27} fontWeight={700}>
            {`Nash (${eq.toFixed(2)}, ${R2(eq).toFixed(2)})`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 混合策略                                                        */
/* ------------------------------------------------------------------ */

/**
 * 混合策略：横轴是行玩家取第一行的概率 p，两条线是列玩家取各列的期望收益；
 * 两线交点处列玩家无差异，即行玩家的均衡混合概率。
 * 期望收益与均衡概率由 mixedEquilibrium 算出。覆盖 Mixed strategy /
 * Mixed Strategy Nash Equilibrium。
 */
export const ProbabilityAllocation: React.FC<{p:number;draws:string[]}> = ({p,draws}) => <g>
  <text x={70} y={135} fontSize={42} fill={COLORS.textStrong}>Choose probabilities before the kick</text>
  <rect x={70} y={205} width={900} height={130} rx={18} fill={alpha(COLORS.axis,0.2)}/>
  <rect x={70} y={205} width={900*p} height={130} rx={18} fill={COLORS.primary}/>
  <text x={70} y={400} fontSize={42} fill={COLORS.textStrong}>{`Left ${p.toFixed(2)} | Right ${(1-p).toFixed(2)}`}</text>
  <text x={70} y={485} fontSize={40} fill={COLORS.result}>Different samples, one distribution</text>
  {draws.map((d,i)=><g key={i}><circle cx={105+i*175} cy={565} r={34} fill={d==='Left'?COLORS.primary:COLORS.alt}/><text x={105+i*175} y={578} textAnchor="middle" fontSize={34} fontWeight={700} fill="white">{d[0]}</text></g>)}
</g>;

export const MixedSimplex: React.FC<{
  s: Scale;
  payoffs: [number, number][][];
  /** 求谁的 indifference：'column' 看列玩家的期望收益（默认）。 */
  forWhom?: 'column' | 'row';
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, payoffs, forWhom = 'column', color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const mix = mixedEquilibrium(payoffs);
  // 谁的期望收益随对方的混合概率线性变化：
  //  column —— 横轴是行玩家取第 0 行的概率 p，看列玩家取第 0/1 列的期望收益
  //  row    —— 横轴是列玩家取第 0 列的概率 q，看行玩家取第 0/1 行的期望收益
  const idx = forWhom === 'column' ? 1 : 0;
  const e0 = (pp: number): number =>
    forWhom === 'column'
      ? pp * payoffs[0][0][idx] + (1 - pp) * payoffs[1][0][idx]
      : pp * payoffs[0][0][idx] + (1 - pp) * payoffs[0][1][idx];
  const e1 = (pp: number): number =>
    forWhom === 'column'
      ? pp * payoffs[0][1][idx] + (1 - pp) * payoffs[1][1][idx]
      : pp * payoffs[1][0][idx] + (1 - pp) * payoffs[1][1][idx];
  const eqX = intersect(e0, e1, 0, 1);
  return (
    <g>
      <line x1={s.px(0)} y1={s.py(0)} x2={s.px(1)} y2={s.py(0)} stroke={COLORS.axis} strokeWidth={2.6} />
      <path
        d={toPath(s, sample(e0, 0, 1))}
        fill="none"
        stroke={color}
        strokeWidth={4.4}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, sample(e1, 0, 1))}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.4}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      {eqX !== null && p > 0.6 ? (
        <g>
          <line x1={s.px(eqX)} y1={s.py(s.yDomain[0])} x2={s.px(eqX)} y2={s.py(e0(eqX))} stroke={COLORS.result} strokeWidth={2.6} strokeDasharray="7 6" />
          <circle cx={s.px(eqX)} cy={s.py(e0(eqX))} r={9} fill={COLORS.result} />
          <text x={s.px(eqX) + 18} y={s.py(e0(eqX)) - 20} fill={COLORS.result} fontFamily={FONT} fontSize={28} fontWeight={700}>
            {`indifferent at p = ${eqX.toFixed(2)}`}
          </text>
        </g>
      ) : null}
      {mix && p > 0.85 ? (
        <text x={s.px(0.02)} y={s.py(s.yDomain[1]) - 22} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
          {`mixed equilibrium: p = ${mix.p.toFixed(2)}, q = ${mix.q.toFixed(2)}`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 博弈树                                                          */
/* ------------------------------------------------------------------ */

export type TreeNode = {
  id: string;
  /** 该节点的行动者（null = 终端）。 */
  player?: string;
  /** 子分支：动作名 → 子节点 id。 */
  branches: { action: string; to: string }[];
  /** 终端收益（按玩家顺序）。 */
  payoff?: number[];
  /** 所属信息集（同一信息集的节点用虚线连接，表示不可区分）。 */
  infoSet?: string;
  /** 父节点（用于布局；根节点无）。 */
  parent?: string;
  /** 深度（用于布局；根节点为 0）。 */
  depth: number;
};

/**
 * 博弈树：节点按深度分层布局，分支标动作名，终端标收益向量。
 * 三件附加能力：信息集（同集节点用虚线连接，表示参与者分不清自己在哪）、
 * 逆向归纳（把均衡路径上的分支加粗高亮、其余淡出）、子博弈框。
 * 覆盖 Sequential game / Backward induction / Subgame refinement /
 * Credible threat / Asymmetric information。
 */
export const GameTree: React.FC<{
  cx: number;
  cy: number;
  /** 层间垂直距离与同层水平间距。 */
  levelH?: number;
  nodeGap?: number;
  nodes: TreeNode[];
  /** 逆向归纳选出的均衡路径：节点 id → 选中的动作名。 */
  solution?: Record<string, string>;
  /** 要框出的子博弈：根节点 id + 标签。 */
  subgames?: { root: string; label?: string }[];
  color?: ColorRole | string;
  progress?: number;
  /** 玩家名顺序（用于收益向量标注）。 */
  players?: string[];
}> = ({
  cx,
  cy,
  levelH = 180,
  nodeGap = 240,
  nodes,
  solution,
  subgames,
  color = COLORS.primary,
  progress = 1,
  players = ['P1', 'P2'],
}) => {
  const p = clamp01(progress);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  // Give leaves their own slots, then center each decision above its children.
  // Uniform spacing by depth placed terminal payoff boxes on top of each other.
  const pos = new Map<string, [number, number]>();
  const xs = new Map<string, number>();
  let leaf = 0;
  const place = (n: TreeNode): number => {
    const childXs = n.branches.map((b) => byId.get(b.to)).filter((q): q is TreeNode => !!q).map(place);
    const x = childXs.length ? (childXs[0] + childXs[childXs.length - 1]) / 2 : leaf++ * nodeGap * 1.6;
    xs.set(n.id, x);
    return x;
  };
  nodes.filter((n) => !n.parent).forEach(place);
  const left = Math.min(...xs.values());
  const right = Math.max(...xs.values());
  for (const n of nodes) pos.set(n.id, [cx + (xs.get(n.id) ?? 0) - (left + right) / 2, cy + n.depth * levelH]);
  const shown = Math.max(1, Math.round(nodes.length * p));
  const visible = new Set(nodes.slice(0, shown).map((n) => n.id));

  // 信息集：把同集节点两两连线
  const infoGroups = new Map<string, string[]>();
  for (const n of nodes) {
    if (!n.infoSet) continue;
    const arr = infoGroups.get(n.infoSet) ?? [];
    arr.push(n.id);
    infoGroups.set(n.infoSet, arr);
  }

  return (
    <g>
      {[...infoGroups.entries()].map(([key, ids]) => {
        const pts = ids.map((id) => pos.get(id)).filter(Boolean) as [number, number][];
        if (pts.length < 2) return null;
        return (
          <path
            key={key}
            d={`M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} ` +
              pts.slice(1).map((q) => `L ${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(' ')}
            fill="none"
            stroke={COLORS.warn}
            strokeWidth={3}
            strokeDasharray="9 7"
          />
        );
      })}
      {nodes.filter((n) => visible.has(n.id)).map((n) => {
        const q = pos.get(n.id);
        if (!q) return null;
        return n.branches.map((b) => {
          const child = byId.get(b.to);
          const cq = child ? pos.get(child.id) : null;
          if (!child || !cq) return null;
          const onPath = solution?.[n.id] === b.action;
          const dim = solution && !onPath ? 0.28 : 1;
          return (
            <g key={`${n.id}-${b.action}`} opacity={dim}>
              <line
                x1={q[0]}
                y1={q[1]}
                x2={cq[0]}
                y2={cq[1]}
                stroke={onPath ? COLORS.result : COLORS.textDim}
                strokeWidth={onPath ? 5.4 : 3.2}
              />
              <text
                x={(q[0] + cq[0]) / 2 + (cq[0] > q[0] ? 10 : -10)}
                y={(q[1] + cq[1]) / 2 - 8}
                fill={onPath ? COLORS.result : COLORS.textMuted}
                fontFamily={FONT}
                fontSize={25}
                fontWeight={onPath ? 700 : 400}
                textAnchor={cq[0] > q[0] ? 'start' : 'end'}
              >
                {b.action}
              </text>
            </g>
          );
        });
      })}
      {nodes.filter((n) => visible.has(n.id)).map((n) => {
        const q = pos.get(n.id);
        if (!q) return null;
        if (n.payoff) {
          return (
            <g key={n.id}>
              <rect x={q[0] - 74} y={q[1] - 30} width={148} height={60} rx={10} fill={alpha(COLORS.result, 0.14)} stroke={COLORS.result} strokeWidth={2.8} />
              <text x={q[0]} y={q[1] + 10} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
                {n.payoff.map((v, i) => `${players[i] ?? 'P' + (i + 1)} ${v.toFixed(0)}`).join('  ')}
              </text>
            </g>
          );
        }
        return (
          <g key={n.id}>
            <circle cx={q[0]} cy={q[1]} r={22} fill={alpha(color, 0.2)} stroke={color} strokeWidth={3.2} />
            {n.player ? (
              <text x={q[0]} y={q[1] - 34} fill={COLORS.textMuted} fontFamily={FONT} fontSize={23} textAnchor="middle">
                {n.player}
              </text>
            ) : null}
          </g>
        );
      })}
      {subgames?.map((sg, i) => {
        const root = byId.get(sg.root);
        const rq = root ? pos.get(root.id) : null;
        if (!rq) return null;
        // 框住该子博弈的整棵子树
        const sub: [number, number][] = [];
        const walk = (id: string): void => {
          const n = byId.get(id);
          const q = pos.get(id);
          if (!n || !q) return;
          sub.push(q);
          n.branches.forEach((b) => walk(b.to));
        };
        walk(sg.root);
        const xs = sub.map((q) => q[0]);
        const ys = sub.map((q) => q[1]);
        return (
          <g key={i}>
            <rect
              x={Math.min(...xs) - 88}
              y={Math.min(...ys) - 46}
              width={Math.max(...xs) - Math.min(...xs) + 176}
              height={Math.max(...ys) - Math.min(...ys) + 92}
              rx={16}
              fill="none"
              stroke={COLORS.accent}
              strokeWidth={3}
              strokeDasharray="10 7"
            />
            {sg.label ? (
              <text
                x={Math.min(...xs) - 80}
                y={Math.min(...ys) - 56}
                fill={COLORS.accent}
                fontFamily={FONT}
                fontSize={24}
              >
                {sg.label}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 信号传递                                                        */
/* ------------------------------------------------------------------ */

/**
 * 信号传递：发送者有两种类型（高/低），选择信号（教育/广告…），接收者看到信号
 * 后选择行动。分离均衡下两种类型选不同信号；混同均衡下选同一个。
 * 均衡类型由 paths 明确给出，原语负责画清楚时序与分支。
 * 覆盖 Signaling / Asymmetric information。
 */
export const SignalingModel: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 发送者类型与占比。 */
  types: { label: string; share: number }[];
  /** 信号选项。 */
  signals: string[];
  /** 接收者行动。 */
  actions: string[];
  /** 均衡路径：类型 → 信号 → 行动。 */
  paths: { type: number; signal: number; action: number }[];
  /** 分离成本（用于标注"低成本类型模仿不划算"）。 */
  cost?: (typeIdx: number, signalIdx: number) => number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, types, signals, actions, paths, cost, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const colX = [x, x + w * 0.36, x + w * 0.72];
  const rowH = 116;
  const nodeH = 74;
  const sameSignal = new Set(paths.map((q) => q.signal)).size === 1;
  return (
    <g>
      <text x={colX[0]} y={y - 30} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
        nature picks type
      </text>
      <text x={colX[1]} y={y - 30} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
        sender signals
      </text>
      <text x={colX[2]} y={y - 30} fill={COLORS.textMuted} fontFamily={FONT} fontSize={25}>
        receiver acts
      </text>
      {types.map((t, i) => {
        const ty = y + i * rowH;
        const onPath = p > (i + 1) / (types.length + 1);
        return (
          <g key={i} opacity={onPath ? 1 : 0.3}>
            <rect x={colX[0]} y={ty} width={230} height={nodeH} rx={12} fill={alpha(color, 0.18)} stroke={color} strokeWidth={3} />
            <text x={colX[0] + 115} y={ty + 46} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
              {`${t.label} (${(t.share * 100).toFixed(0)}%)`}
            </text>
          </g>
        );
      })}
      {signals.map((s, j) => {
        const sy = y + j * rowH;
        return (
          <g key={j}>
            <rect
              x={colX[1]}
              y={sy}
              width={230}
              height={nodeH}
              rx={12}
              fill={alpha(COLORS.accent, 0.16)}
              stroke={COLORS.accent}
              strokeWidth={3}
            />
            <text x={colX[1] + 115} y={sy + 46} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
              {s}
            </text>
          </g>
        );
      })}
      {actions.map((a, k) => {
        const ay = y + k * rowH;
        return (
          <g key={k}>
            <rect
              x={colX[2]}
              y={ay}
              width={230}
              height={nodeH}
              rx={12}
              fill={alpha(COLORS.result, 0.16)}
              stroke={COLORS.result}
              strokeWidth={3}
            />
            <text x={colX[2] + 115} y={ay + 46} fill={COLORS.textStrong} fontFamily={FONT} fontSize={26} fontWeight={700} textAnchor="middle">
              {a}
            </text>
          </g>
        );
      })}
      {paths.map((q, i) => {
        if (p < (i + 1) / (paths.length + 1)) return null;
        const y0 = y + q.type * rowH + nodeH / 2;
        const y1 = y + q.signal * rowH + nodeH / 2;
        const y2 = y + q.action * rowH + nodeH / 2;
        return (
          <g key={i}>
            <line x1={colX[0] + 230} y1={y0} x2={colX[1]} y2={y1} stroke={COLORS.accent} strokeWidth={3.4} />
            <polygon
              points={headPts(colX[1], y1, (Math.atan2(y1 - y0, colX[1] - colX[0] - 230) * 180) / Math.PI, 13)}
              fill={COLORS.accent}
            />
            <line x1={colX[1] + 230} y1={y1} x2={colX[2]} y2={y2} stroke={COLORS.result} strokeWidth={3.4} />
            <polygon
              points={headPts(colX[2], y2, (Math.atan2(y2 - y1, colX[2] - colX[1] - 230) * 180) / Math.PI, 13)}
              fill={COLORS.result}
            />
            {cost ? (
              <text
                x={(colX[0] + 230 + colX[1]) / 2}
                y={(y0 + y1) / 2 - 12}
                fill={COLORS.warn}
                fontFamily={FONT}
                fontSize={22}
                textAnchor="middle"
              >
                {`cost ${cost(q.type, q.signal).toFixed(0)}`}
              </text>
            ) : null}
          </g>
        );
      })}
      {paths.length > 0 && p > 0.9 ? (
        <text
          x={x}
          y={y + Math.max(types.length, signals.length, actions.length) * rowH + 60}
          fill={sameSignal ? COLORS.warn : COLORS.result}
          fontFamily={FONT}
          fontSize={29}
          fontWeight={700}
        >
          {sameSignal ? 'pooling equilibrium' : 'separating equilibrium'}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 逆向选择                                                        */
/* ------------------------------------------------------------------ */

/**
 * 逆向选择（柠檬市场）：横轴质量、两条线分别是卖方愿意接受的最低价格
 * （随质量上升）与买方按平均质量愿付的价格。买方只愿付均价 → 高质量退出
 * → 均价再降，箭头标出这个螺旋。覆盖 Adverse selection。
 */
export const AdverseSelection: React.FC<{
  s: Scale;
  /** 卖方对质量 q 的最低可接受价格。 */
  sellerValue: (q: number) => number;
  /** 买方对质量的估值（通常高于卖方价值，否则无交易）。 */
  buyerValue: (q: number) => number;
  /** 已知的质量上限（剩余市场的最高品质）。 */
  qMax?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ s, sellerValue, buyerValue, qMax, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const [q0, q1] = s.xDomain;
  const hi = qMax ?? q1;
  // 买方按平均质量出价
  const avgQ = (q0 + hi) / 2;
  const offer = buyerValue(avgQ);
  // 卖方只愿意卖出价值低于报价的质量
  const cutoff = intersect(sellerValue, () => offer, q0, hi);
  const exitFrom = cutoff === null ? hi : cutoff;
  return (
    <g>
      <path
        d={toPath(s, sample(sellerValue, q0, q1))}
        fill="none"
        stroke={color}
        strokeWidth={4.4}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <path
        d={toPath(s, sample(buyerValue, q0, q1))}
        fill="none"
        stroke={COLORS.alt}
        strokeWidth={4.4}
        pathLength={1000}
        strokeDasharray={1000}
        strokeDashoffset={1000 * (1 - p)}
      />
      <text x={s.px(q1) + 12} y={s.py(sellerValue(q1)) + 8} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        seller
      </text>
      <text x={s.px(q1) + 12} y={s.py(buyerValue(q1)) + 8} fill={COLORS.alt} fontFamily={FONT} fontSize={26} fontWeight={700}>
        buyer
      </text>
      {p > 0.4 ? (
        <g>
          <line x1={s.px(q0)} y1={s.py(offer)} x2={s.px(q1)} y2={s.py(offer)} stroke={COLORS.accent} strokeWidth={3.2} strokeDasharray="10 7" />
          <text x={s.px(q1) + 12} y={s.py(offer) + 8} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700}>
            {`offer = ${offer.toFixed(1)}`}
          </text>
          <text x={s.px(avgQ)} y={s.py(offer) - 20} fill={COLORS.accent} fontFamily={FONT} fontSize={24} textAnchor="middle">
            {`priced on average quality ${avgQ.toFixed(1)}`}
          </text>
        </g>
      ) : null}
      {cutoff !== null && p > 0.6 ? (
        <g>
          <rect
            x={s.px(cutoff)}
            y={s.py(s.yDomain[1])}
            width={Math.max(0, s.px(q1) - s.px(cutoff))}
            height={Math.max(0, s.py(s.yDomain[0]) - s.py(s.yDomain[1]))}
            fill={alpha(COLORS.warn, 0.14)}
          />
          <line x1={s.px(cutoff)} y1={s.py(s.yDomain[0])} x2={s.px(cutoff)} y2={s.py(s.yDomain[1])} stroke={COLORS.warn} strokeWidth={3} />
          <text x={s.px(exitFrom) + 18} y={s.py(s.yDomain[1]) + 40} fill={COLORS.warn} fontFamily={FONT} fontSize={27} fontWeight={700}>
            {`quality above ${cutoff.toFixed(1)} exits`}
          </text>
        </g>
      ) : null}
      {p > 0.85 ? (
        <text x={s.px(q0) + 20} y={s.py(s.yDomain[0]) - 26} fill={COLORS.warn} fontFamily={FONT} fontSize={28} fontWeight={700}>
          adverse selection: average pricing drives out the good cars
        </text>
      ) : null}
    </g>
  );
};
