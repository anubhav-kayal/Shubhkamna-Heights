'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBanks } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';
import { resolveBanks } from '@/lib/fallbacks';
import type { Bank } from '@/types';
import { useTranslation } from '@/context/LocaleContext';
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

export default function TieUpBanksSection({ initialData }: { initialData?: Bank[] }) {
  const { t } = useTranslation();
  const [banks, setBanks] = useState<Bank[]>(initialData ?? []);
  const [loading, setLoading] = useState(!initialData);
  const hasInitial = useRef(!!initialData);

  useEffect(() => {
    if (hasInitial.current) {
      hasInitial.current = false;
      return;
    }

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
            <SectionKicker centered>{t('sections.banks.kicker')}</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">{t('sections.banks.title')}</SectionHeading>
            <SectionCopy className="mx-auto mt-3 max-w-xl">{t('sections.banks.lead')}</SectionCopy>
            <GoldRule className="mx-auto mt-4 sm:mt-6" />
          </SectionHeaderCenter>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-pulse text-text-secondary">{t('sections.banks.loading')}</div>
            </div>
          ) : (
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-14 lg:grid-cols-3 lg:gap-6">
              {banks.map((bank) => (
                <li
                  key={bank.id}
                  className="flex min-h-[7.5rem] flex-col items-center justify-center border border-border-gold bg-bg-card/90 px-4 py-6 shadow-[0_12px_36px_rgba(0,0,0,0.2)] transition-colors hover:border-gold/40 sm:min-h-[8.5rem]"
                >
                  <div className="relative h-12 w-full max-w-[11rem] sm:h-14">
                    <Image
                      src={bank.logoUrl}
                      alt={`${bank.name} logo`}
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 640px) 40vw, 180px"
                    />
                  </div>
                  <p className="mt-4 text-center font-inter text-xs font-semibold uppercase tracking-wide text-text-primary sm:text-sm">
                    {bank.name}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 border-t border-border-gold pt-10 text-center lg:mt-14">
            <Button type="button" onClick={handleWhatsAppClick} className="inline-flex">
              {t('sections.banks.preApproved')}
            </Button>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
