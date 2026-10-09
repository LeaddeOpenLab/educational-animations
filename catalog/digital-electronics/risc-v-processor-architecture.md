# RISC-V Processor Architecture

[← Digital Electronics](../../README.md#digital-electronics) · [Complete index](../INDEX.md)

15 videos · 0 awaiting production

Course bibliography supplied by the source list: Specific official documentation and research listed per concept. Specific supporting references are listed per concept; missing references are not inferred.

[Download course ZIP](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/releases/download/course-videos-digital-electronics-risc-v-processor-architecture/risc-v-processor-architecture-videos.zip) · 15 videos · bundle-2 · updated 2026-10-09T07:55:21Z
Package status: current. Package membership is recorded in its index.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="recvw25utmyuhh"></a>
## RISC-V Instruction Encoding Fields

`recvw25utMYuhh` · Video available · review: **passed** · version `v1`

**Learn:** Decode a concrete R-type word into operation and register indices, then show that editing rd redirects the destination without changing operands.
**Takeaway:** ADD x9,x6,x7 has the same inputs and operation but a changed destination.

https://github.com/user-attachments/assets/95491bcc-20b1-4022-a061-26eb1471325e

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/risc-v-instruction-encoding-fields.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on RISC-V Instruction Encoding Fields: decode the 32-bit R-type word 0x007302B3 into opcode, source registers x6 and x7, destination x5, and ADD function fields; move the extracted fields into their decoded roles, then change only rd from 00101 to 01001 at 25 seconds so the word becomes 0x007304B3 and destination x9 while both sources and the operation remain unchanged.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel extracts the opcode over 65 frames and combines function fields over 70 frames; update the actual rd bit cells at frame 750; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv01-risc-v-instruction-encoding-fields.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — RV32I R-type field interpretation. This lesson moves bit slices and decoded indices; register storage timing belongs to the next lesson.
- [github.com](https://github.com/riscv/riscv-opcodes/blob/master/extensions/rv_i) — Opcode fields for numeric examples

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmymgk"></a>
## Register File Read and Write Ports

`recvw25utMYmGk` · Video available · review: **passed** · version `v1`

**Learn:** Show two selected register values leaving independent read ports and a single destination changing only at the write edge, including x0 write suppression.
**Takeaway:** x0 remains zero after an attempted write; x5 retains13.

https://github.com/user-attachments/assets/c0d285f5-f83e-4f65-b3c7-16d38b99d873

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/register-file-read-and-write-ports.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Register File Read and Write Ports: select stored x6=9 and x7=4 with two independent read addresses and copy both values into output ports without removing them; produce pending write data 13 while stored x5 remains zero, update only x5 to 13 at the rising edge at 20 seconds, then discard an attempted write of 13 to x0 at 27 seconds while x0 stays zero and x5 retains 13.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #fbbf24 glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel copies the two read values and approaches the write row over 45 frames; update stored x5 at frame 600 and remove the rejected x0 payload at frame 810; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv02-register-file-read-and-write-ports.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — Architectural x0 semantics are specified; port count and synchronous write timing are explicitly a teaching implementation. This lesson changes storage and duplicates read values rather than decoding instruction bits.
- [github.com](https://github.com/riscv/riscv-opcodes/blob/master/extensions/rv_i) — Opcode fields for numeric examples

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmtyz5"></a>
## Immediate Generation from Instruction Bits

`recvw25utMTyz5` · Video available · review: **passed** · version `v1`

**Learn:** Reconstruct signed immediates from I, S and B instruction fields, making sign extension, split-field concatenation and the fixed branch low zero visible.
**Takeaway:** Different encodings produce usable signed byte offsets.

https://github.com/user-attachments/assets/407b3e47-1322-4907-91f5-48afbc5e5549

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/immediate-generation-from-instruction-bits.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Immediate Generation from Instruction Bits: extract the I-type immediate 111111111100 and replicate its sign bit into twenty upper positions to obtain 0xFFFFFFFC, or -4; join the separated S-type high and low fields into 000000001100, or +12; rearrange B-type fragments and append a fixed low zero to obtain +16 bytes, then compare the three completed signed offsets.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel lifts the I-type slice over 70 frames and separates S-type fields over 75 frames; populate sign bits, assembled fields, and the fixed branch low-zero cell at their state boundaries; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv03-immediate-generation-from-instruction-bits.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — RV32I immediate generation from I/S/B formats, excluding shift-immediate special encodings. This lesson physically rebuilds bit strings; it does not show PC selection or memory address execution.
- [github.com](https://github.com/riscv/riscv-opcodes/blob/master/extensions/rv_i) — Opcode fields for numeric examples

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmlp5p"></a>
## ALU Control from Opcode and Function Bits

`recvw25utMLp5p` · Video available · review: **passed** · version `v1`

**Learn:** Use fixed operands and three R-type encodings to show that opcode plus function fields select the actual ALU operation and therefore its result.
**Takeaway:** Opcode identifies the class; function fields distinguish these operations.

https://github.com/user-attachments/assets/42ea819d-c38c-4059-9624-dd3aaa76a016

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/alu-control-from-opcode-and-function-bits.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on ALU Control from Opcode and Function Bits: keep operands 12 and 5 fixed while opcode and function bits select three actual ALU behaviors; join twelve blue and five yellow units for ADD result 17, change funct7 from 0000000 to 0100000 and separate five removed units for SUB result 7, then use funct3=100 with funct7=0000000 to fill the bitwise XOR result 1100 XOR 0101 = 1001, or 9, and compare the three control/result rows.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #34d399 glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel joins the five ADD units over 80 frames and lowers the five removed SUB units over 65 frames; fill XOR output bits at frame 570 and stagger the final comparison rows by 10 frames; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv04-alu-control-from-opcode-and-function-bits.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — RV32I R-type ADD/SUB/XOR control examples. Internal ALU-control binary codes are implementation-specific and are not invented; use named ADD/SUB/XOR selections.
- [github.com](https://github.com/riscv/riscv-opcodes/blob/master/extensions/rv_i) — Opcode fields for numeric examples

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmjbgr"></a>
## Single-Cycle Datapath Instruction Flow

`recvw25utMJbgr` · Video available · review: **passed** · version `v1`

**Learn:** Follow one load through an illustrative single-cycle datapath, then commit the loaded register value and next PC together at the sole completion edge.
**Takeaway:** One instruction completes: x5=42 andPC=0x204.

https://github.com/user-attachments/assets/d705f18d-58b0-455b-84bd-b5e75723c89e

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/single-cycle-datapath-instruction-flow.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Single-Cycle Datapath Instruction Flow: follow LW x5,8(x6) from instruction fetch at PC 0x200 through base x6=0x1000, effective address 0x1008, and a nondestructive read of memory value 42; distinguish ready x5=42 and next PC=0x204 from stored x5=0 and PC=0x200, then change both stored values together at the single completion edge at 27 seconds while preserving memory and the base register.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel sends the fetch address over 70 frames and copies the base register over 75 frames; progress one continuous cycle rail and change stored x5 and PC together at frame 810; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv05-single-cycle-datapath-instruction-flow.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — LW architectural semantics in an explicitly illustrative single-cycle implementation; stage names are conceptual propagation phases within one cycle, not a pipeline.
- [github.com](https://github.com/riscv/riscv-opcodes/blob/master/extensions/rv_i) — Opcode fields for numeric examples

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utm8s8d"></a>
## Program Counter Update for Branches

`recvw25utM8s8D` · Video available · review: **passed** · version `v1`

**Learn:** Compute the two candidate next PCs and show how BEQ selects the actual fetch address.
**Takeaway:** BEQ chooses branch-PC plus offset when equal; otherwise execution continues at PC plus four in RV32I.

https://github.com/user-attachments/assets/5c93f712-249d-4804-a496-d94cce704a66

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/program-counter-update-for-branches.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Program Counter Update for Branches: compute fall-through 0x104 and target 0x110 from branch PC 0x100 with displacement 16; compare 7 with 7, install 0x110 in the PC at 15 seconds, and relocate the fetch selection past 0x104 and 0x108; replay the same branch with 7 and 9 so PC and fetch select 0x104 at 23 seconds, then compare the taken and not-taken destinations.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel splits PC candidates over 65 frames and moves the fetch selection at frames 450 and 690; keep selected next-PC and stored-PC cells distinct until each update; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv06-program-counter-update-for-branches.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — Conditional Branches specifies comparison and target relative to the branch instruction; RV32I sequential instructions are four bytes.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utm3tfr"></a>
## Load and Store Address Calculation

`recvw25utM3TFR` · Video available · review: **passed** · version `v1`

**Learn:** Separate effective-address arithmetic from the data transferred by LW and SW.
**Takeaway:** Both LW and SW add a signed byte offset to rs1; LW copies memory into rd, while SW copies rs2 into memory.

https://github.com/user-attachments/assets/ffe9a4bc-2d0f-48d5-9235-eadf144e5290

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/load-and-store-address-calculation.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Load and Store Address Calculation: sign-extend the twelve-bit -8 displacement and add it to base x1=0x2008 to select address 0x2000; move loaded word 42 from that memory row into x5 while memory retains it, then form store address 0x200C from the same base plus 4 and carry separate x6=99 data to replace only that word while x6 and other memory words remain unchanged.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel forms the signed address over 65 frames and carries load/store payloads in opposite directions; replace x5 at frame 330 and the selected store word at frame 750; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv07-load-and-store-address-calculation.tsx)

- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — Load and Store Instructions defines EA=rs1+sign-extended offset; loads use rd, stores use rs2.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmuzee"></a>
## Pipeline Register Data Transfer

`recvw25utMuzEE` · Video available · review: **passed** · version `v2`

**Learn:** Track one instruction’s operands, destination and result through clocked pipeline registers.
**Takeaway:** Clocked pipeline registers preserve an instruction’s data and control between stages so the final result reaches its own destination.

https://github.com/user-attachments/assets/a07af809-750c-49ff-9d5e-f266482684aa

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/pipeline-register-data-transfer.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Pipeline Register Data Transfer: assemble ADD operands 7 and 5 with destination x5 and RegWrite=1, capture them together in ID/EX at 8 seconds, and show the latch holding 7/5/x5 after upstream inputs change to 20/1/x6; compute 12, capture result and destination together in EX/MEM at 17 seconds, carry 12/x5 through MEM/WB without a memory access, and use the preserved destination tag to write x5=12 at 27 seconds while x6 stays zero.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel assembles bundle fields over 60 frames, carries result plus tag over 40 frames, and passes the bundle through MEM over 65 frames; preserve destination-label clearance during transfer; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv08-pipeline-register-data-transfer.tsx)

- [raw.githubusercontent.com](https://raw.githubusercontent.com/ucb-bar/riscv-sodor/master/src/main/scala/sodor/rv32_5stage/dpath.scala) — Primary educational implementation defines operand/control/destination pipeline state and clocked EX→MEM→WB transfers.
- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — RV32I ADD architectural result is the sum of the two source registers written to rd.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmkyld"></a>
## Data Hazard Forwarding Paths

`recvw25utMKYLD` · Video available · review: **passed** · version `v1`

**Learn:** Show how bypassed values replace stale register operands before dependent instructions execute.
**Takeaway:** Forwarding sends a producer’s newest result directly to a dependent operand, avoiding waits for register writeback when that result is ready.

https://github.com/user-attachments/assets/e8c7b21a-975e-44b2-bb99-e263b0a5020e

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/data-hazard-forwarding-paths.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Data Hazard Forwarding Paths: produce 12 with ADD while architectural x5 still holds zero; carry the EX/MEM result backward to replace the next SUB operand with 12 before computing 12-10=2, then route the older MEM/WB value to a later XOR so its input changes from 0000 to 1100 and 1100 XOR 1111 yields 0011, or 3; finish with normal writes x5=12, x6=2, and x7=3 without inserting a bubble.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel carries the producer value along the near and older bypass paths; replace operands at frames 300 and 540, then populate results at 330 and 570 before normal writeback; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv09-data-hazard-forwarding-paths.tsx)

- [raw.githubusercontent.com](https://raw.githubusercontent.com/ucb-bar/riscv-sodor/master/src/main/scala/sodor/rv32_5stage/dpath.scala) — Sodor implements bypass selection by matching destination/source tags and selecting carried values; exact route placement varies by implementation.
- [docs.riscv.org](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — ADD, SUB and XOR operate on source register values and write their rd.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmtqgj"></a>
## Load-Use Pipeline Stall

`recvw25utMtQGj` · Video available · review: **passed** · version `v1`

**Learn:** Explain why a dependent ALU instruction must wait one cycle for a load result in the illustrated pipeline.
**Takeaway:** When load data arrives too late for the next EX stage, hold the consumer and front end, let the load advance, and resume with the returned data.

https://github.com/user-attachments/assets/ed2bdf34-e9b5-4ae6-809c-e06193f6061c

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/load-use-pipeline-stall.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 31-second silent English educational animation for a university digital electronics course on Load-Use Pipeline Stall: distinguish load address 0x3000 from unavailable load data 42 in an illustrative five-stage pipeline with one-cycle memory; advance the load from EX to MEM while holding the consumer in ID, the next instruction in IF, and PC=0x108, and insert a non-writing EX bubble; place returned 42 into MEM/WB, resume the consumer and PC=0x10C, forward 42 into its operand, compute 42+3=45, and compare the one-cycle hold with final x5=42 and x6=45.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel carries memory response and forwarded data; hold the front-end cells while the load advances at frame 270, fill MEM/WB at 510, resume stages at 660, and reveal operand 42 and result 45 at 690 and 720; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv10-load-use-pipeline-stall.tsx)

- [raw.githubusercontent.com](https://raw.githubusercontent.com/ucb-bar/riscv-sodor/master/src/main/scala/sodor/rv32_5stage/cpath.scala) — Sodor fully bypassed control detects load-use dependencies, stalls front end and inserts an EX bubble.
- [raw.githubusercontent.com](https://raw.githubusercontent.com/ucb-bar/riscv-sodor/master/src/main/scala/sodor/rv32_5stage/dpath.scala) — Sodor clears EX valid/register-write/memory-write enables on hazard stall while older instructions advance.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmj0nn"></a>
## Branch Prediction and Misprediction Flush

`recvw25utMj0nN` · Video available · review: **passed** · version `v1`

**Learn:** Trace a wrong not-taken prediction through younger instruction removal, fetch redirection, and preservation of architectural state.
**Takeaway:** A misprediction discards younger wrong-path work; only instructions on the resolved path may change architectural state.

https://github.com/user-attachments/assets/13a6d9c5-ad34-489c-8e25-b6ebc6814ce9

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/branch-prediction-and-misprediction-flush.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Branch Prediction and Misprediction Flush: predict a BEQ at 0x100 as not taken and fetch younger ADDI 99 and STORE 99, then resolve 4=4 as taken with target 0x110; invalidate and remove both younger instruction cards and their 99 payload while x5=7 and RAM at 0x200 remains zero, refill from the correct target, and allow only target ADDI 42 to change x5 from 7 to 42 while the discarded store never writes memory.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 24 in 12-frame steps with 12-frame fades and 16px rises; marker-travel brings comparison values together over 60 frames and carries the correct writeback value over 45 frames; cross out younger cards at frame 360 and remove their cards and payloads at 420; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv11-branch-prediction-and-misprediction-flush.tsx)

- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — BEQ comparison and PC-relative target are ISA semantics. The five-stage pipeline, not-taken predictor, EX resolution, and exact recovery cycles are an illustrative microarchitecture, not ISA requirements.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmdnqx"></a>
## Precise Trap Entry and Return

`recvw25utMdNQX` · Video available · review: **passed** · version `v1`

**Learn:** Follow a precise U-mode ECALL into a direct M-mode handler, inspect saved PC/cause, and return after an explicit software PC adjustment.
**Takeaway:** Trap entry records the ECALL address; the handler chooses the resume address, and MRET loads PC from mepc.

https://github.com/user-attachments/assets/0def91e6-8b4c-4a85-bce4-dad65d3cd219

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/precise-trap-entry-and-return.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 31-second silent English educational animation for a university digital electronics course on Precise Trap Entry and Return: establish that the older instruction has completed x5=7 but younger x6 remains zero before a U-mode ECALL at 0x104; capture mepc=0x104 and mcause=8 while entering M-mode handler 0x800, show software explicitly adding four to mepc to choose 0x108, use MRET to restore PC=0x108 and U-mode, and only then let the resumed instruction write x6=9 while preserving x5.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 24 in 12-frame steps with 12-frame fades and 16px rises; marker-travel carries the older result over 50 frames and the resumed result over 45 frames; capture trap state at frame 240, show the software mepc change at 465, return at 630, and write x6 at 810; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv12-precise-trap-entry-and-return.tsx)

- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20240411/priv/machine.html) — Machine trap CSRs, ECALL and MRET follow Privileged ISA 1.13. Example has U support, no delegation, mtvec Direct=0x800, fixed 32-bit ECALL, and permitted memory. Older/younger instruction display illustrates precise state.
- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — Machine trap CSRs, ECALL and MRET follow Privileged ISA 1.13. Example has U support, no delegation, mtvec Direct=0x800, fixed 32-bit ECALL, and permitted memory. Older/younger instruction display illustrates precise state.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmvsco"></a>
## Privilege Mode Transition

`recvw25utMVScO` · Video available · review: **passed** · version `v1`

**Learn:** Read MPP as saved privilege and demonstrate S→M trap entry followed by an MRET restoration of mode and interrupt-enable stack.
**Takeaway:** Current privilege and saved MPP are different state: trap entry saves the old mode, and MRET consumes that saved mode.

https://github.com/user-attachments/assets/ebbe07cf-1360-4508-9cd7-d1618a194af0

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/privilege-mode-transition.mp4) · 28.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 28-second silent English educational animation for a university digital electronics course on Privilege Mode Transition: distinguish the active hart in S-mode from saved MPP=00 for U-mode; move the hart to M on an undelegated trap while MPP becomes 01, MIE clears from 1 to 0, and MPIE receives 1; use the old saved S-mode during MRET to restore active S and MIE=1 while MPP resets to 00 and MPIE remains 1, then compare active S/M/S against saved U/S/U across the three snapshots.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 24 in 12-frame steps with 12-frame fades and 16px rises; marker-travel carries saved-mode and interrupt-enable tokens over 45 frames; update active and saved state separately at frames 240 and 480 and stagger final state columns by 12 frames; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv13-privilege-mode-transition.tsx)

- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20240411/priv/machine.html) — Privileged ISA1.13 mstatus stack. Example hart supports M/S/U; no delegation or hypervisor; initial S-mode, MIE=1 and MPP=U. ECALL from S has cause9. Access policies are configured to allow the shown handler and return.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmxdlz"></a>
## Sv39 Virtual Address Translation

`recvw25utMxdLZ` · Video available · review: **passed** · version `v2`

**Learn:** Decompose an Sv39 virtual address and follow three eight-byte PTE reads to a4KiB leaf, preserving the12-bit offset.
**Takeaway:** The page walk replaces the VPN with a leaf PPN while the page offset is copied unchanged.

https://github.com/user-attachments/assets/9a074cd4-c090-46da-9690-e38c33f16e61

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/sv39-virtual-address-translation.mp4) · 33.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 33-second silent English educational animation for a university digital electronics course on Sv39 Virtual Address Translation: split virtual address 0x404031A8 into VPN indexes 1/2/3 and offset 0x1A8; read PTEs at 0x80000008, 0x80001010, and 0x80002018 with returned PPNs pending until 8, 13.5, and 19 seconds respectively, then move each returned PPN into an empty receiver over 45 frames before filling it with next base 0x80001000, next base 0x80002000, or leaf PPN 0x12345; form physical address 0x123451A8 at 25 seconds with the original offset unchanged and load physical byte 0x5A into x10.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 24 in 12-frame steps with 12-frame fades and 16px rises; marker-travel moves each returned PPN from (60,395) into receiver (555,505) over exactly 45 frames; only arrival fills that receiver with the shifted next base or leaf PPN, then an unchanged offset travels into address assembly over 90 frames; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv14-sv39-virtual-address-translation.tsx)

- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20240411/priv/supervisor.html) — RV64 Sv39, canonical lower-half address, cold translation and4KiB page; S-mode read with valid accessible tables, U=0,R=1,A=1 leaf. Superpages, faults, TLB behavior and A/D updates are outside this numerical example.

[Back to course top](#risc-v-processor-architecture)

---

<a id="recvw25utmdkk4"></a>
## Memory-Mapped I/O Access

`recvw25utMdKk4` · Video available · review: **passed** · version `v1`

**Learn:** Follow the same RISC-V store/load instructions through address decoding into device registers and observe an actual output-device state change.
**Takeaway:** A load/store targeting a device address transfers data to device state; the platform defines the mapping and register behavior.

https://github.com/user-attachments/assets/fdb5708f-1197-4f80-b87e-bbd4f4dab43d

[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/assets/videos/digital-electronics/risc-v-processor-architecture/memory-mapped-i-o-access.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 30-second silent English educational animation for a university digital electronics course on Memory-Mapped I/O Access: use an illustrative platform mapping to route SW data 1 to GPIO output address 0x10000000 rather than RAM; visibly change output and status from zero to one, raise the pin waveform, and light the LED while RAM remains 55; complete FENCE O,I before returning status 1 from address 0x10000004 into x3, then label a separate RAM-store example where the same data and opcode change a memory cell from 55 to 1 instead of a peripheral output.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 24 in 12-frame steps with 12-frame fades and 16px rises; marker-travel decodes the device address over 90 frames and moves the separate RAM comparison payload over 45 frames; change pin and lamp geometry at frame 405 and fill x3 with returned status at frame 675; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.
````

</details>

**Production:** Remotion; dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/blob/main/assets/source-kits/risc-v-processor-architecture/src/videos/rv15-memory-mapped-i-o-access.tsx)

- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20260120/unpriv/rv32.html) — Illustrative platform device map, not a RISC-V standard address: RAM0x80000000..0x80000FFF; GPIO output0x10000000; GPIO status0x10000004. Naturally aligned32-bit accesses; direct permitted physical addresses. Device writes and status reads are ordered here; show FENCE O,I before readback.
- [docs.riscv.org — supporting reference](https://docs.riscv.org/reference/isa/v20240411/priv/machine.html) — Illustrative platform device map, not a RISC-V standard address: RAM0x80000000..0x80000FFF; GPIO output0x10000000; GPIO status0x10000004. Naturally aligned32-bit accesses; direct permitted physical addresses. Device writes and status reads are ordered here; show FENCE O,I before readback.

[Back to course top](#risc-v-processor-architecture)

---
