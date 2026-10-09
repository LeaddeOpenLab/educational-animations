import React from 'react';
import {Axes} from '../components/Plot';
import {QuantizedAxis,quantize} from '../components/EdgeAI';
export const quantizationConstants={values:[-.26,.14,.87],scale:.1,zeroPoint:-3,overflow:14};
export const quantizationState=(frame:number)=>{
 const clipping=frame>=90;
 const values=clipping?[quantizationConstants.overflow]:quantizationConstants.values;
 const start=clipping?90:30;
 const mix=Math.max(0,Math.min(1,(frame-start)/30));
 const entries=values.map(v=>quantize(v,quantizationConstants.scale,quantizationConstants.zeroPoint));
 return {clipping,values,entries,mix,positions:entries.map(q=>q.value+(q.reconstructed-q.value)*mix)};
};
export const QuantizationCore:React.FC<{frame:number}>=({frame})=>{const m=quantizationState(frame);return <Axes width={920} height={440} xDomain={m.clipping?[12.5,14.5]:[-.5,1.1]} yDomain={[-1,2]}>{s=><QuantizedAxis s={s} values={m.values} scale={quantizationConstants.scale} zeroPoint={quantizationConstants.zeroPoint} mix={m.mix} y={0}/>}</Axes>;};
