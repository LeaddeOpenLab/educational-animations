import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Backdrop } from './Backdrop';
import {
  RecursionTree,
  HeapDuality,
  GraphView,
  DPGrid,
  PartitionArray,
  MergeStep,
  UnionFind,
  BalancedBST,
} from './Algo';
import { COLORS, FONT, alpha } from '../theme';

/* ───────── 13 个知识点的专属封面图元（全部复用 kit 的 L2 原语，静态 1 帧） ───────── */

/* 1. divide-and-conquer-recursion — 递归树：一个调用分叉成更小的副本 */
const DAC_TREE = {
  id: 'r', label: 'T(n)', span: '0..n', size: 'n',
  children: [
    {
      id: 'a', label: 'T(n/2)', span: '0..n/2', size: 'n/2',
      children: [
        { id: 'a1', label: 'T(n/4)', span: '0..n/4', size: 'n/4' },
        { id: 'a2', label: 'T(n/4)', span: 'n/4..n/2', size: 'n/4' },
      ],
    },
    {
      id: 'b', label: 'T(n/2)', span: 'n/2..n', size: 'n/2',
      children: [
        { id: 'b1', label: 'T(n/4)', span: 'n/2..3n/4', size: 'n/4' },
        { id: 'b2', label: 'T(n/4)', span: '3n/4..n', size: 'n/4' },
      ],
    },
  ],
};
const DivideAndConquerFigure: React.FC = () => (
  <RecursionTree width={640} height={620} root={DAC_TREE} activePath={['r', 'a', 'a1']} progress={1} />
);

/* 2. recursive — 每层只缩一步的线性递归链（单分支，与上面明显不同） */
const REC_CHAIN = {
  id: 'r', label: 'f(n)', span: 'n', size: 'n',
  children: [
    {
      id: '1', label: 'f(n-1)', span: 'n-1', size: 'n-1',
      children: [
        {
          id: '2', label: 'f(n-2)', span: 'n-2', size: 'n-2',
          children: [
            {
              id: '3', label: 'f(n-3)', span: 'n-3', size: 'n-3',
              children: [{ id: '4', label: 'f(0)', span: '0', size: '0' }],
            },
          ],
        },
      ],
    },
  ],
};
const RecursiveFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(0 -13)">
      <RecursionTree width={640} height={620} root={REC_CHAIN} activePath={['r', '1', '2']} progress={1} />
    </g>
    <text x={92} y={470} textAnchor="middle" fill={COLORS.primary} fontFamily={FONT} fontSize={22} fontWeight={700}>
      one rule: f(n) = f(n−1) + 1
    </text>
    <text x={548} y={470} textAnchor="middle" fill={COLORS.accent} fontFamily={FONT} fontSize={22} fontWeight={700}>
      one floor: f(0) = 0
    </text>
  </svg>
);

/* 3. heap-structure — 同一组数的数组视图 ↔ 树视图对偶（高亮一处显示同步虚线） */
const HEAP_VALS = [1, 3, 5, 7, 9, 11, 13, 15];
const HeapStructureFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(0 -37)">
      <HeapDuality width={640} height={620} values={HEAP_VALS} highlight={[3]} kind="max" progress={1} />
    </g>
  </svg>
);

/* 4. heap-sort — 堆 + 已排序后缀（尾部高亮 = 已取出的堆顶，体现"取顶/缩堆/重复"） */
const HEAP_SORT_VALS = [19, 14, 18, 8, 9, 10, 7, 1, 3];
const HeapSortFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(0 -35)">
      <HeapDuality width={640} height={620} values={HEAP_SORT_VALS} highlight={[6, 7, 8]} kind="max" progress={1} />
    </g>
  </svg>
);

/* 5. balanced-binary-search-tree — 平衡二叉搜索树（完全平衡，高亮根） */
const BST = {
  key: 50,
  left: {
    key: 25,
    left: { key: 12, left: { key: 6 }, right: { key: 18 } },
    right: { key: 37, left: { key: 31 }, right: { key: 43 } },
  },
  right: {
    key: 75,
    left: { key: 62, left: { key: 56 }, right: { key: 69 } },
    right: { key: 88, left: { key: 81 }, right: { key: 94 } },
  },
};
const BalancedBstFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(0 48)">
      <BalancedBST width={640} height={620} root={BST} highlight={[50]} progress={1} nodeR={30} />
    </g>
  </svg>
);

