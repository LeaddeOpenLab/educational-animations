import React from 'react';
import { COLORS, alpha, FONT } from '../theme';
import type { ColorRole } from '../theme';
import type { Scale } from './Plot';

/**
 * Bio.tsx — Introduction to Biology 的 L2 学科原语。
 *
 * 覆盖 12 个知识点反复出现的图形：蛋白四级结构、米氏动力学曲线、磷脂双层与
 * 跨膜转运、电化学梯度、同源染色体与减数分裂、遗传连锁图、庞纳特方格、
 * DNA 双螺旋与复制叉、转录翻译的密码子流、信号转导级联、负反馈回路。
 *
 * 写法遵循 edu-video-kit §5：动力学与概率一律由函数算出（v = Vmax[S]/(Km+[S])），
 * 点密度由浓度函数驱动；颜色只取 COLORS 角色，透明一律 alpha()；
 * 随机布局用确定性 LCG，不用 Math.random()。
 */

/* ----------------------------- 内部 helpers ----------------------------- */

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 确定性 LCG：点云（离子、分子）必须可复现，否则拼图与成片不一致。 */
const mk = (seed: number): (() => number) => {
  let s = (seed | 0) || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

/** 米氏方程：底物浓度 → 反应速率。 */
export const mmRate = (s: number, Vmax: number, Km: number): number =>
  (Vmax * s) / (Km + s);

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
/* 1. 蛋白结构层级                                                    */
/* ------------------------------------------------------------------ */

/**
 * 蛋白四级结构：一条残基带（一级）→ 螺旋/折叠片段（二级）→ 折叠回的三维链
 * （三级）→ 多个亚基（四级）。level 控制展示到第几级，标签随之出现。
 * 覆盖 Protein structure。
 */
export const ProteinLevels: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 展示到第几级：1 序列 / 2 二级结构 / 3 三级折叠 / 4 四级组装。 */
  level?: 1 | 2 | 3 | 4;
  /** 残基数（决定色块数量）。 */
  residues?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, level = 4, residues = 26, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const n = residues;
  const unit = w / n;
  const helix = (cx: number, cy: number, rw: number): string => {
    // 用正弦描出 α 螺旋的带状外观
    const pts: string[] = [];
    const m = 60;
    for (let i = 0; i <= m; i++) {
      const t = i / m;
      pts.push(`${(cx - rw / 2 + rw * t).toFixed(1)},${(cy + Math.sin(t * Math.PI * 6) * 16).toFixed(1)}`);
    }
    return 'M ' + pts.join(' L ');
  };
  const shown = Math.max(1, Math.round(n * p));
  return (
    <g>
      {Array.from({ length: shown }, (_, i) => (
        <rect
          key={i}
          x={x + i * unit}
          y={y}
          width={unit - 3}
          height={34}
          rx={4}
          fill={alpha(color, 0.35 + 0.4 * ((i % 5) / 5))}
        />
      ))}
      <text x={x} y={y - 14} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        {`primary: ${n} residues`}
      </text>
      {level >= 2 ? (
        <g opacity={p}>
          <path d={helix(x + w * 0.12, y + 96, w * 0.3)} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />
          <path d={`M ${x+w*.42} ${y+82} l ${w*.05} 28 l ${w*.05} -28 l ${w*.05} 28 l ${w*.05} -28 l ${w*.05} 28 l ${w*.05} -28`} fill="none" stroke={COLORS.accent} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
          <text x={x} y={y + 150} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
            secondary: α-helix, β-sheet
          </text>
        </g>
      ) : null}
      {level >= 3 ? (
        <g opacity={p}>
          <path
            d={`M ${x + w * 0.1} ${y + 200} q ${w * 0.16} ${-70*p} ${w * 0.3} ${-10*p} q ${w * 0.14} ${60*p} ${w * 0.28} ${-20*p} q ${w * 0.12} ${-50*p} ${w * 0.2} ${30*p}`}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <text x={x} y={y + 250} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
            tertiary: one folded chain
          </text>
        </g>
      ) : null}
      {level >= 4 ? (
        <g opacity={p}>
          {[0, 1, 2, 3].map((i) => {
            const spreadX = x + w * (0.18 + i * 0.22);
            const clusterX = x + w * (0.43 + (i % 2) * 0.13);
            const cx = spreadX + (clusterX - spreadX) * p;
            const cy = y + 310 + Math.floor(i / 2) * 56 * p;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={52}
                ry={40}
                fill={alpha(i % 2 ? COLORS.accent : color, 0.28)}
                stroke={i % 2 ? COLORS.accent : color}
                strokeWidth={3.4}
              />
            );
          })}
          <text x={x} y={y + 400} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
            quaternary: 4 subunits
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 2. 酶动力学                                                        */
/* ------------------------------------------------------------------ */

/**
 * 米氏动力学：v = Vmax[S]/(Km+[S]) 曲线 + Vmax 渐近线 + Km 处的半速点，
 * 可选叠加 Lineweaver-Burk 双倒数直线（1/v 对 1/[S]）。
 * 覆盖 Enzyme kinetics。
 */
export const EnzymeKinetics: React.FC<{
  s: Scale;
  Vmax: number;
  Km: number;
  /** Current substrate concentration; moves the measured rate along the curve. */
  substrate?: number;
  color?: ColorRole | string;
  /** 画出双倒数图（在右下角的小插图里）。 */
  showLB?: boolean;
  progress?: number;
}> = ({ s, Vmax, Km, substrate, color = COLORS.primary, showLB = false, progress = 1 }) => {
  const p = clamp01(progress);
  const [x0, x1] = s.xDomain;
  const n = 260;
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const sub = x0 + ((x1 - x0) * i) / n;
    pts.push([sub, mmRate(sub, Vmax, Km)]);
  }
  const d =
    'M ' + pts.map((q) => `${s.px(q[0]).toFixed(1)},${s.py(q[1]).toFixed(1)}`).join(' L ');
  const half = mmRate(Km, Vmax, Km);
  return (
    <g>
      <line
        x1={s.px(x0)}
        y1={s.py(Vmax)}
        x2={s.px(x1)}
        y2={s.py(Vmax)}
        stroke={COLORS.result}
        strokeWidth={2.6}
        strokeDasharray="11 7"
      />
      <text
        x={s.px(x1) + 12}
        y={s.py(Vmax) + 9}
        fill={COLORS.result}
        fontFamily={FONT}
        fontSize={26}
        fontWeight={700}
      >
        {`Vmax = ${Vmax.toFixed(1)}`}
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
      {substrate !== undefined ? (
        <g>
          <line x1={s.px(substrate)} y1={s.py(0)} x2={s.px(substrate)} y2={s.py(mmRate(substrate, Vmax, Km))} stroke={COLORS.accent} strokeWidth={3} strokeDasharray="7 6" />
          <circle cx={s.px(substrate)} cy={s.py(mmRate(substrate, Vmax, Km))} r={12} fill={COLORS.accent} />
          <text x={s.px(substrate) + 20} y={s.py(mmRate(substrate, Vmax, Km)) + (Math.abs(substrate-Km)<0.45 ? 40 : -18)} fill={COLORS.textStrong} fontFamily={FONT} fontSize={24}>
            {`[S] ${substrate.toFixed(1)} → v ${mmRate(substrate, Vmax, Km).toFixed(1)}`}
          </text>
        </g>
      ) : null}
      {p > 0.45 ? (
        <g>
          <line
            x1={s.px(Km)}
            y1={s.py(0)}
            x2={s.px(Km)}
            y2={s.py(half)}
            stroke={COLORS.accent}
            strokeWidth={2.6}
            strokeDasharray="6 6"
          />
          <circle cx={s.px(Km)} cy={s.py(half)} r={7} fill={COLORS.accent} />
          <text
            x={s.px(Km) + 14}
            y={s.py(half) - 16}
            fill={COLORS.accent}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
          >
            {`Km = ${Km.toFixed(1)}, v = ${half.toFixed(1)}`}
          </text>
        </g>
      ) : null}
      {showLB && p > 0.8 ? (
        <g>
          {/* 双倒数：1/v = (Km/Vmax)(1/[S]) + 1/Vmax，直线 */}
          <line
            x1={s.px(-1 / Km)}
            y1={s.py(0)}
            x2={s.px(x1)}
            y2={s.py((1 / Vmax) * (1 - x1 / Km) * 0.2)}
            stroke={COLORS.warn}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <text
            x={s.px(x1) - 210}
            y={s.py(0) - 40}
            fill={COLORS.warn}
            fontFamily={FONT}
            fontSize={24}
          >
            {`1/v = (Km/Vmax)(1/[S]) + 1/Vmax`}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 3. 膜与跨膜转运                                                    */
/* ------------------------------------------------------------------ */

type Transporter = {
  kind: 'channel' | 'carrier' | 'pump';
  /** 在膜上的位置比例 0..1。 */
  at: number;
  label?: string;
  /** 是否消耗 ATP（pump 通常 true）。 */
  atp?: boolean;
  color?: ColorRole | string;
};

/**
 * 磷脂双分子层 + 跨膜蛋白 + 两侧溶质点云（密度由浓度给出）。
 * 转运方向箭头区分被动（顺梯度）与主动（逆梯度、耗 ATP）。
 * 覆盖 Cell membrane transport / Electrochemical gradient。
 */
export const Membrane: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 膜厚。 */
  thick?: number;
  /** 外侧 / 内侧浓度（决定两侧点的密度）。 */
  outside: number;
  inside: number;
  transporters?: Transporter[];
  /** One visible molecule crossing a selected transporter. */
  cargo?: { at: number; direction: 'in' | 'out'; progress: number; color?: ColorRole | string };
  /** 转运进度 0..1。 */
  progress?: number;
  seed?: number;
}> = ({ x, y, w, thick = 74, outside, inside, transporters = [], cargo, progress = 1, seed = 5 }) => {
  const p = clamp01(progress);
  const rnd = mk(seed);
  const nOut = Math.round(outside * 26);
  const nIn = Math.round(inside * 26);
  const dots = (count: number, cy: number, c: string): React.ReactNode[] => {
    const out: React.ReactNode[] = [];
    for (let i = 0; i < count; i++) {
      out.push(
        <circle
          key={`${cy}-${i}`}
          cx={x + 30 + rnd() * (w - 60)}
          cy={cy - 90 + rnd() * 170}
          r={6}
          fill={c}
          opacity={0.75}
        />
      );
    }
    return out;
  };
  return (
    <g>
      {dots(nOut, y - thick, COLORS.primary)}
      {dots(nIn, y + thick, COLORS.accent)}
      {/* 磷脂双层：两排头基 + 尾巴 */}
      <g>
        {Array.from({ length: Math.round(w / 22) }, (_, i) => (
          <g key={i}>
            <circle cx={x + 12 + i * 22} cy={y - thick / 2 + 8} r={7} fill={COLORS.textMuted} />
            <line
              x1={x + 12 + i * 22}
              y1={y - thick / 2 + 14}
              x2={x + 12 + i * 22}
              y2={y - 4}
              stroke={COLORS.textDim}
              strokeWidth={2.4}
            />
            <circle cx={x + 12 + i * 22} cy={y + thick / 2 - 8} r={7} fill={COLORS.textMuted} />
            <line
              x1={x + 12 + i * 22}
              y1={y + thick / 2 - 14}
              x2={x + 12 + i * 22}
              y2={y + 4}
              stroke={COLORS.textDim}
              strokeWidth={2.4}
            />
          </g>
        ))}
      </g>
      {transporters.map((t, i) => {
        const cx = x + w * t.at;
        const c = t.color ?? COLORS.result;
        const moved = clamp01(p);
        return (
          <g key={i}>
            {t.kind === 'channel' ? (
              <g>
                <rect x={cx - 26} y={y - thick / 2 - 6} width={18} height={thick + 12} rx={8} fill={c} />
                <rect x={cx + 8} y={y - thick / 2 - 6} width={18} height={thick + 12} rx={8} fill={c} />
              </g>
            ) : (
              <ellipse cx={cx} cy={y} rx={30} ry={thick / 2 + 10} fill={alpha(c, 0.35)} stroke={c} strokeWidth={3.4} />
            )}
            {/* 转运方向：顺梯度向下，逆梯度（pump）向上 */}
            <line
              x1={cx}
              y1={t.kind === 'pump' ? y + 120 : y - 120}
              x2={cx}
              y2={t.kind === 'pump' ? y + 120 - 150 * moved : y - 120 + 150 * moved}
              stroke={c}
              strokeWidth={4}
            />
            <polygon
              points={headPts(cx, t.kind === 'pump' ? y - 30 : y + 30, t.kind === 'pump' ? 90 : -90, 14)}
              fill={c}
            />
            {t.atp ? (
              <text x={cx + 40} y={y - 16} fill={COLORS.warn} fontFamily={FONT} fontSize={24} fontWeight={700}>
                ATP
              </text>
            ) : null}
            {t.label ? (
              <text x={cx} y={y + thick / 2 + 46} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24} textAnchor="middle">
                {t.label}
              </text>
            ) : null}
          </g>
        );
      })}
      {cargo ? (
        <circle
          cx={x + w * cargo.at}
          cy={cargo.direction === 'in' ? y - thick - 95 + (2 * thick + 190) * clamp01(cargo.progress) : y + thick + 95 - (2 * thick + 190) * clamp01(cargo.progress)}
          r={15}
          fill={cargo.color ?? COLORS.result}
          stroke={COLORS.textStrong}
          strokeWidth={3}
        />
      ) : null}
      <text x={x} y={y - thick - 80} fill={COLORS.primary} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`outside = ${outside.toFixed(2)}`}
      </text>
      <text x={x} y={y + thick + 92} fill={COLORS.accent} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`inside = ${inside.toFixed(2)}`}
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 4. 电化学梯度                                                      */
/* ------------------------------------------------------------------ */

/**
 * 膜两侧的电荷分离与能斯特电位：外侧正电荷、内侧负电荷按 progress 累积，
 * 给出 E = (RT/zF)·ln([out]/[in]) 的数值标注。
 * 覆盖 Electrochemical gradient / Resting potential 的生物学版本。
 */
export const IonGradient: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  /** 外侧 / 内侧离子浓度。 */
  out: number;
  in_: number;
  /** 离子价数 z。 */
  z?: number;
  /** RT/F 的取值（mV，37°C 约 26.7）。 */
  rtf?: number;
  color?: ColorRole | string;
  progress?: number;
  seed?: number;
  showPotential?: boolean;
}> = ({ x, y, w, h, out, in_, z = 1, rtf = 26.7, color = COLORS.primary, progress = 1, seed = 13, showPotential = true }) => {
  const p = clamp01(progress);
  const rnd = mk(seed);
  const E = (rtf / z) * Math.log(out / Math.max(in_, 1e-9));
  const total = Math.max(out + in_, 1e-9);
  const nOut = Math.round(30 * out / total * p);
  const nIn = Math.round(30 * in_ / total * p);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={alpha(COLORS.textDim, 0.06)} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={COLORS.axis} strokeWidth={3} />
      {Array.from({ length: nOut }, (_, i) => (
        <circle key={`o${i}`} cx={x + 40 + rnd() * (w - 80)} cy={y + 30 + rnd() * (h / 2 - 60)} r={7} fill={color} />
      ))}
      {Array.from({ length: nIn }, (_, i) => (
        <circle
          key={`i${i}`}
          cx={x + 40 + rnd() * (w - 80)}
          cy={y + h / 2 + 30 + rnd() * (h / 2 - 60)}
          r={7}
          fill={COLORS.warn}
        />
      ))}
      <text x={x + 18} y={y + 34} fill={color} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`[out] = ${out.toFixed(1)}`}
      </text>
      <text x={x + 18} y={y + h - 16} fill={COLORS.warn} fontFamily={FONT} fontSize={26} fontWeight={700}>
        {`[in] = ${in_.toFixed(1)}`}
      </text>
      {showPotential && p > 0.7 ? (
        <text
          x={x + w / 2}
          y={y + h / 2 - 18}
          fill={COLORS.result}
          fontFamily={FONT}
          fontSize={32}
          fontWeight={700}
          textAnchor="middle"
        >
          {`E = ${E.toFixed(1)} mV`}
        </text>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 5. 染色体与减数分裂                                                */
/* ------------------------------------------------------------------ */

/**
 * 同源染色体对：两条染色体（母源/父源）可显示交叉互换（chiasma），
 * 并在减数分裂 I / II 中按 progress 分离到两个细胞。
 * 覆盖 Meiosis / Genetic linkage。
 */
export const ChromosomePair: React.FC<{
  cx: number;
  cy: number;
  len?: number;
  /** 交叉互换的位置比例（0..1），null 表示无互换。 */
  chiasma?: number | null;
  /** Exchange the chromatid segment distal to the chiasma, 0..1. */
  exchange?: number;
  /** 分离进度：0 配对、1 分到两极。 */
  separation?: number;
  /** 两条染色体的颜色。 */
  maternal?: ColorRole | string;
  paternal?: ColorRole | string;
  /** 基因位点（比例位置 + 名称）。 */
  loci?: { at: number; label: string; color?: ColorRole | string }[];
  maternalLoci?: string[];
  paternalLoci?: string[];
  progress?: number;
}> = ({
  cx,
  cy,
  len = 300,
  chiasma = null,
  exchange = 0,
  separation = 0,
  maternal = COLORS.primary,
  paternal = COLORS.alt,
  loci = [],
  maternalLoci,
  paternalLoci,
  progress = 1,
}) => {
  const p = clamp01(progress);
  const sep = 25 + clamp01(separation) * 105;
  const draw = (yOff: number, c: string, top: boolean): React.ReactNode => {
    const y = cy + yOff;
    const distalX = chiasma === null ? cx + len / 2 : cx - len / 2 + len * chiasma;
    const other = top ? paternal : maternal;
    const ownLabels = top ? maternalLoci : paternalLoci;
    const swappedLabels = top ? paternalLoci : maternalLoci;
    return (
      <g>
        <path
          d={`M ${cx - len / 2} ${y} q ${len * 0.25} ${top ? -46 : 46} ${len * 0.5} 0 q ${len * 0.25} ${top ? 46 : -46} ${len * 0.5} 0`}
          fill="none"
          stroke={c}
          strokeWidth={13}
          strokeLinecap="round"
          opacity={p}
        />
        <path
          d={`M ${cx - len / 2} ${y + (top ? -12 : 12)} q ${len * 0.25} ${top ? -46 : 46} ${len * 0.5} 0 q ${len * 0.25} ${top ? 46 : -46} ${len * 0.5} 0`}
          fill="none"
          stroke={c}
          strokeWidth={7}
          strokeLinecap="round"
          opacity={p * 0.75}
        />
        {chiasma !== null && exchange > 0 ? (
          <path
            d={`M ${distalX} ${y} Q ${cx + len * 0.39} ${y + (top ? 24 : -24)} ${cx + len / 2} ${y}`}
            fill="none"
            stroke={other}
            strokeWidth={13 * clamp01(exchange)}
            strokeLinecap="round"
            opacity={p}
          />
        ) : null}
        {loci.map((l, i) => {
          const lx = cx - len / 2 + len * l.at;
          const label = exchange >= 0.5 && chiasma !== null && l.at > chiasma ? swappedLabels?.[i] : ownLabels?.[i];
          return (
            <g key={i} opacity={p}>
              <circle cx={lx} cy={y} r={9} fill={l.color ?? COLORS.accent} />
              <text
                x={lx}
                y={y - 22}
                fill={COLORS.textStrong}
                fontFamily={FONT}
                fontSize={22}
                textAnchor="middle"
              >
                {label ?? l.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  };
  return (
    <g>
      {draw(-sep, maternal, true)}
      {draw(sep, paternal, false)}
      {chiasma !== null ? (
        <g opacity={p}>
          <circle
            cx={cx - len / 2 + len * chiasma}
            cy={cy}
            r={16}
            fill="none"
            stroke={COLORS.warn}
            strokeWidth={3.4}
          />
          <text
            x={cx - len / 2 + len * chiasma}
            y={cy + 46}
            fill={COLORS.warn}
            fontFamily={FONT}
            fontSize={23}
            textAnchor="middle"
          >
            chiasma
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 6. 遗传连锁图                                                      */
/* ------------------------------------------------------------------ */

/**
 * 连锁图：一条染色体上按重组率（cM）排布基因位点，并把两个位点间的重组
 * 频率标出（RF = 重组型 / 总数）。覆盖 Genetic linkage。
 */
export const LinkageMap: React.FC<{
  x: number;
  y: number;
  w: number;
  /** 位点：位置（cM）与名称。 */
  loci: { cM: number; label: string }[];
  /** 要高亮的两个位点下标，标出它们之间的重组率。 */
  highlight?: [number, number];
  /** 重组率（0..1），由调用方按计数算出。 */
  rf?: number;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, loci, highlight, rf, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const maxCM = Math.max(...loci.map((l) => l.cM), 1);
  const px = (cM: number): number => x + (cM / maxCM) * w;
  return (
    <g>
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={color} strokeWidth={6} strokeLinecap="round" opacity={p} />
      {Array.from({ length: Math.round(maxCM / 10) + 1 }, (_, i) => (
        <g key={i}>
          <line x1={px(i * 10)} y1={y - 9} x2={px(i * 10)} y2={y + 9} stroke={COLORS.axis} strokeWidth={2.2} />
          <text x={px(i * 10)} y={y + 34} fill={COLORS.textDim} fontFamily={FONT} fontSize={21} textAnchor="middle">
            {String(i * 10)}
          </text>
        </g>
      ))}
      {loci.map((l, i) => (
        <g key={i} opacity={p}>
          <circle cx={px(l.cM)} cy={y} r={11} fill={COLORS.accent} />
          <text
            x={px(l.cM)}
            y={y - 26}
            fill={COLORS.textStrong}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
            textAnchor="middle"
          >
            {l.label}
          </text>
        </g>
      ))}
      {highlight && rf !== undefined && p > 0.6 ? (
        <g>
          <line
            x1={px(loci[highlight[0]].cM)}
            y1={y + 62}
            x2={px(loci[highlight[1]].cM)}
            y2={y + 62}
            stroke={COLORS.warn}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <text
            x={(px(loci[highlight[0]].cM) + px(loci[highlight[1]].cM)) / 2}
            y={y + 98}
            fill={COLORS.warn}
            fontFamily={FONT}
            fontSize={27}
            fontWeight={700}
            textAnchor="middle"
          >
            {`RF = ${(rf * 100).toFixed(1)}%  (${(rf * 100).toFixed(0)} cM)`}
          </text>
        </g>
      ) : null}
      <text x={x + w + 20} y={y + 8} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        cM
      </text>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 7. 庞纳特方格                                                      */
/* ------------------------------------------------------------------ */

/**
 * 庞纳特方格：父本/母本配子沿两边排布，格内填基因型（由 alleles 组合函数给出），
 * 并按 progress 逐格揭示，最后标注表型比例。
 * 覆盖 Genetic probability。
 */
export const Punnett: React.FC<{
  x: number;
  y: number;
  cell?: number;
  /** 母本配子（横向）与父本配子（纵向）。 */
  gam1: string[];
  gam2: string[];
  /** 组合成基因型的函数（默认按字母序拼接，保证 Aa 而不是 aA）。 */
  combine?: (a: string, b: string) => string;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, cell = 96, gam1, gam2, combine, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const join =
    combine ??
    ((a: string, b: string): string => {
      const upper = [...(a.match(/[A-Z]/g) ?? []), ...(b.match(/[A-Z]/g) ?? [])].sort().join('');
      const lower = [...(a.match(/[a-z]/g) ?? []), ...(b.match(/[a-z]/g) ?? [])].sort().join('');
      return upper + lower;
    });
  const total = gam1.length * gam2.length;
  const shown = Math.round(total * p);
  return (
    <g>
      {gam1.map((g, i) => (
        <text
          key={`t${i}`}
          x={x + cell * (i + 1) + cell / 2}
          y={y + cell / 2 + 10}
          fill={COLORS.textStrong}
          fontFamily={FONT}
          fontSize={Math.max(28, cell * 0.27)}
          fontWeight={700}
          textAnchor="middle"
        >
          {g}
        </text>
      ))}
      {gam2.map((g, i) => (
        <text
          key={`l${i}`}
          x={x + cell / 2}
          y={y + cell * (i + 1) + cell / 2 + 10}
          fill={COLORS.textStrong}
          fontFamily={FONT}
          fontSize={Math.max(28, cell * 0.27)}
          fontWeight={700}
          textAnchor="middle"
        >
          {g}
        </text>
      ))}
      {gam2.map((g2, r) =>
        gam1.map((g1, c) => {
          const idx = r * gam1.length + c;
          if (idx >= shown) return null;
          const geno = join(g1, g2);
          const dominant = /[A-Z]/.test(geno.slice(0, geno.length / 2));
          return (
            <g key={`${r}-${c}`}>
              <rect
                x={x + cell * (c + 1)}
                y={y + cell * (r + 1)}
                width={cell}
                height={cell}
                fill={alpha(dominant ? color : COLORS.alt, 0.18)}
                stroke={COLORS.axis}
                strokeWidth={2.2}
              />
              <text
                x={x + cell * (c + 1) + cell / 2}
                y={y + cell * (r + 1) + cell / 2 + 10}
                fill={COLORS.textStrong}
                fontFamily={FONT}
                fontSize={Math.max(30, cell * 0.30)}
                fontWeight={700}
                textAnchor="middle"
              >
                {geno}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 8. DNA 双螺旋与复制叉                                              */
/* ------------------------------------------------------------------ */

/**
 * DNA 双螺旋：两条正弦链 + 碱基配对横档；replication > 0 时在中点张开成
 * 复制叉，并画出新合成的前导链（连续）与后随链（冈崎片段）。
 * 覆盖 DNA replication。
 */
export const DnaHelix: React.FC<{
  x: number;
  y: number;
  w: number;
  amp?: number;
  /** 螺旋圈数。 */
  turns?: number;
  /** 复制叉张开进度 0..1（0 = 闭合双螺旋）。 */
  replication?: number;
  synthesis?: boolean;
  color?: ColorRole | string;
  progress?: number;
}> = ({ x, y, w, amp = 56, turns = 3, replication = 0, synthesis = true, color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const rep = clamp01(replication);
  const n = 300;
  const upper: string[] = [];
  const lower: string[] = [];
  const forkAt = w / 2;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const px = x + w * t;
    const phase = t * turns * 2 * Math.PI;
    // 复制叉：靠近 forkAt 的地方两链张开
    const d = Math.abs(px - (x + forkAt)) / (w / 2);
    const open = rep * Math.max(0, 1 - d * 1.6) * 120;
    upper.push(`${px.toFixed(1)},${(y + Math.sin(phase) * amp - open).toFixed(1)}`);
    lower.push(`${px.toFixed(1)},${(y - Math.sin(phase) * amp + open).toFixed(1)}`);
  }
  const shown = Math.max(2, Math.round(n * p));
  const rungs: React.ReactNode[] = [];
  for (let i = 0; i < n; i += 18) {
    if (i > shown) break;
    const t = i / n;
    const px = x + w * t;
    const phase = t * turns * 2 * Math.PI;
    const d = Math.abs(px - (x + forkAt)) / (w / 2);
    const open = rep * Math.max(0, 1 - d * 1.6) * 120;
    rungs.push(
      <line
        key={i}
        x1={px}
        y1={y + Math.sin(phase) * amp - open}
        x2={px}
        y2={y - Math.sin(phase) * amp + open}
        stroke={COLORS.textDim}
        strokeWidth={2.4}
      />
    );
  }
  return (
    <g>
      {rungs}
      <polyline points={upper.slice(0, shown).join(' ')} fill="none" stroke={color} strokeWidth={5} />
      <polyline points={lower.slice(0, shown).join(' ')} fill="none" stroke={COLORS.alt} strokeWidth={5} />
      {synthesis && rep > 0.3 && p > 0.5 ? (
        <g>
          {/* 新链：前导链连续，后随链分段 */}
          <polyline
            points={upper.slice(Math.round(n * 0.5), Math.round(n * 0.5) + Math.round(n * 0.42 * rep)).join(' ')}
            fill="none"
            stroke={COLORS.result}
            strokeWidth={4}
            strokeDasharray="0"
          />
          {Array.from({ length: 4 }, (_, i) => {
            const a = Math.round(n * (0.56 + i * 0.09));
            const b = a + Math.round(n * 0.06);
            return (
              <polyline
                key={i}
                points={lower.slice(a, Math.min(b, n)).join(' ')}
                fill="none"
                stroke={COLORS.warn}
                strokeWidth={4}
              />
            );
          })}
          <text
            x={x + forkAt}
            y={y - amp - 92}
            fill={COLORS.result}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
            textAnchor="middle"
          >
            leading strand
          </text>
          <text
            x={x + forkAt}
            y={y + amp + 118}
            fill={COLORS.warn}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
            textAnchor="middle"
          >
            Okazaki fragments
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 9. 转录翻译的密码子流                                              */
/* ------------------------------------------------------------------ */

/**
 * 中心法则的一段：DNA 模板 → mRNA 密码子 → 氨基酸链，逐位推进（ribosome
 * 位置由 progress 决定），并把当前密码子高亮。
 * 覆盖 Transcribe / Translate。
 */
export const CodonFlow: React.FC<{
  x: number;
  y: number;
  /** DNA 模板链（碱基序列，'ACGT'）。 */
  dna: string;
  /** 密码子 → 氨基酸的映射。 */
  codonTable?: Record<string, string>;
  /** Transcription builds RNA; translation consumes codons to build the peptide. */
  mode?: 'transcription' | 'translation';
  /** Move a completed transcript away from its DNA template. */
  release?: number;
  cell?: number;
  /** 已翻译到的碱基下标（由 progress 推出）。 */
  progress?: number;
  color?: ColorRole | string;
}> = ({ x, y, dna, codonTable, mode = 'translation', release = 0, cell = 42, progress = 1, color = COLORS.primary }) => {
  const p = clamp01(progress);
  const comp: Record<string, string> = { A: 'U', T: 'A', C: 'G', G: 'C' };
  const mrna = dna.split('').map((b) => comp[b] ?? b).join('');
  const codons = mrna.match(/.{1,3}/g) ?? [];
  const shownCodons = Math.max(0, Math.round(codons.length * p));
  const table = codonTable ?? {};
  return (
    <g>
      {mode === 'transcription' ? <text x={x} y={y} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        DNA template
      </text> : null}
      {mode === 'transcription' ? dna.split('').map((b, i) => (
        <g key={`d${i}`}>
          <rect x={x + 200 + i * cell} y={y - 26} width={cell - 5} height={34} rx={5} fill={alpha(color, 0.2)} />
          <text
            x={x + 200 + i * cell + (cell - 5) / 2}
            y={y}
            fill={COLORS.textStrong}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
            textAnchor="middle"
          >
            {b}
          </text>
        </g>
      )) : null}
      <text x={x} y={y + 92} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        mRNA codon
      </text>
      <g transform={mode === 'transcription' ? `translate(0 ${90 * clamp01(release)})` : undefined}>
      {codons.slice(0, mode === 'translation' ? codons.length : shownCodons).map((c, i) => (
        <g key={`m${i}`}>
          <rect
            x={x + 200 + i * cell * 3}
            y={y + 66}
            width={cell * 3 - 8}
            height={34}
            rx={6}
            fill={alpha(COLORS.accent, i === shownCodons - 1 ? 0.45 : 0.18)}
            stroke={i === shownCodons - 1 ? COLORS.accent : 'none'}
            strokeWidth={3}
          />
          <text
            x={x + 200 + i * cell * 3 + (cell * 3 - 8) / 2}
            y={y + 92}
            fill={COLORS.textStrong}
            fontFamily={FONT}
            fontSize={26}
            fontWeight={700}
            textAnchor="middle"
          >
            {c}
          </text>
        </g>
      ))}
      </g>
      {mode === 'translation' ? <text x={x} y={y + 184} fill={COLORS.textMuted} fontFamily={FONT} fontSize={24}>
        amino acid
      </text> : null}
      {mode === 'translation' ? Array.from({ length: Math.max(0, shownCodons - 1) }, (_, i) => (
        <line key={`bond${i}`} x1={x + 200 + i * cell * 3 + (cell * 3 - 8) / 2 + 27} y1={y + 172} x2={x + 200 + (i + 1) * cell * 3 + (cell * 3 - 8) / 2 - 27} y2={y + 172} stroke={COLORS.result} strokeWidth={6} />
      )) : null}
      {mode === 'translation' ? codons.slice(0, shownCodons).map((c, i) => (
        <g key={`a${i}`}>
          <circle cx={x + 200 + i * cell * 3 + (cell * 3 - 8) / 2} cy={y + 172} r={27} fill={alpha(COLORS.result, 0.3)} stroke={COLORS.result} strokeWidth={3} />
          <text
            x={x + 200 + i * cell * 3 + (cell * 3 - 8) / 2}
            y={y + 181}
            fill={COLORS.textStrong}
            fontFamily={FONT}
            fontSize={24}
            fontWeight={700}
            textAnchor="middle"
          >
            {table[c] ?? '?'}
          </text>
        </g>
      )) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 10. 信号转导级联                                                   */
/* ------------------------------------------------------------------ */

/**
 * 磷酸化级联：一串激酶按 progress 逐级活化（每一步带上一个磷酸基标记 P），
 * 末端标出细胞响应。覆盖 Signal transduction。
 */
export const SignalingCascade: React.FC<{
  x: number;
  y: number;
  /** 级联层级名称。 */
  steps: string[];
  /** 每级间距。 */
  gap?: number;
  color?: ColorRole | string;
  /** 末端响应标签。 */
  response?: string;
  progress?: number;
}> = ({ x, y, steps, gap = 150, color = COLORS.primary, response, progress = 1 }) => {
  const p = clamp01(progress);
  const shown = Math.max(1, Math.round(steps.length * p));
  return (
    <g>
      {steps.slice(0, shown).map((s, i) => {
        const cx = x + i * gap;
        const active = i < shown - 1 || p >= 0.999;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={y}
              r={44}
              fill={alpha(active ? COLORS.result : color, 0.24)}
              stroke={active ? COLORS.result : color}
              strokeWidth={3.6}
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
              {s}
            </text>
            {active ? (
              <g>
                <circle cx={cx + 40} cy={y - 38} r={15} fill={COLORS.accent} />
                <text
                  x={cx + 40}
                  y={y - 30}
                  fill={COLORS.bg1 ?? COLORS.textStrong}
                  fontFamily={FONT}
                  fontSize={19}
                  fontWeight={700}
                  textAnchor="middle"
                >
                  P
                </text>
              </g>
            ) : null}
            {i > 0 ? (
              <line
                x1={cx - gap + 46}
                y1={y}
                x2={cx - 46}
                y2={y}
                stroke={COLORS.textDim}
                strokeWidth={3}
              />
            ) : null}
          </g>
        );
      })}
      {response && shown === steps.length ? (
        <g>
          <line x1={x + (steps.length - 1) * gap + 46} y1={y} x2={x + (steps.length - 1) * gap + 110} y2={y} stroke={COLORS.result} strokeWidth={3.4} />
          <polygon points={headPts(x + (steps.length - 1) * gap + 110, y, 0, 14)} fill={COLORS.result} />
          <text x={x + (steps.length - 1) * gap + 126} y={y + 9} fill={COLORS.result} fontFamily={FONT} fontSize={26} fontWeight={700}>
            {response}
          </text>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 11. 负反馈回路                                                     */
/* ------------------------------------------------------------------ */

/**
 * 负反馈回路：环上若干节点（刺激 → 感受器 → 效应器 → 响应），响应以 ⊣
 * 符号抑制回起点。扰动由 progress 注入，曲线显示被拉回设定点。
 * 覆盖 Negative feedback regulation。
 */
export const FeedbackLoop: React.FC<{
  cx: number;
  cy: number;
  r: number;
  nodes: string[];
  /** 当前值与设定值（用于显示偏差）。 */
  value?: number;
  setPoint?: number;
  /** Numeric range for the visible current-value gauge. */
  range?: [number, number];
  color?: ColorRole | string;
  progress?: number;
}> = ({ cx, cy, r, nodes, value, setPoint, range = [0, 1], color = COLORS.primary, progress = 1 }) => {
  const p = clamp01(progress);
  const n = nodes.length;
  const pos = (i: number): [number, number] => {
    const a = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const shown = Math.max(2, Math.round(n * p));
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 62} fill="none" stroke={COLORS.axis} strokeWidth={2.6} strokeDasharray="10 8" />
      {nodes.map((node, i) => {
        if (i >= shown) return null;
        const q = pos(i);
        const a = pos((i + 1) % n);
        const mid: [number, number] = [(q[0] + a[0]) / 2, (q[1] + a[1]) / 2];
        const outward: [number, number] = [
          cx + (mid[0] - cx) * 1.18,
          cy + (mid[1] - cy) * 1.18,
        ];
        const deg = (Math.atan2(a[1] - outward[1], a[0] - outward[0]) * 180) / Math.PI;
        return (
          <g key={i}>
            <rect
              x={q[0] - 86}
              y={q[1] - 30}
              width={172}
              height={60}
              rx={12}
              fill={alpha(color, 0.18)}
              stroke={color}
              strokeWidth={3}
            />
            <text
              x={q[0]}
              y={q[1] + 9}
              fill={COLORS.textStrong}
              fontFamily={FONT}
              fontSize={25}
              fontWeight={700}
              textAnchor="middle"
            >
              {node}
            </text>
            {i === n - 1 && shown === n ? (
              <polygon points={headPts(a[0], a[1], deg, 15)} fill={COLORS.warn} />
            ) : (
              <polygon points={headPts(a[0], a[1], deg, 15)} fill={color} />
            )}
          </g>
        );
      })}
      {value !== undefined && setPoint !== undefined ? (
        <g>
          <line x1={cx - 100} y1={cy + 42} x2={cx + 100} y2={cy + 42} stroke={COLORS.axis} strokeWidth={5} />
          <line x1={cx - 100 + 200 * clamp01((setPoint - range[0]) / (range[1] - range[0]))} y1={cy + 28} x2={cx - 100 + 200 * clamp01((setPoint - range[0]) / (range[1] - range[0]))} y2={cy + 56} stroke={COLORS.result} strokeWidth={4} />
          <circle cx={cx - 100 + 200 * clamp01((value - range[0]) / (range[1] - range[0]))} cy={cy + 42} r={11} fill={COLORS.warn} />
          <text
          x={cx}
          y={cy - r - 45}
          fill={Math.abs(value - setPoint) < 0.05 ? COLORS.result : COLORS.warn}
          fontFamily={FONT}
          fontSize={30}
          fontWeight={700}
          textAnchor="middle"
        >
          {`${value.toFixed(2)} → set ${setPoint.toFixed(2)}`}
          </text>
        </g>
      ) : null}
    </g>
  );
};
