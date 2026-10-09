# Edge AI and Embedded Machine Learning

[← Digital Electronics](../../README.md#digital-electronics) · [Complete index](../INDEX.md)

15 videos · 0 awaiting production

Course bibliography supplied by the source list: Specific official documentation and research listed per concept. Specific supporting references are listed per concept; missing references are not inferred.

[Download course ZIP](https://github.com/LeaddeOpenLab/educational-animations/releases/download/course-videos-digital-electronics-edge-ai-embedded-machine-learning/edge-ai-embedded-machine-learning-videos.zip) · 15 videos · bundle-1 · updated 2026-10-09T06:28:47Z
Package status: current. Package membership is recorded in its index.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="recvw25vjm9t27"></a>
## Edge Inference Pipeline from Sensor to Result

`recvw25vjM9t27` · Video available · review: **passed** · version `v2`

**Learn:** Trace one sensor sample block through normalization, feature extraction, model evaluation and a local result.
**Takeaway:** Each edge inference stage consumes the previous stage’s actual data; a local decision appears only after computation.

https://github.com/user-attachments/assets/ea43ac05-0134-4c62-976e-e1ea3954f788

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/edge-inference-pipeline-from-sensor-to-result.mp4) · 29.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 29-second silent English animation of Edge Inference Pipeline from Sensor to Result. At 0–6 s, sequentially fill a sensor buffer with 128, 160, 96 and 192; at 6–13 s, subtract 128 and divide by 64 to form signed values 0, 0.5, −0.5 and 1. At 13–21 s, square, average and take the square root to obtain RMS 0.612. At 21–29 s, use the illustrative logits [−RMS, RMS], reveal their normalized softmax scores near 0.227 and 0.773, and select the active class as the local result.

Render a 1920×1080, 16:9 MP4 at 30 fps with no audio, using Helvetica Neue and line height 1.45. Use background layers #0e0e0e, #171b1c and #212629; input #56b4e9, operations #e69f00, results #009e73, clipping or rejection #d55e00, and secondary weights #cc79a7, with strong text #f8fafc and muted text #a8b4c4. Keep concise copy left and a large numerical SVG diagram right; fade and slide labels over 12–18 frames with 10-frame staggering, and bind moving marks, values and arithmetic to the same mechanism state.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge01-edge-inference-pipeline-from-sensor-to-result.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/microcontrollers/get_started) — Official LiteRT microcontroller guide inspected 2026-10-09: supply input tensor, Invoke, retrieve output tensor. Sensor normalization, RMS and two-class softmax are illustrative constructed computations, not claims about a provided model.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmkk0g"></a>
## Quantization from Float32 to Int8

`recvw25vjMkk0g` · Video available · review: **passed** · version `v1`

**Learn:** Convert real values into signed int8 codes and reconstruct them, separating rounding error from saturation.
**Takeaway:** Int8 stores an integer code; scale and zero point recover an approximation, while out-of-range values saturate.

https://github.com/user-attachments/assets/2dd286de-4237-416c-9995-a4758b61a9cd

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/quantization-from-float32-to-int8.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English animation of Quantization from Float32 to Int8. At 0–6 s, place −0.26, 0.14 and 0.87 on a real-value grid with scale 0.1 and zero point −3. At 6–14 s, snap them to int8 codes −6, −2 and 6 and reconstructed values −0.3, 0.1 and 0.9. At 14–22 s, reconstruct code −2 and expose its 0.04 error. At 22–30 s, show input 14 attempting code 137, saturating at 127 and reconstructing to 13.

Render a 1920×1080, 16:9 MP4 at 30 fps with no audio, using Helvetica Neue and line height 1.45. Use background layers #0e0e0e, #171b1c and #212629; input #56b4e9, operations #e69f00, results #009e73, clipping or rejection #d55e00, and secondary weights #cc79a7, with strong text #f8fafc and muted text #a8b4c4. Keep concise copy left and a large numerical SVG diagram right; fade and slide labels over 12–18 frames with 10-frame staggering, and bind moving marks, values and arithmetic to the same mechanism state.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge02-quantization-from-float32-to-int8.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/quantization/quantization_spec) — Official terminology basis from saved course research; all numerical examples are explicitly illustrative.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmam6a"></a>
## Calibration Dataset for Post-Training Quantization

`recvw25vjMaM6A` · Video available · review: **passed** · version `v2`

**Learn:** Show representative calibration inputs collecting activation extrema, then compare clipping under incomplete and representative ranges.
**Takeaway:** Post-training calibration measures activation ranges using representative inputs; missing operating conditions can cause runtime clipping.

https://github.com/user-attachments/assets/303a57a5-a77a-48d7-a46c-1d48c49517ed

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/calibration-dataset-for-post-training-quantization.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 31-second silent English animation of Calibration Dataset for Post-Training Quantization. At 0–7 s, feed representative inputs into a fixed float model and collect activations 0, 0.4, 1 and 2 without changing weights. At 7–14 s, map the observed 0–2 range onto 255 int8 intervals with scale 2/255. At 14–23 s, send the identical runtime value 2 into narrow 0–1 and representative 0–2 calibrations; show reconstructions 1 and 2. At 23–31 s, compare the two grid spacings and their reconstruction of 0.7, making the coverage–precision tradeoff visible.

Render a 1920×1080, 16:9 MP4 at 30 fps with no audio, using Helvetica Neue and line height 1.45. Use background layers #0e0e0e, #171b1c and #212629; input #56b4e9, operations #e69f00, results #009e73, clipping or rejection #d55e00, and secondary weights #cc79a7, with strong text #f8fafc and muted text #a8b4c4. Keep concise copy left and a large numerical SVG diagram right; fade and slide labels over 12–18 frames with 10-frame staggering, and bind moving marks, values and arithmetic to the same mechanism state.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge03-calibration-dataset-for-post-training-quantization.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/conversion/tensorflow/quantization/post_training_quantization) — Official terminology basis from saved course research; all numerical examples are explicitly illustrative.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjm4v2u"></a>
## Per-Channel Weight Quantization

`recvw25vjM4V2u` · Video available · review: **passed** · version `v2`

**Learn:** Compare one shared weight scale with a separate scale for each output channel, making loss in a small-range channel visible.
**Takeaway:** Per-channel scales match different channel ranges and preserve small weights that a large shared scale coarsens.

https://github.com/user-attachments/assets/a770165d-2193-4ece-b511-5d46a0b07a8a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/per-channel-weight-quantization.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English animation of Per-Channel Weight Quantization. At 0–5 s, compare channel A weights 0.01, 0.02 and 0.04 against channel B weights 0.5, 1 and 2. At 5–13 s, quantize with shared scale 2/127 so A codes become 1, 1 and 3. At 13–23 s, use A scale 0.04/127 and keep B scale unchanged; A codes separate into 32, 64 and 127. At 23–30 s, compare absolute reconstruction errors on the same real-value scale and show the smaller per-channel error.

Render a 1920×1080, 16:9 MP4 at 30 fps with no audio, using Helvetica Neue and line height 1.45. Use background layers #0e0e0e, #171b1c and #212629; input #56b4e9, operations #e69f00, results #009e73, clipping or rejection #d55e00, and secondary weights #cc79a7, with strong text #f8fafc and muted text #a8b4c4. Keep concise copy left and a large numerical SVG diagram right; fade and slide labels over 12–18 frames with 10-frame staggering, and bind moving marks, values and arithmetic to the same mechanism state.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge04-per-channel-weight-quantization.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/quantization/quantization_spec) — Official terminology basis from saved course research; all numerical examples are explicitly illustrative.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmleqf"></a>
## Quantized Multiply and Accumulate

`recvw25vjMlEQf` · Video available · review: **passed** · version `v2`

**Learn:** Subtract the input zero point, multiply int8 operands, accumulate in int32 and convert the accumulated result back to real/output units.
**Takeaway:** Quantized MAC operates on centered integer codes; the int32 sum represents a real value scaled by the product of input and weight scales.

https://github.com/user-attachments/assets/a1c98fae-2d2a-47db-a330-98aec2bb639d

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/quantized-multiply-and-accumulate.mp4) · 33.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 33-second silent English animation of Quantized Multiply and Accumulate. At 0–6 s, subtract input zero point 3 from codes [5, 7, 4] to obtain [2, 4, 1]. At 6–12 s, multiply by weights [2, −1, 3] to form products [4, −4, 3]. At 12–21 s, move each product into an int32 accumulator whose sum changes 0 to 4 to 0 to 3. At 21–27 s, multiply by scales 0.2 × 0.1 to obtain real output 0.06. At 27–33 s, requantize with output scale 0.01 and zero point −2 to produce int8 code 4; omit bias in this example.

