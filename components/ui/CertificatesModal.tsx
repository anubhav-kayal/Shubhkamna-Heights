'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, FileText, X } from 'lucide-react';
import { PROJECT_CERTIFICATES } from '@/lib/certificates';
import { useTranslation } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

type CertificatesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CertificatesModal({ isOpen, onClose }: CertificatesModalProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-[2px]"
            aria-label={t('sections.certificates.close')}
          />

          <div className="pointer-events-none fixed inset-0 z-[71] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificates-modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className={cn(
                'pointer-events-auto flex w-full max-w-2xl flex-col',
                'max-h-[min(92dvh,52rem)] overflow-hidden border border-gold/40',
                'bg-bg-card shadow-[0_24px_80px_rgba(0,0,0,0.55)]',
              )}
            >
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border-gold px-5 py-4 sm:px-6">
                <div>
                  <p className="font-inter text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-gold">
                    {t('sections.certificates.kicker')}
                  </p>
                  <h2
                    id="certificates-modal-title"
                    className="mt-1 font-cormorant text-xl font-semibold text-text-primary sm:text-2xl"
                  >
                    {t('sections.certificates.title')}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('sections.certificates.close')}
                  className="shrink-0 border border-border-gold p-2 text-text-secondary transition-colors hover:border-gold hover:text-gold"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="min-h-0 flex-1 divide-y divide-border-gold/40 overflow-y-auto overscroll-contain">
                {PROJECT_CERTIFICATES.map((certificate) => (
                  <li key={certificate.id}>
                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gold/5 sm:px-6"
                    >
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center border border-border-gold/60 bg-bg-primary/50 text-gold transition-colors group-hover:border-gold/50 group-hover:bg-gold/10"
                        aria-hidden
                      >
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-inter text-sm font-semibold text-text-primary sm:text-[0.9375rem]">
                          {certificate.label}
                        </p>
                        <p className="mt-1 font-inter text-xs text-text-secondary">
                          {t('sections.certificates.viewDownload')}{' '}
                          <span className="font-semibold uppercase tracking-[0.12em] text-gold">
                            {t('sections.certificates.pdf')}
                          </span>
                        </p>
                      </div>
                      <ExternalLink
                        size={16}
                        className="shrink-0 text-text-secondary transition-colors group-hover:text-gold"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
