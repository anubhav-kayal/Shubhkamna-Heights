'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getGalleryImages } from '@/lib/firestore';
import { ArrowLeft, Upload, Trash2 } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await getGalleryImages();
        setImages(data || []);
      } catch (error) {
        console.error('Error loading gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const categories = ['all', ...Array.from(new Set(images.map(i => i.category)))];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--bg-card)] border-b border-[var(--border)] p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-[var(--border)] rounded">
              <ArrowLeft size={24} className="text-[var(--text-primary)]" />
            </Link>
            <div>
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
                Gallery
              </h1>
              <p className="text-[var(--text-secondary)]">Manage property images</p>
            </div>
          </div>

          <button className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold)] text-[var(--bg-primary)] rounded-lg hover:bg-[var(--gold-light)] font-inter font-bold">
            <Upload size={18} />
            Upload Images
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-inter font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12 text-[var(--text-secondary)]">Loading...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {images.map((image, idx) => (
              <div
                key={image.id}
                className="relative group bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--border)] h-40"
              >
                <div className="w-full h-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)]" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-red-500 rounded-lg hover:bg-red-600">
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
