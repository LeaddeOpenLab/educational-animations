# recvw25vjMlEQf · Quantized Multiply and Accumulate

Version: v2 · alignment: aligned

Create a 33-second silent English animation of Quantized Multiply and Accumulate. At 0–6 s, subtract input zero point 3 from codes [5, 7, 4] to obtain [2, 4, 1]. At 6–12 s, multiply by weights [2, −1, 3] to form products [4, −4, 3]. At 12–21 s, move each product into an int32 accumulator whose sum changes 0 to 4 to 0 to 3. At 21–27 s, multiply by scales 0.2 × 0.1 to obtain real output 0.06. At 27–33 s, requantize with output scale 0.01 and zero point −2 to produce int8 code 4; omit bias in this example.

Render a 1920×1080, 16:9 MP4 at 30 fps with no audio, using Helvetica Neue and line height 1.45. Use background layers #0e0e0e, #171b1c and #212629; input #56b4e9, operations #e69f00, results #009e73, clipping or rejection #d55e00, and secondary weights #cc79a7, with strong text #f8fafc and muted text #a8b4c4. Keep concise copy left and a large numerical SVG diagram right; fade and slide labels over 12–18 frames with 10-frame staggering, and bind moving marks, values and arithmetic to the same mechanism state.

Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.
