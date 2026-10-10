export function pageHead(title: string, description: string, path = '') {
  const fullTitle = `${title} | KÍMBÀLÌ`;
  const canonicalUrl = `https://kimbali.studio${path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  };
}
