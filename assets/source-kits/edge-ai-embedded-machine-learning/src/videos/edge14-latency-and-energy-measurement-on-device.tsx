import React from 'react';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Lines} from '../components/ui';
import {Axes} from '../components/Plot';
import {COLORS,FONT,alpha,fadeIn,ramp} from '../theme';
import {EnergyTimeline} from '../components/EdgeAI';
import {powerState} from '../mechanisms/edge14-state';
const T = {w:950,h:650,microjoulesPerMillijoule:1000};
const DESIGN_AUDIT = {
 visualArgument:'Power rectangles occupy a shared time and power scale; their integrated areas show why a shorter run can use more energy.',
 motion:'Time cursors sweep sampled power intervals; shaded rectangles and numerical totals accumulate from the same count.',
 example:'A:100mW for10ms=1mJ; B:300mW for5ms=1.5mJ. Values are illustrative, not hardware measurements.',
 antiTemplate:'The main quantity is area under a physical power trace, unlike memory byte lengths or classifier probabilities.',
 sceneRationale:'Four scenes set equal measurement boundaries, fill power samples, convert integrated units, and compare both latency and energy.'
};
const PowerView=({frame,local,section}:{frame:number;local:number;section:number})=>{
 const v=powerState(frame);const labels=['Measure the Same Boundaries','Power Adds Up over Time','Integrate the Sampled Area','Faster Can Use More Energy'];
 const copy=[['Time from inference start to finish.','Run A: 10 ms. Run B: 5 ms.'],['A uses 100 mW; B uses 300 mW.','Each 1 ms slice adds power × time.'],['mW × ms = microjoules.','Divide by 1000 to obtain millijoules.'],['B halves latency but uses 50% more energy.','Measure both quantities on the device.']][section];
 return <><Backdrop width={1920} height={1080}/><Kicker text="EDGE AI · LATENCY AND ENERGY" frame={local}/><Heading text={labels[section]} frame={local} width={650} size={51}/><Lines items={[...copy,'Illustrative traces; no device benchmark claim.']} frame={local} top={330} width={610} size={29}/>
 <svg data-k="figure" data-n="power area and elapsed time" width={T.w} height={T.h} viewBox="0 0 950 650" style={{position:'absolute',left:850,top:235,fontFamily:FONT,opacity:fadeIn(local,12,15)}}>
 {section<2?<>
  <text x={52} y={35} fill={COLORS.textStrong} fontSize={30}>Run A · 100 mW</text>
  <g transform="translate(0,40)"><Axes width={940} height={230} xDomain={[0,11]} yDomain={[0,350]} pad={{l:65,r:70,t:50,b:42}} xTicks={[0,5,10]} yTicks={[0,100,300]}>{s=><EnergyTimeline s={s} power={v.powerA} dt={1} count={section===0?0:v.count}/>}</Axes></g>
  <text x={52} y={328} fill={COLORS.textStrong} fontSize={30}>Run B · 300 mW</text>
  <g transform="translate(0,332)"><Axes width={940} height={230} xDomain={[0,11]} yDomain={[0,350]} pad={{l:65,r:70,t:50,b:42}} xTicks={[0,5,10]} yTicks={[0,100,300]}>{s=><EnergyTimeline s={s} power={v.powerB} dt={1} count={section===0?0:Math.min(v.count,5)}/>}</Axes></g>
  {section===2&&<text x={80} y={620} fill={COLORS.accent} fontSize={32}>A: {(v.a.energy/T.microjoulesPerMillijoule).toFixed(2)} mJ · B: {(v.b.energy/T.microjoulesPerMillijoule).toFixed(2)} mJ</text>}
 </>:section===2?<>
  <text x={55} y={50} fill={COLORS.textStrong} fontSize={30}>SUM THE ENERGY SLICES</text>
  {[{name:'A',n:10,p:100,total:v.a.energy},{name:'B',n:5,p:300,total:v.b.energy}].map((run,row)=>{
   const collapse=ramp(local,30,85);const y=125+row*230;
   return <g key={run.name}>
    <text x={55} y={y-15} fill={COLORS.textMuted} fontSize={28}>{run.name}: {run.n} × {run.p} µJ</text>
    {Array.from({length:run.n},(_,i)=><rect key={i} x={55+i*(80-12*collapse)} y={y} width={60+8*collapse} height={52} fill={row===0?COLORS.primary:COLORS.accent}/>)}
    <text x={55} y={y+115} fill={COLORS.textStrong} fontSize={32}>{run.total} µJ ÷ {T.microjoulesPerMillijoule} = {(run.total/T.microjoulesPerMillijoule).toFixed(2)} mJ</text>
   </g>;
  })}
  <text x={55} y={622} fill={COLORS.accent} fontSize={27}>The total comes from power × each time interval.</text>
 </>:<>
  <text x={50} y={55} fill={COLORS.textStrong} fontSize={30}>Latency (ms)</text>
  {[v.latencyA,v.latencyB].map((n,i)=><g key={i}><text x={50} y={145+i*90} fill={COLORS.textMuted} fontSize={30}>{i===0?'A':'B'}</text><rect x={115} y={112+i*90} width={n*60} height={45} fill={i===0?COLORS.primary:COLORS.accent}/><text x={140+n*60} y={146+i*90} fill={COLORS.textStrong} fontSize={30}>{n}</text></g>)}
  <text x={50} y={355} fill={COLORS.textStrong} fontSize={30}>Energy (mJ)</text>
  {[v.a.energy,v.b.energy].map((n,i)=><g key={i}><text x={50} y={445+i*90} fill={COLORS.textMuted} fontSize={30}>{i===0?'A':'B'}</text><rect x={115} y={412+i*90} width={n*.4} height={45} fill={i===0?COLORS.primary:COLORS.accent}/><text x={140+n*.4} y={446+i*90} fill={COLORS.textStrong} fontSize={30}>{(n/T.microjoulesPerMillijoule).toFixed(2)}</text></g>)}
 </>}
 </svg></>;
};
const Bounds=({frame}:{frame:number})=><PowerView frame={frame} local={frame} section={0}/>;
const Sample=({frame}:{frame:number})=><PowerView frame={frame+135} local={frame} section={1}/>;
const Integrate=({frame}:{frame:number})=><PowerView frame={frame+390} local={frame} section={2}/>;
const CompareEnergy=({frame}:{frame:number})=><PowerView frame={frame+660} local={frame} section={3}/>;
export const SCENES=[{id:'bounds',Comp:Bounds,dur:135},{id:'sample',Comp:Sample,dur:255},{id:'integrate',Comp:Integrate,dur:270},{id:'compare',Comp:CompareEnergy,dur:165}];
