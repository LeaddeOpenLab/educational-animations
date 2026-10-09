import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {COVER_FIGURES} from './components/Cover';
const FigureAudit:React.FC<{figure:string}>=({figure})=>{
 const Figure=COVER_FIGURES[figure];
 return <div style={{width:1000,height:900,background:'#000',position:'relative'}}><div style={{position:'absolute',left:180,top:140,width:640,height:620}}>{Figure?<Figure/>:null}</div></div>;
};
registerRoot(()=><Composition id="cover-audit" component={FigureAudit} durationInFrames={1} fps={30} width={1000} height={900} defaultProps={{figure:'union-type-narrowing-with-discriminants'}}/>);
