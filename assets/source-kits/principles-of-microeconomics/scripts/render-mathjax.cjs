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
// 键名前缀 mi；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
const FORMULAS = {
  // ── mi01 Supply and demand balance ──
  mi01Title: `\\textcolor{${P}}{Q_d(P^*) = Q_s(P^*)}`,
  mi01Demand: `\\textcolor{${M}}{Q_d = a - bP}`,
  mi01Supply: `\\textcolor{${M}}{Q_s = c + dP}`,
  mi01EqPrice: `\\textcolor{${M}}{P^* = \\frac{a-c}{b+d}}`,

  // ── mi02 Relatively static ──
  mi02Title: `\\textcolor{${P}}{\\text{shift the curve, move along it}}`,
  mi02Shift: `\\textcolor{${M}}{\\text{income, tastes, inputs shift the curve}}`,
  mi02Along: `\\textcolor{${M}}{\\text{own price} \\Rightarrow \\text{movement along}}`,
  mi02NewEq: `\\textcolor{${M}}{P^* \\to P^{**}}`,

  // ── mi03 Elasticity of demand ──
  mi03Title: `\\textcolor{${P}}{\\varepsilon = \\frac{\\Delta Q/Q}{\\Delta P/P}}`,
  mi03Point: `\\textcolor{${M}}{\\varepsilon = \\frac{dQ}{dP}\\cdot\\frac{P}{Q}}`,
  mi03Revenue: `\\textcolor{${M}}{|\\varepsilon| > 1 \\Rightarrow \\text{cut } P \\text{ raises } R}`,
  mi03Inelastic: `\\textcolor{${M}}{|\\varepsilon| < 1 \\Rightarrow \\text{raise } P \\text{ raises } R}`,

  // ── mi04 Tax burden incidence ──
  mi04Title: `\\textcolor{${P}}{P_c - P_p = t}`,
  mi04Burden: `\\textcolor{${M}}{\\text{burden falls on the inelastic side}}`,
  mi04Split: `\\textcolor{${M}}{\\frac{\\text{consumer share}}{\\text{producer share}} = \\frac{E_s}{E_d}}`,
  mi04Revenue: `\\textcolor{${M}}{R_{tax} = t \\cdot Q_t}`,

  // ── mi05 Deadweight loss ──
  mi05Title: `\\textcolor{${P}}{DWL = \\tfrac{1}{2}\\cdot t \\cdot (Q^* - Q_t)}`,
  mi05Wedge: `\\textcolor{${M}}{P_c \\neq P_p \\Rightarrow Q < Q^*}`,
  mi05Loss: `\\textcolor{${M}}{\\text{mutually beneficial trades not made}}`,
  mi05Zero: `\\textcolor{${M}}{Q = Q^* \\Rightarrow DWL = 0}`,

  // ── mi06 Maximize consumer utility ──
  mi06Title: `\\textcolor{${P}}{MRS_{xy} = \\frac{P_x}{P_y}}`,
  mi06Budget: `\\textcolor{${M}}{P_x x + P_y y = I}`,
  mi06Tangency: `\\textcolor{${M}}{\\text{slope of indifference} = \\text{slope of budget}}`,
  mi06Mu: `\\textcolor{${M}}{\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y}}`,

  // ── mi07 Cost curve ──
  mi07Title: `\\textcolor{${P}}{ATC = \\frac{TC}{Q} = AFC + AVC}`,
  mi07MC: `\\textcolor{${M}}{MC = \\frac{dTC}{dQ}}`,
  mi07Cross: `\\textcolor{${M}}{MC \\text{ crosses } ATC \\text{ at its minimum}}`,
  mi07Shape: `\\textcolor{${M}}{\\text{U-shaped: spreading, then congestion}}`,

  // ── mi08 Manufacturer's output decisions ──
  mi08Title: `\\textcolor{${P}}{MR = MC \\Rightarrow Q^*}`,
  mi08Shutdown: `\\textcolor{${M}}{P < AVC \\Rightarrow \\text{shut down}}`,
  mi08Breakeven: `\\textcolor{${M}}{P = ATC \\Rightarrow \\pi = 0}`,
  mi08Profit: `\\textcolor{${M}}{\\pi = (P - ATC)Q}`,

  // ── mi09 Perfect competition ──
  mi09Title: `\\textcolor{${P}}{P = MR = MC}`,
  mi09Free: `\\textcolor{${M}}{\\text{free entry} \\Rightarrow \\pi = 0 \\text{ long run}}`,
  mi09Supply2: `\\textcolor{${M}}{\\text{firm supply} = MC \\text{ above } AVC}`,
  mi09Efficient: `\\textcolor{${M}}{P = MC \\Rightarrow \\text{allocative efficiency}}`,

  // ── mi10 Monopoly pricing ──
  mi10Title: `\\textcolor{${P}}{MR = MC,\\quad P > MR}`,
  mi10Markup: `\\textcolor{${M}}{\\frac{P - MC}{P} = \\frac{1}{|\\varepsilon|}}`,
  mi10Lower: `\\textcolor{${M}}{Q_m < Q_c,\\quad P_m > P_c}`,
  mi10DWL: `\\textcolor{${M}}{\\text{monopoly creates deadweight loss}}`,

  // ── mi11 Market welfare ──
  mi11Title: `\\textcolor{${P}}{W = CS + PS}`,
  mi11CS: `\\textcolor{${M}}{CS = \\tfrac{1}{2}Q(P_{max} - P^*)}`,
  mi11PS: `\\textcolor{${M}}{PS = \\tfrac{1}{2}Q(P^* - P_{min})}`,
  mi11Total: `\\textcolor{${M}}{W_{max} \\text{ at } Q^*}`,
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
