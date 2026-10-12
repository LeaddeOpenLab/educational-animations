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
// 键名前缀 cm；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
const FORMULAS = {
  // ── cm01 Location-time graph ──
  cm01Title: `\\textcolor{${P}}{x(t) = x_0 + \\bar v\\, t}`,
  cm01Slope: `\\textcolor{${M}}{\\bar v = \\frac{\\Delta x}{\\Delta t}}`,
  cm01Uniform: `\\textcolor{${M}}{x(t) = x_0 + v t}`,
  cm01Rest: `\\textcolor{${M}}{v = \\frac{dx}{dt} = 0}`,

  // ── cm02 Speed-time graph ──
  cm02Title: `\\textcolor{${P}}{v(t) = v_0 + a t}`,
  cm02Area: `\\textcolor{${M}}{\\Delta x = \\int_{t_1}^{t_2} v(t)\\, dt}`,
  cm02Mean: `\\textcolor{${M}}{\\bar v = \\frac{1}{\\Delta t}\\int v\\, dt}`,
  cm02Sign: `\\textcolor{${M}}{\\text{sign of } v = \\text{direction}}`,

  // ── cm03 Acceleration-time graph ──
  cm03Title: `\\textcolor{${P}}{a(t) = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}}`,
  cm03Const: `\\textcolor{${M}}{x(t) = x_0 + v_0 t + \\tfrac{1}{2} a t^2}`,
  cm03Area: `\\textcolor{${M}}{\\Delta v = \\int_{t_1}^{t_2} a(t)\\, dt}`,
  cm03Zero: `\\textcolor{${M}}{a = 0 \\Rightarrow v \\text{ constant}}`,

  // ── cm04 Newton's laws of motion ──
  cm04Title: `\\textcolor{${P}}{\\sum F = m a}`,
  cm04First: `\\textcolor{${M}}{\\sum F = 0 \\Rightarrow v = \\text{const}}`,
  cm04Third: `\\textcolor{${M}}{F_{AB} = -F_{BA}}`,
  cm04Weight: `\\textcolor{${M}}{W = m g}`,

  // ── cm05 Free body diagram ──
  cm05Title: `\\textcolor{${P}}{\\sum F_x = m a_x,\\quad \\sum F_y = m a_y}`,
  cm05Normal: `\\textcolor{${M}}{N = m g \\cos\\theta}`,
  cm05Along: `\\textcolor{${M}}{m g \\sin\\theta - f = m a}`,
  cm05Friction: `\\textcolor{${M}}{f \\le \\mu_s N}`,

  // ── cm06 Conservation of momentum ──
  cm06Title: `\\textcolor{${P}}{\\sum p_i = \\text{const}}`,
  cm06Def: `\\textcolor{${M}}{p = m v}`,
  cm06Two: `\\textcolor{${M}}{m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'}`,
  cm06Impulse: `\\textcolor{${M}}{J = \\int F\\, dt = \\Delta p}`,

  // ── cm07 Collision process ──
  cm07Title: `\\textcolor{${P}}{m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2}`,
  cm07Elastic: `\\textcolor{${M}}{\\tfrac{1}{2}m_1u_1^2 + \\tfrac{1}{2}m_2u_2^2 = \\tfrac{1}{2}m_1v_1^2 + \\tfrac{1}{2}m_2v_2^2}`,
  cm07Restitution: `\\textcolor{${M}}{e = \\frac{v_2 - v_1}{u_1 - u_2}}`,
  cm07Stick: `\\textcolor{${M}}{v' = \\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}}`,

  // ── cm08 Work-Energy Theorem ──
  cm08Title: `\\textcolor{${P}}{W_{net} = \\Delta K}`,
  cm08Work: `\\textcolor{${M}}{W = \\int \\vec F \\cdot d\\vec s}`,
  cm08Kinetic: `\\textcolor{${M}}{K = \\tfrac{1}{2} m v^2}`,
  cm08Power: `\\textcolor{${M}}{P = \\frac{dW}{dt} = \\vec F \\cdot \\vec v}`,

  // ── cm09 Potential energy ──
  cm09Title: `\\textcolor{${P}}{U_g = m g h}`,
  cm09Spring: `\\textcolor{${M}}{U_s = \\tfrac{1}{2} k x^2}`,
  cm09Conserve: `\\textcolor{${M}}{K_1 + U_1 = K_2 + U_2}`,
  cm09Force: `\\textcolor{${M}}{F = -\\frac{dU}{dx}}`,

  // ── cm10 Potential energy curve ──
  cm10Title: `\\textcolor{${P}}{E = K(x) + U(x) = \\text{const}}`,
  cm10Kinetic: `\\textcolor{${M}}{K(x) = E - U(x) \\ge 0}`,
  cm10Turning: `\\textcolor{${M}}{U(x_t) = E}`,
  cm10Equilibrium: `\\textcolor{${M}}{\\left.\\frac{dU}{dx}\\right|_{x_0} = 0}`,

  // ── cm11 Rigid body rotation ──
  cm11Title: `\\textcolor{${P}}{\\tau = I \\alpha}`,
  cm11Inertia: `\\textcolor{${M}}{I = \\sum_i m_i r_i^2}`,
  cm11Kinetic: `\\textcolor{${M}}{K_{rot} = \\tfrac{1}{2} I \\omega^2}`,
  cm11Arc: `\\textcolor{${M}}{s = r\\theta,\\quad v = r\\omega}`,

  // ── cm12 Angular momentum ──
  cm12Title: `\\textcolor{${P}}{L = I \\omega = r \\times p}`,
  cm12Conserve: `\\textcolor{${M}}{\\tau_{ext} = 0 \\Rightarrow L = \\text{const}}`,
  cm12Rate: `\\textcolor{${M}}{\\tau = \\frac{dL}{dt}}`,
  cm12Point: `\\textcolor{${M}}{L = m r^2 \\omega}`,

  // ── cm13 No slip scrolling ──
  cm13Title: `\\textcolor{${P}}{v_{cm} = \\omega R}`,
  cm13Distance: `\\textcolor{${M}}{s = R\\theta}`,
  cm13Energy: `\\textcolor{${M}}{K = \\tfrac{1}{2}mv_{cm}^2 + \\tfrac{1}{2}I\\omega^2}`,
  cm13Contact: `\\textcolor{${M}}{v_{contact} = 0}`,
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
