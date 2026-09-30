import React from 'react';
import { COLORS, FONT, alpha, fadeIn, slideUp } from '../theme';

/**
 * L1c — scene furniture. **Shared across courses, never rewritten per course.**
 *
 * Registered in kit.json under `shared`, not `primitives`: kickers, headings,
 * staggered text rows, block-diagram arrows and boxes, verdict rows. Kept
 * verbatim in edu-video-kit/template/ so every course gets them without
 * re-deriving them — extracting these is the only de-duplication worth doing
 * below the L3 layer.
 *
 * Every measurable element carries **`data-k`** (plus `data-n` for the label a
 * collision report shows). Without those tags the overlap gate has nothing to
 * read and reports "no probe output" — see `references/overlap-rules.md` §打标契约.
 * The scene root must also carry `data-root` and mount `<OverlapProbe />`;
 * that half lives in `src/Video.tsx`.
 */

export const Kicker: React.FC<{
  text: string;
  frame: number;
  start?: number;
  color?: string;
  top?: number;
  left?: number;
}> = ({ text, frame, start = 2, color = COLORS.primary, top = 74, left = 108 }) => (
  <div
    data-k="text"
    data-n={text}
    style={{
      position: 'absolute',
      left,
      top,
      fontFamily: FONT,
      fontSize: 21,
      letterSpacing: 5,
      textTransform: 'uppercase',
      color,
      opacity: fadeIn(frame, start, 12),
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

/** Big headline block, top-left anchored by default. */
export const Heading: React.FC<{
  text: string | React.ReactNode;
  frame: number;
  start?: number;
  size?: number;
  color?: string;
  top?: number;
  left?: number;
  width?: number;
  weight?: number;
  align?: 'left' | 'center';
  lineHeight?: number;
}> = ({
  text,
  frame,
  start = 8,
  size = 46,
  color = COLORS.textStrong,
  top = 120,
  left = 108,
  width = 900,
  weight = 700,
  align = 'left',
  lineHeight = 1.35,
}) => (
  <div
    data-k="text"
    data-n={typeof text === 'string' ? text : 'heading'}
    style={{
      position: 'absolute',
      left,
      top,
      width,
      fontFamily: FONT,
      fontSize: size,
      fontWeight: weight,
      color,
      lineHeight,
      textAlign: align,
      opacity: fadeIn(frame, start, 16),
      transform: `translateY(${slideUp(frame, start, 22, 16)}px)`,
    }}
  >
    {text}
  </div>
);

export const Caption: React.FC<{
  text: string | React.ReactNode;
  frame: number;
  start: number;
  size?: number;
  color?: string;
  top?: number;
  left?: number;
  width?: number;
  align?: 'left' | 'center' | 'right';
  weight?: number;
  lineHeight?: number;
}> = ({
  text,
  frame,
  start,
  size = 32,
  color = COLORS.textMuted,
  top,
  left = 108,
  width = 900,
  align = 'left',
  weight = 400,
  lineHeight = 1.45,
}) => (
  <div
    data-k="text"
    data-n={typeof text === 'string' ? text : 'caption'}
    style={{
      position: 'absolute',
      left,
      top,
      width,
      fontFamily: FONT,
      fontSize: size,
      fontWeight: weight,
      color,
      lineHeight,
      textAlign: align,
      opacity: fadeIn(frame, start, 16),
      transform: `translateY(${slideUp(frame, start, 18, 16)}px)`,
    }}
  >
    {text}
  </div>
);

/** Staggered lines of on-screen copy. ~0.7 s reading time per line. */
export const Lines: React.FC<{
  items: (string | React.ReactNode)[];
  frame: number;
  start?: number;
  step?: number;
  size?: number;
  color?: string;
  top?: number;
  left?: number;
  width?: number;
  gap?: number;
  align?: 'left' | 'center';
  bullet?: boolean;
  bulletColor?: string;
}> = ({
  items,
  frame,
  start = 20,
  step = 11,
  size = 31,
  color = COLORS.textMuted,
  top,
  left = 108,
  width = 860,
  gap = 24,
  align = 'left',
  bullet = false,
  bulletColor = COLORS.primary,
}) => (
  <div
    data-k="text"
    data-n={`lines ${items.length}`}
    style={{ position: 'absolute', left, top, width, fontFamily: FONT, textAlign: align }}
  >
    {items.map((it, i) => {
      const s = start + i * step;
      return (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            gap: 14,
            marginBottom: gap,
            opacity: fadeIn(frame, s, 12),
            transform: `translateY(${slideUp(frame, s, 16, 12)}px)`,
          }}
        >
          {bullet ? (
            <span
              style={{
                display: 'inline-block',
                width: 9,
                height: 9,
                borderRadius: 9,
                marginTop: size * 0.5,
                background: bulletColor,
                flex: '0 0 auto',
              }}
            />
          ) : null}
          <span style={{ fontSize: size, color, lineHeight: 1.45 }}>{it}</span>
        </div>
      );
    })}
  </div>
);

/** Emphasised inline span. */
export const Hi: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = COLORS.accent,
}) => <span style={{ color, fontWeight: 700 }}>{children}</span>;

