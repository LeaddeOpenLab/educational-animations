import React from 'react';
import { COLORS, FONT, alpha } from '../theme';
import type { Scale } from './Plot';

/**
 * La.tsx — Linear Algebra 学科原语（L2，覆盖 16 个知识点）。
 *
 * 一切基于一个坐标系：连续/向量图用 `mkSpace` 产出的映射对象（形状与底座 `Axes`
 * 的 `Scale` 一致，可互换），本文件的每个 mark 都收 `s: Scale` 并经它取像素 ——
 * 场景侧只写 `s.px(x)` / `s.py(y)`，永远不写死像素。矩阵类原语收 `box`（像素矩形）
 * 但这种矩形由调用方从布局带算出，不由本文件猜。
 *
 * 每个 mark 自带 `progress` 0..1 的绘入动画：路径用 pathLength + strokeDashoffset，
 * 单元/向量用交错 reveal，箭头用 to-point 插值。颜色只从 `COLORS` 取，
 * 透明一律 `alpha(color, a)`（本课是 light 浅底主题）。
 *
 * 屏上数字一律由本文件顶部的线性代数函数产出（`matVec` / `det2` / `projCoef` /
 * `gramSchmidt` / `eig2` / `svd2` / `gaussElim` / `matRank` / `qrGram` …），
 * 图与文案不会漂移。
 *
 * 角色语义（线性代数）：primary = 主向量 / 变换后的网格，accent = 被高亮的列、
 * 当前消元行、投影分量，result = 投影结果 / 特征值 / 分解输出，warn = 奇异、
 * 线性相关、残差，alt = 第三条并列序列。
 */

export type Vec2 = { x: number; y: number };
export type Mat2 = [[number, number], [number, number]];
export type Mat = number[][];

/* ------------------------------------------------------------------ */
/* 纯函数：所有屏上数字都从这里来                                      */
/* ------------------------------------------------------------------ */

/** 把任意实数夹到 [0,1]，所有 progress 入参的归一化入口。 */
export const clamp01 = (t: number): number => (t < 0 ? 0 : t > 1 ? 1 : t);

/** 2x2 矩阵乘向量：所有网格变换与特征值演示的数值来源。 */
export const matVec = (A: Mat2, v: Vec2): Vec2 => ({
  x: A[0][0] * v.x + A[0][1] * v.y,
  y: A[1][0] * v.x + A[1][1] * v.y,
});

/** 矩阵乘法：分解类知识点（A = PDP⁻¹、A = QR）的检验用。 */
export const matMul = (A: Mat, B: Mat): Mat =>
  A.map((row) => B[0].map((_, j) => row.reduce((acc, v, k) => acc + v * B[k][j], 0)));

/** 2x2 行列式：有向面积缩放因子。 */
export const det2 = (A: Mat2): number => A[0][0] * A[1][1] - A[0][1] * A[1][0];

/** 转置：左零空间与行空间的切换。 */
export const transposeM = (A: Mat): Mat => A[0].map((_, j) => A.map((row) => row[j]));

/** 内积与范数：正交性与投影的基础量。 */
export const dot2 = (a: Vec2, b: Vec2): number => a.x * b.x + a.y * b.y;
/** 向量欧氏范数：归一化与幂迭代的除数。 */
export const norm2 = (a: Vec2): number => Math.hypot(a.x, a.y);

/** v 在 u 方向上的投影系数与投影向量。 */
export const projCoef = (v: Vec2, u: Vec2): number => dot2(v, u) / Math.max(1e-9, dot2(u, u));
/** v 在 u 方向上的投影向量（正交投影的几何结果）。 */
export const projVec = (v: Vec2, u: Vec2): Vec2 => {
  const c = projCoef(v, u);
  return { x: u.x * c, y: u.y * c };
};

/** 残差：最小二乘的垂直误差向量。 */
export const residualVec = (v: Vec2, u: Vec2): Vec2 => {
  const p = projVec(v, u);
  return { x: v.x - p.x, y: v.y - p.y };
};

/** Gram-Schmidt：把一组向量正交化（保持长度可选归一化）。 */
export const gramSchmidt = (vs: Vec2[]): Vec2[] => {
  const out: Vec2[] = [];
  for (const v of vs) {
    let u: Vec2 = { ...v };
    for (const e of out) {
      const p = projVec(v, e);
      u = { x: u.x - p.x, y: u.y - p.y };
    }
    out.push(u);
  }
  return out;
};

