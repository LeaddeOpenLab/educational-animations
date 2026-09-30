import React from 'react';
import { BACKDROP, COLORS, alpha } from '../theme';

/**
 * Themed backdrop. Every knob comes from the course theme pack:
 * gradient stops from bg0/bg1/bg2, grid density/opacity, glow tint/size.
 * Only the geometry is hardcoded.
 */
export const Backdrop: React.FC<{ width: number; height: number; tint?: string }> = ({
  width,
  height,
  tint = COLORS.primary,
}) => (
  <div
    data-k="bg"
    data-n="backdrop"
    style={{
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(120% 90% at 50% 12%, ${COLORS.bg2} 0%, ${COLORS.bg1} 45%, ${COLORS.bg0} 100%)`,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: BACKDROP.gridOpacity,
        backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: `${BACKDROP.gridSize}px ${BACKDROP.gridSize}px`,
        maskImage: `radial-gradient(80% 70% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)`,
        WebkitMaskImage: `radial-gradient(80% 70% at 50% 45%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '-18%',
        width: width * 0.9,
        height: height * 0.6,
        transform: 'translateX(-50%)',
        background: `radial-gradient(50% 50% at 50% 50%, ${alpha(
          tint,
          BACKDROP.glowOpacity
        )} 0%, transparent 70%)`,
        filter: `blur(${BACKDROP.glowBlur}px)`,
      }}
    />
  </div>
);
