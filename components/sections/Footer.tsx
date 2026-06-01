'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PROJECT_DATA, DISCLAIMER } from '@/lib/constants';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Floor Plans', href: '#floor-plans' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Location', href: '#location' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="page-container py-10 sm:py-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(201,168,76,0.12),rgba(14,13,20,0.95))] panel-padding sm:mb-10 sm:rounded-[1.75rem]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]/70">
                Book A Visit
              </p>
              <h3 className="mt-3 font-cormorant text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
                See the scale, light, and site planning in person.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                If the project is going to sell trust, the footer should close with a direct path
                to contact, schedule, and verify.
              </p>
            </div>
            <a
              href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
              className="btn-primary inline-flex items-center gap-2"
            >
              Talk on WhatsApp
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="mb-8 grid gap-4 sm:mb-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="panel-dark rounded-xl panel-padding sm:rounded-[1.75rem]"
          >
            <div className="mb-4">
              <p className="font-cormorant text-3xl font-semibold uppercase tracking-[0.08em] text-[var(--gold)]">
                SHUBH KAMNA
              </p>
              <p className="text-sm uppercase tracking-[0.36em] text-[var(--text-secondary)]">
                Heights
              </p>
            </div>
            <p className="text-sm leading-7 text-[var(--text-secondary)]">
              {PROJECT_DATA.tagline}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[var(--gold)]/75">
              {PROJECT_DATA.subTagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="panel-dark rounded-xl panel-padding sm:rounded-[1.75rem]"
          >
            <h4 className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)]">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]/70" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="panel-dark rounded-xl panel-padding sm:rounded-[1.75rem]"
          >
            <h4 className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)]">
              Certifications
            </h4>
            <div className="space-y-3 text-sm">
              <div className="mt-5">
                <p className="mb-1 text-[var(--text-secondary)]">RERA Registration</p>
                <a
                  href={PROJECT_DATA.reraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
                >
                  {PROJECT_DATA.reraNumber}
                </a>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-[rgba(247,243,233,0.02)] p-4">
                <p className="text-[var(--text-secondary)]">VDA Approved ✓</p>
                <p className="mt-1 text-[var(--text-secondary)]">CREDAI Member ✓</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="panel-dark rounded-xl panel-padding sm:rounded-[1.75rem]"
          >
            <h4 className="font-inter text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-primary)]">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${PROJECT_DATA.contactPhone}`}
                className="mt-5 flex items-start gap-3 text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
              >
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>{PROJECT_DATA.contactPhone}</span>
              </a>
              <a
                href={`mailto:${PROJECT_DATA.contactEmail}`}
                className="flex items-start gap-3 text-[var(--text-secondary)] transition-colors hover:text-[var(--gold)]"
              >
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span className="break-all">{PROJECT_DATA.contactEmail}</span>
              </a>
              <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-xs">{PROJECT_DATA.location}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4 sm:mb-8 sm:rounded-[1.75rem] sm:p-6"
        >
          <h4 className="mb-3 font-inter text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-primary)]">
            Disclaimer
          </h4>
          <p className="text-xs leading-7 text-[var(--text-secondary)]">
            {DISCLAIMER}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-sm text-[var(--text-secondary)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Shubh Kamna Heights. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-[var(--gold)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--gold)] transition-colors">
              Terms of Service
            </Link>
            <a
              href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
              className="hover:text-[var(--gold)] transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
