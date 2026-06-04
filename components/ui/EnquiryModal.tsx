'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEnquiryModal } from '@/context/EnquiryModalContext';
import { useTranslation } from '@/context/LocaleContext';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { cn } from '@/lib/cn';

export default function EnquiryModal() {
  const { isOpen, closeEnquiry } = useEnquiryModal();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeEnquiry();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeEnquiry]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnquiry}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-[2px]"
            aria-label="Close enquiry form"
          />

          <div className="pointer-events-none fixed inset-0 z-[71] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="enquiry-modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={cn(
                'pointer-events-auto flex w-full max-w-lg flex-col',
                'max-h-[min(90dvh,44rem)] overflow-hidden border border-gold/40',
                'bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.55)]',
              )}
            >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-gold px-5 py-4 sm:px-6">
              <div>
                <p className="font-inter text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-gold">
                  {t('enquiry.modalKicker')}
                </p>
                <h2
                  id="enquiry-modal-title"
                  className="mt-1 font-cormorant text-xl font-semibold text-text-primary sm:text-2xl"
                >
                  {t('enquiry.modalTitle')}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeEnquiry}
                aria-label="Close"
                className="shrink-0 border border-border-gold p-2 text-text-secondary transition-colors hover:border-gold hover:text-gold"
              >
                <X size={20} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              <EnquiryForm
                source="book_visit_modal"
                idPrefix="modal-enquiry"
                compact
              />
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
