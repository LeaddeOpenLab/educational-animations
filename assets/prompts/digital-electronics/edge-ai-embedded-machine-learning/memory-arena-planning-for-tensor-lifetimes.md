# recvw25vjMwJp0 · Memory Arena Planning for Tensor Lifetimes

Version: v1 · alignment: aligned

Create a 30-second silent English animation explaining Memory Arena Planning for Tensor Lifetimes. Draw A as 64 B live in [0, 2), B as 32 B live in [1, 4), and C as 64 B live in [2, 4); preserve B at offset 64 while A expires and C takes offset 0, keeping the arena at 96 B instead of separately reserving 160 B.

Use four scenes lasting 7, 7, 9, and 7 seconds: establish lifetime overlap, place live tensors into disjoint byte ranges, show the exact ownership handoff, and compare capacities. Move the time cursor and draw allocations from the same lifetime state; identify this as a toy example excluding alignment and runtime metadata. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.

Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.
