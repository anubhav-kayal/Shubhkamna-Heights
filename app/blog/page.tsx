'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/firestore';
import { MOCK_POSTS } from '@/lib/constants';
import type { BlogPost } from '@/types';
import { Search, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogPosts();
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(MOCK_POSTS);
        }
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts(MOCK_POSTS);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      const uniqueCategories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];
      setCategories(uniqueCategories);
    }
  }, [posts]);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  }, [posts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--bg-card)] border-b border-[var(--border)] py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Blog & Insights
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Discover tips, updates, and stories from the real estate world
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg py-3 pl-12 pr-4 text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </motion.div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full font-inter text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--gold)]'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--border)] animate-pulse"
              >
                <div className="h-48 bg-[var(--border)]" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-[var(--border)] rounded w-1/3" />
                  <div className="h-6 bg-[var(--border)] rounded" />
                  <div className="h-4 bg-[var(--border)] rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!loading && paginatedPosts.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] flex items-center justify-center overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="text-[var(--bg-card)] text-center">
                        <div className="font-cormorant text-3xl font-bold">{post.title.charAt(0)}</div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-full">
                    {/* Category */}
                    <span className="inline-flex w-fit px-3 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-semibold mb-3">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-cormorant text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-4 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] border-t border-[var(--border)] pt-4">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {(() => {
                          const date =
                            post.publishedAt instanceof Date
                              ? post.publishedAt
                              : typeof post.publishedAt === 'object' && 'toDate' in post.publishedAt
                                ? (post.publishedAt as any).toDate()
                                : new Date(post.publishedAt);
                          return date.toLocaleDateString();
                        })()}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors mt-4 font-inter font-semibold text-sm"
                    >
                      Read More <ChevronRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-4"
              >
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--gold)] disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-inter font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                          : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--gold)]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--gold)] disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && paginatedPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[var(--text-secondary)] text-lg">No articles found. Try adjusting your filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
