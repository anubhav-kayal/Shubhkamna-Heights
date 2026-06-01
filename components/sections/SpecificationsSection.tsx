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
    <section className="relative py-20 sm:py-32 bg-[var(--bg-light)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-dark)] mb-4">
              Premium Specifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto"></div>
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
                    className="w-full flex items-center justify-between p-6 bg-[var(--bg-card)] hover:bg-[var(--bg-section)] transition-colors duration-300"
                  >
                    <span className="font-cormorant text-lg font-bold text-[var(--text-dark)]">
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
                      className="bg-[var(--bg-primary)] p-6"
                    >
                      <div className="space-y-3">
                        {spec.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-start border-b border-[var(--border)] pb-3 last:border-0"
                          >
                            <span className="text-[var(--text-secondary)] font-inter text-sm">
                              {item.label}
                            </span>
                            <span className="text-[var(--text-dark)] font-inter font-semibold text-sm text-right ml-4">
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
