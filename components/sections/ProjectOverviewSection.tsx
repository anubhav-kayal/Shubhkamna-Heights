'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section id="overview" className="section-shell bg-[var(--bg-primary)]">
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="section-header max-w-3xl">
            <div className="section-kicker">Project Overview</div>
            <h2 className="section-heading">A Landmark in Chandauli</h2>
            <div className="gold-rule mt-4 sm:mt-6" />
          </div>

          <div className="grid-safe grid gap-6 lg:grid-cols-2 lg:gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className="panel-dark min-w-0 rounded-2xl panel-padding sm:rounded-[1.75rem]"
            >
              <p className="section-copy">
                Shubh Kamna Heights stands as a beacon of modern living in the spiritual city of
                Varanasi. Built at the confluence of Varanasi&apos;s rich spiritual heritage and
                Chandauli&apos;s natural beauty, our project offers more than just homes. It offers
                a lifestyle steeped in tradition and comfort.
              </p>
              <p className="section-copy mt-4 sm:mt-5">
                Located on 8-lane NH-2, the project enjoys seamless connectivity while maintaining the serenity
                of its surroundings. With {PROJECT_DATA.totalFamilies}+ planned families, over {PROJECT_DATA.openSpace}% open space,
                and world-class amenities, Shubh Kamna Heights redefines residential excellence in Uttar Pradesh.
              </p>

              <motion.div
                variants={containerVariants}
                className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4"
              >
                {[
                  { label: 'PDDU Nagar, Chandauli', value: 'Prime Location' },
                  { label: `${PROJECT_DATA.totalFamilies}+ Families`, value: 'Integrated Community' },
                  { label: '2BHK & 3BHK', value: 'Unit Types' },
                  { label: `${PROJECT_DATA.openSpace}%+ Open Space`, value: 'Green Living' },
                ].map((stat, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="stat-card">
                    <p className="stat-card__label">{stat.label}</p>
                    <p className="stat-card__meta">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className="panel-dark min-w-0 rounded-2xl panel-padding sm:rounded-[1.75rem]"
            >
              <div className="section-kicker">Highlights</div>
              <h3 className="section-subheading text-[var(--text-primary)]">
                Key Features
              </h3>

              <motion.div
                variants={containerVariants}
                className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4"
              >
                {KEY_FEATURES.slice(0, 8).map((feature, idx) => (
                  <motion.div key={idx} variants={itemVariants} className="feature-card">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-[var(--gold)]" aria-hidden>
                        ✓
                      </span>
                      <span className="feature-card__text">{feature}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <button type="button" className="btn-ghost mt-6 sm:mt-8">
                View All Features ({KEY_FEATURES.length})
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="mt-8 min-w-0 rounded-2xl border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] panel-padding sm:mt-12 lg:mt-14 sm:rounded-[1.75rem]"
          >
            <div className="border-b border-[var(--border)] pb-5 sm:pb-6">
              <div className="section-kicker">Connectivity</div>
              <h3 className="section-subheading text-[var(--text-primary)]">
                Strategic Location &amp; Connectivity
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
            >
              {LANDMARKS.map((landmark, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="stat-card bg-[var(--bg-card)] transition-colors hover:border-[var(--gold)]"
                >
                  <p className="text-lg font-bold leading-none text-[var(--gold)]">
                    {landmark.distance} KM
                  </p>
                  <p className="stat-card__label mt-3 !text-[var(--text-primary)] !font-medium">
                    {landmark.name}
                  </p>
                  <p className="stat-card__meta">{landmark.category}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
