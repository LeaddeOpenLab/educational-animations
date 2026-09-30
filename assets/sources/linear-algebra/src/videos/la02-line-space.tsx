import React from 'react';
import { Backdrop } from '../components/Backdrop';
import { Formula } from '../components/Formula';
import { Axes } from '../components/Plot';
import { LineSpan, MatGrid, Vec, mkSpace, matRank, transposeM, type Mat, type Vec2 } from '../components/La';
import { SceneShell, SplitBody, StackBody } from '../components/SceneShell';
import { Chip, Heading, Hi, Kicker, Lines } from '../components/ui';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import FORMULAS from '../formulas.json';
import type { SceneDef } from '../Video';

const T = {
  A: [[1, 2, 1], [2, 4, 2]] as Mat,
  row1: { x: 1, y: 2 } as Vec2,
  row2: { x: 2, y: 4 } as Vec2,
  rank: () => matRank([[1, 2, 1], [2, 4, 2]]),
  transpose: () => transposeM([[1, 2, 1], [2, 4, 2]]),
  scale: () => 2,
  fmt: (n: number) => n.toFixed(0),
};

const card: React.CSSProperties = {
  width: '100%', height: 356, borderRadius: 22,
  background: alpha(COLORS.bg0, 0.9),
  border: `1.5px solid ${alpha(COLORS.accent, 0.28)}`,
  padding: 18, boxSizing: 'border-box',
};

const RowBoard: React.FC<{ frame: number; dependent?: boolean }> = ({ frame, dependent = false }) => {
  const w = 900;
  const h = 320;
  const s = mkSpace(w, h, [-4, 4], [-3, 5]);
  const first = ramp(frame, 12, 34);
  const second = ramp(frame, 30, 40);
  return (
    <div data-k="figure" data-n={dependent ? 'dependent-row-vectors' : 'row-vector'} style={card}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`}>
        <Axes width={w} height={h} xDomain={[-4, 4]} yDomain={[-3, 5]} opacity={ramp(frame, 2, 22)} />
        <LineSpan s={s} v={T.row1} color={COLORS.primary} progress={ramp(frame, 18, 44)} />
        <Vec s={s} v={T.row1} color={COLORS.primary} label="r₁" progress={first} />
        {dependent ? <Vec s={s} v={T.row2} color={COLORS.accent} label="r₂ = 2r₁" progress={second} /> : null}
        {dependent ? <circle cx={s.zeroX} cy={s.zeroY} r={10 + 7 * ramp(frame, 54, 24)} fill="none" stroke={COLORS.result} strokeWidth={3} opacity={fadeIn(frame, 52, 12)} /> : null}
      </svg>
    </div>
  );
};

const TitleScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.accent} />}
    header={<><Kicker text="Linear algebra · 02" frame={frame} /><Heading text="Row Space: rows span input directions" frame={frame} size={60} width={1580} /></>}
    body={<StackBody
      top={<div style={{ color: COLORS.textStrong, opacity: fadeIn(frame, 18, 16) }}><Formula svg={FORMULAS.la02Title.svg} pxPerEx={28} /></div>}
      bottom={<div style={{ display: 'flex', justifyContent: 'center', gap: 24, opacity: fadeIn(frame, 36, 16) }}><Chip text="rows live in the input space" color={COLORS.primary} /><Chip text="same dimension as column space" color={COLORS.result} /></div>}
    />}
    foot={<Chip text="Row space is the span of the matrix rows" color={COLORS.accent} opacity={fadeIn(frame, 54, 14)} />}
  />
);

const RowsScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.primary} />}
    header={<><Kicker text="Row directions" frame={frame} /><Heading text="Rows generate a subspace of the input coordinates" frame={frame} /></>}
    body={<SplitBody ratio={0.38}
      left={<Lines frame={frame} top={0} left={0} width={610} start={16} items={[
        <>Read across A to obtain row vectors.</>,
        <>Their linear combinations form Row(A).</>,
        <>2D example: r₂ = 2r₁ adds no direction.</>,
      ]} bullet />}
      right={<RowBoard frame={frame} dependent />}
    />}
    foot={<Formula svg={FORMULAS.rowSpaceDef.svg} pxPerEx={21} align="left" opacity={fadeIn(frame, 58, 16)} />}
  />
);

const TransposeScene: React.FC<{ frame: number }> = ({ frame }) => {
  const AT = T.transpose();
  return (
    <SceneShell
      backdrop={<Backdrop width={1920} height={1080} tint={COLORS.result} />}
      header={<><Kicker text="Transpose bridge" frame={frame} /><Heading text="Row(A) is exactly Col(Aᵀ)" frame={frame} /></>}
      body={<SplitBody ratio={0.36}
        left={<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}><Lines frame={frame} top={0} left={0} width={570} start={14} items={[
          <>Transpose turns rows into columns.</>,
          <>Column-space tools now apply unchanged.</>,
          <>Both spaces have rank {T.rank()}.</>,
        ]} bulletColor={COLORS.result} bullet /></div>}
        right={<div data-k="figure" data-n="transpose-matrix" style={card}><svg width="100%" height="100%" viewBox="0 0 900 320"><MatGrid box={{ x: 30, y: 75, w: 330, h: 170 }} values={T.A} highlightRow={Math.min(1, Math.floor(ramp(frame, 12, 48) * 2))} fmt={T.fmt} progress={ramp(frame, 6, 34)} /><path d="M400 160 H500" stroke={COLORS.accent} strokeWidth={4} strokeDasharray="100" strokeDashoffset={100 * (1 - ramp(frame, 30, 28))} /><polygon points="500,160 482,150 482,170" fill={COLORS.accent} opacity={fadeIn(frame, 46, 10)} /><MatGrid box={{ x: 540, y: 34, w: 300, h: 252 }} values={AT} highlightCol={Math.min(1, Math.floor(ramp(frame, 50, 42) * 2))} fmt={T.fmt} progress={ramp(frame, 42, 40)} /></svg></div>}
      />}
      foot={<div style={{display: "flex", flexDirection: "column", gap: 20, color: COLORS.textStrong}}><Formula svg={FORMULAS.rowRank.svg} pxPerEx={20} align="left" opacity={fadeIn(frame, 46, 16)} /><Chip text="Transpose changes the view, not the rank" color={COLORS.result} opacity={fadeIn(frame, 72, 14)} /></div>}
    />
  );
};

const ClosingScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.accent} />}
    header={<><Kicker text="Takeaway" frame={frame} /><Heading text="Row space records the input directions A can detect" frame={frame} size={56} width={1600} /></>}
    body={<SplitBody ratio={0.46}
      left={<Lines frame={frame} top={0} left={0} width={730} start={14} items={[
        <>Rows span the observable combinations of inputs.</>,
        <>Dependent rows collapse onto one direction.</>,
        <>Row rank = column rank = <Hi>{T.rank()}</Hi>.</>,
      ]} bullet />}
      right={<div style={{ ...card, display: 'flex', alignItems: 'center', color: COLORS.textStrong, opacity: fadeIn(frame, 30, 16) }}><Formula svg={FORMULAS.rowOrtho.svg} pxPerEx={22} /></div>}
    />}
    foot={<Chip text="Row(A) = Col(Aᵀ)" color={COLORS.primary} opacity={fadeIn(frame, 56, 14)} />}
  />
);

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: TitleScene, dur: 130 },
  { id: 'rows', Comp: RowsScene, dur: 260 },
  { id: 'transpose', Comp: TransposeScene, dur: 280 },
  { id: 'closing', Comp: ClosingScene, dur: 230 },
];
