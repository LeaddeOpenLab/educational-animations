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
const FORMULAS = {
  edgeQuantize: `q=\\operatorname{clip}(\\operatorname{round}(x/s)+z,-128,127)`,
  edgeDequantize: `\\hat x=s(q-z)`,
  edgeMAC: `a=\\sum_i(q_{x,i}-z_x)(q_{w,i}-z_w)`,
  edgeRMS: `x_{\\mathrm{RMS}}=\\sqrt{\\frac{1}{N}\\sum_i x_i^2}`,
  edgeEnergy: `E=\\sum_i P_i\\Delta t`,
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
