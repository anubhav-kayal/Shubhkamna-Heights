'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { useTranslation } from '@/context/LocaleContext';
import {
  BASIC_PRICE_PER_SQFT,
  DISCOUNTED_PRICE_PER_SQFT,
  getDiscountedFlatPrice,
  getFlatUnitsByBhk,
} from '@/lib/flat-pricing';
import { formatCurrency } from '@/lib/calculator';
import { cn } from '@/lib/cn';

type CostSheetModalProps = {
  isOpen: boolean;
  bhkType: '2BHK' | '3BHK';
  onClose: () => void;
};

export default function CostSheetModal({ isOpen, bhkType, onClose }: CostSheetModalProps) {
  const { t } = useTranslation();
  const units = getFlatUnitsByBhk(bhkType);

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
            aria-label={t('sections.floorPlans.costSheetClose')}
          />

          <div className="pointer-events-none fixed inset-0 z-[71] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="cost-sheet-modal-title"
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
                    {t('sections.floorPlans.costSheetKicker')}
                  </p>
                  <h2
                    id="cost-sheet-modal-title"
                    className="mt-1 font-cormorant text-xl font-semibold text-text-primary sm:text-2xl"
                  >
                    {t('sections.floorPlans.costSheetTitle')}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t('sections.floorPlans.costSheetClose')}
                  className="shrink-0 border border-border-gold p-2 text-text-secondary transition-colors hover:border-gold hover:text-gold"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
                <div className="border border-border-gold/70 bg-bg-primary/40 p-4 sm:p-5">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                        {t('sections.floorPlans.costSheetUnits', { type: bhkType })}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {t('sections.floorPlans.costSheetRate', {
                          discounted: DISCOUNTED_PRICE_PER_SQFT.toLocaleString('en-IN'),
                          basic: BASIC_PRICE_PER_SQFT.toLocaleString('en-IN'),
                        })}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 divide-y divide-border-gold/40 border border-border-gold/40">
                    {units.map((unit) => (
                      <li
                        key={unit.id}
                        className="flex flex-wrap items-center justify-between gap-3 bg-bg-card/40 px-4 py-3"
                      >
                        <div>
                          <p className="font-inter text-sm font-semibold text-text-primary">{unit.label}</p>
                          <p className="mt-1 text-xs text-text-secondary">
                            {t('sections.floorPlans.costSheetArea', {
                              area: unit.saleableAreaSqFt.toLocaleString('en-IN'),
                            })}
                          </p>
                        </div>
                        <p className="font-cormorant text-xl font-semibold text-gold">
                          {formatCurrency(getDiscountedFlatPrice(unit.saleableAreaSqFt))}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                    {t('sections.floorPlans.costSheetEnquiry')}
                  </p>
                  <EnquiryForm
                    key={`cost-sheet-${bhkType}`}
                    source={`cost_sheet_${bhkType.toLowerCase()}`}
                    idPrefix="cost-sheet-enquiry"
                    compact
                    defaultBhkPreference={bhkType}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
