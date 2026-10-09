import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {COVER_FIGURES} from './components/Cover';

// No clipping: a figure escaping the prescribed frame must remain detectable.
const FigureAudit: React.FC<{figure: string}> = ({figure}) => {
  const Figure = COVER_FIGURES[figure];
  if (!Figure) throw new Error(`No cover figure registered for ${figure}`);
  return <div style={{width:1000,height:900,backgroundColor:'#000000',position:'relative'}}>
    <div style={{position:'absolute',left:180,top:140,width:640,height:620,overflow:'visible'}}>
      <Figure />
    </div>
  </div>;
};
registerRoot(() => <Composition id="cover-audit" component={FigureAudit}
  durationInFrames={1} fps={30} width={1000} height={900}
  defaultProps={{figure:''}} />);
