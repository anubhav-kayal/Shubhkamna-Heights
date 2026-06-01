import type { MetadataRoute } from 'next';
import { getAbsoluteUrl, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: getAbsoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}
