import React from 'react';
import {AbsoluteFill,Composition,registerRoot} from 'remotion';
import {Cover,COVER_FIGURES} from './components/Cover';
const Audit:React.FC<{figure:string}>=({figure})=>{const F=COVER_FIGURES[figure];return <AbsoluteFill style={{background:'#000'}}><div style={{position:'absolute',left:180,top:140,width:640,height:620}}><F/></div></AbsoluteFill>;};
const Root=()=> <><Composition id="cover" component={Cover} durationInFrames={1} fps={30} width={1920} height={1080} defaultProps={{name:'',figure:'none',brand:'icon' as const}}/><Composition id="audit" component={Audit} durationInFrames={1} fps={30} width={1000} height={900} defaultProps={{figure:'resonance-structure'}}/></>;
registerRoot(Root);
