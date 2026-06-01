'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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

  return (
    <>
      {/* RERA Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[var(--bg-card)] border-b border-[var(--border)] text-center py-2 text-xs text-[var(--text-secondary)]">
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <span>RERA: {PROJECT_DATA.reraNumber}</span>
          <span className="hidden sm:inline">|</span>
          <span>VDA Approved</span>
          <span className="hidden sm:inline">|</span>
          <span>CREDAI {PROJECT_DATA.credaiText}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 pt-8 ${
          isScrolled
            ? 'bg-[var(--bg-card)] border-b border-[var(--gold)] shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex flex-col">
                <span className="font-cormorant text-2xl font-bold text-[var(--gold)]">
                  SHUBH KAMNA
                </span>
                <span className="font-cormorant text-sm text-[var(--text-primary)]">
                  HEIGHTS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-inter text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={openCalculator}
                className="px-6 py-2 border border-[var(--gold)] text-[var(--gold)] rounded-full hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-200 font-inter text-sm font-medium"
              >
                Book a Visit
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[var(--gold)]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-20 bg-[var(--bg-primary)] bg-opacity-95 z-40">
            <div className="flex flex-col items-center justify-center h-screen gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors font-inter text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCalculator();
                }}
                className="px-8 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-full font-inter font-medium mt-4"
              >
                Book a Visit
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
