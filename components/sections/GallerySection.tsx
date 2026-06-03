'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getGalleryImages } from '@/lib/firestore';
import { FALLBACK_GALLERY, resolveGallery } from '@/lib/fallbacks';
import MediaCover from '@/components/ui/MediaCover';
import type { GalleryImage } from '@/types';
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

export default function GallerySection() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Exterior', 'Interior', 'Amenities', 'Views'];

  useEffect(() => {
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
                (image) => selectedCategory === 'All' || image.category === selectedCategory
              )
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
              <SectionKicker>Gallery</SectionKicker>
              <SectionHeading className="mt-3 sm:mt-4">See It to Believe It</SectionHeading>
              <GoldRule className="my-4 sm:my-5" />
              <SectionLead>
                Explore exterior views, interiors, amenities, and surroundings — curated to show
                scale, finish quality, and the lived experience on site.
              </SectionLead>
            </div>

            <SegmentControl tone="dark" className="self-start lg:self-end">
              {categories.map((category) => (
                <SegmentButton
                  key={category}
                  tone="dark"
                  active={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </SegmentButton>
              ))}
            </SegmentControl>
          </SectionToolbar>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-text-secondary">Loading gallery...</div>
            </div>
          ) : (
            <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {images.map((image) => (
                <MediaCardShell
                  key={image.id}
                  className="group min-h-[13rem] sm:min-h-[15rem]"
                >
                  <MediaCover
                    src={image.imageUrl}
                    alt={image.caption}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    overlay="strong"
                    fallbackKind="gallery"
                    fallbackSeed={image.category}
                  />
                  <MediaCardBody className="min-h-[13rem] sm:min-h-[15rem]">
                    <BadgePill className="w-fit border border-gold/25 bg-[rgba(9,8,15,0.65)] text-gold backdrop-blur-sm">
                      {image.category}
                    </BadgePill>
                    <div className="min-w-0 pt-3">
                      <p className="font-cormorant text-xl leading-tight text-text-primary sm:text-2xl">
                        {image.caption}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[rgba(247,243,233,0.88)]">
                        Visual preview from the {image.category.toLowerCase()} collection.
                      </p>
                    </div>
                  </MediaCardBody>
                </MediaCardShell>
              ))}
            </div>
          )}

          <PanelDark className="mt-10 bg-[linear-gradient(135deg,rgba(201,168,76,0.1),rgba(16,15,22,1))] sm:mt-12">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/75">Visual Tour</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                  Once the final project photography, drone shots, and interiors arrive, this
                  section will carry the visual weight it is supposed to.
                </p>
              </div>
              <Button className="inline-flex shrink-0">
                View Full Gallery
                <ArrowRight size={16} />
              </Button>
            </div>
          </PanelDark>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
