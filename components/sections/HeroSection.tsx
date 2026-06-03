'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';
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

const HERO_STATS = [
  { value: '1000+', label: 'Planned families' },
  { value: '2 & 3 BHK', label: 'Smartly planned homes' },
  { value: '65%+', label: 'Open, breathable grounds' },
  { value: 'RERA Ready', label: 'Regulated residential launch' },
] as const;

export default function HeroSection({ settings = {} as HeroSettings }) {
  const heroPoster = getHeroPosterUrl(settings.posterUrl);

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

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.28)_0%,rgba(10,10,15,0.58)_48%,rgba(10,10,15,0.94)_100%)]" />
      </div>

      <PageContainer className="relative z-10 flex flex-1 items-center py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full min-w-0"
        >
          <PanelDark className="w-full min-w-0 p-[clamp(1.5rem,4vw,2.75rem)]">
            <BadgePill className="mb-5 border border-gold/35 bg-black/25 text-gold sm:mb-6">
              Now Accepting Bookings — Chandauli, UP
            </BadgePill>

            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-1 sm:space-y-1.5">
                <h1 className="font-cormorant text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary text-balance">
                  Crafted for Comfort.
                </h1>
                <p className="font-cormorant text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-gold text-balance">
                  Designed for Life.
                </p>
              </div>
              <SectionLead className="sm:mt-1">
                Experience elevated living on the 8-lane NH-2 corridor with generous
                open space, direct regional connectivity, and a residential address built
                for long-term comfort.
              </SectionLead>
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
                Explore Project
                <ArrowRight size={16} />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={handleWhatsAppClick}
              >
                Talk to Us on WhatsApp
                <ArrowRight size={16} />
              </Button>
            </BtnRow>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:grid-cols-4 sm:pt-8">
              {HERO_STATS.map((stat) => (
                <StatCard key={stat.label} className="min-h-0 border-0 bg-transparent p-0 sm:p-0">
                  <StatValue className="text-base text-gold sm:text-lg">{stat.value}</StatValue>
                  <StatMeta className="normal-case tracking-normal sm:text-sm">
                    {stat.label}
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
