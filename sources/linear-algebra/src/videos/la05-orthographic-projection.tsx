import React from 'react';
import { Backdrop } from '../components/Backdrop';
import { Formula } from '../components/Formula';
import { Axes } from '../components/Plot';
import {
  Projection,
  Vec,
  dot2,
  mkSpace,
  projCoef,
  projVec,
  residualVec,
  type Vec2,
} from '../components/La';
import { SceneShell, SplitBody, StackBody } from '../components/SceneShell';
import { Chip, Heading, Hi, Kicker, Lines, Verdict } from '../components/ui';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import FORMULAS from '../formulas.json';
import type { SceneDef } from '../Video';

const T = {
  v: { x: 3, y: 3 } as Vec2,
  u: { x: 2, y: 1 } as Vec2,
  coefficient: () => projCoef({ x: 3, y: 3 }, { x: 2, y: 1 }),
  projection: () => projVec({ x: 3, y: 3 }, { x: 2, y: 1 }),
  residual: () => residualVec({ x: 3, y: 3 }, { x: 2, y: 1 }),
  orthogonality: () => dot2(
    residualVec({ x: 3, y: 3 }, { x: 2, y: 1 }),
    { x: 2, y: 1 }
  ),
  fmt: (n: number) => (Math.abs(n) < 1e-8 ? 0 : n).toFixed(2),
};

const boardStyle: React.CSSProperties = {
  width: '100%',
  height: 356,
  borderRadius: 24,
  border: `1.5px solid ${alpha(COLORS.result, 0.3)}`,
  background: alpha(COLORS.bg0, 0.9),
  padding: 18,
  boxSizing: 'border-box',
};

const ProjectionBoard: React.FC<{
  frame: number;
  phase: 'vector' | 'shadow' | 'residual';
}> = ({ frame, phase }) => {
  const width = 900;
  const height = 320;
  const s = mkSpace(width, height, [-4, 8.8992248062], [-0.5, 3.5]);
  const axisProgress = ramp(frame, 2, 22);
  const vectorProgress = ramp(frame, 16, 34);
  const projectionProgress = phase === 'vector' ? 0 : ramp(frame, 30, 48);
  const residualProgress = phase === 'residual' ? ramp(frame, 48, 46) : projectionProgress * 0.58;
  return (
    <div data-k="figure" data-n={`projection-${phase}`} style={boardStyle}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Axes
          width={width}
          height={height}
          xDomain={[-4, 8.8992248062]}
          yDomain={[-0.5, 3.5]}
          opacity={axisProgress}
        />
        <Vec
          s={s}
          v={T.u}
          color={COLORS.accent}
          label="u"
          progress={vectorProgress}
        />
        {phase === 'vector' ? (
          <Vec
            s={s}
            v={T.v}
            color={COLORS.primary}
            label="b"
            progress={ramp(frame, 28, 34)}
          />
        ) : (
          <Projection
            s={s}
            v={T.v}
            u={T.u}
            progress={phase === 'shadow' ? projectionProgress : residualProgress}
          />
        )}
      </svg>
    </div>
  );
};

const TitleScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.result} />}
    header={
      <>
        <Kicker text="Linear algebra · 05" frame={frame} />
        <Heading
          text="Orthogonal Projection: the nearest shadow"
          frame={frame}
          size={62}
          width={1600}
        />
      </>
    }
    body={
      <StackBody
        top={
          <div style={{ color: COLORS.textStrong, opacity: fadeIn(frame, 18, 16) }}>
            <Formula svg={FORMULAS.la05Title.svg} pxPerEx={28} />
          </div>
        }
        bottom={
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, opacity: fadeIn(frame, 36, 16) }}>
            <Chip text="drop a perpendicular" color={COLORS.warn} />
            <Chip text="keep the component on u" color={COLORS.result} />
          </div>
        }
      />
    }
    foot={
      <Chip
        text="Projection is the closest point on a line or subspace"
        color={COLORS.result}
        opacity={fadeIn(frame, 52, 14)}
      />
    }
  />
);

const SetupScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.primary} />}
    header={
      <>
        <Kicker text="Setup" frame={frame} />
        <Heading text="A target vector and one allowed direction" frame={frame} />
      </>
    }
    body={
      <SplitBody
        ratio={0.36}
        left={
          <Lines
            frame={frame}
            top={0}
            left={0}
            width={570}
            start={14}
            bullet
            items={[
              <>b is the vector we want to approximate.</>,
              <>u defines the allowed line.</>,
              <>We seek the closest multiple <Hi>cu</Hi>.</>,
            ]}
          />
        }
        right={<ProjectionBoard frame={frame} phase="vector" />}
      />
    }
    foot={
      <Chip text="Only motion along u is allowed" color={COLORS.accent} opacity={fadeIn(frame, 58, 14)} />
    }
  />
);

