import React from 'react';
import { Backdrop } from '../components/Backdrop';
import { Formula } from '../components/Formula';
import { Axes } from '../components/Plot';
import { LineSpan, MatGrid, Vec, gaussElim, mkSpace, type Mat, type Vec2 } from '../components/La';
import { SceneShell, SplitBody, StackBody } from '../components/SceneShell';
import { Chip, Heading, Hi, Kicker, Lines, Verdict } from '../components/ui';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import FORMULAS from '../formulas.json';
import type { SceneDef } from '../Video';

const T = {
  A: [[1, 2, -1], [2, 4, -2]] as Mat,
  nullDir: { x: -2, y: 1 } as Vec2,
  testScale: 2,
  reduced: () => gaussElim([[1, 2, -1], [2, 4, -2]]).reduced,
  rank: () => gaussElim([[1, 2, -1], [2, 4, -2]]).rank,
  nullity: () => 3 - gaussElim([[1, 2, -1], [2, 4, -2]]).rank,
  apply2: (v: Vec2) => v.x + 2 * v.y,
  fmt: (n: number) => Math.abs(n) < 1e-8 ? '0' : n.toFixed(0),
};

const board: React.CSSProperties = {
  width: '100%', height: 356, borderRadius: 22,
  border: `1.5px solid ${alpha(COLORS.warn, 0.3)}`,
  background: alpha(COLORS.bg0, 0.9), padding: 18, boxSizing: 'border-box',
};

