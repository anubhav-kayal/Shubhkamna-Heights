import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/firestore';
import { getAbsoluteUrl, getBlogPostsWithFallback, toDate } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getBlogPostsWithFallback(await getBlogPosts());

  return [
    {
      url: getAbsoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: getAbsoluteUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: getAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: toDate(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
