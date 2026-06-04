'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';
import { useTranslation } from '@/context/LocaleContext';
import { getHeroPosterUrl } from '@/lib/placeholders';
import {
  BadgePill,
  BtnRow,
  Button,
  PageContainer,
  PanelDark,
  SectionLead,
  StatCard,
  StatMeta,
  StatValue,
} from '@/components/ui/design';
import { cn } from '@/lib/cn';

interface HeroSettings {
  videoUrl?: string;
  posterUrl?: string;
}

export default function HeroSection({ settings = {} as HeroSettings }) {
  const { t } = useTranslation();
  const heroPoster = getHeroPosterUrl(settings.posterUrl);

  const heroStats = [
    { value: '1000+', labelKey: 'hero.statFamilies' },
    { value: '2 & 3 BHK', labelKey: 'hero.statBhk' },
    { value: '65%+', labelKey: 'hero.statOpen' },
    { value: 'RERA Ready', labelKey: 'hero.statRera' },
  ] as const;

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(PROJECT_DATA.whatsappMessage);
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section
      className={cn(
        'relative flex min-h-dvh flex-col',
        'pt-[calc(var(--site-header-height)+1rem)]',
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {settings.videoUrl ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={heroPoster}
              className="absolute inset-0 hidden h-full w-full object-cover sm:block"
            >
              <source src={settings.videoUrl} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center sm:hidden"
              style={{ backgroundImage: `url(${heroPoster})` }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroPoster})` }}
            role="img"
            aria-label="Shubh Kamna Heights residential project"
          />
        )}

        <div className="hero-overlay absolute inset-0" />
      </div>

      <PageContainer className="relative z-10 flex flex-1 items-center py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full min-w-0"
        >
          <PanelDark className="hero-panel w-full min-w-0 border-border-gold/50 p-[clamp(1.5rem,4vw,2.75rem)]">
            <BadgePill className="mb-5 border border-gold/35 bg-[var(--theme-surface-overlay)] text-gold sm:mb-6">
              {t('hero.badge')}
            </BadgePill>

            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-1 sm:space-y-1.5">
                <h1 className="font-cormorant text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary text-balance">
                  {t('hero.title1')}
                </h1>
                <p className="font-cormorant text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-gold text-balance">
                  {t('hero.title2')}
                </p>
              </div>
              <SectionLead className="sm:mt-1">{t('hero.lead')}</SectionLead>
            </div>

            <BtnRow className="mt-8 sm:mt-10">
              <Button
                type="button"
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => {
                  document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('hero.explore')}
                <ArrowRight size={16} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleWhatsAppClick}
              >
                {t('hero.whatsapp')}
                <ArrowRight size={16} />
              </Button>
            </BtnRow>

            <div className="hero-stats mt-8 grid grid-cols-2 gap-4 border-t border-border-gold pt-6 sm:mt-10 sm:grid-cols-4 sm:pt-8">
              {heroStats.map((stat) => (
                <StatCard key={stat.labelKey} className="min-h-0 border-0 bg-transparent p-0 sm:p-0">
                  <StatValue className="text-base text-gold sm:text-lg">{stat.value}</StatValue>
                  <StatMeta className="normal-case tracking-normal sm:text-sm">
                    {t(stat.labelKey)}
                  </StatMeta>
                </StatCard>
              ))}
            </div>
          </PanelDark>
        </motion.div>
      </PageContainer>
    </section>
  );
}
