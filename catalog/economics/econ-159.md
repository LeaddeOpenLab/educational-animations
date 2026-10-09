# Game Theory

[← Economics](../../README.md#economics) · [Complete index](../INDEX.md)

12 videos · 0 awaiting production

Course bibliography supplied by the source list: Strategy and Games (Dutta); Strategy (Watson). Specific supporting references are listed per concept; missing references are not inferred.

[Download course ZIP](https://github.com/LeaddeOpenLab/educational-animations/releases/download/course-videos-economics-econ-159/econ-159-videos.zip) · 12 videos · bundle-2 · updated 2026-10-09T09:42:20Z
Package status: current. Package membership is recorded in its index.

[Explore Leadde animation tools](https://leadde.ai/animation). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.

---

<a id="c15-a001"></a>
## Dominant Strategy

`C15-A001` · Video available · review: **passed** · version `economics-game-macro-20261009-v2`

**Learn:** Distinguish a dominant action from a merely good response.
**Takeaway:** The winning row remains Low in both comparisons, so A has a strictly dominant action.

https://github.com/user-attachments/assets/a797068e-cca7-4107-a189-82765df51c6a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt01-dominant-strategy.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Dominant Strategy for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: Two competing cafés choose high or low prices; compare Café A's payoff for each fixed Café B price. Learning objective: Distinguish a dominant action from a merely good response. Use this actual scene timing: 0–6s: Café pricing choices and payoff meaning; 6–13s: Compare A when B is High; 13–21s: Compare B's Low choice, then align the winners; 21–30s: Conclude dominance is conditional on every opponent choice. Drive objects and values from one state model. Numerical setup: {"rows":["High","Low"],"cols":["High","Low"],"payoffs":[[[3,3],[1,4]],[[4,1],[2,2]]],"dominant_row":"Low"}. Demonstrate Hold B at High, compare A's two payoffs; repeat with B at Low. Then The winning row remains Low in both comparisons, so A has a strictly dominant action. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not infer dominance from the largest payoff in the entire matrix. Reproduce from the supplied source kit game-theory, src/videos/gt01-dominant-strategy.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v2 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt01-dominant-strategy.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a002"></a>
## Iterative Deletion

`C15-A002` · Video available · review: **passed** · version `economics-game-macro-20261009-v2`

**Learn:** Show why iterative deletion requires recomputing the reduced game.
**Takeaway:** Premium vanishes first; only then is B's Niche column strictly dominated and removed.

https://github.com/user-attachments/assets/2f2d0e37-29f9-4786-9c2c-79bb83c38bd0

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt02-iterative-deletion.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Iterative Deletion for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: A 3×3 product launch game where A's Premium line is dominated first, then B's niche response becomes dominated in the remaining rows. Learning objective: Show why iterative deletion requires recomputing the reduced game. Use this actual scene timing: 0–4s: Full action menu; 4–10s: Compare Premium versus Standard across all columns; 10–14s: Delete Premium row; 14–20s: Recheck the remaining columns; 20–25s: Recompute B's choices in the reduced game; 25–30s: Delete Niche and identify the survivor set. Drive objects and values from one state model. Numerical setup: {"rows":["Standard","Premium","Basic"],"cols":["Regular","Niche","Plus"],"payoffs":[[[4,3],[4,2],[4,5]],[[2,0],[2,1],[2,0]],[[3,3],[5,2],[1,0]]],"first_delete_row":"Premium","then_delete_col":"Niche"}. Demonstrate Compare Premium with Standard for every B column and delete Premium; recompute B's payoffs on remaining rows. Then Premium vanishes first; only then is B's Niche column strictly dominated and removed. Preserve the visible comparison that proves the result. Avoid this pitfall: Never delete a strategy merely because it loses at one cell. Reproduce from the supplied source kit game-theory, src/videos/gt02-iterative-deletion.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v2 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt02-iterative-deletion.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a003"></a>
## Pure Strategy Nash Equilibrium

`C15-A003` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Locate a pure Nash equilibrium as mutual best responses, not a global maximum.
**Takeaway:** Two sets of marks intersect in one cell; deviations from that cell reduce the deviator's own payoff.

https://github.com/user-attachments/assets/37298c48-dba5-425a-a88b-58f860e1ed8a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt03-pure-strategy-nash-equilibrium.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Pure Strategy Nash Equilibrium for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: Two firms choose Advertise or Stay Quiet; each receives the two payoffs in a cell. Learning objective: Locate a pure Nash equilibrium as mutual best responses, not a global maximum. Use this actual scene timing: 0–5s: Define cell payoffs; 5–12s: Mark A's best response in each column; 12–19s: Mark B's best response in each row; 19–25s: Reveal the intersection; 25–30s: Try both unilateral deviations. Drive objects and values from one state model. Numerical setup: {"rows":["Cooperate","Defect"],"cols":["Cooperate","Defect"],"payoffs":[[[3,3],[0,5]],[[5,0],[1,1]]],"nash":[1,1]}. Demonstrate Hold each rival action fixed while computing one player's best response, then switch players. Then Two sets of marks intersect in one cell; deviations from that cell reduce the deviator's own payoff. Preserve the visible comparison that proves the result. Avoid this pitfall: A Nash cell need not maximize combined payoff. Reproduce from the supplied source kit game-theory, src/videos/gt03-pure-strategy-nash-equilibrium.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt03-pure-strategy-nash-equilibrium.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a004"></a>
## Mixed Strategy

`C15-A004` · Video available · review: **passed** · version `economics-game-macro-20261009-v2`

**Learn:** Explain a mixed strategy as a probability distribution over pure actions.
**Takeaway:** The allocation of probability mass changes and individual outcomes vary; no single realized kick equals the distribution.

https://github.com/user-attachments/assets/da01ca4f-22a7-48ac-9552-2ab74c6eecac

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt04-mixed-strategy.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Mixed Strategy for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: A goalkeeper randomizes Left and Right against a penalty taker. Learning objective: Explain a mixed strategy as a probability distribution over pure actions. Use this actual scene timing: 0–5s: Two pure saves; 5–13s: Move probability mass to both actions; 13–23s: Show several draws at fixed p; 23–30s: Distinguish strategy distribution from one realized action. Drive objects and values from one state model. Numerical setup: {"p_before":0,"p_after":0.65,"draws":["Left","Right","Left","Left","Right"]}. Demonstrate Increase p to a chosen interior probability and run several draws from a fixed sample sequence. Then The allocation of probability mass changes and individual outcomes vary; no single realized kick equals the distribution. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not call every nonzero mixture an equilibrium. Reproduce from the supplied source kit game-theory, src/videos/gt04-mixed-strategy.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v2 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt04-mixed-strategy.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a005"></a>
## Mixed Strategy Nash Equilibrium

`C15-A005` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Derive mixing probabilities from two indifference conditions.
**Takeaway:** Each opponent becomes indifferent at its computed crossing; both conditions jointly determine equilibrium.

https://github.com/user-attachments/assets/c4639058-96e4-4aca-ba58-5d89834bc416

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt05-mixed-strategy-nash-equilibrium.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Mixed Strategy Nash Equilibrium for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: Matching Pennies: row player chooses Heads/Tails, column player guesses Heads/Tails. Learning objective: Derive mixing probabilities from two indifference conditions. Use this actual scene timing: 0–5s: Matching-payoff matrix; 5–9s: Column player's expected payoffs against p; 9–15s: Solve p at the crossing; 15–20s: At the final p,q both within-player expected payoff differences equal zero.; 20–25s: Row player's expected payoffs against q; 25–30s: Show both ties together. Drive objects and values from one state model. Numerical setup: {"rows":["Heads","Tails"],"cols":["Heads","Tails"],"payoffs":[[[2,0],[0,3]],[[0,4],[3,0]]],"p_row_heads":0.5714285714285714,"q_col_heads":0.6}. Demonstrate Move p until column payoffs tie; independently move q until row payoffs tie. Then Each opponent becomes indifferent at its computed crossing; both conditions jointly determine equilibrium. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not confuse p (row mix) with q (column mix), or choose 50% without calculation in a non-symmetric example. Reproduce from the supplied source kit game-theory, src/videos/gt05-mixed-strategy-nash-equilibrium.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt05-mixed-strategy-nash-equilibrium.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a006"></a>
## Sequential Game

`C15-A006` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Make action order and observed choices explicit in an extensive-form game.
**Takeaway:** Only the reached terminal payoff is realized, while Stay Out remains a visible alternative.

https://github.com/user-attachments/assets/6bf59779-0acf-4393-b013-08dd8817b75b

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt06-sequential-game.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Sequential Game for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: An entrant decides Enter or Stay Out; incumbent then chooses Fight or Accommodate after entry. Learning objective: Make action order and observed choices explicit in an extensive-form game. Use this actual scene timing: 0–5s: Players and available actions; 5–11s: Incumbent observes entry; 11–21s: Incumbent chooses and payoff arrives; 21–30s: Compare the unreached Stay Out branch. Drive objects and values from one state model. Numerical setup: {"out":[2,4],"enter_fight":[-1,0],"enter_accommodate":[4,2],"play_path":["Enter","Accommodate"]}. Demonstrate Entrant chooses Enter, revealing the incumbent's decision node; incumbent then chooses a branch. Then Only the reached terminal payoff is realized, while Stay Out remains a visible alternative. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not treat the tree as a simultaneous payoff matrix. Reproduce from the supplied source kit game-theory, src/videos/gt06-sequential-game.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt06-sequential-game.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a007"></a>
## Backward Induction

`C15-A007` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Compute backward induction from terminal choices to the root.
**Takeaway:** Accept is selected at the last node; its supplier payoff 4 is brought back and compared with Standard payoff 2.

https://github.com/user-attachments/assets/5a49e5c8-a984-4b08-b602-9e76e9e5004a

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt07-backward-induction.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Backward Induction for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: A supplier first chooses Rush or Standard shipping; after Rush, a retailer chooses Accept or Reject the surcharge. Learning objective: Compute backward induction from terminal choices to the root. Use this actual scene timing: 0–5s: Shipping tree and payoffs; 5–11s: Compare retailer payoffs after Rush; 11–16s: Carry the Accept outcome back; 16–23s: Compare Rush with Standard at supplier root; 23–30s: Trace the chosen shipping path. Drive objects and values from one state model. Numerical setup: {"standard":[2,2],"rush_accept":[4,3],"rush_reject":[0,1],"retailer_choice":"Accept","supplier_choice":"Rush"}. Demonstrate Compare retailer payoffs at the Rush node: Accept gives 3, Reject gives 1. Then Accept is selected at the last node; its supplier payoff 4 is brought back and compared with Standard payoff 2. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not compare supplier payoffs at the retailer decision node. Reproduce from the supplied source kit game-theory, src/videos/gt07-backward-induction.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt07-backward-induction.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a008"></a>
## Subgame Refinement

`C15-A008` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Show why subgame perfection rejects a Nash threat that fails in a proper subgame.
**Takeaway:** The threatened continuation fails locally; substitute Accommodate and recompute the root choice.

https://github.com/user-attachments/assets/1a3b013d-3157-4908-a307-45670ba3497b

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt08-subgame-refinement.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Subgame Refinement for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: A market-entry threat: incumbent promises to Fight entry, but would earn more by Accommodating if entry occurs. Learning objective: Show why subgame perfection rejects a Nash threat that fails in a proper subgame. Use this actual scene timing: 0–5s: Candidate Nash strategy; 5–9s: Draw proper subgame boundary; 9–14s: Test Fight versus Accommodate inside it; 14–19s: The final strategy is optimal in the whole game and in the boxed proper subgame.; 19–25s: Replace failed continuation and revisit root; 25–30s: Conclude every subgame must pass. Drive objects and values from one state model. Numerical setup: {"out":[2,4],"enter_fight":[-1,0],"enter_accommodate":[4,2],"candidate":["Stay Out","Fight"],"refined":["Enter","Accommodate"]}. Demonstrate Enter the proper subgame and compare incumbent payoffs there. Then The threatened continuation fails locally; substitute Accommodate and recompute the root choice. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not describe every node as a subgame; an information set cannot be cut. Reproduce from the supplied source kit game-theory, src/videos/gt08-subgame-refinement.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt08-subgame-refinement.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a009"></a>
## Credible Threat

`C15-A009` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Test whether a threat is credible at the moment it would be executed.
**Takeaway:** The firm would concede, so the closure promise is discarded and workers rationally demand.

https://github.com/user-attachments/assets/55943341-d741-4b70-bb3e-4a07b44bff3b

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt09-credible-threat.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Credible Threat for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: A firm threatens to close a factory if workers demand a raise, but closing is costly once a demand arrives. Learning objective: Test whether a threat is credible at the moment it would be executed. Use this actual scene timing: 0–5s: Closure threat in wage negotiation; 5–12s: Workers consider accepting current pay; 12–18s: Enter the demand node and compare firm payoffs; 18–25s: Replace Close with Concede; 25–30s: Workers reconsider their wage demand. Drive objects and values from one state model. Numerical setup: {"accept_current":[2,4],"demand_close":[0,1],"demand_concede":[4,3],"threat":"Close","actual":"Concede"}. Demonstrate Suppose workers demand a raise and compare the firm payoff from Closing (1) versus Conceding (3). Then The firm would concede, so the closure promise is discarded and workers rationally demand. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not treat an announced closure as credible just because it was announced. Reproduce from the supplied source kit game-theory, src/videos/gt09-credible-threat.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt09-credible-threat.tsx)

- [MIT OCW — Introduction to Game Theory](https://www.ocw.mit.edu/courses/14-75-political-economy-and-economic-development-fall-2012/bf65c969a9bfd655e50589ba7283cda8_MIT14_75F12_Recitation8.pdf) — Best responses, dominance and Nash equilibrium terminology
- [MIT OCW — Backward Induction](https://www.ocw.mit.edu/courses/15-025-game-theory-for-strategic-advantage-spring-2015/resources/mit15_025s15_lec_7/) — Sequential decisions and backward induction
- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a010"></a>
## Asymmetric Information

`C15-A010` · Video available · review: **passed** · version `economics-game-macro-20261009-v1`

**Learn:** Explain asymmetric information by separating true state from observed state.
**Takeaway:** Buyer still faces two possible quality nodes in one information set and must choose without conditioning on hidden quality.

https://github.com/user-attachments/assets/48100d6c-f6a1-437e-8660-80d65fab78d3

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt10-asymmetric-information.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Asymmetric Information for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: A seller privately knows a used car's quality; a buyer sees only its posted price. Learning objective: Explain asymmetric information by separating true state from observed state. Use this actual scene timing: 0–5s: Two car qualities; 5–12s: Seller sees it; buyer sees only the price; 12–21s: Join buyer nodes in one information set; 21–30s: Compare full versus partial information choices. Drive objects and values from one state model. Numerical setup: {"types":["High","Low"],"type_probabilities":[0.5,0.5],"posted_price":6,"buyer_observation":"price only"}. Demonstrate Seller posts a common price that does not reveal type. Then Buyer still faces two possible quality nodes in one information set and must choose without conditioning on hidden quality. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not draw separate buyer decisions for each true type when the buyer cannot distinguish them. Reproduce from the supplied source kit game-theory, src/videos/gt10-asymmetric-information.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v1 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt10-asymmetric-information.tsx)

- [OpenStax — Imperfect and asymmetric information](https://openstax.org/books/principles-economics-3e/pages/16-1-the-problem-of-imperfect-information-and-asymmetric-information) — Hidden quality and the adverse-selection feedback example

[Back to course top](#game-theory)

---

<a id="c15-a011"></a>
## Signaling

`C15-A011` · Video available · review: **passed** · version `economics-game-macro-20261009-v2`

**Learn:** Explain a separating signal through different type-specific costs and receiver response.
**Takeaway:** Observed certificate now maps to high type, so employer's action differs by signal.

https://github.com/user-attachments/assets/a0942cd1-2b0a-4326-8f29-3aff5f4c2b5f

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt11-signaling.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Signaling for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: Two worker types may earn a certificate; it is less costly for the high-skill worker. Learning objective: Explain a separating signal through different type-specific costs and receiver response. Use this actual scene timing: 0–4s: Hidden worker types; 4–9s: Certificate costs by type; 9–15s: Test imitation incentives; 15–20s: Compare both types' net gains; 20–25s: Reveal separating signal paths; 25–30s: Employer conditions action on observed signal. Drive objects and values from one state model. Numerical setup: {"types":["High skill","Low skill"],"wage_gain":3,"certificate_costs":[1,4],"net_gains":[2,-1]}. Demonstrate High type takes certificate; low type compares imitation cost with benefit and declines. Then Observed certificate now maps to high type, so employer's action differs by signal. Preserve the visible comparison that proves the result. Avoid this pitfall: A different colored arrow is not evidence of incentive compatibility. Reproduce from the supplied source kit game-theory, src/videos/gt11-signaling.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v2 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt11-signaling.tsx)

- [MIT OCW — Game Theory lecture notes](https://ocw.mit.edu/courses/14.126-game-theory-spring-2024/resources/lecture-notes/) — Equilibrium refinements and signaling games

[Back to course top](#game-theory)

---

<a id="c15-a012"></a>
## Adverse Selection

`C15-A012` · Video available · review: **passed** · version `economics-game-macro-20261009-v2`

**Learn:** Show the feedback loop behind adverse selection.
**Takeaway:** Remaining average quality falls, buyers lower offer, and another range exits.

https://github.com/user-attachments/assets/240ccbfd-3f0a-4389-b507-afc9b1bf5fa6

[Download MP4](https://github.com/LeaddeOpenLab/educational-animations/raw/refs/heads/main/assets/videos/economics/game-theory/gt12-adverse-selection.mp4) · 30.0 s · 1920×1080 · mp4

**Public prompt:** aligned. Prompt inspected against the actual final scenes; exact source kit is included. Clean-machine reproduction has not been tested.

<details>
<summary>View and copy Prompt</summary>

````text
Create a 30-second silent English educational animation about Adverse Selection for Game Theory, Economics. Render 1920×1080 at 30 fps with no audio using Remotion 4.0.410, React 19.0.0 and TypeScript 5.8.2. Use background #ffffff, a subtle cool-gray grid and soft glow, strong text #0b1220, and the course roles primary #cc6677, accent #117733, result #aa4499, warning #882255, alternate #332288. Use "Helvetica Neue", Helvetica, Arial, "Segoe UI", sans-serif for screen text. Place a small topic kicker at the upper left, a 50px bold scene heading below it, a 30px explanatory caption in the left column, and the mechanism graphic in the right 1050×640 region. Use short staggered entrances and six-frame fade-ins/eight-frame fade-outs around scenes; keep the mechanism state continuous across cuts. Finish with the result graphic and a small Key result chip. Keep topic-specific values and object labels readable; every highlight, path or curve must be supported by the visible numerical example.

Teach this scenario: Used-car market where buyers bid for average quality, prompting the best sellers to leave. Learning objective: Show the feedback loop behind adverse selection. Use this actual scene timing: 0–5s: Quality spectrum; 5–10s: Initial average-based offer; 10–16s: First high-quality exit; 16–21s: Reprice the remaining cars; 21–25s: Recompute lower offer and second exit; 25–30s: Identify the spiral. Drive objects and values from one state model. Numerical setup: {"quality_range":[0,1],"seller_value":"10q","buyer_value":"12q","q_max_sequence":[1,0.6,0.36],"offer_sequence":[6,3.6,2.16]}. Demonstrate High-quality sellers compare offer with reservation price and exit. Then Remaining average quality falls, buyers lower offer, and another range exits. Preserve the visible comparison that proves the result. Avoid this pitfall: Do not confuse high quality leaving with buyers deliberately rejecting it. Reproduce from the supplied source kit game-theory, src/videos/gt12-adverse-selection.tsx and its .state.ts plus the course L2 components, theme, fonts and brand asset; use FFmpeg to remove audio after rendering. This card describes the reviewed v2 video; it is a production brief, and exact reproduction requires the supplied code and assets. Clean-machine reproduction has not been verified.
````

</details>

**Production:** Remotion + React; dependencies: Remotion 4.0.410, React 19.0.0, TypeScript 5.8.2, MathJax 3.2.2 (kit formula assets), FFmpeg. Exact reproduction: not verified.

[Source / reproduction materials](https://github.com/LeaddeOpenLab/educational-animations/blob/main/assets/source-kits/game-theory/src/videos/gt12-adverse-selection.tsx)

- [OpenStax — Imperfect and asymmetric information](https://openstax.org/books/principles-economics-3e/pages/16-1-the-problem-of-imperfect-information-and-asymmetric-information) — Hidden quality and the adverse-selection feedback example

[Back to course top](#game-theory)

---
