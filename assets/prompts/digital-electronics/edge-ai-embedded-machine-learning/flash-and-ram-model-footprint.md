# recvw25vjMBlJD · Flash and RAM Model Footprint

Version: v1 · alignment: aligned

Create a 29-second silent English animation explaining Flash and RAM Model Footprint. Separate flash storage from working RAM; change four-byte weights into one-byte weights so stored weights shrink from 256 to 64 KiB while other flash data stays 32 KiB, producing total flash 288 to 96 KiB. Keep the weight-only example’s RAM allocations at input 16, activations 80, scratch 24, and persistent state 8 KiB, totaling 128 KiB.

Use four scenes lasting 6, 8, 9, and 6 seconds: distinguish the banks, replace weight byte cells, accumulate the unchanged RAM allocations, and compare independent before-and-after budgets. Change only the affected segment and label all sizes illustrative; a smaller model file does not prove that RAM fits. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.

Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.
