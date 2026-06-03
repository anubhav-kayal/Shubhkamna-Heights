'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitEnquiry } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';
import VisitDatePicker from '@/components/ui/VisitDatePicker';
import { Button, BtnRow, PanelDark } from '@/components/ui/design';
import { cn } from '@/lib/cn';

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  bhkPreference: string;
  visitDate: string;
  message: string;
}

const EMPTY_FORM: EnquiryFormData = {
  name: '',
  phone: '',
  email: '',
  bhkPreference: '3BHK',
  visitDate: '',
  message: '',
};

const inputClassName =
  'w-full rounded-xl border border-border-gold bg-bg-primary px-4 py-3 font-inter text-sm text-text-primary placeholder:text-text-secondary/60 transition-colors focus:border-gold focus:outline-none';

const labelClassName =
  'font-inter text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary';

const linkPrimaryClassName =
  'inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/50 bg-gradient-to-br from-gold to-gold-light px-5 py-3 font-inter text-sm font-semibold text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)] sm:w-auto';

const linkSecondaryClassName =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border-gold bg-transparent px-5 py-3 font-inter text-sm font-semibold text-gold transition-all duration-200 hover:border-gold hover:bg-gold/10';

type EnquiryFormProps = {
  source: string;
  idPrefix?: string;
  compact?: boolean;
  onSuccess?: () => void;
  className?: string;
};

export default function EnquiryForm({
  source,
  idPrefix = 'enquiry',
  compact = false,
  onSuccess,
  className,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.name || !formData.phone || !formData.email) {
        setError('Please fill in all required fields.');
        return;
      }

      await submitEnquiry({
        ...formData,
        source,
      });

      setSubmitted(true);
      setFormData(EMPTY_FORM);
      onSuccess?.();

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);
    } catch (err) {
      setError('Error submitting form. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
      >
        <PanelDark className={cn('text-center', compact && 'p-5 sm:p-6')}>
          <div className="mx-auto mb-4 inline-flex rounded-full border border-green-accent bg-green-accent/15 p-3">
            <svg
              className="h-7 w-7 text-green-accent"
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
          <h3 className="font-cormorant text-xl font-semibold text-text-primary sm:text-2xl">
            Thank You!
          </h3>
          <p className="mt-2 text-sm text-text-secondary">
            We&apos;ve received your enquiry and will be in touch soon.
          </p>
          <BtnRow className="mt-6 justify-center">
            <a href={`tel:${PROJECT_DATA.contactPhone}`} className={linkPrimaryClassName}>
              Call Us Now
            </a>
            <a
              href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
              className={linkSecondaryClassName}
            >
              WhatsApp →
            </a>
          </BtnRow>
        </PanelDark>
      </motion.div>
    );
  }

  const formBody = (
    <form onSubmit={handleSubmit} className={cn('flex flex-col', compact ? 'gap-5' : 'gap-7')}>
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/15 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className={cn('grid gap-5 sm:grid-cols-2', !compact && 'gap-7')}>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-name`} className={labelClassName}>
            Full Name *
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="Rajesh Kumar"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-phone`} className={labelClassName}>
            Phone Number *
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="+91 70841 65214"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-email`} className={labelClassName}>
            Email Address *
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="rajesh@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-bhk`} className={labelClassName}>
            Preferred BHK *
          </label>
          <select
            id={`${idPrefix}-bhk`}
            name="bhkPreference"
            value={formData.bhkPreference}
            onChange={handleChange}
            className={inputClassName}
          >
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="Not decided">Not decided</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label id={`${idPrefix}-date-label`} className={labelClassName}>
            Preferred Visit Date
          </label>
          <VisitDatePicker
            id={`${idPrefix}-date`}
            name="visitDate"
            value={formData.visitDate}
            onChange={(visitDate) => setFormData((prev) => ({ ...prev, visitDate }))}
          />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor={`${idPrefix}-message`} className={labelClassName}>
            Message (Optional)
          </label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={compact ? 3 : 4}
            className={`${inputClassName} resize-y`}
            placeholder="Tell us about your preferences..."
          />
        </div>
      </div>

      <BtnRow className={cn('justify-center', !compact && 'sm:justify-start')}>
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? 'Submitting...' : 'Get Details Now'}
        </Button>
        <a href={`tel:${PROJECT_DATA.contactPhone}`} className={linkSecondaryClassName}>
          Call: {PROJECT_DATA.contactPhone}
        </a>
        <a
          href={`https://wa.me/${PROJECT_DATA.whatsappNumber}`}
          className={linkSecondaryClassName}
        >
          WhatsApp Us →
        </a>
      </BtnRow>

      <p className="text-center text-xs text-text-secondary">
        By submitting this form, you agree to our privacy policy and terms of service.
      </p>
    </form>
  );

  if (compact) {
    return <div className={className}>{formBody}</div>;
  }

  return (
    <PanelDark className={className}>
      {formBody}
    </PanelDark>
  );
}
