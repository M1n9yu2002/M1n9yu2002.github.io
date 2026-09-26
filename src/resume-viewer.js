import { getDocument, GlobalWorkerOptions, TextLayer } from './pdfjs/pdf.min.mjs';

document.querySelectorAll('footer [data-current-year]').forEach(year => {
  year.textContent = String(new Date().getFullYear());
});

const pdfUrl = '/Mingyu_Wang_Data_Analyst_CV.pdf';
GlobalWorkerOptions.workerSrc = new URL('./pdfjs/pdf.worker.min.mjs', import.meta.url).href;

const stage = document.querySelector('#resume-stage');
const pagesElement = document.querySelector('#resume-pages');
const pageCount = document.querySelector('#resume-page-count');
const status = document.querySelector('#resume-status');
const fallback = document.querySelector('#resume-fallback');
const controls = document.querySelector('.resume-controls');
const zoomOut = document.querySelector('#resume-zoom-out');
const zoomIn = document.querySelector('#resume-zoom-in');
const zoomLevel = document.querySelector('#resume-zoom-level');
const zoomSteps = [0.75, 1, 1.25, 1.5];
let zoomIndex = 1;
let pdfPages = [];
let rendering = false;
let rerenderRequested = false;
let resizeTimer;

function updateControls() {
  zoomLevel.value = `${Math.round(zoomSteps[zoomIndex] * 100)}%`;
  zoomOut.disabled = rendering || zoomIndex === 0;
  zoomIn.disabled = rendering || zoomIndex === zoomSteps.length - 1;
}

function updateActivePage() {
  const sheets = [...pagesElement.querySelectorAll('.resume-sheet')];
  if (!sheets.length) return;
  let active = 1;
  let largestVisibleArea = -1;
  for (const [index, sheet] of sheets.entries()) {
    const rect = sheet.getBoundingClientRect();
    const visibleHeight = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0));
    if (visibleHeight > largestVisibleArea) {
      largestVisibleArea = visibleHeight;
      active = index + 1;
    }
  }
  pageCount.textContent = matchMedia('(max-width: 380px)').matches
    ? `${active} / ${pdfPages.length}`
    : `Page ${active} of ${pdfPages.length}`;
  pageCount.setAttribute('aria-label', `Page ${active} of ${pdfPages.length}`);
}

async function renderPage(page, index, width) {
  const unscaled = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: width / unscaled.width });
  const sheet = document.createElement('article');
  sheet.className = 'resume-sheet';
  sheet.setAttribute('aria-label', `Résumé page ${index + 1} of ${pdfPages.length}`);
  sheet.style.width = `${viewport.width}px`;
  sheet.style.height = `${viewport.height}px`;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;
  const outputScale = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.ceil(viewport.width * outputScale);
  canvas.height = Math.ceil(viewport.height * outputScale);
  sheet.append(canvas);
  pagesElement.append(sheet);

  await page.render({
    canvas,
    viewport,
    transform: outputScale === 1 ? null : [outputScale, 0, 0, outputScale, 0, 0],
  }).promise;

  const text = document.createElement('div');
  text.className = 'resume-text-layer';
  text.style.setProperty('--total-scale-factor', String(viewport.scale));
  sheet.append(text);
  const textLayer = new TextLayer({
    textContentSource: page.streamTextContent(),
    container: text,
    viewport,
  });
  await textLayer.render();

  const annotations = await page.getAnnotations({ intent: 'display' });
  const links = document.createElement('div');
  links.className = 'resume-link-layer';
  for (const annotation of annotations) {
    if (!annotation.url || !/^(https:\/\/|mailto:)/i.test(annotation.url)) continue;
    const [a, b, c, d, e, f] = viewport.transform;
    const [x1, y1, x2, y2] = annotation.rect;
    const corners = [a * x1 + c * y1 + e, b * x1 + d * y1 + f,
      a * x2 + c * y2 + e, b * x2 + d * y2 + f];
    const left = Math.min(corners[0], corners[2]);
    const top = Math.min(corners[1], corners[3]);
    const anchor = document.createElement('a');
    anchor.href = annotation.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', `Open link in résumé: ${annotation.url}`);
    anchor.style.left = `${left}px`;
    anchor.style.top = `${top}px`;
    anchor.style.width = `${Math.abs(corners[2] - corners[0])}px`;
    anchor.style.height = `${Math.abs(corners[3] - corners[1])}px`;
    links.append(anchor);
  }
  sheet.append(links);
}

async function renderAll() {
  if (rendering) {
    rerenderRequested = true;
    return;
  }
  rendering = true;
  stage.hidden = false;
  fallback.hidden = true;
  controls.hidden = false;
  updateControls();
  pagesElement.setAttribute('aria-busy', 'true');
  status.hidden = false;
  status.textContent = 'Rendering résumé…';
  pagesElement.replaceChildren();
  try {
    const width = Math.min(860, stage.clientWidth) * zoomSteps[zoomIndex];
    pagesElement.style.setProperty('--page-width', `${width}px`);
    for (const [index, page] of pdfPages.entries()) await renderPage(page, index, width);
    status.hidden = true;
    pagesElement.setAttribute('aria-busy', 'false');
    stage.scrollLeft = Math.max(0, (pagesElement.scrollWidth - stage.clientWidth) / 2);
    updateActivePage();
  } catch (error) {
    console.error('Résumé rendering failed:', error);
    status.hidden = true;
    stage.hidden = true;
    controls.hidden = true;
    fallback.hidden = false;
  } finally {
    rendering = false;
    updateControls();
    if (rerenderRequested && !stage.hidden) {
      rerenderRequested = false;
      renderAll();
    }
  }
}

zoomOut.addEventListener('click', () => {
  if (zoomIndex === 0) return;
  zoomIndex--;
  updateControls();
  renderAll();
});
zoomIn.addEventListener('click', () => {
  if (zoomIndex === zoomSteps.length - 1) return;
  zoomIndex++;
  updateControls();
  renderAll();
});
window.addEventListener('scroll', updateActivePage, { passive: true });
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { if (pdfPages.length && !stage.hidden) renderAll(); }, 150);
});

try {
  const document = await getDocument({ url: pdfUrl }).promise;
  pdfPages = await Promise.all(Array.from({ length: document.numPages }, (_, index) => document.getPage(index + 1)));
  await renderAll();
} catch (error) {
  console.error('Résumé loading failed:', error);
  status.hidden = true;
  stage.hidden = true;
  controls.hidden = true;
  fallback.hidden = false;
}
