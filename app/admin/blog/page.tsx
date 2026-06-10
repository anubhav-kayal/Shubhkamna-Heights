'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { MediaUrlField } from '@/components/admin/MediaUrlField';
import { getAllBlogPosts, saveBlogPost } from '@/lib/firestore';
import { formatDisplayDate, slugify, toDate } from '@/lib/site';
import type { BlogPost } from '@/types';

type BlogEditorState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  coverImage: string;
  content: string;
  published: boolean;
  publishedAt?: Date;
  tags: string;
  metaDescription: string;
  readTimeMinutes: number | '';
};

const EMPTY_FORM: BlogEditorState = {
  title: '',
  slug: '',
  excerpt: '',
  author: 'Shubh Kamna Editorial',
  category: 'Project Updates',
  coverImage: '',
  content: '',
  published: true,
  tags: '',
  metaDescription: '',
  readTimeMinutes: '',
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogEditorState>(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadPosts = async () => {
    try {
      setPosts(await getAllBlogPosts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const handleEdit = (post: BlogPost) => {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      coverImage: post.coverImage,
      content: post.content,
      published: post.published,
      publishedAt: toDate(post.publishedAt),
      tags: post.tags?.join(', ') ?? '',
      metaDescription: post.metaDescription ?? '',
      readTimeMinutes: post.readTimeMinutes ?? '',
    });
    setMessage('');
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setMessage('');
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      setMessage('Title and excerpt are required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      const tags = form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      await saveBlogPost({
        id: form.id,
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        excerpt: form.excerpt.trim(),
        author: form.author.trim(),
        category: form.category.trim(),
        coverImage: form.coverImage.trim(),
        content: form.content.trim(),
        published: form.published,
        publishedAt: form.publishedAt ?? new Date(),
        tags: tags.length > 0 ? tags : undefined,
        metaDescription: form.metaDescription.trim() || undefined,
        readTimeMinutes:
          form.readTimeMinutes === '' ? undefined : Number(form.readTimeMinutes) || undefined,
      });

      await loadPosts();
      resetForm();
      setMessage('Post saved.');
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
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">Blog CMS</h1>
              <p className="text-[var(--text-secondary)]">
                Create, edit, and publish articles.
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
              No blog posts found yet.
            </div>
          ) : (
            posts.map((post) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleEdit(post)}
                className="w-full rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6 text-left transition-colors hover:border-[var(--gold)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      post.published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                    {post.category}
                  </span>
                </div>
                <h2 className="mt-4 font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-xs text-[var(--text-secondary)]">
                  {post.author} • {formatDisplayDate(post.publishedAt)}
                </div>
              </motion.button>
            ))
          )}
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {form.id ? 'Edit Post' : 'Create Post'}
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Save changes directly to Firestore. Slugs must stay unique.
          </p>

          {message && (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-secondary)]">
              {message}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <TextField label="Title" value={form.title} onChange={(value) => setForm((current) => ({ ...current, title: value }))} />
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Slug
              </label>
              <div className="flex gap-2">
                <input
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
                />
                <button
                  onClick={() => setForm((current) => ({ ...current, slug: slugify(current.title) }))}
                  className="rounded-2xl border border-[var(--border)] px-4 text-sm font-semibold text-[var(--text-primary)]"
                >
                  Generate
                </button>
              </div>
            </div>
            <TextField label="Excerpt" value={form.excerpt} onChange={(value) => setForm((current) => ({ ...current, excerpt: value }))} />
            <TextField label="Author" value={form.author} onChange={(value) => setForm((current) => ({ ...current, author: value }))} />
            <TextField label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} />
            <MediaUrlField
              label="Cover Image URL"
              value={form.coverImage}
              onChange={(value) => setForm((current) => ({ ...current, coverImage: value }))}
              folder="blog"
            />
            <TextField
              label="Tags (comma-separated)"
              value={form.tags}
              onChange={(value) => setForm((current) => ({ ...current, tags: value }))}
            />
            <TextField
              label="Meta description (SEO)"
              value={form.metaDescription}
              onChange={(value) => setForm((current) => ({ ...current, metaDescription: value }))}
            />
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Read time (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={form.readTimeMinutes}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    readTimeMinutes:
                      event.target.value === '' ? '' : Number(event.target.value) || '',
                  }))
                }
                placeholder="Auto-estimated if empty"
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                Content (HTML supported)
              </label>
              <textarea
                rows={10}
                value={form.content}
                onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--text-primary)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <label className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))}
              />
              Published
            </label>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-[var(--gold)] py-3 font-bold text-[var(--bg-primary)] disabled:opacity-60"
            >
              {saving ? 'Saving...' : form.id ? 'Update Post' : 'Create Post'}
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
