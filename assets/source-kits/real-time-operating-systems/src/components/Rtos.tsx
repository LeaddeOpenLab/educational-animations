import React from 'react';
import { COLORS, FONT, alpha, ramp } from '../theme';

/**
 * Os.tsx — Operating Systems 学科原语（L2）。
 *
 * 全部基于一个「坐标映射对象」：结构化图形（状态机 / 车道 / 帧网格 / 位域 / 表 / 资源图）
 * 各自产出一个把数据坐标映射到像素的函数（state 机用归一化 x,y；车道用时间→x、lane→y；
 * 帧网格用 frame 序号→格），场景里永远只写 s.px(x) 这类调用，不写死像素。
 * 连续量（如需要）直接用底座 Plot.tsx 的 Axes。每个 mark 自带绘入动画：
 * 路径用 pathLength+strokeDashoffset，节点/单元用错峰 reveal(progress,spread)，
 * token 用二次贝塞尔插值。颜色只取 COLORS，透明一律 alpha()。所有屏上数字由函数产出。
 */

/* ------------------------------------------------------------------ */
/* 几何 / 动画 helpers                                                  */
/* ------------------------------------------------------------------ */

/** 两点间二次贝塞尔控制点（给曲线转移与有向边用）。 */
const ctrl = (x1: number, y1: number, x2: number, y2: number, bend = 0.32) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  return { cx: mx + nx * bend * len, cy: my + ny * bend * len };
};

