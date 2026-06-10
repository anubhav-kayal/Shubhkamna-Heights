'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { MediaUrlField } from '@/components/admin/MediaUrlField';
import { AMENITIES_LIST } from '@/lib/constants';
import { getAmenities, saveAmenity } from '@/lib/firestore';
import type { Amenity } from '@/types';

type AmenityForm = {
  id?: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl: string;
  order: number;
};

const EMPTY_FORM: AmenityForm = {
  title: '',
  description: '',
  iconName: '',
  imageUrl: '',
  order: 0,
};

export default function AmenitiesAdminPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [form, setForm] = useState<AmenityForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadAmenities = async () => {
    try {
      setAmenities(await getAmenities());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAmenities();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setMessage('');
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setMessage('Title and description are required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      await saveAmenity({
        id: form.id,
        title: form.title.trim(),
        description: form.description.trim(),
        iconName: form.iconName.trim() || form.title.trim(),
        imageUrl: form.imageUrl.trim() || undefined,
        order: form.order,
      });

      await loadAmenities();
      resetForm();
      setMessage('Amenity saved.');
    } finally {
      setSaving(false);
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
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Amenities</h1>
              <p className="text-[var(--text-secondary)]">
                Manage project amenities. Titles must match icon map keys for correct icons.
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Entry
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              Loading amenities...
            </div>
          ) : amenities.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              No amenities found.
            </div>
          ) : (
            amenities.map((amenity) => (
              <motion.button
                key={amenity.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() =>
                  setForm({
                    id: amenity.id,
                    title: amenity.title,
                    description: amenity.description,
                    iconName: amenity.iconName,
                    imageUrl: amenity.imageUrl ?? '',
                    order: amenity.order,
                  })
                }
                className="w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-colors hover:border-[var(--gold)]"
              >
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{amenity.title}</h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{amenity.description}</p>
                <p className="mt-2 text-xs text-[var(--gold)]">Order: {amenity.order}</p>
              </motion.button>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Amenity' : 'Create Amenity'}
          </h2>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Title
              </label>
              <select
                value={form.title}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    title: e.target.value,
                    iconName: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              >
                <option value="">Select or type below</option>
                {AMENITIES_LIST.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    title: e.target.value,
                    iconName: e.target.value,
                  }))
                }
                placeholder="Or enter custom title"
                className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <MediaUrlField
              label="Featured image URL (optional)"
              value={form.imageUrl}
              onChange={(value) => setForm((current) => ({ ...current, imageUrl: value }))}
              folder="amenities"
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

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : form.id ? 'Update Amenity' : 'Create Amenity'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
