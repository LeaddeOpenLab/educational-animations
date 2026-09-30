import React from 'react';
import { Backdrop } from '../components/Backdrop';
import { Formula } from '../components/Formula';
import { Axes } from '../components/Plot';
import { LineSpan, MatGrid, SubspaceNest, Vec, dot2, gaussElim, mkSpace, transposeM, type Mat, type Vec2 } from '../components/La';
import { SceneShell, SplitBody, StackBody } from '../components/SceneShell';
import { Chip, Heading, Hi, Kicker, Lines, Verdict } from '../components/ui';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import FORMULAS from '../formulas.json';
import type { SceneDef } from '../Video';

const T = {
  A: [[1, 0], [0, 1], [1, 1]] as Mat,
  y: { x: 1, y: 1 } as Vec2,
  col1: { x: 1, y: 0 } as Vec2,
  leftWitness: [-1, -1, 1],
  transpose: () => transposeM([[1, 0], [0, 1], [1, 1]]),
  leftReduced: () => gaussElim(transposeM([[1, 0], [0, 1], [1, 1]])).reduced,
  dotWitnessCol1: () => -1 * 1 + -1 * 0 + 1 * 1,
  dims: () => ({ rank: 2, leftNull: 1, nullity: 0, rows: 3, cols: 2 }),
  fmt: (n: number) => Math.abs(n) < 1e-8 ? '0' : n.toFixed(0),
};

const panel: React.CSSProperties = {
  width: '100%', height: 356, borderRadius: 22,
  border: `1.5px solid ${alpha(COLORS.alt, 0.34)}`,
  background: alpha(COLORS.bg0, 0.9), padding: 18, boxSizing: 'border-box',
};

