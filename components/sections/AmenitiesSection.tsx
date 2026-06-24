'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Waves,
  Dumbbell,
  Users,
  Music,
  Target,
  Award,
  Gamepad2,
  Coffee,
  Smile,
  Leaf,
  Building2,
  Sparkles,
  Zap,
  Trees,
  ShoppingCart,
  Clapperboard,
  Mic2,
  Package,
  Shield,
} from 'lucide-react';
import { getAmenities } from '@/lib/firestore';
import { resolveAmenities } from '@/lib/fallbacks';
import MediaCover from '@/components/ui/MediaCover';
import { PROJECT_DATA } from '@/lib/constants';
import { useTranslation } from '@/context/LocaleContext';
import { useEnquiryModal } from '@/context/EnquiryModalContext';
import type { Amenity } from '@/types';
import { cn } from '@/lib/cn';
import {
  Section,
  PageContainer,
  SectionKicker,
  SectionHeading,
  SectionLead,
  GoldRule,
  Button,
} from '@/components/ui/design';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Swimming Pool': <Waves size={22} />,
  'Gymnasium': <Dumbbell size={22} />,
  'Clubhouse': <Users size={22} />,
  'Amphitheatre': <Music size={22} />,
  'Basketball Court': <Target size={22} />,
  'Badminton Court': <Award size={22} />,
  'Indoor Game Zone': <Gamepad2 size={22} />,
  'Banquet Hall': <Coffee size={22} />,
  'Children Playing Zone': <Smile size={22} />,
  'Yoga & Meditation Park': <Leaf size={22} />,
  'Temple Area': <Building2 size={22} />,
  'Nana Nani Park': <Trees size={22} />,
  'Gazebo Seating': <Sparkles size={22} />,
  'Jogging Track': <Zap size={22} />,
  'Water Body with Bridge': <Waves size={22} />,
  'Commercial Plaza': <ShoppingCart size={22} />,
  'Kids Play Zone': <Clapperboard size={22} />,
  'Performance Stage': <Mic2 size={22} />,
  'Activity Park': <Package size={22} />,
  '24/7 Security': <Shield size={22} />,
};

function amenityDescription(text: string | undefined) {
  if (!text) return null;
  if (text.toLowerCase().startsWith('experience our')) return null;
  return text;
}

function FeaturedAmenityCard({
  amenity,
  className,
  priority = false,
  spotlight = false,
}: {
  amenity: Amenity;
  className?: string;
  priority?: boolean;
  spotlight?: boolean;
}) {
  const desc = amenityDescription(amenity.description);

  return (
    <article
      className={cn(
        'group relative min-h-[14rem] overflow-hidden transition-[box-shadow,ring-color] duration-500 sm:min-h-[18rem] sm:',
        spotlight &&
          'z-10 ring-2 ring-gold shadow-[0_0_0_1px_rgba(201,168,76,0.35),0_16px_40px_rgba(201,168,76,0.18)]',
        !spotlight && 'ring-1 ring-transparent',
        className,
      )}
    >
      <MediaCover
        src={amenity.imageUrl ?? ''}
        alt={amenity.title}
        sizes="(max-width: 1024px) 100vw, 50vw"
        overlay="strong"
        fallbackKind="amenity"
        fallbackSeed={amenity.title}
        priority={priority}
      />
      <div className="media-caption-gradient pointer-events-none absolute inset-0" aria-hidden />
      <div className="media-image-caption absolute inset-x-0 bottom-0 z-[1] p-5 sm:p-7">
        <span className="inline-flex items-center gap-2 text-gold" aria-hidden>
          {AMENITY_ICONS[amenity.title] || <Users size={20} />}
        </span>
        <h3 className="mt-3 font-cormorant text-2xl font-semibold leading-tight text-text-primary sm:text-[1.65rem]">
          {amenity.title}
        </h3>
        {desc && (
          <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-text-secondary">
            {desc}
          </p>
        )}
      </div>
    </article>
  );
}

