'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials } from '@/lib/firestore';
import { resolveTestimonials } from '@/lib/fallbacks';
import { cn } from '@/lib/cn';
import { useTranslation } from '@/context/LocaleContext';
import {
  Section,
  PageContainer,
  SectionHeaderCenter,
  SectionKicker,
  SectionHeading,
  SectionLead,
  GoldRule,
  PanelDark,
} from '@/components/ui/design';

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<ReturnType<typeof resolveTestimonials>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(resolveTestimonials(data));
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials(resolveTestimonials([]));
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const count = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setCurrentIndex(((index % count) + count) % count);
    },
    [count],
  );

  const nextSlide = () => goTo(currentIndex + 1);
  const prevSlide = () => goTo(currentIndex - 1);

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [count]);

  if (loading) {
    return (
      <Section tone="dark">
        <PageContainer className="flex items-center justify-center py-16">
          <div className="animate-pulse text-text-secondary">{t('sections.testimonials.loading')}</div>
        </PageContainer>
      </Section>
    );
  }

  if (count === 0) {
    return null;
  }

  const active = testimonials[currentIndex];
  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / Math.max(count, 1);

  return (
    <Section tone="dark">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeaderCenter className="mb-10 lg:mb-14">
            <SectionKicker centered>{t('sections.testimonials.kicker')}</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">{t('sections.testimonials.title')}</SectionHeading>
            <SectionLead className="mx-auto mt-4 text-center">{t('sections.testimonials.lead')}</SectionLead>
            <GoldRule className="mx-auto mt-6" />
          </SectionHeaderCenter>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-8">
            <div className="flex flex-col gap-3 lg:order-1">
              {testimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={cn(
                    ' border p-4 text-left transition-all duration-200 sm:p-5',
                    idx === currentIndex
                      ? 'border-gold/60 bg-gold/10 shadow-[0_8px_24px_rgba(201,168,76,0.12)]'
                      : 'border-border-gold bg-bg-card/40 hover:border-gold/40 hover:bg-bg-card/70',
                  )}
                  aria-current={idx === currentIndex ? 'true' : undefined}
                >
                  <p className="line-clamp-3 text-sm leading-relaxed text-text-secondary">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-semibold text-text-primary">{item.name}</span>
                    <span className="text-xs text-text-secondary">{item.flatType}</span>
                  </div>
                </button>
              ))}
            </div>

            <PanelDark className="flex min-h-[20rem] flex-col lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <span
                    className="font-cormorant text-6xl leading-none text-gold/30 sm:text-7xl"
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-2 font-cormorant text-xl leading-snug text-text-primary sm:text-2xl sm:leading-relaxed">
                    {active.quote}
                  </blockquote>

                  <div
                    className="mt-5 flex gap-1"
                    aria-label={`${active.rating} ${t('sections.testimonials.ofFive')}`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < active.rating
                            ? 'fill-gold text-gold'
                            : 'text-border-gold'
                        }
                      />
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40 bg-gold/15 font-inter text-sm font-semibold text-gold"
                        aria-hidden
                      >
                        {initials(active.name)}
                      </div>
                      <div>
                        <p className="font-inter text-sm font-semibold text-text-primary">
                          {active.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {t('sections.testimonials.residentLabel', { type: active.flatType })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={prevSlide}
                        className="inline-flex h-10 w-10 items-center justify-center border border-border-gold text-text-secondary transition-colors hover:border-gold hover:text-gold"
                        aria-label={t('sections.testimonials.prev')}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex gap-2" role="tablist" aria-label="Testimonials">
                        {testimonials.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            role="tab"
                            aria-selected={idx === currentIndex}
                            onClick={() => goTo(idx)}
                            className={cn(
                              'h-2 transition-all duration-200',
                              idx === currentIndex
                                ? 'w-6 bg-gold'
                                : 'w-2 bg-border-gold hover:bg-gold/50',
                            )}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={nextSlide}
                        className="inline-flex h-10 w-10 items-center justify-center border border-border-gold text-text-secondary transition-colors hover:border-gold hover:text-gold"
                        aria-label={t('sections.testimonials.next')}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </PanelDark>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 lg:mt-14">
            <div className="text-center">
              <p className="font-cormorant text-3xl font-semibold text-gold sm:text-4xl">
                {avgRating.toFixed(1)}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                {t('sections.testimonials.avgRating')}
              </p>
            </div>
            <div className="text-center">
              <p className="font-cormorant text-3xl font-semibold text-gold sm:text-4xl">
                {count}+
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                {t('sections.testimonials.residentStories')}
              </p>
            </div>
            <div className="text-center">
              <p className="font-cormorant text-3xl font-semibold text-gold sm:text-4xl">
                {t('common.rera')}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                {t('sections.testimonials.registeredProject')}
              </p>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