/** 2x2 实特征值解析解（判别式 <0 时返回 null）。 */
export const eig2 = (A: Mat2): { l1: number; l2: number } | null => {
  const tr = A[0][0] + A[1][1];
  const d = Math.sqrt(Math.max(0, tr * tr - 4 * det2(A)));
  return { l1: (tr + d) / 2, l2: (tr - d) / 2 };
};

/** 幂迭代：主特征值的数值逼近，返回每步的向量与比值。 */
export const powerIter = (A: Mat2, steps: number) => {
  let v: Vec2 = { x: 1, y: 0 };
  const trace: { v: Vec2; ratio: number }[] = [];
  for (let i = 0; i < steps; i++) {
    const w = matVec(A, v);
    const ratio = norm2(w) / Math.max(1e-9, norm2(v));
    v = { x: w.x / norm2(w), y: w.y / norm2(w) };
    trace.push({ v: { ...v }, ratio });
  }
  return trace;
};

/** 2x2 实 SVD：返回奇异值与左右奇异向量的角度（几何演示用）。 */
export const svd2 = (A: Mat2) => {
  const AtA: Mat2 = [
    [A[0][0] * A[0][0] + A[1][0] * A[1][0], A[0][0] * A[0][1] + A[1][0] * A[1][1]],
    [A[0][1] * A[0][0] + A[1][1] * A[1][0], A[0][1] * A[0][1] + A[1][1] * A[1][1]],
  ];
  const e = eig2(AtA);
  const s1 = e ? Math.sqrt(Math.max(0, e.l1)) : 0;
  const s2 = e ? Math.sqrt(Math.max(0, e.l2)) : 0;
  const v1 = 0.5 * Math.atan2(2 * AtA[0][1], AtA[0][0] - AtA[1][1]);
  const u1 = Math.atan2(A[1][0] * Math.cos(v1) + A[1][1] * Math.sin(v1), A[0][0] * Math.cos(v1) + A[0][1] * Math.sin(v1));
  return { s1, s2, v1, u1, v2: v1 + Math.PI / 2, u2: u1 + Math.PI / 2 };
};

/** 高斯消元：返回行阶梯形与主元列，消元演示的数值来源。 */
export const gaussElim = (A: Mat) => {
  const M = A.map((r) => r.slice());
  const pivots: number[] = [];
  let row = 0;
  for (let col = 0; col < M[0].length && row < M.length; col++) {
    let sel = row;
    for (let r = row + 1; r < M.length; r++) if (Math.abs(M[r][col]) > Math.abs(M[sel][col])) sel = r;
    if (Math.abs(M[sel][col]) < 1e-9) continue;
    [M[row], M[sel]] = [M[sel], M[row]];
    const p = M[row][col];
    for (let c = col; c < M[0].length; c++) M[row][c] /= p;
    for (let r = 0; r < M.length; r++) {
      if (r === row) continue;
      const f = M[r][col];
      for (let c = col; c < M[0].length; c++) M[r][c] -= f * M[row][c];
    }
    pivots.push(col);
    row++;
  }
  return { reduced: M, pivots, rank: pivots.length };
};

/** 矩阵的秩：rank-nullity 定理的一半。 */
export const matRank = (A: Mat): number => gaussElim(A).rank;

/** QR（Gram-Schmidt 版）：返回 Q 的列与 R 的上三角元素。 */
export const qrGram = (cols: Vec2[]) => {
  const q = gramSchmidt(cols).map((u) => {
    const n = norm2(u) || 1;
    return { x: u.x / n, y: u.y / n };
  });
  return {
    q,
    r: cols.map((a) => q.map((e) => dot2(a, e))),
  };
};

/* ------------------------------------------------------------------ */
/* 坐标与图形原语                                                      */
/* ------------------------------------------------------------------ */

