// The destination is supplied per page only when that locale's page exists.
export function addLanguageSwitch(html, { currentLocale = 'en', alternateHref = null } = {}) {
  const alternateLocale = currentLocale === 'en' ? 'zh' : 'en';
  const languageLabel = alternateLocale === 'zh' ? '繁' : 'EN';
  const languageName = alternateLocale === 'zh' ? 'Traditional Chinese' : 'English';
  const languageTag = alternateLocale === 'zh' ? 'zh-TW' : 'en';
  const arrow = '<span class="language-arrow" aria-hidden="true">→</span>';
  const linkLabel = currentLocale === 'en' ? `View this page in ${languageName}` : '切換至英文版';
  const control = alternateHref
    ? `<a class="language-switch" href="${escapeAttribute(alternateHref)}" lang="${languageTag}" hreflang="${languageTag}" aria-label="${linkLabel}"><span class="language-label" aria-hidden="true">${languageLabel}</span>${arrow}</a>`
    : `<span class="language-switch" lang="${languageTag}"><span class="language-label">${languageLabel}</span>${arrow}</span>`;
  const marker = '</nav></header>';
  if (!html.includes(marker)) throw Error('Floating navigation not found');
  return html.replace(marker, `</nav>${control}</header>`);
}

function escapeAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}
