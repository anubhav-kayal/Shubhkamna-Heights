'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/context/LocaleContext';
import { useEnquiryModal } from '@/context/EnquiryModalContext';
import { PROJECT_MEDIA } from '@/lib/constants';
import { getPlaceholderUrl, getHeroPosterUrl, resolveImageUrl } from '@/lib/placeholders';
import type { LandingSettings } from '@/types';
import { PageContainer, BtnRow } from '@/components/ui/design';
import { cn } from '@/lib/cn';

function OutlineCta({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const className = cn(
    'inline-flex items-center gap-2 border border-gold/50 bg-transparent px-5 py-2.5',
    'font-inter text-xs font-semibold uppercase tracking-[0.18em] text-gold',
    'transition-colors hover:border-gold hover:bg-gold/10',
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
        <ArrowRight size={14} />
      </button>
    );
  }

  return (
    <Link href={href ?? '/'} className={className}>
      {children}
      <ArrowRight size={14} />
    </Link>
  );
}

function AspirationalBlock({
  kickerKey,
  titleKey,
  bodyKey,
  ctaKey,
  ctaHref,
  imageSeed,
  imageRight = false,
}: {
  kickerKey: string;
  titleKey: string;
  bodyKey: string;
  ctaKey: string;
  ctaHref: string;
  imageSeed: string;
  imageRight?: boolean;
}) {
  const { t } = useTranslation();
  const image = getPlaceholderUrl('gallery', imageSeed);

  return (
    <section className="border-t border-border-gold bg-bg-primary">
      <PageContainer className="py-14 sm:py-20">
        <div
          className={cn(
            'grid items-center gap-10 lg:grid-cols-2 lg:gap-14',
            imageRight && 'lg:[&>div:first-child]:order-2',
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold">
              {t(kickerKey)}
            </p>
            <h2 className="mt-4 font-cormorant text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-tight text-text-primary">
              {t(titleKey)}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary">{t(bodyKey)}</p>
            <div className="mt-8">
              <OutlineCta href={ctaHref}>{t(ctaKey)}</OutlineCta>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]"
          >
            <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}

export function LandingPremiumHero({ settings }: { settings: LandingSettings | null }) {
  const { t } = useTranslation();
  const videoUrl = settings?.heroVideoUrl || PROJECT_MEDIA.videoUrl;
  const posterUrl = getHeroPosterUrl(settings?.heroPosterUrl || PROJECT_MEDIA.posterUrl);
  const stillImage = resolveImageUrl(settings?.heroImageUrl, 'hero');

  return (
    <section className="grid min-h-dvh border-b border-border-gold pt-[var(--site-header-height)] lg:grid-cols-[minmax(0,44%)_1fr]">
      <div className="emotional-hero-copy flex flex-col justify-center border-b border-border-gold/30 px-5 py-12 sm:px-8 sm:py-16 lg:border-b-0 lg:border-r lg:py-20 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <p className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold">
            {t('landing.premium.kicker')}
          </p>
          <h1 className="mt-5 font-cormorant text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-text-primary">
            {t('landing.premium.title1')}
          </h1>
          <p className="mt-1 font-cormorant text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-gold">
            {t('landing.premium.title2')}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary sm:text-[0.9375rem] sm:leading-7">
            {t('landing.premium.lead')}
          </p>
          <BtnRow className="mt-8">
            <Link
              href="/project"
              className="inline-flex w-full items-center justify-center gap-2 border border-gold/50 bg-gradient-to-br from-gold to-gold-light px-5 py-3 font-inter text-sm font-semibold text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)] sm:w-auto"
            >
              {t('landing.premium.explore')}
              <ArrowRight size={16} />
            </Link>
            <OutlineCta href="/our-story">{t('landing.premium.story')}</OutlineCta>
          </BtnRow>
        </motion.div>
      </div>

      <div className="relative min-h-[min(42vh,22rem)] lg:min-h-0">
        {videoUrl ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={posterUrl}
              preload="none"
              className="absolute inset-0 hidden h-full w-full object-cover lg:block"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 bg-cover bg-center lg:hidden"
              style={{ backgroundImage: `url(${posterUrl || stillImage})` }}
            />
          </>
        ) : (
          <Image src={stillImage} alt="" fill priority className="object-cover" sizes="60vw" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg-light/20 via-transparent to-transparent lg:from-bg-light/35" />
      </div>
    </section>
  );
}

export function LandingEmotionalSection({ settings }: { settings: LandingSettings | null }) {
  const { t } = useTranslation();
  const familyImage = resolveImageUrl(
    settings?.emotionalImageUrl,
    'gallery',
    'happy-family-lifestyle',
  );

  return (
    <section className="border-b border-border-gold/30">
      <div className="emotional-hero-copy border-b border-border-gold/30">
        <PageContainer className="py-10 sm:py-12 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h2 className="font-cormorant text-[clamp(1.5rem,4vw,2.5rem)] font-semibold uppercase leading-[1.1] tracking-[0.02em] text-gold">
              {t('landing.hero.headline')}
            </h2>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <OutlineCta href="/our-story">{t('landing.hero.aboutLink')}</OutlineCta>
              <Link
                href="/project"
                className="inline-flex items-center gap-2 font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-gold"
              >
                {t('landing.hero.findHome')}
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </PageContainer>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full min-h-[70vh] sm:min-h-[78vh] lg:min-h-[85vh] lg:max-h-[56rem]"
      >
        <Image
          src={familyImage}
          alt={t('landing.hero.imageAlt')}
          fill
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}

export function LandingBelief() {
  return (
    <AspirationalBlock
      kickerKey="landing.belief.kicker"
      titleKey="landing.belief.title"
      bodyKey="landing.belief.body"
      ctaKey="landing.belief.cta"
      ctaHref="/our-story"
      imageSeed="belief"
    />
  );
}

export function LandingMatters() {
  return (
    <AspirationalBlock
      kickerKey="landing.matters.kicker"
      titleKey="landing.matters.title"
      bodyKey="landing.matters.body"
      ctaKey="landing.matters.cta"
      ctaHref="/project"
      imageSeed="matters"
      imageRight
    />
  );
}

export function LandingHappiness() {
  return (
    <AspirationalBlock
      kickerKey="landing.happiness.kicker"
      titleKey="landing.happiness.title"
      bodyKey="landing.happiness.body"
      ctaKey="landing.happiness.cta"
      ctaHref="/project#floor-plans"
      imageSeed="happiness"
    />
  );
}

const CURATED_CARDS = [
  {
    titleKey: 'landing.curated.cardHomes',
    descKey: 'landing.curated.cardHomesDesc',
    seed: 'curated-homes',
    settingsKey: 'curatedImageHomes' as const,
  },
  {
    titleKey: 'landing.curated.cardCommunity',
    descKey: 'landing.curated.cardCommunityDesc',
    seed: 'curated-community',
    settingsKey: 'curatedImageCommunity' as const,
  },
  {
    titleKey: 'landing.curated.cardConnect',
    descKey: 'landing.curated.cardConnectDesc',
    seed: 'curated-connect',
    settingsKey: 'curatedImageConnect' as const,
  },
] as const;

export function LandingCurated({ settings }: { settings: LandingSettings | null }) {
  const { t } = useTranslation();

  return (
    <section className="border-t border-border-gold bg-bg-section">
      <PageContainer className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <p className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold">
            {t('landing.curated.kicker')}
          </p>
          <h2 className="mt-4 font-cormorant text-[clamp(1.75rem,4vw,2.5rem)] font-semibold text-text-primary">
            {t('landing.curated.title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">{t('landing.curated.lead')}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CURATED_CARDS.map((card) => (
            <Link
              key={card.seed}
              href="/project"
              className="group relative block min-h-[14rem] overflow-hidden sm:min-h-[18rem]"
            >
              <Image
                src={resolveImageUrl(settings?.[card.settingsKey], 'gallery', card.seed)}
                alt=""
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-dark/75 via-text-dark/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <h3 className="font-cormorant text-xl font-semibold text-white sm:text-2xl">
                  {t(card.titleKey)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{t(card.descKey)}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">
                  {t('landing.curated.explore')}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

export function LandingConversation() {
  const { t } = useTranslation();
  const { openEnquiry } = useEnquiryModal();

  return (
    <section className="border-t border-border-gold bg-bg-primary">
      <PageContainer className="py-16 text-center sm:py-24">
        <p className="font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold">
          {t('landing.conversation.kicker')}
        </p>
        <h2 className="mx-auto mt-5 max-w-xl font-cormorant text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-snug text-text-primary">
          {t('landing.conversation.title')}
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-text-secondary sm:text-base">
          {t('landing.conversation.lead')}
        </p>
        <div className="mt-10 flex justify-center">
          <OutlineCta onClick={openEnquiry}>{t('landing.conversation.cta')}</OutlineCta>
        </div>
      </PageContainer>
    </section>
  );
}