Render a 1920×1080, 16:9 MP4 at 30 fps with no audio, using Helvetica Neue and line height 1.45. Use background layers #0e0e0e, #171b1c and #212629; input #56b4e9, operations #e69f00, results #009e73, clipping or rejection #d55e00, and secondary weights #cc79a7, with strong text #f8fafc and muted text #a8b4c4. Keep concise copy left and a large numerical SVG diagram right; fade and slide labels over 12–18 frames with 10-frame staggering, and bind moving marks, values and arithmetic to the same mechanism state.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge05-quantized-multiply-and-accumulate.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/quantization/quantization_spec) — Official terminology basis from saved course research; all numerical examples are explicitly illustrative.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjm41mv"></a>
## Model Operator Compatibility Check

`recvw25vjM41mv` · Video available · review: **passed** · version `v1`

**Learn:** Explain why every model operator needs a compatible registered kernel before inference can produce an output.
**Takeaway:** Every required operator needs a compatible kernel before model inference can produce an output.

https://github.com/user-attachments/assets/c7fb254d-705d-4157-b37f-da7c86475f2f

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/model-operator-compatibility-check.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English animation explaining Model Operator Compatibility Check. Match model requirements MUL and RELU against a runtime registry, leave the inference output empty while RELU has no kernel, register the missing compatible kernel, then compute [2, -1, 3] × [1, 2, 1] = [2, -2, 3] and the RELU output [2, 0, 3].

