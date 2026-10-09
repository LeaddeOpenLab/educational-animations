# recvw25utM8s8D · Program Counter Update for Branches

Version: v1 · alignment: aligned

A 30-second silent English educational animation for a university digital electronics course on Program Counter Update for Branches: compute fall-through 0x104 and target 0x110 from branch PC 0x100 with displacement 16; compare 7 with 7, install 0x110 in the PC at 15 seconds, and relocate the fetch selection past 0x104 and 0x108; replay the same branch with 7 and 9 so PC and fetch select 0x104 at 23 seconds, then compare the taken and not-taken destinations.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 20 in 11-frame steps with 12-frame fades and 16px rises; marker-travel splits PC candidates over 65 frames and moves the fetch selection at frames 450 and 690; keep selected next-PC and stored-PC cells distinct until each update; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.

Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.
