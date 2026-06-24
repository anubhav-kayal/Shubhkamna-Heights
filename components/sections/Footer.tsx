'use client';

import Link from 'next/link';
import { PROJECT_DATA } from '@/lib/constants';
import { useTranslation } from '@/context/LocaleContext';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { PageContainer } from '@/components/ui/design';
import BrandLogo from '@/components/ui/BrandLogo';

const QUICK_LINKS = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.project', href: '/project' },
  { labelKey: 'nav.amenities', href: '/project#amenities' },
  { labelKey: 'nav.floorPlans', href: '/project#floor-plans' },
  { labelKey: 'nav.gallery', href: '/project#gallery' },
  { labelKey: 'nav.location', href: '/project#location' },
  { labelKey: 'nav.ourStory', href: '/our-story' },
  { labelKey: 'nav.blog', href: '/blog' },
] as const;

const BADGE_KEYS = [
  'footer.badgeRera',
  'footer.badgeVda',
  'footer.badgeCredai',
] as const;

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-gold bg-bg-section text-text-primary">
      <div className="footer-cta-band relative overflow-hidden border-b border-border-gold">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(201,168,76,0.12),transparent_55%)]"
          aria-hidden
        />
        <PageContainer className="relative py-10 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                {t('footer.bookVisit')}
              </p>
              <h2 className="mt-2 font-cormorant text-2xl font-semibold leading-tight text-text-primary sm:text-3xl">
                {t('footer.seeProject')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {t('footer.seeProjectLead')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-gold to-gold-light px-6 py-3 font-inter text-sm font-semibold text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.28)]"
              >
                {t('footer.whatsappUs')}
                <ArrowRight size={16} />
              </a>
              <a
                href={`tel:${PROJECT_DATA.contactPhone}`}
                className="inline-flex items-center justify-center gap-2 border border-border-gold bg-bg-card px-6 py-3 font-inter text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
              >
                <Phone size={16} />
                {PROJECT_DATA.contactPhone}
              </a>
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <BrandLogo href="/" variant="footer" />
            <p className="mt-4 max-w-sm text-sm text-text-secondary">{PROJECT_DATA.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {BADGE_KEYS.map((key) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap border border-border-gold bg-bg-card px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wide text-text-secondary"
                >
                  <ShieldCheck size={11} className="text-gold" aria-hidden />
                  {t(key)}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {t('footer.explore')}
            </h3>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.labelKey}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-gold"
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {t('footer.registrations')}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-text-secondary">{t('common.rera')}</dt>
                <dd className="mt-0.5">
                  <a
                    href={PROJECT_DATA.reraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-gold hover:text-gold-light"
                  >
                    {PROJECT_DATA.reraNumber}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">{t('footer.authority')}</dt>
                <dd className="mt-0.5 text-text-primary">{t('common.vdaApproved')} · UP</dd>
              </div>
              <div>
                <dt className="text-text-secondary">{t('footer.membership')}</dt>
                <dd className="mt-0.5 text-text-primary">CREDAI {PROJECT_DATA.credaiText}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              {t('footer.contact')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              <li>
                <a
                  href={`tel:${PROJECT_DATA.contactPhone}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap hover:text-gold"
                >
                  <Phone size={14} className="text-gold" />
                  {PROJECT_DATA.contactPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROJECT_DATA.contactEmail}`}
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <Mail size={14} className="shrink-0 text-gold" />
                  <span className="truncate">{PROJECT_DATA.contactEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={PROJECT_DATA.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-gold"
                >
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                  <span className="line-clamp-2 text-xs">{PROJECT_DATA.location}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-nowrap items-center gap-x-3 overflow-x-auto border-t border-border-gold pt-6 text-[0.6875rem] leading-none text-text-secondary [scrollbar-width:thin]">
          <span className="shrink-0 whitespace-nowrap">
            &copy; {currentYear} Shubh Kamna Heights. {t('footer.rights')}
          </span>
          <span className="shrink-0 text-border-gold" aria-hidden>
            ·
          </span>
          <Link href="/privacy" className="shrink-0 whitespace-nowrap hover:text-gold">
            {t('footer.privacy')}
          </Link>
          <span className="shrink-0 text-border-gold" aria-hidden>
            ·
          </span>
          <Link href="/terms" className="shrink-0 whitespace-nowrap hover:text-gold">
            {t('footer.terms')}
          </Link>
          <span className="shrink-0 text-border-gold" aria-hidden>
            ·
          </span>
          <a
            href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
            className="shrink-0 whitespace-nowrap hover:text-gold"
          >
            {t('footer.support')}
          </a>
          <span className="shrink-0 text-border-gold" aria-hidden>
            ·
          </span>
          <span className="min-w-0 whitespace-nowrap">{t('footer.disclaimerText')}</span>
        </div>
      </PageContainer>
    </footer>
  );
}
