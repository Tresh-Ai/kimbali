export function pageHead(title: string, description: string, path = '', image = '/og-image.webp') {
  const fullTitle = title.startsWith('KÍMBÀLÌ') ? title : `KÍMBÀLÌ | ${title}`;
  const canonicalUrl = `https://kimbali.studio${path}`;
  const siteUrl = 'https://kimbali.studio';
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;

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
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: fullTitle },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@yourusername' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
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
