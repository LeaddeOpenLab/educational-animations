import React from 'react';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import { Backdrop } from '../components/Backdrop';
import { Kicker, Heading, Lines, Chip } from '../components/ui';
import { StateMachine } from '../components/Rtos';
import type { SceneDef } from '../Video';
const T = {
    name: "Task State Transitions",
    course: "real time operating systems",
    scene: (n: number) => String(n).padStart(2, '0'),
    setup: ["A task is ready before it is running.", "Blocking removes it from CPU competition until an event arrives."],
    mechanism: ["The scheduler dispatches one ready task to the running state.", "A wait call moves it to blocked; an event returns it to ready.", "Completion exits the graph instead of returning to the queue."],
    example: ["A sensor task runs, waits for data, then wakes on an interrupt.", "A control task can use the CPU during the wait."],
    failure: ["Blocked is not the same as paused by the scheduler.", "Only an external event can satisfy the wait condition."],
    closing: ["Ready means eligible.", "Running means selected; blocked means waiting for evidence."],
};
const DESIGN_AUDIT = {
    visualArgument: "A task token circulates through ready, running, and blocked nodes with labeled causes.",
    motion: "The token follows dispatch, wait, and wake arcs rather than a linear timeline.",
    example: "A sensor wait frees the CPU for a control task until data arrives.",
    antiTemplate: "Unlike preemption, the decisive motion is event-driven state change, not priority replacement.",
    sceneRationale: "Six scenes distinguish dispatch, blocking, event wakeup, a sensor example, the blocked-state misconception and a summary; the token motion follows causal state transitions.",
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
    <div data-k="figure" data-n="task states 0"
style={{ position: 'absolute', left: 900, top: 200 }}><StateMachine
width={880}
height={580}
states={[{ id: "ready", label: "READY", x: .15, y: .5 }, { id: "run", label: "RUN", x: .5, y: .2 }, { id: "block", label: "BLOCKED", x: .82, y: .62 }]}
transitions={[{ from: "ready", to: "run", label: "dispatch" }, { from: "run", to: "ready", label: "preempt" }, { from: "run", to: "block", label: "wait" }, { from: "block", to: "ready", label: "event" }]}
active={"ready"}
progress={ramp(frame, 25, 65)}
walk={ramp(frame, 70, 45)}
walkFrom="block"
walkTo="ready"/></div>
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
    <div data-k="figure" data-n="task states 1"
style={{ position: 'absolute', left: 900, top: 200 }}><StateMachine
width={880}
height={580}
states={[{ id: "ready", label: "READY", x: .15, y: .5 }, { id: "run", label: "RUN", x: .5, y: .2 }, { id: "block", label: "BLOCKED", x: .82, y: .62 }]}
transitions={[{ from: "ready", to: "run", label: "dispatch" }, { from: "run", to: "ready", label: "preempt" }, { from: "run", to: "block", label: "wait" }, { from: "block", to: "ready", label: "event" }]}
active={"run"}
progress={ramp(frame, 25, 65)}
walk={ramp(frame, 70, 45)}
walkFrom="block"
walkTo="ready"/></div>
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
    <div data-k="figure" data-n="task states 2"
style={{ position: 'absolute', left: 900, top: 200 }}><StateMachine
width={880}
height={580}
states={[{ id: "ready", label: "READY", x: .15, y: .5 }, { id: "run", label: "RUN", x: .5, y: .2 }, { id: "block", label: "BLOCKED", x: .82, y: .62 }]}
transitions={[{ from: "ready", to: "run", label: "dispatch" }, { from: "run", to: "ready", label: "preempt" }, { from: "run", to: "block", label: "wait" }, { from: "block", to: "ready", label: "event" }]}
active={"block"}
progress={ramp(frame, 25, 65)}
walk={ramp(frame, 70, 45)}
walkFrom="run"
walkTo="block"/></div>
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
    <div data-k="figure" data-n="task states 3"
style={{ position: 'absolute', left: 900, top: 200 }}><StateMachine
width={880}
height={580}
states={[{ id: "ready", label: "READY", x: .15, y: .5 }, { id: "run", label: "RUN", x: .5, y: .2 }, { id: "block", label: "BLOCKED", x: .82, y: .62 }]}
transitions={[{ from: "ready", to: "run", label: "dispatch" }, { from: "run", to: "ready", label: "preempt" }, { from: "run", to: "block", label: "wait" }, { from: "block", to: "ready", label: "event" }]}
active={"ready"}
progress={ramp(frame, 25, 65)}
walk={ramp(frame, 70, 45)}
walkFrom="block"
walkTo="ready"/></div>
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
    <div data-k="figure" data-n="task states 4"
style={{ position: 'absolute', left: 900, top: 200 }}><StateMachine
width={880}
height={580}
states={[{ id: "ready", label: "READY", x: .15, y: .5 }, { id: "run", label: "RUN", x: .5, y: .2 }, { id: "block", label: "BLOCKED", x: .82, y: .62 }]}
transitions={[{ from: "ready", to: "run", label: "dispatch" }, { from: "run", to: "ready", label: "preempt" }, { from: "run", to: "block", label: "wait" }, { from: "block", to: "ready", label: "event" }]}
active={"ready"}
progress={ramp(frame, 25, 65)}
walk={ramp(frame, 70, 45)}
walkFrom="block"
walkTo="ready"/></div>
  </>);
export const SCENES: SceneDef[] = [
    { id: 'title', Comp: S1, dur: 150 },
    { id: 'mechanism', Comp: S2, dur: 180 },
    { id: 'example', Comp: S3, dur: 190 },
    { id: 'failure', Comp: S4, dur: 180 },
    { id: 'closing', Comp: S5, dur: 200 },
];
