'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getGalleryImages } from '@/lib/firestore';
import type { GalleryImage } from '@/types';

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Exterior', 'Interior', 'Amenities', 'Views'];

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const data = await getGalleryImages(selectedCategory === 'All' ? undefined : selectedCategory);
        setImages(data);
      } catch (error) {
        console.error('Error loading gallery:', error);
        // Mock data fallback
        setImages(
          Array.from({ length: 12 }, (_, i) => ({
            id: `img-${i}`,
            imageUrl: `/placeholder-${i}.jpg`,
            category: selectedCategory,
            caption: `Gallery Image ${i + 1}`,
            order: i,
            active: true,
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    void loadGallery();
  }, [selectedCategory]);

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
        staggerChildren: 0.05,
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
    <section
      id="gallery"
      className="section-shell bg-[var(--bg-primary)]"
    >
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="section-header grid-safe grid gap-5 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
            <div className="min-w-0 max-w-3xl">
              <span className="section-kicker">Gallery</span>
              <h2 className="section-heading text-[var(--text-primary)]">
                See It to Believe It
              </h2>
              <div className="gold-rule my-4 sm:my-5" />
              <p className="section-lead">
                Explore exterior views, interiors, amenities, and surroundings — curated to show
                scale, finish quality, and the lived experience on site.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--border)] bg-[rgba(14,13,20,0.78)] p-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.18em] ${
                      selectedCategory === category
                        ? 'bg-[var(--gold)] text-[var(--text-dark)] shadow-[0_14px_28px_rgba(201,168,76,0.2)]'
                        : 'text-[var(--text-secondary)] hover:bg-[rgba(201,168,76,0.12)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-[var(--text-secondary)]">Loading gallery...</div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid-safe grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
            >
              {images.map((image) => {
                const hasImage = Boolean(
                  image.imageUrl && !image.imageUrl.includes('placeholder')
                );

                return (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className="group relative flex min-h-[11rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] sm:min-h-[12rem] sm:rounded-[1.75rem]"
                >
                  <div className="absolute inset-0">
                    {hasImage ? (
                      <div
                        role="img"
                        aria-label={image.caption}
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${image.imageUrl})` }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.22),transparent_38%),linear-gradient(135deg,rgba(31,29,39,1),rgba(16,15,22,1))]">
                        <div className="text-center text-[var(--text-secondary)]">
                          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]/70">
                            Media Placeholder
                          </p>
                          <p className="mt-3 font-cormorant text-3xl text-[var(--text-primary)]">
                            {image.category}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,12,0.96)] via-[rgba(8,8,12,0.18)] to-transparent" />
                  </div>

                  <div className="relative flex min-h-[11rem] flex-1 flex-col justify-between p-4 sm:min-h-[12rem] sm:p-5">
                    <span className="badge-pill w-fit border border-[var(--gold)]/25 bg-[rgba(9,8,15,0.55)] text-[var(--gold)]">
                      {image.category}
                    </span>
                    <div className="min-w-0 pt-3">
                      <p className="font-cormorant text-xl leading-tight text-[var(--text-primary)] text-balance sm:text-2xl">
                        {image.caption}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[rgba(247,243,233,0.72)]">
                        Visual preview from the {image.category.toLowerCase()} collection.
                      </p>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(201,168,76,0.1),rgba(16,15,22,1))] panel-padding sm:mt-10 sm:rounded-[1.75rem]"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]/75">
                  Visual Tour
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                  Once the final project photography, drone shots, and interiors arrive, this
                  section will carry the visual weight it is supposed to.
                </p>
              </div>
              <button className="btn-primary inline-flex items-center gap-2">
                View Full Gallery
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
