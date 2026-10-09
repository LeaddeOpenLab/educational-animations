# Operating Systems

[← Computer Science](../../README.md#computer-science) · [Complete index](../INDEX.md)

8 videos · 0 awaiting production

Course bibliography supplied by the source list: Operating System Concepts (Silberschatz et al.). Specific supporting references are listed per concept; missing references are not inferred.

[Download course ZIP](https://github.com/LeaddeOpenLab/educational-animations/releases/download/course-videos-computer-science-cs-os/cs-os-videos.zip) · 8 videos · bundle-1 · updated 2026-09-30T07:45:13Z
Package status: current. Package membership is recorded in its index.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="c22-a001"></a>
## Processes and Threads

`C22-A001` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/c7eb2edf-0f4b-49cf-839e-03d0aef703fe

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/processes-and-threads.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: A process owns an address space; a thread is the part the CPU actually runs. Show that the address space is the unit of protection while the thread is the unit of scheduling, then price the difference: a thread switch saves registers, a process switch also invalidates the address translation.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. stagger-in + band-sweep — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a002"></a>
## Process State Transitions

`C22-A002` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/a7691fea-b6ae-412e-992c-ad56691362cc

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/process-state-transitions.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: Dispatch is the only door into the running state, and blocked is not finished. Draw the five states and their edges, walk a token along the dispatch edge and then along the block edge, and finish with one process over real time so the waiting dominates the picture.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. draw-on + band-sweep + marker-travel — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a003"></a>
## Context Switching

`C22-A003` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/d4892e8f-fd7e-4497-b121-bddc7e943048

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/context-switching.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: A context switch saves one CPU state and loads another, and earns nothing while doing it. Show the save/restore pair, split the cost into the register half and the address-space half, show the gaps it leaves in a two-process timeline, then plot the lost fraction against the quantum.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. draw-on + stagger-in + slide-up + band-sweep — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a004"></a>
## CPU Scheduling

`C22-A004` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/a265415f-ae4c-485c-b017-d65d1d0d020a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/cpu-scheduling.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: A scheduling policy is an order, and turnaround and waiting time are what that order buys. Run the same three jobs under first-come-first-served and under round robin on one time axis, then compare the average waiting time the two orders produce.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. stagger-in + band-sweep + count-up — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a005"></a>
## Virtual Memory Paging

`C22-A005` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/4618ad6b-b391-4efe-8302-c2006b5025bb

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/virtual-memory-paging.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: Equal pages and equal frames make the map a table, and let a program exceed memory. Show the virtual space as equal pages, physical memory holding only some of them, why equal blocks strand no unusable hole, and how the virtual and physical sizes compare.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. stagger-in — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a006"></a>
## Page-Table Address Translation

`C22-A006` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/f2e5cf66-1669-4ddf-8bdb-1d8006045e5d

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/page-table-address-translation.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: Translation is one table lookup plus an addition, because the offset is never translated. Split a virtual address into page number and offset, use the page number as a table index, show why the table is split into two levels, then work the same address through in bits.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. stagger-in + stem-reveal + count-up — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a007"></a>
## Page Replacement

`C22-A007` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/f500854a-2baf-4c0c-aae0-3dd939cb4ab7

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/page-replacement.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: When memory is full the victim rule is the entire policy, and it guesses from history. Walk a reference string through three frames under first-in-first-out and under least-recently-used, show what each policy actually looks at when it chooses, and compare the fault counts on the identical trace.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. pop-in + stem-reveal + count-up — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---

<a id="c22-a008"></a>
## Four Conditions for Deadlock

`C22-A008` · Video available · review: **unreviewed** · version `v1`

**Learn:** Pending verification.
**Takeaway:** Pending verification.

https://github.com/user-attachments/assets/dba76689-5f76-44cc-84a0-e82da1db0c94

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/computer-science/operating-systems/four-conditions-for-deadlock.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** unverified. Historical prompt; tool, timing and visual alignment require verification. Source/template/assets are not yet packaged.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English concept animation for a university operating systems course: Deadlock needs four conditions at once, so breaking any single one prevents it. Name mutual exclusion, hold and wait, no preemption and circular wait, draw the cycle in the wait-for graph, remove one request edge to show the loop cannot close, then price each remedy.

Dark ground `#0e0d10` -> `#18181f` -> `#22222d`; primary `#ee7733` on the main entity; accent `#0077bb` on the key quantity; result `#009988` on the conclusion; warn `#cc3311` on danger; "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif throughout, 700-800 headings, 21px uppercase kickers at 5px letter-spacing. draw-on + stagger-in — each element fades in over 12f with offsets stepping 8-14f, and nothing lands in a scene's last 25 frames.
````

</details>

**Production:** Tool not yet verified; dependencies: pending. Exact reproduction: not verified.

[Reproduction requirements and missing materials](../../docs/REUSE.md)

References: pending verification.

[Back to course top](#operating-systems)

---
