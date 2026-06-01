'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getGalleryImages } from '@/lib/firestore';
import type { GalleryImage } from '@/types';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadImages = async () => {
      try {
        setImages(await getGalleryImages());
      } finally {
        setLoading(false);
      }
    };

    void loadImages();
  }, []);

  const categories = ['all', ...new Set(images.map((image) => image.category).filter(Boolean))];
  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((image) => image.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link href="/admin" className="rounded-full p-2 transition-colors hover:bg-white/5">
            <ArrowLeft size={22} className="text-[var(--text-primary)]" />
          </Link>
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Gallery</h1>
            <p className="text-[var(--text-secondary)]">
              Visual asset overview. Uploads remain managed through Firebase Storage for now.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                  : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)]'
              }`}
            >
              {category === 'all'
                ? 'All'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
            Loading gallery...
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
            No images found for this category.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredImages.map((image, index) => (
              <motion.article
                key={image.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)]"
              >
                <div className="relative h-56 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)]">
                  {image.imageUrl ? (
                    <Image src={image.imageUrl} alt={image.caption || image.category} fill className="object-cover" />
                  ) : null}
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                    {image.category || 'Uncategorized'}
                  </p>
                  <p className="font-medium text-[var(--text-primary)]">
                    {image.caption || 'Untitled image'}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Order: {image.order}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
