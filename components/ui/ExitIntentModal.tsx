'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { submitEnquiry } from '@/lib/firestore';

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bhkPreference: '3BHK',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if modal was already shown in this session
    const modalShown = sessionStorage.getItem('exitIntentModalShown');
    if (modalShown) return;

    // Desktop: trigger on mouse leaving viewport top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem('exitIntentModalShown', 'true');
      }
    };

    // Mobile: trigger after 30 seconds of inactivity
    let inactivityTimer: NodeJS.Timeout;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!modalShown) {
          setIsVisible(true);
          sessionStorage.setItem('exitIntentModalShown', 'true');
        }
      }, 30000);
    };

    // Start inactivity timer on mobile
    if (/Mobile|Android|iPhone/.test(navigator.userAgent)) {
      resetInactivityTimer();
      document.addEventListener('touchstart', resetInactivityTimer);
    }

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (/Mobile|Android|iPhone/.test(navigator.userAgent)) {
        document.removeEventListener('touchstart', resetInactivityTimer);
      }
      clearTimeout(inactivityTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await submitEnquiry({
        ...formData,
        email: '',
        visitDate: new Date().toISOString().split('T')[0],
        source: 'exit_intent_modal',
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--gold)] rounded-lg max-w-md w-full overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] p-6 relative">
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 text-[var(--text-dark)]"
                >
                  <X size={20} />
                </button>
                <h2 className="font-cormorant text-2xl font-bold text-[var(--text-dark)]">
                  Don&apos;t Leave Empty Handed!
                </h2>
                <p className="text-[var(--text-dark)] text-sm mt-2">
                  Get exclusive details about Shubh Kamna Heights
                </p>
              </div>

              {/* Content */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--green-accent)] bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[var(--green-accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    We&apos;ll get in touch soon with exclusive details about your preferred home.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-3 py-2 text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    pattern="[0-9\-\+\(\)\s]+"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-3 py-2 text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  />

                  <select
                    value={formData.bhkPreference}
                    onChange={e => setFormData({ ...formData, bhkPreference: e.target.value })}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-3 py-2 text-[var(--text-primary)] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  >
                    <option value="2BHK">2 BHK</option>
                    <option value="3BHK">3 BHK</option>
                    <option value="Not decided">Not decided</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 bg-[var(--gold)] text-[var(--text-dark)] rounded font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Get Details Now →'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="w-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-inter transition-colors"
                  >
                    Not now, maybe later
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
