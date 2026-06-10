import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User } from 'lucide-react';
import {
  BlogPostBackLink,
  BlogPostReadTime,
  BlogPostRelatedKicker,
} from '@/components/blog/BlogPostLabels';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/firestore';
import { resolveImageUrl } from '@/lib/placeholders';
import {
  FALLBACK_BLOG_POSTS,
  estimateReadMinutes,
  formatDisplayDate,
  getAbsoluteUrl,
  getBlogPostsWithFallback,
  stripHtml,
  toDate,
} from '@/lib/site';
import { EditorialHero, PageContainer } from '@/components/ui/design';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function resolvePost(slug: string) {
  const post =
    (await getBlogPostBySlug(slug)) ??
    FALLBACK_BLOG_POSTS.find((entry) => entry.slug === slug) ??
    null;

  if (!post) {
    return null;
  }

  return {
    ...post,
    coverImage: resolveImageUrl(post.coverImage, 'blog', post.slug),
  };
}

export async function generateStaticParams() {
  const posts = getBlogPostsWithFallback(await getBlogPosts());
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: false },
    };
  }

  const description =
    post.metaDescription || post.excerpt || stripHtml(post.content).slice(0, 160);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: getAbsoluteUrl(`/blog/${post.slug}`),
      publishedTime: toDate(post.publishedAt).toISOString(),
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  };
}

function AuthorAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || 'S';
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-gold/15 font-inter text-xs font-semibold text-gold-dark">
      {initial}
    </span>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    notFound();
  }

  const posts = getBlogPostsWithFallback(await getBlogPosts());
  const relatedPosts = posts
    .filter((candidate) => candidate.slug !== post.slug)
    .slice(0, 3);

  const readMin = estimateReadMinutes(post.content, post.excerpt, post.readTimeMinutes);
  const description =
    post.metaDescription || post.excerpt || stripHtml(post.content).slice(0, 160);

  return (
    <article className="min-h-screen bg-bg-light text-text-dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            datePublished: toDate(post.publishedAt).toISOString(),
            author: { '@type': 'Person', name: post.author },
            image: post.coverImage ? [post.coverImage] : undefined,
            mainEntityOfPage: getAbsoluteUrl(`/blog/${post.slug}`),
          }),
        }}
      />

      <EditorialHero className="pb-8 sm:pb-10">
        <PageContainer className="max-w-3xl">
          <BlogPostBackLink />
          <p className="mt-6 font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">
            {post.category}
          </p>
          <h1 className="mt-3 font-cormorant text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-text-dark">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-on-light">
            <span className="inline-flex items-center gap-2">
              <User size={16} aria-hidden />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} aria-hidden />
              {formatDisplayDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} aria-hidden />
              <BlogPostReadTime minutes={readMin} />
            </span>
          </div>
        </PageContainer>
      </EditorialHero>

      <PageContainer className="max-w-3xl py-10 sm:py-12">
        {post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] overflow-hidden border border-border-on-light bg-white shadow-[0_12px_36px_rgba(26,26,36,0.06)] sm:mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        )}

        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {relatedPosts.length > 0 && (
          <section className="mt-14 border-t border-border-on-light pt-10 sm:mt-16">
            <BlogPostRelatedKicker />
            <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="flex h-full min-h-[5.5rem] gap-0 border border-border-on-light bg-white transition-colors hover:border-gold-dark/40 hover:bg-gold/[0.03]"
                >
                  <div className="relative w-20 shrink-0 self-stretch sm:w-24">
                    <Image
                      src={related.coverImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
                    <p className="font-inter text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                      {related.category}
                    </p>
                    <p className="mt-1.5 line-clamp-2 font-inter text-sm font-semibold leading-snug text-text-dark">
                      {related.title}
                    </p>
                    <p className="mt-1.5 text-xs tabular-nums text-subtle-on-light">
                      {formatDisplayDate(related.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </PageContainer>
    </article>
  );
}
