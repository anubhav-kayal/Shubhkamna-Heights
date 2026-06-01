'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getEnquiries } from '@/lib/firestore';
import { ArrowLeft, Mail, Phone, Calendar, CheckCircle2 } from 'lucide-react';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  bhkPreference: string;
  visitDate?: string;
  message?: string;
  createdAt: any;
  contacted: boolean;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadEnquiries = async () => {
      try {
        setLoading(true);
        const data = await getEnquiries();
        setEnquiries(data || []);
      } catch (error) {
        console.error('Error loading enquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
  }, []);

  const filteredEnquiries =
    filter === 'contacted'
      ? enquiries.filter(e => e.contacted)
      : filter === 'pending'
        ? enquiries.filter(e => !e.contacted)
        : enquiries;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[var(--bg-card)] border-b border-[var(--border)] p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-[var(--border)] rounded">
              <ArrowLeft size={24} className="text-[var(--text-primary)]" />
            </Link>
            <div>
              <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
                Enquiries
              </h1>
              <p className="text-[var(--text-secondary)]">Manage visitor leads</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {['all', 'pending', 'contacted'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-inter font-semibold transition-colors ${
                filter === f
                  ? 'bg-[var(--gold)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              {f === 'all' ? 'All' : f === 'pending' ? 'Pending' : 'Contacted'}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12 text-[var(--text-secondary)]">Loading...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-secondary)]">
            No enquiries found.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto bg-[var(--bg-card)] rounded-lg border border-[var(--border)]"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="px-6 py-3 text-left font-inter font-bold text-[var(--text-primary)]">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-inter font-bold text-[var(--text-primary)]">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left font-inter font-bold text-[var(--text-primary)]">
                    BHK
                  </th>
                  <th className="px-6 py-3 text-left font-inter font-bold text-[var(--text-primary)]">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left font-inter font-bold text-[var(--text-primary)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.map((enquiry, idx) => (
                  <tr
                    key={enquiry.id}
                    className="border-b border-[var(--border)] hover:bg-[var(--bg-primary)] transition-colors"
                  >
                    <td className="px-6 py-4 font-inter font-semibold text-[var(--text-primary)]">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] text-sm"
                        >
                          <Mail size={14} />
                          {enquiry.email}
                        </a>
                        <a
                          href={`tel:${enquiry.phone}`}
                          className="flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] text-sm"
                        >
                          <Phone size={14} />
                          {enquiry.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{enquiry.bhkPreference}</td>
                    <td className="px-6 py-4 text-[var(--text-secondary)] flex items-center gap-2">
                      <Calendar size={16} />
                      {enquiry.createdAt instanceof Date
                        ? enquiry.createdAt.toLocaleDateString()
                        : typeof enquiry.createdAt === 'object' && 'toDate' in enquiry.createdAt
                          ? (enquiry.createdAt as any).toDate().toLocaleDateString()
                          : new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                          enquiry.contacted
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        {enquiry.contacted ? 'Contacted' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