/** A right-pointing connector arrow. */
export const Arrow: React.FC<{
  length?: number;
  opacity?: number;
  color?: string;
  dashed?: boolean;
  thickness?: number;
  label?: string;
  labelColor?: string;
}> = ({
  length = 74,
  opacity = 1,
  color = COLORS.textMuted,
  dashed = false,
  thickness = 3,
  label,
  labelColor,
}) => (
  <div
    data-k="connector"
    data-n={label ?? 'arrow'}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity,
      flex: '0 0 auto',
    }}
  >
    <svg width={length} height={22} viewBox={`0 0 ${length} 22`}>
      <line
        x1={2}
        y1={11}
        x2={length - 13}
        y2={11}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={dashed ? '9 8' : undefined}
      />
      <polygon
        points={`${length - 1},11 ${length - 16},4 ${length - 16},18`}
        fill={color}
      />
    </svg>
    {label ? (
      <div
        style={{
          fontFamily: FONT,
          fontSize: 21,
          color: labelColor ?? color,
          marginTop: 2,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);

/** A system block: rounded box with a title and optional subscript line. */
export const Block: React.FC<{
  label: string;
  sub?: string;
  opacity?: number;
  color?: string;
  w?: number;
  h?: number;
  dashed?: boolean;
  filled?: boolean;
  labelSize?: number;
  glow?: boolean;
}> = ({
  label,
  sub,
  opacity = 1,
  color = COLORS.primary,
  w = 230,
  h = 122,
  dashed = false,
  filled = true,
  labelSize = 34,
  glow = false,
}) => (
  <div
    data-k="shape"
    data-n={label}
    style={{
      width: w,
      height: h,
      borderRadius: 16,
      border: `${dashed ? 2.5 : 3}px ${dashed ? 'dashed' : 'solid'} ${alpha(color, 0.85)}`,
      background: filled ? alpha(color, 0.1) : 'transparent',
      boxShadow: glow ? `0 0 34px ${alpha(color, 0.35)}` : undefined,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      opacity,
      flex: '0 0 auto',
      padding: '0 12px',
    }}
  >
    <div
      style={{
        fontFamily: FONT,
        fontSize: labelSize,
        fontWeight: 700,
        color,
        textAlign: 'center',
        lineHeight: 1.15,
      }}
    >
      {label}
    </div>
    {sub ? (
      <div
        style={{
          fontFamily: FONT,
          fontSize: 21,
          color: COLORS.textMuted,
          textAlign: 'center',
        }}
      >
        {sub}
      </div>
    ) : null}
  </div>
);

/** Verdict row: green tick or red cross plus a label. */
export const Verdict: React.FC<{
  ok: boolean;
  label: string;
  note?: string;
  opacity?: number;
  good?: string;
  bad?: string;
}> = ({ ok, label, note, opacity = 1, good = COLORS.result, bad = COLORS.warn }) => {
  const c = ok ? good : bad;
  return (
    <div
      data-k="label"
      data-n={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        opacity,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 34,
          border: `2.5px solid ${c}`,
          background: alpha(c, 0.15),
          color: c,
          fontSize: 22,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '0 0 auto',
        }}
      >
        {ok ? '\u2713' : '\u2715'}
      </div>
      <div style={{ fontSize: 29, color: COLORS.textStrong, fontWeight: 600 }}>{label}</div>
      {note ? (
        <div style={{ fontSize: 23, color: COLORS.textMuted, marginLeft: 4 }}>{note}</div>
      ) : null}
    </div>
  );
};

/** Small rounded chip. */
export const Chip: React.FC<{
  text: string;
  opacity?: number;
  color?: string;
  size?: number;
}> = ({ text, opacity = 1, color = COLORS.textMuted, size = 24 }) => (
  <div
    data-k="label"
    data-n={text}
    style={{
      padding: '9px 18px',
      borderRadius: 999,
      border: `1.5px solid ${alpha(color, 0.4)}`,
      background: alpha(color, 0.09),
      color,
      fontFamily: FONT,
      fontSize: size,
      fontWeight: 600,
      opacity,
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </div>
);

/** Faint horizontal rule. */
export const Rule: React.FC<{ w?: number; opacity?: number; color?: string }> = ({
  w = 820,
  opacity = 0.5,
  color = COLORS.textMuted,
}) => (
  <div
    data-k="decor"
    data-n="rule"
    style={{
      width: w,
      height: 1,
      background: `linear-gradient(90deg, transparent, ${alpha(color, 0.7)}, transparent)`,
      opacity,
    }}
  />
);

/** Vertically stacked flex row helper for block diagrams. */
export const Flow: React.FC<{
  children: React.ReactNode;
  top?: number;
  left?: number;
  gap?: number;
  align?: 'center' | 'flex-start';
}> = ({ children, top, left = 0, gap = 18, align = 'center' }) => (
  <div
    style={{
      position: top === undefined ? 'relative' : 'absolute',
      top,
      left,
      display: 'flex',
      alignItems: align,
      gap,
    }}
  >
    {children}
  </div>
);
