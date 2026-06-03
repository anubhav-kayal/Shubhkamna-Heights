'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { getSpecifications } from '@/lib/firestore';
import { resolveSpecifications } from '@/lib/fallbacks';
import type { Specification } from '@/types';
import { cn } from '@/lib/cn';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  GoldRule,
  SectionHeaderCenter,
} from '@/components/ui/design';

export default function SpecificationsSection() {
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>('STRUCTURE');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSpecs = async () => {
      try {
        const data = await getSpecifications();
        const resolved = resolveSpecifications(data);
        setSpecifications(resolved);
        setExpandedCategory(resolved[0]?.category ?? null);
      } catch (error) {
        console.error('Error loading specifications:', error);
        const resolved = resolveSpecifications([]);
        setSpecifications(resolved);
        setExpandedCategory(resolved[0]?.category ?? null);
      } finally {
        setLoading(false);
      }
    };

    void loadSpecs();
  }, []);

  return (
    <Section tone="light">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <SectionHeaderCenter className="mb-10 sm:mb-14">
            <SectionKicker centered>Specifications</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">Premium Specifications</SectionHeading>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-on-light sm:text-base sm:leading-7">
              Materials, finishes, and systems chosen for durability, comfort, and long-term
              value — documented clearly for your purchase decision.
            </p>
            <GoldRule className="mx-auto mt-5 sm:mt-6" />
          </SectionHeaderCenter>

          {loading ? (
            <p className="py-12 text-center text-sm text-muted-on-light">Loading specifications…</p>
          ) : (
            <div className="space-y-3" role="region" aria-label="Project specifications">
              {specifications.map((spec) => {
                const isOpen = expandedCategory === spec.category;
                const panelId = `spec-panel-${spec.id}`;

                return (
                  <div
                    key={spec.id}
                    className="overflow-hidden rounded-xl border border-border-on-light bg-white"
                  >
                    <button
                      type="button"
                      id={`spec-trigger-${spec.id}`}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setExpandedCategory(isOpen ? null : spec.category)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="font-inter text-sm font-semibold uppercase tracking-[0.12em] text-text-dark sm:text-base">
                        {spec.category}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-gold-dark transition-transform duration-200',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden
                      >
                        <ChevronDown size={22} strokeWidth={2} />
                      </span>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={`spec-trigger-${spec.id}`}
                      hidden={!isOpen}
                      className="border-t border-border-on-light"
                    >
                      <div className="px-5 py-4 sm:px-6 sm:pb-6">
                        <ul className="divide-y divide-border-on-light">
                          {spec.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                            >
                              <span className="text-sm font-medium text-text-dark">
                                {item.label}
                              </span>
                              <span className="text-sm leading-relaxed text-muted-on-light sm:max-w-[55%] sm:text-right">
                                {item.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </PageContainer>
    </Section>
  );
}
