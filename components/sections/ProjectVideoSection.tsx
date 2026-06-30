'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { HeroSettings } from '@/types';
import { Play } from 'lucide-react';
import { getHeroSettings } from '@/lib/firestore';
import { PROJECT_MEDIA, PROJECT_OVERVIEW_VIDEO_URL } from '@/lib/constants';
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

function getYouTubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      const videoId = parsed.pathname.replace(/^\//, '');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        const videoId = parsed.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return trimmed;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default function ProjectVideoSection({
  className,
  initialSettings,
}: {
  className?: string;
  initialSettings?: HeroSettings | null;
}) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState(
    initialSettings?.videoUrl || PROJECT_OVERVIEW_VIDEO_URL,
  );
  const [posterUrl, setPosterUrl] = useState(() =>
    getHeroPosterUrl(initialSettings?.posterUrl || PROJECT_MEDIA.posterUrl || undefined),
  );
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const hasInitial = useRef(!!initialSettings);

  useEffect(() => {
    if (hasInitial.current) {
      hasInitial.current = false;
      return;
    }

    const load = async () => {
      try {
        const settings = await getHeroSettings();
        if (settings?.videoUrl && typeof settings.videoUrl === 'string') {
          setVideoUrl(settings.videoUrl);
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

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  const handlePlay = async () => {
    const el = videoRef.current;
    if (!el) return;

    setHasStarted(true);
    setHasError(false);
    el.preload = 'auto';

    try {
      if (el.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        el.load();
        await new Promise<void>((resolve, reject) => {
          const onReady = () => {
            cleanup();
            resolve();
          };
          const onFail = () => {
            cleanup();
            reject(new Error('Video failed to load'));
          };
          const cleanup = () => {
            el.removeEventListener('loadeddata', onReady);
            el.removeEventListener('error', onFail);
          };
          el.addEventListener('loadeddata', onReady, { once: true });
          el.addEventListener('error', onFail, { once: true });
        });
      }

      await el.play();
    } catch {
      setHasError(true);
      setHasStarted(false);
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
                'bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.45)]',
              )}
            >
              {embedUrl ? (
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={embedUrl}
                    title={t('sections.video.title')}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : hasError ? (
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
                    <button
                      type="button"
                      onClick={() => void handlePlay()}
                      className="mt-5 inline-flex items-center justify-center gap-2 border border-gold/50 bg-gold/15 px-5 py-2.5 font-inter text-sm font-semibold text-gold transition-colors hover:bg-gold/25"
                    >
                      <Play size={16} />
                      {t('sections.video.playFull')}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="aspect-video w-full bg-black object-cover"
                    poster={posterUrl}
                    playsInline
                    controls={hasStarted}
                    preload="none"
                    onPlay={() => setHasStarted(true)}
                    onError={() => {
                      setHasError(true);
                      setHasStarted(false);
                    }}
                  />

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
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
