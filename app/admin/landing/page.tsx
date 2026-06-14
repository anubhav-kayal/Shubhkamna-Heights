'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getLandingSettings, saveLandingSettings } from '@/lib/firestore';
import type { LandingSettings } from '@/types';

const EMPTY: LandingSettings = {};

export default function AdminLandingPage() {
  const [form, setForm] = useState<LandingSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLandingSettings();
        if (data) setForm(data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const update = (key: keyof LandingSettings, value: string) => {
    setForm((current) => ({ ...current, [key]: value || undefined }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await saveLandingSettings(form);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const fields: { key: keyof LandingSettings; label: string; hint: string }[] = [
    {
      key: 'heroVideoUrl',
      label: 'Premium hero video URL',
      hint: 'MP4 URL for the main landing panel (right side). Falls back to /videos/shubh-kamna-heights.mp4',
    },
    {
      key: 'heroPosterUrl',
      label: 'Premium hero poster URL',
      hint: 'Poster frame while video loads',
    },
    {
      key: 'heroImageUrl',
      label: 'Premium hero still image URL',
      hint: 'Used when no video is set',
    },
    {
      key: 'emotionalImageUrl',
      label: 'Emotional section image URL',
      hint: 'Happy family / lifestyle shot below the premium hero',
    },
    {
      key: 'curatedImageHomes',
      label: 'Curated card: Homes',
      hint: 'First card in “Curated for you”',
    },
    {
      key: 'curatedImageCommunity',
      label: 'Curated card: Community',
      hint: 'Second curated card',
    },
    {
      key: 'curatedImageConnect',
      label: 'Curated card: Connectivity',
      hint: 'Third curated card',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <Link href="/admin" className="p-2 transition-colors hover:bg-white/5">
            <ArrowLeft size={22} className="text-[var(--text-primary)]" />
          </Link>
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Landing page</h1>
            <p className="text-[var(--text-secondary)]">
              Manage homepage media in Supabase (<code className="text-[var(--gold)]">site_settings.landing</code>
              ). Copy stays in i18n files; placeholders apply when a URL is empty.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 border border-[var(--border)] bg-[var(--bg-card)] p-8"
        >
          {saved && (
            <p className="border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              Landing settings saved.
            </p>
          )}

          {loading ? (
            <p className="text-[var(--text-secondary)]">Loading…</p>
          ) : (
            <>
              {fields.map((field) => (
                <label key={field.key} className="block space-y-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{field.label}</span>
                  <input
                    type="url"
                    value={form[field.key] ?? ''}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder="https://…"
                    className="w-full border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
                  />
                  <span className="block text-xs text-[var(--text-secondary)]">{field.hint}</span>
                </label>
              ))}

              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className="w-full border border-[var(--gold)] bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save landing settings'}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
