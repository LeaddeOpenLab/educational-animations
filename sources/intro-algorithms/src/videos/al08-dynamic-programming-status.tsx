import React from 'react';
import { COLORS, fadeIn, ramp } from '../theme';
import { Kicker, Heading, Lines, Chip } from '../components/ui';
import { Backdrop } from '../components/Backdrop';
import { Formula } from '../components/Formula';
import { DPGrid } from '../components/Algo';
import FORMULAS from '../formulas.json';
import type { SceneDef } from '../Video';

/**
 * Intro Algorithms · 08 · Dynamic Programming State
 *
 * The claim: what makes dynamic programming possible is not the recursion, it is
 * that a subproblem can be *named* — indexed by a few integers so its answer can
 * be stored, looked up and reused. So the figure is a table whose columns are
 * those names, and the whole video is about the two things a state needs: an
 * answer you can compute from smaller states, and a base case you do not have to.
 * 1 + 1 + 1 + 1 + 1 = 5 scenes.
 */

/* ── T: this video's constants and derived quantities ─────────────────────── */
const COINS = [1, 3, 4];

/** dp[k] = fewest coins that add up to k; the table is computed, never typed. */
const table = (n: number, coins: number[]): number[] => {
  const dp: number[] = [0];
  for (let k = 1; k <= n; k++) {
    let best = Infinity;
    for (const c of coins) if (k - c >= 0) best = Math.min(best, dp[k - c] + 1);
    dp[k] = best;
  }
  return dp;
};

const N = 9;
const DP = table(N, COINS);

const T = {
  coins: COINS,
  /** the largest subproblem we tabulate */
  n: N,
  dp: DP,
  /** the names of the states: 0 … n */
  names: (): string[] => Array.from({ length: N + 1 }, (_, k) => String(k)),
  /** a state is answered from smaller states one coin away */
  sources: (k: number): number[] => COINS.filter((c) => k - c >= 0).map((c) => k - c),
  /** the base case is the state no coin can precede */
  base: () => 0,
  /** the answer for any state, read out of the table */
  answer: (k: number) => DP[k],
};

const figure = (frame: number, highlight: [number, number][], deps: [number, number][], start = 30) => (
  <svg
    data-k="figure"
    data-n="dp state table"
    style={{ position: 'absolute', left: 840, top: 330 }}
    width={920}
    height={230}
    viewBox="0 0 920 230"
  >
    <DPGrid
      width={920}
      height={230}
      rows={['dp[k]']}
      cols={T.names()}
      values={[T.dp]}
      deps={deps}
      highlight={highlight}
      progress={ramp(frame, start, 52 + 6 * highlight.length)}
    />
  </svg>
);

/* -------------------------------------------------------------------- title */

const S1: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Backdrop width={1920} height={1080} />
    <Kicker text="Introduction to Algorithms · 08" frame={frame} />
    <Heading text="Dynamic Programming State" frame={frame} size={74} top={186} width={1560} />
    <Lines
      frame={frame}
      start={30}
      top={330}
      width={1180}
      size={30}
      items={[
        'A subproblem that cannot be named cannot be stored, and one that cannot be stored will be solved again and again.',
        'Naming it means choosing a small set of integers that identifies it exactly — that name is the state, and the table is indexed by it.',
      ]}
    />
    <div data-k="label" data-n="al08Title" style={{ position: 'absolute', left: 108, top: 660 }}>
      <Formula svg={FORMULAS.al08Title.svg} pxPerEx={26} align="left" />
    </div>
    <div
      data-k="label"
      data-n="chips"
      style={{ position: 'absolute', left: 108, top: 880, display: 'flex', gap: 18 }}
    >
      <Chip text="name the subproblem" opacity={fadeIn(frame, 84, 14)} color={COLORS.primary} size={26} />
      <Chip text="store the answer" opacity={fadeIn(frame, 94, 14)} color={COLORS.accent} size={26} />
      <Chip text="reuse it" opacity={fadeIn(frame, 104, 14)} color={COLORS.result} size={26} />
    </div>
  </>
);

/* -------------------------------------------------------------------- state */

