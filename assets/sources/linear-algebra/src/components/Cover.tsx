import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Backdrop } from './Backdrop';
import { COLORS, FONT, alpha } from '../theme';
import { Axes } from './Plot';
import {
  DataFit, DecompBlocks, EigenFan, EllipseSV, Lattice, LineSpan, MatGrid,
  OrthoBars, Parallelo, PlaneSpan, Projection, SubspaceNest, Vec, VecSum,
} from './La';

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
  'column-space': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <><PlaneSpan s={s} u={{x: 1.2, y: .35}} v={{x: -.35, y: 1.05}} progress={1}/><VecSum s={s} u={{x: 2.3, y: .7}} v={{x: -.8, y: 1.7}} progress={1}/></>}</Axes>,
  'line-space': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <><LineSpan s={s} v={{x: 1.45, y: .7}} progress={1}/><Vec s={s} v={{x: 2.8, y: 1.35}} label="r₁" progress={1}/><Vec s={s} v={{x: -2.1, y: -1.02}} color={COLORS.accent} label="r₂" progress={1}/></>}</Axes>,
  'zero-space': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <><LineSpan s={s} v={{x: 1, y: -1.15}} color={COLORS.result} width={4} progress={1}/><Vec s={s} v={{x: 2.3, y: -2.65}} label="x" progress={1}/><text x={s.px(-3.55)} y={s.py(2.45)} fontFamily={FONT} fontSize={30} fill={COLORS.textStrong}>Ax = 0</text></>}</Axes>,
  'left-zero-space': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3.9020979021, 3.9020979021]} showArrows={false}>{s => <><LineSpan s={s} v={{x: 1, y: .65}} progress={1}/><LineSpan s={s} v={{x: -.65, y: 1}} color={COLORS.accent} width={4} progress={1}/><text x={s.px(-3.35)} y={s.py(2.35)} fontFamily={FONT} fontSize={28} fill={COLORS.textStrong}>yᵀA = 0</text></>}</Axes>,
  'orthographic-projection': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3.9020979021, 3.9020979021]} showArrows={false}>{s => <><LineSpan s={s} v={{x: 1.5, y: .7}} color={COLORS.textMuted} progress={1}/><Projection s={s} v={{x: 2.25, y: 2.2}} u={{x: 1.5, y: .7}} progress={1}/></>}</Axes>,
  'least-squares': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <DataFit s={s} slope={.6} intercept={.15} pts={[{x:-3,y:-1.1},{x:-2.2,y:-1.6},{x:-1.2,y:-.15},{x:0,y:.5},{x:1,y:.35},{x:2,y:1.65},{x:3,y:1.55}]} progress={1}/>}</Axes>,
  'determinant': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <><Lattice s={s} A={[[1.4,.65],[.25,1.35]]} range={3} progress={1}/><Parallelo s={s} A={[[2.2,.9],[.5,1.7]]} label="signed area" progress={1}/></>}</Axes>,
  'volume-scaling-for-linear-transformations': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <><Lattice s={s} A={[[1.55,.6],[0,1.25]]} range={3} progress={1}/><Parallelo s={s} A={[[2.2,.85],[0,1.6]]} label="|det A|" progress={1}/></>}</Axes>,
  'eigenvalue': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <EigenFan s={s} A={[[2.15,.35],[0,1.05]]} scale={2.35} progress={1}/>}</Axes>,
  'eigenvector': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <><EigenFan s={s} A={[[1.8,.55],[0,1.1]]} scale={2.3} progress={1}/><LineSpan s={s} v={{x: 1, y: 0}} color={COLORS.result} width={4} progress={1}/></>}</Axes>,
  'matrix-diagonalization': () => <svg width={640} height={620} viewBox="0 0 640 620"><DecompBlocks box={{x:55,y:125,w:530,h:170}} labels={['P','D','P⁻¹']} progress={1}/><MatGrid box={{x:170,y:330,w:300,h:130}} values={[[3,0],[0,1]]} pivotCells={[{r:0,c:0},{r:1,c:1}]} progress={1}/></svg>,
  'singular-value-decomposition': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <EllipseSV s={s} A={[[2.1,.55],[.35,1.1]]} progress={1}/>}</Axes>,
  'gaussian-elimination': () => <svg width={640} height={620} viewBox="0 0 640 620"><MatGrid box={{x:90,y:105,w:460,h:390}} values={[[1,2,-1],[0,1,3],[0,0,1]]} pivotCells={[{r:0,c:0},{r:1,c:1},{r:2,c:2}]} progress={1}/><text x="320" y="555" textAnchor="middle" fontFamily={FONT} fontSize="30" fill={COLORS.result}>RREF</text></svg>,
  'rank-nullity-theorem': () => <svg width={640} height={620} viewBox="0 0 640 620"><SubspaceNest box={{x:85,y:130,w:470,h:330}} total={4} segs={[{label:'rank',value:2,color:COLORS.primary},{label:'nullity',value:2,color:COLORS.accent},{label:'input dimensions',value:4,color:COLORS.result}]} progress={1}/><text x="320" y="535" textAnchor="middle" fontFamily={FONT} fontSize="28" fill={COLORS.textStrong}>rank + nullity = n</text></svg>,
  'gram-schmidt-orthogonalization': () => <Axes width={640} height={620} xDomain={[-4, 4]} yDomain={[-3, 3]} showArrows={false}>{s => <OrthoBars s={s} vs={[{x:2.4,y:.7},{x:1.1,y:2.4}]} progress={1}/>}</Axes>,
  'qr-decomposition': () => <svg width={640} height={620} viewBox="0 0 640 620"><DecompBlocks box={{x:75,y:140,w:490,h:160}} labels={['Q','R']} progress={1}/><MatGrid box={{x:155,y:350,w:330,h:145}} values={[[1,2,3],[0,1,2],[0,0,1]]} pivotCells={[{r:0,c:0},{r:1,c:1},{r:2,c:2}]} progress={1}/></svg>,
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
