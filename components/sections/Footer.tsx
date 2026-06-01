'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PROJECT_DATA, DISCLAIMER } from '@/lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <h3 className="font-cormorant text-2xl font-bold text-[var(--gold)] mb-2">
                SHUBH KAMNA
              </h3>
              <p className="font-cormorant text-sm text-[var(--text-secondary)]">HEIGHTS</p>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
              {PROJECT_DATA.tagline}
            </p>
            <p className="text-[var(--text-secondary)] text-xs">
              {PROJECT_DATA.subTagline}
            </p>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-inter font-bold text-[var(--text-primary)] mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Overview', 'Amenities', 'Floor Plans', 'Gallery', 'Location', 'Blog'].map(link => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - RERA & Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-inter font-bold text-[var(--text-primary)] mb-4">Certifications</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-[var(--text-secondary)] mb-1">RERA Registration</p>
                <a
                  href={PROJECT_DATA.reraUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors text-xs font-mono"
                >
                  {PROJECT_DATA.reraNumber}
                </a>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">VDA Approved ✓</p>
              </div>
              <div>
                <p className="text-[var(--text-secondary)]">CREDAI Member ✓</p>
              </div>
            </div>
          </motion.div>

          {/* Column 4 - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-inter font-bold text-[var(--text-primary)] mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${PROJECT_DATA.contactPhone}`}
                className="flex items-start gap-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
              >
                <Phone size={16} className="flex-shrink-0 mt-1" />
                <span>{PROJECT_DATA.contactPhone}</span>
              </a>
              <a
                href={`mailto:${PROJECT_DATA.contactEmail}`}
                className="flex items-start gap-2 text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
              >
                <Mail size={16} className="flex-shrink-0 mt-1" />
                <span className="break-all">{PROJECT_DATA.contactEmail}</span>
              </a>
              <div className="flex items-start gap-2 text-[var(--text-secondary)]">
                <MapPin size={16} className="flex-shrink-0 mt-1" />
                <span className="text-xs">{PROJECT_DATA.location}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] my-8"></div>

        {/* Disclaimer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--bg-card)] p-6 rounded-lg border border-[var(--border)] mb-8"
        >
          <h4 className="font-inter font-bold text-[var(--text-primary)] text-sm mb-3">
            Disclaimer
          </h4>
          <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
            {DISCLAIMER}
          </p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[var(--text-secondary)]">
          <p>&copy; {currentYear} Shubh Kamna Heights. All Rights Reserved.</p>
          <div className="flex gap-6">
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
