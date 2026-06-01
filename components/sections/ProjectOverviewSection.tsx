'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PROJECT_DATA, LANDMARKS, KEY_FEATURES } from '@/lib/constants';

export default function ProjectOverviewSection() {
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
      id="overview"
      className="relative py-20 sm:py-32 bg-[var(--bg-primary)] overflow-hidden"
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
              A Landmark in Chandauli
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto"></div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Description */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className="space-y-6"
            >
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Shubh Kamna Heights stands as a beacon of modern living in the spiritual city of
                Varanasi. Built at the confluence of Varanasi&apos;s rich spiritual heritage and
                Chandauli&apos;s natural beauty, our project offers more than just homes. It offers
                a lifestyle steeped in tradition and comfort.
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Located on 8-lane NH-2, the project enjoys seamless connectivity while maintaining the serenity
                of its surroundings. With {PROJECT_DATA.totalFamilies}+ planned families, over {PROJECT_DATA.openSpace}% open space,
                and world-class amenities, Shubh Kamna Heights redefines residential excellence in Uttar Pradesh.
              </p>

              {/* Stats Grid */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                {[
                  { label: 'PDDU Nagar, Chandauli', value: 'Prime Location' },
                  { label: `${PROJECT_DATA.totalFamilies}+ Families`, value: 'Integrated Community' },
                  { label: '2BHK & 3BHK', value: 'Unit Types' },
                  { label: `${PROJECT_DATA.openSpace}%+ Open Space`, value: 'Green Living' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-[var(--bg-card)] p-4 rounded-lg border border-[var(--border)]"
                  >
                    <p className="text-[var(--gold)] font-bold text-sm mb-1">{stat.label}</p>
                    <p className="text-[var(--text-secondary)] text-xs">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Key Features Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className="space-y-4"
            >
              <h3 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] mb-6">
                Key Features
              </h3>

              <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
                {KEY_FEATURES.slice(0, 8).map((feature, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[var(--gold)] mt-1 flex-shrink-0">✓</span>
                    <span className="text-[var(--text-secondary)] text-sm">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <button className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors mt-4 font-inter font-medium">
                View All Features ({KEY_FEATURES.length}) ↓
              </button>
            </motion.div>
          </div>

          {/* Landmarks Distance Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="mt-20 pt-12 border-t border-[var(--border)]"
          >
            <h3 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
              Strategic Location & Connectivity
            </h3>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {LANDMARKS.map((landmark, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-[var(--bg-card)] p-4 rounded-lg border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
                >
                  <p className="text-[var(--gold)] font-bold text-sm mb-1">{landmark.distance} KM</p>
                  <p className="text-[var(--text-secondary)] text-xs line-clamp-2">{landmark.name}</p>
                  <p className="text-[var(--text-secondary)] text-xs opacity-60 mt-1">{landmark.category}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
