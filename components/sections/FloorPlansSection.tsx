'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      className="relative py-20 sm:py-32 bg-[var(--bg-light)] overflow-hidden"
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
            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-dark)] mb-4">
              Choose Your Perfect Home
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto"></div>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-4 mb-12">
            {(['2BHK', '3BHK'] as const).map(bhk => (
              <button
                key={bhk}
                onClick={() => setActiveTab(bhk)}
                className={`px-8 py-3 font-inter font-semibold rounded-lg transition-all duration-300 ${
                  activeTab === bhk
                    ? 'bg-[var(--gold)] text-[var(--text-dark)]'
                    : 'border-2 border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--text-dark)]'
                }`}
              >
                {bhk}
              </button>
            ))}
          </div>

          {/* Floor Plan Cards */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-[var(--text-dark)] animate-pulse">Loading floor plans...</div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              {floorPlans.map(plan => (
                <motion.div
                  key={plan.id}
                  variants={itemVariants}
                  className="bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--gold)] group hover:shadow-lg hover:shadow-[var(--gold)]/20 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-[var(--gold)]/20 to-[var(--gold)]/5 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <div className="text-center text-[var(--text-dark)]">
                      <p className="text-2xl font-bold">{plan.type}</p>
                      <p className="text-sm text-[var(--text-dark)]/60">Floor Plan</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-[var(--gold)]/20 text-[var(--gold)] text-sm font-medium rounded-full border border-[var(--gold)]">
                        {plan.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-[var(--border)]">
                      <div>
                        <p className="text-xs text-[var(--text-secondary)] uppercase mb-1">Carpet Area</p>
                        <p className="text-lg font-bold text-[var(--text-dark)]">{plan.carpetArea} sq ft</p>
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-secondary)] uppercase mb-1">Super Area</p>
                        <p className="text-lg font-bold text-[var(--text-dark)]">{plan.superArea} sq ft</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-[var(--text-secondary)] uppercase mb-1">Starting From</p>
                      <p className="text-2xl font-bold text-[var(--gold)]">
                        ₹{(plan.price / 100000).toFixed(2)}L
                      </p>
                    </div>

                    <button className="w-full py-2 mt-4 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300">
                      Get Full Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Site Plan Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-20 pt-16 border-t border-[var(--border)]"
          >
            <h3 className="font-cormorant text-3xl font-bold text-[var(--text-dark)] mb-8 text-center">
              Master Site Plan
            </h3>
            <div className="bg-gradient-to-br from-[var(--gold)]/10 to-[var(--gold)]/5 rounded-lg p-8 text-center border border-[var(--gold)] border-opacity-30">
              <p className="text-[var(--text-dark)] mb-4">Comprehensive site layout with all amenities and blocks</p>
              <div className="inline-block px-6 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300 cursor-pointer">
                View Site Plan
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
