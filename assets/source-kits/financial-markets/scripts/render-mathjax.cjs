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
// 键名前缀 fm；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
// ⚠️ finance-cn 角色重载：P = 涨/正收益（红）、R = 跌/负收益（绿），
// 中国内地市场约定，与美欧相反。写涨跌幅时不要按"绿涨红跌"直觉取色。
const FORMULAS = {
  // ── fm01 Risk-return relationship ──
  fm01Title: `\\textcolor{${P}}{E[R] - r_f = \\lambda \\,\\sigma}`,
  fm01Sharpe: `\\textcolor{${M}}{\\text{Sharpe} = \\frac{E[R]-r_f}{\\sigma}}`,
  fm01Premium: `\\textcolor{${M}}{\\text{higher } \\sigma \\Rightarrow \\text{higher expected return}}`,
  fm01CML: `\\textcolor{${M}}{E[R_p] = r_f + \\frac{E[R_m]-r_f}{\\sigma_m}\\sigma_p}`,

  // ── fm02 Portfolio diversification ──
  fm02Title: `\\textcolor{${P}}{\\sigma_p^2 = \\sum_i w_i^2\\sigma_i^2 + \\sum_{i \\neq j} w_i w_j \\rho_{ij}\\sigma_i\\sigma_j}`,
  fm02Equal: `\\textcolor{${M}}{\\sigma_p = \\sigma\\sqrt{\\tfrac{1}{n} + \\tfrac{n-1}{n}\\rho}}`,
  fm02Limit: `\\textcolor{${M}}{n \\to \\infty \\Rightarrow \\sigma_p \\to \\sigma\\sqrt{\\rho}}`,
  fm02Idio: `\\textcolor{${M}}{\\text{idiosyncratic risk is diversifiable}}`,

  // ── fm03 Present value ──
  fm03Title: `\\textcolor{${P}}{PV = \\sum_t \\frac{CF_t}{(1+r)^t}}`,
  fm03NPV: `\\textcolor{${M}}{NPV = -C_0 + PV}`,
  fm03Rule: `\\textcolor{${M}}{NPV > 0 \\Rightarrow \\text{accept}}`,
  fm03Annuity: `\\textcolor{${M}}{PV_{annuity} = \\frac{C}{r}\\left(1 - \\frac{1}{(1+r)^T}\\right)}`,

  // ── fm04 Yield curve ──
  fm04Title: `\\textcolor{${P}}{y_T = \\text{the rate for maturity } T}`,
  fm04Spot: `\\textcolor{${M}}{(1+y_T)^T = \\prod_{t=1}^{T}(1+f_t)}`,
  fm04Shape: `\\textcolor{${M}}{y_{long} > y_{short} \\Rightarrow \\text{normal}}`,
  fm04Invert: `\\textcolor{${M}}{y_{long} < y_{short} \\Rightarrow \\text{inverted}}`,

  // ── fm05 Bond price ──
  fm05Title: `\\textcolor{${P}}{P = \\sum_t \\frac{C}{(1+y)^t} + \\frac{F}{(1+y)^T}}`,
  fm05Inverse: `\\textcolor{${M}}{y \\uparrow \\Rightarrow P \\downarrow}`,
  fm05Duration: `\\textcolor{${M}}{\\frac{\\Delta P}{P} \\approx -D\\,\\Delta y}`,
  fm05Convexity: `\\textcolor{${M}}{\\frac{\\Delta P}{P} \\approx -D\\Delta y + \\tfrac{1}{2}C(\\Delta y)^2}`,

  // ── fm06 Efficient market hypothesis ──
  fm06Title: `\\textcolor{${P}}{P_t = E[\\text{fundamental} \\mid \\Phi_t]}`,
  fm06Weak: `\\textcolor{${M}}{\\text{weak: prices reflect past prices}}`,
  fm06Semi: `\\textcolor{${M}}{\\text{semi-strong: all public information}}`,
  fm06Strong: `\\textcolor{${M}}{\\text{strong: even private information}}`,

  // ── fm07 Behavioral bias ──
  fm07Title: `\\textcolor{${P}}{v(x) = \\begin{cases} x^{\\alpha}, & x \\ge 0\\\\ -\\lambda(-x)^{\\alpha}, & x < 0\\end{cases}}`,
  fm07Loss: `\\textcolor{${M}}{\\lambda \\approx 2.25}`,
  fm07Concave: `\\textcolor{${M}}{\\text{risk-averse in gains}}`,
  fm07Seek: `\\textcolor{${M}}{\\text{risk-seeking in losses}}`,

  // ── fm08 Option expiration gain ──
  fm08Title: `\\textcolor{${P}}{\\text{call payoff} = \\max(S_T - K, 0) - \\text{premium}}`,
  fm08Put: `\\textcolor{${M}}{\\text{put payoff} = \\max(K - S_T, 0) - \\text{premium}}`,
  fm08Breakeven: `\\textcolor{${M}}{S_{BE} = K \\pm \\text{premium}}`,
  fm08Limited: `\\textcolor{${M}}{\\text{long: limited loss, unlimited gain}}`,

  // ── fm09 Options exposure ──
  fm09Title: `\\textcolor{${P}}{\\Delta = \\frac{\\partial V}{\\partial S}}`,
  fm09Range: `\\textcolor{${M}}{0 \\le \\Delta_{call} \\le 1}`,
  fm09ATM: `\\textcolor{${M}}{\\Delta_{ATM} \\approx 0.5}`,
  fm09Hedge: `\\textcolor{${M}}{\\text{delta-neutral: } \\Delta_{total} = 0}`,

  // ── fm10 Financial leverage ──
  fm10Title: `\\textcolor{${P}}{ROE = ROA + \\frac{D}{E}(ROA - r_D)}`,
  fm10Amplify: `\\textcolor{${M}}{ROA > r_D \\Rightarrow \\text{leverage helps}}`,
  fm10Reverse: `\\textcolor{${M}}{ROA < r_D \\Rightarrow \\text{leverage hurts}}`,
  fm10Risk: `\\textcolor{${M}}{\\text{leverage amplifies both directions}}`,

  // ── fm11 Market liquidity ──
  fm11Title: `\\textcolor{${P}}{\\text{spread} = P_{ask} - P_{bid}}`,
  fm11Depth: `\\textcolor{${M}}{\\text{depth: size available at each level}}`,
  fm11Impact: `\\textcolor{${M}}{\\text{impact: price move per unit traded}}`,
  fm11Illiquid: `\\textcolor{${M}}{\\text{wide spread} + \\text{thin depth} = \\text{illiquid}}`,

  // ── fm12 Financial crisis contagion ──
  fm12Title: `\\textcolor{${P}}{\\text{loss} = \\sum_{j \\in \\text{defaulted}} exposure_{ij}}`,
  fm12Fail: `\\textcolor{${M}}{\\text{loss} > \\text{capital} \\Rightarrow \\text{insolvent}}`,
  fm12Cascade: `\\textcolor{${M}}{\\text{one failure triggers the next}}`,
  fm12Network: `\\textcolor{${M}}{\\text{interconnectedness amplifies shocks}}`,
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
