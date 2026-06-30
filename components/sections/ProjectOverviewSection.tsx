'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/context/LocaleContext';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { PROJECT_DATA, LANDMARKS, KEY_FEATURES } from '@/lib/constants';
import { cn } from '@/lib/cn';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  SectionLead,
  GoldRule,
} from '@/components/ui/design';

const METRICS = [
  { figure: `${PROJECT_DATA.openSpace}%`, unit: '+', caption: 'Open space across the master plan' },
  { figure: String(PROJECT_DATA.totalFamilies), unit: '+', caption: 'Families in the integrated community' },
  { figure: '2 & 3', unit: 'BHK', caption: 'Thoughtfully planned home formats' },
  { figure: 'NH-2', unit: '', caption: 'Direct highway frontage at PDDU Nagar' },
] as const;

const HIGHLIGHT_FEATURES = KEY_FEATURES.slice(0, 10);

export default function ProjectOverviewSection() {
  const { t } = useTranslation();

  return (
    <Section id="overview" tone="dark" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 bg-gold/[0.04] blur-3xl"
        aria-hidden
      />

      <PageContainer className="relative">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <SectionKicker>{t('sections.overview.kicker')}</SectionKicker>
          <SectionHeading className="mt-4">{t('sections.overview.title')}</SectionHeading>
          <SectionLead className="mt-5">{t('sections.overview.lead')}</SectionLead>
          <div className="mt-8 border border-gold/35 bg-gold/[0.06] px-5 py-6 sm:px-7 sm:py-7">
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {t('sections.overview.commercialTitle')}
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.8] text-text-primary/95">
              {t('sections.overview.commercialLead')}
            </p>
          </div>
          <GoldRule className="mt-8" />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-12 grid grid-cols-2 border-y border-border-gold lg:mt-16 lg:grid-cols-4"
        >
          {METRICS.map((metric, i) => (
            <div
              key={metric.caption}
              className={cn(
                'px-4 py-8 sm:px-6 sm:py-10',
                i % 2 !== 0 && 'border-l border-border-gold/60',
                i > 0 && i % 2 === 0 && 'lg:border-l border-border-gold/60',
                i >= 2 && 'border-t border-border-gold/60 lg:border-t-0',
              )}
            >
              <p className="font-cormorant text-4xl font-semibold leading-none tracking-tight text-gold sm:text-5xl">
                {metric.figure}
                {metric.unit && (
                  <span className="ml-1 text-2xl text-text-primary/90 sm:text-3xl">
                    {metric.unit}
                  </span>
                )}
              </p>
              <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-text-secondary">
                {metric.caption}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55 }}
          >
            <blockquote className="border-l-2 border-gold pl-6 sm:pl-8">
              <p className="font-cormorant text-2xl font-medium leading-snug text-text-primary sm:text-[1.75rem]">
                Where Varanasi&apos;s spiritual heritage meets Chandauli&apos;s open landscape.
              </p>
            </blockquote>
            <p className="mt-8 text-[0.9375rem] leading-[1.8] text-text-secondary">
              Shubh Kamna Heights is positioned on the 8-lane NH-2 corridor with planning that
              prioritises light, circulation, and community scale, including an integrated commercial
              complex so residents benefit from daily retail and services within the same address.
            </p>
            <p className="mt-5 text-[0.9375rem] leading-[1.8] text-text-secondary">
              With RERA registration, VDA approval, and CREDAI membership, buyers get the
              documentation clarity expected from a serious residential launch in Uttar Pradesh.
            </p>
            <a
              href="#location"
              className="mt-8 inline-flex items-center gap-2 font-inter text-sm font-semibold text-gold transition-colors hover:text-gold-light"
            >
              {t('sections.overview.exploreLocation')}
              <ArrowUpRight size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {t('sections.overview.planningHighlights')}
            </p>
            <ul className="mt-6 divide-y divide-border-gold/80">
              {HIGHLIGHT_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0 sm:py-5"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold"
                    aria-hidden
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-text-primary/95">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-text-secondary">
              {KEY_FEATURES.length} specifications across structure, services, and community
              design. See the full list in Specifications.
            </p>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55 }}
          className="mt-12 lg:mt-16"
          aria-labelledby="connectivity-heading"
        >
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border-gold pb-4">
            <div>
              <SectionKicker>{t('sections.overview.connectivityKicker')}</SectionKicker>
              <h3
                id="connectivity-heading"
                className="mt-2 font-cormorant text-xl font-semibold text-text-primary sm:text-2xl"
              >
                {t('sections.overview.connectivityTitle')}
              </h3>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-text-secondary">
              {t('sections.overview.connectivityLead')}
            </p>
          </div>

          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:gap-2.5">
            {LANDMARKS.map((landmark) => (
              <li
                key={landmark.name}
                className="group flex items-center gap-3 border border-border-gold/50 bg-bg-card/40 px-3 py-2.5 transition-colors hover:border-gold/40"
              >
                <div className="flex shrink-0 items-baseline gap-1.5 tabular-nums">
                  <span className="font-cormorant text-xl font-semibold text-gold">
                    {landmark.distance === 0 ? '0' : landmark.distance}
                  </span>
                  <span className="font-inter text-[0.625rem] font-semibold uppercase tracking-wider text-text-secondary">
                    km
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-inter text-sm font-medium text-text-primary">
                    {landmark.name}
                  </p>
                  <p className="text-xs text-text-secondary">{landmark.category}</p>
                </div>
                <MapPin
                  size={14}
                  className="shrink-0 text-gold/35 transition-colors group-hover:text-gold"
                  aria-hidden
                />
              </li>
            ))}
          </ul>
        </motion.section>
      </PageContainer>
    </Section>
  );
}
