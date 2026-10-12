import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Backdrop } from './Backdrop';
import { COLORS, FONT, alpha } from '../theme';
import {Axes,Curve,Dot,sampleFn} from './Plot';
import {SlopeMark,AreaShade,FreeBody,Collision,MomentumBars,EnergyLandscape,RigidRotation,RollingBody} from './Mech';

/**
 * Static cover poster for one knowledge point — rendered separately, never
 * grabbed from the finished video.
 *
 *   remotion still cover out/<slug>.jpg --frame=0 --log=error \
 *     --props='{"name":"Decision Boundary","discipline":"Artificial Intelligence",
 *               "course":"Introduction to Machine Learning",
 *               "figure":"ml-scatter-boundary","brand":"icon"}'
 *
 * Layout (locked numbers, do not eyeball them):
 *   left copy block   left 150 / width 1010 / vertically centred / gap 30
 *     eyebrow = Course          27px  700  tracking 5.5  uppercase  accent
 *     knowledge point = Name    800   lineHeight 1.08   tracking -1.4  textStrong
 *                               size by length: ≤18→116 ≤30→96 ≤44→78 else 66
 *     rule                      196x7  radius 7  primary
 *     footnote                  23px  tracking 2.4  uppercase  textDim
 *   figure          right 108 / top 232 / 640x620
 *   brand           bottom-right  right 108 / bottom 44
 *
 * Engineering note: when the registry still references unwritten L3 files the
 * main entry point fails to bundle, so covers render through a dedicated entry
 * (see cover-root.tsx). Keep that entry when you copy this template.
 */

/**
 * Course-level cover figures.
 *
 * A cover must carry the *representative figure of the knowledge point*, never an
 * abstract shape. One figure per course (35 courses ≈ 20 lines each), built from
 * the kit's L2 primitives so the cover and the video share one visual language.
 *
 * Fill this in per course, e.g.:
 *   export const COVER_FIGURES = {
 *     'ml-scatter-boundary': ({}) => (
 *       <Axes width={640} height={620} xDomain={[-2.8, 2.8]} yDomain={[-2.2, 2.2]} pad={{l:6,r:6,t:6,b:6}} showArrows={false}>
 *         {(s) => (<>
 *           <HalfPlane s={s} pts={BOUNDARY} side="above" color={COLORS.accent} opacity={0.12} />
 *           <HalfPlane s={s} pts={BOUNDARY} side="below" color={COLORS.primary} opacity={0.12} />
 *           <Scatter  s={s} pts={A_PTS} color={COLORS.primary} r={17} />
 *           <Scatter  s={s} pts={B_PTS} color={COLORS.accent} r={17} shape="square" />
 *           <Boundary s={s} pts={BOUNDARY} color={COLORS.result} width={7} glow />
 *         </>)}
 *       </Axes>
 *     ),
 *   };
 */
