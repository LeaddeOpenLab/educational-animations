# Zephyr Real-Time Operating System

[← Embedded Systems](../../README.md#embedded-systems) · [Complete index](../INDEX.md)

15 videos · 0 awaiting production

Course bibliography supplied by the source list: Zephyr Project documentation. Specific supporting references are listed per concept; missing references are not inferred.

[Download course ZIP](https://github.com/LeaddeOpenLab/educational-animations/releases/download/course-videos-embedded-systems-es-zephyr/es-zephyr-videos.zip) · 15 videos · bundle-2 · updated 2026-10-10T09:37:22Z
Package status: current. Package membership is recorded in its index.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="recvw25utmsfqm"></a>
## Zephyr Thread Lifecycle and Scheduling

`recvw25utMSfqM` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Distinguish eligibility from CPU selection and automatic wakeup.
**Takeaway:** The CPU selects only ready threads; sleep blocks until timeout.

https://github.com/user-attachments/assets/9ad42441-469e-4441-a940-5ea10e0ed4c7

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z01-zephyr-thread-lifecycle-and-scheduling.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Zephyr Thread Lifecycle and Scheduling for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: A begins in the unready lane. Show Start, sleep and timeout expiry change execution eligibility. Then A begins in the unready lane. k_thread_start moves A into ready then CPU selection. A sleeps; its card leaves the CPU and a timeout advances. The timeout expires; A returns to the ready set and resumes. The visible result must prove: The CPU selects only ready threads; sleep blocks until timeout. Follow the final scene timing: 0–5s: Created but Not Started; 5–12s: Start Makes the Thread Ready; 12–22s: Sleep Removes CPU Eligibility; 22–30s: Timeout Restores Readiness.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Running is a scheduling condition of a ready thread, not an independent readiness state. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z01-zephyr-thread-lifecycle-and-scheduling.tsx)

- [Zephyr documentation: Zephyr Thread Lifecycle and Scheduling](https://docs.zephyrproject.org/latest/kernel/services/threads/index.html) — Distinguish eligibility from CPU selection and automatic wakeup.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25utmrngn"></a>
## Thread Priority and Preemption

`recvw25utMrNGn` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show a higher-priority ready thread displacing a preemptible thread.
**Takeaway:** Preemption preserves the displaced thread for later resumption.

https://github.com/user-attachments/assets/2ef13ba3-708a-472e-8b79-8e4fc6bb6f96

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z02-thread-priority-and-preemption.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Thread Priority and Preemption for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Low runs alone with high unready. Show The scheduler chooses the numerically lower ready priority. Then Low runs alone with high unready. High priority 1 wakes while low priority 5 runs. High takes the CPU and low remains in the ready set. High blocks, so low resumes its unfinished work. The visible result must prove: Preemption preserves the displaced thread for later resumption. Follow the final scene timing: 0–5s: Low-Priority Thread Runs; 5–13s: High-Priority Thread Becomes Ready; 13–20s: Save Low, Run High; 20–30s: Blocking Returns the CPU.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: This example uses preemptible threads and an unlocked scheduler. Cooperative threads have different behavior. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z02-thread-priority-and-preemption.tsx)

- [Zephyr documentation: Thread Priority and Preemption](https://docs.zephyrproject.org/latest/kernel/services/scheduling/index.html) — Show a higher-priority ready thread displacing a preemptible thread.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25utmfvmu"></a>
## Kconfig Feature Selection

`recvw25utMFVMU` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Separate requested options from dependency-resolved configuration.
**Takeaway:** Only a dependency-valid resolved feature is compiled.

https://github.com/user-attachments/assets/3c69812c-15dc-4a30-87d3-185380974741

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z03-kconfig-feature-selection.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Kconfig Feature Selection for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Requested LOGGER=y but UART=n. Show A conceptual LOGGER symbol depends on UART. Then Requested LOGGER=y but UART=n. Resolved LOGGER remains n while its dependency is false. UART becomes y; the requested LOGGER can resolve to y. autoconf.h and the included logger object update from the resolved values. The visible result must prove: Only a dependency-valid resolved feature is compiled. Follow the final scene timing: 0–6s: Request a Logger; 6–13s: An Unmet Dependency Blocks It; 13–22s: Enable the UART Dependency; 22–30s: Compile the Resolved Feature.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: A request for y does not override an unmet depends-on constraint. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z03-kconfig-feature-selection.tsx)

- [Zephyr documentation: Kconfig Feature Selection](https://docs.zephyrproject.org/latest/build/kconfig/index.html) — Separate requested options from dependency-resolved configuration.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25utmszwd"></a>
## Devicetree Hardware Description

`recvw25utMsZwd` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show an overlay changing hardware-description properties used at build time.
**Takeaway:** The resolved hardware properties feed code generation, not runtime reconfiguration.

https://github.com/user-attachments/assets/bc336a66-d8f5-4c57-a5d9-fc2c4c258290

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z04-devicetree-hardware-description.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Devicetree Hardware Description for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: UART is disabled with a 9600 baud property. Show Build tooling combines the board tree and application overlay. Then UART is disabled with a 9600 baud property. Overlay supplies status okay and current-speed 115200. The merged node replaces both property values. Generated macros contain the merged baud rate and status. The visible result must prove: The resolved hardware properties feed code generation, not runtime reconfiguration. Follow the final scene timing: 0–5s: Describe a UART Node; 5–13s: Apply a Board Overlay; 13–22s: Merge Concrete Properties; 22–30s: Generate Compile-Time Data.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Devicetree describes hardware; it does not execute a driver or guarantee initialization success. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z04-devicetree-hardware-description.tsx)

- [Zephyr documentation: Devicetree Hardware Description](https://docs.zephyrproject.org/latest/build/dts/intro.html) — Show an overlay changing hardware-description properties used at build time.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmvtml"></a>
## Device Driver Initialization Order

`recvw25vjMvTMl` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Demonstrate explicit init levels and within-level priorities before driver use.
**Takeaway:** Sensor readiness follows completed prerequisite initialization.

https://github.com/user-attachments/assets/9a1bb534-1233-44c9-b3e4-466a0873894e

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z05-device-driver-initialization-order.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Device Driver Initialization Order for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: All three drivers start uninitialized. Show Explicit initialization levels and priorities enforce this example ordering. Then All three drivers start uninitialized. Clock becomes ready in PRE_KERNEL_1 before the bus. Bus is initialized next, then the sensor at POST_KERNEL. Sensor can be used only after the initialization chain has succeeded. The visible result must prove: Sensor readiness follows completed prerequisite initialization. Follow the final scene timing: 0–6s: Configure Explicit Init Ordering; 6–12s: Clock Before the Bus; 12–22s: Bus Before the Sensor; 22–30s: Check Readiness Before Use.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Dependency order must be configured; devicetree does not automatically schedule all dependencies. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z05-device-driver-initialization-order.tsx)

- [Zephyr documentation: Device Driver Initialization Order](https://docs.zephyrproject.org/latest/kernel/drivers/index.html) — Demonstrate explicit init levels and within-level priorities before driver use.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjm0yll"></a>
## GPIO Callback and Interrupt Handling

`recvw25vjM0yLl` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Connect a physical rising edge with interrupt dispatch and a callback counter.
**Takeaway:** One edge produces one callback increment in this simplified trace.

https://github.com/user-attachments/assets/fa1c5e50-1aed-42c1-a37e-cdc34bdf5406

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z06-gpio-callback-and-interrupt-handling.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about GPIO Callback and Interrupt Handling for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Pin 3 is low and callback count zero. Show A configured physical rising edge invokes the matching callback. Then Pin 3 is low and callback count zero. The callback mask and rising-edge trigger are configured. A rising transition delivers a pin event into the callback. The callback increments its counter and returns to interrupted work. The visible result must prove: One edge produces one callback increment in this simplified trace. Follow the final scene timing: 0–5s: Register a Pin Mask; 5–12s: Enable Rising-Edge Interrupts; 12–22s: Deliver the Edge to the Callback; 22–30s: Count the Event, Return Quickly.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Keep callback work short; interrupt-context callbacks must not wait on blocking APIs. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z06-gpio-callback-and-interrupt-handling.tsx)

- [Zephyr documentation: GPIO Callback and Interrupt Handling](https://docs.zephyrproject.org/latest/hardware/peripherals/gpio.html) — Connect a physical rising edge with interrupt dispatch and a callback counter.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmxzt9"></a>
## Work Queue Deferred Processing

`recvw25vjMxZT9` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show ISR submission decoupled from worker execution and FIFO processing.
**Takeaway:** Deferred processing preserves FIFO order while ISR returns promptly.

https://github.com/user-attachments/assets/aea4cf06-8e6a-4f7f-b802-e8f80d99f516

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z07-work-queue-deferred-processing.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Work Queue Deferred Processing for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: ISR has work A ready to defer. Show k_work_submit enqueues; the scheduled worker invokes handlers later. Then ISR has work A ready to defer. A and B enter the work queue without executing their handlers. ISR returns; both work items remain stored. Worker dequeues A and completes it before processing B. Both handlers finish and the worker returns to waiting. The visible result must prove: Deferred processing preserves FIFO order while ISR returns promptly. Follow the final scene timing: 0–5s: Keep the ISR Short; 5–11s: Submit Two Work Items; 11–19s: Return While Work Waits; 19–25s: Worker Processes FIFO; 25–30s: The Queue Drains.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Submitting work does not execute its handler immediately; pending items must remain valid. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z07-work-queue-deferred-processing.tsx)

- [Zephyr documentation: Work Queue Deferred Processing](https://docs.zephyrproject.org/latest/kernel/services/threads/workqueue.html) — Show ISR submission decoupled from worker execution and FIFO processing.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmfyw6"></a>
## Message Queue Thread Communication

`recvw25vjMFyW6` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Prove fixed-size messages are copied into the queue and received in FIFO order.
**Takeaway:** Receiver gets 42 even after producer changes its buffer to 99.

https://github.com/user-attachments/assets/2801b4e8-167f-42fa-bc17-8b67927f66f2

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z08-message-queue-thread-communication.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Message Queue Thread Communication for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Producer buffer contains 42. Show Fixed-size message put/get operations copy bytes. Then Producer buffer contains 42. put copies 42 into the first queue slot. Producer reuses its own buffer for 99 while queued 42 remains intact. get copies the oldest queued message into receiver storage. The visible result must prove: Receiver gets 42 even after producer changes its buffer to 99. Follow the final scene timing: 0–6s: Producer Owns a Message; 6–13s: Copy Bytes into FIFO Storage; 13–22s: Reusing the Buffer Preserves the Copy; 22–30s: Receive the Original Message.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: The queue copies message bytes; it does not retain the producer buffer pointer in this example. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z08-message-queue-thread-communication.tsx)

- [Zephyr documentation: Message Queue Thread Communication](https://docs.zephyrproject.org/latest/kernel/services/data_passing/message_queues.html) — Prove fixed-size messages are copied into the queue and received in FIFO order.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjm9jec"></a>
## Semaphore Synchronization

`recvw25vjM9JeC` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show a blocked consumer woken by an ISR event with no stored-count increase.
**Takeaway:** Consumer resumes and handles one event without polling.

https://github.com/user-attachments/assets/6b669d52-9177-4707-b96a-9a53453e0035

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z09-semaphore-synchronization.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Semaphore Synchronization for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Binary semaphore has count zero. Show A semaphore give satisfies the pending take. Then Binary semaphore has count zero. Consumer blocks on take instead of running. ISR gives; event token moves directly toward the waiting consumer. The waiting take completes; count remains zero after the delivered event. The visible result must prove: Consumer resumes and handles one event without polling. Follow the final scene timing: 0–5s: Start with No Event; 5–12s: Consumer Waits at Zero; 12–21s: ISR Gives an Event; 21–30s: Wake the Waiting Consumer.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Semaphores have no mutex ownership; an ISR can give while a thread waits. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z09-semaphore-synchronization.tsx)

- [Zephyr documentation: Semaphore Synchronization](https://docs.zephyrproject.org/latest/kernel/services/synchronization/semaphores.html) — Show a blocked consumer woken by an ISR event with no stored-count increase.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmm3kg"></a>
## Mutex Priority Inheritance

`recvw25vjMM3KG` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show a low-priority mutex owner inheriting a blocked high-priority waiter priority.
**Takeaway:** The owner completes without medium extending priority inversion.

https://github.com/user-attachments/assets/4f8d4f1a-0919-4d8b-86a9-e5ea5d6d9f6a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z10-mutex-priority-inheritance.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Mutex Priority Inheritance for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Low owns the lock at base priority 5. Show A higher-priority waiter raises the owner effective priority. Then Low owns the lock at base priority 5. High priority 1 waits for the mutex; medium priority 3 is ready. Low inherits priority 1 and runs to complete its critical section. Low unlocks; high acquires and low returns to base priority 5. High runs with the lock while medium stays ready. The visible result must prove: The owner completes without medium extending priority inversion. Follow the final scene timing: 0–5s: Low Holds the Mutex; 5–11s: High Blocks on the Owner; 11–19s: Boost the Owner, Bypass Medium; 19–25s: Unlock Transfers Ownership; 25–30s: Restore the Base Priority.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Inheritance changes effective scheduling priority, not base priority or mutex ownership. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z10-mutex-priority-inheritance.tsx)

- [Zephyr documentation: Mutex Priority Inheritance](https://docs.zephyrproject.org/latest/kernel/services/synchronization/mutexes.html) — Show a low-priority mutex owner inheriting a blocked high-priority waiter priority.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmcy4t"></a>
## Timer Callback and Deadline

`recvw25vjMCy4T` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Distinguish timer expiration scheduling from handler execution context.
**Takeaway:** Periodic deadlines follow the timing schedule; callbacks execute in interrupt context.

https://github.com/user-attachments/assets/1a0b8d55-e110-40a6-8687-e80ce4d10992

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z11-timer-callback-and-deadline.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Timer Callback and Deadline for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Timer begins with initial deadline 30 and period 20. Show A timer schedules expiry from its initial duration and period. Then Timer begins with initial deadline 30 and period 20. Logical time advances until first deadline is reached. Expirations occur at 30, 50, 70 and 90 and advance next deadline. The callback count matches the expiry marks on the clock trace. The visible result must prove: Periodic deadlines follow the timing schedule; callbacks execute in interrupt context. Follow the final scene timing: 0–6s: Schedule Delay and Period; 6–14s: Advance to the First Deadline; 14–22s: Count Periodic Expirations; 22–30s: Keep the Callback Short.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Timer expiry functions run in system-clock interrupt context and must not block. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z11-timer-callback-and-deadline.tsx)

- [Zephyr documentation: Timer Callback and Deadline](https://docs.zephyrproject.org/latest/kernel/services/timing/timers.html) — Distinguish timer expiration scheduling from handler execution context.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmle3g"></a>
## Kernel Tickless Idle

`recvw25vjMle3G` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show idle interrupt suppression with a programmed wake deadline and logical-time catchup.
**Takeaway:** Logical time advances while needless periodic wakes are avoided.

https://github.com/user-attachments/assets/eb699754-5dab-4cf1-bb25-f520e9170af5

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z12-kernel-tickless-idle.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Kernel Tickless Idle for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: CPU receives illustrative periodic ticks before entering idle at time 20. Show Tickless operation programs the next needed timer deadline. Then CPU receives illustrative periodic ticks before entering idle at time 20. Next timeout is at 80; the timer is programmed for that deadline. CPU remains idle from 20 to 80 without intermediate periodic interrupts. One wake interrupt advances accounted logical time to 80 and services the timeout. The visible result must prove: Logical time advances while needless periodic wakes are avoided. Follow the final scene timing: 0–5s: Periodic Ticks Wake the CPU; 5–13s: Find the Next Required Timeout; 13–22s: Sleep Until One Programmed Interrupt; 22–30s: Account for the Elapsed Time.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Tickless suppresses periodic interrupts, not logical time or scheduled deadlines. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z12-kernel-tickless-idle.tsx)

- [Zephyr documentation: Kernel Tickless Idle](https://docs.zephyrproject.org/latest/kernel/services/timing/clocks.html) — Show idle interrupt suppression with a programmed wake deadline and logical-time catchup.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmvj9w"></a>
## Memory Slab Allocation

`recvw25vjMvj9W` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show fixed-size block ownership, exhaustion and immediate reuse.
**Takeaway:** A returned block is reused without changing block size.

https://github.com/user-attachments/assets/412c5e5c-bf23-4069-af99-24323a00d1bd

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z13-memory-slab-allocation.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Memory Slab Allocation for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Three fixed-size blocks are free. Show Slab allocation and free update fixed block ownership. Then Three fixed-size blocks are free. A, B and C each acquire one whole block. D requests without waiting while free count is zero and cannot allocate. B frees its block; D acquires the exact same slot. A, D and C own the three slots; free count is zero. The visible result must prove: A returned block is reused without changing block size. Follow the final scene timing: 0–5s: Three Equal Free Blocks; 5–12s: Allocate Blocks to A, B, C; 12–19s: A Fourth Request Finds No Free Block; 19–25s: Free B, Then Reuse Its Block; 25–30s: Track Ownership and Free Count.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Allocation consumes an entire fixed-size block; a freed block can be reused without heap splitting. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z13-memory-slab-allocation.tsx)

- [Zephyr documentation: Memory Slab Allocation](https://docs.zephyrproject.org/latest/kernel/memory_management/slabs.html) — Show fixed-size block ownership, exhaustion and immediate reuse.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjm1wmw"></a>
## Logging Backend Configuration

`recvw25vjM1WMw` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show filtering, deferred storage and output through an enabled backend.
**Takeaway:** Rejected DEBUG produces no output; ERROR arrives at UART later.

https://github.com/user-attachments/assets/876a55c2-d0bf-4216-a15b-a6a05f2adea6

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z14-logging-backend-configuration.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about Logging Backend Configuration for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: UART backend is enabled with INFO threshold. Show Severity filter permits ERROR, then deferred processing invokes the backend. Then UART backend is enabled with INFO threshold. DEBUG is discarded while ERROR is accepted. The accepted ERROR record occupies the deferred buffer while caller returns. Logging processing emits the record via UART and frees the buffer slot. The visible result must prove: Rejected DEBUG produces no output; ERROR arrives at UART later. Follow the final scene timing: 0–6s: Enable Logging and a Backend; 6–12s: Filter Before Buffering; 12–20s: Defer the Accepted Record; 20–30s: Process the Buffer through UART.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: Filtering and backend enablement are distinct; deferred mode separates log call from output. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z14-logging-backend-configuration.tsx)

- [Zephyr documentation: Logging Backend Configuration](https://docs.zephyrproject.org/latest/services/logging/index.html) — Show filtering, deferred storage and output through an enabled backend.

[Back to course top](#zephyr-real-time-operating-system)

---

<a id="recvw25vjmf5u5"></a>
## West Manifest and Module Resolution

`recvw25vjMF5u5` · Video available · review: **passed** · version `zephyr-20261010-v1`

**Learn:** Show imported project definitions resolved to explicit checkout revisions.
**Takeaway:** Included HAL is at its declared revision and exposes module metadata to the build.

https://github.com/user-attachments/assets/6d225014-9806-4bd4-972b-8ec7dce0b9aa

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/embedded-systems/zephyr-real-time-operating-system/z15-west-manifest-and-module-resolution.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. The source kit and brand assets are included; system fonts may fall back. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English concept animation about West Manifest and Module Resolution for Zephyr Real-Time Operating System, Embedded Systems, using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2 at 1920×1080 and 30 fps. Teach this numerical scenario: Manifest lists Zephyr and imports its project definitions. Show Manifest resolution determines projects, then update checks out declared revisions. Then Manifest lists Zephyr and imports its project definitions. HAL from the import is included while an inactive project remains excluded. west update replaces the HAL checkout revision old with v2. Build module discovery finds the included HAL module metadata. The visible result must prove: Included HAL is at its declared revision and exposes module metadata to the build. Follow the final scene timing: 0–5s: Declare Project Revisions; 5–12s: Resolve Imported Projects; 12–20s: Update Included Checkouts; 20–30s: Discover Build Modules.

Use background #0e0d10 → #18181f → #22222d, primary #33bbee for the main curve/object, accent #ee7733 for the changed quantity, result #009988 for the conclusion, warning #cc3311 for loss/waiting and alternate #ee3377 for the comparison; use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif with bold 54px headings, 31px left-column captions and readable mechanism labels in the right figure band. Animate the actual thread eligibility, ownership, copied payload, property values, deadlines or module revisions described in the topic state model. Preserve mechanism continuity between scenes with no scene fade. Use the supplied stateAt(frame) timing and allow each resulting state to settle for reading. Avoid this misconception: The manifest declares revisions; west update aligns repositories. Module discovery is a separate build step. Exact reproduction requires the supplied zephyr-real-time-operating-system source kit, topic TSX and .state.ts, L2 components, theme, fonts and brand assets; use FFmpeg to remove audio. The card describes final v1; clean-machine exact reproduction has not been tested.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/zephyr-real-time-operating-system/src/videos/z15-west-manifest-and-module-resolution.tsx)

- [Zephyr documentation: West Manifest and Module Resolution](https://docs.zephyrproject.org/latest/develop/west/manifest.html) — Show imported project definitions resolved to explicit checkout revisions.

[Back to course top](#zephyr-real-time-operating-system)

---
