'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getPricingSettings, savePricingSettings } from '@/lib/firestore';
import type { PricingSettings } from '@/types';

const DEFAULT_PRICING: PricingSettings = {
  bhk2BasePrice: 3500,
  bhk3BasePrice: 4200,
  perSqftRate: 3500,
  gstPercent: 5,
  stampDutyPercent: 5,
};

export default function PricingPage() {
  const [pricing, setPricing] = useState<PricingSettings>(DEFAULT_PRICING);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const data = await getPricingSettings();
        if (data) {
          setPricing(data);
        }
      } finally {
        setLoading(false);
      }
    };

    void loadPricing();
  }, []);

  const updateField = (key: keyof PricingSettings, value: string) => {
    setPricing((current) => ({
      ...current,
      [key]: Number(value) || 0,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      await savePricingSettings(pricing);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Link href="/admin" className="rounded-full p-2 transition-colors hover:bg-white/5">
            <ArrowLeft size={22} className="text-[var(--text-primary)]" />
          </Link>
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
              Pricing Settings
            </h1>
            <p className="text-[var(--text-secondary)]">
              Central defaults used by the cost calculator and pricing displays.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8"
        >
          {saved && (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              Pricing updated successfully.
            </div>
          )}

          {loading ? (
            <p className="text-[var(--text-secondary)]">Loading pricing settings...</p>
          ) : (
            <>
              <Field
                label="2BHK Base Price (₹ / sq ft)"
                value={pricing.bhk2BasePrice}
                onChange={(value) => updateField('bhk2BasePrice', value)}
              />
              <Field
                label="3BHK Base Price (₹ / sq ft)"
                value={pricing.bhk3BasePrice}
                onChange={(value) => updateField('bhk3BasePrice', value)}
              />
              <Field
                label="General Rate (₹ / sq ft)"
                value={pricing.perSqftRate}
                onChange={(value) => updateField('perSqftRate', value)}
              />
              <Field
                label="GST Percentage"
                value={pricing.gstPercent}
                onChange={(value) => updateField('gstPercent', value)}
                step="0.1"
              />
              <Field
                label="Stamp Duty Percentage"
                value={pricing.stampDutyPercent}
                onChange={(value) => updateField('stampDutyPercent', value)}
                step="0.1"
              />

              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] transition-colors hover:bg-[var(--gold-light)] disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: string) => void;
  step?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
        {label}
      </label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--gold)]"
      />
    </div>
  );
}
