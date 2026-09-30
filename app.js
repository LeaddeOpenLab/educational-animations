const app = document.querySelector('#app');
const breadcrumb = document.querySelector('#breadcrumb');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let library = [];
let releases = {};
const ready = x => x.status === 'ready' && x.video;
const title = x => x.standard_name || x.title;
const readState = () => Object.fromEntries(new URLSearchParams(location.hash.slice(1)));
const link = values => '#' + new URLSearchParams(Object.entries(values).filter(([,v]) => v)).toString();
function go(values) { location.hash = link(values); }
const counts = rows => `${rows.filter(ready).length} videos · ${rows.filter(x => !ready(x)).length} awaiting production`;
function render() {
  const state = readState();
  const courseRecord = library.find(x => x.course === state.course && x.subject === state.subject);
  const product = {'Mathematics':'https://leadde.ai/solutions/math-animation','Mathematics & Statistics':'https://leadde.ai/solutions/math-animation','Chemistry':'https://leadde.ai/solutions/chemistry-animation'}[state.subject] || 'https://leadde.ai/animation';
  const release = courseRecord && releases[courseRecord.course_code || courseRecord.tags[1]];
  document.querySelector('#search').value = state.q || '';
  document.querySelector('#ready-only').checked = state.ready === '1';
  let rows = library.filter(x => (!state.subject || x.subject === state.subject) && (!state.course || x.course === state.course));
  if (state.ready === '1') rows = rows.filter(ready);
  if (state.q) rows = rows.filter(x => [title(x),x.original_name,x.id,...(x.aliases||[])].join(' ').toLowerCase().includes(state.q.toLowerCase()));
  if (state.item) rows = rows.filter(x => x.id === state.item);
  breadcrumb.innerHTML = `<a href="#">All disciplines</a>${state.subject ? ` / <a href="${esc(link({subject:state.subject}))}">${esc(state.subject)}</a>` : ''}${state.course ? ` / <a href="${esc(link({subject:state.subject,course:state.course}))}">${esc(state.course)}</a>` : ''}`;
  if (!state.course && !state.item && !state.q) {
    const key = state.subject ? 'course' : 'subject';
    const groups = rows.reduce((all,x) => ((all[x[key]] ||= []).push(x),all),{});
    app.innerHTML = `<div class="grid">${Object.entries(groups).map(([name,entries]) => `<a class="card" href="${esc(link({...state,[key]:name}))}"><h2>${esc(name)}</h2><p>${counts(entries)}</p>${entries.some(ready) ? '' : '<strong>No finished videos yet</strong>'}</a>`).join('')}</div>`;
  } else {
    app.innerHTML = `<p>${rows.length} matching concepts</p>${release ? `<p><a href="${esc(release.download_url)}">Download course ZIP</a> · ${release.video_count} videos · ${esc(release.version)} · ${esc(release.updated_at)}</p>` : ''}${state.course ? `<p><a href="${esc(product)}" target="_blank" rel="noreferrer">Explore Leadde animation tools</a> · Copy a prompt and adapt it manually.</p>` : ''}<div class="prompt-grid">${rows.map(x => {
      const media=x.media||{}, reuse=x.reuse||{}, production=x.production||{};
      return `<article class="prompt" id="${esc(x.id)}"><div class="preview">${ready(x) ? `<video controls playsinline preload="none" ${x.cover ? `poster="${esc(x.cover)}"` : ''} src="${esc(x.video)}" aria-label="${esc(title(x))}"></video>` : '<span class="generating">AWAITING PRODUCTION</span>'}</div><div class="prompt-body"><span class="status">${ready(x) ? 'VIDEO AVAILABLE' : 'AWAITING PRODUCTION'} · ${esc(x.review?.status||'unreviewed')}</span><h2>${esc(title(x))}</h2><p>${esc(x.learning_objective||'Learning objective pending verification.')}</p><p><strong>Takeaway:</strong> ${esc(x.core_conclusion||'Pending verification.')}</p><p>${esc(x.id)} · ${esc(x.artifact_version)}${ready(x) ? ` · ${esc(media.duration_seconds)} s · ${esc(media.width)}×${esc(media.height)}` : ''}</p><p><a href="${esc(link({subject:x.subject,course:x.course,item:x.id}))}">Share this concept</a>${ready(x) ? ` · <a href="${esc(x.video)}" download>Download MP4</a>` : ''} · <a href="${esc(x.page)}">Course record</a></p><details><summary>Prompt · ${esc(reuse.status||'unverified')}</summary><p>${esc(reuse.notes)}</p><pre class="prompt-text">${esc(x.prompt||'Aligned final-video prompt pending.')}</pre>${x.prompt ? `<button type="button" class="copy" data-copy="${esc(x.id)}">Copy Prompt</button>` : ''}</details><p>Tool: ${esc(production.tool||'pending verification')}. Exact reproduction ${reuse.exact_reproduction_verified ? 'verified' : 'not verified'}.</p><a href="${esc(production.source_url||'docs/REUSE.md')}">Source / reproduction notes</a><ul>${(x.references||[]).map(r => `<li><a href="${esc(r.url)}">${esc(r.title||'Reference')}</a> — ${esc(r.scope||'')}</li>`).join('')||'<li>References pending verification.</li>'}</ul>${x.pending_sync?.length ? `<p>Pending synchronization: ${esc(x.pending_sync.join(', '))}</p>` : ''}</div></article>`;
    }).join('')}</div>`;
  }
  if (!rows.length) app.innerHTML = '<p>No concepts match these filters. <a href="#">Clear filters</a></p>';
  app.querySelectorAll('[data-copy]').forEach(button => button.onclick = async () => {
    const text = library.find(x => x.id === button.dataset.copy).prompt;
    try { await navigator.clipboard.writeText(text); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select and copy the text above'; }
  });
}
document.querySelector('#search').addEventListener('input', event => go({...readState(),q:event.target.value,item:''}));
document.querySelector('#ready-only').addEventListener('change', event => go({...readState(),ready:event.target.checked?'1':'',item:''}));
window.addEventListener('hashchange',render);
Promise.all([fetch('./data/prompts.json').then(r => {if(!r.ok) throw Error(r.status); return r.json();}),fetch('./data/releases.json').then(r=>r.ok?r.json():{}).catch(()=>({}))]).then(([data,packages]) => {
 library=data; releases=packages;
 document.querySelector('#stats').textContent=`${counts(library)} · ${new Set(library.map(x=>x.course)).size} courses · ${new Set(library.map(x=>x.subject)).size} disciplines`;
 render();
}).catch(() => app.innerHTML='<p class="empty">The catalog could not be loaded. Serve this directory over HTTP.</p>');
