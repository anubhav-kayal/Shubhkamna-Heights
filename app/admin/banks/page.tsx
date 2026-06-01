'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { getBanks, saveBank } from '@/lib/firestore';
import type { Bank } from '@/types';

type BankForm = {
  id?: string;
  name: string;
  logoUrl: string;
  interestRate: number;
  maxLoanAmount: number;
  processingFee: number;
};

const EMPTY_FORM: BankForm = {
  name: '',
  logoUrl: '',
  interestRate: 8.5,
  maxLoanAmount: 7500000,
  processingFee: 0.35,
};

export default function BanksAdminPage() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [form, setForm] = useState<BankForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadBanks = async () => {
    try {
      setBanks(await getBanks());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadBanks();
  }, []);

  const handleSave = async () => {
    if (!form.name.trim()) {
      setMessage('Bank name is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      await saveBank({
        id: form.id,
        name: form.name.trim(),
        logoUrl: form.logoUrl.trim(),
        interestRate: form.interestRate,
        maxLoanAmount: form.maxLoanAmount,
        processingFee: form.processingFee,
      });

      await loadBanks();
      setForm(EMPTY_FORM);
      setMessage('Bank saved.');
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
                Bank Partners
              </h1>
              <p className="text-[var(--text-secondary)]">
                Manage loan partner details used across the site.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setForm(EMPTY_FORM);
              setMessage('');
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Bank
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              Loading banks...
            </div>
          ) : banks.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              No partner banks found.
            </div>
          ) : (
            banks.map((bank) => (
              <motion.button
                key={bank.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setForm(bank)}
                className="w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-colors hover:border-[var(--gold)]"
              >
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">{bank.name}</h2>
                <div className="mt-4 grid gap-2 text-sm text-[var(--text-secondary)] sm:grid-cols-3">
                  <p>Interest: {bank.interestRate.toFixed(2)}%</p>
                  <p>Max Loan: ₹{bank.maxLoanAmount.toLocaleString('en-IN')}</p>
                  <p>Fee: {bank.processingFee.toFixed(2)}%</p>
                </div>
              </motion.button>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Bank' : 'Add Bank'}
          </h2>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <TextField label="Bank Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            <TextField label="Logo URL" value={form.logoUrl} onChange={(value) => setForm((current) => ({ ...current, logoUrl: value }))} />
            <NumberField
              label="Interest Rate (%)"
              value={form.interestRate}
              onChange={(value) => setForm((current) => ({ ...current, interestRate: value }))}
              step="0.01"
            />
            <NumberField
              label="Maximum Loan Amount (₹)"
              value={form.maxLoanAmount}
              onChange={(value) => setForm((current) => ({ ...current, maxLoanAmount: value }))}
            />
            <NumberField
              label="Processing Fee (%)"
              value={form.processingFee}
              onChange={(value) => setForm((current) => ({ ...current, processingFee: value }))}
              step="0.01"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : form.id ? 'Update Bank' : 'Create Bank'}
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

function NumberField({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
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
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
      />
    </div>
  );
}
