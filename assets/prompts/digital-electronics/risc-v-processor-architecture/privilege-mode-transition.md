# recvw25utMVScO · Privilege Mode Transition

Version: v1 · alignment: aligned

A 28-second silent English educational animation for a university digital electronics course on Privilege Mode Transition: distinguish the active hart in S-mode from saved MPP=00 for U-mode; move the hart to M on an undelegated trap while MPP becomes 01, MIE clears from 1 to 0, and MPIE receives 1; use the old saved S-mode during MRET to restore active S and MIE=1 while MPP resets to 00 and MPIE remains 1, then compare active S/M/S against saved U/S/U across the three snapshots.

Use a radial dark background from #142238 through #0d1626 to #070b12 with a 72px grid and a #60a5fa glow; primary #60a5fa marks main fields, registers, or paths, accent #fbbf24 marks carried values and selected quantities, result #34d399 marks completed values or valid selections, and warn #f87171 marks discarded or unavailable work; use Helvetica Neue with Helvetica, Arial, Segoe UI, and sans-serif fallbacks, 50px headings at weight 700, 30px body copy, and 21px uppercase kickers with 5px tracking; at 30 fps, slide-up headings 22px over 16 frames from frame 8 and stagger-in copy from frame 24 in 12-frame steps with 12-frame fades and 16px rises; marker-travel carries saved-mode and interrupt-enable tokens over 45 frames; update active and saved state separately at frames 240 and 480 and stagger final state columns by 12 frames; provide the Remotion source and course kit with Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, Node.js, a Chromium render environment, and FFmpeg, with 1920x1080 H264 MP4 output and no audio; exact reproduction on a clean machine has not been verified.

Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.
