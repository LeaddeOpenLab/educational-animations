import React from 'react';
import { COLORS, fadeIn, ramp } from '../theme';
import { Kicker, Heading, Lines, Chip } from '../components/ui';
import { Backdrop } from '../components/Backdrop';
import { Formula } from '../components/Formula';
import { DPGrid } from '../components/Algo';
import FORMULAS from '../formulas.json';
import type { SceneDef } from '../Video';

/**
 * Intro Algorithms · 09 · Dynamic Programming State Transition
 *
 * The claim: the transition is nothing more than the state asking a question
 * about states one step back — here "take this one" or "leave it". So the figure
 * draws the previous state directly above the state that reads it, and the video
 * is about the two consequences of that reading order: the table must be filled
 * in increasing index order, and the last cell is the answer.
 * 1 + 1 + 1 + 1 + 1 + 1 = 6 scenes.
 */

/* ── T: this video's constants and derived quantities ─────────────────────── */
const VAL = [3, 7, 4, 9, 2, 8];

/** dp[i] = best total using houses 1…i, taking or skipping each in turn. */
const solve = (v: number[]): number[] => {
  const dp: number[] = [0];
  for (let i = 1; i <= v.length; i++) {
    const skip = dp[i - 1];
    const take = (i >= 2 ? dp[i - 2] : 0) + v[i - 1];
    dp[i] = Math.max(skip, take);
  }
  return dp;
};

const DP = solve(VAL);

const T = {
  val: VAL,
  dp: DP,
  /** the states, named by index 0…n */
  names: (): string[] => Array.from({ length: VAL.length + 1 }, (_, i) => String(i)),
  /** the row drawn above the table: dp[i−1] sits directly over dp[i] */
  previousRow: (): number[] => DP.slice(0, VAL.length + 1).map((_, i) => DP[Math.max(0, i - 1)]),
  dpRow: (): number[] => DP.slice(),
  /** every transition the table uses, as [row, col] pairs for the arrows */
  deps: (): [number, number][] => VAL.map((_, k) => [1, k + 1] as [number, number]),
  /** the arithmetic behind one cell, computed rather than asserted */
  step(i: number) {
    const skip = DP[i - 1];
    const take = (i >= 2 ? DP[i - 2] : 0) + VAL[i - 1];
    return { i, val: VAL[i - 1], skip, take, best: DP[i], prev: i - 1, prev2: i - 2 };
  },
  /** the cells on the optimal path, found by walking the choices backwards */
  path(): [number, number][] {
    const cells: [number, number][] = [];
    let i = VAL.length;
    while (i > 0) {
      cells.push([1, i]);
      i = DP[i - 1] >= (i >= 2 ? DP[i - 2] : 0) + VAL[i - 1] ? i - 1 : i - 2;
    }
    cells.push([1, 0]);
    return cells.reverse();
  },
  answer: () => DP[VAL.length],
};

const figure = (
  frame: number,
  highlight: [number, number][],
  deps: [number, number][],
  path: [number, number][] = [],
  start = 30
) => (
  <svg
    data-k="figure"
    data-n="dp table and its arrows"
    style={{ position: 'absolute', left: 840, top: 300 }}
    width={920}
    height={330}
    viewBox="0 0 920 330"
  >
    <DPGrid
      width={920}
      height={330}
      rows={['dp[i−1]', 'dp[i]']}
      cols={T.names()}
      values={[T.previousRow(), T.dpRow()]}
      deps={deps}
      path={path}
      highlight={highlight}
      progress={ramp(frame, start, 54 + 6 * highlight.length + 4 * deps.length)}
    />
  </svg>
);

/* -------------------------------------------------------------------- title */

const S1: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Backdrop width={1920} height={1080} />
    <Kicker text="Introduction to Algorithms · 09" frame={frame} />
    <Heading text="Dynamic Programming State Transition" frame={frame} size={68} top={186} width={1620} />
    <Lines
      frame={frame}
      start={30}
      top={330}
      width={1180}
      size={30}
      items={[
        'The transition is the sentence that connects a state to the states it is allowed to look at — and it is short or the DP is wrong.',
        'Get the state right and the transition is usually one line: the best of a handful of options, each already tabulated.',
      ]}
    />
    <div data-k="label" data-n="al09Title" style={{ position: 'absolute', left: 108, top: 660 }}>
      <Formula svg={FORMULAS.al09Title.svg} pxPerEx={26} align="left" />
    </div>
    <div
      data-k="label"
      data-n="chips"
      style={{ position: 'absolute', left: 108, top: 880, display: 'flex', gap: 18 }}
    >
      <Chip text="read earlier states" opacity={fadeIn(frame, 84, 14)} color={COLORS.primary} size={26} />
      <Chip text="take the best" opacity={fadeIn(frame, 94, 14)} color={COLORS.accent} size={26} />
      <Chip text="fill forwards" opacity={fadeIn(frame, 104, 14)} color={COLORS.result} size={26} />
    </div>
  </>
);

/* -------------------------------------------------------------- transition */

const S2: React.FC<{ frame: number }> = ({ frame }) => {
  const st = T.step(T.val.length);
  return (
    <>
      <Backdrop width={1920} height={1080} />
      <Kicker text="01 · The transition" frame={frame} />
      <Heading text="Every arrow points one step back" frame={frame} size={40} width={640} />
      <Lines
        frame={frame}
        start={22}
        top={262}
        width={640}
        size={28}
        gap={22}
        items={[
          `The row above holds the state each cell is allowed to read: dp[${st.prev}] above dp[${st.i}].`,
          'An arrow pointing backwards is what guarantees the table can be filled without recursion.',
          'Arrows that pointed forwards, or formed a cycle, would mean the state was chosen badly.',
        ]}
      />
      <div data-k="label" data-n="al09Trans" style={{ position: 'absolute', left: 108, top: 640 }}>
        <Formula svg={FORMULAS.al09Trans.svg} pxPerEx={18} align="left" />
      </div>
      {figure(frame, [[1, st.i]], T.deps())}
    </>
  );
};

