'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MediaUrlField } from '@/components/admin/MediaUrlField';
import { getHeroSettings, saveHeroSettings } from '@/lib/firestore';
import type { HeroSettings } from '@/types';

const EMPTY: HeroSettings = {
  videoUrl: '',
  posterUrl: '',
  headline: '',
  subheadline: '',
};

export default function AdminHeroPage() {
  const [form, setForm] = useState<HeroSettings>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHeroSettings();
        if (data) setForm(data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const update = (key: keyof HeroSettings, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await saveHeroSettings(form);
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
          <Link href="/admin" className="p-2 transition-colors hover:bg-white/5">
            <ArrowLeft size={22} className="text-[var(--text-primary)]" />
          </Link>
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Project hero</h1>
            <p className="text-[var(--text-secondary)]">
              Manage the project page video hero in Supabase (
              <code className="text-[var(--gold)]">site_settings.hero</code>).
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
              Hero settings saved.
            </p>
          )}

          {loading ? (
            <p className="text-[var(--text-secondary)]">Loading…</p>
          ) : (
            <>
              <MediaUrlField
                label="Video URL"
                value={form.videoUrl}
                onChange={(value) => update('videoUrl', value)}
                folder="hero"
                accept="video/mp4,video/*"
                hint="MP4 URL for the project page hero. Falls back to NEXT_PUBLIC_PROJECT_VIDEO_URL."
              />
              <MediaUrlField
                label="Poster URL"
                value={form.posterUrl}
                onChange={(value) => update('posterUrl', value)}
                folder="hero"
                hint="Poster frame shown while the video loads."
              />
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Headline (optional)
                </span>
                <input
                  value={form.headline}
                  onChange={(e) => update('headline', e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
                />
                <span className="block text-xs text-[var(--text-secondary)]">
                  Not displayed in the UI today — stored for future use.
                </span>
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">
                  Subheadline (optional)
                </span>
                <input
                  value={form.subheadline}
                  onChange={(e) => update('subheadline', e.target.value)}
                  className="w-full border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
                />
              </label>

              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className="w-full border border-[var(--gold)] bg-[var(--gold)] px-4 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save hero settings'}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
