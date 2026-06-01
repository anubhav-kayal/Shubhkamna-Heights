'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getBlogPosts } from '@/lib/firestore';
import type { BlogPost } from '@/types';
import { FALLBACK_BLOG_POSTS, formatDisplayDate } from '@/lib/site';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getBlogPosts(3);
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(FALLBACK_BLOG_POSTS.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPosts(FALLBACK_BLOG_POSTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
              Insights & Updates
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Stay informed with our latest blog posts
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto mt-6"></div>
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-[var(--text-secondary)]">Loading blog posts...</div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--gold)] transition-all duration-300"
                >
                  {/* Cover Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)] flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className="text-[var(--text-secondary)] text-sm">Cover Image</div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Category */}
                    <span className="inline-block px-3 py-1 bg-[var(--gold)]/20 text-[var(--gold)] text-xs font-medium rounded-full border border-[var(--gold)]/50">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-cormorant text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] pt-4 border-t border-[var(--border)]">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDisplayDate(post.publishedAt)}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors mt-4 font-inter font-semibold text-sm"
                    >
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* View All Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center pt-8 border-t border-[var(--border)]"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300"
            >
              View All Posts <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
