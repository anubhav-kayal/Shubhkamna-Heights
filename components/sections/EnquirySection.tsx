'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitEnquiry } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';

interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  bhkPreference: string;
  visitDate: string;
  message: string;
}

export default function EnquirySection() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    phone: '',
    email: '',
    bhkPreference: '3BHK',
    visitDate: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.phone || !formData.email) {
        setError('Please fill in all required fields.');
        return;
      }

      await submitEnquiry({
        ...formData,
        source: 'website_enquiry_form',
      });

      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        bhkPreference: '3BHK',
        visitDate: '',
        message: '',
      });

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('Error submitting form. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-20 sm:py-32 bg-[var(--bg-card)] border-t border-[var(--gold)] overflow-hidden">
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
              Your Dream Home is One Step Away
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] mx-auto"></div>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="inline-block p-4 rounded-full bg-[var(--green-accent)]/20 border border-[var(--green-accent)] mb-4">
                  <svg
                    className="w-8 h-8 text-[var(--green-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Thank You!</h3>
                <p className="text-[var(--text-secondary)] mb-6">
                  We've received your enquiry and will be in touch soon.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={`tel:${PROJECT_DATA.contactPhone}`}
                    className="px-6 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Call Us Now
                  </a>
                  <a
                    href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
                    className="px-6 py-3 border-2 border-[var(--gold)] text-[var(--gold)] rounded-lg font-inter font-semibold hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300"
                  >
                    Continue on WhatsApp →
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Two Column Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-inter focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      placeholder="Rajesh Kumar"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-inter focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      placeholder="+91 7084 165214"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-inter focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      placeholder="rajesh@example.com"
                    />
                  </div>

                  {/* BHK Preference */}
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Preferred BHK *
                    </label>
                    <select
                      name="bhkPreference"
                      value={formData.bhkPreference}
                      onChange={handleChange}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-4 py-3 text-[var(--text-primary)] font-inter focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    >
                      <option value="2BHK">2 BHK</option>
                      <option value="3BHK">3 BHK</option>
                      <option value="Not decided">Not decided</option>
                    </select>
                  </div>
                </div>

                {/* Visit Date */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    name="visitDate"
                    value={formData.visitDate}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-4 py-3 text-[var(--text-primary)] font-inter focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-inter focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    placeholder="Tell us about your preferences..."
                  />
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Get Details Now'}
                  </button>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <a
                      href={`tel:${PROJECT_DATA.contactPhone}`}
                      className="text-center py-2 border border-[var(--gold)] text-[var(--gold)] rounded-lg font-inter font-semibold hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300"
                    >
                      Call: {PROJECT_DATA.contactPhone}
                    </a>
                    <a
                      href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
                      className="text-center py-2 border border-[#25D366] text-[#25D366] rounded-lg font-inter font-semibold hover:bg-[#25D366] hover:text-white transition-all duration-300"
                    >
                      WhatsApp Us →
                    </a>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
