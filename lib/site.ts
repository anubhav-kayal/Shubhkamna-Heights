import { FALLBACK_BLOG_POSTS } from '@/lib/blog-posts';
import { resolveImageUrl } from '@/lib/placeholders';
import type { BlogPost, FirestoreDateLike } from '@/types';

export { FALLBACK_BLOG_POSTS };

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://shubhkamnaheights.vercel.app';

export function toDate(value: FirestoreDateLike | null | undefined): Date {
  if (!value) {
    return new Date();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }

  return new Date();
}

export function formatDisplayDate(value: FirestoreDateLike | null | undefined): string {
  return toDate(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => toDate(b.publishedAt).getTime() - toDate(a.publishedAt).getTime()
  );
}

export function getBlogPostsWithFallback(posts: BlogPost[]): BlogPost[] {
  const list = posts.length > 0 ? posts : FALLBACK_BLOG_POSTS;
  return sortBlogPosts(
    list.map((post, index) => ({
      ...post,
      coverImage: resolveImageUrl(post.coverImage, 'blog', post.slug || index),
    }))
  );
}

export function getBlogPostWithFallback(posts: BlogPost[], slug: string): BlogPost | null {
  return getBlogPostsWithFallback(posts).find((post) => post.slug === slug) ?? null;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function estimateReadMinutes(
  content: string,
  excerpt = '',
  readTimeMinutes?: number
): number {
  if (readTimeMinutes && readTimeMinutes > 0) {
    return readTimeMinutes;
  }
  const words = stripHtml(content || excerpt).split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 200));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAbsoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
