'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { PROJECT_DATA } from '@/lib/constants';
import { useEnquiryModal } from '@/context/EnquiryModalContext';
import { useTranslation } from '@/context/LocaleContext';
import ThemeLocaleControls, { ThemeLocaleControlsMobile } from '@/components/ui/ThemeLocaleControls';
import { PageContainer } from '@/components/ui/design';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { labelKey: 'nav.home', href: '/', match: 'path:/' },
  { labelKey: 'nav.project', href: '/project', match: 'path:/project' },
  { labelKey: 'nav.ourStory', href: '/our-story', match: 'path:/our-story' },
  { labelKey: 'nav.blog', href: '/blog', match: 'path:/blog' },
] as const;

function isNavLinkActive(pathname: string, match: string) {
  if (match === 'path:/') return pathname === '/';
  if (match === 'path:/project') return pathname === '/project';
  if (match === 'path:/our-story') return pathname === '/our-story';
  if (match === 'path:/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
  return false;
}

function useSolidHeader(pathname: string, isScrolled: boolean, mobileMenuOpen: boolean) {
  const isHome = pathname === '/';
  if (mobileMenuOpen) return true;
  if (!isHome) return true;
  return isScrolled;
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled(24);
  const { openEnquiry } = useEnquiryModal();
  const isHome = pathname === '/';
  const solidHeader = useSolidHeader(pathname, isScrolled, mobileMenuOpen);

  useEffect(() => {
    if (
      document.body.dataset.calculatorOpen === 'true' ||
      document.body.dataset.enquiryOpen === 'true'
    ) {
      return;
    }
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      if (
        document.body.dataset.calculatorOpen !== 'true' &&
        document.body.dataset.enquiryOpen !== 'true'
      ) {
        document.body.style.overflow = '';
      }
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[60] transition-[box-shadow,background] duration-300',
        solidHeader && 'shadow-[0_4px_24px_rgba(26,26,36,0.06)]',
      )}
    >
      <div
        className={cn(
          'border-b transition-colors duration-300',
          solidHeader
            ? 'border-border-gold/50 bg-bg-primary'
            : 'border-transparent bg-[var(--theme-header-blur-bg)] backdrop-blur-md',
        )}
      >
        <PageContainer
          className={cn(
            'flex min-h-[var(--header-rera)] flex-wrap items-center justify-center',
            'gap-x-2 gap-y-0.5 py-1.5 text-center text-[9px] font-medium uppercase',
            'tracking-[0.12em] text-text-secondary sm:gap-x-4 sm:py-2 sm:text-[10px] sm:tracking-[0.16em]',
            !solidHeader && isHome && 'text-text-dark/70',
          )}
        >
          <span className={cn('leading-tight', solidHeader || !isHome ? 'text-gold/90' : 'text-gold-dark')}>
            {t('common.rera')}: {PROJECT_DATA.reraNumber}
          </span>
          <span className="hidden text-border-gold sm:inline" aria-hidden>
            |
          </span>
          <span>{t('common.vdaApproved')}</span>
          <span className="hidden text-border-gold sm:inline" aria-hidden>
            |
          </span>
          <span className="max-[380px]:hidden sm:inline">CREDAI {PROJECT_DATA.credaiText}</span>
        </PageContainer>
      </div>

      <nav
        className={cn(
          'border-b transition-colors duration-300',
          solidHeader ? 'border-border-gold/50 bg-bg-primary' : 'border-transparent bg-transparent',
        )}
      >
        <PageContainer>
          <div className="flex min-h-[var(--header-nav)] items-center justify-between gap-3">
            <Link href="/" className="flex shrink-0 items-center">
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    'font-cormorant text-lg font-bold tracking-[0.06em] lg:text-xl xl:text-[1.65rem] xl:tracking-[0.08em]',
                    solidHeader || !isHome ? 'text-gold' : 'text-gold-dark',
                  )}
                >
                  SHUBH KAMNA
                </span>
                <span
                  className={cn(
                    'mt-1 font-inter text-[0.55rem] uppercase tracking-[0.32em] lg:text-[0.6rem] xl:text-[0.68rem] xl:tracking-[0.36em]',
                    solidHeader || !isHome ? 'text-text-secondary' : 'text-text-dark/60',
                  )}
                >
                  HEIGHTS
                </span>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-1 overflow-x-auto md:flex md:gap-2 lg:[scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {NAV_LINKS.map((link) => {
                const active = isNavLinkActive(pathname, link.match);
                return (
                  <Link
                    key={link.labelKey}
                    href={link.href}
                    className={cn(
                      'shrink-0 whitespace-nowrap px-3 py-2 font-inter text-xs font-semibold uppercase tracking-[0.14em] transition-colors xl:text-[0.8125rem]',
                      active
                        ? 'text-gold-dark'
                        : solidHeader || !isHome
                          ? 'text-text-secondary hover:text-gold'
                          : 'text-text-dark/75 hover:text-gold-dark',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>

            <div className="hidden shrink-0 items-center gap-2 md:flex xl:gap-3">
              <ThemeLocaleControls className="gap-1.5 xl:gap-2" />
              <button
                type="button"
                onClick={openEnquiry}
                className={cn(
                  'shrink-0 whitespace-nowrap border px-4 py-2 font-inter text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
                  solidHeader || !isHome
                    ? 'border-gold/50 text-gold hover:border-gold hover:bg-gold/10'
                    : 'border-gold-dark/50 text-gold-dark hover:border-gold-dark hover:bg-gold/5',
                )}
              >
                {t('nav.enquire')}
              </button>
            </div>

            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <ThemeLocaleControls />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                className={cn(
                  ' border p-2.5',
                  solidHeader || !isHome
                    ? 'border-border-gold bg-bg-card text-gold'
                    : 'border-gold-dark/40 bg-white/80 text-gold-dark',
                )}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </PageContainer>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto border-t border-border-gold bg-bg-primary md:hidden"
          style={{ top: 'var(--site-header-height)' }}
        >
          <PageContainer className="flex min-h-full flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(pathname, link.match);
              return (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    ' px-4 py-3.5 font-inter text-sm font-semibold uppercase tracking-[0.12em] transition-colors',
                    active ? 'text-gold' : 'text-text-primary hover:text-gold',
                  )}
                >
                  {t(link.labelKey)}
                </Link>
              );
            })}
            <ThemeLocaleControlsMobile />
          </PageContainer>
        </div>
      )}
    </header>
  );
}
