'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/types';
import { estimateReadMinutes, formatDisplayDate } from '@/lib/site';
import { cn } from '@/lib/cn';
import { useTranslation } from '@/context/LocaleContext';
import { EditorialHero, KickerLight, PageContainer } from '@/components/ui/design';

function AuthorAvatar({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || 'S';
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-gold-dark/25 bg-gold/10 font-inter text-xs font-semibold text-gold-dark"
      aria-hidden
    >
      {initial}
    </span>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation();
  const readMin = estimateReadMinutes(post.content, post.excerpt, post.readTimeMinutes);

  return (
    <article className="flex h-full flex-col overflow-hidden border border-border-on-light bg-white shadow-[0_12px_36px_rgba(26,26,36,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(26,26,36,0.1)]">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gold-dark">
          {post.category}
        </p>
        <Link href={`/blog/${post.slug}`} className="block">
          <h2 className="font-cormorant text-xl font-semibold leading-snug text-text-dark transition-colors hover:text-gold-dark">
            {post.title}
          </h2>
        </Link>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-on-light">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border-on-light pt-4 text-xs text-subtle-on-light">
          <div className="flex min-w-0 items-center gap-2">
            <AuthorAvatar name={post.author} />
            <span className="truncate">{post.author}</span>
          </div>
          <time className="shrink-0 tabular-nums" dateTime={formatDisplayDate(post.publishedAt)}>
            {formatDisplayDate(post.publishedAt)}
          </time>
        </div>
        <p className="sr-only">
          {readMin} {t('sections.blogPage.minRead')}
        </p>
      </div>
    </article>
  );
}

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const { t } = useTranslation();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const aTime = new Date(a.publishedAt as string | Date).getTime();
      const bTime = new Date(b.publishedAt as string | Date).getTime();
      return bTime - aTime;
    });
  }, [posts]);

  const featuredPosts = sortedPosts.slice(0, 4);
  const featuredPost = featuredPosts[featuredIndex] ?? featuredPosts[0];
  const sidebarFeatured = featuredPosts.filter((_, i) => i !== featuredIndex).slice(0, 3);
  const gridPosts = sortedPosts;

  return (
    <div className="min-h-screen bg-bg-light text-text-dark">
      <EditorialHero>
        <PageContainer>
          <KickerLight className="mb-3">{t('sections.blogPage.kicker')}</KickerLight>
          <h1 className="font-cormorant text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-text-dark">
            {t('sections.blogPage.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-on-light">
            {t('sections.blogPage.lead')}
          </p>
        </PageContainer>
      </EditorialHero>

      <PageContainer className="py-10 sm:py-14">
        {featuredPost && (
          <section
            className="mb-10 grid gap-6 lg:mb-14 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-8"
            aria-label="Featured articles"
          >
            <div className="min-w-0">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative block overflow-hidden border border-border-on-light bg-text-dark shadow-[0_20px_50px_rgba(26,26,36,0.12)]"
              >
                <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text-dark/90 via-text-dark/35 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/85">
                    {featuredPost.category}
                  </p>
                  <h2 className="mt-3 font-cormorant text-2xl font-semibold leading-snug text-white sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/75 sm:text-sm">
                    <AuthorAvatar name={featuredPost.author} />
                    <span>{featuredPost.author}</span>
                    <span className="hidden h-1 w-1 bg-white/40 sm:inline" aria-hidden />
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Calendar size={14} aria-hidden />
                      {formatDisplayDate(featuredPost.publishedAt)}
                    </span>
                    <span className="hidden h-1 w-1 bg-white/40 sm:inline" aria-hidden />
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Clock size={14} aria-hidden />
                      {estimateReadMinutes(
                        featuredPost.content,
                        featuredPost.excerpt,
                        featuredPost.readTimeMinutes,
                      )}{' '}
                      {t('sections.blogPage.minRead')}
                    </span>
                  </div>
                </div>
              </Link>

              {featuredPosts.length > 1 && (
                <div className="mt-4 flex gap-2" role="tablist" aria-label="Featured article selector">
                  {featuredPosts.map((post, index) => (
                    <button
                      key={post.id}
                      type="button"
                      role="tab"
                      aria-selected={index === featuredIndex}
                      aria-label={post.title}
                      className={cn(
                        'h-2 transition-all duration-200',
                        index === featuredIndex
                          ? 'w-6 bg-gold-dark'
                          : 'w-2 bg-border-on-light hover:bg-gold-dark/50',
                      )}
                      onClick={() => setFeaturedIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {sidebarFeatured.length > 0 && (
              <aside className="min-w-0">
                <KickerLight className="mb-4">{t('sections.blogPage.otherFeatured')}</KickerLight>
                <ul className="space-y-3">
                  {sidebarFeatured.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex gap-3 border border-border-on-light bg-white p-3 transition-colors hover:border-gold-dark/30"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-text-dark">
                            {post.title}
                          </p>
                          <p className="mt-1 text-xs tabular-nums text-subtle-on-light">
                            {formatDisplayDate(post.publishedAt)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </section>
        )}

        <section
          className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          aria-label="All articles"
        >
          {gridPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
      </PageContainer>
    </div>
  );
}
