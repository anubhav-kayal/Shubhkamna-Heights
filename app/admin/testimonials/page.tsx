'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { deleteTestimonial, getAllTestimonials, saveTestimonial } from '@/lib/firestore';
import type { Testimonial } from '@/types';

type TestimonialForm = {
  id?: string;
  name: string;
  flatType: string;
  quote: string;
  rating: number;
  active: boolean;
};

const EMPTY_FORM: TestimonialForm = {
  name: '',
  flatType: '3BHK',
  quote: '',
  rating: 5,
  active: true,
};

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<TestimonialForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');

  const loadTestimonials = async () => {
    try {
      setTestimonials(await getAllTestimonials());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTestimonials();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setMessage('');
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.quote.trim()) {
      setMessage('Name and quote are required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      await saveTestimonial({
        id: form.id,
        name: form.name.trim(),
        flatType: form.flatType.trim(),
        quote: form.quote.trim(),
        rating: form.rating,
        active: form.active,
      });

      await loadTestimonials();
      resetForm();
      setMessage('Testimonial saved.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!form.id) return;
    if (!window.confirm('Delete this testimonial? This cannot be undone.')) return;

    setDeleting(true);
    setMessage('');

    try {
      await deleteTestimonial(form.id);
      await loadTestimonials();
      resetForm();
      setMessage('Testimonial deleted.');
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
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
                Testimonials
              </h1>
              <p className="text-[var(--text-secondary)]">
                Control quote quality, ratings, and visibility.
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
              Loading testimonials...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              No testimonials found.
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <motion.button
                key={testimonial.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setForm(testimonial)}
                className="w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-colors hover:border-[var(--gold)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                    {testimonial.name}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      testimonial.active
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {testimonial.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--gold)]">{testimonial.flatType}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                  {testimonial.quote}
                </p>
              </motion.button>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Testimonial' : 'Create Testimonial'}
          </h2>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <TextField label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            <TextField label="Flat Type" value={form.flatType} onChange={(value) => setForm((current) => ({ ...current, flatType: value }))} />

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Quote
              </label>
              <textarea
                rows={6}
                value={form.quote}
                onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Rating
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={(event) => setForm((current) => ({ ...current, rating: Number(event.target.value) || 1 }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm((current) => ({ ...current, active: event.target.checked }))}
              />
              Visible on site
            </label>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : form.id ? 'Update Testimonial' : 'Create Testimonial'}
            </button>

            {form.id && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-3 font-semibold text-red-400 disabled:opacity-60"
              >
                <Trash2 size={16} />
                {deleting ? 'Deleting...' : 'Delete Testimonial'}
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
      <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
      />
    </div>
  );
}
