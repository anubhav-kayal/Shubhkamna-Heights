'use client';

import Link from 'next/link';
import { PROJECT_DATA, DISCLAIMER } from '@/lib/constants';
import { ArrowRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { PageContainer } from '@/components/ui/design';

const QUICK_LINKS = [
  { label: 'Overview', href: '/#overview' },
  { label: 'Amenities', href: '/#amenities' },
  { label: 'Floor Plans', href: '/#floor-plans' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Location', href: '/#location' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary text-text-primary">
      <div className="relative overflow-hidden border-b border-border-gold">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(201,168,76,0.14),transparent_55%)]"
          aria-hidden
        />
        <PageContainer className="relative py-12 sm:py-14 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <p className="font-inter text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                Book a visit
              </p>
              <h2 className="mt-3 font-cormorant text-3xl font-semibold leading-tight text-text-primary sm:text-4xl">
                See the project in person
              </h2>
              <p className="mt-4 text-sm leading-7 text-text-secondary">
                Walk the site, review plans with our team, and get clear answers on pricing,
                approvals, and possession timelines.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-6 py-3.5 font-inter text-sm font-semibold text-text-dark shadow-[0_10px_28px_rgba(201,168,76,0.3)] transition-shadow hover:shadow-[0_14px_36px_rgba(201,168,76,0.4)]"
              >
                WhatsApp us
                <ArrowRight size={16} />
              </a>
              <a
                href={`tel:${PROJECT_DATA.contactPhone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-gold px-6 py-3.5 font-inter text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
              >
                <Phone size={16} />
                {PROJECT_DATA.contactPhone}
              </a>
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <p className="font-cormorant text-3xl font-semibold uppercase tracking-[0.08em] text-gold">
                SHUBH KAMNA
              </p>
              <p className="mt-1 font-inter text-xs uppercase tracking-[0.38em] text-text-secondary">
                Heights
              </p>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-text-secondary">
              {PROJECT_DATA.tagline}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.16em] text-gold/80">
              {PROJECT_DATA.subTagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['RERA Registered', 'VDA Approved', 'CREDAI Member'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border-gold bg-bg-card/80 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-text-secondary"
                >
                  <ShieldCheck size={12} className="text-gold" aria-hidden />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Registrations
            </h3>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-text-secondary">RERA</dt>
                <dd className="mt-1">
                  <a
                    href={PROJECT_DATA.reraUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-gold transition-colors hover:text-gold-light"
                  >
                    {PROJECT_DATA.reraNumber}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-text-secondary">Authority</dt>
                <dd className="mt-1 text-text-primary">VDA Approved · Uttar Pradesh</dd>
              </div>
              <div>
                <dt className="text-text-secondary">Membership</dt>
                <dd className="mt-1 text-text-primary">CREDAI {PROJECT_DATA.credaiText}</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${PROJECT_DATA.contactPhone}`}
                  className="flex items-start gap-3 text-text-secondary transition-colors hover:text-gold"
                >
                  <Phone size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>{PROJECT_DATA.contactPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROJECT_DATA.contactEmail}`}
                  className="flex items-start gap-3 text-text-secondary transition-colors hover:text-gold"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span className="break-all">{PROJECT_DATA.contactEmail}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span className="text-xs leading-relaxed">{PROJECT_DATA.fullAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border-gold pt-8 text-sm text-text-secondary sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Shubh Kamna Heights. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            <Link href="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              Terms of Service
            </Link>
            <a
              href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
              className="transition-colors hover:text-gold"
            >
              Contact Support
            </a>
          </nav>
        </div>

        <p className="mt-6 text-[0.625rem] leading-relaxed text-text-secondary/55 sm:mt-8">
          {DISCLAIMER}
        </p>
      </PageContainer>
    </footer>
  );
}
