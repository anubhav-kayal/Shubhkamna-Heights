'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { PROJECT_DATA } from '@/lib/constants';
import { useEnquiryModal } from '@/context/EnquiryModalContext';
import { Button, PageContainer } from '@/components/ui/design';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Overview', href: '/#overview', match: 'hash:overview' },
  { label: 'Amenities', href: '/#amenities', match: 'hash:amenities' },
  { label: 'Floor Plans', href: '/#floor-plans', match: 'hash:floor-plans' },
  { label: 'Gallery', href: '/#gallery', match: 'hash:gallery' },
  { label: 'Location', href: '/#location', match: 'hash:location' },
  { label: 'Our Story', href: '/our-story', match: 'path:/our-story' },
  { label: 'Blog', href: '/blog', match: 'path:/blog' },
] as const;

function isEditorialRoute(pathname: string) {
  return pathname === '/our-story' || pathname === '/blog' || pathname.startsWith('/blog/');
}

function isNavLinkActive(pathname: string, match: string) {
  if (match === 'path:/our-story') return pathname === '/our-story';
  if (match === 'path:/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
  return false;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled(24);
  const { isOpen: enquiryOpen, openEnquiry } = useEnquiryModal();

  const isEditorial = isEditorialRoute(pathname);
  const solidHeader = isEditorial || isScrolled || mobileMenuOpen;

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
        solidHeader && 'shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
      )}
    >
      <div
        className={cn(
          'border-b transition-colors duration-300',
          solidHeader
            ? 'border-border-gold/60 bg-bg-primary'
            : 'border-white/10 bg-bg-primary/75 backdrop-blur-md',
        )}
      >
        <PageContainer
          className={cn(
            'flex min-h-[var(--header-rera)] flex-wrap items-center justify-center',
            'gap-x-2 gap-y-0.5 py-1.5 text-center text-[9px] font-medium uppercase',
            'tracking-[0.12em] text-text-secondary sm:gap-x-4 sm:py-2 sm:text-[10px] sm:tracking-[0.16em]',
          )}
        >
          <span className="leading-tight text-gold/90">RERA: {PROJECT_DATA.reraNumber}</span>
          <span className="hidden text-border-gold sm:inline" aria-hidden>
            |
          </span>
          <span>VDA Approved</span>
          <span className="hidden text-border-gold sm:inline" aria-hidden>
            |
          </span>
          <span className="max-[380px]:hidden sm:inline">CREDAI {PROJECT_DATA.credaiText}</span>
        </PageContainer>
      </div>

      <nav
        className={cn(
          'border-b transition-colors duration-300',
          solidHeader
            ? 'border-border-gold/60 bg-bg-primary'
            : 'border-transparent bg-transparent',
          isEditorial && 'border-border-gold/60 bg-bg-primary',
        )}
      >
        <PageContainer>
          <div className="flex min-h-[var(--header-nav)] items-center justify-between gap-4">
            <Link href="/" className="flex shrink-0 items-center">
              <div className="flex flex-col leading-none">
                <span className="font-cormorant text-xl font-bold tracking-[0.06em] text-gold sm:text-[1.65rem] sm:tracking-[0.08em]">
                  SHUBH KAMNA
                </span>
                <span className="mt-1 font-inter text-[0.6rem] uppercase tracking-[0.36em] text-text-secondary sm:text-[0.68rem]">
                  HEIGHTS
                </span>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-2 md:gap-1 lg:flex xl:gap-2">
              {NAV_LINKS.map((link) => {
                const active = isNavLinkActive(pathname, link.match);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'rounded-full px-3 py-2 font-inter text-sm font-medium transition-colors xl:px-3.5',
                      active
                        ? 'bg-gold/15 text-gold'
                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden shrink-0 lg:block">
              {!enquiryOpen && (
                <Button type="button" variant="secondary" onClick={openEnquiry}>
                  Book a Visit
                  <ArrowRight size={16} />
                </Button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="shrink-0 rounded-full border border-border-gold bg-bg-card p-2.5 text-gold lg:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </PageContainer>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto border-t border-border-gold bg-bg-primary lg:hidden"
          style={{ top: 'var(--site-header-height)' }}
        >
          <PageContainer className="flex min-h-full flex-col gap-2 py-6">
            {NAV_LINKS.map((link) => {
              const active = isNavLinkActive(pathname, link.match);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'rounded-xl border px-4 py-3.5 text-base font-medium transition-colors',
                    active
                      ? 'border-gold/50 bg-gold/10 text-gold'
                      : 'border-border-gold text-text-primary hover:border-gold hover:text-gold',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button
              type="button"
              variant="primary"
              className="mt-3 w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                openEnquiry();
              }}
            >
              Book a Visit
              <ArrowRight size={16} />
            </Button>
          </PageContainer>
        </div>
      )}
    </header>
  );
}
