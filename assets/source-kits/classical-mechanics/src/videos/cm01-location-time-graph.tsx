import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Axes,Curve,Dot,sampleFn} from '../components/Plot';
import {SlopeMark} from '../components/Mech';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import {COLORS,FONT} from '../theme';
import {stateAt} from './cm01-location-time-graph.state';

const T = {
  fps: 30,
  x: (t:number) => 2*t-0.5*t*t,
  v: (t:number) => 2-t,
  localToModel: (start:number,frame:number) => {
    const global=start+frame;
    return Math.min(90,Math.round(global<=450 ? global*60/450 : 60+(global-450)*30/450));
  },
};
const DESIGN_AUDIT = {
  visualArgument: 'A moving walker and a position trace share one time state so graph height cannot be mistaken for speed.',
  motion: 'The probe moves through rising, flat and falling tangent states while the walker reverses.',
  example: 'At t=2 s the tangent is flat even though position is positive.',
  antiTemplate: 'This uses a tangent rise/run triangle and signed motion, unlike the speed graph which accumulates nonnegative area.',
  sceneRationale: 'Five scenes separately establish linked motion, positive slope, zero slope, negative slope and the comparison.',
};

const Diagram:React.FC<{global:number;showTangent?:boolean}> = ({global,showTangent=true}) => {
  const s=stateAt(T.localToModel(0,global));
  return <>
    <div data-k="figure" data-n="position graph" style={{position:'absolute',left:860,top:250,width:960,height:580}}>
      <Axes width={960} height={580} xDomain={[0,3]} yDomain={[0,2.3]} xLabel="time (s)" yLabel="position (m)" xTicks={[0,1,2,3]} yTicks={[0,1,2]}>
        {(scale)=><>
          <Curve s={scale} pts={sampleFn(T.x,0,3,90)} color={COLORS.primary} width={7}/>
          <Dot s={scale} x={s.t} y={s.x} r={13} color={COLORS.accent}/>
          {showTangent&&<SlopeMark s={scale} f={T.x} df={T.v} x0={Math.min(2.8,s.t)} run={s.t>2.4?-0.35:0.35} label="v" color={COLORS.result}/>}
        </>}
      </Axes>
    </div>
    <svg viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
      <line x1={890} y1={910} x2={1770} y2={910} stroke={COLORS.axis} strokeWidth={4}/>
      <circle cx={980+230*s.x} cy={875} r={31} fill={COLORS.primary}/>
      <text x={1200} y={990} fill={COLORS.textStrong} fontFamily={FONT} fontSize={31}>walker v = {s.v.toFixed(2)} m/s</text>
    </svg>
  </>;
};
const Frame:React.FC<{frame:number;start:number;label:string;heading:string;copy:string;chip:string;tangent?:boolean}> = ({frame,start,label,heading,copy,chip,tangent}) => <>
  <Backdrop width={1920} height={1080}/>
  <Kicker text={label} frame={frame}/>
  <Heading text={heading} frame={frame} width={640}/>
  <Caption text={copy} frame={frame} start={14} top={315} width={625}/>
  <Diagram global={start+frame} showTangent={tangent}/>
  <div style={{position:'absolute',left:108,top:840}}><Chip text={chip} color={COLORS.result}/></div>
</>;
const Setup=({frame}:{frame:number})=><Frame frame={frame} start={0} label="01 · Motion" heading="Position over time" copy="The walker and the point on the graph move together." chip="Track position x(t)" tangent={false}/>;
const Rising=({frame}:{frame:number})=><Frame frame={frame} start={150} label="02 · Rising" heading="A rising graph" copy="The tangent's rise divided by run gives a positive velocity." chip="v = dx/dt > 0"/>;
const Turning=({frame}:{frame:number})=><Frame frame={frame} start={360} label="03 · Turning" heading="Flat at the instant of rest" copy="The graph is still high, but the tangent turns horizontal as the walker stops." chip="v = 0 at the peak"/>;
const Falling=({frame}:{frame:number})=><Frame frame={frame} start={570} label="04 · Return" heading="Falling means moving left" copy="The walker reverses; the tangent slope and velocity become negative." chip="v < 0"/>;
const Close=({frame}:{frame:number})=><Frame frame={frame} start={780} label="05 · Read the graph" heading="Slope gives direction" copy="Positive, zero, and negative tangent slopes map to right, still, and left." chip="Read slope, not height"/>;
export const SCENES=[
  {id:'setup',Comp:Setup,dur:150},
  {id:'positive-slope',Comp:Rising,dur:210},
  {id:'turn-and-stop',Comp:Turning,dur:210},
  {id:'negative-slope',Comp:Falling,dur:210},
  {id:'close',Comp:Close,dur:120},
];