const NullBoard: React.FC<{ frame: number; showTest?: boolean }> = ({ frame, showTest = false }) => {
  const w = 900;
  const h = 320;
  const s = mkSpace(w, h, [-6, 6], [-4, 4]);
  const v = { x: T.nullDir.x * T.testScale, y: T.nullDir.y * T.testScale };
  return (
    <div data-k="figure" data-n="null-space-line" style={board}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`}>
        <Axes width={w} height={h} xDomain={[-6, 6]} yDomain={[-4, 4]} opacity={ramp(frame, 2, 22)} />
        <LineSpan s={s} v={T.nullDir} color={COLORS.accent} width={4} progress={ramp(frame, 18, 44)} />
        <Vec s={s} v={T.nullDir} color={COLORS.primary} label="n" progress={ramp(frame, 30, 30)} />
        {showTest ? <Vec s={s} v={v} color={COLORS.result} label={`${T.testScale.toFixed(0)}n`} progress={ramp(frame, 50, 34)} /> : null}
        {showTest ? <circle cx={s.px(v.x)} cy={s.py(v.y)} r={8 + 9 * ramp(frame, 68, 22)} fill={alpha(COLORS.result, 0.18)} stroke={COLORS.result} strokeWidth={3} /> : null}
      </svg>
    </div>
  );
};

const TitleScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.warn} />}
    header={<><Kicker text="Linear algebra · 03" frame={frame} /><Heading text="Null Space: inputs mapped to zero" frame={frame} size={64} width={1500} /></>}
    body={<StackBody
      top={<div style={{ color: COLORS.textStrong, opacity: fadeIn(frame, 18, 16) }}><Formula svg={FORMULAS.la03Title.svg} pxPerEx={29} /></div>}
      bottom={<div style={{ display: 'flex', justifyContent: 'center', gap: 24, opacity: fadeIn(frame, 36, 16) }}><Chip text="nonzero inputs" color={COLORS.primary} /><Chip text="zero output" color={COLORS.warn} /><Chip text="hidden directions" color={COLORS.accent} /></div>}
    />}
    foot={<Chip text="Null space is what the transformation cannot see" color={COLORS.warn} opacity={fadeIn(frame, 54, 14)} />}
  />
);

const ConstraintScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.primary} />}
    header={<><Kicker text="Homogeneous system" frame={frame} /><Heading text="Set the output to zero and expose free motion" frame={frame} /></>}
    body={<SplitBody ratio={0.38}
      left={<Lines frame={frame} top={0} left={0} width={610} start={16} items={[
        <>Solve Ax = 0.</>,
        <>Pivot variables depend on free variables.</>,
        <>Every solution is a hidden input direction.</>,
      ]} bullet />}
      right={<div data-k="figure" data-n="null-system-matrix" style={board}><svg width="100%" height="100%" viewBox="0 0 900 320"><MatGrid box={{ x: 40, y: 70, w: 350, h: 180 }} values={T.A} highlightRow={Math.min(1, Math.floor(ramp(frame, 18, 42) * 2))} fmt={T.fmt} progress={ramp(frame, 8, 34)} /><path d="M430 160 H520" stroke={COLORS.warn} strokeWidth={4} strokeDasharray="90" strokeDashoffset={90 * (1-ramp(frame,34,24))} /><MatGrid box={{ x: 560, y: 70, w: 290, h: 180 }} values={T.reduced()} pivotCells={[{r:0,c:0}]} fmt={T.fmt} progress={ramp(frame, 44, 38)} /></svg></div>}
    />}
    foot={<Formula svg={FORMULAS.nullDef.svg} pxPerEx={23} align="left" opacity={fadeIn(frame, 60, 16)} />}
  />
);

const DirectionScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.accent} />}
    header={<><Kicker text="Free directions" frame={frame} /><Heading text="A slice of the null plane is a line" frame={frame} /></>}
    body={<SplitBody ratio={0.34}
      left={<Lines frame={frame} top={0} left={0} width={540} start={14} items={[
        <>Fix x₃ = 0; vary x₂.</>,
        <>Use n = (−2, 1, 0).</>,
        <>The full null space is a plane.</>,
      ]} bulletColor={COLORS.accent} bullet />}
      right={<NullBoard frame={frame} />}
    />}
    foot={<Formula svg={FORMULAS.nullBasis.svg} pxPerEx={22} align="left" opacity={fadeIn(frame, 62, 16)} />}
  />
);

const VerifyScene: React.FC<{ frame: number }> = ({ frame }) => {
  const v = { x: T.nullDir.x * T.testScale, y: T.nullDir.y * T.testScale };
  const output = T.apply2(v);
  return (
    <SceneShell
      backdrop={<Backdrop width={1920} height={1080} tint={COLORS.result} />}
      header={<><Kicker text="Worked check" frame={frame} /><Heading text="Multiply a candidate and watch it disappear" frame={frame} /></>}
      body={<SplitBody ratio={0.36}
        left={<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><Lines frame={frame} top={0} left={0} width={570} start={14} items={[
          <>Choose x = {T.testScale.toFixed(0)}n.</>,
          <>The constraint gives {T.fmt(v.x)} + 2({T.fmt(v.y)}).</>,
          <>The output is exactly {T.fmt(output)}.</>,
        ]} bullet /><div style={{ marginTop: 230, opacity: fadeIn(frame, 54, 14) }}><Verdict ok={Math.abs(output) < 1e-8} label="x belongs to Null(A)" /></div></div>}
        right={<NullBoard frame={frame} showTest />}
      />}
      foot={<Chip text="Scaling a null vector keeps it null" color={COLORS.result} opacity={fadeIn(frame, 72, 14)} />}
    />
  );
};

const ClosingScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.warn} />}
    header={<><Kicker text="Takeaway" frame={frame} /><Heading text="Null space measures lost input dimensions" frame={frame} size={58} width={1550} /></>}
    body={<SplitBody ratio={0.48}
      left={<Lines frame={frame} top={0} left={0} width={760} start={14} items={[
        <>Solve Ax = 0 to find invisible directions.</>,
        <>Free variables generate null-space basis vectors.</>,
        <>Here nullity(A) = <Hi>{T.nullity()}</Hi>.</>,
      ]} bullet />}
      right={<div style={{ ...board, display: 'flex', alignItems: 'center', color: COLORS.textStrong, opacity: fadeIn(frame, 28, 16) }}><Formula svg={FORMULAS.nullDim.svg} pxPerEx={23} /></div>}
    />}
    foot={<Chip text={`rank ${T.rank()} + nullity ${T.nullity()} = ${T.rank() + T.nullity()}`} color={COLORS.primary} opacity={fadeIn(frame, 54, 14)} />}
  />
);

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: TitleScene, dur: 120 },
  { id: 'constraint', Comp: ConstraintScene, dur: 180 },
  { id: 'direction', Comp: DirectionScene, dur: 220 },
  { id: 'verify', Comp: VerifyScene, dur: 200 },
  { id: 'closing', Comp: ClosingScene, dur: 180 },
];