/* 6. graph-search — 一张图 + 遍历状态（已访问/边界/当前/未访问） */
const GS_NODES = [
  { id: 'A', x: 0.2, y: 0.3, label: 'A' },
  { id: 'B', x: 0.5, y: 0.2, label: 'B' },
  { id: 'C', x: 0.82, y: 0.35, label: 'C' },
  { id: 'D', x: 0.28, y: 0.72, label: 'D' },
  { id: 'E', x: 0.6, y: 0.68, label: 'E' },
  { id: 'F', x: 0.85, y: 0.78, label: 'F' },
];
const GS_EDGES = [
  { u: 'A', v: 'B' }, { u: 'A', v: 'D' }, { u: 'B', v: 'C' }, { u: 'B', v: 'E' },
  { u: 'D', v: 'E' }, { u: 'E', v: 'F' }, { u: 'C', v: 'F' },
];
const GraphSearchFigure: React.FC = () => (
  <GraphView
    width={640}
    height={620}
    nodes={GS_NODES}
    edges={GS_EDGES}
    nodeState={{ D: 'visited', A: 'visited', B: 'current', E: 'frontier', C: 'frontier', F: 'unseen' }}
    highlightNode="B"
    progress={1}
  />
);

/* 7. shortest-path — 带权图 + 每个顶点的距离标签 */
const SP_NODES = [
  { id: 'A', x: 0.15, y: 0.3 },
  { id: 'B', x: 0.4, y: 0.2 },
  { id: 'C', x: 0.72, y: 0.32 },
  { id: 'D', x: 0.3, y: 0.72 },
  { id: 'E', x: 0.62, y: 0.66 },
  { id: 'F', x: 0.85, y: 0.72 },
];
const SP_EDGES = [
  { u: 'A', v: 'B', w: 2 }, { u: 'A', v: 'D', w: 5 }, { u: 'B', v: 'C', w: 1 },
  { u: 'B', v: 'E', w: 4 }, { u: 'D', v: 'E', w: 2 }, { u: 'E', v: 'F', w: 3 }, { u: 'C', v: 'F', w: 6 },
];
const ShortestPathFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(-23 0)">
      <GraphView
        width={640}
        height={620}
        nodes={SP_NODES}
        edges={SP_EDGES}
        dist={{ A: 0, B: 2, C: 3, D: 5, E: 6, F: 9 }}
        highlightNode="E"
        progress={1}
      />
    </g>
  </svg>
);

/* 8. dynamic-programming-status — DP 格子网格，高亮整列"状态"（状态 = 答案的地址） */
const DP_ROWS = ['0', '1', '2', '3'];
const DP_COLS = ['0', '1', '2', '3', '4'];
const DP_STATUS_VALS = [
  [0, 0, 0, 0, 0],
  [0, 2, 2, 2, 2],
  [0, 2, 5, 5, 5],
  [0, 2, 5, 6, 7],
];
const DpStatusFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(-24 0)">
      <DPGrid
        width={640}
        height={620}
        rows={DP_ROWS}
        cols={DP_COLS}
        values={DP_STATUS_VALS}
        highlight={[[0, 4], [1, 4], [2, 4], [3, 4]]}
        progress={1}
      />
    </g>
  </svg>
);

/* 9. dynamic-programming-transfer — DP 网格 + 回指箭头，体现状态转移 */
const DP_TRANSFER_VALS = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1],
  [0, 1, 2, 2, 2],
  [0, 1, 2, 3, 3],
];
const DpTransferFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <g transform="translate(-23 0)">
      <DPGrid
        width={640}
        height={620}
        rows={DP_ROWS}
        cols={DP_COLS}
        values={DP_TRANSFER_VALS}
        deps={[[3, 4], [2, 4], [1, 4], [3, 3], [2, 3], [0, 4], [0, 3]]}
        path={[[0, 0], [1, 1], [2, 2], [3, 3]]}
        progress={1}
      />
    </g>
  </svg>
);

/* 10. quicksort-partitioning — 数组四区间 + 扫描指针 + 枢轴 */
const QS_VALS = [12, 18, 21, 45, 33, 7, 40, 50, 60];
const QuickSortFigure: React.FC = () => (
  <svg width={640} height={620} viewBox="0 0 640 620">
    <text x={320} y={170} textAnchor="middle" fill={COLORS.textStrong} fontFamily={FONT} fontSize={24} fontWeight={700}>
      four regions, one linear sweep
    </text>
    <g transform="translate(0 110)">
      <PartitionArray width={640} height={620} values={QS_VALS} pivot={4} i={2} j={6} lo={0} hi={8} progress={1} />
    </g>
    <text x={58} y={450} fill={COLORS.result} fontFamily={FONT} fontSize={20} fontWeight={700}>
      ≤ pivot
    </text>
    <text x={216} y={450} fill={COLORS.accent} fontFamily={FONT} fontSize={20} fontWeight={700}>
      pivot
    </text>
    <text x={330} y={450} fill={COLORS.primary} fontFamily={FONT} fontSize={20} fontWeight={700}>
      unknown
    </text>
    <text x={494} y={450} fill={COLORS.alt} fontFamily={FONT} fontSize={20} fontWeight={700}>
      ≥ pivot
    </text>
    <text x={320} y={495} textAnchor="middle" fill={COLORS.textMuted} fontFamily={FONT} fontSize={19}>
      the pivot lands in its final place
    </text>
  </svg>
);

