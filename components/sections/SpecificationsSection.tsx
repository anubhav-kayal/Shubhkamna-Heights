'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getSpecifications } from '@/lib/firestore';
import type { Specification } from '@/types';

const MOCK_SPECIFICATIONS: Specification[] = [
  {
    id: '1',
    category: 'STRUCTURE',
    items: [
      { label: 'Steel', value: 'Tata, JSW & Jindal' },
      { label: 'Cement', value: 'Branded cement' },
      { label: 'R.C.C.', value: 'In-house RMC plant' },
      { label: 'Frame', value: 'Earthquake resistant, vetted by IIT BHU' },
    ],
    order: 1,
  },
  {
    id: '2',
    category: 'FLOORING',
    items: [
      { label: 'Living & Dining', value: '4×2 Glazed Vitrified Tiles' },
      { label: 'Master Bedroom', value: '4×2 Glazed Vitrified Tiles' },
      { label: 'Kitchen', value: 'Ceramic Tiles' },
      { label: 'Toilet', value: 'Anti Skid Ceramic Tiles' },
    ],
    order: 2,
  },
  {
    id: '3',
    category: 'ELECTRICAL',
    items: [
      { label: 'Supply', value: '3-Phase with concealed wiring' },
      { label: 'Bedrooms', value: 'AC wiring with AC point' },
      { label: 'Kitchen', value: 'Multiple power points + Geyser point' },
    ],
    order: 3,
  },
];

export default function SpecificationsSection() {
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecs = async () => {
      try {
        const data = await getSpecifications();
        if (data && data.length > 0) {
          setSpecifications(data);
        } else {
          setSpecifications(MOCK_SPECIFICATIONS);
        }
      } catch (error) {
        console.error('Error loading specifications:', error);
        setSpecifications(MOCK_SPECIFICATIONS);
      } finally {
        setLoading(false);
      }
    };

    loadSpecs();
  }, []);

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
            <span className="section-kicker text-[var(--text-dark)]/70 justify-center">Specifications</span>
            <h2 className="section-heading text-[var(--text-dark)]">
              Premium Specifications
            </h2>
            <div className="gold-rule mx-auto mt-4 sm:mt-6" />
          </div>

          {/* Specifications Accordion */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-[var(--text-dark)] animate-pulse">Loading specifications...</div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-3">
              {specifications.map(spec => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="border border-[var(--border)] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedCategory(expandedCategory === spec.category ? null : spec.category)
                    }
                    className="flex w-full items-center justify-between gap-4 bg-[var(--bg-card)] px-4 py-4 text-left transition-colors duration-300 hover:bg-[var(--bg-section)] sm:px-5 sm:py-5"
                  >
                    <span className="font-cormorant text-base font-bold text-[var(--text-dark)] text-balance sm:text-lg">
                      {spec.category}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[var(--gold)] transition-transform duration-300 ${
                        expandedCategory === spec.category ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedCategory === spec.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[var(--bg-primary)] px-4 py-5 sm:px-5 sm:py-6"
                    >
                      <div className="space-y-3">
                        {spec.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-start border-b border-[var(--border)] pb-3 last:border-0"
                          >
                            <span className="min-w-0 flex-1 font-inter text-sm text-[var(--text-secondary)]">
                              {item.label}
                            </span>
                            <span className="ml-4 max-w-[55%] shrink-0 text-right font-inter text-sm font-semibold text-[var(--text-dark)]">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
