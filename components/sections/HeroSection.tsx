'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';
import { useCalculator } from '@/context/CalculatorContext';

interface HeroSettings {
  videoUrl?: string;
  posterUrl?: string;
}

export default function HeroSection({ settings = {} as HeroSettings }) {
  const [showStats, setShowStats] = useState(false);
  const { openCalculator } = useCalculator();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(PROJECT_DATA.whatsappMessage);
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden pt-24">
      {/* Video Background */}
      <div className="absolute inset-0">
        {settings.videoUrl ? (
          <>
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={settings.posterUrl}
              className="absolute inset-0 w-full h-full object-cover hidden sm:block"
            >
              <source src={settings.videoUrl} type="video/mp4" />
            </video>
            {/* Mobile fallback - show poster */}
            <div
              className="absolute inset-0 w-full h-full object-cover sm:hidden"
              style={{
                backgroundImage: `url(${settings.posterUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-section)]" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,10,15,0.3)_0%] via-[rgba(10,10,15,0.5)_50%] to-[rgba(10,10,15,1)_100%]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center z-10 px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-block"
        >
          <div className="px-4 py-2 rounded-full border border-[var(--gold)] text-[var(--gold)] text-sm font-inter font-medium">
            Now Accepting Bookings — Chandauli, UP
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-8"
        >
          <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] mb-4">
            Crafted for Comfort.
          </h1>
          <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--gold)] mb-6">
            Designed for Life.
          </h1>
          <p className="font-inter text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Experience luxurious living at 8 lanes NH-2, just minutes from Varanasi
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={() => {
              document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300"
          >
            Explore Project ↓
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="px-8 py-3 border-2 border-[var(--gold)] text-[var(--gold)] rounded-lg font-inter font-semibold hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300"
          >
            Talk to Us on WhatsApp →
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={scrollVariants}
          initial="hidden"
          animate={['visible', 'animate']}
          className="absolute bottom-20"
        >
          <ChevronDown size={32} className="text-[var(--gold)]" />
        </motion.div>
      </div>

      {/* Stats Bar */}
      {showStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 z-20"
        >
          <div className="bg-[var(--bg-card)] border-t border-[var(--gold)] py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center text-sm sm:text-base">
                <div>
                  <p className="text-[var(--gold)] font-bold">1000+</p>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">Families</p>
                </div>
                <div>
                  <p className="text-[var(--gold)] font-bold">2 & 3</p>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">BHK Units</p>
                </div>
                <div>
                  <p className="text-[var(--gold)] font-bold">65%+</p>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">Open Space</p>
                </div>
                <div>
                  <p className="text-[var(--gold)] font-bold">RERA</p>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">Registered</p>
                </div>
                <div>
                  <p className="text-[var(--gold)] font-bold">IIT BHU</p>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">Vetted</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
