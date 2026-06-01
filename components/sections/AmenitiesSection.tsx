'use client';

import React, { useState, useEffect } from 'react';
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
import { AMENITIES_LIST } from '@/lib/constants';
import type { Amenity } from '@/types';

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Swimming Pool': <Waves size={24} />,
  'Gymnasium': <Dumbbell size={24} />,
  'Clubhouse': <Users size={24} />,
  'Amphitheatre': <Music size={24} />,
  'Basketball Court': <Target size={24} />,
  'Badminton Court': <Award size={24} />,
  'Indoor Game Zone': <Gamepad2 size={24} />,
  'Banquet Hall': <Coffee size={24} />,
  'Children Playing Zone': <Smile size={24} />,
  'Yoga & Meditation Park': <Leaf size={24} />,
  'Temple Area': <Building2 size={24} />,
  'Nana Nani Park': <Trees size={24} />,
  'Gazebo Seating': <Sparkles size={24} />,
  'Jogging Track': <Zap size={24} />,
  'Water Body with Bridge': <Waves size={24} />,
  'Commercial Plaza': <ShoppingCart size={24} />,
  'Kids Play Zone': <Clapperboard size={24} />,
  'Performance Stage': <Mic2 size={24} />,
  'Activity Park': <Package size={24} />,
  '24/7 Security': <Shield size={24} />,
};

export default function AmenitiesSection() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAmenities = async () => {
      try {
        const data = await getAmenities();
        if (data && data.length > 0) {
          setAmenities(data);
        } else {
          setAmenities(
            AMENITIES_LIST.map((name, idx) => ({
              id: `amenity-${idx}`,
              title: name,
              description: `Experience our world-class ${name.toLowerCase()}`,
              iconName: name,
              order: idx,
            }))
          );
        }
      } catch (error) {
        console.error('Error loading amenities:', error);
        setAmenities(
          AMENITIES_LIST.map((name, idx) => ({
            id: `amenity-${idx}`,
            title: name,
            description: `Experience our world-class ${name.toLowerCase()}`,
            iconName: name,
            order: idx,
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    loadAmenities();
  }, []);

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

  const featured = amenities.slice(0, 3);
  const grid = amenities.slice(3);

  return (
    <section id="amenities" className="section-shell bg-[var(--bg-section)]">
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="section-header grid-safe grid gap-6 lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-end lg:gap-8">
            <div className="min-w-0">
              <span className="section-kicker">Lifestyle</span>
              <h2 className="section-heading text-[var(--text-primary)]">
                Unmatched Lifestyle
              </h2>
              <div className="gold-rule my-4 sm:my-5" />
              <p className="section-lead">
                Club amenities, green breathing spaces, active recreation, and calm corners are
                arranged to make the project feel inhabited, not just occupied.
              </p>
            </div>
            <div className="panel-dark min-w-0 rounded-2xl panel-padding">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]/80">
                Community Focus
              </p>
              <p className="section-lead !mt-3 !max-w-none">
                From fitness and leisure to family gathering spaces, the amenity mix is designed
                for daily use instead of brochure filler.
              </p>
            </div>
          </div>

          {!loading && featured.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid-safe mb-8 grid grid-cols-1 gap-4 sm:mb-10 sm:gap-5 md:grid-cols-2 lg:mb-12 lg:grid-cols-3 lg:gap-6"
            >
              {featured.map((amenity) => {
                const hasImage = Boolean(
                  amenity.imageUrl && !amenity.imageUrl.includes('placeholder')
                );

                return (
                  <motion.article
                    key={amenity.id}
                    variants={itemVariants}
                    className="group relative flex min-h-[16rem] min-w-0 flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] sm:min-h-[18rem] sm:rounded-[1.75rem]"
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-[1.75rem]">
                      {hasImage ? (
                        <div
                          role="img"
                          aria-label={amenity.title}
                          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${amenity.imageUrl})` }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.28),transparent_42%),linear-gradient(135deg,rgba(33,32,42,0.98),rgba(16,15,22,1))]">
                          <div className="text-[var(--gold)]/25 transition-transform duration-500 group-hover:scale-110">
                            {AMENITY_ICONS[amenity.title] || <Users size={56} />}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,8,15,0.96)] via-[rgba(9,8,15,0.5)] to-[rgba(9,8,15,0.15)]" />
                    </div>

                    <div className="relative flex min-h-[16rem] flex-1 flex-col justify-between p-5 sm:min-h-[18rem] sm:p-6 lg:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="badge-pill shrink border border-[var(--gold)]/25 bg-[rgba(9,8,15,0.7)] text-[var(--gold)] backdrop-blur-sm">
                          Featured
                        </span>
                        <div className="shrink-0 text-[var(--gold)]">
                          {AMENITY_ICONS[amenity.title] || <Users size={26} />}
                        </div>
                      </div>
                      <div className="min-w-0 pt-4">
                        <h3 className="font-cormorant text-2xl font-semibold leading-tight text-[var(--text-primary)] text-balance sm:text-3xl">
                          {amenity.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[rgba(247,243,233,0.85)]">
                          {amenity.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}

          {!loading && grid.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid-safe grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5"
            >
              {grid.map(amenity => (
                <motion.div
                  key={amenity.id}
                  variants={itemVariants}
                  className="panel-dark group flex min-h-[9.5rem] min-w-0 flex-col gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--gold)]/50 sm:min-h-[10.5rem] sm:rounded-2xl sm:p-5"
                >
                  <div className="inline-flex w-fit rounded-xl border border-[var(--gold)]/15 bg-[rgba(201,168,76,0.08)] p-2.5 text-[var(--gold)]">
                    {AMENITY_ICONS[amenity.title] || <Users size={22} />}
                  </div>
                  <p className="font-inter text-xs font-semibold uppercase leading-snug tracking-[0.1em] text-[var(--text-primary)] text-balance sm:text-[0.8125rem] sm:tracking-[0.12em]">
                    {amenity.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-pulse text-[var(--text-secondary)]">Loading amenities...</div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 min-w-0 rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,rgba(201,168,76,0.12),rgba(17,16,24,0.98))] panel-padding sm:mt-12 sm:rounded-[1.75rem]"
          >
            <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]/80">
                  Experience On Site
                </p>
                <h3 className="section-subheading mt-3 text-[var(--text-primary)]">
                  Walk through the spaces before you make the decision.
                </h3>
                <p className="section-lead !max-w-none">
                  A site visit will show the scale, circulation, green cover, and amenity planning
                  far better than a brochure grid can.
                </p>
              </div>
              <button type="button" className="btn-primary shrink-0 lg:min-w-[12rem]">
                Schedule a Visit
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
