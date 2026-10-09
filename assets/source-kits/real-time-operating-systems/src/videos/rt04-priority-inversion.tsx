import React from 'react';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import { Backdrop } from '../components/Backdrop';
import { Kicker, Heading, Lines, Chip } from '../components/ui';
import { Lanes } from '../components/Rtos';
import type { SceneDef } from '../Video';
const T = {
    name: "Priority Inversion",
    course: "real time operating systems",
    scene: (n: number) => String(n).padStart(2, '0'),
    setup: ["A high-priority task can wait behind a low-priority lock owner.", "A medium-priority task can then extend that wait."],
    mechanism: ["Low locks the resource and is preempted.", "High wakes, requests the lock, and blocks.", "Medium runs because it outranks Low, indirectly delaying High."],
    example: ["Priority inheritance temporarily raises the lock owner.", "Low finishes the critical section, releases, and High runs."],
    failure: ["The scheduler appears to violate priority even though every local choice is legal.", "Unbounded inversion breaks response-time analysis."],
    closing: ["The dependency travels through the mutex.", "Inheritance lends urgency to the task that can remove the block."],
};
const DESIGN_AUDIT = {
    visualArgument: "Three priority lanes expose an indirect delay chain through one lock owner.",
    motion: "The low-priority interval changes color when it inherits the blocked task's urgency.",
    example: "A medium task is prevented from stretching the high task's wait.",
    antiTemplate: "Unlike a basic mutex, this lesson requires three tasks and a temporary priority boost.",
    sceneRationale: "Six scenes identify low and high priorities, introduce the medium task, show blocking, propagate inherited priority, resume the high task and distinguish inversion from ordinary preemption.",
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
    <div data-k="figure" data-n="priority inversion 0"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={12}
switches={[2, 4, 8]}
progress={ramp(frame, 20, 90)}
lanes={[{ label: "HIGH", color: COLORS.warn, spans: [{ start: 2, end: 4, kind: "idle", label: "wait" }, { start: 9, end: 12, label: "run" }] }, { label: "MEDIUM", color: COLORS.accent, spans: [{ start: 4, end: 8, label: "unrelated" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 2, label: "lock" }, { start: 8, end: 9, label: "inherit + release" }] }]}/></div>
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
    <div data-k="figure" data-n="priority inversion 1"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={12}
switches={[2, 4, 8]}
progress={ramp(frame, 20, 90)}
lanes={[{ label: "HIGH", color: COLORS.warn, spans: [{ start: 2, end: 4, kind: "idle", label: "wait" }, { start: 9, end: 12, label: "run" }] }, { label: "MEDIUM", color: COLORS.accent, spans: [{ start: 4, end: 8, label: "unrelated" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 2, label: "lock" }, { start: 8, end: 9, label: "inherit + release" }] }]}/></div>
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
    <div data-k="figure" data-n="priority inversion 2"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={12}
switches={[2, 4, 8]}
progress={ramp(frame, 20, 90)}
lanes={[{ label: "HIGH", color: COLORS.warn, spans: [{ start: 2, end: 4, kind: "idle", label: "wait" }, { start: 9, end: 12, label: "run" }] }, { label: "MEDIUM", color: COLORS.accent, spans: [{ start: 4, end: 8, label: "unrelated" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 2, label: "lock" }, { start: 8, end: 9, label: "inherit + release" }] }]}/></div>
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
    <div data-k="figure" data-n="priority inversion 3"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={12}
switches={[2, 4, 8]}
progress={ramp(frame, 20, 90)}
lanes={[{ label: "HIGH", color: COLORS.warn, spans: [{ start: 2, end: 4, kind: "idle", label: "wait" }, { start: 9, end: 12, label: "run" }] }, { label: "MEDIUM", color: COLORS.accent, spans: [{ start: 4, end: 5, label: "unrelated" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 2, label: "lock" }, { start: 5, end: 9, label: "inherit + release" }] }]}/></div>
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
    <div data-k="figure" data-n="priority inversion 4"
style={{ position: 'absolute', left: 870, top: 210 }}><Lanes
width={960}
height={560}
tMax={12}
switches={[2, 4, 8]}
progress={ramp(frame, 20, 90)}
lanes={[{ label: "HIGH", color: COLORS.warn, spans: [{ start: 2, end: 4, kind: "idle", label: "wait" }, { start: 9, end: 12, label: "run" }] }, { label: "MEDIUM", color: COLORS.accent, spans: [{ start: 4, end: 5, label: "unrelated" }] }, { label: "LOW", color: COLORS.primary, spans: [{ start: 0, end: 2, label: "lock" }, { start: 5, end: 9, label: "inherit + release" }] }]}/></div>
  </>);
export const SCENES: SceneDef[] = [
    { id: 'title', Comp: S1, dur: 165 },
    { id: 'mechanism', Comp: S2, dur: 175 },
    { id: 'example', Comp: S3, dur: 190 },
    { id: 'failure', Comp: S4, dur: 180 },
    { id: 'closing', Comp: S5, dur: 190 },
];
