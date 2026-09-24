import {escapeHTML as e} from './utils.mjs';
export function projectNavigation(current, projects){
 const index=projects.findIndex(p=>p.id===current);
 const next=projects[(index+1)%projects.length];
 return `<nav class="project-pagination container" aria-label="Project navigation"><a href="./index.html#work"><span>← All Work</span><small>Back to selected projects</small></a><a href="${e(next.caseStudy)}"><span>Next Project →</span><small>${e(next.title)}</small></a></nav>`;
}
export function casePage({title,description,nav,body,pagination,pageClass=''}){
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#000000"><title>${e(title)} — Mingyu Wang</title><meta name="description" content="${e(description)}"><link rel="icon" href="./assets/favicon.svg"><link rel="stylesheet" href="./assets/styles.css"><script src="./assets/app.js" defer></script></head><body id="top" class="case-page ${e(pageClass)}"><a class="skip-link" href="#main">Skip to content</a><header class="glass-nav"><a class="wordmark" href="./index.html">Mingyu Wang<span class="brand-dot" aria-hidden="true">.</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="nav-links">Menu <span aria-hidden="true">+</span></button><nav id="nav-links" aria-label="Case study navigation">${nav.map(([id,label])=>`<a href="#${e(id)}">${e(label)}</a>`).join('')}</nav></header><main id="main">${body}</main>${pagination}<footer class="container"><span>Mingyu Wang</span><span>Data. Evidence. Understanding.</span><a href="#top">Back to top ↑</a></footer></body></html>`;
}
export const detailList = items => `<dl class="detail-list">${items.map(([title,copy])=>`<div><dt>${e(title)}</dt><dd>${e(copy)}</dd></div>`).join('')}</dl>`;
export const processLine = labels => `<ol class="process-line">${labels.map(label=>`<li>${e(label)}</li>`).join('')}</ol>`;
