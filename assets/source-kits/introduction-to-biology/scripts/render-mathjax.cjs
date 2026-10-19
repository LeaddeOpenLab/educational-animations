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
// 键名前缀 bi；每知识点一条 <NN>Title + ≤4 条概念式。颜色只用 P/A/R/W/T/M。
const FORMULAS = {
  // ── bi01 Protein structure ──
  bi01Title: `\\textcolor{${P}}{\\text{primary} \\to \\text{secondary} \\to \\text{tertiary} \\to \\text{quaternary}}`,
  bi01Peptide: `\\textcolor{${M}}{\\text{residues linked by peptide bonds}}`,
  bi01Helix: `\\textcolor{${M}}{\\alpha\\text{-helix: H-bonds within the backbone}}`,
  bi01Sheet: `\\textcolor{${M}}{\\beta\\text{-sheet: H-bonds between strands}}`,

  // ── bi02 Enzyme kinetics ──
  bi02Title: `\\textcolor{${P}}{v = \\frac{V_{max}[S]}{K_m + [S]}}`,
  bi02Half: `\\textcolor{${M}}{v = \\tfrac{1}{2}V_{max} \\text{ at } [S] = K_m}`,
  bi02Vmax: `\\textcolor{${M}}{V_{max} = k_{cat}[E]_t}`,
  bi02LB: `\\textcolor{${M}}{\\frac{1}{v} = \\frac{K_m}{V_{max}}\\frac{1}{[S]} + \\frac{1}{V_{max}}}`,

  // ── bi03 Cell membrane transport ──
  bi03Title: `\\textcolor{${P}}{J = P\\,(C_{out} - C_{in})}`,
  bi03Passive: `\\textcolor{${M}}{\\Delta G < 0 \\Rightarrow \\text{passive}}`,
  bi03Active: `\\textcolor{${M}}{\\text{against gradient} \\Rightarrow \\text{needs ATP}}`,
  bi03Flux: `\\textcolor{${M}}{J = -D\\frac{dC}{dx}}`,

  // ── bi04 Electrochemical gradient ──
  bi04Title: `\\textcolor{${P}}{E = \\frac{RT}{zF}\\ln\\frac{[out]}{[in]}}`,
  bi04Nernst: `\\textcolor{${M}}{E = \\frac{61.5}{z}\\log_{10}\\frac{[out]}{[in]}\\ \\mathrm{mV}}`,
  bi04Drift: `\\textcolor{${M}}{\\Delta \\mu = RT\\ln\\frac{c_2}{c_1} + zF\\Delta\\psi}`,
  bi04Zero: `\\textcolor{${M}}{\\Delta \\mu = 0 \\Rightarrow \\text{equilibrium}}`,

  // ── bi05 Meiosis ──
  bi05Title: `\\textcolor{${P}}{2n \\xrightarrow{\\text{meiosis}} 4 \\times 1n}`,
  bi05Cross: `\\textcolor{${M}}{\\text{crossing over in prophase I}}`,
  bi05Independent: `\\textcolor{${M}}{2^{23} \\text{ combinations}}`,
  bi05Reduce: `\\textcolor{${M}}{\\text{homologs separate in anaphase I}}`,

  // ── bi06 Genetic linkage ──
  bi06Title: `\\textcolor{${P}}{RF = \\frac{\\text{recombinants}}{\\text{total}}}`,
  bi06Map: `\\textcolor{${M}}{1\\%\\ RF = 1\\ \\mathrm{cM}}`,
  bi06Max: `\\textcolor{${M}}{RF \\le 50\\%}`,
  bi06Linked: `\\textcolor{${M}}{RF \\ll 50\\% \\Rightarrow \\text{linked}}`,

  // ── bi07 Genetic probability ──
  bi07Title: `\\textcolor{${P}}{P(aa) = P(a)\\cdot P(a)}`,
  bi07Sum: `\\textcolor{${M}}{\\sum_i P_i = 1}`,
  bi07Product: `\\textcolor{${M}}{P(A \\cap B) = P(A)P(B)}`,
  bi07Ratio: `\\textcolor{${M}}{\\text{monohybrid } 3:1}`,

  // ── bi08 DNA replication ──
  bi08Title: `\\textcolor{${P}}{\\text{semiconservative: one old + one new strand}}`,
  bi08Complement: `\\textcolor{${M}}{A=T,\\quad G \\equiv C}`,
  bi08Direction: `\\textcolor{${M}}{\\text{synthesis } 5' \\to 3'}`,
  bi08Fork: `\\textcolor{${M}}{\\text{leading continuous, lagging discontinuous}}`,

  // ── bi09 Transcribe ──
  bi09Title: `\\textcolor{${P}}{\\text{DNA} \\xrightarrow{\\text{RNA pol}} \\text{mRNA}}`,
  bi09Template: `\\textcolor{${M}}{\\text{T in DNA} \\to \\text{U in RNA}}`,
  bi09Promoter: `\\textcolor{${M}}{\\text{initiation at the promoter}}`,
  bi09Direction2: `\\textcolor{${M}}{\\text{read } 3' \\to 5',\\ \\text{build } 5' \\to 3'}`,

  // ── bi10 Translate ──
  bi10Title: `\\textcolor{${P}}{3\\ \\text{bases} = 1\\ \\text{codon} = 1\\ \\text{amino acid}}`,
  bi10Code: `\\textcolor{${M}}{4^3 = 64\\ \\text{codons}}`,
  bi10Start: `\\textcolor{${M}}{\\text{AUG} = \\text{start}}`,
  bi10Stop: `\\textcolor{${M}}{\\text{UAA, UAG, UGA} = \\text{stop}}`,

  // ── bi11 Signal transduction ──
  bi11Title: `\\textcolor{${P}}{\\text{ligand} \\to \\text{receptor} \\to \\text{cascade}}`,
  bi11Phos: `\\textcolor{${M}}{\\text{kinase: } X \\to X\\text{-}P}`,
  bi11Amplify: `\\textcolor{${M}}{\\text{each step amplifies}}`,
  bi11Second: `\\textcolor{${M}}{\\text{second messengers: cAMP, } Ca^{2+}}`,

  // ── bi12 Negative feedback regulation ──
  bi12Title: `\\textcolor{${P}}{\\text{output} \\dashv \\text{input}}`,
  bi12Error: `\\textcolor{${M}}{e = \\text{setpoint} - \\text{value}}`,
  bi12Stable: `\\textcolor{${M}}{\\text{negative feedback} \\Rightarrow \\text{homeostasis}}`,
  bi12Gain: `\\textcolor{${M}}{\\text{response} \\propto -e}`,
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
