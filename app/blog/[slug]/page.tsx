import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/firestore';
import {
  FALLBACK_BLOG_POSTS,
  formatDisplayDate,
  getAbsoluteUrl,
  getBlogPostsWithFallback,
  stripHtml,
  toDate,
} from '@/lib/site';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function resolvePost(slug: string) {
  return (await getBlogPostBySlug(slug)) ?? FALLBACK_BLOG_POSTS.find((post) => post.slug === slug) ?? null;
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
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = post.excerpt || stripHtml(post.content).slice(0, 160);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await resolvePost(slug);

  if (!post) {
    notFound();
  }

  const posts = getBlogPostsWithFallback(await getBlogPosts());
  const relatedPosts = posts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
    .slice(0, 3);

  const description = post.excerpt || stripHtml(post.content).slice(0, 160);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description,
            datePublished: toDate(post.publishedAt).toISOString(),
            author: {
              '@type': 'Person',
              name: post.author,
            },
            image: post.coverImage ? [post.coverImage] : undefined,
            mainEntityOfPage: getAbsoluteUrl(`/blog/${post.slug}`),
          }),
        }}
      />

      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] py-6 sm:py-8">
        <div className="page-container max-w-4xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          <span className="inline-flex rounded-full bg-[var(--gold)]/10 px-3 py-1 text-sm font-semibold text-[var(--gold)]">
            {post.category}
          </span>

          <h1 className="section-heading mt-4 sm:mt-5">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {formatDisplayDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="page-container max-w-4xl py-8 sm:py-10 lg:py-12">
        {post.coverImage ? (
          <div className="relative mb-8 h-48 overflow-hidden rounded-2xl border border-[var(--border)] sm:mb-10 sm:h-72 sm:rounded-3xl lg:h-[28rem]">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="mb-8 flex h-48 items-center justify-center rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)] sm:mb-10 sm:h-72 sm:rounded-3xl lg:h-[28rem]">
            <span className="font-cormorant text-4xl font-bold text-[var(--gold)]/70 sm:text-6xl">
              {post.title.charAt(0)}
            </span>
          </div>
        )}

        <article className="space-y-6 text-base leading-8 text-[var(--text-primary)]">
          {post.content ? (
            <div
              className="space-y-6 [&_h2]:font-cormorant [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-[var(--text-primary)] [&_p]:text-[var(--text-secondary)]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-[var(--text-secondary)]">{post.excerpt}</p>
          )}
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-10 border-t border-[var(--border)] pt-8 sm:mt-12 sm:pt-10">
            <h2 className="section-subheading text-[var(--text-primary)]">
              Related Articles
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]"
                >
                  <div className="relative h-44 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)]">
                    {relatedPost.coverImage ? (
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-3 font-cormorant text-2xl font-semibold text-[var(--text-primary)]">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
                    >
                      Read Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
