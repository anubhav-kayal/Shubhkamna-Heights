'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
              See It to Believe It
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto"></div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-inter font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[var(--gold)] text-[var(--text-dark)]'
                    : 'border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--text-dark)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-[var(--text-secondary)]">Loading gallery...</div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {images.map(image => (
                <motion.div
                  key={image.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid-column"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)] flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <div className="text-center text-[var(--text-secondary)]">
                      <p className="text-sm">Image</p>
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <p className="text-[var(--text-primary)] font-inter text-sm">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12 pt-8 border-t border-[var(--border)]"
          >
            <button className="px-8 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300">
              View Full Gallery
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