const CoefficientScene: React.FC<{ frame: number }> = ({ frame }) => {
  const coefficient = T.coefficient();
  const projection = T.projection();
  return (
    <SceneShell
      backdrop={<Backdrop width={1920} height={1080} tint={COLORS.accent} />}
      header={
        <>
          <Kicker text="Compute the shadow" frame={frame} />
          <Heading text="The dot product chooses how far to travel" frame={frame} />
        </>
      }
      body={
        <SplitBody
          ratio={0.37}
          left={
            <div>
              <Lines
                frame={frame}
                top={0}
                left={0}
                width={590}
                start={14}
                bullet
                bulletColor={COLORS.accent}
                items={[
                  <>Measure alignment with b · u.</>,
                  <>Divide by squared length u · u.</>,
                  <>c = {T.fmt(coefficient)}.</>,
                  <>p = ({T.fmt(projection.x)}, {T.fmt(projection.y)}).</>,
                ]}
              />

            </div>
          }
          right={<ProjectionBoard frame={frame} phase="shadow" />}
        />
      }
      foot={
        <div style={{display:"flex",flexDirection:"column",gap:18,color:COLORS.textStrong}}><Formula svg={FORMULAS.projComp.svg} pxPerEx={18} align="left" opacity={fadeIn(frame,58,16)} /><Chip text="The projection remains on span{u}" color={COLORS.result} opacity={fadeIn(frame, 76, 14)} /></div>
      }
    />
  );
};

const ResidualScene: React.FC<{ frame: number }> = ({ frame }) => {
  const residual = T.residual();
  const orthogonality = T.orthogonality();
  return (
    <SceneShell
      backdrop={<Backdrop width={1920} height={1080} tint={COLORS.warn} />}
      header={
        <>
          <Kicker text="Why it is closest" frame={frame} />
          <Heading text="The leftover error is perpendicular" frame={frame} />
        </>
      }
      body={
        <SplitBody
          ratio={0.38}
          left={
            <div>
              <Lines
                frame={frame}
                top={0}
                left={0}
                width={610}
                start={12}
                bullet
                bulletColor={COLORS.warn}
                items={[
                  <>Residual r = b − p.</>,
                  <>r = ({T.fmt(residual.x)}, {T.fmt(residual.y)}).</>,
                  <>r · u = {T.fmt(orthogonality)}.</>,
                ]}
              />
              <div style={{ marginTop: 184, opacity: fadeIn(frame, 50, 14) }}>
                <Verdict ok={Math.abs(orthogonality) < 1e-8} label="right angle certified" />
              </div>
            </div>
          }
          right={<ProjectionBoard frame={frame} phase="residual" />}
        />
      }
      foot={
        <Formula svg={FORMULAS.projResidual.svg} pxPerEx={21} align="left" opacity={fadeIn(frame, 64, 16)} />
      }
    />
  );
};

const ClosingScene: React.FC<{ frame: number }> = ({ frame }) => (
  <SceneShell
    backdrop={<Backdrop width={1920} height={1080} tint={COLORS.result} />}
    header={
      <>
        <Kicker text="Takeaway" frame={frame} />
        <Heading text="Projection splits b into parallel and perpendicular parts" frame={frame} size={56} width={1700} />
      </>
    }
    body={
      <SplitBody
        ratio={0.48}
        left={
          <Lines
            frame={frame}
            top={0}
            left={0}
            width={760}
            start={14}
            bullet
            items={[
              <>p lies in the chosen subspace.</>,
              <>r is orthogonal to that subspace.</>,
              <>Applying the projector twice changes nothing.</>,
            ]}
          />
        }
        right={
          <div style={{ ...boardStyle, display: 'flex', alignItems: 'center', color: COLORS.textStrong, opacity: fadeIn(frame, 28, 16) }}>
            <Formula svg={FORMULAS.projMatrix.svg} pxPerEx={21} />
          </div>
        }
      />
    }
    foot={<Chip text="b = projection + residual" color={COLORS.result} opacity={fadeIn(frame, 56, 14)} />}
  />
);

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: TitleScene, dur: 110 },
  { id: 'setup', Comp: SetupScene, dur: 160 },
  { id: 'coefficient', Comp: CoefficientScene, dur: 220 },
  { id: 'residual', Comp: ResidualScene, dur: 230 },
  { id: 'closing', Comp: ClosingScene, dur: 180 },
];
