const header = document.querySelector('.glass-nav');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav-links');
const mobile = matchMedia('(max-width: 700px)');
function setOpen(open, restoreFocus = false) {
  header.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('span').textContent = open ? '−' : '+';
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  setOpen(false);
  // Move focus to the destination so keyboard navigation continues in the section.
  if (mobile.matches && link.hash) {
    const destination = document.querySelector(link.hash);
    if (destination) { destination.tabIndex = -1; destination.focus({preventScroll:true}); }
  }
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && header.classList.contains('open')) setOpen(false, true); });
document.addEventListener('click', event => { if (!header.contains(event.target)) setOpen(false); });
header.addEventListener('focusout', () => { setTimeout(() => { if (!header.contains(document.activeElement)) setOpen(false); }, 0); });
mobile.addEventListener('change', () => setOpen(false));
function updateScroll() {
 header.classList.toggle('scrolled', window.scrollY > 24);
 let active = '';
 for (const anchor of nav.querySelectorAll('a[href^="#"]')) {
   const id=anchor.hash.slice(1);
   const section=document.getElementById(id);
   if (section && section.getBoundingClientRect().top <= innerHeight * .38) active=id;
 }
 for (const anchor of nav.querySelectorAll('a[href^="#"]')) {
   if (anchor.hash === `#${active}`) anchor.setAttribute('aria-current','location');
   else anchor.removeAttribute('aria-current');
 }
}
window.addEventListener('scroll', updateScroll, { passive:true });
updateScroll();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
 const heroCopy = document.querySelector('.home-page .hero-copy');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
   if (entry.target === heroCopy) heroCopy.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
   else entry.target.classList.add('visible');
   observer.unobserve(entry.target);
  }
 }), {threshold:.12});
 document.querySelectorAll('.reveal').forEach(el => {
  el.classList.add('ready');
  if (heroCopy?.contains(el)) return;
  if (el.matches('.case-hero h1.reveal.ready, .bristol-hero-type.reveal.ready, .nkust-hero-type.reveal.ready')) {
   // Its starting state must paint before the in-viewport observer reveals it.
   requestAnimationFrame(() => requestAnimationFrame(() => {
    if (!reducedMotion.matches) observer.observe(el);
   }));
  } else observer.observe(el);
 });
 if (heroCopy) requestAnimationFrame(() => requestAnimationFrame(() => {
  if (!reducedMotion.matches) observer.observe(heroCopy);
 }));
 reducedMotion.addEventListener('change', event => { if (event.matches) { observer.disconnect(); document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); } });
} else {
 document.querySelectorAll('.case-hero h1.reveal.ready, .bristol-hero-type.reveal.ready, .nkust-hero-type.reveal.ready, .home-page .hero-copy .reveal.ready').forEach(el => el.classList.remove('ready'));
}

// Dissertation results animate once when reached; the HTML always starts with final values.
const resultSection = document.querySelector('.concise-results');
if (resultSection && 'IntersectionObserver' in window && !reducedMotion.matches) {
 const countNodes = [...resultSection.querySelectorAll('[data-count-to]')];
 resultSection.classList.add('motion-ready');
 const lineObserver = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
   resultSection.classList.add('line-visible');
   lineObserver.unobserve(entry.target);
  }
 }, {threshold:.25});
 lineObserver.observe(resultSection.querySelector('.recovery-plot'));
 const earlyResult=resultSection.querySelector('.early-result');
 const countObserver = new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) {
   countObserver.unobserve(entry.target);
   entry.target.classList.add('count-started');
   countNodes.forEach(node => {
    const target=Number(node.dataset.countTo);
    const duration=1500;
    let start;
    node.textContent='0.00';
    function frame(time) {
     if (reducedMotion.matches) {node.textContent=target.toFixed(2);return;}
     if (start === undefined) start=time;
     const progress=Math.min((time-start)/duration,1);
     const eased=1-Math.pow(1-progress,3);
     node.textContent=(target*eased).toFixed(2);
     if(progress<1) requestAnimationFrame(frame);
     else node.textContent=target.toFixed(2);
    }
    requestAnimationFrame(frame);
   });
  }
 }, {threshold:.3});
 countObserver.observe(earlyResult);
 reducedMotion.addEventListener('change', event => {
  if (!event.matches) return;
  lineObserver.disconnect();countObserver.disconnect();
  resultSection.classList.remove('motion-ready');
  countNodes.forEach(node=>{node.textContent=Number(node.dataset.countTo).toFixed(2);});
 });
}

