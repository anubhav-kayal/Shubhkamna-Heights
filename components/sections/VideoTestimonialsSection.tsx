'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { resolveVideoTestimonials } from '@/lib/fallbacks';
import { getHeroPosterUrl } from '@/lib/placeholders';
import { cn } from '@/lib/cn';
import { useTranslation } from '@/context/LocaleContext';
import type { VideoTestimonial } from '@/types';
import {
  GoldRule,
  PageContainer,
  Section,
  SectionHeaderCenter,
  SectionHeading,
  SectionKicker,
  SectionLead,
} from '@/components/ui/design';

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function residentMeta(
  t: ReturnType<typeof useTranslation>['t'],
  flatType: string,
  profession: string,
) {
  return t('sections.videoTestimonials.residentMeta', { type: flatType, profession });
}

function VideoStage({
  item,
  playAria,
  watchLabel,
}: {
  item: VideoTestimonial;
  playAria: string;
  watchLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const posterUrl = getHeroPosterUrl(item.posterUrl);

  useEffect(() => {
    setHasStarted(false);
    setHasError(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  }, [item.id]);

  const handlePlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    setHasStarted(true);
    try {
      await el.play();
    } catch {
      /* native controls remain available */
    }
  }, []);

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative overflow-hidden border border-border-gold bg-black"
    >
      {hasError ? (
        <div className="relative flex aspect-video flex-col items-center justify-center gap-3 px-6 py-12 text-center">
          <p className="font-cormorant text-xl font-semibold text-text-primary sm:text-2xl">
            {item.name}
          </p>
          <p className="text-xs text-text-secondary">
            {item.flatType} · {item.profession}
          </p>
          <p className="max-w-md text-sm leading-relaxed text-text-secondary">
            &ldquo;{item.quote}&rdquo;
          </p>
          <p className="text-xs text-text-secondary">{watchLabel}</p>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black object-cover"
            poster={posterUrl}
            playsInline
            preload="metadata"
            controls={hasStarted}
            onPlay={() => setHasStarted(true)}
            onError={() => setHasError(true)}
          >
            <source src={item.videoUrl} type="video/mp4" />
            Your browser does not support embedded video.
          </video>

          {!hasStarted && (
            <button
              type="button"
              onClick={() => void handlePlay()}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
              aria-label={playAria}
            >
              <span className="flex flex-col items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center border border-gold/50 bg-gold/15 text-gold sm:h-16 sm:w-16">
                  <Play size={26} className="ml-1" fill="currentColor" />
                </span>
                <span className="font-inter text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                  {watchLabel}
                </span>
              </span>
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}

function VideoThumbnail({ item, selected }: { item: VideoTestimonial; selected: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterUrl = getHeroPosterUrl(item.posterUrl);

  return (
    <div className="relative aspect-video w-[5.5rem] shrink-0 overflow-hidden border border-border-gold/40 bg-black sm:w-24">
      <video
        ref={videoRef}
        src={item.videoUrl}
        poster={posterUrl}
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            'flex h-7 w-7 items-center justify-center border border-gold/50 bg-black/40 text-gold',
            selected && 'bg-gold/20',
          )}
        >
          <Play size={12} className="ml-0.5" fill="currentColor" />
        </span>
      </span>
    </div>
  );
}

function PlaylistItem({
  item,
  selected,
  metaLabel,
  onSelect,
}: {
  item: VideoTestimonial;
  selected: boolean;
  metaLabel: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'flex w-full gap-4 border p-3 text-left transition-colors duration-200 sm:p-4',
        selected
          ? 'border-gold/60 bg-gold/10'
          : 'border-border-gold/50 bg-bg-card/30 hover:border-gold/40 hover:bg-bg-card/50',
      )}
      aria-current={selected ? 'true' : undefined}
    >
      <VideoThumbnail item={item} selected={selected} />

      <div className="min-w-0 flex-1 py-0.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center border text-[0.65rem] font-semibold',
              selected
                ? 'border-gold/50 bg-gold/15 text-gold'
                : 'border-border-gold/50 bg-bg-card/50 text-text-secondary',
            )}
            aria-hidden
          >
            {initials(item.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text-primary">{item.name}</p>
            <p className="text-xs text-text-secondary">{metaLabel}</p>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
    </button>
  );
}

export default function VideoTestimonialsSection() {
  const { t } = useTranslation();
  const testimonials = resolveVideoTestimonials([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const count = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  if (count === 0) return null;

  const active = testimonials[activeIndex];

  return (
    <Section tone="card" className="border-t border-gold/20">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeaderCenter className="mb-10 lg:mb-12">
            <SectionKicker centered>{t('sections.videoTestimonials.kicker')}</SectionKicker>
            <SectionHeading className="mt-4">{t('sections.videoTestimonials.title')}</SectionHeading>
            <SectionLead className="mx-auto mt-4 max-w-2xl text-center">
              {t('sections.videoTestimonials.lead')}
            </SectionLead>
            <GoldRule className="mx-auto mt-6" />
          </SectionHeaderCenter>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-8">
            <div className="flex flex-col gap-3">
              <p className="mb-1 font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-text-secondary">
                {t('sections.videoTestimonials.playlistLabel')}
              </p>
              {testimonials.map((item, idx) => (
                <PlaylistItem
                  key={item.id}
                  item={item}
                  selected={idx === activeIndex}
                  metaLabel={residentMeta(t, item.flatType, item.profession)}
                  onSelect={() => goTo(idx)}
                />
              ))}
            </div>

            <div className="flex min-w-0 flex-col">
              <AnimatePresence mode="wait">
                <VideoStage
                  key={active.id}
                  item={active}
                  playAria={t('sections.videoTestimonials.playAria', { name: active.name })}
                  watchLabel={t('sections.videoTestimonials.watchStory')}
                />
              </AnimatePresence>

              <div className="mt-4 flex items-center justify-between gap-4 border border-border-gold/50 bg-bg-card/30 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">{active.name}</p>
                  <p className="text-xs text-text-secondary">
                    {residentMeta(t, active.flatType, active.profession)}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary sm:hidden">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    className="inline-flex h-9 w-9 items-center justify-center border border-border-gold text-text-secondary transition-colors hover:border-gold hover:text-gold"
                    aria-label={t('sections.videoTestimonials.prev')}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex gap-1.5" role="tablist" aria-label={t('sections.videoTestimonials.kicker')}>
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        role="tab"
                        aria-selected={idx === activeIndex}
                        onClick={() => goTo(idx)}
                        className={cn(
                          'h-1.5 transition-all duration-200',
                          idx === activeIndex ? 'w-5 bg-gold' : 'w-1.5 bg-border-gold hover:bg-gold/50',
                        )}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    className="inline-flex h-9 w-9 items-center justify-center border border-border-gold text-text-secondary transition-colors hover:border-gold hover:text-gold"
                    aria-label={t('sections.videoTestimonials.next')}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
