import React from 'react';
import {AbsoluteFill,Composition,registerRoot} from 'remotion';
import {Cover,COVER_FIGURES} from './components/Cover';
const Audit=({figure}:{figure:string})=>{const F=COVER_FIGURES[figure];return <AbsoluteFill style={{backgroundColor:'#000000'}}><div style={{position:'absolute',left:180,top:140,width:640,height:620,overflow:'visible'}}>{F?<F/>:null}</div></AbsoluteFill>;};
const CoverRoot=()=> <><Composition id="cover" component={Cover} durationInFrames={1} fps={30} width={1920} height={1080} defaultProps={{name:'Neuroscience',brand:'icon' as const}}/><Composition id="audit" component={Audit} durationInFrames={1} fps={30} width={1000} height={900} defaultProps={{figure:'none'}}/></>;
registerRoot(CoverRoot);
