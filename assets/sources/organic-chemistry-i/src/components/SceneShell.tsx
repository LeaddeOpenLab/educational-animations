import React from 'react';
import { COLORS, FONT } from '../theme';

/**
 * SceneShell — bands and splits, so a scene never hand-writes a `top` again.
 *
 * The problem this solves
 * -----------------------
 * A scene that places every element with `top={412}` / `left={108}` has no
 * mechanism stopping two elements from landing on the same pixels. In the CS
 * batch that produced ~300 hand-written coordinates across 16 videos and a
 * steady trickle of collisions — a copy column declared at x=108 with a 900px
 * width reaching straight across a figure whose Box starts at x=700.
 *
 * Bands make that class of mistake structurally impossible:
 *   - the header band owns the top strip, the foot band owns the bottom strip,
 *     the body band gets what is left;
 *   - inside a band, children flow. You do not write positional styles there.
 *   - when the body needs copy beside a figure, `SplitBody` gives each side a
 *     bounded box, so neither can grow into the other.
 *
 * What it deliberately does NOT do
 * --------------------------------
 * It does not clip. A band with `overflow: hidden` would hide the evidence
 * instead of fixing it — the failure mode becomes "the figure is missing a
 * piece" rather than "this scene is laid out wrong". Overflow is reported by
 * `scripts/check-overlap.cjs` instead. See references/overlap-rules.md.
 *
 * Matching against the checker
 * ----------------------------
 * The root carries `data-root` so `OverlapProbe` has a coordinate origin, and
 * every band carries `data-k="band"` so a report can name the band a stray
 * element came from.
 */

/** Geometry in 1920×1080 composition pixels. Port these from scripts/config.js. */
export const SCENE_GRID = {
  /** left / right margin — matches the x=108 the existing batches use */
  padX: 108,
  /** top of the header band: the kicker sits here */
  headerTop: 74,
  /** header band height: kicker + headline + up to three copy rows */
  headerH: 322,
  /** clear space between bands, so bands never touch even when content is full */
  gap: 40,
  /** bottom band height, reserved whether or not anything lands in it */
  footH: 208,
  /** bottom margin — keep clear of the platform safe area (§2) */
  padBottom: 72,
};

export const sceneBands = (H = 1080) => {
  const g = SCENE_GRID;
  const header = { y: g.headerTop, h: g.headerH };
  const foot = { y: H - g.padBottom - g.footH, h: g.footH };
  const body = { y: header.y + header.h + g.gap, h: foot.y - g.gap - (header.y + header.h + g.gap) };
  return { header, body, foot };
};

const bandStyle = (top: number, height: number): React.CSSProperties => ({
  position: 'absolute',
  left: SCENE_GRID.padX,
  right: SCENE_GRID.padX,
  top,
  height,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  fontFamily: FONT,
});

/** A named band. Tagged so check-overlap.cjs can attribute a stray element. */
export const Band: React.FC<{
  top: number;
  height: number;
  name: string;
  children?: React.ReactNode;
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  opacity?: number;
}> = ({ top, height, name, children, justify = 'flex-start', align = 'flex-start', opacity = 1 }) => (
  <div
    data-k="band"
    data-n={name}
    style={{ ...bandStyle(top, height), justifyContent: justify, alignItems: align, opacity }}
  >
    {children}
  </div>
);

/**
 * The three-band scene. Everything a scene draws goes into one of these slots;
 * nothing is allowed to sit between them.
 *
 *   <SceneShell
 *     header={<><Kicker text="02 · Anatomy" frame={f} /><Heading text="…" frame={f} /></>}
 *     body={<SplitBody left={<Lines … />} right={<Board … />} />}
 *     foot={<Chip text="…" />}
 *   />
 */
export const SceneShell: React.FC<{
  header?: React.ReactNode;
  body?: React.ReactNode;
  foot?: React.ReactNode;
  height?: number;
  /** opaque backdrop stays the scene's own business — pass it separately */
  backdrop?: React.ReactNode;
}> = ({ header, body, foot, height = 1080, backdrop }) => {
  const b = sceneBands(height);
  return (
    <div data-root style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.bg0 }}>
      {backdrop}
      {header ? (
        <Band top={b.header.y} height={b.header.h} name="header">
          {header}
        </Band>
      ) : null}
      {body ? (
        <Band top={b.body.y} height={b.body.h} name="body">
          {body}
        </Band>
      ) : null}
      {foot ? (
        <Band top={b.foot.y} height={b.foot.h} name="foot" justify="flex-end">
          {foot}
        </Band>
      ) : null}
    </div>
  );
};

/**
 * Split the body band into a copy column and a figure column, each with a hard
 * width. This is the structural fix for "the caption reaches across the figure":
 * the copy column simply cannot be wider than its own share.
 *
 * `ratio` is the copy column's share of the free width. 0.42 is a good default —
 * the figure is the protagonist (§1.2), and it needs the larger share.
 */
export const SplitBody: React.FC<{
  left?: React.ReactNode;
  right?: React.ReactNode;
  ratio?: number;
  gap?: number;
  align?: React.CSSProperties['alignItems'];
}> = ({ left, right, ratio = 0.42, gap = 48, align = 'flex-start' }) => (
  <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', gap, alignItems: align }}>
    <div data-k="column" data-n="copy" style={{ flex: `0 0 ${(ratio * 100).toFixed(1)}%`, minWidth: 0 }}>
      {left}
    </div>
    <div data-k="column" data-n="figure" style={{ flex: '1 1 auto', minWidth: 0 }}>
      {right}
    </div>
  </div>
);

/**
 * Wide layout for a figure that needs the full width: copy on top, figure below.
 * Still no positional styles — the two rows share the band by flex.
 */
export const StackBody: React.FC<{
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  gap?: number;
}> = ({ top, bottom, gap = 28 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', gap }}>
    {top ? <div style={{ flex: '0 0 auto' }}>{top}</div> : null}
    {bottom ? <div style={{ flex: '1 1 auto', minHeight: 0 }}>{bottom}</div> : null}
  </div>
);
