'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/types';
import { formatDisplayDate } from '@/lib/site';

const POSTS_PER_PAGE = 6;

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['all', ...new Set(posts.map((post) => post.category).filter(Boolean))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' || post.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-cormorant text-4xl font-bold text-[var(--text-primary)] sm:text-5xl">
            Blog &amp; Insights
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">
            Project updates, local market perspective, and practical guidance for buyers
            exploring residential life in Chandauli.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] py-3 pl-12 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none transition-colors focus:border-[var(--gold)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                    : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--gold)]'
                }`}
              >
                {category === 'all'
                  ? 'All'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {paginatedPosts.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center">
            <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
              No articles matched your filters
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              Try a broader search term or switch to another category.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] transition-colors hover:border-[var(--gold)]"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-center">
                        <span className="font-cormorant text-4xl font-bold text-[var(--gold)]/80">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex h-full flex-col p-6">
                    <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--gold)]">
                      {post.category}
                    </span>

                    <h2 className="font-cormorant text-2xl font-semibold text-[var(--text-primary)]">
                      {post.title}
                    </h2>

                    <p className="mt-3 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                      {post.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--text-secondary)]">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDisplayDate(post.publishedAt)}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
                    >
                      Read Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safePage === 1}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="text-sm text-[var(--text-secondary)]">
                  Page {safePage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safePage === totalPages}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