/** 二次贝塞尔路径字符串。 */
const qpath = (x1: number, y1: number, x2: number, y2: number, bend = 0.32) => {
  const { cx, cy } = ctrl(x1, y1, x2, y2, bend);
  return `M${x1.toFixed(1)},${y1.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
};

/** 二次贝塞尔上参数 t 处的点（给行走的 token 用）。 */
const qpoint = (
  t: number,
  x1: number,
  y1: number,
  cx: number,
  cy: number,
  x2: number,
  y2: number
): [number, number] => {
  const u = 1 - t;
  return [u * u * x1 + 2 * u * t * cx + t * t * x2, u * u * y1 + 2 * u * t * cy + t * t * y2];
};

/** 错峰显现：第 i 个 / 共 n 个，随 p(0..1) 推进。 */
const reveal = (i: number, n: number, p: number, spread = 0.55) => {
  const start = (i / Math.max(1, n)) * spread;
  return Math.max(0, Math.min(1, (p - start) / (1 - spread)));
};

/** 页面号 → 颜色角色，使同一页号在不同帧里颜色一致。 */
const pageColor = (p: number) =>
  [COLORS.primary, COLORS.accent, COLORS.result, COLORS.alt][((p % 4) + 4) % 4];

/** 在 (x,y) 处画一个朝 ang 方向的小箭头（有向边的箭头）。 */
const ArrowHead: React.FC<{ x: number; y: number; ang: number; color: string; size?: number }> = ({
  x,
  y,
  ang,
  color,
  size = 11,
}) => {
  const a1 = ang + Math.PI * 0.82;
  const a2 = ang - Math.PI * 0.82;
  const pt = (deg: number) => `${(x + size * Math.cos(deg)).toFixed(1)},${(y + size * Math.sin(deg)).toFixed(1)}`;
  return <polygon points={`${x.toFixed(1)},${y.toFixed(1)} ${pt(a1)} ${pt(a2)}`} fill={color} />;
};

/** Nice 时间刻度（给车道图的时间轴用）。 */
const timeTicks = (max: number, n = 6): number[] => {
  const step = max / n;
  const out: number[] = [];
  for (let i = 0; i <= n; i++) out.push(Number((i * step).toFixed(2)));
  return out;
};

/* ------------------------------------------------------------------ */
/* 1. 状态机图                                                          */
/* ------------------------------------------------------------------ */

// 状态机图：状态为节点、曲线带标签的转移，进度推进时一个 token 沿当前转移行走（覆盖进程状态转换与死锁四条件）
export const StateMachine: React.FC<{
  states: { id: string; label: string; x: number; y: number }[];
  transitions: { from: string; to: string; label?: string; bend?: number }[];
  progress?: number;
  active?: string;
  walk?: number;
  walkFrom?: string;
  walkTo?: string;
  highlight?: string[];
  cycle?: number[];
  width?: number;
  height?: number;
}> = ({
  states,
  transitions,
  progress = 1,
  active,
  walk,
  walkFrom,
  walkTo,
  highlight = [],
  cycle = [],
  width = 900,
  height = 620,
}) => {
  const pad = 64;
  const r = 34;
  const px = (x: number) => pad + x * (width - 2 * pad);
  const py = (y: number) => pad + y * (height - 2 * pad);
  const byId = (id: string) => states.find((s) => s.id === id);
  const p = Math.max(0, Math.min(1, progress));

  const token = (() => {
    if (walk === undefined || !walkFrom || !walkTo) return null;
    const a = byId(walkFrom);
    const b = byId(walkTo);
    if (!a || !b) return null;
    const x1 = px(a.x);
    const y1 = py(a.y);
    const x2 = px(b.x);
    const y2 = py(b.y);
    if (a.id === b.id) return null;
    const { cx, cy } = ctrl(x1, y1, x2, y2, 0.32);
    const [tx, ty] = qpoint(Math.max(0, Math.min(1, walk)), x1, y1, cx, cy, x2, y2);
    return { tx, ty };
  })();

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {transitions.map((t, i) => {
        const a = byId(t.from);
        const b = byId(t.to);
        if (!a || !b) return null;
        const x1 = px(a.x);
        const y1 = py(a.y);
        const x2 = px(b.x);
        const y2 = py(b.y);
        const isCycle = cycle.includes(i);
        const isWalk = walkFrom === t.from && walkTo === t.to;
        const col = isCycle ? COLORS.warn : isWalk ? COLORS.accent : COLORS.grid;
        const pr = isCycle || isWalk ? 1 : p;
        let d: string;
        let c: { cx: number; cy: number };
        if (a.id === b.id) {
          c = { cx: x1 - 56, cy: y1 - 78 };
          d = `M${x1},${y1 - r} C ${x1 - 60},${y1 - 64} ${x1 + 60},${y1 - 64} ${x1},${y1 - r}`;
        } else {
          c = ctrl(x1, y1, x2, y2, t.bend ?? 0.32);
          d = qpath(x1, y1, x2, y2, t.bend ?? 0.32);
        }
        const ang = Math.atan2(y2 - c.cy, x2 - c.cx);
        const [hx, hy] = qpoint(0.86, x1, y1, c.cx, c.cy, x2, y2);
        const [lx, ly] = qpoint(0.5, x1, y1, c.cx, c.cy, x2, y2);
        return (
          <g key={`t${i}`}>
            <path
              d={d}
              fill="none"
              stroke={col}
              strokeWidth={isCycle ? 5 : isWalk ? 4 : 2.2}
              strokeDasharray={1000}
              strokeDashoffset={1000 * (1 - Math.max(0, Math.min(1, pr)))}
              pathLength={1000}
              opacity={isCycle || isWalk ? 1 : 0.55}
            />
            <ArrowHead x={hx} y={hy} ang={ang} color={col} size={isCycle || isWalk ? 13 : 10} />
            {t.label ? (
              <text
                x={lx}
                y={ly - 10}
                fill={isCycle ? COLORS.warn : isWalk ? COLORS.accent : COLORS.textMuted}
                fontFamily={FONT}
                fontSize={19}
                fontWeight={600}
                textAnchor="middle"
                opacity={reveal(i, transitions.length, p)}
              >
                {t.label}
              </text>
            ) : null}
          </g>
        );
      })}

      {states.map((s, i) => {
        const x = px(s.x);
        const y = py(s.y);
        const rp = reveal(i, states.length, p);
        const isActive = active === s.id;
        const isHi = highlight.includes(s.id);
        const col = isActive ? COLORS.result : isHi ? COLORS.accent : COLORS.primary;
        return (
          <g key={s.id} opacity={rp}>
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={isActive ? alpha(col, 0.18) : alpha(COLORS.bg0, 0.85)}
              stroke={col}
              strokeWidth={isActive ? 4 : 3}
            />
            <text
              x={x}
              y={y + 6}
              fill={COLORS.textStrong}
              fontFamily={FONT}
              fontSize={20}
              fontWeight={600}
              textAnchor="middle"
            >
              {s.label}
            </text>
          </g>
        );
      })}

      {token ? (
        <circle cx={token.tx} cy={token.ty} r={9} fill={COLORS.accent} stroke={COLORS.bg0} strokeWidth={2.5} />
      ) : null}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 车道 / 甘特图                                                    */
/* ------------------------------------------------------------------ */

// 车道/甘特图：行=进程或资源，跨=执行/持有时段，共享时间轴，含切换标记与空闲间隙（覆盖 CPU 调度与上下文切换）
export const Lanes: React.FC<{
  lanes: { label: string; color?: string; spans: { start: number; end: number; label?: string; kind?: 'run' | 'idle' }[] }[];
  tMax: number;
  progress?: number;
  switches?: number[];
  width?: number;
  height?: number;
  unit?: string;
}> = ({ lanes, tMax, progress = 1, switches = [], width = 980, height = 600, unit = '' }) => {
  const padL = 168;
  const padR = 28;
  const padT = 26;
  const padB = 52;
  const p = Math.max(0, Math.min(1, progress));
  const x = (t: number) => padL + (t / tMax) * (width - padL - padR);
  const laneH = (height - padT - padB) / Math.max(1, lanes.length);
  const cy = (i: number) => padT + (i + 0.5) * laneH;
  const barH = Math.min(38, laneH * 0.56);
  const tk = timeTicks(tMax, 6);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* 时间轴 */}
      <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke={COLORS.axis} strokeWidth={1.8} />
      {tk.map((v, i) => (
        <g key={`tk${i}`}>
          <line x1={x(v)} y1={height - padB} x2={x(v)} y2={height - padB + 6} stroke={COLORS.axis} strokeWidth={1.4} />
          <text
            x={x(v)}
            y={height - padB + 26}
            fill={COLORS.textMuted}
            fontFamily={FONT}
            fontSize={18}
            textAnchor="middle"
            opacity={reveal(i, tk.length, p, 0.3)}
          >
            {Number.isInteger(v) ? v : v.toFixed(1)}
            {unit}
          </text>
        </g>
      ))}

      {/* 切换标记 */}
      {switches.map((s, i) => (
        <line
          key={`sw${i}`}
          x1={x(s)}
          y1={padT}
          x2={x(s)}
          y2={height - padB}
          stroke={COLORS.warn}
          strokeWidth={1.6}
          strokeDasharray="7 7"
          opacity={p > s / tMax ? 0.7 : 0}
        />
      ))}

      {/* 车道 */}
      {lanes.map((lane, li) => {
        const yc = cy(li);
        return (
          <g key={lane.label}>
            <text x={padL - 18} y={yc + 7} fill={COLORS.textStrong} fontFamily={FONT} fontSize={21} fontWeight={600} textAnchor="end">
              {lane.label}
            </text>
            {lane.spans.map((sp, si) => {
              const a = sp.start / tMax;
              const b = sp.end / tMax;
              const fill = Math.max(0, Math.min(1, (p - a) / Math.max(1e-6, b - a)));
              const x1 = x(sp.start);
              const w = (x(sp.end) - x(sp.start)) * fill;
              const idle = sp.kind === 'idle';
              const col = lane.color ?? COLORS.primary;
              return (
                <g key={`sp${li}-${si}`} opacity={p > a ? 1 : 0}>
                  {idle ? (
                    <rect
                      x={x1}
                      y={yc - barH / 2}
                      width={Math.max(0, w)}
                      height={barH}
                      rx={6}
                      fill="none"
                      stroke={alpha(COLORS.textDim, 0.6)}
                      strokeWidth={1.6}
                      strokeDasharray="5 6"
                    />
                  ) : (
                    <rect
                      x={x1}
                      y={yc - barH / 2}
                      width={Math.max(0, w)}
                      height={barH}
                      rx={7}
                      fill={alpha(col, 0.22)}
                      stroke={col}
                      strokeWidth={2.4}
                    />
                  )}
                  {sp.label && w > 36 ? (
                    <text
                      x={x1 + 10}
                      y={yc + 6}
                      fill={idle ? COLORS.textDim : COLORS.textStrong}
                      fontFamily={FONT}
                      fontSize={18}
                      fontWeight={600}
                    >
                      {sp.label}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 物理页帧网格                                                      */
/* ------------------------------------------------------------------ */

// 物理页帧网格：编号物理帧组成的格子，页块映射到帧里；同一页号可出现在不同帧（覆盖虚拟内存分页与页替换）
export const FrameGrid: React.FC<{
  frames: number;
  cols: number;
  map?: (number | null)[];
  highlight?: number[];
  progress?: number;
  width?: number;
  height?: number;
}> = ({ frames, cols, map = [], highlight = [], progress = 1, width = 900, height = 560 }) => {
  const pad = 26;
  const rows = Math.ceil(frames / cols);
  const cw = (width - 2 * pad) / cols;
  const ch = (height - 2 * pad) / rows;
  const cell = Math.min(cw, ch) - 14;
  const off = ((cw - cell) / 2);
  const p = Math.max(0, Math.min(1, progress));
  const at = (i: number) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    return { x: pad + c * cw + off, y: pad + r * ch + off };
  };
  const used = map.filter((m) => m !== null && m !== undefined).length;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {Array.from({ length: frames }).map((_, i) => {
        const { x, y } = at(i);
        const rp = reveal(i, frames, p);
        const pg = map[i];
        const col = pg === null || pg === undefined ? null : pageColor(pg);
        const hi = highlight.includes(i);
        return (
          <g key={i} opacity={rp}>
            <rect
              x={x}
              y={y}
              width={cell}
              height={cell}
              rx={8}
              fill={col ? alpha(col, 0.2) : alpha(COLORS.bg2, 0.5)}
              stroke={hi ? COLORS.warn : col ? col : alpha(COLORS.textDim, 0.5)}
              strokeWidth={hi ? 3.5 : 2}
            />
            <text x={x + 9} y={y + 22} fill={COLORS.textDim} fontFamily={FONT} fontSize={16} fontWeight={600}>
              {i}
            </text>
            {col ? (
              <text
                x={x + cell / 2}
                y={y + cell / 2 + 8}
                fill={COLORS.textStrong}
                fontFamily={FONT}
                fontSize={24}
                fontWeight={700}
                textAnchor="middle"
              >
                p{pg}
              </text>
            ) : (
              <text
                x={x + cell / 2}
                y={y + cell / 2 + 6}
                fill={COLORS.textDim}
                fontFamily={FONT}
                fontSize={17}
                textAnchor="middle"
                opacity={0.7}
              >
                free
              </text>
            )}
          </g>
        );
      })}
      <text x={pad} y={height - 6} fill={COLORS.textMuted} fontFamily={FONT} fontSize={17}>
        {`used ${used}/${frames}`}
      </text>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 地址拆分 / 地址翻译                                              */
/* ------------------------------------------------------------------ */

// 虚地址拆分为「页号 + 页内偏移」的位域条，并翻译为「帧号 + 偏移」的物理地址（复用位域条样式，覆盖页表地址翻译）
export const AddrSplit: React.FC<{
  vaddrBits: number;
  pageBits: number;
  offsetBits: number;
  frameBits: number;
  vpage: number;
  voffset: number;
  frame: number;
  progress?: number;
  width?: number;
  height?: number;
}> = ({
  vaddrBits,
  pageBits,
  offsetBits,
  frameBits,
  vpage,
  voffset,
  frame,
  progress = 1,
  width = 960,
  height = 520,
}) => {
  const p = Math.max(0, Math.min(1, progress));
  const topY = 150;
  const botY = 360;
  const boxH = 64;
  const right = width - 60;
  const wTop = Math.min(46, (width - 120) / vaddrBits);
  const wBot = Math.min(46, (width - 120) / (frameBits + offsetBits));
  const splitX = right - offsetBits * wTop; // 顶部拆分线 x
  const botOffX = right - offsetBits * wBot; // 底部偏移段左缘（与顶部偏移段右对齐）

  const drawStrip = (
    y: number,
    totalBoxes: number,
    w: number,
    fields: { n: number; color: string; label: string; value: string }[],
    rightX: number
  ) => {
    // fields 从左到右：[page/frame 字段, offset 字段]
    const groups: { x0: number; x1: number; color: string; label: string; value: string }[] = [];
    let cursor = rightX;
    for (const f of [...fields].reverse()) {
      const x0 = cursor - f.n * w;
      groups.unshift({ x0, x1: cursor, color: f.color, label: f.label, value: f.value });
      cursor = x0;
    }
    return (
      <g>
        {groups.map((g, gi) => (
          <g key={gi}>
            <rect
              x={g.x0}
              y={y}
              width={g.x1 - g.x0}
              height={boxH}
              rx={6}
              fill={alpha(g.color, 0.16)}
              stroke={g.color}
              strokeWidth={2.4}
              opacity={p}
            />
            <text x={(g.x0 + g.x1) / 2} y={y + boxH / 2 + 7} fill={COLORS.textStrong} fontFamily={FONT} fontSize={21} fontWeight={700} textAnchor="middle">
              {g.label}
            </text>
          </g>
        ))}
        <text x={rightX} y={y - 14} fill={COLORS.textMuted} fontFamily={FONT} fontSize={18} textAnchor="end">
          {fields.map((f) => `${f.value}`).join(' · ')}
        </text>
      </g>
    );
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <text x={60} y={topY - 46} fill={COLORS.textStrong} fontFamily={FONT} fontSize={24} fontWeight={700}>
        Virtual address
      </text>
      {/* 顶部虚地址条 */}
      {drawStrip(topY, vaddrBits, wTop, [
        { n: pageBits, color: COLORS.primary, label: `page #`, value: vpage.toFixed(0) },
        { n: offsetBits, color: COLORS.accent, label: `offset`, value: voffset.toFixed(0) },
      ], right)}
      {/* 拆分线 */}
      <line
        x1={splitX}
        y1={topY - 8}
        x2={splitX}
        y2={topY + boxH + 8}
        stroke={COLORS.textStrong}
        strokeWidth={2.4}
        strokeDasharray="6 5"
        opacity={p}
      />
      <text x={splitX} y={topY + boxH + 28} fill={COLORS.textMuted} fontFamily={FONT} fontSize={16} textAnchor="middle">
        {`split`}
      </text>

      {/* 翻译箭头 */}
      <line
        x1={(splitX + right) / 2}
        y1={topY + boxH + 40}
        x2={(botOffX + right) / 2}
        y2={botY - 18}
        stroke={COLORS.result}
        strokeWidth={2.6}
        strokeDasharray="9 7"
        opacity={p > 0.5 ? 1 : 0}
      />
      <polygon
        points={`${(botOffX + right) / 2},${botY - 6} ${(botOffX + right) / 2 - 9},${botY - 26} ${(botOffX + right) / 2 + 9},${botY - 26}`}
        fill={COLORS.result}
        opacity={p > 0.5 ? 1 : 0}
      />

      <text x={60} y={botY - 46} fill={COLORS.textStrong} fontFamily={FONT} fontSize={24} fontWeight={700}>
        Physical address
      </text>
      {/* 底部物理地址条 */}
      {drawStrip(botY, frameBits + offsetBits, wBot, [
        { n: frameBits, color: COLORS.result, label: `frame #`, value: frame.toFixed(0) },
        { n: offsetBits, color: COLORS.accent, label: `offset`, value: voffset.toFixed(0) },
      ], right)}
      <text x={right} y={botY + boxH + 30} fill={COLORS.textMuted} fontFamily={FONT} fontSize={17} textAnchor="end">
        {`PA = frame × 2^${offsetBits} + offset`}
      </text>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 页表                                                             */
