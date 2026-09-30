import React from 'react';
import { LessonFrame } from '../components/LessonFrame';
import { Atom, Bond, Molecule, ElectronArrow, ReactionArrow, Newman, Chair, Orbitals, Stereo, EnergyCurve } from '../components/Chemistry';
import { COLORS, alpha, ramp } from '../theme';

const T = { cationPoints:[[120,470],[245,170],[415,365],[610,245],[850,500]] as [number,number][] };
const DESIGN_AUDIT = {
  visualArgument: "SN1 ionization precedes nucleophile attack and its rate depends on substrate concentration.",
  motion: "Break C\u2013Br first, hold a three-coordinate carbocation, attach water, then remove H+.",
  example: "tert-Butyl bromide hydrolysis",
  antiTemplate: "A real intermediate and separated steps distinguish SN1 from concerted SN2.",
  sceneRationale: "6 scenes are needed to establish tert-Butyl bromide hydrolysis, expose the successive mechanism states, and finish with the specific diagnostic contrast: A real intermediate and separated steps distinguish SN1 from concerted SN2.",
};

const Visual:React.FC<{phase:number;frame:number}>=({phase,frame})=>{
  const p=ramp(frame,12,28);
  const q=ramp(frame,35,80);

  if(phase===5)return <g><EnergyCurve points={T.cationPoints} progress={p} label="two stages; a real intermediate"/><text x={500} y={70} textAnchor="middle" fill={COLORS.result} fontSize={34}>rate = k[alkyl halide]</text></g>;
  const leave=phase===0?0:phase===1?q:1;const water=phase<3?0:phase===3?q:1;
  return <g opacity={p}>
    <Molecule atoms={[{x:420,y:335,label:'C',charge:phase===2?'＋':undefined},{x:245,y:245,label:'CH₃'},{x:420,y:520,label:'CH₃'},{x:550,y:215,label:'CH₃'}]} bonds={[{a:0,b:1},{a:0,b:2},{a:0,b:3}]}/>
    {phase<3&&<><Bond a={[460,335]} b={[610,335]} progress={1-leave}/><Atom x={650+160*leave} y={335} label="Br" charge={leave>.9?'−':undefined}/></>}
    {phase===1&&<ElectronArrow from={[545,320]} to={[790,290]} bend={-110} progress={q}/>}
    {phase===2&&<><circle cx={420} cy={335} r={55} stroke={COLORS.accent} strokeWidth={3} fill="none"/><text x={500} y={650} fill={COLORS.accent} textAnchor="middle" fontSize={31}>three-coordinate carbocation</text></>}
    {phase>=3&&<><Bond a={[455,335]} b={[610,335]} progress={water} color={COLORS.result}/><Atom x={820-170*water} y={335} label={phase===4?'OH':'OH₂'} charge={phase===4||water<.8?undefined:'＋'} color={COLORS.result}/>{phase===3&&<ElectronArrow from={[765,370]} to={[477,364]} bend={-110} progress={q}/>}</>}
    {phase===4&&<><Atom x={745+70*q} y={285-90*q} label="H" color={COLORS.accent} opacity={1-q}/><Atom x={810} y={190} label="H₃O" charge="＋" opacity={q}/><text x={500} y={630} textAnchor="middle" fill={COLORS.result} fontSize={30}>tert-butanol + protonated solvent</text></>}
    {phase===0&&<Atom x={810} y={570} label="H₂O" color={COLORS.result}/>}
  </g>;

};

const Scene0:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"SN1 Reaction"} heading={"Begin with a tertiary halide"} lines={["Water is the nucleophile.", "The C\u2013Br bond is polarized."]} takeaway={"The C\u2013Br bond is polarized."} frame={frame} step={1} steps={6}><Visual phase={0} frame={frame}/></LessonFrame>;

const Scene1:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"SN1 Reaction"} heading={"The leaving group departs"} lines={["The bond pair goes to bromide.", "A carbocation intermediate forms."]} takeaway={"A carbocation intermediate forms."} frame={frame} step={2} steps={6}><Visual phase={1} frame={frame}/></LessonFrame>;

const Scene2:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"SN1 Reaction"} heading={"Pause at the carbocation"} lines={["Three bonds surround C\u207a.", "Ionization is the slow step."]} takeaway={"Ionization is the slow step."} frame={frame} step={3} steps={6}><Visual phase={2} frame={frame}/></LessonFrame>;

const Scene3:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"SN1 Reaction"} heading={"Water attacks the cation"} lines={["An oxygen lone pair forms C\u2013O.", "The attached oxygen is protonated."]} takeaway={"The attached oxygen is protonated."} frame={frame} step={4} steps={6}><Visual phase={3} frame={frame}/></LessonFrame>;

const Scene4:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"SN1 Reaction"} heading={"Lose the extra proton"} lines={["Water removes a proton.", "The neutral alcohol remains."]} takeaway={"The neutral alcohol remains."} frame={frame} step={5} steps={6}><Visual phase={4} frame={frame}/></LessonFrame>;

const Scene5:React.FC<{frame:number}>=({frame})=><LessonFrame topic={"SN1 Reaction"} heading={"One substrate in the rate law"} lines={["rate = k[alkyl halide].", "SN1 can compete with E1."]} takeaway={"SN1 ionization precedes nucleophile attack and its rate depends on substrate concentration."} frame={frame} step={6} steps={6}><Visual phase={5} frame={frame}/></LessonFrame>;

export const SCENES = [
  { id: 'substrate', Comp: Scene0, dur: 140 },
  { id: 'ionize', Comp: Scene1, dur: 185 },
  { id: 'intermediate', Comp: Scene2, dur: 160 },
  { id: 'attack', Comp: Scene3, dur: 160 },
  { id: 'deprotonate', Comp: Scene4, dur: 140 },
  { id: 'rate', Comp: Scene5, dur: 115 },
];
