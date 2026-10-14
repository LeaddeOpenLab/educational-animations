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
// 键名前缀 ns；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
const FORMULAS = {
  // ── ns01 Resting potential ──
  ns01Title: `\\textcolor{${P}}{V_m \\approx -70\\ \\mathrm{mV}}`,
  ns01Gradient: `\\textcolor{${M}}{[K^+]_{in} \\gg [K^+]_{out}}`,
  ns01Leak: `\\textcolor{${M}}{\\text{leak channels dominate}}`,
  ns01Pump: `\\textcolor{${M}}{\\mathrm{Na^+/K^+}\\ \\text{pump: } 3\\ \\mathrm{Na^+}\\ \\text{out, } 2\\ \\mathrm{K^+}\\ \\text{in}}`,

  // ── ns02 Action potential ──
  ns02Title: `\\textcolor{${P}}{\\text{all-or-none: } V_m > V_{th} \\Rightarrow \\text{spike}}`,
  ns02Threshold: `\\textcolor{${M}}{V_{th} \\approx -55\\ \\mathrm{mV}}`,
  ns02Depolarize: `\\textcolor{${M}}{Na^+\\ \\text{in} \\Rightarrow \\text{depolarization}}`,
  ns02Refractory: `\\textcolor{${M}}{\\text{absolute refractory} \\Rightarrow f_{max}}`,

  // ── ns03 Chemical synaptic transmission ──
  ns03Title: `\\textcolor{${P}}{\\text{vesicle} \\to \\text{cleft} \\to \\text{receptor}}`,
  ns03Ca: `\\textcolor{${M}}{Ca^{2+}\\ \\text{influx triggers release}}`,
  ns03Quanta: `\\textcolor{${M}}{\\text{EPP} = n \\cdot q}`,
  ns03Clear: `\\textcolor{${M}}{\\text{reuptake / degradation ends the signal}}`,

  // ── ns04 Synaptic integration ──
  ns04Title: `\\textcolor{${P}}{V(t) = V_{rest} + \\sum_i EPSP_i + \\sum_j IPSP_j}`,
  ns04Spatial: `\\textcolor{${M}}{\\text{spatial: inputs at different sites}}`,
  ns04Temporal: `\\textcolor{${M}}{\\text{temporal: } \\Delta t \\ll \\tau}`,
  ns04Decay: `\\textcolor{${M}}{EPSP(t) = A e^{-t/\\tau}}`,

  // ── ns05 Brain region localization ──
  ns05Title: `\\textcolor{${P}}{\\text{function} \\mapsto \\text{region}}`,
  ns05Lateral: `\\textcolor{${M}}{\\text{contralateral control}}`,
  ns05Homo: `\\textcolor{${M}}{\\text{homunculus: area} \\propto \\text{precision}}`,
  ns05Plastic: `\\textcolor{${M}}{\\text{maps reorganize with use}}`,

  // ── ns06 Neural pathways ──
  ns06Title: `\\textcolor{${P}}{\\text{receptor} \\to \\text{thalamus} \\to \\text{cortex}}`,
  ns06Decussate: `\\textcolor{${M}}{\\text{decussation: crossed fibers}}`,
  ns06Relay: `\\textcolor{${M}}{\\text{every relay is a chance to gate}}`,
  ns06Topo: `\\textcolor{${M}}{\\text{topographic order preserved}}`,

  // ── ns07 Visual pathway ──
  ns07Title: `\\textcolor{${P}}{\\text{retina} \\to \\text{LGN} \\to V1}`,
  ns07Cross: `\\textcolor{${M}}{\\text{nasal fibers cross at the chiasm}}`,
  ns07Hemifield: `\\textcolor{${M}}{\\text{left cortex} \\leftarrow \\text{right hemifield}}`,
  ns07Dorsal: `\\textcolor{${M}}{\\text{dorsal: where / ventral: what}}`,

  // ── ns08 Receptive field ──
  ns08Title: `\\textcolor{${P}}{R = \\text{center} - \\text{surround}}`,
  ns08Center: `\\textcolor{${M}}{\\text{on-center: light in center excites}}`,
  ns08Antagonism: `\\textcolor{${M}}{\\text{center and surround oppose}}`,
  ns08Edge: `\\textcolor{${M}}{\\text{best response at edges}}`,

  // ── ns09 Synaptic plasticity ──
  ns09Title: `\\textcolor{${P}}{\\text{LTP: } w \\uparrow \\text{ after high-frequency pairing}}`,
  ns09Hebbian: `\\textcolor{${M}}{\\text{fire together, wire together}}`,
  ns09NMDA: `\\textcolor{${M}}{NMDA: \\text{coincidence detector}}`,
  ns09LTD: `\\textcolor{${M}}{\\text{LTD: } w \\downarrow \\text{ after low-frequency input}}`,

  // ── ns10 Memory formation ──
  ns10Title: `\\textcolor{${P}}{\\text{encode} \\to \\text{consolidate} \\to \\text{retrieve}}`,
  ns10Hippo: `\\textcolor{${M}}{\\text{hippocampus binds the episode}}`,
  ns10Cortex: `\\textcolor{${M}}{\\text{cortex stores it long-term}}`,
  ns10Sleep: `\\textcolor{${M}}{\\text{consolidation is sleep-dependent}}`,
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