const OrthogonalBoard: React.FC<{ frame: number; witness?: boolean }> = ({ frame, witness = false }) => {
  const w = 900;
  const h = 320;
  const s = mkSpace(w, h, [-4, 4], [-1.2403846154, 1.2403846154]);
  const n = { x: -1, y: 1 };
  return (
    <div data-k="figure" data-n="left-null-orthogonality" style={panel}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`}>
        <Axes width={w} height={h} xDomain={[-4, 4]} yDomain={[-1.2403846154, 1.2403846154]} opacity={ramp(frame, 2, 22)} />
        <LineSpan s={s} v={T.y} color={COLORS.primary} width={4} progress={ramp(frame, 16, 38)} />
        <Vec s={s} v={T.y} color={COLORS.primary} label="Col(A)" progress={ramp(frame, 22, 30)} />
        <Vec s={s} v={n} color={COLORS.alt} label="Null(Aᵀ)" progress={ramp(frame, 38, 34)} />
        {witness ? <path d={`M${s.px(.28)},${s.py(.28)} L${s.px(0)},${s.py(.56)} L${s.px(-.28)},${s.py(.28)}`} fill="none" stroke={COLORS.result} strokeWidth={3} opacity={fadeIn(frame, 64, 14)} /> : null}
      </svg>
    </div>
  );
};

const TitleScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.alt} />}
    header={<><Kicker text="Linear algebra · 04" frame={frame} /><Heading text="Left Null Space: null space on the output side" frame={frame} size={58} width={1650} /></>}
    body={<StackBody top={<div style={{ color: COLORS.textStrong, opacity: fadeIn(frame, 16, 16) }}><Formula svg={FORMULAS.la04Title.svg} pxPerEx={28} /></div>} bottom={<div style={{ display: 'flex', justifyContent: 'center', gap: 22, opacity: fadeIn(frame, 34, 16) }}><Chip text="solve Aᵀy = 0" color={COLORS.alt} /><Chip text="orthogonal to every column" color={COLORS.primary} /></div>} />}
    foot={<Chip text="Standard name: left null space" color={COLORS.alt} opacity={fadeIn(frame, 50, 14)} />}
  />
);

const TransposeScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.primary} />}
    header={<><Kicker text="Step 1 · transpose" frame={frame} /><Heading text="Move the null-space question to Aᵀ" frame={frame} /></>}
    body={<SplitBody ratio={0.36}
      left={<Lines frame={frame} top={0} left={0} width={570} start={14} items={[
        <>A maps inputs into output coordinates.</>,
        <>Aᵀ maps output-side probes back.</>,
        <>Set that response to zero.</>,
      ]} bullet />}
      right={<div data-k="figure" data-n="left-null-transpose" style={panel}><svg width="100%" height="100%" viewBox="0 0 900 320"><MatGrid box={{ x: 70, y: 38, w: 260, h: 244 }} values={T.A} fmt={T.fmt} progress={ramp(frame, 6, 34)} /><path d="M380 160 H500" stroke={COLORS.alt} strokeWidth={4} strokeDasharray="120" strokeDashoffset={120*(1-ramp(frame,30,28))} /><polygon points="500,160 482,150 482,170" fill={COLORS.alt} opacity={fadeIn(frame,46,10)} /><MatGrid box={{ x: 550, y: 70, w: 280, h: 180 }} values={T.transpose()} highlightRow={Math.min(1,Math.floor(ramp(frame,46,36)*2))} fmt={T.fmt} progress={ramp(frame, 42, 38)} /></svg></div>}
    />}
    foot={<Formula svg={FORMULAS.leftNullDef.svg} pxPerEx={22} align="left" opacity={fadeIn(frame, 58, 16)} />}
  />
);

const SolveScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.accent} />}
    header={<><Kicker text="Step 2 · solve" frame={frame} /><Heading text="A single free coordinate reveals the witness" frame={frame} /></>}
    body={<SplitBody ratio={0.39}
      left={<Lines frame={frame} top={0} left={0} width={620} start={14} items={[
        <>Reduce Aᵀ and identify the free coordinate.</>,
        <>Choose it once to obtain a basis vector.</>,
        <>Here y = ({T.leftWitness.map(T.fmt).join(', ')}).</>,
      ]} bulletColor={COLORS.accent} bullet />}
      right={<div data-k="figure" data-n="left-null-rref" style={panel}><svg width="100%" height="100%" viewBox="0 0 900 320"><MatGrid box={{ x: 90, y: 65, w: 720, h: 190 }} values={T.leftReduced()} pivotCells={[{r:0,c:0},{r:1,c:1}]} highlightCol={2} fmt={T.fmt} progress={ramp(frame, 8, 56)} /></svg></div>}
    />}
    foot={<Chip text="Set the free variable, then solve for the pivot variables" color={COLORS.accent} opacity={fadeIn(frame, 66, 14)} />}
  />
);

const OrthogonalityScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.result} />}
    header={<><Kicker text="Step 3 · geometry" frame={frame} /><Heading text="Left-null vectors are perpendicular to Col(A)" frame={frame} /></>}
    body={<SplitBody ratio={0.34}
      left={<Lines frame={frame} top={0} left={0} width={540} start={14} items={[
        <>Aᵀy = 0 means every column has zero dot product with y.</>,
        <>Diagram: 2D cross-section of the column plane and its normal.</>,
      ]} bullet />}
      right={<OrthogonalBoard frame={frame} witness />}
    />}
    foot={<Formula svg={FORMULAS.leftNullDef.svg} pxPerEx={19} align="left" opacity={fadeIn(frame, 58, 16)} />}
  />
);

const DimensionScene: React.FC<{ frame: number }> = ({ frame }) => {
  const d = T.dims();
  return (
    <SceneShell
      backdrop={<Backdrop width={1920} height={1080} tint={COLORS.alt} />}
      header={<><Kicker text="Dimension count" frame={frame} /><Heading text="Output dimension splits into rank and left nullity" frame={frame} /></>}
      body={<SplitBody ratio={0.38}
        left={<Lines frame={frame} top={0} left={0} width={600} start={14} items={[
          <>A has {d.rows} output coordinates.</>,
          <>Its column rank is {d.rank}.</>,
          <>The remaining {d.leftNull} direction is left-null.</>,
        ]} bulletColor={COLORS.alt} bullet />}
        right={<div data-k="figure" data-n="left-null-dimensions" style={panel}><svg width="100%" height="100%" viewBox="0 0 900 320"><SubspaceNest box={{x:70,y:52,w:760,h:220}} total={d.rows} progress={ramp(frame,10,56)} segs={[{label:'rank(A)',value:d.rank,color:COLORS.primary},{label:'left nullity',value:d.leftNull,color:COLORS.alt},{label:'output dimension',value:d.rows,color:COLORS.result}]} /></svg></div>}
      />}
      foot={<Formula svg={FORMULAS.leftNullDim.svg} pxPerEx={22} align="left" opacity={fadeIn(frame, 62, 16)} />}
    />
  );
};

const ClosingScene: React.FC<{ frame: number }> = ({ frame }) => {
  const zero = T.dotWitnessCol1();
  return (
    <SceneShell
      backdrop={<Backdrop width={1920} height={1080} tint={COLORS.primary} />}
      header={<><Kicker text="Takeaway" frame={frame} /><Heading text="The left null space contains output-side blind spots" frame={frame} size={56} width={1650} /></>}
      body={<SplitBody ratio={0.48}
        left={<Lines frame={frame} top={0} left={0} width={760} start={12} items={[
          <>Transpose, then solve Aᵀy = 0.</>,
          <>The result is orthogonal to every column of A.</>,
          <>Witness check: y · a₁ = <Hi>{T.fmt(zero)}</Hi>.</>,
        ]} bullet />}
        right={<div style={{ ...panel, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: fadeIn(frame, 28, 14) }}><Verdict ok={Math.abs(zero)<1e-8} label="orthogonal" note="column test passes" /></div>}
      />}
      foot={<Chip text="Col(A) ⟂ Null(Aᵀ)" color={COLORS.result} opacity={fadeIn(frame, 54, 14)} />}
    />
  );
};

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: TitleScene, dur: 100 },
  { id: 'transpose', Comp: TransposeScene, dur: 140 },
  { id: 'solve', Comp: SolveScene, dur: 170 },
  { id: 'orthogonality', Comp: OrthogonalityScene, dur: 180 },
  { id: 'dimension', Comp: DimensionScene, dur: 170 },
  { id: 'closing', Comp: ClosingScene, dur: 140 },
];
