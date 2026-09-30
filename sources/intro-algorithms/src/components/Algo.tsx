import React from 'react';
import { COLORS, FONT, alpha } from '../theme';

/**
 * Algo.tsx — Introduction to Algorithms 的 L2 学科原语（8 个结构性图形）。
 *
 * 约定（edu-video-kit §5）：一切基于内部坐标系，标 `s.px/s.py` 不写死像素；
 * 每个 mark 自带 `progress`(0..1) 绘入动画；颜色只取 COLORS，透明一律 alpha()；
 * 屏上数字一律由函数从 props 算出（不写字面量）。
 */

/* ───────────────────────── 通用 helpers ───────────────────────── */

const clamp01 = (x: number): number => (x < 0 ? 0 : x > 1 ? 1 : x);

/** 第 i 个元素在全局 progress 下的错峰绘入窗口（spread 控制重叠度）。 */
const reveal = (i: number, p: number, n: number, spread = 1): number =>
  clamp01((p * n - i) / spread);

/** 离散网格坐标系：列/行 -> 像素中心。所有"数组/格"类原语共用同一套 px 映射。 */
type Grid = {
  x0: number;
  y0: number;
  cw: number;
  ch: number;
  cx: (c: number) => number;
  cy: (r: number) => number;
};
const gridScale = (o: { x0: number; y0: number; cw: number; ch: number }): Grid => ({
  ...o,
  cx: (c) => o.x0 + c * o.cw + o.cw / 2,
  cy: (r) => o.y0 + r * o.ch + o.ch / 2,
});

/** 路径绘入：pathLength=1 + dashoffset 由 progress 推动。 */
const drawOn = (p: number) => ({
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1 - clamp01(p),
});

/** 箭头头部多边形，angle 为指向 (x,y) 的方向（弧度）。 */
const arrowHead = (x: number, y: number, angle: number, size = 11, color = COLORS.textMuted) => {
  const a1 = angle + Math.PI * 0.82;
  const a2 = angle - Math.PI * 0.82;
  return (
    <polygon
      points={`${x},${y} ${x + size * Math.cos(a1)},${y + size * Math.sin(a1)} ${
        x + size * Math.cos(a2)
      },${y + size * Math.sin(a2)}`}
      fill={color}
    />
  );
};

/** 数字格式化：整数原样，浮点两位，避免场景与文案漂移。 */
const fmt = (v: number): string => (Number.isInteger(v) ? String(v) : v.toFixed(2));

/* ────────────────── 1. RecursionTree：调用树 ────────────────── */
// 画递归调用树：每节点标子问题区间(span)与规模(size)，沿 activePath 高亮当前调用链。
export type RecNode = {
  id: string;
  label: string;
  span: string;
  size: string;
  children?: RecNode[];
};

