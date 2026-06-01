'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LANDMARKS, PROJECT_DATA } from '@/lib/constants';

export default function LocationSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="location"
      className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
              Prime Location. Perfect Connectivity.
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto"></div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Map */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg overflow-hidden border border-[var(--gold)] h-96"
            >
              <iframe
                src="https://maps.google.com/maps?q=PDDU+Nagar+Chandauli+UP&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            {/* Right - Landmarks */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] mb-6">
                How to Reach
              </h3>

              {LANDMARKS.map((landmark, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-4 p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg hover:border-[var(--gold)] transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--gold)]/20 rounded-full flex items-center justify-center border border-[var(--gold)]/50">
                    <MapPin size={20} className="text-[var(--gold)]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--gold)] font-bold text-sm">{landmark.distance} KM</p>
                    <p className="text-[var(--text-primary)] font-inter text-sm">{landmark.name}</p>
                    <p className="text-[var(--text-secondary)] text-xs mt-1">{landmark.category}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-12 border-t border-[var(--border)]"
          >
            <div className="bg-[var(--bg-card)] p-8 rounded-lg border border-[var(--gold)] border-opacity-50">
              <h3 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] mb-4">
                Project Address
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {PROJECT_DATA.fullAddress}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${PROJECT_DATA.contactPhone}`}
                  className="px-6 py-2 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300 text-center"
                >
                  Call: {PROJECT_DATA.contactPhone}
                </a>
                <a
                  href={`mailto:${PROJECT_DATA.contactEmail}`}
                  className="px-6 py-2 border border-[var(--gold)] text-[var(--gold)] rounded-lg font-inter font-semibold hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300 text-center"
                >
                  Email: {PROJECT_DATA.contactEmail}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
