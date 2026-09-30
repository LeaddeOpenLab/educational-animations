import React from 'react';
import { continueRender, delayRender, useVideoConfig } from 'remotion';

/**
 * OverlapProbe — measures the *rendered* geometry of a frame and reports it on
 * the browser console, so `scripts/measure-overlap.cjs` can turn layout
 * collisions into a machine-checkable list.
 *
 * Why this exists
 * ---------------
 * Overlap used to be the one thing nothing checked: `tsc --noEmit` passes on any
 * layout, rendering only verifies the stream count, and eyeballing a downscaled
 * contact sheet both misses cases and invents them. Inferring boxes from source
 * text (advance factors, pad constants) is no better — every constant is a
 * possible false positive *and* a possible miss, and nothing inside a figure can
 * be inferred at all. This probe reads the real boxes out of the browser
 * instead, so the verdict is exact and needs no human frame-by-frame
 * confirmation.
 *
 * It renders `null`, so it is invisible and harmless in a real render. The log
 * line is only consumed by the measurement script; the Remotion CLI does not
 * print browser logs below `--log=verbose`.
 *
 * Tagging contract (see references/overlap-rules.md)
 * --------------------------------------------------
 *   data-root        on the scene root                — the coordinate origin
 *   data-k           kind: text | label | shape | figure | connector | decor | bg
 *   data-n           short name used in reports
 *   data-c           the enclosing figure's id (omit for top level)
 *
 * `text` elements are measured line by line with `Range.getClientRects()`,
 * because an element box folds in line-height leading and the bullet gap, which
 * hides exactly the crowding this is meant to catch.
 * `figure` elements additionally report their `viewBox` next to their content
 * `getBBox()`, which is what the sealing rule (R2) is checked against.
 */
export const PROBE_PREFIX = 'OVLPROBE|';

type Box = {
  /** index in the tagged list */
  i: number;
  /** kind */
  k: string;
  /** name */
  n: string;
  /** container id, 'root' when not inside a figure */
  c: string;
  /** index of the nearest tagged ancestor, -1 if none */
  p: number;
  /** one [x, y, w, h] per line box, relative to the composition origin */
  r: number[][];
  /** figure only: the declared viewBox */
  vb?: number[];
  /** figure only: the content bounding box in user units */
  bb?: number[];
  /** true when a box escapes the composition */
  out?: boolean;
};

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Wait until the stage has its final size.
 *
 * Remotion mounts the composition once before the stage is sized. During that
 * pass the containing block is 0×0, so:
 *   - `left: 108, top: 74` still measures as 108,74 — it looks right;
 *   - `left: 0, right: 0` collapses to zero width, and a `justify-content: center`
 *     row inside it centres on x=0 instead of x=W/2.
 * Measuring there yields numbers that are plausible for positioned elements and
 * badly wrong for anything width-dependent. That is worse than no measurement,
 * so we spin on rAF until `data-root` reports the composition size.
 *
 * `delayRender` keeps the frame from being captured while we wait, so this costs
 * a few frames of wall clock and nothing else.
 */
const waitForStage = async (W: number, H: number) => {
  for (let i = 0; i < 240; i++) {
    const el = document.querySelector('[data-root]') as HTMLElement | null;
    if (el) {
      const r = el.getBoundingClientRect();
      if (Math.abs(r.width - W) < 1.5 && Math.abs(r.height - H) < 1.5) return { el, origin: r, waited: i };
    }
    await new Promise((res) => requestAnimationFrame(() => res(null)));
  }
  return null;
};