Use four scenes lasting 6, 7, 8, and 9 seconds: resolve requirements, expose the missing implementation, register it, then compute the two tensor operations. Keep numerical output absent until actual evaluation; note that type, shape, and operator version also need compatibility checks. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge06-model-operator-compatibility-check.tsx)

- [github.com](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/micro_mutable_op_resolver.h) — MicroMutableOpResolver provides explicit operator registration and FindOp lookup; compatibility includes kernel constraints, so name matching alone is an illustrative prerequisite.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmwjp0"></a>
## Memory Arena Planning for Tensor Lifetimes

`recvw25vjMwJp0` · Video available · review: **passed** · version `v1`

**Learn:** Show how nonoverlapping tensor lifetimes let different tensors reuse the same arena bytes while simultaneously live tensors retain separate storage.
**Takeaway:** Non-overlapping tensor lifetimes may reuse the same bytes; peak live storage governs this toy arena capacity.

https://github.com/user-attachments/assets/9abb1537-b798-4eaf-b037-e42e235eea0f

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/memory-arena-planning-for-tensor-lifetimes.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English animation explaining Memory Arena Planning for Tensor Lifetimes. Draw A as 64 B live in [0, 2), B as 32 B live in [1, 4), and C as 64 B live in [2, 4); preserve B at offset 64 while A expires and C takes offset 0, keeping the arena at 96 B instead of separately reserving 160 B.

Use four scenes lasting 7, 7, 9, and 7 seconds: establish lifetime overlap, place live tensors into disjoint byte ranges, show the exact ownership handoff, and compare capacities. Move the time cursor and draw allocations from the same lifetime state; identify this as a toy example excluding alignment and runtime metadata. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge07-memory-arena-planning-for-tensor-lifetimes.tsx)

- [github.com](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/docs/memory_management.md) — Tensor arena separates nonpersistent and persistent allocations; temporary tensor lifetimes affect reusable arena allocation.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmbljd"></a>
## Flash and RAM Model Footprint

`recvw25vjMBlJD` · Video available · review: **passed** · version `v1`

**Learn:** Separate persistent model storage in flash from runtime working memory in RAM, and show why weight-only quantization does not imply quarter-size total RAM.
**Takeaway:** Smaller stored weights reduce flash use without necessarily reducing working RAM.

