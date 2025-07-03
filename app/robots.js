export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search/', '/admin/', '/wp-admin/'],
    },
    sitemap: 'https://pacesetterfrontier.com/sitemap.xml',
  }
}