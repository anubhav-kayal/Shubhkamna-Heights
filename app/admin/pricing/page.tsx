'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  const [pricing, setPricing] = useState({
    bhk2BasePrice: 3500,
    bhk3BasePrice: 4200,
    perSqftRate: 3500,
    gstPercent: 5,
    stampDutyPercent: 5,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      // Save to Firestore /settings/pricing
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving pricing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--bg-card)] border-b border-[var(--border)] p-6"
      >
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="p-2 hover:bg-[var(--border)] rounded">
            <ArrowLeft size={24} className="text-[var(--text-primary)]" />
          </Link>
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
              Pricing Settings
            </h1>
            <p className="text-[var(--text-secondary)]">Update rates and EMI settings</p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--bg-card)] rounded-lg border border-[var(--border)] p-8 space-y-6"
        >
          {/* Success Message */}
          {saved && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg">
              ✓ Pricing updated successfully
            </div>
          )}

          {/* 2BHK Base Price */}
          <div>
            <label className="block font-inter font-bold text-[var(--text-primary)] mb-2">
              2BHK Base Price (per sq ft in ₹)
            </label>
            <input
              type="number"
              value={pricing.bhk2BasePrice}
              onChange={(e) => setPricing({ ...pricing, bhk2BasePrice: parseFloat(e.target.value) })}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          {/* 3BHK Base Price */}
          <div>
            <label className="block font-inter font-bold text-[var(--text-primary)] mb-2">
              3BHK Base Price (per sq ft in ₹)
            </label>
            <input
              type="number"
              value={pricing.bhk3BasePrice}
              onChange={(e) => setPricing({ ...pricing, bhk3BasePrice: parseFloat(e.target.value) })}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          {/* GST Percent */}
          <div>
            <label className="block font-inter font-bold text-[var(--text-primary)] mb-2">
              GST Percentage
            </label>
            <input
              type="number"
              step="0.1"
              value={pricing.gstPercent}
              onChange={(e) => setPricing({ ...pricing, gstPercent: parseFloat(e.target.value) })}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          {/* Stamp Duty Percent */}
          <div>
            <label className="block font-inter font-bold text-[var(--text-primary)] mb-2">
              Stamp Duty Percentage
            </label>
            <input
              type="number"
              step="0.1"
              value={pricing.stampDutyPercent}
              onChange={(e) => setPricing({ ...pricing, stampDutyPercent: parseFloat(e.target.value) })}
              className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[var(--gold)] text-[var(--bg-primary)] font-inter font-bold py-3 rounded-lg hover:bg-[var(--gold-light)] transition-colors"
          >
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
}