https://github.com/user-attachments/assets/9501931a-9186-40f7-b83b-317892cc2f95

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/flash-and-ram-model-footprint.mp4) · 29.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 29-second silent English animation explaining Flash and RAM Model Footprint. Separate flash storage from working RAM; change four-byte weights into one-byte weights so stored weights shrink from 256 to 64 KiB while other flash data stays 32 KiB, producing total flash 288 to 96 KiB. Keep the weight-only example’s RAM allocations at input 16, activations 80, scratch 24, and persistent state 8 KiB, totaling 128 KiB.

Use four scenes lasting 6, 8, 9, and 6 seconds: distinguish the banks, replace weight byte cells, accumulate the unchanged RAM allocations, and compare independent before-and-after budgets. Change only the affected segment and label all sizes illustrative; a smaller model file does not prove that RAM fits. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge08-flash-and-ram-model-footprint.tsx)

- [github.com](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/docs/memory_management.md) — Tensor arena separates nonpersistent and persistent allocations; temporary tensor lifetimes affect reusable arena allocation.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjm9ca5"></a>
## Structured Pruning for Edge Deployment

`recvw25vjM9Ca5` · Video available · review: **passed** · version `v1`

**Learn:** Demonstrate structured channel removal by deleting one output channel and its matching input slice in the next layer, then compact both tensor shapes.
**Takeaway:** Structured pruning removes a channel and its matching downstream input slice; the reduced model still requires validation.

https://github.com/user-attachments/assets/38a74520-adc0-42db-952b-168ecaab0e81

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/structured-pruning-for-edge-deployment.mp4) · 31.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 31-second silent English animation explaining Structured Pruning for Edge Deployment. Start with features [2, 0.1, 1, 3] and downstream weights [[1, 0.2, 2, 1], [0, 0.3, 1, 2]], select channel c1 and its matching downstream input column, remove both, compact the features to [2, 1, 3] and weights to [[1, 2, 1], [0, 1, 2]], then recompute outputs from [7.02, 7.03] to [7, 7].

Use four scenes lasting 6, 6, 10, and 9 seconds: expose channel correspondence, select the coupled slice, physically delete and compact tensor cells, and evaluate six remaining multiply terms instead of eight. Preserve original channel names as the cells move; emphasize validation and fine-tuning, without promising universal device speedup. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge09-structured-pruning-for-edge-deployment.tsx)

