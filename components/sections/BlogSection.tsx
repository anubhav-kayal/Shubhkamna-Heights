'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getBlogPosts } from '@/lib/firestore';
import type { BlogPost } from '@/types';
import { formatDisplayDate } from '@/lib/site';
import { resolveBlogPosts } from '@/lib/fallbacks';
import { useTranslation } from '@/context/LocaleContext';
import {
  PageContainer,
  Section,
  SectionHeaderCenter,
  SectionKicker,
  SectionHeading,
  SectionCopy,
  GoldRule,
  Button,
} from '@/components/ui/design';

export default function BlogSection() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getBlogPosts(3);
        setPosts(resolveBlogPosts(data, 3));
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPosts(resolveBlogPosts([], 3));
      } finally {
        setLoading(false);
      }
    };

    void loadPosts();
  }, []);

  return (
    <Section tone="dark">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeaderCenter>
            <SectionKicker centered>{t('sections.blog.kicker')}</SectionKicker>
            <SectionHeading className="mt-3">{t('sections.blog.title')}</SectionHeading>
            <SectionCopy className="mx-auto mt-3 max-w-xl text-center">{t('sections.blog.lead')}</SectionCopy>
            <GoldRule className="mx-auto mt-6" />
          </SectionHeaderCenter>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-text-secondary">{t('sections.blog.loading')}</div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10 grid min-w-0 grid-cols-1 gap-5 sm:mb-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group min-w-0 overflow-hidden border border-border-gold bg-bg-card transition-colors hover:border-gold"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
                  </div>

                  <div className="space-y-4 p-5 sm:p-6">
                    <span className="inline-block border border-gold/50 bg-gold/20 px-3 py-1 text-xs font-medium text-gold">
                      {post.category}
                    </span>

                    <h3 className="line-clamp-2 font-cormorant text-xl font-bold text-text-primary transition-colors group-hover:text-gold">
                      {post.title}
                    </h3>

                    <p className="line-clamp-2 text-sm text-text-secondary">{post.excerpt}</p>

                    <div className="flex items-center justify-between border-t border-border-gold pt-4 text-xs text-text-secondary">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDisplayDate(post.publishedAt)}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-2 font-inter text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                    >
                      {t('sections.blog.readMore')} <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          <div className="border-t border-border-gold pt-8 text-center">
            <Link href="/blog">
              <Button className="inline-flex">
                {t('sections.blog.viewAll')} <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
