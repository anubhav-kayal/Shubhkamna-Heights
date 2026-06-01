'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/firestore';
import { MOCK_POSTS } from '@/lib/constants';
import type { BlogPost } from '@/types';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const loadPost = async () => {
      try {
        setLoading(true);
        let foundPost = await getBlogPostBySlug(slug);

        if (!foundPost) {
          // Fallback to mock data
          foundPost = MOCK_POSTS.find(p => p.slug === slug) || null;
        }

        setPost(foundPost);

        if (foundPost) {
          // Load related posts from same category
          const allPosts = await getBlogPosts();
          const related = (allPosts.length > 0 ? allPosts : MOCK_POSTS)
            .filter(p => p.category === foundPost.category && p.slug !== slug)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error loading post:', error);
        // Try mock data
        const foundPost = MOCK_POSTS.find(p => p.slug === slug);
        setPost(foundPost || null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-[var(--border)] rounded mb-4" />
          <div className="h-4 w-full bg-[var(--border)] rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-cormorant text-3xl font-bold text-[var(--text-primary)] mb-4">
            Article Not Found
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">Sorry, we couldn't find the article you're looking for.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)]">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--bg-card)] border-b border-[var(--border)] py-8"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] mb-6">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] text-sm font-semibold">
              {post.category}
            </span>

            <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>
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
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-lg overflow-hidden border border-[var(--border)] h-96 sm:h-[500px]"
          >
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-invert max-w-none"
        >
          <div className="font-inter text-[var(--text-primary)] leading-relaxed space-y-4 mb-12">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
        </motion.article>

        {/* Divider */}
        <div className="border-t border-[var(--border)] my-12" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-cormorant text-3xl font-bold text-[var(--text-primary)] mb-8">Related Articles</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, idx) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
                >
                  <div className="h-40 bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)]" />

                  <div className="p-4">
                    <span className="text-xs text-[var(--gold)]">{relatedPost.category}</span>
                    <h3 className="font-cormorant text-lg font-bold text-[var(--text-primary)] mt-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mt-2 line-clamp-2">{relatedPost.excerpt}</p>

                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] text-sm font-semibold mt-4"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
