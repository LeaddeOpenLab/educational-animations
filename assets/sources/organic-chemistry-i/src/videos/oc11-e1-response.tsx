import React from 'react';
import { LessonFrame } from '../components/LessonFrame';
import { Atom, Bond, Molecule, ElectronArrow, ReactionArrow, Newman, Chair, Orbitals, Stereo, EnergyCurve } from '../components/Chemistry';
import { COLORS, alpha, ramp } from '../theme';

const T = { profile:[[110,500],[255,160],[440,345],[640,255],[880,490]] as [number,number][] };
const DESIGN_AUDIT = {
  visualArgument: "E1 loses a leaving group before beta deprotonation creates an alkene.",
  motion: "Ionize to carbocation, select beta hydrogen, use C\u2013H electrons to create C=C.",
  example: "tert-Butyl bromide to 2-methylpropene",
  antiTemplate: "Separate cation stage distinguishes E1 from E2 concerted elimination.",
  sceneRationale: "5 scenes are needed to establish tert-Butyl bromide to 2-methylpropene, expose the successive mechanism states, and finish with the specific diagnostic contrast: Separate cation stage distinguishes E1 from E2 concerted elimination.",
};

const Visual:React.FC<{phase:number;frame:number}>=({phase,frame})=>{
  const p=ramp(frame,12,28);
  const q=ramp(frame,35,80);

  if(phase===4)return <g><EnergyCurve points={T.profile} progress={p} label="leaving-group loss precedes β deprotonation"/><text x={500} y={75} fill={COLORS.result} textAnchor="middle" fontSize={32}>rate = k[substrate]</text></g>;
  const leave=phase===0?0:phase===1?q:1,pi=phase<2?0:phase===2?q:1;
  return <g opacity={p}>
    <Molecule atoms={[{x:520,y:310,label:'C',charge:phase===1&&leave>.8||phase===2&&pi<.8?'＋':undefined},{x:340,y:400,label:pi>.85?'CH₂':'CH₂'},{x:680,y:205,label:'CH₃'},{x:690,y:430,label:'CH₃'}]} bonds={[{a:0,b:1},{a:0,b:2},{a:0,b:3}]}/>
    <Bond a={[512,338]} b={[375,407]} progress={pi} color={COLORS.result}/>
    <Bond a={[520,275]} b={[520,155]} progress={1-leave}/><Atom x={520} y={110-55*leave} label="Br" charge={leave>.9?'−':undefined}/>
    <Bond a={[310,400]} b={[220,400]} progress={1-pi}/><Atom x={185-40*pi} y={400+95*pi} label="H" color={COLORS.accent} opacity={1-pi}/><Atom x={125} y={585} label={pi>.9?'H₃O':'H₂O'} charge={pi>.9?'＋':undefined} color={COLORS.result}/>
    {phase===1&&<ElectronArrow from={[540,205]} to={[550,80]} bend={80} progress={q}/>}
    {phase===2&&<><ElectronArrow from={[145,558]} to={[185,422]} bend={-60} progress={q}/><ElectronArrow from={[265,380]} to={[415,338]} bend={-80} progress={q}/></>}
    <text x={620} y={615} fill={COLORS.accent} textAnchor="middle" fontSize={29}>{phase===0?'β C–H next to α C–Br':phase===1?'the cation forms first':phase===2?'C–H electrons make the π bond':'2-methylpropene'}</text>
  </g>;

};

const Scene0:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"E1 Reaction"} heading={"Find \u03b1 and \u03b2 carbons"} lines={["The leaving group sits on \u03b1.", "An adjacent \u03b2 carbon has a hydrogen."]} takeaway={"An adjacent \u03b2 carbon has a hydrogen."} frame={frame} step={1} steps={5}><Visual phase={0} frame={frame}/></LessonFrame>;

const Scene1:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"E1 Reaction"} heading={"Lose the leaving group first"} lines={["The C\u2013Br pair moves to Br.", "A carbocation intermediate remains."]} takeaway={"A carbocation intermediate remains."} frame={frame} step={2} steps={5}><Visual phase={1} frame={frame}/></LessonFrame>;

const Scene2:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"E1 Reaction"} heading={"Remove a \u03b2 proton"} lines={["A weak base accepts the proton.", "The C\u2013H pair becomes a \u03c0 bond."]} takeaway={"The C\u2013H pair becomes a \u03c0 bond."} frame={frame} step={3} steps={5}><Visual phase={2} frame={frame}/></LessonFrame>;

const Scene3:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"E1 Reaction"} heading={"Build the double bond"} lines={["The product is 2-methylpropene.", "The \u03b1\u2013\u03b2 single bond gains a \u03c0 bond."]} takeaway={"The \u03b1\u2013\u03b2 single bond gains a \u03c0 bond."} frame={frame} step={4} steps={5}><Visual phase={3} frame={frame}/></LessonFrame>;

const Scene4:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"E1 Reaction"} heading={"Two steps, one intermediate"} lines={["rate = k[substrate].", "Substitution can compete."]} takeaway={"E1 loses a leaving group before beta deprotonation creates an alkene."} frame={frame} step={5} steps={5}><Visual phase={4} frame={frame}/></LessonFrame>;

export const SCENES = [
  { id: 'start', Comp: Scene0, dur: 160 },
  { id: 'leave', Comp: Scene1, dur: 195 },
  { id: 'remove', Comp: Scene2, dur: 200 },
  { id: 'alkene', Comp: Scene3, dur: 175 },
  { id: 'contrast', Comp: Scene4, dur: 170 },
];
