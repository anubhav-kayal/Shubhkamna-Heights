'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Heart, MapPin, Shield } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';
import { useTranslation } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';
import {
  BadgePill,
  BtnRow,
  EditorialHero,
  HeadingLight,
  LightCard,
  PageContainer,
  SectionCopy,
} from '@/components/ui/design';

const VALUE_ICONS = [Shield, Heart, MapPin, Building2] as const;

const MILESTONE_KEYS = [
  { year: '2023', titleKey: 'sections.story.m2023Title', detailKey: 'sections.story.m2023Detail' },
  { year: '2024', titleKey: 'sections.story.m2024Title', detailKey: 'sections.story.m2024Detail' },
  { year: '2025', titleKey: 'sections.story.m2025Title', detailKey: 'sections.story.m2025Detail' },
  { year: '2026', titleKey: 'sections.story.m2026Title', detailKey: 'sections.story.m2026Detail' },
] as const;

const VALUE_KEYS = [
  { titleKey: 'sections.story.value1Title', detailKey: 'sections.story.value1Detail' },
  { titleKey: 'sections.story.value2Title', detailKey: 'sections.story.value2Detail' },
  { titleKey: 'sections.story.value3Title', detailKey: 'sections.story.value3Detail' },
  { titleKey: 'sections.story.value4Title', detailKey: 'sections.story.value4Detail' },
] as const;

export default function OurStoryClient({ heroImage }: { heroImage: string }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-bg-light text-text-dark">
      <EditorialHero>
        <PageContainer>
          <BadgePill className="border border-gold/30 bg-gold/10 text-gold-dark">
            {t('sections.story.badge')}
          </BadgePill>
          <h1 className="mt-4 font-cormorant text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-text-dark">
            {t('sections.story.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-on-light">
            {t('sections.story.lead')}
          </p>
        </PageContainer>
      </EditorialHero>

      <PageContainer className="space-y-14 py-10 sm:space-y-16 sm:py-14">
        <section className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <LightCard className="relative min-h-[16rem] overflow-hidden lg:min-h-[24rem]">
            <Image
              src={heroImage}
              alt="Shubh Kamna Heights residential community"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </LightCard>
          <div className="flex flex-col justify-center">
            <HeadingLight>{t('sections.story.whyTitle')}</HeadingLight>
            <SectionCopy className="mt-4 text-muted-on-light">{t('sections.story.whyP1')}</SectionCopy>
            <SectionCopy className="mt-4 text-muted-on-light">{t('sections.story.whyP2')}</SectionCopy>
            <p className="mt-5 text-sm text-subtle-on-light">
              {t('sections.story.reraLine', {
                rera: PROJECT_DATA.reraNumber,
                credai: PROJECT_DATA.credaiText,
              })}
            </p>
          </div>
        </section>

        <section>
          <HeadingLight className="text-center">{t('sections.story.valuesTitle')}</HeadingLight>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {VALUE_KEYS.map(({ titleKey, detailKey }, index) => {
              const Icon = VALUE_ICONS[index];
              return (
                <LightCard key={titleKey} className="p-6">
                  <div className="mb-4 inline-flex border border-border-on-light bg-gold/10 p-3 text-gold-dark">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-text-dark">{t(titleKey)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-on-light">{t(detailKey)}</p>
                </LightCard>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border-on-light pt-12 sm:pt-14">
          <div className="max-w-2xl">
            <HeadingLight>{t('sections.story.timelineTitle')}</HeadingLight>
            <p className="mt-4 text-sm leading-relaxed text-muted-on-light">
              {t('sections.story.timelineLead')}
            </p>
          </div>

          <div className="mt-8 border border-border-on-light bg-white">
            {MILESTONE_KEYS.map((item, index) => (
              <article
                key={item.year}
                className={cn(
                  'grid grid-cols-1 gap-3 p-5 sm:grid-cols-[6.5rem_1fr] sm:gap-8 sm:p-6 lg:p-7',
                  index > 0 && 'border-t border-border-on-light',
                )}
              >
                <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
                  <span className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold-dark">
                    {item.year}
                  </span>
                  <span className="hidden h-px w-8 bg-gold-dark/40 sm:block" aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="font-cormorant text-xl font-semibold leading-snug text-text-dark sm:text-2xl">
                    {t(item.titleKey)}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-on-light sm:text-[0.9375rem] sm:leading-7">
                    {t(item.detailKey)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <LightCard className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <HeadingLight>{t('sections.story.ctaTitle')}</HeadingLight>
            <p className="mt-3 text-sm leading-relaxed text-muted-on-light">{t('sections.story.ctaLead')}</p>
          </div>
          <BtnRow className="shrink-0">
            <Link
              href="/project#floor-plans"
              className="inline-flex items-center justify-center gap-2 border border-gold/50 bg-gradient-to-br from-gold to-gold-light px-5 py-3 font-inter text-sm font-semibold text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)]"
            >
              {t('sections.story.viewPlans')}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 border border-border-on-light bg-white px-5 py-3 font-inter text-sm font-semibold text-gold-dark transition-all duration-200 hover:border-gold-dark hover:bg-gold/5"
            >
              {t('sections.story.readBlog')}
            </Link>
          </BtnRow>
        </LightCard>
      </PageContainer>
    </div>
  );
}
