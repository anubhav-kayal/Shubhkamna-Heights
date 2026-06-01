import type { Metadata } from 'next';
import BlogIndexClient from '@/components/blog/BlogIndexClient';
import { getBlogPosts } from '@/lib/firestore';
import { getBlogPostsWithFallback, getAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description:
    'Read updates, market perspective, and buyer guidance from Shubh Kamna Heights in Chandauli.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Shubh Kamna Heights Blog & Insights',
    description:
      'Project updates, local market perspective, and practical guidance for homebuyers in Chandauli.',
    url: getAbsoluteUrl('/blog'),
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = getBlogPostsWithFallback(await getBlogPosts());

  return <BlogIndexClient posts={posts} />;
}
