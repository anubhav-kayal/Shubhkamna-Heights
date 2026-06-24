import LandingPage from '@/components/landing/LandingPage';
import { getLandingSettings, getBlogPosts } from '@/lib/firestore';
import { resolveBlogPosts } from '@/lib/fallbacks';

export default async function Home() {
  const [settings, blogPostsRaw] = await Promise.all([
    getLandingSettings(),
    getBlogPosts(3),
  ]);
  const blogPosts = resolveBlogPosts(blogPostsRaw, 3);
  return <LandingPage settings={settings} blogPosts={blogPosts} />;
}
