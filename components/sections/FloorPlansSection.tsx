'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Expand, Landmark } from 'lucide-react';
import { getFloorPlans } from '@/lib/firestore';
import { resolveFloorPlans } from '@/lib/fallbacks';
import { PROJECT_DATA } from '@/lib/constants';
import { DISCOUNTED_PRICE_PER_SQFT } from '@/lib/flat-pricing';
import MediaCover from '@/components/ui/MediaCover';
import CostSheetModal from '@/components/ui/CostSheetModal';
import type { FloorPlan } from '@/types';
import { useTranslation } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';
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

const primaryLinkClassName =
  'inline-flex w-full items-center justify-center gap-2 border border-gold/50 bg-gradient-to-br from-gold to-gold-light px-5 py-3 font-inter text-sm font-semibold text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)] sm:w-auto';

export default function FloorPlansSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'2BHK' | '3BHK'>('3BHK');
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [costSheetOpen, setCostSheetOpen] = useState(false);

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
              <SectionKicker>{t('sections.floorPlans.kicker')}</SectionKicker>
              <SectionHeading className="mt-3 sm:mt-4">{t('sections.floorPlans.title')}</SectionHeading>
              <GoldRule className="my-4 sm:my-5" />
              <SectionLead className="text-muted-on-light">{t('sections.floorPlans.lead')}</SectionLead>
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
            <p className="py-12 text-center text-sm text-muted-on-light">
              {t('sections.floorPlans.loading')}
            </p>
          ) : floorPlans.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-inter text-base font-semibold text-text-dark">
                {t('sections.floorPlans.comingSoon', { type: activeTab })}
              </p>
              <p className="mt-2 text-sm text-muted-on-light">
                {t('sections.floorPlans.comingSoonLead', { type: activeTab })}
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
                        alt={plan.unitLabel ?? `${plan.type} floor plan`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        overlay="none"
                        fallbackKind="floorPlan"
                        fallbackSeed={plan.id}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col gap-6 p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <BadgePill className="border border-gold/35 bg-gold/15 text-gold-dark">
                          {plan.unitLabel ?? plan.type}
                        </BadgePill>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-on-light">
                          {t('sections.floorPlans.limited')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className=" border border-border-on-light bg-bg-light p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-on-light">
                            <Expand size={16} aria-hidden className="text-gold-dark" />
                            <span>{t('sections.floorPlans.saleable')}</span>
                          </div>
                          <p className="mt-2 font-cormorant text-2xl font-semibold text-text-dark">
                            {plan.superArea.toLocaleString('en-IN')}
                            <span className="ml-1 font-inter text-sm font-medium text-muted-on-light">
                              {t('sections.floorPlans.sqFt')}
                            </span>
                          </p>
                        </div>
                        <div className=" border border-border-on-light bg-bg-light p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-on-light">
                            <Landmark size={16} aria-hidden className="text-gold-dark" />
                            <span>{t('sections.floorPlans.offerRate')}</span>
                          </div>
                          <p className="mt-2 font-cormorant text-2xl font-semibold text-text-dark">
                            ₹{DISCOUNTED_PRICE_PER_SQFT.toLocaleString('en-IN')}
                            <span className="ml-1 font-inter text-sm font-medium text-muted-on-light">
                              {t('sections.floorPlans.perSqFt')}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-on-light">
                          {t('sections.floorPlans.startingFrom')}
                        </p>
                        <p className="mt-1 font-cormorant text-3xl font-semibold text-gold-dark sm:text-4xl">
                          ₹{(plan.price / 100000).toFixed(2)}L
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-on-light">
                          {t('sections.floorPlans.priceNote')}
                        </p>
                      </div>

                      <BtnRow className="flex-col sm:flex-row">
                        <a
                          href={PROJECT_DATA.sitePlanPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={primaryLinkClassName}
                        >
                          {t('sections.floorPlans.getDetails')}
                          <ArrowRight size={16} />
                        </a>
                        <Button
                          type="button"
                          variant="secondary"
                          className="w-full sm:w-auto"
                          onClick={() => setCostSheetOpen(true)}
                        >
                          {t('sections.floorPlans.costSheet')}
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
                <KickerLight>{t('sections.floorPlans.sitePlanKicker')}</KickerLight>
                <HeadingLight className="mt-3">{t('sections.floorPlans.sitePlanTitle')}</HeadingLight>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-on-light">
                  {t('sections.floorPlans.sitePlanLead')}
                </p>
              </div>

              <div className=" border border-border-on-light bg-bg-light/80 p-6 text-center sm:p-8">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-gold/20 text-gold-dark">
                  <Building2 size={26} />
                </div>
                <p className="text-sm leading-7 text-muted-on-light">
                  Comprehensive site layout with residential blocks, driveways, open greens, and
                  amenity zones.
                </p>
                <a
                  href={PROJECT_DATA.sitePlanPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(primaryLinkClassName, 'mt-6')}
                >
                  {t('sections.floorPlans.viewSitePlan')}
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </LightCard>
        </motion.div>
      </PageContainer>

      <CostSheetModal
        isOpen={costSheetOpen}
        bhkType={activeTab}
        onClose={() => setCostSheetOpen(false)}
      />
    </Section>
  );
}