// MindPass schema connectors are measured from the rendered table fields, so
// they stay attached as the diagram reflows and the central table expands.
const mindpassSchema = document.querySelector('.mindpass-schema');
if (mindpassSchema) {
 const diagram = mindpassSchema.querySelector('.mindpass-schema-diagram');
 const svg = diagram.querySelector('.mindpass-schema-lines');
 const grid = diagram.querySelector('.mindpass-schema-grid');
 const nodes = Object.fromEntries([...grid.querySelectorAll('[data-schema-node]')].map(node => [node.dataset.schemaNode, node]));
 // The relationship list is emitted from the supplied SQL's FK definitions.
 const relationships = [...mindpassSchema.querySelectorAll('.mindpass-schema-relations li')].map(item => [item.dataset.fromTable, item.dataset.fromColumn, item.dataset.toTable, item.dataset.toColumn]);
 const svgNS = 'http://www.w3.org/2000/svg';
 let activeNode = null;
 let framePending = false;
 const box = element => {
  const rect = element.getBoundingClientRect();
  const origin = diagram.getBoundingClientRect();
  return {left:rect.left-origin.left,right:rect.right-origin.left,top:rect.top-origin.top,bottom:rect.bottom-origin.top,width:rect.width,height:rect.height};
 };
 const fieldY = (node, field) => {
  const row = [...node.querySelectorAll('[data-schema-field]')].find(item => item.dataset.schemaField === field);
  const rect = box(row || node.querySelector('.mindpass-schema-node__header'));
  return rect.top + rect.height / 2;
 };
 function renderConnectors() {
  framePending = false;
  const width = diagram.clientWidth;
  const height = diagram.clientHeight;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.replaceChildren();
  const mobileSchema = matchMedia('(max-width: 1100px)').matches;
  relationships.forEach(([fromName, fromField, toName, toField], index) => {
   const from = box(nodes[fromName]);
   const to = box(nodes[toName]);
   let startX, startY, endX, endY, d;
   if (mobileSchema) {
    const rightLane = matchMedia('(min-width: 541px)').matches && (fromName === 'therapists' || toName === 'therapists' || fromName === 'session_end_requests');
    startX = rightLane ? from.right : from.left;
    endX = rightLane ? to.right : to.left;
    startY = from.top + Math.min(43, from.height / 2);
    endY = to.top + Math.min(43, to.height / 2);
    const lane = rightLane ? width - 5 - index * 4 : 5 + index * 4;
    d = `M ${startX} ${startY} H ${lane} V ${endY} H ${endX}`;
   } else {
    const fromLeft = from.right < to.left;
    startX = fromLeft ? from.right : from.left;
    endX = fromLeft ? to.left : to.right;
    startY = fieldY(nodes[fromName], fromField);
    endY = fieldY(nodes[toName], toField);
    if (fromName === 'chat_attachments' && toName === 'sessions') {
     const messages = box(nodes.chat_messages);
     const endRequests = box(nodes.session_end_requests);
     const firstLane = (from.right + messages.left) / 2;
     const secondLane = (messages.right + to.left) / 2;
     const crossingY = (messages.bottom + endRequests.top) / 2;
     d = `M ${startX} ${startY} H ${firstLane} V ${crossingY} H ${secondLane} V ${endY} H ${endX}`;
    } else {
     const lane = (startX + endX) / 2;
     d = `M ${startX} ${startY} H ${lane} V ${endY} H ${endX}`;
    }
   }
   const isRelated = !activeNode || activeNode === fromName || activeNode === toName;
   const path = document.createElementNS(svgNS, 'path');
   path.setAttribute('d', d);
   if (activeNode) path.classList.add(isRelated ? 'is-active' : 'is-dimmed');
   svg.append(path);
   for (const [cx, cy] of [[startX, startY], [endX, endY]]) {
    const point = document.createElementNS(svgNS, 'circle');
    point.setAttribute('cx', cx);
    point.setAttribute('cy', cy);
    point.setAttribute('r', '2.3');
    if (activeNode) point.classList.add(isRelated ? 'is-active' : 'is-dimmed');
    svg.append(point);
   }
  });
 }
 function scheduleConnectors() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(renderConnectors);
 }
 function setActive(name) {
  activeNode = name;
  grid.classList.toggle('has-focus', !!name);
  for (const node of Object.values(nodes)) {
   const connected = relationships.some(([from,,,to]) => (from === name && to === node.dataset.schemaNode) || (to === name && from === node.dataset.schemaNode));
   node.classList.toggle('is-active', !!name && (node.dataset.schemaNode === name || connected));
   node.querySelectorAll('[data-schema-field]').forEach(row => row.classList.remove('is-related-field'));
  }
  if (name) for (const [fromTable, fromColumn, toTable, toColumn] of relationships) {
   if (name !== fromTable && name !== toTable) continue;
   nodes[fromTable].querySelectorAll('[data-schema-field]').forEach(row => { if (row.dataset.schemaField === fromColumn) row.classList.add('is-related-field'); });
   nodes[toTable].querySelectorAll('[data-schema-field]').forEach(row => { if (row.dataset.schemaField === toColumn) row.classList.add('is-related-field'); });
  }
  scheduleConnectors();
 }
 for (const node of Object.values(nodes)) {
  node.addEventListener('pointerenter', () => setActive(node.dataset.schemaNode));
  node.addEventListener('pointerleave', () => setActive(document.activeElement === node ? node.dataset.schemaNode : null));
  node.addEventListener('focus', () => setActive(node.dataset.schemaNode));
  node.addEventListener('blur', () => setActive(null));
  node.addEventListener('click', () => node.focus());
 }
 const toggle = mindpassSchema.querySelector('.mindpass-schema-toggle');
 const extras = mindpassSchema.querySelectorAll('.mindpass-schema-extra');
 const peripherals = mindpassSchema.querySelectorAll('.mindpass-schema-node--peripheral');
 const relations = mindpassSchema.querySelector('.mindpass-schema-relations');
 toggle.addEventListener('click', () => {
  const expanded = !mindpassSchema.classList.contains('is-expanded');
  mindpassSchema.classList.toggle('is-expanded', expanded);
  toggle.setAttribute('aria-expanded', String(expanded));
  toggle.innerHTML = `${expanded ? 'Collapse schema' : 'Explore schema detail'} <span aria-hidden="true">${expanded ? '−' : '+'}</span>`;
  extras.forEach(extra => extra.setAttribute('aria-hidden', String(!expanded)));
  peripherals.forEach(node => node.setAttribute('aria-hidden', String(!expanded)));
  relations.setAttribute('aria-hidden', String(!expanded));
  scheduleConnectors();
 });
 if ('ResizeObserver' in window) new ResizeObserver(scheduleConnectors).observe(diagram);
 window.addEventListener('resize', scheduleConnectors, {passive:true});
 scheduleConnectors();
}
