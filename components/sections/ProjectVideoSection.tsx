'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { getHeroSettings } from '@/lib/firestore';
import { PROJECT_MEDIA } from '@/lib/constants';
import { getHeroPosterUrl } from '@/lib/placeholders';
import {
  GoldRule,
  PageContainer,
  Section,
  SectionHeaderCenter,
  SectionHeading,
  SectionKicker,
  SectionLead,
} from '@/components/ui/design';
import { cn } from '@/lib/cn';
import { useTranslation } from '@/context/LocaleContext';

export default function ProjectVideoSection({ className }: { className?: string }) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState(PROJECT_MEDIA.videoUrl);
  const [posterUrl, setPosterUrl] = useState(() =>
    getHeroPosterUrl(PROJECT_MEDIA.posterUrl || undefined),
  );
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const settings = await getHeroSettings();
        if (settings?.videoUrl && typeof settings.videoUrl === 'string') {
          setVideoUrl(settings.videoUrl);
          setHasError(false);
        }
        if (settings?.posterUrl && typeof settings.posterUrl === 'string') {
          setPosterUrl(getHeroPosterUrl(settings.posterUrl));
        }
      } catch {
        /* use constants fallback */
      }
    };

    void load();
  }, []);

  const handlePlay = async () => {
    const el = videoRef.current;
    if (!el) return;
    setHasStarted(true);
    try {
      await el.play();
    } catch {
      /* native controls remain available */
    }
  };

  return (
    <Section
      id="project-video"
      tone="dark"
      className={cn('relative border-y border-border-gold/40 bg-bg-primary', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(201,168,76,0.08),transparent_60%)]"
        aria-hidden
      />

      <PageContainer className="relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeaderCenter className="mb-12 sm:mb-14">
            <SectionKicker centered>{t('sections.video.kicker')}</SectionKicker>
            <SectionHeading className="mt-5">{t('sections.video.title')}</SectionHeading>
            <SectionLead className="mx-auto mt-5 max-w-2xl text-center">
              {t('sections.video.lead')}
            </SectionLead>
            <GoldRule className="mx-auto mt-8" />
          </SectionHeaderCenter>

          <div className="mx-auto max-w-6xl">
            <div
              className={cn(
                'relative overflow-hidden border border-border-gold',
                'bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:',
              )}
            >
              {hasError ? (
                <div className="relative flex aspect-video flex-col items-center justify-center gap-4 px-6 text-center">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${posterUrl})` }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-bg-primary/85" aria-hidden />
                  <div className="relative z-10 max-w-md">
                    <p className="font-cormorant text-xl font-semibold text-text-primary sm:text-2xl">
                      {t('sections.video.errorTitle')}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {t('sections.video.errorLead')}
                    </p>
                  </div>
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
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>

                  {!hasStarted && (
                    <button
                      type="button"
                      onClick={() => void handlePlay()}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/35 transition-colors hover:bg-black/45"
                      aria-label={t('sections.video.playAria')}
                    >
                      <span className="flex h-16 w-16 items-center justify-center border border-gold/50 bg-gold/20 text-gold shadow-[0_0_40px_rgba(201,168,76,0.25)] backdrop-blur-sm sm:h-20 sm:w-20">
                        <Play size={32} className="ml-1" fill="currentColor" />
                      </span>
                      <span className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-text-primary">
                        {t('sections.video.playFull')}
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>

            <p className="mt-5 text-center text-xs text-text-secondary sm:text-sm">
              {t('sections.video.footerNote')}
            </p>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
