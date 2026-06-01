'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials } from '@/lib/firestore';
import type { Testimonial } from '@/types';

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    flatType: '3BHK',
    quote: 'Shubh Kamna Heights has exceeded all my expectations. The location is perfect, and the community is wonderful. Highly recommended!',
    rating: 5,
    active: true,
  },
  {
    id: '2',
    name: 'Priya Singh',
    flatType: '2BHK',
    quote: 'The entire process was smooth and transparent. The team was very helpful and professional. Love my new home!',
    rating: 5,
    active: true,
  },
  {
    id: '3',
    name: 'Amit Patel',
    flatType: '3BHK',
    quote: 'The amenities are top-notch and the green spaces are truly relaxing. It\'s more than just a home, it\'s a lifestyle!',
    rating: 4,
    active: true,
  },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(MOCK_TESTIMONIALS);
        }
      } catch (error) {
        console.error('Error loading testimonials:', error);
        setTestimonials(MOCK_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(testimonials.length, 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(testimonials.length, 1)) % Math.max(testimonials.length, 1));
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  if (loading) {
    return (
      <section className="section-shell bg-[var(--bg-section)]">
        <div className="page-container flex items-center justify-center py-12 sm:py-16">
          <div className="animate-pulse text-[var(--text-secondary)]">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-shell bg-[var(--bg-section)]">
      <div className="page-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          {/* Heading */}
          <div className="section-header-center">
            <span className="section-kicker justify-center">Testimonials</span>
            <h2 className="section-heading">What Our Residents Say</h2>
            <div className="gold-rule mx-auto mt-4 sm:mt-6" />
          </div>

          {/* Carousel */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative min-w-0 rounded-xl border border-[var(--gold)] bg-[var(--bg-card)] panel-padding sm:rounded-2xl"
            >
              {/* Quote Mark */}
              <div className="absolute top-4 left-4 text-[var(--gold)] opacity-50">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="currentColor"
                >
                  <path d="M8 20c0-4.42 3.58-8 8-8s8 3.58 8 8v12H8V20zm16 0c0-4.42 3.58-8 8-8s8 3.58 8 8v12h-16V20z" />
                </svg>
              </div>

              {/* Content */}
              <p className="mb-6 pl-4 text-base italic leading-relaxed text-[var(--text-secondary)] sm:pl-6 sm:text-lg">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < currentTestimonial.rating
                        ? 'fill-[var(--gold)] text-[var(--gold)]'
                        : 'text-[var(--border)]'
                    }
                  />
                ))}
              </div>

              {/* Author */}
              <div className="border-t border-[var(--border)] pt-4">
                <p className="font-cormorant text-lg font-bold text-[var(--text-primary)]">
                  {currentTestimonial.name}
                </p>
                <p className="text-[var(--text-secondary)] text-sm">
                  {currentTestimonial.flatType} Resident
                </p>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prevSlide}
                className="p-3 bg-[var(--bg-card)] border border-[var(--gold)] rounded-full text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-[var(--gold)] w-6' : 'bg-[var(--border)]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 bg-[var(--bg-card)] border border-[var(--gold)] rounded-full text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Counter */}
            <p className="text-center text-[var(--text-secondary)] text-sm mt-6">
              {currentIndex + 1} / {testimonials.length}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