/** 构造向量空间的坐标映射（形状与底座 Axes 的 Scale 一致，可互换）。 */
export const mkSpace = (
  width: number,
  height: number,
  xDomain: [number, number] = [-4, 4],
  yDomain: [number, number] = [-3, 3],
  pad?: Partial<{ l: number; r: number; t: number; b: number }>
): Scale => {
  const p = { l: 46, r: 22, t: 20, b: 42, ...pad };
  const innerW = width - p.l - p.r;
  const innerH = height - p.t - p.b;
  const ux = innerW / (xDomain[1] - xDomain[0]);
  const uy = innerH / (yDomain[1] - yDomain[0]);
  const px = (x: number) => p.l + (x - xDomain[0]) * ux;
  const py = (y: number) => p.t + (yDomain[1] - y) * uy;
  return {
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
};

/** 向量箭头：从 origin 指向 v，progress 控制长度绘入。 */
export const Vec: React.FC<{
  s: Scale;
  v: Vec2;
  origin?: Vec2;
  color?: string;
  width?: number;
  label?: string;
  progress?: number;
}> = ({ s, v, origin = { x: 0, y: 0 }, color = COLORS.primary, width = 3, label, progress = 1 }) => {
  const t = clamp01(progress);
  const x0 = s.px(origin.x);
  const y0 = s.py(origin.y);
  const x1 = s.px(origin.x + v.x * t);
  const y1 = s.py(origin.y + v.y * t);
  const ang = Math.atan2(y1 - y0, x1 - x0);
  const a1 = ang + Math.PI * 0.85;
  const a2 = ang - Math.PI * 0.85;
  const head = 13 * Math.min(1, Math.hypot(x1 - x0, y1 - y0) / 26);
  return (
    <g>
      <line x1={x0} y1={y0} x2={x1} y2={y1} stroke={color} strokeWidth={width} strokeLinecap="round" />
      {t > 0.9 && (
        <path
          d={`M${x1},${y1} L${x1 + head * Math.cos(a1)},${y1 + head * Math.sin(a1)} L${x1 + head * Math.cos(a2)},${y1 + head * Math.sin(a2)} Z`}
          fill={color}
        />
      )}
      {label && (
        <text x={x1 + 10} y={y1 - 8} fontFamily={FONT} fontSize={20} fill={color}>
          {label}
        </text>
      )}
    </g>
  );
};

/** 向量加法平行四边形：u、v、u+v 与两条虚线辅助边。 */
export const VecSum: React.FC<{
  s: Scale;
  u: Vec2;
  v: Vec2;
  uColor?: string;
  vColor?: string;
  sumColor?: string;
  progress?: number;
}> = ({ s, u, v, uColor = COLORS.primary, vColor = COLORS.accent, sumColor = COLORS.result, progress = 1 }) => {
  const t = clamp01(progress);
  const o = { x: s.zeroX, y: s.zeroY };
  const pu = { x: s.px(u.x), y: s.py(u.y) };
  const pv = { x: s.px(v.x), y: s.py(v.y) };
  const ps = { x: s.px(u.x + v.x), y: s.py(u.y + v.y) };
  const mid = { x: o.x + (ps.x - o.x) * t, y: o.y + (ps.y - o.y) * t };
  return (
    <g>
      <line x1={pu.x} y1={pu.y} x2={ps.x} y2={ps.y} stroke={alpha(vColor, 0.5)} strokeWidth={1.8} strokeDasharray="6 4" opacity={t} />
      <line x1={pv.x} y1={pv.y} x2={ps.x} y2={ps.y} stroke={alpha(uColor, 0.5)} strokeWidth={1.8} strokeDasharray="6 4" opacity={t} />
      <Vec s={s} v={u} color={uColor} progress={t} label="u" />
      <Vec s={s} v={v} color={vColor} progress={t} label="v" />
      <line x1={o.x} y1={o.y} x2={mid.x} y2={mid.y} stroke={sumColor} strokeWidth={3.2} strokeLinecap="round" />
    </g>
  );
};

/** 一个向量张成的直线（双向延伸）：line space / 零空间的退化情形。 */
export const LineSpan: React.FC<{
  s: Scale;
  v: Vec2;
  color?: string;
  width?: number;
  progress?: number;
}> = ({ s, v, color = COLORS.primary, width = 2.6, progress = 1 }) => {
  const t = clamp01(progress);
  const R = 12;
  const a = { x: s.px(-v.x * R * t), y: s.py(-v.y * R * t) };
  const b = { x: s.px(v.x * R * t), y: s.py(v.y * R * t) };
  return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={width} strokeLinecap="round" opacity={0.9} />;
};

/** 两个向量张成的平面区域（平行四边形铺开）：列空间的可视化。 */
export const PlaneSpan: React.FC<{
  s: Scale;
  u: Vec2;
  v: Vec2;
  color?: string;
  fillOpacity?: number;
  progress?: number;
}> = ({ s, u, v, color = COLORS.primary, fillOpacity = 0.16, progress = 1 }) => {
  const t = clamp01(progress);
  const R = 8;
  const pts = [
    { x: u.x * R * t + v.x * R * t, y: u.y * R * t + v.y * R * t },
    { x: -u.x * R * t + v.x * R * t, y: -u.y * R * t + v.y * R * t },
    { x: -u.x * R * t - v.x * R * t, y: -u.y * R * t - v.y * R * t },
    { x: u.x * R * t - v.x * R * t, y: u.y * R * t - v.y * R * t },
  ];
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${s.px(p.x)},${s.py(p.y)}`).join(' ') + ' Z';
  return <path d={d} fill={alpha(color, fillOpacity)} stroke={alpha(color, 0.6)} strokeWidth={1.5} />;
};

/** 单位方格经 A 变换后的网格：行列式的几何意义与体积缩放。 */
export const Lattice: React.FC<{
  s: Scale;
  A: Mat2;
  range?: number;
  color?: string;
  ghost?: boolean;
  progress?: number;
}> = ({ s, A, range = 4, color = COLORS.primary, ghost = true, progress = 1 }) => {
  const t = clamp01(progress);
  const e1 = { x: A[0][0], y: A[1][0] };
  const e2 = { x: A[0][1], y: A[1][1] };
  const tp = (i: number, j: number) => {
    const x = i * e1.x + j * e2.x;
    const y = i * e1.y + j * e2.y;
    return { x: s.px(x), y: s.py(y) };
  };
  const lines: React.ReactNode[] = [];
  for (let i = -range; i <= range; i++) {
    const a = tp(i, -range);
    const b = tp(i, range);
    lines.push(
      <line
        key={`a${i}`}
        x1={a.x}
        y1={a.y}
        x2={a.x + (b.x - a.x) * t}
        y2={a.y + (b.y - a.y) * t}
        stroke={alpha(color, 0.55)}
        strokeWidth={1.2}
      />
    );
  }
  for (let j = -range; j <= range; j++) {
    const a = tp(-range, j);
    const b = tp(range, j);
    lines.push(
      <line
        key={`b${j}`}
        x1={a.x}
        y1={a.y}
        x2={a.x + (b.x - a.x) * t}
        y2={a.y + (b.y - a.y) * t}
        stroke={alpha(color, 0.55)}
        strokeWidth={1.2}
      />
    );
  }
  return (
    <g>
      {ghost && (
        <g opacity={0.35}>
          {Array.from({ length: 2 * range + 1 }, (_, i) => i - range).map((i) => (
            <g key={i}>
              <line x1={s.px(i)} y1={s.py(-range)} x2={s.px(i)} y2={s.py(range)} stroke={COLORS.grid} strokeWidth={1} />
              <line x1={s.px(-range)} y1={s.py(i)} x2={s.px(range)} y2={s.py(i)} stroke={COLORS.grid} strokeWidth={1} />
            </g>
          ))}
        </g>
      )}
      {lines}
    </g>
  );
};

/** 单位正方形被 A 映射成的平行四边形 + 有向面积标注。 */
export const Parallelo: React.FC<{
  s: Scale;
  A: Mat2;
  color?: string;
  label?: string;
  progress?: number;
}> = ({ s, A, color = COLORS.accent, label, progress = 1 }) => {
  const t = clamp01(progress);
  const e1 = { x: A[0][0] * t, y: A[1][0] * t };
  const e2 = { x: A[0][1] * t, y: A[1][1] * t };
  const o = { x: s.zeroX, y: s.zeroY };
  const p1 = { x: s.px(e1.x), y: s.py(e1.y) };
  const p2 = { x: s.px(e1.x + e2.x), y: s.py(e1.y + e2.y) };
  const p3 = { x: s.px(e2.x), y: s.py(e2.y) };
  const area = det2(A);
  return (
    <g>
      <path d={`M${o.x},${o.y} L${p1.x},${p1.y} L${p2.x},${p2.y} L${p3.x},${p3.y} Z`} fill={alpha(color, 0.2)} stroke={color} strokeWidth={2.4} />
      {label && (
        <text x={p2.x + 12} y={p2.y} fontFamily={FONT} fontSize={21} fill={COLORS.textStrong}>
          {label}
        </text>
      )}
      <text x={p2.x + 12} y={p2.y + 26} fontFamily={FONT} fontSize={19} fill={area >= 0 ? COLORS.result : COLORS.warn}>
        det = {area.toFixed(2)}
      </text>
    </g>
  );
};

/** 正交投影：v、其在 u 上的投影、垂足虚线与残差向量。 */
export const Projection: React.FC<{
  s: Scale;
  v: Vec2;
  u: Vec2;
  vColor?: string;
  projColor?: string;
  resColor?: string;
  progress?: number;
}> = ({
  s,
  v,
  u,
  vColor = COLORS.primary,
  projColor = COLORS.result,
  resColor = COLORS.warn,
  progress = 1,
}) => {
  const t = clamp01(progress);
  const p = projVec(v, u);
  const r = residualVec(v, u);
  const pv = { x: s.px(v.x), y: s.py(v.y) };
  const pp = { x: s.px(p.x), y: s.py(p.y) };
  return (
    <g>
      <Vec s={s} v={{ x: p.x * t, y: p.y * t }} color={projColor} label="proj" />
      {t > 0.6 && (
        <g opacity={(t - 0.6) / 0.4}>
          <line x1={pv.x} y1={pv.y} x2={pp.x} y2={pp.y} stroke={resColor} strokeWidth={2.2} strokeDasharray="5 4" />
          <Vec s={s} v={r} origin={p} color={resColor} width={2.2} />
          <rect
            x={Math.min(pv.x, pp.x) - 6}
            y={Math.min(pv.y, pp.y) - 6}
            width={Math.max(10, Math.abs(pp.x - pv.x) - 6)}
            height={Math.max(10, Math.abs(pp.y - pv.y) - 6)}
            fill="none"
            stroke={alpha(COLORS.textMuted, 0.5)}
            strokeWidth={1}
          />
        </g>
      )}
      <Vec s={s} v={v} color={vColor} progress={t} label="b" />
    </g>
  );
};

/** 散点 + 最小二乘拟合线 + 残差竖线：least squares 的数据视图。 */
export const DataFit: React.FC<{
  s: Scale;
  pts: Vec2[];
  slope: number;
  intercept: number;
  ptColor?: string;
  lineColor?: string;
  resColor?: string;
  progress?: number;
}> = ({ s, pts, slope, intercept, ptColor = COLORS.primary, lineColor = COLORS.result, resColor = COLORS.warn, progress = 1 }) => {
  const t = clamp01(progress);
  const [x0, x1] = s.xDomain;
  const yAt = (x: number) => slope * x + intercept;
  const a = { x: s.px(x0), y: s.py(yAt(x0)) };
  const b = { x: s.px(x1), y: s.py(yAt(x1)) };
  return (
    <g>
      <line x1={a.x} y1={a.y} x2={a.x + (b.x - a.x) * t} y2={a.y + (b.y - a.y) * t} stroke={lineColor} strokeWidth={3} strokeLinecap="round" />
      {pts.map((p, i) => {
        const local = clamp01((t - (0.4 * i) / Math.max(1, pts.length)) / 0.6);
        const px = s.px(p.x);
        const py = s.py(p.y);
        return (
          <g key={i} opacity={local}>
            <line x1={px} y1={py} x2={px} y2={s.py(yAt(p.x))} stroke={resColor} strokeWidth={1.6} />
            <circle cx={px} cy={py} r={5.5} fill={alpha(ptColor, 0.85)} stroke={ptColor} strokeWidth={1.4} />
          </g>
        );
      })}
    </g>
  );
};

/** 特征向量方向扇：单位向量经 A 变换后仍共线的方向线（含 λ 标注）。 */
export const EigenFan: React.FC<{
  s: Scale;
  A: Mat2;
  scale?: number;
  color?: string;
  outColor?: string;
  progress?: number;
}> = ({ s, A, scale = 2.4, color = COLORS.primary, outColor = COLORS.accent, progress = 1 }) => {
  const t = clamp01(progress);
  const dirs = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
  const e = eig2(A);
  return (
    <g>
      {dirs.map((th, i) => {
        const v = { x: Math.cos(th), y: Math.sin(th) };
        const w = matVec(A, v);
        const local = clamp01((t - (0.5 * i) / dirs.length) / 0.5);
        return (
          <line
            key={i}
            x1={s.px(v.x * scale)}
            y1={s.py(v.y * scale)}
            x2={s.px(v.x * scale + (w.x - v.x) * scale * local)}
            y2={s.py(v.y * scale + (w.y - v.y) * scale * local)}
            stroke={alpha(COLORS.textMuted, 0.35)}
            strokeWidth={1.2}
          />
        );
      })}
      {e && (
        <g>
          <LineSpan s={s} v={{ x: 1, y: 0 }} color={alpha(color, 0.25)} />
          <Vec s={s} v={{ x: scale * e.l1 * 0.5, y: 0 }} color={outColor} progress={t} label={`λ₁=${e.l1.toFixed(2)}`} />
        </g>
      )}
    </g>
  );
};

/** 单位圆经 A 变换成的椭圆 + 两条主轴（SVD 的 σ₁ / σ₂）。 */
export const EllipseSV: React.FC<{
  s: Scale;
  A: Mat2;
  color?: string;
  axisColor?: string;
  progress?: number;
}> = ({ s, A, color = COLORS.primary, axisColor = COLORS.accent, progress = 1 }) => {
  const t = clamp01(progress);
  const { s1, s2, u1 } = svd2(A);
  const rx = s1 * s.ux * t;
  const ry = s2 * s.uy * t;
  const c = { x: s.zeroX, y: s.zeroY };
  const ax = (ang: number, len: number) => ({
    x: c.x + Math.cos(ang) * len,
    y: c.y - Math.sin(ang) * len,
  });
  const p1 = ax(u1, rx);
  const p2 = ax(u1 + Math.PI / 2, ry);
  return (
    <g>
      <ellipse cx={c.x} cy={c.y} rx={Math.max(1, rx)} ry={Math.max(1, ry)} fill={alpha(color, 0.14)} stroke={color} strokeWidth={2.6} transform={`rotate(${(-u1 * 180) / Math.PI} ${c.x} ${c.y})`} />
      <line x1={c.x} y1={c.y} x2={p1.x} y2={p1.y} stroke={axisColor} strokeWidth={2.4} />
      <line x1={c.x} y1={c.y} x2={p2.x} y2={p2.y} stroke={axisColor} strokeWidth={2.4} />
      <text x={p1.x + 10} y={p1.y - 6} fontFamily={FONT} fontSize={20} fill={COLORS.textStrong}>
        σ₁={s1.toFixed(2)}
      </text>
      <text x={p2.x + 10} y={p2.y - 6} fontFamily={FONT} fontSize={20} fill={COLORS.textStrong}>
        σ₂={s2.toFixed(2)}
      </text>
    </g>
  );
};

/** 矩阵表格：rows×cols 的数值格，可高亮某行/列/主元（消元、QR、对角化共用）。 */
export const MatGrid: React.FC<{
  box: { x: number; y: number; w: number; h: number };
  values: number[][];
  fmt?: (v: number) => string;
  highlightRow?: number;
  highlightCol?: number;
  pivotCells?: { r: number; c: number }[];
  color?: string;
  hiColor?: string;
  progress?: number;
}> = ({
  box,
  values,
  fmt = (v) => v.toFixed(2),
  highlightRow = -1,
  highlightCol = -1,
  pivotCells = [],
  color = COLORS.primary,
  hiColor = COLORS.accent,
  progress = 1,
}) => {
  const rows = values.length;
  const cols = values[0].length;
  const cw = box.w / cols;
  const ch = box.h / rows;
  return (
    <g>
      {values.map((row, r) =>
        row.map((v, c) => {
          const local = clamp01((progress - (0.4 * (r * cols + c)) / Math.max(1, rows * cols)) / 0.6);
          const isHi = r === highlightRow || c === highlightCol;
          const isPivot = pivotCells.some((p) => p.r === r && p.c === c);
          return (
            <g key={`${r}-${c}`} opacity={local}>
              <rect
                x={box.x + c * cw}
                y={box.y + r * ch}
                width={cw - 3}
                height={ch - 3}
                rx={6}
                fill={isPivot ? alpha(hiColor, 0.24) : isHi ? alpha(hiColor, 0.1) : alpha(COLORS.textMuted, 0.05)}
                stroke={isPivot ? hiColor : alpha(color, 0.4)}
                strokeWidth={isPivot ? 2 : 1}
              />
              <text
                x={box.x + c * cw + cw / 2 - 1.5}
                y={box.y + r * ch + ch / 2 + 6}
                fontFamily={FONT}
                fontSize={Math.min(22, ch * 0.42)}
                fill={isPivot ? COLORS.textStrong : COLORS.textMuted}
                textAnchor="middle"
              >
                {fmt(v)}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
};

/** 子空间维数条：把 rank / nullity / 左零空间并列成等长的分段条。 */
export const SubspaceNest: React.FC<{
  box: { x: number; y: number; w: number; h: number };
  segs: { label: string; value: number; color?: string }[];
  total: number;
  progress?: number;
}> = ({ box, segs, total, progress = 1 }) => {
  const t = clamp01(progress);
  const rowH = box.h / segs.length;
  return (
    <g>
      {segs.map((sg, i) => {
        const w = (box.w * Math.min(sg.value, total)) / Math.max(1, total);
        const local = clamp01((t - (0.35 * i) / segs.length) / 0.65);
        const color = sg.color || (i === 0 ? COLORS.primary : i === 1 ? COLORS.accent : COLORS.alt);
        return (
          <g key={i}>
            <rect x={box.x} y={box.y + i * rowH + 4} width={box.w} height={rowH - 12} rx={5} fill={alpha(COLORS.textMuted, 0.08)} />
            <rect x={box.x} y={box.y + i * rowH + 4} width={w * local} height={rowH - 12} rx={5} fill={alpha(color, 0.55)} stroke={color} strokeWidth={1.4} />
            <text x={box.x + 10} y={box.y + i * rowH + rowH / 2 + 4} fontFamily={FONT} fontSize={19} fill={COLORS.textStrong}>
              {sg.label} = {sg.value}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** 正交化前后对照：原始向量组与 Gram-Schmidt 后的直角向量组。 */
export const OrthoBars: React.FC<{
  s: Scale;
  vs: Vec2[];
  beforeColor?: string;
  afterColor?: string;
  progress?: number;
}> = ({ s, vs, beforeColor = COLORS.primary, afterColor = COLORS.result, progress = 1 }) => {
  const t = clamp01(progress);
  const qs = gramSchmidt(vs);
  return (
    <g>
      {vs.map((v, i) => (
        <Vec key={`b${i}`} s={s} v={v} color={alpha(beforeColor, 0.45)} width={2} progress={1} />
      ))}
      {qs.map((u, i) => (
        <g key={`a${i}`}>
          <Vec s={s} v={u} color={afterColor} progress={clamp01((t - i * 0.2) / 0.6)} label={`u${i + 1}`} />
          {i > 0 && t > 0.6 && (
            <path
              d={`M${s.px(u.x * 0.28)},${s.zeroY} L${s.px(u.x * 0.28)},${s.py(u.y * 0.28)} L${s.zeroX},${s.py(u.y * 0.28)}`}
              fill="none"
              stroke={COLORS.result}
              strokeWidth={1.6}
            />
          )}
        </g>
      ))}
    </g>
  );
};

/** 分解块示意：A = P D P⁻¹ 或 A = Q R 的三块拼接（对角化 / QR 共用）。 */
export const DecompBlocks: React.FC<{
  box: { x: number; y: number; w: number; h: number };
  labels: string[];
  colors?: string[];
  progress?: number;
}> = ({ box, labels, colors, progress = 1 }) => {
  const t = clamp01(progress);
  const n = labels.length;
  const gap = 26;
  const bw = (box.w - gap * (n - 1) - 90) / n;
  const cy = box.y + box.h / 2;
  const palette = colors || [COLORS.primary, COLORS.accent, COLORS.alt];
  return (
    <g>
      <text x={box.x} y={cy + 7} fontFamily={FONT} fontSize={26} fill={COLORS.textStrong}>
        A =
      </text>
      {labels.map((l, i) => {
        const x = box.x + 60 + i * (bw + gap);
        const local = clamp01((t - i * 0.2) / 0.6);
        return (
          <g key={i} opacity={local}>
            <rect x={x} y={cy - 46} width={bw} height={92} rx={12} fill={alpha(palette[i % palette.length], 0.16)} stroke={palette[i % palette.length]} strokeWidth={2} />
            <text x={x + bw / 2} y={cy + 9} fontFamily={FONT} fontSize={24} fill={COLORS.textStrong} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
    </g>
  );
};
