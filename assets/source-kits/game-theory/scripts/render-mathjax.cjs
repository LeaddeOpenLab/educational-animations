// Prerender LaTeX -> MathJax SVG (glyphs embedded, so Remotion needs no font files).
// TEMPLATE: fill FORMULAS below for your course, then run: node scripts/render-mathjax.cjs <course-id>
//
// Single source of truth for formula colour is the course theme pack:
//   node scripts/render-mathjax.cjs                      # reads src/theme/active.json
//   node scripts/render-mathjax.cjs intro-machine-learning
//
// \textcolor bakes colour into the SVG at build time, so re-run this after any
// theme change. The baked theme name is written to src/formulas.theme.json and
// Video.tsx warns when it drifts from the active theme.
const path = require('path');
const fs = require('fs');

const themeDir = path.join(__dirname, '..', 'src', 'theme');
const activeName =
  process.argv[2] ||
  JSON.parse(fs.readFileSync(path.join(themeDir, 'active.json'), 'utf8')).theme;
const themePath = path.join(themeDir, 'themes', `${activeName}.json`);

if (!fs.existsSync(themePath)) {
  const avail = fs
    .readdirSync(path.join(themeDir, 'themes'))
    .map((f) => f.replace(/\.json$/, ''));
  console.error(`Unknown theme "${activeName}". Available: ${avail.join(', ')}`);
  process.exit(1);
}
const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
const C = theme.colors;
console.log(`theme: ${theme.name} (${theme.label}) / mode=${theme.mode}`);

const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');

const P = C.primary;   // model / main entity
const A = C.accent;    // key quantity
const R = C.result;    // conclusion
const W = C.warn;      // error / danger
const T = C.alt;       // second series
const M = C.textMuted;