function AmenityTile({ amenity }: { amenity: Amenity }) {
  return (
    <article className="group overflow-hidden border border-border-gold/70 bg-bg-card transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/50">
      <div className="relative aspect-[5/4] overflow-hidden">
        <MediaCover
          src={amenity.imageUrl ?? ''}
          alt={amenity.title}
          sizes="(max-width: 640px) 50vw, 15vw"
          overlay="card"
          fallbackKind="amenity"
          fallbackSeed={amenity.title}
        />
      </div>
      <div className="flex items-center gap-3 border-t border-border-gold/50 px-3.5 py-3.5 sm:px-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border-gold bg-bg-section text-gold">
          {AMENITY_ICONS[amenity.title] || <Users size={18} />}
        </span>
        <p className="min-w-0 font-inter text-sm font-medium leading-snug text-text-primary">
          {amenity.title}
        </p>
      </div>
    </article>
  );
}

const SPOTLIGHT_INTERVAL_MS = 2000;

export default function AmenitiesSection() {
  const { t } = useTranslation();
  const { openEnquiry } = useEnquiryModal();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    const loadAmenities = async () => {
      try {
        const data = await getAmenities();
        setAmenities(resolveAmenities(data));
      } catch (error) {
        console.error('Error loading amenities:', error);
        setAmenities(resolveAmenities([]));
      } finally {
        setLoading(false);
      }
    };

    void loadAmenities();
  }, []);

  const featured = amenities.slice(0, 3);

  useEffect(() => {
    if (featured.length < 2) return;
    const timer = window.setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % featured.length);
    }, SPOTLIGHT_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [featured.length]);

  const spotlightOrder = featured.map(
    (_, i) => featured[(spotlightIndex + i) % featured.length]!,
  );
  const hero = spotlightOrder[0];
  const secondary = spotlightOrder.slice(1);
  const grid = amenities.slice(3);

  const handleVisitClick = () => {
    openEnquiry();
  };

  return (
    <Section id="amenities" tone="muted" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(201,168,76,0.03)_50%,transparent_100%)]"
        aria-hidden
      />

      <PageContainer className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <SectionKicker>{t('sections.amenities.kicker')}</SectionKicker>
            <SectionHeading className="mt-4">{t('sections.amenities.title')}</SectionHeading>
            <GoldRule className="mt-6" />
            <SectionLead className="mt-6">{t('sections.amenities.lead')}</SectionLead>
          </div>
          <p className="max-w-xs font-inter text-sm leading-relaxed text-text-secondary lg:text-right">
            <span className="font-cormorant text-4xl font-semibold text-gold">
              {amenities.length || '20'}
            </span>
            <span className="mt-1 block">{t('sections.amenities.touchpoints')}</span>
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-text-secondary">{t('sections.amenities.loading')}</p>
          </div>
        )}

        {!loading && hero && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="mt-12 lg:mt-16"
          >
            <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2 lg:gap-5">
              <motion.div
                key={hero.id}
                layout
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-7 lg:row-span-2"
              >
                <FeaturedAmenityCard
                  amenity={hero}
                  priority
                  spotlight
                  className="h-full min-h-[14rem] lg:min-h-[22rem]"
                />
              </motion.div>
              {secondary.map((amenity, i) => (
                <motion.div
                  key={amenity.id}
                  layout
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={cn('lg:col-span-5', i === 0 ? 'lg:row-start-1' : 'lg:row-start-2')}
                >
                  <FeaturedAmenityCard amenity={amenity} className="h-full" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!loading && grid.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 lg:mt-14"
          >
            <p className="mb-6 font-inter text-xs font-semibold uppercase tracking-[0.22em] text-gold/90">
              {t('sections.amenities.roster')}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {grid.map((amenity) => (
                <AmenityTile key={amenity.id} amenity={amenity} />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border-gold pt-10 sm:flex-row sm:items-center lg:mt-20 lg:pt-12"
        >
          <div>
            <p className="font-cormorant text-xl font-semibold text-text-primary sm:text-2xl">
              {t('sections.amenities.visitTitle')}
            </p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
              {t('sections.amenities.visitLead', { location: PROJECT_DATA.location })}
            </p>
          </div>
          <Button type="button" onClick={handleVisitClick} className="shrink-0">
            {t('sections.amenities.scheduleVisit')}
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