/* 11. merge-step-in-merge-sort — 两个已排序半区 + 比较头部写入输出 */
const MergeStepFigure: React.FC = () => (
  <MergeStep
    width={640}
    height={620}
    left={[2, 5, 9, 12]}
    right={[3, 8, 10, 15]}
    merged={[2, 3, 5, 9, 10, 12, 15]}
    li={2}
    ri={1}
    mi={3}
    progress={1}
  />
);

/* 12. union-find-path-compression — 并查集森林 + 路径被压平（虚线直连根） */
const UF_NODES = [
  { id: 'A', parent: null, label: 'A' },
  { id: 'B', parent: 'A', label: 'B' },
  { id: 'C', parent: 'B', label: 'C' },
  { id: 'D', parent: 'C', label: 'D' },
  { id: 'E', parent: 'A', label: 'E' },
  { id: 'F', parent: 'E', label: 'F' },
];
const UnionFindFigure: React.FC = () => (
  <UnionFind
    width={640}
    height={620}
    nodes={UF_NODES}
    compress={[['D', 'A'], ['C', 'A']]}
    active="D"
    progress={1}
  />
);

/* 13. topological-sorting — DAG + 拓扑序/入度为 0 的顶点（有向 + 状态着色） */
const TS_NODES = [
  { id: 'A', x: 0.25, y: 0.85, label: 'A' },
  { id: 'B', x: 0.62, y: 0.85, label: 'B' },
  { id: 'C', x: 0.18, y: 0.5, label: 'C' },
  { id: 'D', x: 0.5, y: 0.5, label: 'D' },
  { id: 'E', x: 0.82, y: 0.5, label: 'E' },
  { id: 'F', x: 0.35, y: 0.15, label: 'F' },
  { id: 'G', x: 0.7, y: 0.15, label: 'G' },
];
const TS_EDGES = [
  { u: 'A', v: 'C' }, { u: 'A', v: 'D' }, { u: 'B', v: 'D' }, { u: 'B', v: 'E' },
  { u: 'C', v: 'F' }, { u: 'D', v: 'F' }, { u: 'D', v: 'G' }, { u: 'E', v: 'G' },
];
const TopoFigure: React.FC = () => (
  <GraphView
    width={640}
    height={620}
    nodes={TS_NODES}
    edges={TS_EDGES}
    directed
    nodeState={{
      A: 'current', B: 'current', C: 'visited', D: 'visited', E: 'frontier', F: 'frontier', G: 'unseen',
    }}
    highlightNode="A"
    progress={1}
  />
);

/**
 * Static cover poster for one knowledge point — rendered separately, never
 * grabbed from the finished video.
 *
 *   remotion still cover out/<slug>.jpg --frame=0 --log=error \
 *     --props='{"name":"Decision Boundary","discipline":"Artificial Intelligence",
 *               "course":"Introduction to Machine Learning",
 *               "figure":"ml-scatter-boundary","brand":"icon"}'
 *
 * Layout (locked numbers, do not eyeball them):
 *   left copy block   left 150 / width 1010 / vertically centred / gap 30
 *     eyebrow = Course          27px  700  tracking 5.5  uppercase  accent
 *     knowledge point = Name    800   lineHeight 1.08   tracking -1.4  textStrong
 *                               size by length: ≤18→116 ≤30→96 ≤44→78 else 66
 *     rule                      196x7  radius 7  primary
 *     footnote                  23px  tracking 2.4  uppercase  textDim
 *   figure          right 108 / top 232 / 640x620
 *   brand           bottom-right  right 108 / bottom 44
 *
 * Engineering note: when the registry still references unwritten L3 files the
 * main entry point fails to bundle, so covers render through a dedicated entry
 * (see cover-root.tsx). Keep that entry when you copy this template.
 */