- [arxiv.org](https://arxiv.org/abs/1512.08571) — Structured sparsity can remove channel and kernel structures; retraining compensates for pruning loss.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjm2gbi"></a>
## Knowledge Distillation to a Small Model

`recvw25vjM2GBi` · Video available · review: **passed** · version `v1`

**Learn:** Show a fixed teacher probability distribution guiding successive updates of a smaller student, which alone is used at deployment.
**Takeaway:** A fixed teacher guides a smaller student during training; only the student needs to run on the edge device.

https://github.com/user-attachments/assets/498aac01-01f1-4c13-87ec-e0748d0ac6da

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/knowledge-distillation-to-a-small-model.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English animation explaining Knowledge Distillation to a Small Model. Keep the teacher’s soft targets fixed at [0.65, 0.25, 0.10], show the smaller student starting at [0.33, 0.34, 0.33], then update only student parameters and probability bars through normalized illustrative states toward [0.60, 0.27, 0.13]. Finish by placing only the student inside the edge device.

Use four scenes lasting 6, 6, 12, and 6 seconds: establish the frozen teacher, compare classwise distributions on equal probability scales, animate student-only learning, and separate deployment from training. State that soft-target loss often combines with label loss, and that shown model sizes and training states are illustrative. Render at 1920×1080, 30 fps, in Helvetica Neue with 1.45 line height; use #0e0e0e, #171b1c, and #212629 backgrounds, #56b4e9 inputs, #e69f00 operations, #009e73 results, #d55e00 warnings, and #cc79a7 stored weights or a second model. Stagger text and figure entrances over 12–15 frames while keeping the mechanism itself numerically exact.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge10-knowledge-distillation-to-a-small-model.tsx)

- [keras.io](https://keras.io/examples/vision/knowledge_distillation/) — Teacher predictions and labels train the student; the teacher remains frozen.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmvxp1"></a>
## On-Device Feature Extraction

`recvw25vjMVXP1` · Video available · review: **passed** · version `v2`

**Learn:** Compute a compact RMS feature from a sensor window, and show the information it discards.
**Takeaway:** A feature summarizes a property rather than retaining the whole signal

https://github.com/user-attachments/assets/dfe61817-d378-4ca4-a606-1d11da83f4c0

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/on-device-feature-extraction.mp4) · 28.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 28-second silent English digital electronics animation about On-Device Feature Extraction: show signed samples [-1,1,-1,1] becoming four squared contributions, accumulate their sum, divide by four and take the square root to obtain RMS 1, then replace the waveform with [1,1,1,1] so the mean changes from 0 to 1 while RMS stays 1.

Dark backgrounds #0e0e0e, #171b1c and #212629; primary #56b4e9 identifies inputs and data, accent #e69f00 highlights the active quantity, result #009e73 marks the computed outcome, warn #d55e00 marks rejected states graphically, and alternate #cc79a7 distinguishes secondary categories; Helvetica Neue with bold headings and readable numerical labels; stagger-in signed stems and square cells over 12-frame entrances, marker-travel into each square over 28 frames, accumulate four contributions between frames 380 and 515, and change the waveform at frame 700, using 30 fps and keeping the final conclusion visible for reading.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge11-on-device-feature-extraction.tsx)

- [docs.edgeimpulse.com — supporting reference](https://docs.edgeimpulse.com/docs/edge-impulse-studio/processing-blocks/spectral-features) — Compute a compact RMS feature from a sensor window, and show the information it discards.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmcsue"></a>
## Streaming Inference with Sliding Windows

`recvw25vjMcsUe` · Video available · review: **passed** · version `v1`

**Learn:** Advance a four-sample inference window by two samples and preserve its overlap.
**Takeaway:** Overlap increases output frequency without shortening the required context

https://github.com/user-attachments/assets/36b263bf-2e30-4f7c-90ca-87cd3196eebd

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/streaming-inference-with-sliding-windows.mp4) · 27.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 27-second silent English digital electronics animation about Streaming Inference with Sliding Windows: keep an eight-sample waveform fixed while a four-sample selection advances from indexes 0–3 to 2–5 and 4–7, visibly retain two input values per hop, recompute RMS for each selected input and mark output arrivals after samples 3, 5 and 7.

Dark backgrounds #0e0e0e, #171b1c and #212629; primary #56b4e9 identifies inputs and data, accent #e69f00 highlights the active quantity, result #009e73 marks the computed outcome, warn #d55e00 marks rejected states graphically, and alternate #cc79a7 distinguishes secondary categories; Helvetica Neue with bold headings and readable numerical labels; stagger-in buffer cells over 12 frames with 10-frame offsets, move the selection by two samples until frames 340 and 580, update input identities and RMS at those boundaries, then hold the output schedule, using 30 fps and keeping the final conclusion visible for reading.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge12-streaming-inference-with-sliding-windows.tsx)

- [docs.edgeimpulse.com — supporting reference](https://docs.edgeimpulse.com/hardware/deployments/run-cpp) — Advance a four-sample inference window by two samples and preserve its overlap.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmkzj2"></a>
## Hardware Delegate Operator Partitioning

`recvw25vjMKZj2` · Video available · review: **passed** · version `v1`

**Learn:** Partition supported operators onto a delegate while a CPU-only operation forces two handoffs.
**Takeaway:** Acceleration must include handoff costs, not just supported-operator count

https://github.com/user-attachments/assets/edc86980-fd78-4140-bb5f-e24a80aaf75a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/hardware-delegate-operator-partitioning.mp4) · 28.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 28-second silent English digital electronics animation about Hardware Delegate Operator Partitioning: place Conv, ReLU and Dense sum on a delegate lane while Custom +1 remains on CPU, track the actual tensor from [-2,3] through [0,3] and [1,4] to [5], and count the two device crossings.

Dark backgrounds #0e0e0e, #171b1c and #212629; primary #56b4e9 identifies inputs and data, accent #e69f00 highlights the active quantity, result #009e73 marks the computed outcome, warn #d55e00 marks rejected states graphically, and alternate #cc79a7 distinguishes secondary categories; Helvetica Neue with bold headings and readable numerical labels; partition the actual operator nodes at frame 170, use marker-travel for tensor handoffs, compute CPU output at frame 500 and the final sum at frame 610, then hold the crossing count, using 30 fps and keeping the final conclusion visible for reading.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge13-hardware-delegate-operator-partitioning.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/performance/implementing_delegate) — Partition supported operators onto a delegate while a CPU-only operation forces two handoffs.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25vjmrg6a"></a>
## Latency and Energy Measurement on Device

`recvw25vjMRg6A` · Video available · review: **passed** · version `v1`

**Learn:** Measure inference latency and integrate sampled power to obtain energy.
**Takeaway:** Compare both latency and energy on-device; values here are illustrative

https://github.com/user-attachments/assets/2d32d9fd-b19f-422e-b2dd-ab8f5c43b2cd

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/latency-and-energy-measurement-on-device.mp4) · 27.5 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 27.5-second silent English digital electronics animation about Latency and Energy Measurement on Device: compare illustrative traces of 100 mW for 10 ms and 300 mW for 5 ms, accumulate power-times-interval slices into 1000 and 1500 microjoules, convert to 1 and 1.5 millijoules, and show that half the latency can use 50% more energy.

Dark backgrounds #0e0e0e, #171b1c and #212629; primary #56b4e9 identifies inputs and data, accent #e69f00 highlights the active quantity, result #009e73 marks the computed outcome, warn #d55e00 marks rejected states graphically, and alternate #cc79a7 distinguishes secondary categories; Helvetica Neue with bold headings and readable numerical labels; count-up one power slice every 20 frames from frame 165, finish the integral at frame 345, combine slice rectangles and compare independent latency and energy bars in the final scene, using 30 fps and keeping the final conclusion visible for reading.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge14-latency-and-energy-measurement-on-device.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/next/benchmark) — Measure inference latency and integrate sampled power to obtain energy.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---

<a id="recvw25wapjvfx"></a>
## Confidence Threshold for Edge Classification

`recvw25wapJvFX` · Video available · review: **passed** · version `v2`

**Learn:** Compare a classifier maximum score with a threshold and abstain when confidence is insufficient.
**Takeaway:** The equality boundary is accepted; confidence is not a correctness guarantee

https://github.com/user-attachments/assets/5c883358-0919-43c5-b11a-23682c1cf29e

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/digital-electronics/edge-ai-embedded-machine-learning/confidence-threshold-for-edge-classification.mp4) · 26.5 s · 1920×1080 · mp4

