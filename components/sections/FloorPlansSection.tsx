'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Expand, Landmark } from 'lucide-react';
import { getFloorPlans } from '@/lib/firestore';
import { resolveFloorPlans } from '@/lib/fallbacks';
import MediaCover from '@/components/ui/MediaCover';
import type { FloorPlan } from '@/types';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  GoldRule,
  SectionLead,
  SectionToolbar,
  SegmentControl,
  SegmentButton,
  LightCard,
  BadgePill,
  KickerLight,
  HeadingLight,
  Button,
  BtnRow,
} from '@/components/ui/design';

export default function FloorPlansSection() {
  const [activeTab, setActiveTab] = useState<'2BHK' | '3BHK'>('3BHK');
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFloorPlans = async () => {
      setLoading(true);
      try {
        const data = await getFloorPlans(activeTab);
        setFloorPlans(resolveFloorPlans(data, activeTab));
      } catch (error) {
        console.error('Error loading floor plans:', error);
        setFloorPlans(resolveFloorPlans([], activeTab));
      } finally {
        setLoading(false);
      }
    };

    void loadFloorPlans();
  }, [activeTab]);

  return (
    <Section id="floor-plans" tone="light">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <SectionToolbar>
            <div className="min-w-0">
              <SectionKicker>Plans & Pricing</SectionKicker>
              <SectionHeading className="mt-3 sm:mt-4">Choose Your Perfect Home</SectionHeading>
              <GoldRule className="my-4 sm:my-5" />
              <SectionLead className="text-muted-on-light">
                Unit plans are organized for practical family use, clear circulation, and strong
                ventilation. Compare formats first, then request the detailed inventory sheet.
              </SectionLead>
            </div>

            <SegmentControl className="flex w-full sm:inline-flex sm:w-auto">
              {(['2BHK', '3BHK'] as const).map((bhk) => (
                <SegmentButton
                  key={bhk}
                  active={activeTab === bhk}
                  onClick={() => setActiveTab(bhk)}
                  className="flex-1 sm:flex-none"
                >
                  {bhk}
                </SegmentButton>
              ))}
            </SegmentControl>
          </SectionToolbar>

          {loading ? (
            <p className="py-12 text-center text-sm text-muted-on-light">Loading floor plans…</p>
          ) : floorPlans.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-inter text-base font-semibold text-text-dark">
                {activeTab} plans coming soon
              </p>
              <p className="mt-2 text-sm text-muted-on-light">
                Contact us for the latest inventory and pricing for {activeTab} homes.
              </p>
            </div>
          ) : (
            <div className="grid min-w-0 gap-6 sm:gap-8">
              {floorPlans.map((plan) => (
                <LightCard key={`${plan.id}-${plan.type}`} className="overflow-hidden">
                  <div className="grid min-w-0 gap-0 lg:grid-cols-2">
                    <div className="relative min-h-[240px] lg:min-h-[320px]">
                      <MediaCover
                        src={plan.imageUrl}
                        alt={`${plan.type} floor plan`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        overlay="none"
                        fallbackKind="floorPlan"
                        fallbackSeed={plan.type}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-6 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <BadgePill className="border border-gold/35 bg-gold/15 text-gold-dark">
                          {plan.type}
                        </BadgePill>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-on-light">
                          Limited inventory
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl border border-border-on-light bg-bg-light p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-on-light">
                            <Expand size={16} aria-hidden className="text-gold-dark" />
                            <span>Carpet Area</span>
                          </div>
                          <p className="mt-2 font-cormorant text-2xl font-semibold text-text-dark">
                            {plan.carpetArea}
                            <span className="ml-1 font-inter text-sm font-medium text-muted-on-light">
                              sq ft
                            </span>
                          </p>
                        </div>
                        <div className="rounded-xl border border-border-on-light bg-bg-light p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-on-light">
                            <Landmark size={16} aria-hidden className="text-gold-dark" />
                            <span>Super Area</span>
                          </div>
                          <p className="mt-2 font-cormorant text-2xl font-semibold text-text-dark">
                            {plan.superArea}
                            <span className="ml-1 font-inter text-sm font-medium text-muted-on-light">
                              sq ft
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-on-light">
                          Starting From
                        </p>
                        <p className="mt-1 font-cormorant text-3xl font-semibold text-gold-dark sm:text-4xl">
                          ₹{(plan.price / 100000).toFixed(2)}L
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-on-light">
                          Final value depends on floor, facing, and current pricing slab.
                        </p>
                      </div>

                      <BtnRow className="flex-col sm:flex-row">
                        <Button variant="primary" className="w-full sm:w-auto">
                          Get Full Details
                          <ArrowRight size={16} />
                        </Button>
                        <Button variant="secondary" className="w-full sm:w-auto">
                          Request Cost Sheet
                        </Button>
                      </BtnRow>
                    </div>
                  </div>
                </LightCard>
              ))}
            </div>
          )}

          <LightCard className="mt-10 overflow-hidden sm:mt-14">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
              <div>
                <KickerLight>Master Site Plan</KickerLight>
                <HeadingLight className="mt-3">
                  Understand the full layout before narrowing down the tower and unit.
                </HeadingLight>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-on-light">
                  The site plan helps clarify entry sequence, open space distribution, block
                  relationships, amenity access, and where each residence sits in the overall
                  scheme.
                </p>
              </div>

              <div className="rounded-2xl border border-border-on-light bg-bg-light/80 p-6 text-center sm:p-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/20 text-gold-dark">
                  <Building2 size={26} />
                </div>
                <p className="text-sm leading-7 text-muted-on-light">
                  Comprehensive site layout with residential blocks, driveways, open greens, and
                  amenity zones.
                </p>
                <Button variant="primary" className="mt-6">
                  View Site Plan
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </LightCard>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
