'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
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
          // Use hardcoded list if Firestore is empty
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
        // Fallback to hardcoded list
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
    <section
      id="amenities"
      className="relative py-20 sm:py-32 bg-[var(--bg-section)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
              Unmatched Lifestyle
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Unparalleled Amenities for Modern Living
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto mt-6"></div>
          </div>

          {/* Featured Amenities - Large Cards */}
          {!loading && featured.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-3 gap-6 mb-16"
            >
              {featured.map((amenity) => (
                <motion.div
                  key={amenity.id}
                  variants={itemVariants}
                  className="group relative h-64 rounded-lg overflow-hidden cursor-pointer"
                >
                  {/* Placeholder image background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-primary)] flex items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.05))`,
                    }}
                  >
                    <div className="text-[var(--gold)] opacity-30 text-6xl">
                      {AMENITY_ICONS[amenity.title] || <Users size={48} />}
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent group-hover:from-[var(--bg-primary)] group-hover:to-transparent transition-all duration-300"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="text-[var(--gold)] group-hover:scale-110 transition-transform duration-300">
                      {AMENITY_ICONS[amenity.title] || <Users size={32} />}
                    </div>
                    <div>
                      <h3 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors mb-2">
                        {amenity.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--text-primary)] transition-colors">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Amenities Grid */}
          {!loading && grid.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {grid.map(amenity => (
                <motion.div
                  key={amenity.id}
                  variants={itemVariants}
                  className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--gold)] transition-all duration-300 group cursor-pointer text-center"
                >
                  <div className="flex justify-center mb-3 text-[var(--gold)] group-hover:scale-110 transition-transform duration-300">
                    {AMENITY_ICONS[amenity.title] || <Users size={28} />}
                  </div>
                  <p className="font-inter text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors">
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

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16 pt-12 border-t border-[var(--border)]"
          >
            <p className="text-[var(--text-secondary)] mb-6">
              Experience the perfect blend of leisure and luxury
            </p>
            <button className="px-8 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300">
              Schedule a Visit Today
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