/**
 * Course-level cover figures.
 *
 * A cover must carry the *representative figure of the knowledge point*, never an
 * abstract shape. One figure per course (35 courses ≈ 20 lines each), built from
 * the kit's L2 primitives so the cover and the video share one visual language.
 *
 * Fill this in per course, e.g.:
 *   export const COVER_FIGURES = {
 *     'ml-scatter-boundary': ({}) => (
 *       <Axes width={640} height={620} xDomain={[-2.8, 2.8]} yDomain={[-2.2, 2.2]} pad={{l:6,r:6,t:6,b:6}} showArrows={false}>
 *         {(s) => (<>
 *           <HalfPlane s={s} pts={BOUNDARY} side="above" color={COLORS.accent} opacity={0.12} />
 *           <HalfPlane s={s} pts={BOUNDARY} side="below" color={COLORS.primary} opacity={0.12} />
 *           <Scatter  s={s} pts={A_PTS} color={COLORS.primary} r={17} />
 *           <Scatter  s={s} pts={B_PTS} color={COLORS.accent} r={17} shape="square" />
 *           <Boundary s={s} pts={BOUNDARY} color={COLORS.result} width={7} glow />
 *         </>)}
 *       </Axes>
 *     ),
 *   };
 */
export const COVER_FIGURES: Record<string, React.FC> = {
  'divide-and-conquer-recursion': DivideAndConquerFigure,
  'recursive': RecursiveFigure,
  'heap-structure': HeapStructureFigure,
  'heap-sort': HeapSortFigure,
  'balanced-binary-search-tree': BalancedBstFigure,
  'graph-search': GraphSearchFigure,
  'shortest-path': ShortestPathFigure,
  'dynamic-programming-status': DpStatusFigure,
  'dynamic-programming-transfer': DpTransferFigure,
  'quicksort-partitioning': QuickSortFigure,
  'merge-step-in-merge-sort': MergeStepFigure,
  'union-find-path-compression': UnionFindFigure,
  'topological-sorting': TopoFigure,
};

export type CoverProps = {
  name: string;
  discipline?: string;
  course?: string;
  /** 'wordmark' | 'icon' | 'none' */
  brand?: 'wordmark' | 'icon' | 'none';
  /** footnote under the rule; defaults to "discipline · 30 seconds"; '' hides it */
  foot?: string;
  /** key into COVER_FIGURES; 'none' hides it */
  figure?: string;
};

const titleSize = (s: string): number => {
  const n = s.length;
  if (n <= 18) return 116;
  if (n <= 30) return 96;
  if (n <= 44) return 78;
  return 66;
};

export const Cover: React.FC<CoverProps> = ({
  name,
  discipline,
  course,
  brand = 'icon',
  foot,
  figure,
}) => {
  const eyebrow = course ?? discipline ?? '';
  const footnote = foot ?? [discipline, '30 seconds'].filter(Boolean).join('  ·  ');
  const Figure = figure && figure !== 'none' ? COVER_FIGURES[figure] : undefined;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg0 }}>
      <Backdrop width={1920} height={1080} />

      {Figure ? (
        <div style={{ position: 'absolute', right: 108, top: 232, opacity: 0.96 }}>
          <Figure />
        </div>
      ) : null}

      {/* copy plate: keeps long titles legible over the grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, ${alpha(COLORS.bg0, 0.94)} 0%, ${alpha(
            COLORS.bg0,
            0.84
          )} 40%, ${alpha(COLORS.bg0, 0.3)} 62%, transparent 78%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 0,
          height: 1080,
          width: 1010,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              fontFamily: FONT, fontSize: 27, fontWeight: 700, letterSpacing: 5.5,
              textTransform: 'uppercase', color: COLORS.accent, lineHeight: 1.35,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: FONT, fontSize: titleSize(name), fontWeight: 800,
            lineHeight: 1.08, letterSpacing: -1.4, color: COLORS.textStrong,
          }}
        >
          {name}
        </div>

        <div style={{ width: 196, height: 7, borderRadius: 7, background: COLORS.primary, marginTop: 6 }} />

        {footnote ? (
          <div
            style={{
              fontFamily: FONT, fontSize: 23, letterSpacing: 2.4,
              textTransform: 'uppercase', color: COLORS.textDim,
            }}
          >
            {footnote}
          </div>
        ) : null}
      </div>

      {brand !== 'none' ? (
        <div style={{ position: 'absolute', right: 108, bottom: 44, display: 'flex', justifyContent: 'flex-end' }}>
          {brand === 'wordmark' ? (
            <Img src={staticFile('leadde-logo.png')} style={{ width: 226, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          ) : (
            <Img src={staticFile('leadde-icon.svg')} style={{ width: 56, height: 56, opacity: 0.95 }} />
          )}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