/* ------------------------------------------------------------------ choice */

const S3: React.FC<{ frame: number }> = ({ frame }) => {
  const st = T.step(4);
  return (
    <>
      <Backdrop width={1920} height={1080} />
      <Kicker text="02 · The choice" frame={frame} />
      <Heading text="Take it, or leave it — and keep the better one" frame={frame} size={40} width={640} />
      <Lines
        frame={frame}
        start={22}
        top={262}
        width={640}
        size={28}
        gap={22}
        items={[
          `Leaving this value keeps ${st.skip}; taking it means spending one value and keeping ${st.take}.`,
          `${st.take} wins, so dp[${st.i}] is ${st.best}.`,
          'The discarded option is not lost — it is still in the table, one cell to the left.',
        ]}
      />
      <div data-k="label" data-n="al09Choice" style={{ position: 'absolute', left: 108, top: 640 }}>
        <Formula svg={FORMULAS.al09Choice.svg} pxPerEx={20} align="left" />
      </div>
      <div data-k="label" data-n="chip" style={{ position: 'absolute', left: 108, top: 760 }}>
        <Chip
          text={`max(${st.skip}, ${st.take}) = ${st.best}`}
          opacity={fadeIn(frame, 112, 14)}
          color={COLORS.accent}
          size={26}
        />
      </div>
      {figure(frame, [[1, st.prev2], [1, st.prev], [1, st.i]], [[1, st.i]])}
    </>
  );
};

/* ------------------------------------------------------------------- order */

const S4: React.FC<{ frame: number }> = ({ frame }) => {
  const k = Math.max(1, Math.min(T.deps().length, Math.floor(ramp(frame, 30, 78) * (T.deps().length + 1))));
  return (
    <>
      <Backdrop width={1920} height={1080} />
      <Kicker text="03 · The order" frame={frame} />
      <Heading text="Small states first, in one pass" frame={frame} size={40} width={640} />
      <Lines
        frame={frame}
        start={22}
        top={262}
        width={640}
        size={28}
        gap={22}
        items={[
          'Because every arrow points backwards, a single left-to-right sweep is enough.',
          `${k} of the ${T.deps().length} transitions on this table are already resolved.`,
          'No memo table is needed and no state is ever visited twice.',
        ]}
      />
      <div data-k="label" data-n="al09Order" style={{ position: 'absolute', left: 108, top: 640 }}>
        <Formula svg={FORMULAS.al09Order.svg} pxPerEx={18} align="left" />
      </div>
      {figure(frame, [[1, k]], T.deps().slice(0, k))}
    </>
  );
};

/* ------------------------------------------------------------------ answer */

const S5: React.FC<{ frame: number }> = ({ frame }) => {
  const st = T.step(T.val.length);
  const onPath = T.path();
  return (
    <>
      <Backdrop width={1920} height={1080} />
      <Kicker text="04 · The answer" frame={frame} />
      <Heading text="The last state is the one you were asked for" frame={frame} size={40} width={640} />
      <Lines
        frame={frame}
        start={22}
        top={262}
        width={640}
        size={28}
        gap={22}
        items={[
          `The table is complete, so dp[${st.i}] = ${st.best} answers the original question directly.`,
          'The states that produced it are still marked, so the actual choice can be read back off the table.',
          'Reconstruction is a second walk, not a second computation.',
        ]}
      />
      <div data-k="label" data-n="chip" style={{ position: 'absolute', left: 108, top: 640 }}>
        <Chip
          text={`best = ${T.answer()} · ${VAL.length} states`}
          opacity={fadeIn(frame, 116, 14)}
          color={COLORS.result}
          size={26}
        />
      </div>
      {figure(frame, onPath, T.deps(), onPath)}
    </>
  );
};

/* ---------------------------------------------------------------- takeaway */

const S6: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Backdrop width={1920} height={1080} />
    <Kicker text="Takeaway" frame={frame} />
    <Heading text="The transition is where the state pays for itself" frame={frame} width={1500} />
    <Lines
      frame={frame}
      start={26}
      top={316}
      width={1500}
      size={32}
      gap={20}
      items={[
        'A good state makes the transition a handful of already-computed cells, read at fixed offsets.',
        'Those fixed offsets are what turn a recurrence into an index arithmetic loop, and they are also what makes the memory optimisable.',
        `Here ${VAL.length} values resolve into one answer of ${T.answer()} with a single pass over ${DP.length} cells.`,
      ]}
    />
    <div
      data-k="label"
      data-n="chips"
      style={{ position: 'absolute', left: 108, top: 800, display: 'flex', gap: 18 }}
    >
      <Chip text="arrows point back" opacity={fadeIn(frame, 100, 14)} color={COLORS.primary} size={25} />
      <Chip text="fill in index order" opacity={fadeIn(frame, 110, 14)} color={COLORS.accent} size={25} />
      <Chip text="reconstruct by walking" opacity={fadeIn(frame, 120, 14)} color={COLORS.result} size={25} />
    </div>
  </>
);

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: S1, dur: 110 },
  { id: 'transition', Comp: S2, dur: 155 },
  { id: 'choice', Comp: S3, dur: 155 },
  { id: 'order', Comp: S4, dur: 155 },
  { id: 'answer', Comp: S5, dur: 175 },
  { id: 'takeaway', Comp: S6, dur: 150 },
];
