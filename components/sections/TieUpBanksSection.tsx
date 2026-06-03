'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBanks } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';
import { resolveBanks } from '@/lib/fallbacks';
import type { Bank } from '@/types';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  GoldRule,
  SectionCopy,
  SectionHeaderCenter,
  Button,
} from '@/components/ui/design';

export default function TieUpBanksSection() {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBanks = async () => {
      try {
        const data = await getBanks();
        setBanks(resolveBanks(data));
      } catch (error) {
        console.error('Error loading banks:', error);
        setBanks(resolveBanks([]));
      } finally {
        setLoading(false);
      }
    };

    void loadBanks();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      'Hello! I would like to know more about home loan options available at Shubh Kamna Heights.'
    );
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <Section tone="muted">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <SectionHeaderCenter>
            <SectionKicker centered>Financing</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">Easy Home Loans Available</SectionHeading>
            <SectionCopy className="mx-auto mt-3 max-w-xl">
              Pre-approved tie-ups with leading banks
            </SectionCopy>
            <GoldRule className="mx-auto mt-4 sm:mt-6" />
          </SectionHeaderCenter>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-text-secondary">Loading banks...</div>
            </div>
          ) : (
            <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
              {banks.map((bank) => (
                <article
                  key={bank.id}
                  className="flex min-w-0 flex-col rounded-2xl border border-border-gold bg-bg-card/90 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.2)] transition-colors hover:border-gold/40 sm:rounded-[1.75rem]"
                >
                  <div className="relative mx-auto h-14 w-full max-w-[10rem] overflow-hidden rounded-lg bg-black/20 sm:h-16">
                    <Image
                      src={bank.logoUrl}
                      alt={`${bank.name} logo`}
                      fill
                      className="object-contain p-2"
                      sizes="240px"
                    />
                  </div>
                  <p className="mt-4 text-center font-inter text-sm font-semibold text-text-primary sm:text-base">
                    {bank.name}
                  </p>
                  <div className="mt-4 rounded-xl border border-border-gold bg-black/15 px-4 py-3 text-center">
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                      Interest Rate
                    </p>
                    <p className="mt-1 font-cormorant text-2xl font-semibold text-gold">
                      {bank.interestRate.toFixed(2)}%
                    </p>
                  </div>
                  <div className="mt-4 space-y-3 border-t border-border-gold pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-text-secondary">Max Loan</p>
                      <p className="font-inter text-sm font-semibold text-text-primary">
                        Up to ₹{(bank.maxLoanAmount / 100000).toFixed(0)}L
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-text-secondary">Processing Fee</p>
                      <p className="font-inter text-sm font-semibold text-text-primary">
                        {bank.processingFee.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10 border-t border-border-gold pt-10 text-center lg:mt-14">
            <Button type="button" onClick={handleWhatsAppClick} className="inline-flex">
              Get Pre-Approved Today →
            </Button>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
