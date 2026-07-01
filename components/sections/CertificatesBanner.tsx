'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import CertificatesModal from '@/components/ui/CertificatesModal';
import { PROJECT_CERTIFICATES } from '@/lib/certificates';
import { useTranslation } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';
import { PageContainer } from '@/components/ui/design';

export default function CertificatesBanner() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="w-full border-y border-gold/25 bg-gradient-to-r from-bg-primary via-bg-card to-bg-primary py-6 sm:py-8">
        <PageContainer>
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={() => setModalOpen(true)}
            className={cn(
              'group flex w-full items-center gap-4 border border-gold/35 bg-bg-card/60 p-5 text-left',
              'transition-all duration-200 hover:border-gold/60 hover:bg-bg-card hover:shadow-[0_12px_40px_rgba(201,168,76,0.12)]',
              'sm:gap-6 sm:p-6',
            )}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold/15 text-gold transition-colors group-hover:bg-gold/25 sm:h-14 sm:w-14"
              aria-hidden
            >
              <ShieldCheck size={26} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-inter text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-gold">
                {t('sections.certificates.kicker')}
              </p>
              <p className="mt-1 font-cormorant text-xl font-semibold text-text-primary sm:text-2xl">
                {t('sections.certificates.bannerTitle')}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {t('sections.certificates.bannerLead', { count: PROJECT_CERTIFICATES.length })}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-[0.8125rem]">
              <span className="hidden sm:inline">{t('sections.certificates.bannerCta')}</span>
              <ChevronRight
                size={20}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </div>
          </motion.button>
        </PageContainer>
      </section>

      <CertificatesModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
