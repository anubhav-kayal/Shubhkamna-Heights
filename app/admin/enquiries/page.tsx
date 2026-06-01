'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Mail, MessageSquare, Phone } from 'lucide-react';
import { getEnquiries } from '@/lib/firestore';
import { formatDisplayDate } from '@/lib/site';
import type { Enquiry } from '@/types';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted'>('all');

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        setEnquiries(await getEnquiries());
      } finally {
        setLoading(false);
      }
    };

    void loadEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    if (filter === 'pending') {
      return !enquiry.contacted;
    }

    if (filter === 'contacted') {
      return enquiry.contacted;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)] p-6">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <Link href="/admin" className="rounded-full p-2 transition-colors hover:bg-white/5">
            <ArrowLeft size={22} className="text-[var(--text-primary)]" />
          </Link>
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
              Enquiries
            </h1>
            <p className="text-[var(--text-secondary)]">Lead management and follow-up queue.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {(['all', 'pending', 'contacted'] as const).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === value
                  ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                  : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)]'
              }`}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-6 py-16 text-center text-[var(--text-secondary)]">
            No enquiries found for this filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry, index) => (
              <motion.article
                key={enquiry.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                        {enquiry.name}
                      </h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          enquiry.contacted
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {enquiry.contacted ? 'Contacted' : 'Pending'}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-[var(--text-secondary)] sm:grid-cols-2">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="inline-flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                      >
                        <Mail size={16} />
                        {enquiry.email || 'No email provided'}
                      </a>
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="inline-flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                      >
                        <Phone size={16} />
                        {enquiry.phone}
                      </a>
                      <span className="inline-flex items-center gap-2">
                        <Calendar size={16} />
                        {formatDisplayDate(enquiry.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MessageSquare size={16} />
                        {enquiry.bhkPreference}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-[var(--text-secondary)] lg:min-w-72">
                    <p>
                      <span className="font-semibold text-[var(--text-primary)]">Visit date:</span>{' '}
                      {enquiry.visitDate || 'Not specified'}
                    </p>
                    <p>
                      <span className="font-semibold text-[var(--text-primary)]">Source:</span>{' '}
                      {enquiry.source || 'website'}
                    </p>
                    {enquiry.message ? (
                      <p className="leading-6">
                        <span className="font-semibold text-[var(--text-primary)]">Message:</span>{' '}
                        {enquiry.message}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
