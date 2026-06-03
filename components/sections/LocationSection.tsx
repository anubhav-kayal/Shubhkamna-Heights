'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LANDMARKS, PROJECT_DATA } from '@/lib/constants';
import { cn } from '@/lib/cn';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  SectionSubheading,
  GoldRule,
  SectionHeaderCenter,
  PanelDark,
  BtnRow,
} from '@/components/ui/design';

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
    <Section id="location" tone="dark">
      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <SectionHeaderCenter className="mb-10 sm:mb-14">
            <SectionKicker centered>Location</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">
              Prime Location. Perfect Connectivity.
            </SectionHeading>
            <GoldRule className="mx-auto mt-4 sm:mt-6" />
          </SectionHeaderCenter>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="min-h-[280px] overflow-hidden rounded-2xl border border-border-gold sm:min-h-[360px] lg:min-h-[420px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=PDDU+Nagar+Chandauli+UP&output=embed"
                width="100%"
                height="100%"
                className="h-full min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[420px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shubh Kamna Heights location map"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionSubheading className="mb-6 text-text-primary">How to Reach</SectionSubheading>

              <div className="flex flex-col gap-4">
                {LANDMARKS.map((landmark, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 rounded-2xl border border-border-gold bg-black/15 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                      <MapPin size={18} className="text-gold" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="font-inter text-sm font-bold text-gold">
                        {landmark.distance} KM
                      </p>
                      <p className="mt-0.5 font-inter text-sm font-medium text-text-primary">
                        {landmark.name}
                      </p>
                      <p className="mt-1 font-inter text-xs text-text-secondary">
                        {landmark.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 lg:mt-14"
          >
            <PanelDark>
              <SectionSubheading className="mb-4 text-text-primary">Project Address</SectionSubheading>
              <p className="text-sm leading-relaxed text-text-secondary">
                {PROJECT_DATA.fullAddress}
              </p>
              <BtnRow className="mt-8">
                <a
                  href={`tel:${PROJECT_DATA.contactPhone}`}
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-inter text-sm font-semibold transition-all duration-200 sm:w-auto',
                    'border border-gold/50 bg-gradient-to-br from-gold to-gold-light text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)]',
                  )}
                >
                  Call: {PROJECT_DATA.contactPhone}
                </a>
                <a
                  href={`mailto:${PROJECT_DATA.contactEmail}`}
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-inter text-sm font-semibold transition-all duration-200 sm:w-auto',
                    'border border-border-gold text-gold hover:border-gold hover:bg-gold/10',
                  )}
                >
                  Email: {PROJECT_DATA.contactEmail}
                </a>
              </BtnRow>
            </PanelDark>
          </motion.div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
