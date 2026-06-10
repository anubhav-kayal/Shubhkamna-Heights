'use client';

import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { uploadFile } from '@/lib/storage';

export function MediaUrlField({
  label,
  value,
  onChange,
  folder,
  hint,
  accept = 'image/*',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
  hint?: string;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const url = await uploadFile(file, folder);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[var(--text-primary)]">{label}</span>
      <div className="flex gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
        />
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleUpload(file);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-[var(--border)] px-4 text-sm font-semibold text-[var(--text-primary)] disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? '…' : 'Upload'}
        </button>
      </div>
      {hint ? <span className="block text-xs text-[var(--text-secondary)]">{hint}</span> : null}
      {error ? <span className="block text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
