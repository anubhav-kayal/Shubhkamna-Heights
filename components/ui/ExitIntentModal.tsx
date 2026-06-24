'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { submitEnquiry } from '@/lib/firestore';
import CustomSelect from '@/components/ui/CustomSelect';

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
            <div className="w-full max-w-md overflow-hidden border border-gold bg-bg-card">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-gold to-gold-light p-6">
                <button
                  onClick={() => setIsVisible(false)}
                  className="absolute top-4 right-4 text-text-dark"
                >
                  <X size={20} />
                </button>
                <h2 className="font-cormorant text-2xl font-bold text-text-dark">
                  Don&apos;t Leave Empty Handed!
                </h2>
                <p className="mt-2 text-sm text-text-dark">
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
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-green-accent/20">
                    <svg
                      className="h-8 w-8 text-green-accent"
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
                  <h3 className="mb-2 text-xl font-bold text-text-primary">
                    Thank You!
                  </h3>
                  <p className="text-sm text-text-secondary">
                    We&apos;ll get in touch soon with exclusive details about your preferred home.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border border-border-gold bg-bg-primary px-3 py-2 font-inter text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    pattern="[0-9\-\+\(\)\s]+"
                    className="w-full border border-border-gold bg-bg-primary px-3 py-2 font-inter text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-gold"
                  />

                  <CustomSelect
                    value={formData.bhkPreference}
                    onChange={(value) =>
                      setFormData({ ...formData, bhkPreference: value })
                    }
                    options={[
                      { value: '2BHK', label: '2 BHK' },
                      { value: '3BHK', label: '3 BHK' },
                      { value: 'Not decided', label: 'Not decided' },
                    ]}
                    triggerClassName="w-full border border-border-gold bg-bg-primary px-3 py-2 font-inter text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-gold"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold py-2 font-inter font-semibold text-text-dark transition-all hover:shadow-lg hover:shadow-gold/30 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? 'Submitting...' : 'Get Details Now'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="w-full font-inter text-sm text-text-secondary transition-colors hover:text-text-primary"
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
