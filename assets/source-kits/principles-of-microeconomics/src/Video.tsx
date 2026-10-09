import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { ACTIVE_THEME_NAME, COLORS, FPS, fadeIn, fadeOut } from './theme';
import { OverlapProbe } from './components/OverlapProbe';
import FORMULA_THEME from './formulas.theme.json';

export type SceneDef = {
  id: string;
  Comp: React.FC<{ frame: number }>;
  dur: number;
};

export type TimelineEntry = SceneDef & { start: number };

/** Keep the whole timeline in one derived array so the total can never drift. */
export const buildTimeline = (defs: SceneDef[]): TimelineEntry[] => {
  let acc = 0;
  return defs.map((d) => {
    const e = { ...d, start: acc };
    acc += d.dur;
    return e;
  });
};

export const totalFrames = (defs: SceneDef[]): number =>
  defs.reduce((s, t) => s + t.dur, 0);

// MathJax \textcolor bakes the theme into the SVG at build time, so a theme
// swap without re-running the prerender leaves the previous course's colours
// behind. Warn once, loudly.
const bakedTheme = (FORMULA_THEME as { theme?: string }).theme;
if (bakedTheme !== ACTIVE_THEME_NAME) {
  console.warn(
    `[theme drift] formulas.json was baked for "${bakedTheme}" but the active theme is ` +
      `"${ACTIVE_THEME_NAME}". Re-run: node scripts/render-mathjax.cjs ${ACTIVE_THEME_NAME}`
  );
}

const SceneBody: React.FC<{ Comp: React.FC<{ frame: number }>; dur: number }> = ({
  Comp,
  dur,
}) => {
  const f = useCurrentFrame();
  const opacity = Math.min(fadeIn(f, 0, 6), fadeOut(f, dur, 8));
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg0, opacity }}>
      <Comp frame={f} />
    </AbsoluteFill>
  );
};

/**
 * A <Sequence> resets the frame clock, so each scene gets its own local frame.
 * Rendering <Comp frame={0} /> here would freeze every animation at frame 0.
 */
/**
 * `data-root` on the outermost fill is the origin `OverlapProbe` measures
 * against; the probe is mounted last so it costs the render nothing.
 */
export const VideoFrom: React.FC<{ defs: SceneDef[] }> = ({ defs }) => (
  <AbsoluteFill data-root style={{ backgroundColor: COLORS.bg0 }}>
    {buildTimeline(defs).map((t) => (
      <Sequence key={t.id} from={t.start} durationInFrames={t.dur} name={t.id}>
        <SceneBody Comp={t.Comp} dur={t.dur} />
      </Sequence>
    ))}
    <OverlapProbe />
  </AbsoluteFill>
);

/** Wrap one knowledge point's scene list into a stable Remotion component. */
export const makeVideo = (defs: SceneDef[]): React.FC => {
  const C: React.FC = () => <VideoFrom defs={defs} />;
  C.displayName = 'Video';
  return C;
};

export const VIDEO_FPS = FPS;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
