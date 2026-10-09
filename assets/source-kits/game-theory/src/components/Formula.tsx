import React from 'react';
import { COLORS, scaleSvg } from '../theme';

/**
 * Renders a MathJax SVG prerendered by scripts/render-mathjax.cjs.
 * The outer element sets an explicit colour: MathJax glyphs use currentColor.
 */
export const Formula: React.FC<{
  svg: string;
  pxPerEx?: number;
  opacity?: number;
  align?: 'center' | 'left';
  width?: number | string;
  marginTop?: number;
  color?: string;
}> = ({
  svg,
  pxPerEx = 30,
  opacity = 1,
  align = 'center',
  width = '100%',
  marginTop = 0,
  color = COLORS.textStrong,
}) => (
  <div
    style={{
      color,
      opacity,
      width,
      marginTop,
      display: 'flex',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
    }}
  >
    <div dangerouslySetInnerHTML={{ __html: scaleSvg(svg, pxPerEx) }} />
  </div>
);
