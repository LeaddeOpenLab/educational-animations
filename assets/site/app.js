const REPO = 'https://github.com/LeaddeOpenLab/educational-animations';
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readState = () => Object.fromEntries(new URLSearchParams(location.hash.slice(1)));
const route = values => '#' + new URLSearchParams(Object.entries(values).filter(([,v]) => v)).toString();
const sourceURL = path => /^https?:\/\//.test(path || '') ? path : `${REPO}/blob/main/${path || 'docs/REUSE.md'}`;
let library = [], catalog, visible = 9, lastFilter = '', openedId = '', returnFocus;
const selected = () => readState();
const isReady = item => item.status === 'ready' && item.video;
const title = item => item.standard_name || item.title;
const describe = item => item.learning_objective || `Explore ${title(item).toLowerCase()} through an animation prompt for ${item.course}.`;
const duration = item => item.media?.duration_seconds ? `${Math.round(item.media.duration_seconds)}s` : 'MP4';
function changeFilters(values, replace = false) {
  const url = route({...selected(), ...values, item:''});
  if (replace) { history.replaceState(null, '', url); render(); }
  else location.hash = url;
}
function imageMarkup(item, hero = false) {
  return item.cover ? `<img src="${esc(item.cover)}" alt="${esc(title(item))} — ${item.cover_kind === 'course' ? 'course artwork' : 'animation preview'}" ${hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="640" height="360">` : '<span class="placeholder-art" aria-hidden="true">∿</span>';
}
function renderHero() {
  const item = library.find(x => x.id === 'C01-A014') || library.find(isReady);
  if (!item) return;
  $('#hero-showcase').innerHTML = `<div class="showcase-window"><div class="window-bar"><i></i><i></i><i></i><span>A CONCEPT, IN MOTION</span></div><a class="hero-preview" href="${esc(route({item:item.id}))}" aria-label="Watch ${esc(title(item))}">${imageMarkup(item,true)}<span class="play-circle" aria-hidden="true">▶</span></a><div class="window-caption"><div><h3>${esc(title(item))}</h3><p>${esc(item.course)} · ${duration(item)}</p></div><span class="mini-tag">REAL VIDEO PREVIEW</span></div></div><div class="floating-note"><span aria-hidden="true">⌘</span><div><strong>More than a video.</strong><p>A prompt to start your next idea.</p></div></div>`;
}
function card(item) {
  return `<a class="card" href="${esc(route({...selected(),item:item.id}))}" aria-label="Open ${esc(title(item))}"><div class="card-image">${imageMarkup(item)}<span class="play-small">${isReady(item) ? '▶ Watch example' : 'Prompt available'}</span>${isReady(item) ? `<span class="duration">${duration(item)}</span>` : ''}</div><div class="card-body"><span class="card-kicker">${esc(item.subject)}</span><h3>${esc(title(item))}</h3><p class="card-description">${esc(describe(item))}</p><div class="card-bottom"><span>${esc(item.course)}</span><span aria-hidden="true">↗</span></div></div></a>`;
}
function render() {
  const state = selected();
  const filterKey = JSON.stringify([state.subject,state.course,state.q,state.ready]);
  if (filterKey !== lastFilter) {visible = 9; lastFilter = filterKey;}
  $('#search').value = state.q || '';
  $('#ready-only').checked = state.ready !== '0';
  const subjects = [...new Set(library.map(x => x.subject))];
  $('#subjects').innerHTML = [{name:'All disciplines',value:''},...subjects.map(name=>({name,value:name}))].map(({name,value}) => `<button class="subject ${(!state.subject && !value) || state.subject === value ? 'active' : ''}" data-subject="${esc(value)}" aria-pressed="${state.subject === value || (!state.subject && !value)}">${esc(name)}${value ? '' : `<small>${subjects.length}</small>`}</button>`).join('');
  const courses = [...new Set(library.filter(x => !state.subject || x.subject === state.subject).map(x => x.course))].sort();
  $('#course').innerHTML = '<option value="">All courses</option>'+courses.map(name=>`<option ${name===state.course?'selected':''} value="${esc(name)}">${esc(name)}</option>`).join('');
  let rows = library.filter(x => (!state.subject || x.subject === state.subject) && (!state.course || x.course === state.course) && (state.ready === '0' || isReady(x)));
  if (state.q) {
    const terms = state.q.trim().toLowerCase().split(/\s+/);
    rows = rows.filter(x => {const text=[title(x),x.id,x.subject,x.course,...(x.aliases||[])].join(' ').toLowerCase();return terms.every(term=>text.includes(term));});
  }
  const featured = catalog.featured;
  rows.sort((a,b) => (featured.indexOf(a.id) < 0 ? 999 : featured.indexOf(a.id)) - (featured.indexOf(b.id) < 0 ? 999 : featured.indexOf(b.id)));
  $('#results-title').textContent = state.q ? `Results for “${state.q}”` : state.course || state.subject || 'Handpicked for your first visit';
  $('#result-count').textContent = `${rows.length} ${state.ready === '0' ? 'concepts' : 'videos'} · showing ${Math.min(visible,rows.length)}`;
  $('#cards').innerHTML = rows.length ? rows.slice(0,visible).map(card).join('') : '<div class="empty"><h3>No concepts found</h3><p>Try a broader topic, another course, or include prompts without videos.</p><button class="button button-white" id="clear-filters">Clear filters</button></div>';
  $('#show-more').hidden = rows.length <= visible;
  if ($('#clear-filters')) $('#clear-filters').onclick = () => {location.hash = '';};
  $('#subjects').querySelectorAll('button').forEach(button => button.onclick = () => changeFilters({subject:button.dataset.subject,course:''}));
  if (state.item) showDetail(state.item);
  else closeDetail();
  if (!state.item) document.title = `${state.course || state.subject || 'Knowledge in Motion'} — Educational Animations by Leadde`;
}
function showDetail(id) {
  if (openedId === id) return;
  const item = library.find(x=>x.id===id);
  const dialog = $('#detail');
  if (!item) {
    $('#detail-content').innerHTML='<div class="detail-head"><h2 id="detail-title">Concept not found</h2><p>This link may be outdated. Close this panel and search the collection.</p></div>';
  } else {
    const production = item.production || {}, reuse = item.reuse || {}, media = item.media || {};
    const references = (item.references||[]).filter(x=>x.url);
    const page = item.page ? `${sourceURL(item.page)}#${item.id.toLowerCase()}` : `${REPO}/blob/main/catalog/INDEX.md`;
    const packageURL = catalog.releases[item.course_code || item.tags?.[1]]?.download_url;
    $('#detail-content').innerHTML = `<div class="detail-head"><p class="eyebrow">${esc(item.subject)} / ${esc(item.course)}</p><h2 id="detail-title">${esc(title(item))}</h2><p>${esc(describe(item))}</p></div>${isReady(item) ? `<div class="detail-video"><video controls playsinline preload="metadata" ${item.cover ? `poster="${esc(item.cover)}"` : ''} src="${esc(item.video)}" aria-label="${esc(title(item))}"></video></div><p class="detail-source" id="media-fallback" hidden>Video playback is unavailable here. <a href="${esc(item.player || item.video)}" target="_blank" rel="noopener">Open the original video ↗</a></p>` : '<div class="no-video">Video awaiting production · You can still explore the prompt below.</div>'}<div class="detail-columns"><div><div class="prompt-actions"><h3>Animation prompt</h3>${item.prompt ? '<button class="button button-small" id="copy-prompt">Copy prompt</button>' : ''}</div><p class="copy-status" id="copy-status" role="status"></p><pre class="prompt-text" tabindex="0">${esc(item.prompt || 'An aligned prompt has not been published for this concept yet.')}</pre><div class="detail-notes"><h3>How to use this example</h3><ol><li>Watch the animation and choose the concept and audience you want to explain.</li><li>Copy the English prompt. Adapt the topic, labels, timing and visual style.</li><li>${production.tool ? `Use ${esc(production.tool)} and follow the source instructions linked below.` : 'The original tool is not recorded. Choose a compatible animation workflow and check its required inputs.'}</li><li>Preview the result and check the explanation before using it in a lesson.</li></ol><p>${reuse.exact_reproduction_verified ? 'Exact reproduction is marked verified in this record.' : 'Exact reproduction is not verified for this example.'} ${esc(reuse.notes || '')}</p></div></div><aside><h3>Example details</h3><dl class="detail-meta"><dt>Concept ID</dt><dd>${esc(item.id)}</dd><dt>Availability</dt><dd>${isReady(item)?'Video available':'Awaiting production'}</dd><dt>Version</dt><dd>${esc(item.artifact_version || 'Not recorded')}</dd><dt>Format</dt><dd>${media.width ? `${esc(media.width)} × ${esc(media.height)} · ${duration(item)}` : 'Not recorded'}</dd><dt>Tool</dt><dd>${esc(production.tool || 'Not recorded')}</dd><dt>Environment</dt><dd>${esc((production.dependencies||[]).map(x=>typeof x === 'string'?x:JSON.stringify(x)).join(', ') || 'See source notes')}</dd><dt>Review</dt><dd>${esc((item.review?.status || 'unreviewed').replaceAll('_',' '))}</dd></dl>${item.core_conclusion ? `<div class="detail-notes"><h3>Key takeaway</h3><p>${esc(item.core_conclusion)}</p></div>` : ''}<div class="detail-links">${isReady(item)?`<a class="button button-white" href="${esc(item.video)}" target="_blank" rel="noopener">Open MP4 ↗</a>`:''}${packageURL?`<a class="button button-white" href="${esc(packageURL)}">Download course ZIP ↓</a>`:''}<button class="button button-white" id="share-concept">Copy link ↗</button></div><div class="detail-notes"><p>To save a video, open the MP4 and use your browser’s download option.</p></div></aside></div><div class="detail-source">Curated by Leadde Open Lab · <a href="${esc(page)}" target="_blank" rel="noopener">Original course record ↗</a> · <a href="${esc(sourceURL(production.source_url || 'docs/REUSE.md'))}" target="_blank" rel="noopener">Source & reuse notes ↗</a>${item.textbook?`<p>Course reference: ${esc(item.textbook)}</p>`:''}${references.length?`<p>References: ${references.map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title||x.url)}</a>`).join(' · ')}</p>`:''}</div>`;
    const video = dialog.querySelector('video');
    if (video) video.addEventListener('error',()=>{$('#media-fallback').hidden=false;});
    if ($('#copy-prompt')) $('#copy-prompt').onclick = () => copy(item.prompt,'Prompt copied. Adapt it to your own topic.');
    $('#share-concept').onclick = () => copy(location.href,'Concept link copied.');
    document.title = `${title(item)} — Knowledge in Motion`;
  }
  openedId = id;
  if (!dialog.open) {returnFocus = document.activeElement;dialog.showModal();}
}
async function copy(text, message) {
  try { await navigator.clipboard.writeText(text); $('#copy-status').textContent=message; }
  catch { $('#copy-status').textContent='Automatic copying is unavailable. Select the prompt text or copy the page URL from the address bar.'; }
}
function closeDetail() {
  if (!$('#detail').open) return;
  $('#detail').querySelector('video')?.pause();
  $('#detail').close();
  $('#detail-content').innerHTML='';
  openedId='';
  if (returnFocus?.isConnected) returnFocus.focus();
}
function dismissDetail() {
  const state = selected(); delete state.item;
  history.replaceState(null,'',route(state));
  closeDetail();
  document.title='Knowledge in Motion — Educational Animations by Leadde';
}
$('#detail .close-dialog').onclick = dismissDetail;
$('#detail').addEventListener('cancel',event=>{event.preventDefault();dismissDetail();});
$('#detail').addEventListener('click',event=>{if(event.target===$('#detail')) {const r=event.target.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dismissDetail();}});
$('#search').addEventListener('input',event=>changeFilters({q:event.target.value},true));
$('#course').addEventListener('change',event=>changeFilters({course:event.target.value}));
$('#ready-only').addEventListener('change',event=>changeFilters({ready:event.target.checked?'':'0'}));
$('#show-more').onclick=()=>{visible+=12;render();};
window.addEventListener('hashchange',()=>{if(catalog)render();});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!$('#detail').open&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){event.preventDefault();$('#search').focus();}});
fetch('./data/site-catalog.json').then(response=>{if(!response.ok)throw new Error(response.status);return response.json();}).then(data=>{
  catalog=data;library=data.items;renderHero();render();
}).catch(()=>{$('#hero-showcase').innerHTML='<p class="loading">Every idea starts with curiosity.</p>';$('#cards').innerHTML=`<div class="empty"><h3>The collection could not be loaded.</h3><p>Please refresh, or browse the complete library on GitHub.</p><a class="button button-white" href="${REPO}/blob/main/catalog/INDEX.md">Open the GitHub index ↗</a></div>`;});
