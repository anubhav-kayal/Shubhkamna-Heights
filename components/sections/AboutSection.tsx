'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Users, Building2 } from 'lucide-react';
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
            <SectionKicker centered>About</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">Built on Trust. Standing on Excellence.</SectionHeading>
            <GoldRule className="mx-auto mt-4 sm:mt-6" />
          </SectionHeaderCenter>

          <div className="mx-auto max-w-3xl text-center">
            <SectionCopy>
              Shubh Kamna Heights is built by a team of developers with decades of experience in
              the real estate sector. We believe in creating not just buildings, but communities
              that resonate with the spiritual and natural essence of their surroundings.
            </SectionCopy>
            <SectionCopy className="mt-5">
              Located in Chandauli, where the spiritual heritage of Varanasi meets the natural
              beauty of the surrounding regions, our project embodies the perfect balance of
              tradition and modernity. Every detail is crafted with care, ensuring that our
              residents live in homes that are as beautiful as they are functional.
            </SectionCopy>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:grid-cols-4 sm:gap-8">
            {[
              { target: 1000, label: 'Families' },
              { target: 2, label: 'Active Blocks' },
              { target: 65, label: '% Open Space' },
              { target: 20, label: 'Amenities' },
            ].map((item) => (
              <Counter key={item.label} target={item.target} label={item.label} />
            ))}
          </div>

          <div className="mt-12 sm:mt-16">
            <SectionSubheading className="text-center text-text-primary">
              Certifications & Memberships
            </SectionSubheading>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {[
                {
                  icon: <Award size={28} />,
                  label: 'RERA Registered',
                  detail: 'UPRERAPRJ757815/04/2025',
                },
                {
                  icon: <CheckCircle size={28} />,
                  label: 'VDA Approved',
                  detail: 'By Uttar Pradesh Government',
                },
                {
                  icon: <Users size={28} />,
                  label: 'CREDAI Member',
                  detail: 'CREDAI Purvanchal + PREA',
                },
                {
                  icon: <Building2 size={28} />,
                  label: 'IIT BHU Vetted',
                  detail: 'Earthquake Resistant Structure',
                },
              ].map((cert) => (
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
