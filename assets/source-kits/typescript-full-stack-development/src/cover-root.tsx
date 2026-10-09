import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { Cover } from './components/Cover';

/**
 * Cover-only entry point. Lets covers render while the video registry still
 * references not-yet-written L3 files (a partially produced batch).
 *   remotion still cover out/<slug>.jpg --props='{"name":"..."}' src/index.cover.ts
 */
const CoverRoot: React.FC = () => (
  <Composition
    id="cover"
    component={Cover}
    durationInFrames={1}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ name: 'Decision Boundary', brand: 'wordmark' as const }}
  />
);

registerRoot(CoverRoot);
