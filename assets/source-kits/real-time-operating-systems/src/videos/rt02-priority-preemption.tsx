import React from 'react';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import { Backdrop } from '../components/Backdrop';
import { Kicker, Heading, Lines, Chip } from '../components/ui';
import { Lanes } from '../components/Rtos';
import type { SceneDef } from '../Video';
const T = {
    name: "Priority Preemption",
    course: "real time operating systems",
    scene: (n: number) => String(n).padStart(2, '0'),
    setup: ["A higher-priority ready task can replace the current task immediately.", "Preemption protects response time, not fairness."],
    mechanism: ["A low-priority task begins running.", "A high-priority release interrupts its execution at the next scheduling point.", "The low-priority task resumes only after the urgent work completes."],
    example: ["A background logger yields the CPU when a motor-control task wakes.", "The motor task finishes its deadline-critical slice first."],
    failure: ["Without preemption, urgent work waits behind unrelated computation.", "Too many high-priority releases can starve background work."],
    closing: ["Priority orders urgency.", "Preemption turns that order into immediate CPU ownership."],
};
const DESIGN_AUDIT = {
    visualArgument: "A scheduling lane is visibly cut by an arriving high-priority interval.",
    motion: "The CPU ownership bar switches lanes at the release marker and later returns.",
    example: "A logger is interrupted by a motor-control task with a short deadline.",
    antiTemplate: "Unlike state transitions, this lesson argues from a shared time axis and response latency.",
    sceneRationale: "Six scenes establish priority, runnable tasks, preemption, a sensor interrupt example, starvation risk and summary; two scheduling situations need a contrast.",
};
const S1: React.FC<{
    frame: number;
}> = ({ frame }) => (<>
    <Backdrop
width={1920}
height={1080}/>
    <Kicker
text={T.course.toUpperCase()}
frame={frame}/>
    <Heading
text={T.name}
frame={frame}
size={56}
top={150}
width={650}/>
    <Lines
frame={frame}
start={24}
top={340}
width={640}
size={29}
items={T.setup}/>
    <div data-k="label" data-n="opening claim"
style={{ position: 'absolute', left: 108, top: 850 }}>
      <Chip
text={DESIGN_AUDIT.visualArgument}
opacity={fadeIn(frame, 70, 14)}
color={COLORS.accent}
size={22}/>
    </div>
    <div data-k="figure" data-n="preemption lanes 0"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={10}
switches={[3, 6]}
progress={ramp(frame, 25, 80)}
lanes={[{ label: "HIGH", color: COLORS.accent, spans: [{ start: 3, end: 6, label: "motor" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 3, label: "logger" }, { start: 6, end: 10, label: "resume" }] }]}/></div>
  </>);
const S2: React.FC<{
    frame: number;
}> = ({ frame }) => (<>
    <Backdrop
width={1920}
height={1080}/>
    <Kicker
text={T.scene(1) + ' · MECHANISM'}
frame={frame}/>
    <Heading
text="Follow the mechanism"
frame={frame}
size={43}
width={650}/>
    <Lines
frame={frame}
start={22}
top={260}
width={640}
size={28}
gap={22}
items={T.mechanism}/>
    <div data-k="label" data-n="mechanism verdict"
style={{ position: 'absolute', left: 108, top: 800 }}>
      <Chip
text={T.mechanism[T.mechanism.length - 1]}
opacity={fadeIn(frame, 95, 14)}
color={COLORS.primary}
size={23}/>
    </div>
    <div data-k="figure" data-n="preemption lanes 1"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={10}
switches={[3, 6]}
progress={ramp(frame, 25, 80)}
lanes={[{ label: "HIGH", color: COLORS.accent, spans: [{ start: 3, end: 6, label: "motor" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 3, label: "logger" }, { start: 6, end: 10, label: "resume" }] }]}/></div>
  </>);
const S3: React.FC<{
    frame: number;
}> = ({ frame }) => (<>
    <Backdrop
width={1920}
height={1080}/>
    <Kicker
text={T.scene(2) + ' · WORKED CASE'}
frame={frame}/>
    <Heading
text="Run one concrete case"
frame={frame}
size={43}
width={650}/>
    <Lines
frame={frame}
start={24}
top={265}
width={640}
size={28}
gap={24}
items={T.example}/>
    <div data-k="label" data-n="example outcome"
style={{ position: 'absolute', left: 108, top: 800 }}>
      <Chip
text={T.example[T.example.length - 1]}
opacity={fadeIn(frame, 90, 14)}
color={COLORS.result}
size={23}/>
    </div>
    <div data-k="figure" data-n="preemption lanes 2"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={10}
switches={[3, 6]}
progress={ramp(frame, 25, 80)}
lanes={[{ label: "HIGH", color: COLORS.accent, spans: [{ start: 3, end: 6, label: "motor" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 3, label: "logger" }, { start: 6, end: 10, label: "resume" }] }]}/></div>
  </>);
const S4: React.FC<{
    frame: number;
}> = ({ frame }) => (<>
    <Backdrop
width={1920}
height={1080}/>
    <Kicker
text={T.scene(3) + ' · FAILURE'}
frame={frame}/>
    <Heading
text="Expose the failure mode"
frame={frame}
size={43}
width={650}/>
    <Lines
frame={frame}
start={22}
top={260}
width={640}
size={28}
gap={24}
items={T.failure}/>
    <div data-k="label" data-n="failure warning"
style={{ position: 'absolute', left: 108, top: 800 }}>
      <Chip
text={T.failure[0]}
opacity={fadeIn(frame, 92, 14)}
color={COLORS.warn}
size={23}/>
    </div>
    <div data-k="figure" data-n="preemption lanes 3"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={10}
switches={[3, 6]}
progress={ramp(frame, 25, 80)}
lanes={[{ label: "HIGH", color: COLORS.accent, spans: [{ start: 3, end: 6, label: "motor" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 3, label: "logger" }, { start: 6, end: 10, label: "resume" }] }]}/></div>
  </>);
const S5: React.FC<{
    frame: number;
}> = ({ frame }) => (<>
    <Backdrop
width={1920}
height={1080}/>
    <Kicker
text={T.scene(4) + ' · TAKEAWAY'}
frame={frame}/>
    <Heading
text="Keep the invariant"
frame={frame}
size={48}
width={720}/>
    <Lines
frame={frame}
start={24}
top={300}
width={700}
size={31}
gap={28}
items={T.closing}/>
    <div data-k="label" data-n="final conclusion"
style={{ position: 'absolute', left: 108, top: 810 }}>
      <Chip
text={T.closing[T.closing.length - 1]}
opacity={fadeIn(frame, 86, 14)}
color={COLORS.result}
size={25}/>
    </div>
    <div data-k="figure" data-n="preemption lanes 4"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={10}
switches={[3, 6]}
progress={ramp(frame, 25, 80)}
lanes={[{ label: "HIGH", color: COLORS.accent, spans: [{ start: 3, end: 6, label: "motor" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 3, label: "logger" }, { start: 6, end: 10, label: "resume" }] }]}/></div>
  </>);
export const SCENES: SceneDef[] = [
    { id: 'title', Comp: S1, dur: 145 },
    { id: 'mechanism', Comp: S2, dur: 190 },
    { id: 'example', Comp: S3, dur: 175 },
    { id: 'failure', Comp: S4, dur: 195 },
    { id: 'closing', Comp: S5, dur: 195 },
];