/* ------------------------------------------------------------------ */

// 页表：行以页号为主键，含有效位与帧号；支持两级变体（外层页目录指向内层页表），覆盖页表地址翻译
export const PageTable: React.FC<{
  rows: { page: number; valid: boolean; frame: number | null }[];
  level2?: boolean;
  pde?: { page: number; frame: number | null }[];
  highlight?: number;
  progress?: number;
  width?: number;
  height?: number;
}> = ({ rows, level2 = false, pde = [], highlight, progress = 1, width = 920, height = 600 }) => {
  const p = Math.max(0, Math.min(1, progress));
  const pad = 28;
  const rowH = Math.min(46, (height - pad * 2 - 40) / Math.max(rows.length, 1));
  const colX = [pad, pad + 150, pad + 320];
  const colW = [150, 170, 200];

  const Table = ({
    data,
    x,
    title,
    color,
  }: {
    data: { page: number; valid: boolean; frame: number | null }[];
    x: number;
    title: string;
    color: string;
  }) => (
    <g>
      <text x={x} y={pad + 6} fill={color} fontFamily={FONT} fontSize={22} fontWeight={700}>
        {title}
      </text>
      {data.map((d, i) => {
        const rp = reveal(i, data.length, p);
        const y = pad + 34 + i * rowH;
        const hi = highlight === d.page;
        return (
          <g key={d.page} opacity={rp}>
            <rect
              x={x}
              y={y}
              width={colX[2] - colX[0]}
              height={rowH - 8}
              rx={6}
              fill={hi ? alpha(COLORS.accent, 0.18) : alpha(COLORS.bg2, 0.5)}
              stroke={hi ? COLORS.accent : alpha(COLORS.textDim, 0.4)}
              strokeWidth={hi ? 3 : 1.4}
            />
            <text x={x + 14} y={y + rowH / 2 + 2} fill={COLORS.textStrong} fontFamily={FONT} fontSize={19} fontWeight={600}>
              {d.page}
            </text>
            <text
              x={x + colX[1] - colX[0] + 14}
              y={y + rowH / 2 + 2}
              fill={d.valid ? COLORS.result : COLORS.textDim}
              fontFamily={FONT}
              fontSize={19}
              fontWeight={700}
            >
              {d.valid ? 'V' : 'I'}
            </text>
            <text
              x={x + colX[2] - colX[0] - 14}
              y={y + rowH / 2 + 2}
              fill={d.frame === null ? COLORS.textDim : COLORS.textStrong}
              fontFamily={FONT}
              fontSize={19}
              textAnchor="end"
            >
              {d.frame === null ? '—' : d.frame}
            </text>
          </g>
        );
      })}
    </g>
  );

  if (level2 && pde.length) {
    const innerX = pad + 420;
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <Table data={pde.map((e) => ({ page: e.page, valid: e.frame !== null, frame: e.frame }))} x={pad} title="Outer PDE" color={COLORS.primary} />
        {pde.map((e, i) => {
          if (e.frame === null) return null;
          const y = pad + 34 + i * rowH + rowH / 2;
          return (
            <line
              key={`ar${i}`}
              x1={pad + colX[2] - colX[0]}
              y1={y}
              x2={innerX}
              y2={y}
              stroke={COLORS.primary}
              strokeWidth={2}
              opacity={reveal(i, pde.length, p)}
              markerEnd=""
            />
          );
        })}
        <Table data={rows} x={innerX} title="Inner page table" color={COLORS.accent} />
      </svg>
    );
  }

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <Table data={rows} x={pad} title="Page table" color={COLORS.primary} />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 等待图 / 资源分配图（死锁）                                       */
/* ------------------------------------------------------------------ */