const S2: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Backdrop width={1920} height={1080} />
    <Kicker text="01 · Naming a subproblem" frame={frame} />
    <Heading text="The state is the address of the answer" frame={frame} size={40} width={640} />
    <Lines
      frame={frame}
      start={22}
      top={262}
      width={640}
      size={28}
      gap={22}
      items={[
        `Here the subproblem is "the fewest coins that make ${T.n}", and the name is just the amount ${0}…${T.n}.`,
        'Once the amount is a number, the answer for every amount fits in one row of a table.',
        'Choosing the state badly — asking a question the numbers cannot pin down — is the only way to fail at this.',
      ]}
    />
    <div data-k="label" data-n="al08State" style={{ position: 'absolute', left: 108, top: 640 }}>
      <Formula svg={FORMULAS.al08State.svg} pxPerEx={18} align="left" />
    </div>
    {figure(frame, [[0, T.n]], [])}
  </>
);

/* --------------------------------------------------------------------- init */

const S3: React.FC<{ frame: number }> = ({ frame }) => {
  const b = T.base();
  return (
    <>
      <Backdrop width={1920} height={1080} />
      <Kicker text="02 · The base case" frame={frame} />
      <Heading text="One state answers without asking anything" frame={frame} size={40} width={640} />
      <Lines
        frame={frame}
        start={22}
        top={262}
        width={640}
        size={28}
        gap={22}
        items={[
          `Making ${b} needs no coins, so dp[${b}] = ${T.answer(b)} and nothing has to be looked up.`,
          'That single cell is what lets the rest of the row be computed left to right.',
          'Every DP table has at least one of these; find it before writing any loop.',
        ]}
      />
      <div data-k="label" data-n="al08Init" style={{ position: 'absolute', left: 108, top: 640 }}>
        <Formula svg={FORMULAS.al08Init.svg} pxPerEx={20} align="left" />
      </div>
      {figure(frame, [[0, b]], [])}
    </>
  );
};

/* ---------------------------------------------------------------- structure */

const S4: React.FC<{ frame: number }> = ({ frame }) => {
  const k = 6;
  const src = T.sources(k);
  return (
    <>
      <Backdrop width={1920} height={1080} />
      <Kicker text="03 · Optimal substructure" frame={frame} />
      <Heading text="A state is built only from smaller states" frame={frame} size={40} width={640} />
      <Lines
        frame={frame}
        start={22}
        top={262}
        width={640}
        size={28}
        gap={22}
        items={[
          `The state ${k} reads ${src.map((s) => `dp[${s}]`).join(', ')} — each of them strictly smaller.`,
          `The best of those, plus one coin, is ${T.answer(k)}.`,
          'Because every dependency points backwards, the row can be filled in one pass.',
        ]}
      />
      <div data-k="label" data-n="al08Structure" style={{ position: 'absolute', left: 108, top: 640 }}>
        <Formula svg={FORMULAS.al08Structure.svg} pxPerEx={18} align="left" />
      </div>
      {figure(frame, [[0, k]], src.map((s) => [0, k]) as [number, number][])}
    </>
  );
};

/* ---------------------------------------------------------------- takeaway */

const S5: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    <Backdrop width={1920} height={1080} />
    <Kicker text="Takeaway" frame={frame} />
    <Heading text="Pick the state and the rest follows" frame={frame} width={1400} />
    <Lines
      frame={frame}
      start={26}
      top={316}
      width={1500}
      size={32}
      gap={20}
      items={[
        'The state is a promise: two different ways of reaching the same state must have the same future, or the table would be answering two questions at once.',
        'Everything else in dynamic programming — the transition, the iteration order, the reconstruction of the solution — is derived from that one choice.',
        `Here one row of ${T.n + 1} numbers answers every amount up to ${T.n}, with the largest answer ${T.answer(T.n)}.`,
      ]}
    />
    <div
      data-k="label"
      data-n="chips"
      style={{ position: 'absolute', left: 108, top: 800, display: 'flex', gap: 18 }}
    >
      <Chip text="state = name" opacity={fadeIn(frame, 100, 14)} color={COLORS.primary} size={25} />
      <Chip text="base case = start" opacity={fadeIn(frame, 110, 14)} color={COLORS.result} size={25} />
      <Chip text="smaller states only" opacity={fadeIn(frame, 120, 14)} color={COLORS.accent} size={25} />
    </div>
  </>
);

export const SCENES: SceneDef[] = [
  { id: 'title', Comp: S1, dur: 120 },
  { id: 'state', Comp: S2, dur: 200 },
  { id: 'base', Comp: S3, dur: 200 },
  { id: 'structure', Comp: S4, dur: 200 },
  { id: 'takeaway', Comp: S5, dur: 180 },
];
