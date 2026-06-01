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
      className="section-shell bg-[var(--bg-primary)]"
    >
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="section-header-center">
            <span className="section-kicker justify-center">Location</span>
            <h2 className="section-heading">
              Prime Location. Perfect Connectivity.
            </h2>
            <div className="gold-rule mx-auto mt-4 sm:mt-6" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            {/* Left - Map */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-56 overflow-hidden rounded-xl border border-[var(--gold)] sm:h-72 md:h-80 lg:h-96"
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
              <h3 className="section-subheading mb-4 text-[var(--text-primary)] sm:mb-6">
                How to Reach
              </h3>

              {LANDMARKS.map((landmark, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] p-3 transition-colors duration-300 hover:border-[var(--gold)] sm:gap-4 sm:p-4"
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
            className="mt-8 border-t border-[var(--border)] pt-8 sm:mt-12 sm:pt-10"
          >
            <div className="panel-dark rounded-xl panel-padding sm:rounded-2xl">
              <h3 className="section-subheading mb-3 text-[var(--text-primary)] sm:mb-4">
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
