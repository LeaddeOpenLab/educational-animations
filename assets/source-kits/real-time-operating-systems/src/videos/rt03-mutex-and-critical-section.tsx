import React from 'react';
import { COLORS, alpha, fadeIn, ramp } from '../theme';
import { Backdrop } from '../components/Backdrop';
import { Kicker, Heading, Lines, Chip } from '../components/ui';
import { WaitForGraph } from '../components/Rtos';
import type { SceneDef } from '../Video';
const T = {
    name: "Mutex and Critical Section",
    course: "real time operating systems",
    scene: (n: number) => String(n).padStart(2, '0'),
    setup: ["A critical section protects one shared invariant.", "A mutex turns simultaneous demand into serialized ownership."],
    mechanism: ["The first task locks before touching shared state.", "A second task requesting the same mutex waits outside the section.", "Unlock transfers eligibility; it does not copy the protected data."],
    example: ["Two tasks update a ring-buffer head and payload.", "The lock keeps readers from seeing a new head with old data."],
    failure: ["Disabling interrupts is not a general replacement for a mutex.", "Holding the lock during slow I/O stretches every wait."],
    closing: ["Keep the protected region small.", "Make ownership explicit around the invariant."],
};
const DESIGN_AUDIT = {
    visualArgument: "A resource node grants one ownership edge while a second task remains on a dashed request edge.",
    motion: "The mutex token transfers only after the owner exits the highlighted region.",
    example: "Two writers protect a ring-buffer head and payload as one invariant.",
    antiTemplate: "Unlike priority inversion, the wait is intentional serialization with no third task involved.",
    sceneRationale: "Six scenes establish the shared counter, show exclusion, step through read-modify-write, test overlap, address the locking scope and summarize atomic access.",
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
    <div data-k="figure" data-n="mutex graph 0"
style={{ position: 'absolute', left: 890, top: 200 }}><WaitForGraph
width={900}
height={590}
processes={[{ id: "a", label: "TASK A" }, { id: "b", label: "TASK B" }]}
resources={[{ id: "m", label: "MUTEX" }]}
assign={[{ res: "m", to: "a" }]}
request={[{ from: "b", res: "m" }]}
cycle={[]}
progress={ramp(frame, 25, 65)}/></div>
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
    <div data-k="figure" data-n="mutex graph 1"
style={{ position: 'absolute', left: 890, top: 200 }}><WaitForGraph
width={900}
height={590}
processes={[{ id: "a", label: "TASK A" }, { id: "b", label: "TASK B" }]}
resources={[{ id: "m", label: "MUTEX" }]}
assign={[{ res: "m", to: "a" }]}
request={[{ from: "b", res: "m" }]}
cycle={[]}
progress={ramp(frame, 25, 65)}/></div>
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
    <div data-k="figure" data-n="mutex graph 2"
style={{ position: 'absolute', left: 890, top: 200 }}><WaitForGraph
width={900}
height={590}
processes={[{ id: "a", label: "TASK A" }, { id: "b", label: "TASK B" }]}
resources={[{ id: "m", label: "MUTEX" }]}
assign={[{ res: "m", to: "a" }]}
request={[{ from: "b", res: "m" }]}
cycle={[]}
progress={ramp(frame, 25, 65)}/></div>
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
    <div data-k="figure" data-n="mutex graph 3"
style={{ position: 'absolute', left: 890, top: 200 }}><WaitForGraph
width={900}
height={590}
processes={[{ id: "a", label: "TASK A" }, { id: "b", label: "TASK B" }]}
resources={[{ id: "m", label: "MUTEX" }]}
assign={[{ res: "m", to: "a" }]}
request={[{ from: "b", res: "m" }]}
cycle={[]}
progress={ramp(frame, 25, 65)}/></div>
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
    <div data-k="figure" data-n="mutex graph 4"
style={{ position: 'absolute', left: 890, top: 200 }}><WaitForGraph
width={900}
height={590}
processes={[{ id: "a", label: "TASK A" }, { id: "b", label: "TASK B" }]}
resources={[{ id: "m", label: "MUTEX" }]}
assign={[{ res: "m", to: "a" }]}
request={[{ from: "b", res: "m" }]}
cycle={[]}
progress={ramp(frame, 25, 65)}/></div>
  </>);
export const SCENES: SceneDef[] = [
    { id: 'title', Comp: S1, dur: 155 },
    { id: 'mechanism', Comp: S2, dur: 185 },
    { id: 'example', Comp: S3, dur: 180 },
    { id: 'failure', Comp: S4, dur: 185 },
    { id: 'closing', Comp: S5, dur: 195 },
];
