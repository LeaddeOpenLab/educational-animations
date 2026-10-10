import { interpolate, spring } from 'remotion';
import active from './active.json';
import example from './themes/zephyr-real-time-operating-system.json';

/**
 * Semantic roles. Components only know these names, never literal colours.
 * Switching course = swapping one theme pack; every component stays untouched.
 */
export type ColorRole =
  | 'bg0'
  | 'bg1'
  | 'bg2'
  | 'grid'
  | 'axis'
  | 'primary' // main entity: the model, the decision boundary, the hypothesis
  | 'accent' // key quantity: the highlighted sample, one gradient step
  | 'result' // conclusion: the optimum, the converged classifier
  | 'warn' // danger: training error blow-up, overfitting, discarded branch
  | 'alt' // second series: the other class / a third cluster
  | 'textStrong'
  | 'textMuted'
  | 'textDim';

/** The half of the design language that is not colour. */
export type BackdropTokens = {
  gridSize: number;
  gridOpacity: number;
  glowOpacity: number;
  glowBlur: number;
};

export type Theme = {
  name: string;
  label: string;
  mode: 'dark' | 'light';
  colors: Record<ColorRole, string>;
  font: string;
  backdrop: BackdropTokens;
};

/**
 * Course theme packs, keyed by theme name.
 *
 * A new kit adds exactly one entry: write the pack with
 *   node scripts/pick-palette.mjs --discipline <x> --emit-theme src/theme/themes/<id>.json
 * then import it here and register it under its own name. The template ships
 * `_example` (see its `note` field for how to record a contrast resample) so the
 * project type-checks and renders before the first course theme exists.
 */
export const THEMES: Record<string, Theme> = {
  example: example as unknown as Theme,
};

/** Active course theme pack. Edit src/theme/active.json to switch. */
export const ACTIVE_THEME_NAME: string = active.theme;
export const THEME: Theme = THEMES[ACTIVE_THEME_NAME] ?? THEMES['example'];
export const COLORS = THEME.colors;
export const FONT = THEME.font;
export const BACKDROP = THEME.backdrop;

export const FPS = 30;

/** hex (#rgb / #rrggbb) -> rgba(..., a); non-hex passes through (grid/axis are already rgba). */
export const alpha = (color: string, a: number): string => {
  if (!color.startsWith('#')) return color;
  let h = color.slice(1);
  if (h.length === 3)
    h = h
      .split('')
      .map((c) => c + c)
      .join('');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

/** Linear fade-in. */
export const fadeIn = (frame: number, start: number, dur = 12): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Fade out over the last `dur` frames of a scene. */
export const fadeOut = (frame: number, sceneDur: number, dur = 10): number =>
  interpolate(frame, [sceneDur - dur, sceneDur], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const slideUp = (
  frame: number,
  start: number,
  dist = 26,
  dur = 14
): number =>
  interpolate(frame, [start, start + dur], [dist, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Smooth 0..1 ramp, useful for draw-on style animations. */
export const ramp = (
  frame: number,
  start: number,
  dur: number,
  ease = true
): number =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease ? (t: number) => t * t * (3 - 2 * t) : undefined,
  });

export const popIn = (
  frame: number,
  start: number,
  cfg: { damping: number; stiffness: number } = { damping: 14, stiffness: 140 }
): number =>
  spring({
    fps: FPS,
    frame: Math.max(0, frame - start),
    config: cfg,
  });

/** Scale a MathJax SVG by rewriting its width/height (ex -> px). */
export const scaleSvg = (svg: string, pxPerEx: number): string =>
  svg
    .replace(/width="([\d.]+)ex"/, (_m, w: string) => {
      const num = parseFloat(w);
      return `width="${(num * pxPerEx).toFixed(2)}px"`;
    })
    .replace(/height="([\d.]+)ex"/, (_m, h: string) => {
      const num = parseFloat(h);
      return `height="${(num * pxPerEx).toFixed(2)}px"`;
    });
