import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { content as c } from '../src/content.mjs';
import { escapeHTML as esc, renderCaseStudy } from '../src/components/projects.mjs';
import { projectPreviews } from '../src/components/previews.mjs';
import { projectNavigation } from '../src/components/case-layout.mjs';
import { customerRiskPage, modellingPage, dissertationPage } from '../src/components/analysis-cases.mjs';
import { bristolPage } from '../src/components/bristol.mjs';
import { nkustPage } from '../src/components/nkust.mjs';
import { addLanguageSwitch } from '../src/components/language-switch.mjs';
import { localizeHomeTemplate, localizeHomeContent } from '../src/locales/zh-TW.mjs';
import { localizeBristolPage } from '../src/locales/bristol-zh-TW.mjs';
import { localizeNkustPage } from '../src/locales/nkust-zh-TW.mjs';
const scale=c.research.scale;
const riskFigures=JSON.parse(await readFile(new URL('../src/data/customer-risk-figures.json',import.meta.url),'utf8'));
if(scale.securities*scale.sessionsPerSecurity*scale.cutoffsPerSession!==scale.marketStates ||
   scale.warmupSessions+scale.targetSessions!==scale.sessionsPerSecurity ||
   scale.warmupRows+scale.targetRows!==scale.marketStates ||
   scale.spreadRecords+scale.depthRecords!==scale.shockRecords ||
   scale.droppedEvents!==0 || scale.duplicatedEvents!==0){
  throw Error('Dissertation data-scale values are internally inconsistent');
}
const link = (key,label,cls='') => {
 const url=c.links[key];
 if (!url || url.startsWith('TODO_')) return `<span class="unavailable ${cls}" aria-disabled="true" title="${esc(url || 'Link not supplied')}">${label}<span class="sr-only"> — link not yet available</span></span>`;
 const href=key==='email'?`mailto:${url}`:url;
 if (!/^(https:\/\/|mailto:|\.\/|\/)/.test(href)) throw Error(`Unsupported link: ${key}`);
 return `<a class="${cls}" href="${esc(href)}">${label}</a>`;
};
// Abstract depth layers, deliberately illustrative: no fabricated market observations.
let layers='';
for(let row=0;row<22;row++){
 let d='';
 for(let i=0;i<=120;i++){
 const x=80+i*8.7+row*3.3;
 const envelope=Math.exp(-Math.pow((i-63)/29,2));
 const y=282+row*6.1-envelope*(55+22*Math.sin(i*.19+row*.13)+29*Math.cos(i*.085-row*.11))-Math.exp(-Math.pow((i-75)/7,2))*68;
 d+=`${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)} `;
 }
 layers+=`<path d="${d}" fill="none" stroke="${row===9?'#a8f5ef':'#b8bec6'}" stroke-opacity="${row===9?'.85':(.13+row*.017).toFixed(2)}" stroke-width="${row===9?'1.5':'.8'}"/>`;
}
const visual=`<svg viewBox="0 0 1280 480" aria-hidden="true" focusable="false">${layers}</svg>`;
let html=await readFile(new URL('../src/index.html',import.meta.url),'utf8');
const values={
 NAV_RESUME:link('resume','Résumé <span aria-hidden="true">↗</span>','nav-resume'), HERO_RESUME:link('resume','Résumé <span aria-hidden="true">↗</span>'), HERO_VISUAL:visual,
 SKILLS:c.skills.map(([title,items])=>`<div><h3>${esc(title)}</h3><ul>${items.map(s=>`<li>${typeof s==='string'?esc(s):`<p class="skill-label">${esc(s.label)}</p>\n<p class="skill-detail">${esc(s.detail)}</p>`}</li>`).join('')}</ul></div>`).join(''),
 EDUCATION:c.education.map(([school,degree,years,status,ranking],i)=>`<div class="education-row"><span class="index">0${i+1}</span><h3><a class="education-link" href="./${i===0?'bristol':'nkust'}.html">${esc(school)} <span aria-hidden="true">↗</span></a></h3>\n<div class="education-details"><p>${esc(degree)}</p>\n<p class="education-years">${esc(years)}</p>${status?`\n<p class="education-status">${esc(status)}</p>`:''}${ranking?`\n<p class="education-ranking">${esc(ranking)}</p>`:''}</div></div>`).join(''),
 CONTACT:[['email','Email'],['linkedin','LinkedIn'],['github','GitHub'],['resume','Résumé']].map(([k,l])=>link(k,`${l} <span aria-hidden="true">↗</span>`)).join(''),
 PROJECT_PREVIEWS:projectPreviews(c),
 PROJECT_COUNT:String(c.projects.length+1).padStart(2,'0'),
 marketStatesShort:esc((scale.marketStates/1e6).toFixed(2)+'M'),
 shockRecordsShort:esc((scale.shockRecords/1e3).toFixed(1)+'K'),
 recoveryRowsShort:esc((scale.recoveryRows/1e6).toFixed(2)+'M'),
 ...Object.fromEntries(Object.entries(scale).map(([k,v])=>[k,esc(Number(v).toLocaleString('en-US'))])),
 researchTech:c.research.technologies.map(esc).join(' · '),
 scaleSecurities:esc(scale.securities),
 ...Object.fromEntries(Object.entries(c.research).map(([k,v])=>[k,esc(v)]))
};
const interpolate = (text, replacements=values) => text.replace(/\{\{(\w+)\}\}/g,(_,k)=>{if(!(k in replacements)) throw Error(`Unknown token ${k}`);return replacements[k]});
const siteUrl='https://m1n9yu2002.github.io';
const homeSeo = markup => markup.replace('</head>', `<link rel="canonical" href="${siteUrl}${markup.includes('<html lang="zh-TW">')?'/zh/':'/'}"><link rel="alternate" hreflang="en" href="${siteUrl}/"><link rel="alternate" hreflang="zh-TW" href="${siteUrl}/zh/"></head>`);
const bristolSeo = (markup, locale) => markup.replace('</head>', `<link rel="canonical" href="${siteUrl}${locale==='zh-TW'?'/zh/bristol.html':'/bristol.html'}"><link rel="alternate" hreflang="en" href="${siteUrl}/bristol.html"><link rel="alternate" hreflang="zh-TW" href="${siteUrl}/zh/bristol.html"></head>`);
const nkustSeo = (markup, locale) => markup.replace('</head>', `<link rel="canonical" href="${siteUrl}${locale==='zh-TW'?'/zh/nkust.html':'/nkust.html'}"><link rel="alternate" hreflang="en" href="${siteUrl}/nkust.html"><link rel="alternate" hreflang="zh-TW" href="${siteUrl}/zh/nkust.html"></head>`);
const zhContent=localizeHomeContent(c);
const zhValues={
 ...values,
 NAV_RESUME:link('resume','履歷 <span aria-hidden="true">↗</span>','nav-resume'),
 HERO_RESUME:link('resume','履歷 <span aria-hidden="true">↗</span>'),
 PROJECT_PREVIEWS:projectPreviews(zhContent,'zh-TW'),
 SKILLS:zhContent.skills.map(([title,items])=>`<div><h3>${esc(title)}</h3><ul>${items.map(s=>`<li>${typeof s==='string'?esc(s):`<p class="skill-label">${esc(s.label)}</p>\n<p class="skill-detail">${esc(s.detail)}</p>`}</li>`).join('')}</ul></div>`).join(''),
 EDUCATION:zhContent.education.map(([school,degree,years,status,ranking],i)=>`<div class="education-row"><span class="index">0${i+1}</span><h3><a class="education-link" href="${i===0?'/zh/bristol.html':'/zh/nkust.html'}">${esc(school)} <span aria-hidden="true">↗</span></a></h3>\n<div class="education-details"><p>${esc(degree)}</p>\n<p class="education-years">${esc(years)}</p>${status?`\n<p class="education-status">${esc(status)}</p>`:''}${ranking?`\n<p class="education-ranking">${esc(ranking)}</p>`:''}</div></div>`).join(''),
 CONTACT:[['email','Email'],['linkedin','LinkedIn'],['github','GitHub'],['resume','履歷']].map(([k,l])=>link(k,`${l} <span aria-hidden="true">↗</span>`)).join('')
};
const zhHtml=homeSeo(interpolate(localizeHomeTemplate(html),zhValues));
html=homeSeo(interpolate(html));
// Matching destinations are enabled only after the corresponding page exists.
const localizedPages = {'index.html': {zh:'/zh/'}, 'bristol.html': {zh:'/zh/bristol.html'}, 'nkust.html': {zh:'/zh/nkust.html'}};
const withLanguageSwitch = (filename, markup) => addLanguageSwitch(markup, {
 currentLocale: 'en', alternateHref: localizedPages[filename]?.zh ?? null
});
await mkdir(new URL('../dist/assets/',import.meta.url),{recursive:true});
await writeFile(new URL('../dist/index.html',import.meta.url),withLanguageSwitch('index.html',html));
await mkdir(new URL('../dist/zh/',import.meta.url),{recursive:true});
await writeFile(new URL('../dist/zh/index.html',import.meta.url),addLanguageSwitch(zhHtml,{currentLocale:'zh-TW',alternateHref:'/'}));
for(const file of ['styles.css','app.js','favicon.svg']) await copyFile(new URL(`../src/${file}`,import.meta.url),new URL(`../dist/assets/${file}`,import.meta.url));
await copyFile(new URL('../src/resume-viewer.js',import.meta.url),new URL('../dist/assets/resume-viewer.js',import.meta.url));
await mkdir(new URL('../dist/assets/pdfjs/',import.meta.url),{recursive:true});
for(const file of ['pdf.min.mjs','pdf.worker.min.mjs']) await copyFile(new URL(`../node_modules/pdfjs-dist/build/${file}`,import.meta.url),new URL(`../dist/assets/pdfjs/${file}`,import.meta.url));
await copyFile(new URL('../node_modules/pdfjs-dist/LICENSE',import.meta.url),new URL('../dist/assets/pdfjs/LICENSE',import.meta.url));
await copyFile(new URL('../src/Mingyu_Wang_Data_Analyst_CV.pdf',import.meta.url),new URL('../dist/Mingyu_Wang_Data_Analyst_CV.pdf',import.meta.url));
await copyFile(new URL('../src/pages/resume.html',import.meta.url),new URL('../dist/resume.html',import.meta.url));
await mkdir(new URL('../dist/assets/customer-risk/',import.meta.url),{recursive:true});
for(const file of ['risk-exposure-fomo.png','selected-cohort-pnl.png']) await copyFile(new URL(`../src/assets/customer-risk/${file}`,import.meta.url),new URL(`../dist/assets/customer-risk/${file}`,import.meta.url));
const allProjects=[{id:'liquidity-shock',...c.research},...c.projects];
const pagination=id=>projectNavigation(id,allProjects);
const existingResearch=interpolate(await readFile(new URL('../src/pages/liquidity-shock.html',import.meta.url),'utf8'));
const pages={
 'liquidity-shock':dissertationPage(c.research,existingResearch,pagination('liquidity-shock')),
 mindpass:renderCaseStudy(c.projects.find(p=>p.id==='mindpass'),pagination('mindpass')),
 'customer-risk':customerRiskPage(c.projects.find(p=>p.id==='customer-risk'),pagination('customer-risk'),riskFigures),
 'modelling-pipeline':modellingPage(c.projects.find(p=>p.id==='modelling-pipeline'),pagination('modelling-pipeline'))
 ,bristol:bristolPage(),nkust:nkustPage()
};
for(const [slug,page] of Object.entries(pages))await writeFile(new URL(`../dist/${slug}.html`,import.meta.url),withLanguageSwitch(`${slug}.html`,slug==='bristol'?bristolSeo(page,'en'):slug==='nkust'?nkustSeo(page,'en'):page));
await writeFile(new URL('../dist/zh/bristol.html',import.meta.url),addLanguageSwitch(bristolSeo(localizeBristolPage(pages.bristol),'zh-TW'),{currentLocale:'zh-TW',alternateHref:'/bristol.html'}));
await writeFile(new URL('../dist/zh/nkust.html',import.meta.url),addLanguageSwitch(nkustSeo(localizeNkustPage(pages.nkust),'zh-TW'),{currentLocale:'zh-TW',alternateHref:'/nkust.html'}));
await writeFile(new URL('../dist/.nojekyll',import.meta.url),'');
console.log('Production build complete: dist/ (static, relative asset paths).');