// ── FILL ME ─────────────────────────────────────────────────────────────────
// One entry per formula this course needs, keyed with a course-wide prefix
// (m01Title / dbRule / …). Register the keys in kit.json -> formulas.keys.
// Colours come from the theme pack (P/A/R/W/T/M above). NEVER hard-code a hex.
// 4-5 formulas per video is the observed norm.
// 键名前缀 gt；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
const FORMULAS = {
  // ── gt01 Dominant strategy ──
  gt01Title: `\\textcolor{${P}}{u_i(s_i^*, s_{-i}) \\ge u_i(s_i, s_{-i})\\ \\forall s_{-i}}`,
  gt01Strict: `\\textcolor{${M}}{\\text{strict: } > \\text{ for all } s_{-i}}`,
  gt01Weak: `\\textcolor{${M}}{\\text{weak: } \\ge \\text{ with one strict}}`,
  gt01Outcome: `\\textcolor{${M}}{\\text{dominant strategy equilibrium}}`,

  // ── gt02 Iterative deletion ──
  gt02Title: `\\textcolor{${P}}{S_i^{(k+1)} = S_i^{(k)} \\setminus \\{\\text{dominated}\\}}`,
  gt02Order: `\\textcolor{${M}}{\\text{order can matter for weak dominance}}`,
  gt02Survive: `\\textcolor{${M}}{\\text{what survives is rationalizable}}`,
  gt02Empty: `\\textcolor{${M}}{S^{(\\infty)} \\neq \\varnothing}`,

  // ── gt03 Pure strategy Nash equilibrium ──
  gt03Title: `\\textcolor{${P}}{u_i(s_i^*, s_{-i}^*) \\ge u_i(s_i, s_{-i}^*)\\ \\forall i, s_i}`,
  gt03Best: `\\textcolor{${M}}{s_i^* \\in BR_i(s_{-i}^*)}`,
  gt03NoDeviate: `\\textcolor{${M}}{\\text{no profitable unilateral deviation}}`,
  gt03May: `\\textcolor{${M}}{\\text{existence not guaranteed in pure strategies}}`,

  // ── gt04 Mixed strategy ──
  gt04Title: `\\textcolor{${P}}{\\sigma_i \\in \\Delta(S_i)}`,
  gt04Expected: `\\textcolor{${M}}{u_i(\\sigma) = \\sum_s \\sigma(s)\\, u_i(s)}`,
  gt04Indifferent: `\\textcolor{${M}}{\\text{a player mixes only if indifferent}}`,
  gt04Support: `\\textcolor{${M}}{\\text{support} = \\{s : \\sigma_i(s) > 0\\}}`,

  // ── gt05 Mixed Strategy Nash Equilibrium ──
  gt05Title: `\\textcolor{${P}}{p = \\frac{d-c}{a-b-c+d}}`,
  gt05Indiff: `\\textcolor{${M}}{E_0(p) = E_1(p)}`,
  gt05Prob: `\\textcolor{${M}}{0 \\le p \\le 1}`,
  gt05Payoff: `\\textcolor{${M}}{u_i^* = E_i(p^*)}`,

  // ── gt06 Sequential game ──
  gt06Title: `\\textcolor{${P}}{\\text{players move in a fixed order}}`,
  gt06Extensive: `\\textcolor{${M}}{\\text{extensive form: a tree}}`,
  gt06Perfect: `\\textcolor{${M}}{\\text{perfect information: singleton info sets}}`,
  gt06Strategy: `\\textcolor{${M}}{\\text{a strategy specifies a move at every node}}`,

  // ── gt07 Backward induction ──
  gt07Title: `\\textcolor{${P}}{\\text{solve the last node first}}`,
  gt07Last: `\\textcolor{${M}}{\\text{choose the best terminal payoff}}`,
  gt07Roll: `\\textcolor{${M}}{\\text{roll the choice back one level}}`,
  gt07Result: `\\textcolor{${M}}{\\text{yields a unique path in finite games}}`,

  // ── gt08 Subgame refinement ──
  gt08Title: `\\textcolor{${P}}{\\text{Nash in every subgame}}`,
  gt08Def: `\\textcolor{${M}}{\\text{subgame starts at a singleton info set}}`,
  gt08SPE: `\\textcolor{${M}}{SPE \\subset NE}`,
  gt08Off: `\\textcolor{${M}}{\\text{removes non-credible off-path threats}}`,

  // ── gt09 Credible threat ──
  gt09Title: `\\textcolor{${P}}{\\text{a threat is credible if it is optimal when reached}}`,
  gt09Check: `\\textcolor{${M}}{u_i(\\text{carry out}) \\ge u_i(\\text{back down})}`,
  gt09Empty: `\\textcolor{${M}}{\\text{empty threats survive in NE, not in SPE}}`,
  gt09Entry: `\\textcolor{${M}}{\\text{entry game: accommodation vs fight}}`,

  // ── gt10 Asymmetric information ──
  gt10Title: `\\textcolor{${P}}{\\text{one player knows their type } \\theta}`,
  gt10Belief: `\\textcolor{${M}}{\\mu(\\theta \\mid h)}`,
  gt10Seq: `\\textcolor{${M}}{\\text{sequential rationality given beliefs}}`,
  gt10Harsanyi: `\\textcolor{${M}}{\\text{Harsanyi: nature moves first}}`,

  // ── gt11 Signaling ──
  gt11Title: `\\textcolor{${P}}{c(\\theta_{high}, e) < c(\\theta_{low}, e)}`,
  gt11Separate: `\\textcolor{${M}}{\\text{separating: types choose different } e}`,
  gt11Pool: `\\textcolor{${M}}{\\text{pooling: both choose the same } e}`,
  gt11IC: `\\textcolor{${M}}{\\text{single-crossing makes separation possible}}`,

  // ── gt12 Adverse selection ──
  gt12Title: `\\textcolor{${P}}{P_{buyer} = E[q \\mid \\text{unobserved}]}`,
  gt12Exit: `\\textcolor{${M}}{q > q_{cut} \\text{ exits the market}}`,
  gt12Spiral: `\\textcolor{${M}}{\\bar q \\downarrow \\Rightarrow P \\downarrow \\Rightarrow \\bar q \\downarrow}`,
  gt12Unravel: `\\textcolor{${M}}{\\text{the market can unravel completely}}`,
};
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const tex = new TeX({ packages: AllPackages });
const svg = new SVG({ fontCache: 'local' });
const doc = mathjax.document('', { InputJax: tex, OutputJax: svg });

const results = {};
let ok = 0;
for (const [key, texCode] of Object.entries(FORMULAS)) {
  try {
    const node = doc.convert(texCode, { display: true, em: 60 });
    const html = adaptor.innerHTML(node);
    if (!html || html.length < 40) throw new Error('empty svg output');
    results[key] = { tex: texCode, svg: html, success: true };
    ok++;
  } catch (err) {
    results[key] = { tex: texCode, svg: '', success: false, error: String(err && err.message) };
    console.error('FAILED', key, err && err.message);
  }
}

const outPath = path.join(__dirname, '..', 'src', 'formulas.json');
fs.writeFileSync(outPath, JSON.stringify(results, null, 2));

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'formulas.theme.json'),
  JSON.stringify({ theme: theme.name }, null, 2) + '\n'
);

console.log(`formulas: ${ok}/${Object.keys(FORMULAS).length} -> ${outPath}`);
