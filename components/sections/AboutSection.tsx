'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Users, Building2 } from 'lucide-react';
import { useTranslation } from '@/context/LocaleContext';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  SectionSubheading,
  GoldRule,
  SectionCopy,
  SectionHeaderCenter,
  FeatureCard,
} from '@/components/ui/design';

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < target ? prev + Math.ceil(target / 20) : target));
    }, 100);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="text-center">
      <p className="font-cormorant text-3xl font-bold text-gold sm:text-4xl">{count}+</p>
      <p className="mt-2 font-inter text-sm text-text-secondary">{label}</p>
    </div>
  );
};

export default function AboutSection() {
  const { t } = useTranslation();

  const stats = [
    { target: 1000, label: t('sections.about.statFamilies') },
    { target: 2, label: t('sections.about.statBlocks') },
    { target: 65, label: t('sections.about.statOpen') },
    { target: 20, label: t('sections.about.statAmenities') },
  ];

  const certs = [
    {
      icon: <Award size={28} />,
      label: t('sections.about.certRera'),
      detail: t('sections.about.certReraDetail'),
    },
    {
      icon: <CheckCircle size={28} />,
      label: t('sections.about.certVda'),
      detail: t('sections.about.certVdaDetail'),
    },
    {
      icon: <Users size={28} />,
      label: t('sections.about.certCredai'),
      detail: t('sections.about.certCredaiDetail'),
    },
    {
      icon: <Building2 size={28} />,
      label: t('sections.about.certIit'),
      detail: t('sections.about.certIitDetail'),
    },
  ];

  return (
    <Section tone="muted">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <SectionHeaderCenter className="mb-8 sm:mb-10">
            <SectionKicker centered>{t('sections.about.kicker')}</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">{t('sections.about.title')}</SectionHeading>
            <GoldRule className="mx-auto mt-4 sm:mt-6" />
          </SectionHeaderCenter>

          <div className="mx-auto max-w-3xl text-center">
            <SectionCopy>{t('sections.about.p1')}</SectionCopy>
            <SectionCopy className="mt-5">{t('sections.about.p2')}</SectionCopy>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:grid-cols-4 sm:gap-8">
            {stats.map((item) => (
              <Counter key={item.label} target={item.target} label={item.label} />
            ))}
          </div>

          <div className="mt-12 sm:mt-16">
            <SectionSubheading className="text-center text-text-primary">
              {t('sections.about.certsTitle')}
            </SectionSubheading>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {certs.map((cert) => (
                <FeatureCard
                  key={cert.label}
                  className="flex-col items-center justify-center text-center"
                >
                  <div className="mb-4 text-gold" aria-hidden>
                    {cert.icon}
                  </div>
                  <p className="font-inter text-sm font-semibold text-text-primary">{cert.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">{cert.detail}</p>
                </FeatureCard>
              ))}
            </div>
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
