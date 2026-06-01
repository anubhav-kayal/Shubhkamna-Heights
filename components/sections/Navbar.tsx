'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import { PROJECT_DATA } from '@/lib/constants';
import { useCalculator } from '@/context/CalculatorContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled(80);
  const { openCalculator } = useCalculator();

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Floor Plans', href: '#floor-plans' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Blog', href: '/blog' },
  ];

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-[60]">
      <div className="border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="page-container flex min-h-[var(--header-rera)] flex-wrap items-center justify-center gap-x-2 gap-y-0.5 py-1.5 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)] sm:gap-x-4 sm:py-2 sm:text-[11px] sm:tracking-[0.18em]">
          <span className="leading-tight">RERA: {PROJECT_DATA.reraNumber}</span>
          <span className="hidden sm:inline">|</span>
          <span>VDA Approved</span>
          <span className="hidden sm:inline">|</span>
          <span className="max-[380px]:hidden sm:inline">CREDAI {PROJECT_DATA.credaiText}</span>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[var(--border)] bg-[rgba(10,10,15,0.92)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="page-container">
          <div className="flex min-h-[var(--header-nav)] items-center justify-between gap-3 sm:gap-6">
            <Link href="/" className="flex shrink-0 items-center">
              <div className="flex flex-col">
                <span className="font-cormorant text-xl font-bold tracking-[0.06em] text-[var(--gold)] sm:text-[1.75rem] sm:tracking-[0.08em]">
                  SHUBH KAMNA
                </span>
                <span className="font-inter text-[0.6rem] uppercase tracking-[0.36em] text-[var(--text-secondary)] sm:text-[0.68rem] sm:tracking-[0.42em]">
                  HEIGHTS
                </span>
              </div>
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-5 px-4 lg:flex xl:gap-7">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex">
              <button type="button" onClick={openCalculator} className="btn-secondary">
                Book a Visit
                <ArrowRight size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="rounded-full border border-[var(--border)] bg-white/5 p-2.5 text-[var(--gold)] lg:hidden"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-[rgba(10,10,15,0.97)] backdrop-blur-xl lg:hidden"
          style={{ top: 'var(--site-header-height)' }}
        >
          <div className="page-container flex min-h-full flex-col gap-3 py-6">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-[var(--border)] px-4 py-3.5 text-base font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCalculator();
              }}
              className="btn-primary mt-2"
            >
              Book a Visit
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
