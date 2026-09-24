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
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
 }), {threshold:.12});
 document.querySelectorAll('.reveal').forEach(el => {
  el.classList.add('ready');
  if (el.matches('.case-hero h1.reveal.ready')) {
   // Its starting state must paint before the in-viewport observer reveals it.
   requestAnimationFrame(() => requestAnimationFrame(() => {
    if (!reducedMotion.matches) observer.observe(el);
   }));
  } else observer.observe(el);
 });
 reducedMotion.addEventListener('change', event => { if (event.matches) { observer.disconnect(); document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); } });
} else {
 document.querySelectorAll('.case-hero h1.reveal.ready').forEach(el => el.classList.remove('ready'));
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
