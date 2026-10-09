import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Backdrop } from './Backdrop';
import { COLORS, FONT, alpha } from '../theme';
import {RISC_V_COVER_FIGURES} from './RiscVCovers';

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
  ...RISC_V_COVER_FIGURES,
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
