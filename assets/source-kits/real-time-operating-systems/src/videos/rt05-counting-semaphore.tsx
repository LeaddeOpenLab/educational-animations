import React from 'react';
import {COLORS,FONT} from '../theme';
import {stateAt} from './rt05-counting-semaphore.state';
import {SemaphoreBoard} from '../components/Semaphore';
import {Backdrop} from '../components/Backdrop';
import {Kicker,Heading,Caption,Chip} from '../components/ui';
import type {SceneDef} from '../Video';

const T = {stateAt, totalFrames:900};
const DESIGN_AUDIT = {
visualArgument: "The waiting task moves into the running set without count becoming negative; count never exceeds three.",
motion: "A and B take permits, C blocks at zero; A gives and C receives the permit directly; later gives refill count and stop at limit.",
example: "A counting semaphore starts at two with limit three; tasks A, B and C request permits.",
antiTemplate: "A semaphore has no mutex ownership; a give to a waiter need not increase stored count. The actual object state and quantitative example determine this graphic rather than a shared lesson factory.",
sceneRationale: "Six scenes distinguish available permits, two successful takes, blocked take, direct waiter handoff, capped refilling and the ownership distinction; these are six distinct discrete operations.",
};
export const Mechanism=({f}:{f:number})=>{const st=T.stateAt(f);return (<SemaphoreBoard {...st}/>);};
const BEATS = ["Two Permits Available", "A and B Take Permits", "C Waits at Zero", "Give Hands a Permit to C", "Refill Up to the Limit", "Permits Count Events or Resources"];
const Scene1:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Counting Semaphore · 1 / 6" frame={frame} color={COLORS.accent}/>
<Heading text="Two Permits Available" frame={frame} size={48} width={650}/>
<Caption text="Stored count represents available permits, up to a limit." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+0}/></div>
</div>
);
const Scene2:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Counting Semaphore · 2 / 6" frame={frame} color={COLORS.accent}/>
<Heading text="A and B Take Permits" frame={frame} size={48} width={650}/>
<Caption text="Each successful take removes one stored permit." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+120}/></div>
</div>
);
const Scene3:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Counting Semaphore · 3 / 6" frame={frame} color={COLORS.accent}/>
<Heading text="C Waits at Zero" frame={frame} size={48} width={650}/>
<Caption text="With no stored permit, the next task must wait." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+270}/></div>
</div>
);
const Scene4:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Counting Semaphore · 4 / 6" frame={frame} color={COLORS.accent}/>
<Heading text="Give Hands a Permit to C" frame={frame} size={48} width={650}/>
<Caption text="A give wakes C and hands off a permit directly." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+450}/></div>
</div>
);
const Scene5:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Counting Semaphore · 5 / 6" frame={frame} color={COLORS.accent}/>
<Heading text="Refill Up to the Limit" frame={frame} size={48} width={650}/>
<Caption text="With no waiter, give increments the count up to three." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+630}/></div>
</div>
);
const Scene6:React.FC<{frame:number}> = ({frame}) => (
<div data-root style={{position:"absolute",inset:0,fontFamily:FONT}}>
<Backdrop width={1920} height={1080}/>
<Kicker text="Counting Semaphore · 6 / 6" frame={frame} color={COLORS.accent}/>
<Heading text="Permits Count Events or Resources" frame={frame} size={48} width={650}/>
<Caption text="No negative count, no overflow, and no mutex ownership." frame={frame} start={20} top={330} width={630} size={30}/>
<div style={{position:"absolute",left:850,top:210}}><Mechanism f={frame+780}/></div>
<div data-k="label" style={{position:"absolute",left:108,top:860}}><Chip text="Key Result" opacity={Math.min(1,frame/20)}/></div>
</div>
);
export const SCENES:SceneDef[] = [
{id: 'step1', Comp: Scene1, dur: 120},
{id: 'step2', Comp: Scene2, dur: 150},
{id: 'step3', Comp: Scene3, dur: 180},
{id: 'step4', Comp: Scene4, dur: 180},
{id: 'step5', Comp: Scene5, dur: 150},
{id: 'step6', Comp: Scene6, dur: 120},
];
