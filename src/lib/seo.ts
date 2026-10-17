export function pageHead(title: string, description: string, path = '', image?: string) {
  const fullTitle = title.startsWith('KÍMBÀLÌ') ? title : `KÍMBÀLÌ | ${title}`;
  const canonicalUrl = `https://kimbali-crafted-luxury.vercel.app${path}`;
  const siteUrl = 'https://kimbali-crafted-luxury.vercel.app';
  const imageMeta = image?.startsWith('https://') ? [{ property: 'og:image', content: image }, { name: 'twitter:image', content: image }] : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        'name': 'KÍMBÀLÌ',
        'url': siteUrl,
        'logo': `${siteUrl}/Kimbali-logo-svg.svg`,
        'description': 'Nigerian custom leather bag design studio',
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        'url': siteUrl,
        'name': 'KÍMBÀLÌ',
        'publisher': {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': fullTitle,
        'description': description,
        'isPartOf': {
          '@id': `${siteUrl}/#website`,
        },
      },
    ],
  };

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'KÍMBÀLÌ' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      ...imageMeta,
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
    ],
    links: [
      { rel: 'canonical', href: canonicalUrl },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd),
      },
    ],
  };
}
