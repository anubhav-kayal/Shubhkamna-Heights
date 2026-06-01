'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBanks } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';
import type { Bank } from '@/types';

const MOCK_BANKS: Bank[] = [
  { id: '1', name: 'State Bank of India', logoUrl: '/banks/sbi.png', interestRate: 8.5, maxLoanAmount: 7500000, processingFee: 0.35 },
  { id: '2', name: 'HDFC Bank', logoUrl: '/banks/hdfc.png', interestRate: 8.75, maxLoanAmount: 10000000, processingFee: 0.5 },
  { id: '3', name: 'ICICI Bank', logoUrl: '/banks/icici.png', interestRate: 8.75, maxLoanAmount: 10000000, processingFee: 0.5 },
  { id: '4', name: 'Punjab National Bank', logoUrl: '/banks/pnb.png', interestRate: 8.5, maxLoanAmount: 7500000, processingFee: 0.35 },
];

export default function TieUpBanksSection() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const data = await getBanks();
        if (data && data.length > 0) {
          setBanks(data);
        } else {
          setBanks(MOCK_BANKS);
        }
      } catch (error) {
        console.error('Error loading banks:', error);
        setBanks(MOCK_BANKS);
      } finally {
        setLoading(false);
      }
    };

    loadBanks();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Hello! I would like to know more about home loan options available at Shubh Kamna Heights.'
    );
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-20 sm:py-32 bg-[var(--bg-section)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-2">
              Easy Home Loans Available
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Pre-approved tie-ups with leading banks
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto mt-6"></div>
          </div>

          {/* Banks Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-[var(--text-secondary)]">Loading banks...</div>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {banks.map(bank => (
                <motion.div
                  key={bank.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--gold)] transition-all duration-300 group"
                >
                  {/* Bank Name */}
                  <div className="h-16 flex items-center justify-center mb-4 text-[var(--text-dark)] font-bold text-sm text-center">
                    {bank.name}
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="bg-[var(--gold)]/20 rounded px-3 py-2 text-center border border-[var(--gold)]/50">
                      <p className="text-xs text-[var(--text-secondary)] mb-1">Interest Rate</p>
                      <p className="text-[var(--gold)] font-bold">{bank.interestRate.toFixed(2)}%</p>
                    </div>

                    <div className="text-sm">
                      <p className="text-[var(--text-secondary)] text-xs mb-1">Max Loan</p>
                      <p className="text-[var(--text-primary)] font-semibold">
                        Up to ₹{(bank.maxLoanAmount / 100000).toFixed(0)}L
                      </p>
                    </div>

                    <div className="text-sm">
                      <p className="text-[var(--text-secondary)] text-xs mb-1">Processing Fee</p>
                      <p className="text-[var(--text-primary)] font-semibold">
                        {bank.processingFee.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center pt-8 border-t border-[var(--border)]"
          >
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300"
            >
              Get Pre-Approved Today →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
