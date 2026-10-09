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
// 键名前缀 ma；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
const FORMULAS = {
  // ── ma01 GDP accounting ──
  ma01Title: `\\textcolor{${P}}{Y = C + I + G + NX}`,
  ma01C: `\\textcolor{${M}}{C = \\text{household consumption}}`,
  ma01I: `\\textcolor{${M}}{I = \\text{fixed investment + inventories}}`,
  ma01NX: `\\textcolor{${M}}{NX = X - M}`,

  // ── ma02 Economic circulation flow ──
  ma02Title: `\\textcolor{${P}}{\\text{injections} = \\text{leakages}}`,
  ma02Inject: `\\textcolor{${M}}{I + G + X}`,
  ma02Leak: `\\textcolor{${M}}{S + T + M}`,
  ma02Identity: `\\textcolor{${M}}{I + G + X \\equiv S + T + M}`,

  // ── ma03 IS–LM model ──
  ma03Title: `\\textcolor{${P}}{Y = C(Y-T) + I(r) + G}`,
  ma03IS: `\\textcolor{${M}}{IS: \\ r \\downarrow \\Rightarrow Y \\uparrow}`,
  ma03LM: `\\textcolor{${M}}{LM: \\ \\frac{M}{P} = L(r, Y)}`,
  ma03Eq: `\\textcolor{${M}}{IS = LM \\Rightarrow (Y^*, r^*)}`,

  // ── ma04 Exchange rate ──
  ma04Title: `\\textcolor{${P}}{e = \\frac{\\text{domestic}}{\\text{foreign}}}`,
  ma04Appreciation: `\\textcolor{${M}}{e \\uparrow \\Rightarrow \\text{depreciation}}`,
  ma04PPP: `\\textcolor{${M}}{e = \\frac{P}{P^*}}`,
  ma04UIP: `\\textcolor{${M}}{i = i^* + \\frac{\\Delta e^e}{e}}`,

  // ── ma05 Balance of payments ──
  ma05Title: `\\textcolor{${P}}{CA + KA = 0}`,
  ma05CA: `\\textcolor{${M}}{CA = NX + \\text{net income}}`,
  ma05KA: `\\textcolor{${M}}{KA = \\text{net capital inflow}}`,
  ma05Reserves: `\\textcolor{${M}}{\\Delta R = CA + KA}`,

  // ── ma06 Solow growth model ──
  ma06Title: `\\textcolor{${P}}{s\\,f(k^*) = (n+\\delta)k^*}`,
  ma06Output: `\\textcolor{${M}}{y = A k^{\\alpha}}`,
  ma06Steady: `\\textcolor{${M}}{k^* = \\left(\\frac{sA}{n+\\delta}\\right)^{\\frac{1}{1-\\alpha}}}`,
  ma06Consume: `\\textcolor{${M}}{c^* = f(k^*) - (n+\\delta)k^*}`,

  // ── ma07 Phillips Curve ──
  ma07Title: `\\textcolor{${P}}{\\pi = \\pi^e - \\beta(u - u^*)}`,
  ma07Short: `\\textcolor{${M}}{\\text{SRPC: downward slope}}`,
  ma07Long: `\\textcolor{${M}}{\\text{LRPC: vertical at } u^*}`,
  ma07Tradeoff: `\\textcolor{${M}}{\\text{no long-run trade-off}}`,

  // ── ma08 Inflation expectations ──
  ma08Title: `\\textcolor{${P}}{\\pi^e \\uparrow \\Rightarrow SRPC \\text{ shifts up}}`,
  ma08Anchor: `\\textcolor{${M}}{\\text{anchored expectations} \\Rightarrow \\pi \\text{ stable}}`,
  ma08Adaptive: `\\textcolor{${M}}{\\pi^e_t = \\pi_{t-1}}`,
  ma08Cost: `\\textcolor{${M}}{\\text{disinflation costs output}}`,
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
