'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Expand, Landmark } from 'lucide-react';
import { getFloorPlans } from '@/lib/firestore';
import type { FloorPlan } from '@/types';

export default function FloorPlansSection() {
  const [activeTab, setActiveTab] = useState<'2BHK' | '3BHK'>('3BHK');
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFloorPlans = async () => {
      setLoading(true);
      try {
        const data = await getFloorPlans(activeTab);
        setFloorPlans(data);
      } catch (error) {
        console.error('Error loading floor plans:', error);
        // Mock data fallback
        setFloorPlans([
          {
            id: '1',
            type: activeTab,
            imageUrl: '/placeholder-floorplan.jpg',
            carpetArea: activeTab === '2BHK' ? 800 : 1200,
            superArea: activeTab === '2BHK' ? 980 : 1480,
            price: activeTab === '2BHK' ? 3200000 : 5200000,
            active: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    void loadFloorPlans();
  }, [activeTab]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="floor-plans"
      className="section-shell bg-[var(--bg-light)]"
    >
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="section-header grid-safe grid gap-5 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-8">
            <div className="min-w-0 max-w-3xl">
              <span className="section-kicker text-[var(--text-dark)]/80">Plans & Pricing</span>
              <h2 className="section-heading text-[var(--text-dark)]">
                Choose Your Perfect Home
              </h2>
              <div className="gold-rule my-4 sm:my-5" />
              <p className="section-lead text-[var(--text-dark)]/75">
                Unit plans are organized for practical family use, clear circulation, and strong
                ventilation. Compare formats first, then request the detailed inventory sheet.
              </p>
            </div>

            <div className="rounded-full border border-[rgba(26,26,26,0.12)] bg-white/80 p-1.5 shadow-[0_20px_40px_rgba(26,26,26,0.08)]">
              <div className="flex flex-wrap gap-1.5">
                {(['2BHK', '3BHK'] as const).map((bhk) => (
                  <button
                    key={bhk}
                    onClick={() => setActiveTab(bhk)}
                    className={`rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.18em] ${
                      activeTab === bhk
                        ? 'bg-[var(--gold)] text-[var(--text-dark)] shadow-[0_14px_28px_rgba(201,168,76,0.22)]'
                        : 'text-[var(--text-dark)]/70 hover:bg-[rgba(201,168,76,0.12)] hover:text-[var(--text-dark)]'
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-[var(--text-dark)] animate-pulse">Loading floor plans...</div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid-safe grid gap-5 sm:gap-6 lg:gap-8 xl:grid-cols-2"
            >
              {floorPlans.map((plan) => {
                const hasImage = Boolean(
                  plan.imageUrl && !plan.imageUrl.includes('placeholder')
                );

                return (
                <motion.div
                  key={plan.id}
                  variants={itemVariants}
                  className="min-w-0 overflow-hidden rounded-2xl border border-[rgba(26,26,26,0.1)] bg-white shadow-[0_16px_40px_rgba(23,20,12,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(23,20,12,0.12)] sm:rounded-[1.75rem]"
                >
                  <div className="grid min-w-0 lg:grid-cols-2">
                    <div className="relative min-h-[12rem] overflow-hidden border-b border-[rgba(26,26,26,0.08)] sm:min-h-[16rem] lg:min-h-[20rem] lg:border-b-0 lg:border-r">
                      {hasImage ? (
                        <div
                          role="img"
                          aria-label={`${plan.type} floor plan`}
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-[1.02]"
                          style={{ backgroundImage: `url(${plan.imageUrl})` }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.18),transparent_42%),linear-gradient(135deg,#f9f5ea,#efe6cf)]">
                          <div className="text-center text-[var(--text-dark)]">
                            <Building2 className="mx-auto mb-4 text-[var(--gold)]" size={44} />
                            <p className="text-2xl font-semibold">{plan.type}</p>
                            <p className="mt-1 text-sm uppercase tracking-[0.24em] text-[var(--text-dark)]/55">
                              Floor Plan
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col justify-between panel-padding">
                      <div>
                        <div className="mb-6 flex items-center justify-between gap-4">
                          <span className="badge-pill border border-[var(--gold)]/30 bg-[rgba(201,168,76,0.14)] text-[var(--gold)]">
                            {plan.type}
                          </span>
                          <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-dark)]/45">
                            Limited inventory
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                          <div className="stat-card border-[rgba(26,26,26,0.08)] bg-[rgba(250,248,242,0.9)]">
                            <div className="mb-3 flex items-center gap-2 text-[var(--gold)]">
                              <Expand size={16} />
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-dark)]/55">
                                Carpet Area
                              </p>
                            </div>
                            <p className="text-2xl font-semibold text-[var(--text-dark)]">
                              {plan.carpetArea}
                              <span className="ml-1 text-sm font-medium text-[var(--text-dark)]/55">
                                sq ft
                              </span>
                            </p>
                          </div>

                          <div className="stat-card border-[rgba(26,26,26,0.08)] bg-[rgba(250,248,242,0.9)]">
                            <div className="mb-3 flex items-center gap-2 text-[var(--gold)]">
                              <Landmark size={16} />
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-dark)]/55">
                                Super Area
                              </p>
                            </div>
                            <p className="text-2xl font-semibold text-[var(--text-dark)]">
                              {plan.superArea}
                              <span className="ml-1 text-sm font-medium text-[var(--text-dark)]/55">
                                sq ft
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 rounded-[1.5rem] border border-[rgba(26,26,26,0.08)] bg-[var(--text-dark)] px-5 py-4">
                          <p className="text-xs uppercase tracking-[0.22em] text-[var(--gold)]/70">
                            Starting From
                          </p>
                          <p className="mt-2 font-cormorant text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl lg:text-4xl">
                            ₹{(plan.price / 100000).toFixed(2)}L
                          </p>
                          <p className="mt-2 text-sm text-[rgba(247,243,233,0.72)]">
                            Final value depends on floor, facing, and current pricing slab.
                          </p>
                        </div>
                      </div>

                      <div className="btn-row mt-6 sm:mt-8">
                        <button type="button" className="btn-primary">
                          Get Full Details
                          <ArrowRight size={16} />
                        </button>
                        <button className="btn-ghost border-[rgba(26,26,26,0.14)] text-[var(--text-dark)] hover:border-[var(--gold)] hover:text-[var(--text-dark)]">
                          Request Cost Sheet
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 overflow-hidden rounded-2xl border border-[rgba(26,26,26,0.1)] bg-white shadow-[0_16px_40px_rgba(23,20,12,0.07)] sm:mt-12 lg:mt-16 sm:rounded-[1.75rem]"
          >
            <div className="grid gap-6 panel-padding lg:grid-cols-[1fr_0.8fr] lg:items-center lg:gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]/75">
                  Master Site Plan
                </p>
                <h3 className="section-subheading mt-3 text-[var(--text-dark)]">
                  Understand the full layout before narrowing down the tower and unit.
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-dark)]/68">
                  The site plan helps clarify entry sequence, open space distribution, block
                  relationships, amenity access, and where each residence sits in the overall
                  scheme.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-dashed border-[rgba(26,26,26,0.16)] bg-[linear-gradient(135deg,rgba(201,168,76,0.12),rgba(255,255,255,0.92))] p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(201,168,76,0.16)] text-[var(--gold)]">
                  <Building2 size={26} />
                </div>
                <p className="text-sm leading-7 text-[var(--text-dark)]/68">
                  Comprehensive site layout with residential blocks, driveways, open greens, and
                  amenity zones.
                </p>
                <button className="btn-secondary mt-6 inline-flex items-center gap-2">
                  View Site Plan
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