**Public prompt:** aligned. Final approved Prompt, exact source kit and version-matched review evidence supplied; clean-machine reproduction has not been verified.

<details>
<summary>View and copy Prompt</summary>

````text
A 26.5-second silent English digital electronics animation about Confidence Threshold for Edge Classification: compare a maximum class score of 0.600 against a threshold of 0.700, return unknown below the threshold, move the normalized score distribution across that boundary and accept A only when the rule is met, then show that equality at 0.700 is accepted without implying guaranteed correctness.

Dark backgrounds #0e0e0e, #171b1c and #212629; primary #56b4e9 identifies inputs and data, accent #e69f00 highlights the active quantity, result #009e73 marks the computed outcome, warn #d55e00 marks rejected states graphically, and alternate #cc79a7 distinguishes secondary categories; Helvetica Neue with bold headings and readable numerical labels; stagger-in class bars and decision output, move normalized scores from frames 390 to 490, change the decision at frame 436, show three-decimal labels near the boundary, and demonstrate exact equality at frame 670, using 30 fps and keeping the final conclusion visible for reading.
````

</details>

**Production:** Remotion; dependencies: Remotion4.0.410, React19.0.0, TypeScript5.8.2, FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/edge-ai-embedded-machine-learning/src/videos/edge15-confidence-threshold-for-edge-classification.tsx)

- [developers.google.com — supporting reference](https://developers.google.com/edge/litert/libraries/task_library/image_classifier) — Compare a classifier maximum score with a threshold and abstain when confidence is insufficient.

[Back to course top](#edge-ai-and-embedded-machine-learning)

---
