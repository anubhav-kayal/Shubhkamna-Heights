'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Users, Building2 } from 'lucide-react';

const Counter = ({ target, label }: { target: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev < target ? prev + Math.ceil(target / 20) : target));
    }, 100);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="text-center">
      <p className="font-cormorant text-3xl sm:text-4xl font-bold text-[var(--gold)]">
        {count}+
      </p>
      <p className="text-[var(--text-secondary)] text-sm mt-2">{label}</p>
    </div>
  );
};

export default function AboutSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="section-shell bg-[var(--bg-light)]">
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="section-header-center">
            <span className="section-kicker text-[var(--text-dark)]/70 justify-center">About</span>
            <h2 className="section-heading text-[var(--text-dark)]">
              Built on Trust. Standing on Excellence.
            </h2>
            <div className="gold-rule mx-auto mt-4 sm:mt-6" />
          </div>

          {/* Developer Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="panel-dark mb-8 rounded-xl panel-padding sm:mb-10 sm:rounded-2xl"
          >
            <p className="section-copy mb-4 text-[var(--text-dark)]">
              Shubh Kamna Heights is built by a team of developers with decades of experience in the real estate sector.
              We believe in creating not just buildings, but communities that resonate with the spiritual and natural essence of their surroundings.
            </p>
            <p className="section-copy text-[var(--text-secondary)]">
              Located in Chandauli, where the spiritual heritage of Varanasi meets the natural beauty of the surrounding regions,
              our project embodies the perfect balance of tradition and modernity. Every detail is crafted with care,
              ensuring that our residents live in homes that are as beautiful as they are functional.
            </p>
          </motion.div>

          {/* Trust Counters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="mb-10 grid grid-cols-2 gap-4 border-y border-[var(--border)] py-8 sm:mb-12 sm:gap-6 sm:py-10 md:grid-cols-4"
          >
            {[
              { target: 1000, label: 'Families' },
              { target: 2, label: 'Active Blocks' },
              { target: 65, label: '% Open Space' },
              { target: 20, label: 'Amenities' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <Counter target={item.target} label={item.label} />
              </motion.div>
            ))}
          </motion.div>

          {/* Badges & Associations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-cormorant text-2xl font-bold text-[var(--text-dark)] text-center mb-8">
              Certifications & Memberships
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Award size={32} />,
                  label: 'RERA Registered',
                  detail: 'UPRERAPRJ757815/04/2025',
                },
                {
                  icon: <CheckCircle size={32} />,
                  label: 'VDA Approved',
                  detail: 'By Uttar Pradesh Government',
                },
                {
                  icon: <Users size={32} />,
                  label: 'CREDAI Member',
                  detail: 'CREDAI Purvanchal + PREA',
                },
                {
                  icon: <Building2 size={32} />,
                  label: 'IIT BHU Vetted',
                  detail: 'Earthquake Resistant Structure',
                },
              ].map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-[var(--bg-primary)] p-6 rounded-lg border border-[var(--border)] hover:border-[var(--gold)] transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-3 text-[var(--gold)]">{cert.icon}</div>
                  <p className="font-inter font-bold text-[var(--text-dark)] mb-1">{cert.label}</p>
                  <p className="text-[var(--text-secondary)] text-xs">{cert.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
