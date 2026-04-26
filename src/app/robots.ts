import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
  {
    userAgent: '*',
    allow: '/',
    disallow: ['/admin', '/api', '/_next'],
  },
  {
    userAgent: 'Googlebot',
    allow: '/',
  },
  {
    userAgent: 'Bingbot',
    allow: '/',
  },
  {
    userAgent: 'bing',
    allow: '/',
  },
  {
    userAgent: 'DuckDuckGo',
    allow: '/',
  },
  {
    userAgent: 'SemrushBot',
    allow: '/',
  },
  {
    userAgent: 'AhrefsBot',
    allow: '/',
  },
  {
    userAgent: 'mj12bot',
    allow: '/',
  },
  {
    userAgent: 'dotbot',
    allow: '/',
  },
  {
    userAgent: 'MSNBot',
    allow: '/',
  },
  {
    userAgent: 'Baiduspider',
    allow: '/',
  },
  {
    userAgent: '360Spider',
    allow: '/',
  },
  {
    userAgent: 'Yandex',
    allow: '/',
  },
  {
    userAgent: 'YandexBot',
    allow: '/',
  },
  {
    userAgent: 'Slackbot-LinkExpanding',
    allow: '/',
  },
],
    sitemap: 'https://webkye.in/sitemap.xml',
  };
}
