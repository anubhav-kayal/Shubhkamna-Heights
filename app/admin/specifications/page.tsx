'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { getSpecifications, saveSpecification } from '@/lib/firestore';
import type { Specification } from '@/types';

type SpecForm = {
  id?: string;
  category: string;
  items: Array<{ label: string; value: string }>;
  order: number;
};

const EMPTY_FORM: SpecForm = {
  category: '',
  items: [{ label: '', value: '' }],
  order: 1,
};

export default function SpecificationsAdminPage() {
  const [specs, setSpecs] = useState<Specification[]>([]);
  const [form, setForm] = useState<SpecForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadSpecs = async () => {
    try {
      setSpecs(await getSpecifications());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSpecs();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setMessage('');
  };

  const updateItem = (index: number, key: 'label' | 'value', value: string) => {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  };

  const addItem = () => {
    setForm((current) => ({
      ...current,
      items: [...current.items, { label: '', value: '' }],
    }));
  };

  const removeItem = (index: number) => {
    setForm((current) => ({
      ...current,
      items: current.items.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!form.category.trim()) {
      setMessage('Category is required.');
      return;
    }

    const items = form.items.filter((item) => item.label.trim() && item.value.trim());
    if (items.length === 0) {
      setMessage('At least one specification item is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      await saveSpecification({
        id: form.id,
        category: form.category.trim(),
        items,
        order: form.order,
      });

      await loadSpecs();
      resetForm();
      setMessage('Specification saved.');
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
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
                Specifications
              </h1>
              <p className="text-[var(--text-secondary)]">
                Manage construction and finish specification categories.
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Category
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              Loading specifications...
            </div>
          ) : specs.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              No specifications found.
            </div>
          ) : (
            specs.map((spec) => (
              <motion.button
                key={spec.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() =>
                  setForm({
                    id: spec.id,
                    category: spec.category,
                    items: spec.items.length > 0 ? spec.items : [{ label: '', value: '' }],
                    order: spec.order,
                  })
                }
                className="w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-colors hover:border-[var(--gold)]"
              >
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{spec.category}</h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {spec.items.length} items · Order {spec.order}
                </p>
              </motion.button>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Category' : 'Create Category'}
          </h2>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <TextField
              label="Category"
              value={form.category}
              onChange={(value) => setForm((current) => ({ ...current, category: value }))}
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

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--text-primary)]">Items</span>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-sm font-semibold text-[var(--gold)]"
                >
                  + Add item
                </button>
              </div>
              {form.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={item.label}
                    onChange={(e) => updateItem(index, 'label', e.target.value)}
                    placeholder="Label"
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
                  />
                  <input
                    value={item.value}
                    onChange={(e) => updateItem(index, 'value', e.target.value)}
                    placeholder="Value"
                    className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
                  />
                  {form.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="rounded-2xl border border-[var(--border)] px-3 text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : form.id ? 'Update Specification' : 'Create Specification'}
            </button>
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
