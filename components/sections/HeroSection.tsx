'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';

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
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(PROJECT_DATA.whatsappMessage);
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="hero-section relative flex w-full items-stretch">
      <div className="absolute inset-0 overflow-hidden">
        {settings.videoUrl ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={settings.posterUrl}
              className="absolute inset-0 hidden h-full w-full object-cover sm:block"
            >
              <source src={settings.videoUrl} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center sm:hidden"
              style={{
                backgroundImage: settings.posterUrl
                  ? `url(${settings.posterUrl})`
                  : undefined,
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.2),transparent_28%),linear-gradient(180deg,#171722_0%,#0d0d13_42%,#09090d_100%)]" />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.28)_0%,rgba(10,10,15,0.58)_48%,rgba(10,10,15,0.94)_100%)]" />
      </div>

      <div className="page-container relative z-10 flex flex-1 items-center py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full min-w-0"
        >
          <div className="hero-card panel-dark w-full min-w-0 rounded-2xl sm:rounded-[1.75rem]">
            <div className="badge-pill mb-5 border border-[rgba(201,168,76,0.35)] bg-black/25 text-[var(--gold)] sm:mb-6">
              Now Accepting Bookings — Chandauli, UP
            </div>

            <div className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <h1 className="font-cormorant text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--text-primary)] text-balance">
                  Crafted for Comfort.
                </h1>
                <p className="font-cormorant text-[clamp(2rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--gold)] text-balance">
                  Designed for Life.
                </p>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base sm:leading-7">
                Experience elevated living on the 8-lane NH-2 corridor with generous
                open space, direct regional connectivity, and a residential address built
                for long-term comfort.
              </p>
            </div>

            <div className="btn-row mt-7 sm:mt-8">
              <button
                type="button"
                onClick={() => {
                  document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                Explore Project
                <ArrowRight size={16} />
              </button>
              <button type="button" onClick={handleWhatsAppClick} className="btn-secondary">
                Talk to Us on WhatsApp
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:mt-10 sm:grid-cols-4 sm:gap-4 sm:pt-8">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="min-w-0 px-1 sm:px-0">
                  <p className="text-base font-semibold leading-snug text-[var(--gold)] sm:text-lg">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-[var(--text-secondary)] sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
