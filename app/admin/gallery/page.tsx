'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { MediaUrlField } from '@/components/admin/MediaUrlField';
import { deleteGalleryImage, getAllGalleryImages, saveGalleryImage } from '@/lib/firestore';
import type { GalleryImage } from '@/types';

const GALLERY_CATEGORIES = ['Exterior', 'Interior', 'Amenities', 'Views'] as const;

type GalleryForm = {
  id?: string;
  imageUrl: string;
  category: string;
  caption: string;
  order: number;
  active: boolean;
};

const EMPTY_FORM: GalleryForm = {
  imageUrl: '',
  category: 'Exterior',
  caption: '',
  order: 0,
  active: true,
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [form, setForm] = useState<GalleryForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const loadImages = async () => {
    try {
      setImages(await getAllGalleryImages());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadImages();
  }, []);

  const categories = ['all', ...new Set(images.map((image) => image.category).filter(Boolean))];
  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setMessage('');
  };

  const handleSave = async () => {
    if (!form.imageUrl.trim()) {
      setMessage('Image URL is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      await saveGalleryImage({
        id: form.id,
        imageUrl: form.imageUrl.trim(),
        category: form.category,
        caption: form.caption.trim(),
        order: form.order,
        active: form.active,
      });

      await loadImages();
      resetForm();
      setMessage('Gallery image saved.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form.id) return;
    if (!window.confirm('Delete this gallery image?')) return;

    setDeleting(true);
    setMessage('');

    try {
      await deleteGalleryImage(form.id);
      await loadImages();
      resetForm();
      setMessage('Gallery image deleted.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="rounded-full p-2 transition-colors hover:bg-white/5">
              <ArrowLeft size={22} className="text-[var(--text-primary)]" />
            </Link>
            <div>
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Gallery</h1>
              <p className="text-[var(--text-secondary)]">
                Manage project gallery images by category.
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Image
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <div className="mb-6 flex flex-wrap gap-2">
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
            <div className="grid gap-4 md:grid-cols-2">
              {filteredImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setForm(image)}
                  className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] text-left transition-colors hover:border-[var(--gold)]"
                >
                  <div className="relative h-40 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--bg-section)]">
                    {image.imageUrl ? (
                      <Image
                        src={image.imageUrl}
                        alt={image.caption || image.category}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">
                        {image.category || 'Uncategorized'}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          image.active
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {image.active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="font-medium text-[var(--text-primary)]">
                      {image.caption || 'Untitled image'}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">Order: {image.order}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Image' : 'Add Image'}
          </h2>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <MediaUrlField
              label="Image URL"
              value={form.imageUrl}
              onChange={(value) => setForm((current) => ({ ...current, imageUrl: value }))}
              folder="gallery"
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              >
                {GALLERY_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <TextField
              label="Caption"
              value={form.caption}
              onChange={(value) => setForm((current) => ({ ...current, caption: value }))}
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Display order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((current) => ({ ...current, order: Number(e.target.value) || 0 }))
                }
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((current) => ({ ...current, active: e.target.checked }))}
              />
              Visible on site
            </label>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : form.id ? 'Update Image' : 'Add Image'}
            </button>

            {form.id && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-3 font-semibold text-red-400 disabled:opacity-60"
              >
                <Trash2 size={16} />
                {deleting ? 'Deleting...' : 'Delete Image'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
      />
    </div>
  );
}