const measure = (o: DOMRect, W: number, H: number): Box[] => {
  const tagged = Array.from(document.querySelectorAll('[data-k]')) as HTMLElement[];

  const ancestorOf = (el: HTMLElement): number => {
    let p = el.parentElement;
    while (p) {
      const j = tagged.indexOf(p as HTMLElement);
      if (j >= 0) return j;
      p = p.parentElement;
    }
    return -1;
  };

  return tagged.map((el, i) => {
    const kind = el.getAttribute('data-k') ?? '?';
    const rec: Box = {
      i,
      k: kind,
      n: el.getAttribute('data-n') ?? kind,
      c: el.getAttribute('data-c') ?? 'root',
      p: ancestorOf(el),
      r: [],
    };

    if (kind === 'text') {
      // Measure glyph runs, not layout boxes.
      //
      // `selectNodeContents(el)` on a row reports BOTH the row's container box
      // (full declared width, no ink) and the text run inside it. Taking the
      // container box as geometry claims the empty right-hand side of every row
      // is occupied, which invents collisions the eye never sees.
      //
      // Walking the text nodes gives the ink, one run per glyph group, and
      // naturally skips ornaments like the 9×9 bullet dots (they carry no text).
      // It is also immune to line-height leading, which is where crowding hides.
      const rects: DOMRect[] = [];
      try {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          if (node.nodeValue && node.nodeValue.trim()) {
            const range = document.createRange();
            range.selectNodeContents(node);
            for (const r of Array.from(range.getClientRects())) {
              if (r.width > 1 && r.height > 1) rects.push(r);
            }
          }
          node = walker.nextNode();
        }
      } catch {
        /* fall through to the element box below */
      }
      rec.r = (rects.length ? rects : [el.getBoundingClientRect()]).map((r) => [
        round(r.left - o.left),
        round(r.top - o.top),
        round(r.width),
        round(r.height),
      ]);
    } else {
      const r = el.getBoundingClientRect();
      rec.r = [[round(r.left - o.left), round(r.top - o.top), round(r.width), round(r.height)]];
    }

    if (kind === 'figure') {
      const svg = el as unknown as SVGSVGElement;
      const vb = (svg.getAttribute('viewBox') ?? '').split(/[\s,]+/).map(Number);
      if (vb.length === 4 && vb.every((n) => Number.isFinite(n))) rec.vb = vb;
      try {
        const bb = svg.getBBox();
        rec.bb = [round(bb.x), round(bb.y), round(bb.width), round(bb.height)];
      } catch {
        // getBBox throws on a detached / zero-area element; omit rather than lie.
      }
    }

    if (rec.r.some((b) => b[0] < -0.5 || b[1] < -0.5 || b[0] + b[2] > W + 0.5 || b[1] + b[3] > H + 0.5)) {
      rec.out = true;
    }

    return rec;
  });
};

/**
 * Mount once inside the shared scene wrapper, next to `data-root`:
 *   <AbsoluteFill data-root="1">
 *     …scenes…
 *     <OverlapProbe />
 *   </AbsoluteFill>
 */
export const OverlapProbe: React.FC = () => {
  const { width, height } = useVideoConfig();
  const [handle] = React.useState(() => delayRender('overlap-probe'));

  React.useEffect(() => {
    const run = async () => {
      try {
        const staged = await waitForStage(width, height);
        if (!staged) {
          const rootEl = document.querySelector('[data-root]') as HTMLElement | null;
          const r = rootEl?.getBoundingClientRect();
          console.log(
            `${PROBE_PREFIX}${JSON.stringify({
              ok: false,
              why: `stage never reached ${width}×${height}; data-root box is ${
                r ? `${round(r.width)}×${round(r.height)}` : 'missing'
              }`,
            })}`
          );
          return;
        }
        const els = measure(staged.origin, width, height);
        console.log(
          `${PROBE_PREFIX}${JSON.stringify({
            ok: true,
            w: width,
            h: height,
            origin: [round(staged.origin.left), round(staged.origin.top)],
            waited: staged.waited,
            els,
          })}`
        );
      } catch (err) {
        console.log(`${PROBE_PREFIX}${JSON.stringify({ ok: false, why: String(err) })}`);
      } finally {
        continueRender(handle);
      }
    };
    void run();
  }, [handle, width, height]);

  return null;
};