// 等待图/资源分配图：进程与资源两类节点，请求边与分配边带方向，可高亮成环（覆盖死锁四条件）
export const WaitForGraph: React.FC<{
  processes: { id: string; label: string }[];
  resources: { id: string; label: string; units?: number }[];
  assign: { res: string; to: string }[];
  request: { from: string; res: string }[];
  cycle?: { from: string; res: string; to?: string }[];
  progress?: number;
  width?: number;
  height?: number;
}> = ({ processes, resources, assign, request, cycle = [], progress = 1, width = 960, height = 620 }) => {
  const pad = 70;
  const p = Math.max(0, Math.min(1, progress));
  const px = (id: string) => {
    const i = processes.findIndex((q) => q.id === id);
    if (i >= 0) return { x: pad, y: pad + (i + 0.5) * ((height - 2 * pad) / Math.max(1, processes.length)), kind: 'p' as const };
    const j = resources.findIndex((q) => q.id === id);
    return { x: width - pad, y: pad + (j + 0.5) * ((height - 2 * pad) / Math.max(1, resources.length)), kind: 'r' as const };
  };
  const inCycle = (from: string, res: string) =>
    cycle.some((c) => c.from === from && c.res === res) || cycle.some((c) => c.res === res && c.to === from);

  const Edge = ({
    a,
    b,
    col,
    dashed,
  }: {
    a: { x: number; y: number };
    b: { x: number; y: number };
    col: string;
    dashed: boolean;
  }) => {
    const { cx, cy } = ctrl(a.x, a.y, b.x, b.y, 0.18);
    const d = qpath(a.x, a.y, b.x, b.y, 0.18);
    const ang = Math.atan2(b.y - cy, b.x - cx);
    const [hx, hy] = qpoint(0.82, a.x, a.y, cx, cy, b.x, b.y);
    return (
      <g>
        <path
          d={d}
          fill="none"
          stroke={col}
          strokeWidth={dashed ? 2.4 : 3}
          strokeDashoffset={1000 * (1 - p)}
          strokeDasharray={dashed ? '9 7' : 1000}
          pathLength={1000}
        />
        <ArrowHead x={hx} y={hy} ang={ang} color={col} size={12} />
      </g>
    );
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {assign.map((e, i) => {
        const a = px(e.res);
        const b = px(e.to);
        return (
          <g key={`as${i}`} opacity={p}>
            <Edge a={a} b={b} col={COLORS.accent} dashed={false} />
          </g>
        );
      })}
      {request.map((e, i) => {
        const a = px(e.from);
        const b = px(e.res);
        const c = inCycle(e.from, e.res);
        return (
          <g key={`rq${i}`} opacity={p}>
            <Edge a={a} b={b} col={c ? COLORS.warn : COLORS.textMuted} dashed={!c} />
          </g>
        );
      })}

      {processes.map((q, i) => {
        const { x, y } = px(q.id);
        const rp = reveal(i, processes.length, p);
        return (
          <g key={q.id} opacity={rp}>
            <circle cx={x} cy={y} r={32} fill={alpha(COLORS.bg0, 0.85)} stroke={COLORS.primary} strokeWidth={3} />
            <text x={x} y={y + 6} fill={COLORS.textStrong} fontFamily={FONT} fontSize={19} fontWeight={600} textAnchor="middle">
              {q.label}
            </text>
          </g>
        );
      })}
      {resources.map((q, i) => {
        const { x, y } = px(q.id);
        const rp = reveal(i, resources.length, p);
        const sz = 30;
        return (
          <g key={q.id} opacity={rp}>
            <rect x={x - sz} y={y - sz} width={sz * 2} height={sz * 2} rx={6} fill={alpha(COLORS.accent, 0.16)} stroke={COLORS.accent} strokeWidth={3} />
            <text x={x} y={y + 6} fill={COLORS.textStrong} fontFamily={FONT} fontSize={18} fontWeight={600} textAnchor="middle">
              {q.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 7. 进程 / 线程                                                      */
/* ------------------------------------------------------------------ */

// 进程/线程结构图：一个进程框内含共享地址空间（代码/堆/全局）与若干线程各自的栈与寄存器（覆盖进程与线程）
export const ProcThread: React.FC<{
  threads: number;
  shareLabel?: string;
  threadLabels?: string[];
  active?: number;
  progress?: number;
  width?: number;
  height?: number;
}> = ({
  threads,
  shareLabel = 'shared: code · heap · globals · open files',
  threadLabels,
  active,
  progress = 1,
  width = 940,
  height = 560,
}) => {
  const pad = 24;
  const p = Math.max(0, Math.min(1, progress));
  const boxX = pad;
  const boxY = pad;
  const boxW = width - 2 * pad;
  const boxH = height - 2 * pad;
  const shareH = 90;
  const threadTop = boxY + shareH + 16;
  const threadAreaH = boxY + boxH - threadTop - 16;
  const gap = 16;
  const tw = (boxW - gap * (threads + 1)) / Math.max(1, threads);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* 进程框 */}
      <rect
        x={boxX}
        y={boxY}
        width={boxW}
        height={boxH}
        rx={16}
        fill={alpha(COLORS.primary, 0.06)}
        stroke={COLORS.primary}
        strokeWidth={3}
        opacity={p}
      />
      <text x={boxX + 18} y={boxY + 30} fill={COLORS.primary} fontFamily={FONT} fontSize={24} fontWeight={700} opacity={p}>
        Process
      </text>
      {/* 共享区 */}
      <rect
        x={boxX + 16}
        y={boxY + 44}
        width={boxW - 32}
        height={shareH - 16}
        rx={10}
        fill={alpha(COLORS.accent, 0.14)}
        stroke={COLORS.accent}
        strokeWidth={2.2}
        opacity={reveal(0, 2, p)}
      />
      <text x={boxX + boxW / 2} y={boxY + 44 + (shareH - 16) / 2 + 7} fill={COLORS.textStrong} fontFamily={FONT} fontSize={20} fontWeight={600} textAnchor="middle" opacity={reveal(0, 2, p)}>
        {shareLabel}
      </text>
      {/* 线程列 */}
      {Array.from({ length: threads }).map((_, i) => {
        const x = boxX + gap + i * (tw + gap);
        const rp = reveal(i + 1, threads + 1, p);
        const on = active === i;
        const col = on ? COLORS.result : COLORS.alt;
        return (
          <g key={i} opacity={rp}>
            <rect
              x={x}
              y={threadTop}
              width={tw}
              height={threadAreaH}
              rx={10}
              fill={on ? alpha(col, 0.16) : alpha(COLORS.bg2, 0.5)}
              stroke={col}
              strokeWidth={on ? 3 : 2}
            />
            <text x={x + tw / 2} y={threadTop + 26} fill={COLORS.textStrong} fontFamily={FONT} fontSize={19} fontWeight={700} textAnchor="middle">
              {threadLabels?.[i] ?? `T${i}`}
            </text>
            <text x={x + tw / 2} y={threadTop + 54} fill={COLORS.textMuted} fontFamily={FONT} fontSize={16} textAnchor="middle">
              stack
            </text>
            <text x={x + tw / 2} y={threadTop + 76} fill={COLORS.textMuted} fontFamily={FONT} fontSize={16} textAnchor="middle">
              registers · PC
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* 8. 引用串 / 页替换                                                  */
/* ------------------------------------------------------------------ */

// 引用串/页替换图：上方引用串（命中绿、缺页红），下方物理帧快照并高亮被换出的帧（覆盖页替换）
export const RefString: React.FC<{
  refs: number[];
  frames: number;
  snapshot: (number | null)[];
  evict?: number | null;
  current?: number;
  faults?: number;
  progress?: number;
  width?: number;
  height?: number;
}> = ({ refs, frames, snapshot, evict = null, current, faults = 0, progress = 1, width = 960, height = 560 }) => {
  const p = Math.max(0, Math.min(1, progress));
  const pad = 28;
  const topY = 70;
  const box = 54;
  const gap = 10;
  const totalW = refs.length * (box + gap);
  const startX = Math.max(pad, (width - totalW) / 2);
  const botY = 320;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <text x={pad} y={topY - 28} fill={COLORS.textStrong} fontFamily={FONT} fontSize={22} fontWeight={700}>
        Reference string
      </text>
      {refs.map((rf, i) => {
        const rp = reveal(i, refs.length, p, 0.7);
        const on = current === i;
        const hit = on && snapshot.includes(rf);
        const col = on ? (hit ? COLORS.result : COLORS.warn) : COLORS.primary;
        const x = startX + i * (box + gap);
        return (
          <g key={i} opacity={rp}>
            <rect x={x} y={topY} width={box} height={box} rx={8} fill={alpha(col, on ? 0.22 : 0.12)} stroke={col} strokeWidth={on ? 3 : 2} />
            <text x={x + box / 2} y={topY + box / 2 + 8} fill={COLORS.textStrong} fontFamily={FONT} fontSize={22} fontWeight={700} textAnchor="middle">
              {rf}
            </text>
            {on ? <polygon points={`${x + box / 2},${topY + box + 12} ${x + box / 2 - 9},${topY + box - 2} ${x + box / 2 + 9},${topY + box - 2}`} fill={col} /> : null}
          </g>
        );
      })}

      <text x={pad} y={botY - 26} fill={COLORS.textStrong} fontFamily={FONT} fontSize={22} fontWeight={700}>
        Physical frames
      </text>
      {/* 帧网格（单行） */}
      {Array.from({ length: frames }).map((_, i) => {
        const rp = reveal(i, frames, p);
        const pg = snapshot[i];
        const col = pg === null || pg === undefined ? null : pageColor(pg);
        const x = pad + i * (box + gap);
        const hi = evict === i;
        return (
          <g key={i} opacity={rp}>
            <rect
              x={x}
              y={botY}
              width={box}
              height={box}
              rx={8}
              fill={col ? alpha(col, 0.2) : alpha(COLORS.bg2, 0.5)}
              stroke={hi ? COLORS.warn : col ? col : alpha(COLORS.textDim, 0.5)}
              strokeWidth={hi ? 3.5 : 2}
            />
            <text x={x + 9} y={botY + 20} fill={COLORS.textDim} fontFamily={FONT} fontSize={14} fontWeight={600}>
              {i}
            </text>
            {col ? (
              <text x={x + box / 2} y={botY + box / 2 + 12} fill={COLORS.textStrong} fontFamily={FONT} fontSize={22} fontWeight={700} textAnchor="middle">
                p{pg}
              </text>
            ) : null}
            {hi ? (
              <text x={x + box / 2} y={botY + box + 22} fill={COLORS.warn} fontFamily={FONT} fontSize={15} fontWeight={700} textAnchor="middle">
                evict
              </text>
            ) : null}
          </g>
        );
      })}
      <text x={pad} y={height - 8} fill={COLORS.textMuted} fontFamily={FONT} fontSize={18}>
        {`page faults: ${faults}`}
      </text>
    </svg>
  );
};