const graph=(kind:'position'|'speed'|'accel'|'work'|'potential'|'landscape')=>()=>{
 const fn=kind==='position'?(x:number)=>2*x-.5*x*x:kind==='speed'?(x:number)=>x<1?4*x:x<2?4:4*(3-x):kind==='accel'?(x:number)=>x<1?1:x<2?0:-1:kind==='work'?(x:number)=>x<=2.3?2+x:-2:kind==='potential'?(x:number)=>2*x:(x:number)=>(x-2)**2;
 const yd: [number,number]=kind==='accel'?[-1.5,1.5]:kind==='work'?[-2.5,5]:kind==='landscape'?[0,4]:[0,6];
 const xd:[number,number]=kind==='landscape'?[0,4]:[0,3];
 return <Axes width={640} height={620} xDomain={xd} yDomain={yd} pad={{l:65,r:45,t:35,b:75}} xLabel={kind==='work'?'x':kind==='potential'||kind==='landscape'?'position':'time'} yLabel={kind==='position'?'x':kind==='speed'?'v':kind==='accel'?'a':kind==='work'?'F':'U'} xTicks={kind==='landscape'?[0,1,2,3,4]:[0,1,2,3]} yTicks={kind==='accel'?[-1,0,1]:kind==='work'?[-2,0,2,4]:[0,2,4,6]}>{scale=><>{kind==='landscape'?<EnergyLandscape s={scale} U={fn} E={1} probeX={2.5} progress={1}/>:<Curve s={scale} pts={sampleFn(fn,xd[0],xd[1],120)} color={COLORS.primary} width={7} progress={1}/ >}{kind==='position'&&<><SlopeMark s={scale} f={fn} df={(x:number)=>2-x} x0={1} run={0.5} progress={1}/><Dot s={scale} x={1} y={fn(1)} r={12}/></>}{(kind==='speed'||kind==='accel'||kind==='work')&&<AreaShade s={scale} pts={sampleFn(fn,0,3,120)} integral={kind==='speed'?(x:number)=>x<1?2*x*x:x<2?2+4*(x-1):6+4*(x-2)-2*(x-2)**2:kind==='accel'?(x:number)=>x<1?x:x<2?1:3-x:(x:number)=>2*Math.min(x,2.3)+.5*Math.min(x,2.3)**2-2*Math.max(0,x-2.3)} progress={1} label={kind==='work'?'work':kind==='accel'?'Δv':'distance'} unit={kind==='work'?'J':kind==='accel'?'m/s':'m'} color={COLORS.accent}/>}</>}</Axes>;
};
const fig=(children:React.ReactNode)=><svg width={640} height={620} viewBox="0 0 640 620">{children}</svg>;
export const COVER_FIGURES: Record<string, React.FC> = {
 'cm01-location-time-graph':graph('position'),
 'cm02-speed-time-graph':graph('speed'),
 'cm03-acceleration-time-graph':graph('accel'),
 'cm04-newtons-laws-of-motion':()=>fig(<g transform="translate(-50 0)"><FreeBody cx={320} cy={315} body="box" size={310} scale={205} forces={[{label:'push',angle:0,mag:6,color:COLORS.primary,magnitude:6},{label:'drag',angle:180,mag:3,color:COLORS.alt,magnitude:3}]} progress={1}/></g>),
 'cm05-free-body-diagram':()=>fig(<FreeBody cx={320} cy={305} body="wedge" size={170} incline={30} scale={180} forces={[{label:'mg',angle:270,mag:20,color:COLORS.warn,magnitude:20},{label:'N',angle:120,mag:17.3,color:COLORS.primary,magnitude:17.3}]} decompose={{index:0,axes:[210,120],color:COLORS.accent}} progress={1}/>),
 'cm06-conservation-of-momentum':()=>fig(<><g transform="translate(95 45) scale(.7)"><Collision y={300} cx={320} left={{r:80,mass:2,v0:3,v1:1,color:COLORS.primary,label:'A'}} right={{r:70,mass:1,v0:-1,v1:3,color:COLORS.alt,label:'B'}} progress={1}/></g><MomentumBars x={150} y={390} w={210} rows={[{label:'A',before:6,after:2,color:COLORS.primary},{label:'B',before:-1,after:3,color:COLORS.alt}]} progress={1}/></>),
 'cm07-collision-process':()=>fig(<g transform="translate(0 -40)"><g transform="translate(95 80) scale(.7)"><Collision y={310} cx={320} left={{r:85,mass:1,v0:3,v1:0,color:COLORS.primary,label:'A'}} right={{r:85,mass:1,v0:0,v1:3,color:COLORS.alt,label:'B'}} progress={.78}/></g><text x={320} y={500} textAnchor="middle" fill={COLORS.result} fontFamily={FONT} fontSize={32}>p conserved · K returns</text></g>),
 'cm08-work-energy-theorem':graph('work'),
 'cm09-potential-energy':graph('potential'),
 'cm10-potential-energy-curve':()=> <div style={{width:640,height:620,transform:'translateX(-48px) scale(.88)',transformOrigin:'center center'}}>{React.createElement(graph('landscape'))}</div>,
 'cm11-rigid-body-rotation':()=>fig(<RigidRotation cx={320} cy={310} r={225} from={0} to={95} omegaLabel="ω" progress={1}/>),
 'cm12-angular-momentum':()=>fig(<RigidRotation cx={320} cy={310} r={225} from={0} to={95} omegaLabel="ω" masses={[{frac:.72,m:1,label:'m'},{frac:.72,m:1,label:'m'}]} progress={1}/>),
 'cm13-no-slip-scrolling':()=>fig(<g transform="translate(25 -52)"><RollingBody x0={125} groundY={490} r={150} physicalRadius={2} angle={1.7} color={COLORS.primary} progress={1} showTrail/></g>),
};

export type CoverProps = {
  name: string;
  discipline?: string;
  course?: string;
  /** 'wordmark' | 'icon' | 'none' */
  brand?: 'wordmark' | 'icon' | 'none';
  /** footnote under the rule; defaults to "discipline · 30 seconds"; '' hides it */
  foot?: string;
  /** key into COVER_FIGURES; 'none' hides it */
  figure?: string;
};

const titleSize = (s: string): number => {
  const n = s.length;
  if (n <= 18) return 116;
  if (n <= 30) return 96;
  if (n <= 44) return 78;
  return 66;
};

export const Cover: React.FC<CoverProps> = ({
  name,
  discipline,
  course,
  brand = 'icon',
  foot,
  figure,
}) => {
  const eyebrow = course ?? discipline ?? '';
  const footnote = foot ?? [discipline, '30 seconds'].filter(Boolean).join('  ·  ');
  const Figure = figure && figure !== 'none' ? COVER_FIGURES[figure] : undefined;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg0 }}>
      <Backdrop width={1920} height={1080} />

      {Figure ? (
        <div style={{ position: 'absolute', right: 108, top: 232, opacity: 0.96 }}>
          <Figure />
        </div>
      ) : null}

      {/* copy plate: keeps long titles legible over the grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, ${alpha(COLORS.bg0, 0.94)} 0%, ${alpha(
            COLORS.bg0,
            0.84
          )} 40%, ${alpha(COLORS.bg0, 0.3)} 62%, transparent 78%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 0,
          height: 1080,
          width: 1010,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              fontFamily: FONT, fontSize: 27, fontWeight: 700, letterSpacing: 5.5,
              textTransform: 'uppercase', color: COLORS.accent, lineHeight: 1.35,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: FONT, fontSize: titleSize(name), fontWeight: 800,
            lineHeight: 1.08, letterSpacing: -1.4, color: COLORS.textStrong,
          }}
        >
          {name}
        </div>

        <div style={{ width: 196, height: 7, borderRadius: 7, background: COLORS.primary, marginTop: 6 }} />

        {footnote ? (
          <div
            style={{
              fontFamily: FONT, fontSize: 23, letterSpacing: 2.4,
              textTransform: 'uppercase', color: COLORS.textDim,
            }}
          >
            {footnote}
          </div>
        ) : null}
      </div>

      {brand !== 'none' ? (
        <div style={{ position: 'absolute', right: 108, bottom: 44, display: 'flex', justifyContent: 'flex-end' }}>
          {brand === 'wordmark' ? (
            <Img src={staticFile('leadde-logo.png')} style={{ width: 226, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          ) : (
            <Img src={staticFile('leadde-icon.svg')} style={{ width: 56, height: 56, opacity: 0.95 }} />
          )}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