export const RecursionTree: React.FC<{
  width: number;
  height: number;
  root: RecNode;
  activePath?: string[];
  progress?: number;
  nodeW?: number;
  nodeH?: number;
}> = ({ width, height, root, activePath = [], progress = 1, nodeW = 96, nodeH = 56 }) => {
  const pos: Record<string, { x: number; y: number }> = {};
  const order: string[] = [];
  const leaf = { i: 0 };
  const layout = (n: RecNode, depth: number, isLeaf: boolean) => {
    if (isLeaf) {
      pos[n.id] = { x: leaf.i++, y: depth };
    } else {
      n.children!.forEach((c) => layout(c, depth + 1, !c.children?.length));
      const xs = n.children!.map((c) => pos[c.id].x);
      pos[n.id] = { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: depth };
    }
    order.push(n.id);
  };
  layout(root, 0, !root.children?.length);
  const leafCount = Math.max(1, leaf.i);
  const padL = 60;
  const innerW = width - padL * 2;
  const top = 96;
  const levelGap = Math.max(96, (height - top - 70) / Math.max(1, maxDepth(root)));
  const px = (x: number) => padL + (leafCount === 1 ? 0.5 : x / (leafCount - 1)) * innerW;
  const py = (y: number) => top + y * levelGap;
  const active = new Set(activePath);
  const total = order.length;

  const edges: { a: string; b: string }[] = [];
  const walkEdges = (n: RecNode) =>
    n.children?.forEach((c) => {
      edges.push({ a: n.id, b: c.id });
      walkEdges(c);
    });
  walkEdges(root);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {edges.map((e, k) => {
        const A = pos[e.a];
        const B = pos[e.b];
        const ax = px(A.x);
        const ay = py(A.y) + nodeH / 2;
        const bx = px(B.x);
        const by = py(B.y) - nodeH / 2;
        const ang = Math.atan2(by - ay, bx - ax);
        const ep = reveal(k + 1, progress, total, 1.4);
        return (
          <g key={`e${e.a}-${e.b}`} opacity={ep}>
            <line
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke={COLORS.axis}
              strokeWidth={2.2}
              {...drawOn(ep)}
            />
            {arrowHead(bx, by, ang, 9, COLORS.axis)}
          </g>
        );
      })}
      {order.map((id, k) => {
        const P = pos[id];
        const n = findNode(root, id)!;
        const cx = px(P.x);
        const cy = py(P.y);
        const rp = reveal(k, progress, total);
        const isActive = active.has(id);
        const fill = isActive ? COLORS.accent : COLORS.primary;
        return (
          <g key={id} opacity={rp}>
            <rect
              x={cx - nodeW / 2}
              y={cy - nodeH / 2}
              width={nodeW}
              height={nodeH}
              rx={12}
              fill={alpha(fill, isActive ? 0.18 : 0.1)}
              stroke={alpha(fill, 0.9)}
              strokeWidth={isActive ? 3 : 2.2}
            />
            <text
              x={cx}
              y={cy + 6}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={22}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {n.label}
            </text>
            <text
              x={cx}
              y={cy - nodeH / 2 - 12}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={18}
              fill={COLORS.accent}
            >
              {n.size}
            </text>
            <text
              x={cx}
              y={cy + nodeH / 2 + 22}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={18}
              fill={COLORS.textMuted}
            >
              {n.span}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const maxDepth = (n: RecNode): number =>
  n.children?.length ? 1 + Math.max(...n.children.map(maxDepth)) : 0;
const findNode = (n: RecNode, id: string): RecNode | null =>
  n.id === id ? n : (n.children?.map((c) => findNode(c, id)).find(Boolean) ?? null);

/* ────────────────── 2. HeapDuality：堆的数组/树双视图 ────────────────── */
// 同一份数据同时画成数组（上）与二叉树（下），highlight 下标在两视图同步高亮并连线。
export const HeapDuality: React.FC<{
  width: number;
  height: number;
  values: number[];
  highlight?: number[];
  kind?: 'max' | 'min';
  progress?: number;
  cell?: number;
}> = ({ width, height, values, highlight = [], kind = 'max', progress = 1, cell = 84 }) => {
  const n = values.length;
  const hi = new Set(highlight);
  const padX = 60;
  const cellW = Math.min(cell, (width - padX * 2) / n);
  const gap = cellW * 0.12;
  const cw = cellW - gap;
  const arrayY = 120;
  const ch = Math.min(72, cw);

  // 树布局：节点 i 在 depth 行，行内第 k 个
  const depthOf = (i: number) => Math.floor(Math.log2(i + 1));
  const inRow = (i: number) => i - (2 ** depthOf(i) - 1);
  const rowCount = (d: number) => 2 ** d;
  const treeTop = arrayY + ch + 130;
  const maxD = n ? depthOf(n - 1) : 0;
  // The deepest node still carries its `2^depth` caption below it (ch/2 + 20 from
  // the node centre), so the bottom reserve has to cover that caption rather than
  // a flat 40px — otherwise the caption escapes the viewBox and R2 (figures must
  // be sealed) fails on every heap with more than one level.
  const bottomReserve = ch / 2 + 34;
  const levelGap = Math.max(96, (height - treeTop - bottomReserve) / Math.max(1, maxD));
  const treeX = (i: number) => {
    const d = depthOf(i);
    const k = inRow(i);
    return padX + ((k + 0.5) / rowCount(d)) * (width - padX * 2);
  };
  const treeY = (i: number) => treeTop + depthOf(i) * levelGap;

  // 层级连线（父 -> 子），按深度错峰绘入
  const links: { p: number; c: number }[] = [];
  for (let i = 1; i < n; i++) links.push({ p: Math.floor((i - 1) / 2), c: i });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <text x={padX} y={arrayY - 28} fontFamily={FONT} fontSize={22} fill={COLORS.textMuted}>
        {kind === 'max' ? 'max-heap array' : 'min-heap array'}
      </text>
      {values.map((v, i) => {
        const x = padX + i * cellW + gap / 2;
        const y = arrayY;
        const isHi = hi.has(i);
        const rp = reveal(i, progress, n);
        const col = isHi ? COLORS.accent : COLORS.primary;
        return (
          <g key={`a${i}`} opacity={rp}>
            <rect
              x={x}
              y={y}
              width={cw}
              height={ch}
              rx={10}
              fill={alpha(col, isHi ? 0.22 : 0.1)}
              stroke={alpha(col, 0.95)}
              strokeWidth={isHi ? 3 : 2}
            />
            <text
              x={x + cw / 2}
              y={y + ch / 2 + 8}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={26}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {fmt(v)}
            </text>
            <text
              x={x + cw / 2}
              y={y + ch + 20}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={16}
              fill={COLORS.textDim}
            >
              {i}
            </text>
          </g>
        );
      })}

      <text x={padX} y={treeTop - 26} fontFamily={FONT} fontSize={22} fill={COLORS.textMuted}>
        same data as a binary tree
      </text>
      {links.map(({ p, c }, k) => {
        const ax = treeX(p);
        const ay = treeY(p) + ch / 2;
        const bx = treeX(c);
        const by = treeY(c) - ch / 2;
        const ang = Math.atan2(by - ay, bx - ax);
        const ep = reveal(k, progress, links.length, 1.3);
        return (
          <g key={`l${c}`} opacity={ep}>
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke={COLORS.axis} strokeWidth={2} {...drawOn(ep)} />
            {arrowHead(bx, by, ang, 8, COLORS.axis)}
          </g>
        );
      })}
      {values.map((v, i) => {
        const cx = treeX(i);
        const cy = treeY(i);
        const isHi = hi.has(i);
        const rp = reveal(i + links.length, progress, n + links.length, 1.1);
        const col = isHi ? COLORS.accent : COLORS.primary;
        return (
          <g key={`t${i}`} opacity={rp}>
            <circle
              cx={cx}
              cy={cy}
              r={ch / 2}
              fill={alpha(col, isHi ? 0.22 : 0.1)}
              stroke={alpha(col, 0.95)}
              strokeWidth={isHi ? 3 : 2}
            />
            <text
              x={cx}
              y={cy + 7}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={24}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {fmt(v)}
            </text>
            {/* size/level 标注：子树所在层的大小 2^depth */}
            <text
              x={cx}
              y={cy + ch / 2 + 20}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={14}
              fill={COLORS.textDim}
            >
              {`2^${depthOf(i)}`}
            </text>
          </g>
        );
      })}

      {/* 同步连线：高亮下标在数组格与树节点之间各画一条虚线 */}
      {[...hi].map((i) => (
        <line
          key={`sync${i}`}
          x1={padX + i * cellW + cw / 2}
          y1={arrayY + ch}
          x2={treeX(i)}
          y2={treeY(i) - ch / 2}
          stroke={alpha(COLORS.accent, 0.5)}
          strokeWidth={1.6}
          strokeDasharray="6 6"
        />
      ))}
    </svg>
  );
};

/* ────────────────── 3. GraphView：通用图 ────────────────── */
// 通用图：有/无向、带权边、节点状态(未访问/边界/已访问/当前)、边高亮、可选距离标签，覆盖 BFS/DFS/最短路/拓扑。
export type GNode = { id: string; x: number; y: number; label?: string };
export type GEdge = { u: string; v: string; w?: number };
export type NodeState = 'unseen' | 'frontier' | 'visited' | 'current';
export type EdgeState = 'normal' | 'tree' | 'back' | 'active';

export const GraphView: React.FC<{
  width: number;
  height: number;
  nodes: GNode[];
  edges: GEdge[];
  directed?: boolean;
  nodeState?: Record<string, NodeState>;
  edgeState?: Record<string, EdgeState>;
  dist?: Record<string, number>;
  highlightNode?: string;
  highlightEdge?: [string, string];
  progress?: number;
  r?: number;
}> = ({
  width,
  height,
  nodes,
  edges,
  directed = false,
  nodeState = {},
  edgeState = {},
  dist = {},
  highlightNode,
  highlightEdge,
  progress = 1,
  r = 26,
}) => {
  const pad = 70;
  const px = (x: number) => pad + x * (width - pad * 2);
  const py = (y: number) => pad + y * (height - pad * 2);
  const P = Object.fromEntries(nodes.map((nd) => [nd.id, nd]));
  const stateColor = (s?: NodeState) =>
    s === 'current'
      ? COLORS.primary
      : s === 'frontier'
      ? COLORS.accent
      : s === 'visited'
      ? COLORS.result
      : COLORS.bg2;
  const edgeKey = (u: string, v: string) => `${u}->${v}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {edges.map((e, k) => {
        const A = P[e.u];
        const B = P[e.v];
        if (!A || !B) return null;
        const ax = px(A.x);
        const ay = py(A.y);
        const bx = px(B.x);
        const by = py(B.y);
        // 缩短到节点边缘
        const ang = Math.atan2(by - ay, bx - ax);
        const sx = ax + Math.cos(ang) * r;
        const sy = ay + Math.sin(ang) * r;
        const ex = bx - Math.cos(ang) * r;
        const ey = by - Math.sin(ang) * r;
        const st = edgeState[edgeKey(e.u, e.v)] ?? (directed ? 'normal' : 'normal');
        const isHi = highlightEdge && e.u === highlightEdge[0] && e.v === highlightEdge[1];
        const col =
          st === 'active' || isHi
            ? COLORS.accent
            : st === 'tree'
            ? COLORS.result
            : st === 'back'
            ? COLORS.warn
            : COLORS.axis;
        const ep = reveal(k, progress, edges.length, 1.2);
        return (
          <g key={`e${k}`} opacity={ep}>
            <line
              x1={sx}
              y1={sy}
              x2={ex}
              y2={ey}
              stroke={col}
              strokeWidth={isHi || st === 'tree' || st === 'active' ? 3.2 : 2}
              {...drawOn(ep)}
            />
            {directed || st !== 'normal' || isHi ? arrowHead(ex, ey, ang, 11, col) : null}
            {e.w != null ? (
              <text
                x={(sx + ex) / 2}
                y={(sy + ey) / 2 - 8}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={18}
                fill={COLORS.textMuted}
              >
                {fmt(e.w)}
              </text>
            ) : null}
          </g>
        );
      })}
      {nodes.map((nd, k) => {
        const cx = px(nd.x);
        const cy = py(nd.y);
        const s = nodeState[nd.id];
        const isHi = highlightNode === nd.id;
        const col = isHi ? COLORS.accent : stateColor(s);
        const rp = reveal(k, progress, nodes.length, 1.1);
        const glow = s === 'current' || isHi;
        return (
          <g key={nd.id} opacity={rp}>
            {glow ? (
              <circle cx={cx} cy={cy} r={r + 8} fill={alpha(col, 0.22)} />
            ) : null}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill={alpha(col, s === 'unseen' || !s ? 0.12 : 0.18)}
              stroke={alpha(col, 0.95)}
              strokeWidth={isHi || s === 'current' ? 3.4 : 2.4}
            />
            <text
              x={cx}
              y={cy + 7}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={22}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {nd.label ?? nd.id}
            </text>
            {dist[nd.id] != null ? (
              <g>
                <rect
                  x={cx + r - 4}
                  y={cy - r - 22}
                  width={52}
                  height={26}
                  rx={7}
                  fill={alpha(COLORS.bg0, 0.8)}
                  stroke={alpha(COLORS.result, 0.5)}
                />
                <text
                  x={cx + r + 22}
                  y={cy - r - 3}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize={18}
                  fontWeight={700}
                  fill={COLORS.result}
                >
                  {fmt(dist[nd.id])}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

/* ────────────────── 4. DPGrid：动态规划网格 ────────────────── */
// DP 状态网格：行/列带标签，按值填色，单元格之间画依赖箭头(transfer)，path 单元格高亮为最优解。
export const DPGrid: React.FC<{
  width: number;
  height: number;
  rows: string[];
  cols: string[];
  values: number[][];
  deps?: [number, number][]; // 形如 [r,c] 指向其依赖 [r-1,c] 等，由 from->to 画箭头
  path?: [number, number][];
  highlight?: [number, number][];
  progress?: number;
}> = ({ width, height, rows, cols, values, deps = [], path = [], highlight = [], progress = 1 }) => {
  const R = rows.length;
  const C = cols.length;
  const labelW = 96;
  const labelH = 60;
  const padT = 40;
  const padB = 40;
  const innerW = width - labelW - 60;
  const innerH = height - labelH - padT - padB;
  const cw = innerW / C;
  const ch = innerH / R;
  const ox = labelW + 30;
  const oy = labelH + padT;
  const cx = (c: number) => ox + c * cw + cw / 2;
  const cy = (r: number) => oy + r * ch + ch / 2;

  const maxV = Math.max(1, ...values.flat().map((v) => Math.abs(v)));
  const pathSet = new Set(path.map(([r, c]) => `${r},${c}`));
  const hiSet = new Set(highlight.map(([r, c]) => `${r},${c}`));

  // 单元格总数用于错峰绘入
  const total = R * C;
  const idxOf = (r: number, c: number) => r * C + c;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* 行/列标签 */}
      {cols.map((c, j) => (
        <text
          key={`col${j}`}
          x={cx(j)}
          y={labelH - 14}
          textAnchor="middle"
          fontFamily={FONT}
          fontSize={20}
          fill={COLORS.textMuted}
        >
          {c}
        </text>
      ))}
      {rows.map((rn, i) => (
        <text
          key={`row${i}`}
          x={labelW - 6}
          y={cy(i) + 7}
          textAnchor="end"
          fontFamily={FONT}
          fontSize={20}
          fill={COLORS.textMuted}
        >
          {rn}
        </text>
      ))}

      {/* 依赖箭头（在格下方，先画以免压住格子） */}
      {deps.map(([fr, fc], k) => {
        const dp = reveal(total + k, progress, total + deps.length, 1);
        const T = depsTarget(fr, fc);
        const ax = cx(fc);
        const ay = cy(fr) + ch / 2;
        const ex = cx(T[1]);
        const ey = cy(T[0]) - ch / 2;
        const ang = Math.atan2(ey - ay, ex - ax);
        return (
          <g key={`dep${k}`} opacity={dp}>
            <line
              x1={ax}
              y1={ay}
              x2={ex}
              y2={ey}
              stroke={alpha(COLORS.alt, 0.9)}
              strokeWidth={2.4}
              strokeDasharray="7 6"
            />
            {arrowHead(ex, ey, ang, 10, COLORS.alt)}
          </g>
        );
      })}

      {/* 单元格 */}
      {values.map((row, i) =>
        row.map((v, j) => {
          const rp = reveal(idxOf(i, j), progress, total);
          const isPath = pathSet.has(`${i},${j}`);
          const isHi = hiSet.has(`${i},${j}`);
          const t = Math.abs(v) / maxV;
          const col = isPath ? COLORS.result : isHi ? COLORS.accent : COLORS.primary;
          return (
            <g key={`c${i}-${j}`} opacity={rp}>
              <rect
                x={ox + j * cw + 3}
                y={oy + i * ch + 3}
                width={cw - 6}
                height={ch - 6}
                rx={9}
                fill={alpha(col, isPath || isHi ? 0.16 + 0.5 * t : 0.06 + 0.42 * t)}
                stroke={alpha(col, isPath || isHi ? 1 : 0.5)}
                strokeWidth={isPath ? 3 : isHi ? 2.6 : 1.6}
              />
              <text
                x={cx(j)}
                y={cy(i) + 7}
                textAnchor="middle"
                fontFamily={FONT}
                fontSize={22}
                fontWeight={700}
                fill={COLORS.textStrong}
              >
                {fmt(v)}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
};

// 依赖箭头目标：默认指向上一格(同列上一行)或左一格；caller 用 deps 列表直接给语义时这里退回通用"左下"。
const depsTarget = (r: number, c: number): [number, number] =>
  r > 0 ? [r - 1, c] : [r, Math.max(0, c - 1)];

/* ────────────────── 5. PartitionArray：快排分区 ────────────────── */
// 快排分区视图：标出 pivot、low/high 指针，按 <pivot / 未定 / >pivot 三区着色，i/j 游标动态。
export const PartitionArray: React.FC<{
  width: number;
  height: number;
  values: number[];
  pivot: number;
  i: number; // < 区右界（不含）
  j: number; // 扫描指针
  lo?: number;
  hi?: number;
  progress?: number;
}> = ({ width, height, values, pivot, i, j, lo = 0, hi = values.length - 1, progress = 1 }) => {
  const n = values.length;
  const padX = 56;
  const cw = (width - padX * 2) / n;
  const gap = cw * 0.12;
  const cellW = cw - gap;
  const ch = Math.min(86, cellW);
  const y = 150;
  const region = (idx: number): 'lt' | 'un' | 'gt' | 'piv' => {
    if (idx === pivot) return 'piv';
    if (idx < lo || idx > hi) return 'un';
    if (idx <= i) return 'lt';
    if (idx < j) return 'un';
    if (idx <= hi) return 'gt';
    return 'un';
  };
  const regColor = (rg: string) =>
    rg === 'lt' ? COLORS.result : rg === 'gt' ? COLORS.alt : rg === 'piv' ? COLORS.accent : COLORS.primary;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {values.map((v, k) => {
        const x = padX + k * cw + gap / 2;
        const rg = region(k);
        const rp = reveal(k, progress, n);
        const col = regColor(rg);
        return (
          <g key={k} opacity={rp}>
            <rect
              x={x}
              y={y}
              width={cellW}
              height={ch}
              rx={10}
              fill={alpha(col, rg === 'un' ? 0.08 : 0.2)}
              stroke={alpha(col, 0.95)}
              strokeWidth={rg === 'piv' ? 3.4 : 2.2}
            />
            <text
              x={x + cellW / 2}
              y={y + ch / 2 + 8}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={26}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {fmt(v)}
            </text>
            <text
              x={x + cellW / 2}
              y={y + ch + 22}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={15}
              fill={COLORS.textDim}
            >
              {k}
            </text>
          </g>
        );
      })}

      {/* lo / hi 边界括号 */}
      {lo <= hi ? (
        <g>
          <line
            x1={padX + lo * cw}
            y1={y - 26}
            x2={padX + lo * cw}
            y2={y + ch + 14}
            stroke={COLORS.textMuted}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <line
            x1={padX + (hi + 1) * cw}
            y1={y - 26}
            x2={padX + (hi + 1) * cw}
            y2={y + ch + 14}
            stroke={COLORS.textMuted}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </g>
      ) : null}

      {/* 指针 i / j */}
      <Pointer label="i" x={padX + i * cw + cellW / 2} y={y + ch + 52} color={COLORS.result} />
      <Pointer label="j" x={padX + j * cw + cellW / 2} y={y + ch + 52} color={COLORS.alt} />
      <text x={padX + (hi + 1) * cw + 10} y={y - 14} fontFamily={FONT} fontSize={18} fill={COLORS.textMuted}>
        hi
      </text>
      <text x={padX + lo * cw - 10} y={y - 14} fontFamily={FONT} fontSize={18} fill={COLORS.textMuted}>
        lo
      </text>
    </svg>
  );
};

const Pointer: React.FC<{ label: string; x: number; y: number; color: string }> = ({
  label,
  x,
  y,
  color,
}) => (
  <g>
    <line x1={x} y1={y - 16} x2={x} y2={y} stroke={color} strokeWidth={3} />
    <polygon points={`${x},${y - 22} ${x - 8},${y - 10} ${x + 8},${y - 10}`} fill={color} />
    <text x={x} y={y + 20} textAnchor="middle" fontFamily={FONT} fontSize={22} fontWeight={700} fill={color}>
      {label}
    </text>
  </g>
);

/* ────────────────── 6. MergeStep：归并一步 ────────────────── */
// 归并步：上排左 run、中排右 run、下排已合并输出，三游标 li/ri/mi 高亮当前被消费/写入的单元。
export const MergeStep: React.FC<{
  width: number;
  height: number;
  left: number[];
  right: number[];
  merged: number[];
  li: number;
  ri: number;
  mi: number;
  progress?: number;
}> = ({ width, height, left, right, merged, li, ri, mi, progress = 1 }) => {
  const n = Math.max(left.length, right.length, merged.length, 1);
  const padX = 60;
  const cw = (width - padX * 2) / n;
  const gap = cw * 0.12;
  const cellW = cw - gap;
  const ch = Math.min(78, cellW);
  const laneY = [120, 300, 480];
  const drawRow = (
    arr: number[],
    y: number,
    cursor: number,
    title: string,
    cursorColor: string,
    cursorLabel: string
  ) => (
    <g>
      <text x={padX} y={y - 22} fontFamily={FONT} fontSize={20} fill={COLORS.textMuted}>
        {title}
      </text>
      {arr.map((v, k) => {
        const x = padX + k * cw + gap / 2;
        const rp = reveal(k, progress, Math.max(1, arr.length));
        const isCur = k === cursor;
        const col = isCur ? cursorColor : COLORS.primary;
        return (
          <g key={`${title}-${k}`} opacity={rp}>
            <rect
              x={x}
              y={y}
              width={cellW}
              height={ch}
              rx={10}
              fill={alpha(col, isCur ? 0.24 : 0.1)}
              stroke={alpha(col, 0.95)}
              strokeWidth={isCur ? 3.4 : 2.2}
            />
            <text
              x={x + cellW / 2}
              y={y + ch / 2 + 8}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={24}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {fmt(v)}
            </text>
          </g>
        );
      })}
      {cursor >= 0 && cursor < arr.length ? (
        <Pointer label={cursorLabel} x={padX + cursor * cw + cellW / 2} y={y + ch + 30} color={cursorColor} />
      ) : null}
    </g>
  );

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {drawRow(left, laneY[0], li, 'left run L', COLORS.accent, 'li')}
      {drawRow(right, laneY[1], ri, 'right run R', COLORS.alt, 'ri')}
      {drawRow(merged, laneY[2], mi, 'merged output', COLORS.result, 'mi')}
    </svg>
  );
};

/* ────────────────── 7. UnionFind：并查集森林 ────────────────── */
// 并查集森林：父指针箭头(子->父)，active 高亮当前查询节点，compress 边以虚线揭示路径压缩(直连根)。
export type UFNode = { id: string; parent: string | null; label?: string; x?: number; y?: number };

export const UnionFind: React.FC<{
  width: number;
  height: number;
  nodes: UFNode[];
  compress?: [string, string][]; // [child, root] 路径压缩边
  active?: string;
  progress?: number;
  r?: number;
}> = ({ width, height, nodes, compress = [], active, progress = 1, r = 26 }) => {
  const byId = Object.fromEntries(nodes.map((nd) => [nd.id, nd]));
  // 自动分层布局：按到根距离定深度，同深度均分 x
  const depthOf = (nd: UFNode, seen = new Set<string>()): number => {
    if (nd.parent == null || nd.parent === nd.id || !byId[nd.parent] || seen.has(nd.id)) return 0;
    seen.add(nd.id);
    return 1 + depthOf(byId[nd.parent], seen);
  };
  const dep: Record<string, number> = {};
  nodes.forEach((nd) => (dep[nd.id] = depthOf(nd)));
  const maxD = Math.max(0, ...Object.values(dep));
  const perDepth: Record<number, string[]> = {};
  nodes.forEach((nd) => {
    const d = dep[nd.id];
    if (!perDepth[d]) perDepth[d] = [];
    perDepth[d].push(nd.id);
  });
  const padX = 70;
  const padT = 80;
  const levelGap = maxD > 0 ? (height - padT - 60) / maxD : 0;
  const pos: Record<string, { x: number; y: number }> = {};
  Object.entries(perDepth).forEach(([d, ids]) => {
    ids.forEach((id, k) => {
      const nd = byId[id];
      pos[id] = nd.x != null && nd.y != null
        ? { x: padX + nd.x * (width - padX * 2), y: padT + nd.y * (height - padT - 60) }
        : {
            x: padX + ((k + 0.5) / ids.length) * (width - padX * 2),
            y: padT + Number(d) * levelGap,
          };
    });
  });

  const compressSet = new Set(compress.map(([c, rt]) => `${c}->${rt}`));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* 常规父指针 */}
      {nodes.map((nd, k) => {
        if (nd.parent == null || nd.parent === nd.id || !byId[nd.parent]) return null;
        const A = pos[nd.id];
        const B = pos[nd.parent];
        const ang = Math.atan2(B.y - A.y, B.x - A.x);
        const sx = A.x + Math.cos(ang) * (r + 4);
        const sy = A.y + Math.sin(ang) * (r + 4);
        const ex = B.x - Math.cos(ang) * (r + 4);
        const ey = B.y - Math.sin(ang) * (r + 4);
        const ep = reveal(k, progress, nodes.length, 1.2);
        return (
          <g key={`p${nd.id}`} opacity={ep}>
            <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={COLORS.primary} strokeWidth={2.4} {...drawOn(ep)} />
            {arrowHead(ex, ey, ang, 10, COLORS.primary)}
          </g>
        );
      })}
      {/* 路径压缩边 */}
      {compress.map(([c, rt], k) => {
        if (!pos[c] || !pos[rt]) return null;
        const A = pos[c];
        const B = pos[rt];
        const ang = Math.atan2(B.y - A.y, B.x - A.x);
        const ep = reveal(nodes.length + k, progress, nodes.length + compress.length, 1);
        return (
          <g key={`cp${c}`} opacity={ep}>
            <line
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={alpha(COLORS.alt, 0.95)}
              strokeWidth={2.6}
              strokeDasharray="8 6"
            />
            {arrowHead(B.x, B.y, ang, 10, COLORS.alt)}
          </g>
        );
      })}
      {/* 节点 */}
      {nodes.map((nd, k) => {
        const P = pos[nd.id];
        const isActive = active === nd.id;
        const root = nd.parent == null || nd.parent === nd.id;
        const col = isActive ? COLORS.accent : root ? COLORS.result : COLORS.primary;
        const rp = reveal(k, progress, nodes.length, 1.1);
        return (
          <g key={`n${nd.id}`} opacity={rp}>
            {isActive ? <circle cx={P.x} cy={P.y} r={r + 8} fill={alpha(col, 0.22)} /> : null}
            <circle
              cx={P.x}
              cy={P.y}
              r={r}
              fill={alpha(col, root ? 0.2 : 0.12)}
              stroke={alpha(col, 0.95)}
              strokeWidth={isActive || root ? 3.2 : 2.4}
            />
            <text
              x={P.x}
              y={P.y + 7}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={22}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {nd.label ?? nd.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ────────────────── 8. BalancedBST：平衡二叉搜索树 ────────────────── */
// 平衡 BST：按中序叶子定位 x、深度定位 y；highlight 节点高亮，rot 在节点处标注左旋/右旋方向。
export type BSTNode = {
  key: number;
  left?: BSTNode;
  right?: BSTNode;
  bf?: number; // 平衡因子，可选标注
};

export const BalancedBST: React.FC<{
  width: number;
  height: number;
  root: BSTNode;
  highlight?: number[];
  rot?: { key: number; dir: 'L' | 'R' };
  progress?: number;
  nodeR?: number;
}> = ({ width, height, root, highlight = [], rot, progress = 1, nodeR = 30 }) => {
  const hi = new Set(highlight);
  const pos: Record<number, { x: number; y: number }> = {};
  const order: number[] = [];
  const leaf = { i: 0 };
  const layout = (n: BSTNode, depth: number, isLeaf: boolean) => {
    if (isLeaf) {
      pos[n.key] = { x: leaf.i++, y: depth };
    } else {
      n.left && layout(n.left, depth + 1, !n.left.left && !n.left.right);
      n.right && layout(n.right, depth + 1, !n.right.left && !n.right.right);
      const xs: number[] = [];
      n.left && xs.push(pos[n.left.key].x);
      n.right && xs.push(pos[n.right.key].x);
      pos[n.key] = { x: xs.length ? (Math.min(...xs) + Math.max(...xs)) / 2 : leaf.i++, y: depth };
    }
    order.push(n.key);
  };
  layout(root, 0, !root.left && !root.right);
  const leafCount = Math.max(1, leaf.i);
  const padL = 60;
  const innerW = width - padL * 2;
  const top = 90;
  const levelGap = Math.max(100, (height - top - 70) / Math.max(1, bstDepth(root)));
  const px = (x: number) => padL + (leafCount === 1 ? 0.5 : x / (leafCount - 1)) * innerW;
  const py = (y: number) => top + y * levelGap;

  const edges: { a: number; b: number }[] = [];
  const walk = (n: BSTNode) => {
    n.left && (edges.push({ a: n.key, b: n.left.key }), walk(n.left));
    n.right && (edges.push({ a: n.key, b: n.right.key }), walk(n.right));
  };
  walk(root);
  const total = order.length;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {edges.map((e, k) => {
        const A = pos[e.a];
        const B = pos[e.b];
        const ax = px(A.x);
        const ay = py(A.y) + nodeR;
        const bx = px(B.x);
        const by = py(B.y) - nodeR;
        const ang = Math.atan2(by - ay, bx - ax);
        const ep = reveal(k, progress, total, 1.3);
        return (
          <g key={`e${e.a}-${e.b}`} opacity={ep}>
            <line x1={ax} y1={ay} x2={bx} y2={by} stroke={COLORS.axis} strokeWidth={2.2} {...drawOn(ep)} />
            {arrowHead(bx, by, ang, 9, COLORS.axis)}
          </g>
        );
      })}
      {order.map((key, k) => {
        const P = pos[key];
        const cx = px(P.x);
        const cy = py(P.y);
        const rp = reveal(k, progress, total);
        const isHi = hi.has(key);
        const col = isHi ? COLORS.accent : COLORS.primary;
        return (
          <g key={key} opacity={rp}>
            <circle
              cx={cx}
              cy={cy}
              r={nodeR}
              fill={alpha(col, isHi ? 0.22 : 0.1)}
              stroke={alpha(col, 0.95)}
              strokeWidth={isHi ? 3.2 : 2.2}
            />
            <text
              x={cx}
              y={cy + 7}
              textAnchor="middle"
              fontFamily={FONT}
              fontSize={22}
              fontWeight={700}
              fill={COLORS.textStrong}
            >
              {key}
            </text>
            {rot && rot.key === key ? (
              <g>
                <text
                  x={cx}
                  y={cy - nodeR - 16}
                  textAnchor="middle"
                  fontFamily={FONT}
                  fontSize={20}
                  fontWeight={700}
                  fill={COLORS.warn}
                >
                  {rot.dir === 'L' ? '⟲ left-rot' : '⟳ right-rot'}
                </text>
                <line
                  x1={cx}
                  y1={cy - nodeR}
                  x2={cx + (rot.dir === 'L' ? -44 : 44)}
                  y2={cy - nodeR - 36}
                  stroke={COLORS.warn}
                  strokeWidth={2.4}
                />
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

const bstDepth = (n: BSTNode): number =>
  1 + Math.max(n.left ? bstDepth(n.left) : 0, n.right ? bstDepth(n.right) : 0);
