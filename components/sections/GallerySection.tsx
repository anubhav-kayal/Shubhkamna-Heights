'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getGalleryImages } from '@/lib/firestore';
import { FALLBACK_GALLERY, resolveGallery } from '@/lib/fallbacks';
import { useTranslation } from '@/context/LocaleContext';
import MediaCover from '@/components/ui/MediaCover';
import type { GalleryImage } from '@/types';

type Props = {
  initialData?: GalleryImage[];
};
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
  BadgePill,
  Button,
  MediaCardShell,
  MediaCardBody,
  PanelDark,
} from '@/components/ui/design';

const CATEGORIES = ['All', 'Exterior', 'Interior', 'Amenities', 'Views'] as const;

const CATEGORY_KEYS: Record<(typeof CATEGORIES)[number], string> = {
  All: 'sections.gallery.catAll',
  Exterior: 'sections.gallery.catExterior',
  Interior: 'sections.gallery.catInterior',
  Amenities: 'sections.gallery.catAmenities',
  Views: 'sections.gallery.catViews',
};

function categoryLabel(category: string, t: (key: string) => string) {
  const key = CATEGORY_KEYS[category as (typeof CATEGORIES)[number]];
  return key ? t(key) : category;
}

export default function GallerySection({ initialData }: Props) {
  const { t } = useTranslation();
  const [images, setImages] = useState<GalleryImage[]>(initialData ?? []);
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [loading, setLoading] = useState(!initialData);
  const hasInitial = useRef(!!initialData);

  useEffect(() => {
    if (hasInitial.current && selectedCategory === 'All') {
      hasInitial.current = false;
      return;
    }

    const loadGallery = async () => {
      setLoading(true);
      try {
        const data = await getGalleryImages(selectedCategory === 'All' ? undefined : selectedCategory);
        const resolved = resolveGallery(data);
        const filtered =
          selectedCategory === 'All'
            ? resolved
            : resolved.filter((image) => image.category === selectedCategory);
        setImages(
          filtered.length > 0
            ? filtered
            : FALLBACK_GALLERY.filter(
                (image) => selectedCategory === 'All' || image.category === selectedCategory,
              ),
        );
      } catch (error) {
        console.error('Error loading gallery:', error);
        setImages(resolveGallery([]));
      } finally {
        setLoading(false);
      }
    };

    void loadGallery();
  }, [selectedCategory]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <Section id="gallery" tone="dark">
      <PageContainer>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <SectionToolbar>
            <div className="min-w-0">
              <SectionKicker>{t('sections.gallery.kicker')}</SectionKicker>
              <SectionHeading className="mt-3 sm:mt-4">{t('sections.gallery.title')}</SectionHeading>
              <GoldRule className="my-4 sm:my-5" />
              <SectionLead>{t('sections.gallery.lead')}</SectionLead>
            </div>

            <SegmentControl tone="dark" className="w-full min-w-[min(100%,20rem)] lg:max-w-md lg:justify-self-end">
              {CATEGORIES.map((category) => (
                <SegmentButton
                  key={category}
                  tone="dark"
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {t(CATEGORY_KEYS[category])}
                </SegmentButton>
              ))}
            </SegmentControl>
          </SectionToolbar>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-text-secondary">{t('sections.gallery.loading')}</div>
            </div>
          ) : (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {images.map((image) => (
                <MediaCardShell key={image.id} className="group min-h-[13rem] sm:min-h-[15rem]">
                  <MediaCover
                    src={image.imageUrl}
                    alt={image.caption}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    overlay="strong"
                    fallbackKind="gallery"
                    fallbackSeed={image.category}
                  />
                  <MediaCardBody className="media-image-caption min-h-[13rem] sm:min-h-[15rem]">
                    <BadgePill className="w-fit border border-gold/25 bg-bg-card/80 text-gold backdrop-blur-sm">
                      {categoryLabel(image.category, t)}
                    </BadgePill>
                    <div className="min-w-0 pt-3">
                      <p className="font-cormorant text-xl leading-tight text-text-primary sm:text-2xl">
                        {image.caption}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {t('sections.gallery.preview', {
                          category: categoryLabel(image.category, t),
                        })}
                      </p>
                    </div>
                  </MediaCardBody>
                </MediaCardShell>
              ))}
            </div>
          )}

          <PanelDark className="mt-10 bg-[linear-gradient(135deg,rgba(201,168,76,0.1),var(--theme-bg-card))] sm:mt-12">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/75">
                  {t('sections.gallery.tourKicker')}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                  {t('sections.gallery.tourLead')}
                </p>
              </div>
              <Button className="inline-flex shrink-0">
                {t('sections.gallery.viewFull')}
                <ArrowRight size={16} />
              </Button>
            </div>
          </PanelDark>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
