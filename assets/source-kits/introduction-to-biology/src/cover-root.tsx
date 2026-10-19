import React from 'react';
import { AbsoluteFill, Composition, registerRoot } from 'remotion';
import { Cover } from './components/Cover';
import { BiologyCoverFigures } from './components/BiologyCoverFigures';

/**
 * Cover-only entry point. Lets covers render while the video registry still
 * references not-yet-written L3 files (a partially produced batch).
 *   remotion still cover out/<slug>.jpg --props='{"name":"..."}' src/index.cover.ts
 */
const FigureAudit: React.FC<{figure:string}> = ({figure}) => {
  const Figure=BiologyCoverFigures[figure];
  return <AbsoluteFill style={{backgroundColor:'#000'}}>{Figure?<div style={{position:'absolute',left:180,top:140}}><Figure/></div>:null}</AbsoluteFill>;
};
const CoverRoot: React.FC = () => (<>
  <Composition
    id="cover"
    component={Cover}
    durationInFrames={1}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ name: 'Decision Boundary', brand: 'wordmark' as const }}
  />
  <Composition id="figure-audit" component={FigureAudit} durationInFrames={1} fps={30} width={1000} height={900} defaultProps={{figure:'bi01-protein-structure'}}/>
</>
);

registerRoot(CoverRoot);
