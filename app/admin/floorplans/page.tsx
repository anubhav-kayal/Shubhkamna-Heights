'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { MediaUrlField } from '@/components/admin/MediaUrlField';
import { getAllFloorPlans, saveFloorPlan } from '@/lib/firestore';
import type { FloorPlan } from '@/types';

type FloorPlanForm = {
  id?: string;
  type: '2BHK' | '3BHK';
  imageUrl: string;
  carpetArea: number;
  superArea: number;
  price: number;
  active: boolean;
};

const EMPTY_FORM: FloorPlanForm = {
  type: '2BHK',
  imageUrl: '',
  carpetArea: 0,
  superArea: 0,
  price: 0,
  active: true,
};

export default function FloorPlansAdminPage() {
  const [plans, setPlans] = useState<FloorPlan[]>([]);
  const [form, setForm] = useState<FloorPlanForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadPlans = async () => {
    try {
      setPlans(await getAllFloorPlans());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPlans();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setMessage('');
  };

  const handleSave = async () => {
    if (!form.imageUrl.trim()) {
      setMessage('Floor plan image URL is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      await saveFloorPlan({
        id: form.id,
        type: form.type,
        imageUrl: form.imageUrl.trim(),
        carpetArea: form.carpetArea,
        superArea: form.superArea,
        price: form.price,
        active: form.active,
      });

      await loadPlans();
      resetForm();
      setMessage('Floor plan saved.');
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
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Floor plans</h1>
              <p className="text-[var(--text-secondary)]">
                Manage 2BHK and 3BHK floor plan images, areas, and pricing.
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Plan
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              Loading floor plans...
            </div>
          ) : plans.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              No floor plans found.
            </div>
          ) : (
            plans.map((plan) => (
              <motion.button
                key={plan.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setForm(plan)}
                className="w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-colors hover:border-[var(--gold)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-[var(--text-primary)]">{plan.type}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      plan.active
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {plan.active ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {plan.carpetArea} sq ft carpet · {plan.superArea} sq ft super
                </p>
                <p className="mt-1 text-sm text-[var(--gold)]">
                  ₹{plan.price.toLocaleString('en-IN')}
                </p>
              </motion.button>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Floor Plan' : 'Create Floor Plan'}
          </h2>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    type: e.target.value as '2BHK' | '3BHK',
                  }))
                }
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              >
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
              </select>
            </div>

            <MediaUrlField
              label="Floor plan image URL"
              value={form.imageUrl}
              onChange={(value) => setForm((current) => ({ ...current, imageUrl: value }))}
              folder="floorplans"
            />

            <NumberField
              label="Carpet area (sq ft)"
              value={form.carpetArea}
              onChange={(value) => setForm((current) => ({ ...current, carpetArea: value }))}
            />
            <NumberField
              label="Super area (sq ft)"
              value={form.superArea}
              onChange={(value) => setForm((current) => ({ ...current, superArea: value }))}
            />
            <NumberField
              label="Price (INR)"
              value={form.price}
              onChange={(value) => setForm((current) => ({ ...current, price: value }))}
            />

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
              {saving ? 'Saving...' : form.id ? 'Update Floor Plan' : 'Create Floor Plan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
      />
    </div>
  );
}
