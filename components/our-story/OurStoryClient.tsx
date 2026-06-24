'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Heart,
  MapPin,
  Shield,
  Users,
  Briefcase,
  TreePine,
  CheckCircle2,
} from 'lucide-react';
import { PROJECT_DATA, PROMOTERS } from '@/lib/constants';
import { resolvePromoterPhotoUrl } from '@/lib/placeholders';
import { useTranslation } from '@/context/LocaleContext';
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

const GENERATION_KEYS = [
  { titleKey: 'sections.story.genChildrenTitle', detailKey: 'sections.story.genChildrenDetail', icon: TreePine },
  { titleKey: 'sections.story.genProfessionalsTitle', detailKey: 'sections.story.genProfessionalsDetail', icon: Briefcase },
  { titleKey: 'sections.story.genSeniorsTitle', detailKey: 'sections.story.genSeniorsDetail', icon: Users },
] as const;

const VALUE_KEYS = [
  { titleKey: 'sections.story.value1Title', detailKey: 'sections.story.value1Detail' },
  { titleKey: 'sections.story.value2Title', detailKey: 'sections.story.value2Detail' },
  { titleKey: 'sections.story.value3Title', detailKey: 'sections.story.value3Detail' },
  { titleKey: 'sections.story.value4Title', detailKey: 'sections.story.value4Detail' },
] as const;

const LOCATION_HIGHLIGHT_KEYS = [
  'sections.story.locationHighlight1',
  'sections.story.locationHighlight2',
  'sections.story.locationHighlight3',
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
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-on-light sm:text-lg sm:leading-8">
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
            <HeadingLight>{t('sections.story.visionTitle')}</HeadingLight>
            <SectionCopy className="mt-4 text-muted-on-light">{t('sections.story.visionP1')}</SectionCopy>
            <SectionCopy className="mt-4 text-muted-on-light">{t('sections.story.visionP2')}</SectionCopy>
            <p className="mt-5 text-sm text-subtle-on-light">
              {t('sections.story.reraLine', {
                rera: PROJECT_DATA.reraNumber,
                credai: PROJECT_DATA.credaiText,
              })}
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-2xl text-center">
            <HeadingLight>{t('sections.story.generationsTitle')}</HeadingLight>
            <p className="mt-4 text-sm leading-relaxed text-muted-on-light sm:text-base sm:leading-7">
              {t('sections.story.generationsLead')}
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:gap-6">
            {GENERATION_KEYS.map(({ titleKey, detailKey, icon: Icon }) => (
              <LightCard key={titleKey} className="p-6 text-center sm:text-left">
                <div className="mb-4 inline-flex border border-border-on-light bg-gold/10 p-3 text-gold-dark sm:mx-0 mx-auto">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-text-dark">{t(titleKey)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-on-light">{t(detailKey)}</p>
              </LightCard>
            ))}
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

        <section className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col justify-center lg:order-2">
            <HeadingLight>{t('sections.story.locationTitle')}</HeadingLight>
            <SectionCopy className="mt-4 text-muted-on-light">{t('sections.story.locationP1')}</SectionCopy>
            <ul className="mt-6 space-y-3">
              {LOCATION_HIGHLIGHT_KEYS.map((key) => (
                <li key={key} className="flex items-start gap-3 text-sm leading-relaxed text-muted-on-light">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-dark" strokeWidth={1.75} />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>
          <LightCard className="relative min-h-[14rem] overflow-hidden border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-8 lg:order-1 lg:min-h-[20rem]">
            <div className="flex h-full flex-col justify-center">
              <MapPin size={32} className="text-gold-dark" strokeWidth={1.5} />
              <p className="mt-4 font-cormorant text-2xl font-semibold leading-snug text-text-dark sm:text-3xl">
                {PROJECT_DATA.fullAddress}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-on-light">{PROJECT_DATA.location}</p>
            </div>
          </LightCard>
        </section>

        <section className="border border-border-on-light bg-white p-6 sm:p-8 lg:p-10">
          <HeadingLight>{t('sections.story.regionalTitle')}</HeadingLight>
          <SectionCopy className="mt-4 max-w-3xl text-muted-on-light">{t('sections.story.regionalP1')}</SectionCopy>
          <SectionCopy className="mt-4 max-w-3xl text-muted-on-light">{t('sections.story.regionalP2')}</SectionCopy>
        </section>

        <section>
          <div className="mx-auto max-w-2xl text-center">
            <HeadingLight>{t('sections.story.promotersTitle')}</HeadingLight>
            <p className="mt-4 text-sm leading-relaxed text-muted-on-light sm:text-base sm:leading-7">
              {t('sections.story.promotersLead')}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl gap-8 sm:grid-cols-2 sm:gap-10">
            {PROMOTERS.map((promoter, index) => {
              const photoUrl = resolvePromoterPhotoUrl(promoter.imageUrl, index);

              return (
                <LightCard
                  key={promoter.id}
                  className="flex flex-col items-center p-6 text-center sm:p-7"
                >
                  <div className="relative aspect-[3/4] w-[8.75rem] overflow-hidden border border-gold/35 bg-gold/5 shadow-[0_10px_28px_rgba(0,0,0,0.07)] sm:w-[10.5rem]">
                    <Image
                      src={photoUrl}
                      alt={promoter.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 140px, 168px"
                    />
                  </div>
                  <p className="mt-5 font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gold-dark">
                    {t(promoter.roleKey)}
                  </p>
                  <h3 className="mt-2 font-cormorant text-xl font-semibold leading-snug text-text-dark sm:text-[1.35rem]">
                    {promoter.name}
                  </h3>
                </LightCard>
              );
            })}
          </div>
        </section>

        <blockquote className="border-l-4 border-gold-dark bg-gold/5 px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-cormorant text-xl font-medium italic leading-relaxed text-text-dark sm:text-2xl sm:leading-relaxed">
            &ldquo;{t('sections.story.commitmentQuote')}&rdquo;
          </p>
        </blockquote>

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
