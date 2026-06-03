'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '@/context/CalculatorContext';
import {
  calculatePropertyCost,
  formatCurrency,
  formatEmi,
  type CalculatorInputs,
} from '@/lib/calculator';
import { getPricingSettings } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';
import { Button } from '@/components/ui/design';
import { cn } from '@/lib/cn';

const fieldLabelClassName =
  'block text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary';

const selectClassName =
  'w-full rounded-lg border border-border-gold bg-bg-primary px-3 py-2.5 text-sm text-text-primary focus:border-gold focus:outline-none';

const numberInputClassName =
  'w-full rounded-lg border border-border-gold bg-bg-primary px-3 py-2.5 font-inter text-sm text-text-primary tabular-nums placeholder:text-text-secondary/60 focus:border-gold focus:outline-none';

export default function CostCalculatorWidget() {
  const { isOpen, openCalculator, closeCalculator } = useCalculator();
  const DEFAULT_PRICE_PER_SQFT = 3500;

  const [inputs, setInputs] = useState<CalculatorInputs>({
    bhkType: '3BHK',
    areaScftFt: 1200,
    downPaymentPercent: 20,
    loanTenureYears: 20,
    interestRateAnnual: 8.5,
    pricePerSqft: DEFAULT_PRICE_PER_SQFT,
    gstPercent: 5,
    stampDutyPercent: 5,
  });

  const [loading, setLoading] = useState(true);
  const [resultsRevealed, setResultsRevealed] = useState(false);

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await getPricingSettings();
        setInputs((prev) => ({
          ...prev,
          pricePerSqft:
            pricing?.perSqftRate && pricing.perSqftRate > 0
              ? pricing.perSqftRate
              : prev.pricePerSqft > 0
                ? prev.pricePerSqft
                : DEFAULT_PRICE_PER_SQFT,
          gstPercent: pricing?.gstPercent ?? prev.gstPercent,
          stampDutyPercent: pricing?.stampDutyPercent ?? prev.stampDutyPercent,
        }));
      } catch (error) {
        console.error('Error loading pricing:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadPricing();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setResultsRevealed(false);
    }
  }, [isOpen]);

  const outputs =
    inputs.pricePerSqft > 0 && inputs.areaScftFt > 0
      ? calculatePropertyCost(inputs)
      : null;

  const handleWhatsAppClick = () => {
    const emiText = outputs ? formatEmi(outputs.monthlyEmi) : '—';
    const message = encodeURIComponent(
      `Hello! I'm interested in home loan options for Shubh Kamna Heights (${inputs.bhkType}, ${inputs.areaScftFt} sq ft). My estimated EMI is ${emiText}/month. Please connect me with your loan expert.`,
    );
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleInputsChange: React.Dispatch<React.SetStateAction<CalculatorInputs>> = (
    updater,
  ) => {
    setInputs(updater);
    if (resultsRevealed) {
      setResultsRevealed(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={openCalculator}
          aria-label="Open EMI calculator"
          className={cn(
            'fixed z-[48] inline-flex items-center justify-center rounded-full border border-gold/50',
            'bg-gradient-to-br from-gold to-gold-light font-inter text-sm font-semibold text-text-dark',
            'shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)]',
            'max-sm:right-[max(1rem,env(safe-area-inset-right,0px))]',
            'max-sm:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))]',
            'max-sm:h-14 max-sm:w-14 max-sm:gap-0 max-sm:p-0',
            'sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]',
            'sm:left-[max(1.5rem,env(safe-area-inset-left,0px))]',
            'sm:gap-2 sm:px-4 sm:py-3',
          )}
        >
          <Calculator size={22} className="shrink-0" />
          <span className="hidden sm:inline">EMI Calculator</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCalculator}
              className="fixed inset-0 z-40 hidden bg-black/50 lg:block"
              aria-hidden
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed top-[var(--site-header-height)] right-0 z-50 hidden h-[calc(100dvh-var(--site-header-height))] w-[var(--calculator-width)] flex-col overflow-hidden border-l border-gold bg-bg-card shadow-[-20px_0_60px_rgba(0,0,0,0.35)] lg:flex"
              aria-label="EMI calculator"
            >
              <CalculatorContent
                inputs={inputs}
                setInputs={handleInputsChange}
                outputs={outputs}
                loading={loading}
                resultsRevealed={resultsRevealed}
                onRevealResults={() => setResultsRevealed(true)}
                closeCalculator={closeCalculator}
                handleWhatsAppClick={handleWhatsAppClick}
              />
            </motion.aside>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCalculator}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              aria-hidden
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-0 bottom-0 z-50 flex h-[88dvh] max-h-[40rem] flex-col overflow-hidden rounded-t-2xl border-t border-gold bg-bg-card lg:hidden"
            >
              <CalculatorContent
                inputs={inputs}
                setInputs={handleInputsChange}
                outputs={outputs}
                loading={loading}
                resultsRevealed={resultsRevealed}
                onRevealResults={() => setResultsRevealed(true)}
                closeCalculator={closeCalculator}
                handleWhatsAppClick={handleWhatsAppClick}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface CalculatorContentProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  outputs: ReturnType<typeof calculatePropertyCost> | null;
  loading: boolean;
  resultsRevealed: boolean;
  onRevealResults: () => void;
  closeCalculator: () => void;
  handleWhatsAppClick: () => void;
}

function CalculatorContent({
  inputs,
  setInputs,
  outputs,
  loading,
  resultsRevealed,
  onRevealResults,
  closeCalculator,
  handleWhatsAppClick,
}: CalculatorContentProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-border-gold px-5 py-4 sm:px-6 sm:py-5">
        <h2 className="font-cormorant text-2xl font-bold text-gold">EMI Calculator</h2>
        <button
          type="button"
          onClick={closeCalculator}
          aria-label="Close calculator"
          className="rounded-full p-1 text-text-secondary transition-colors hover:text-text-primary"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="animate-pulse text-text-secondary">Loading rates…</div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label htmlFor="bhk-type" className={fieldLabelClassName}>
                BHK Type
              </label>
              <select
                id="bhk-type"
                value={inputs.bhkType}
                onChange={(e) => setInputs({ ...inputs, bhkType: e.target.value })}
                className={cn('mt-2', selectClassName)}
              >
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
              </select>
            </div>

            <div>
              <label htmlFor="price-per-sqft" className={fieldLabelClassName}>
                Price per sq ft (₹)
              </label>
              <input
                id="price-per-sqft"
                type="number"
                min={2000}
                max={15000}
                step={50}
                value={inputs.pricePerSqft || ''}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setInputs({
                    ...inputs,
                    pricePerSqft: Number.isFinite(next) && next > 0 ? next : 0,
                  });
                }}
                className={cn('mt-2', numberInputClassName)}
                placeholder="e.g. 3500"
              />
            </div>

            <div>
              <label htmlFor="area-sqft" className={fieldLabelClassName}>
                Carpet area (sq ft)
              </label>
              <input
                id="area-sqft"
                type="number"
                min={800}
                max={2000}
                step={50}
                value={inputs.areaScftFt}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  if (!Number.isFinite(next)) return;
                  setInputs({
                    ...inputs,
                    areaScftFt: Math.min(2000, Math.max(800, next)),
                  });
                }}
                className={cn('mt-2', numberInputClassName)}
              />
              <input
                id="area-range"
                type="range"
                min="800"
                max="2000"
                step="50"
                value={inputs.areaScftFt}
                onChange={(e) =>
                  setInputs({ ...inputs, areaScftFt: Number(e.target.value) })
                }
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-border-gold accent-gold"
                aria-label="Adjust carpet area"
              />
              <p className="mt-1.5 text-xs text-text-secondary">800 – 2000 sq ft</p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="down-payment-range" className={fieldLabelClassName}>
                  Down Payment
                </label>
                <span className="text-sm font-semibold text-gold">
                  {inputs.downPaymentPercent}%
                </span>
              </div>
              <input
                id="down-payment-range"
                type="range"
                min="10"
                max="40"
                step="5"
                value={inputs.downPaymentPercent}
                onChange={(e) =>
                  setInputs({ ...inputs, downPaymentPercent: Number(e.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border-gold accent-gold"
              />
              <p className="mt-1.5 text-xs text-text-secondary">10% – 40%</p>
            </div>

            <div>
              <label htmlFor="loan-tenure" className={fieldLabelClassName}>
                Loan Tenure (Years)
              </label>
              <select
                id="loan-tenure"
                value={inputs.loanTenureYears}
                onChange={(e) =>
                  setInputs({ ...inputs, loanTenureYears: Number(e.target.value) })
                }
                className={cn('mt-2', selectClassName)}
              >
                <option value="10">10 Years</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="25">25 Years</option>
              </select>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="interest-range" className={fieldLabelClassName}>
                  Interest Rate
                </label>
                <span className="text-sm font-semibold text-gold">
                  {inputs.interestRateAnnual}%
                </span>
              </div>
              <input
                id="interest-range"
                type="range"
                min="7"
                max="12"
                step="0.1"
                value={inputs.interestRateAnnual}
                onChange={(e) =>
                  setInputs({ ...inputs, interestRateAnnual: Number(e.target.value) })
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border-gold accent-gold"
              />
              <p className="mt-1.5 text-xs text-text-secondary">
                Indicative rate — banks may vary
              </p>
            </div>

            {!resultsRevealed && (
              <div className="rounded-xl border border-dashed border-border-gold bg-bg-primary/60 px-4 py-8 text-center">
                <p className="font-inter text-sm font-medium text-text-primary">
                  Ready to estimate
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  Set your preferences above, then calculate to view total cost, loan amount,
                  and monthly EMI.
                </p>
              </div>
            )}

            {resultsRevealed && outputs && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <div className="rounded-xl border border-gold bg-gradient-to-br from-gold/15 to-transparent p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                    Estimated monthly EMI
                  </p>
                  <p className="mt-2 font-cormorant text-4xl font-semibold text-gold">
                    {formatEmi(outputs.monthlyEmi)}
                    <span className="ml-2 font-inter text-base font-medium text-text-secondary">
                      / month
                    </span>
                  </p>
                </div>

                <div className="rounded-xl border border-border-gold bg-bg-primary p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gold">
                    Cost breakdown
                  </h3>
                  <dl className="mt-3 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">Property cost</dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.totalCost)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">GST ({inputs.gstPercent}%)</dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.gst)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">
                        Stamp duty ({inputs.stampDutyPercent}%)
                      </dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.stampDuty)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-border-gold pt-2.5 font-semibold">
                      <dt className="text-text-primary">All-in cost</dt>
                      <dd className="text-gold">{formatCurrency(outputs.allInCost)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl border border-border-gold bg-bg-primary/80 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gold">
                    Loan summary
                  </h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">Down payment</dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.downPayment)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">Loan amount</dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.loanAmount)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="text-center text-[0.6875rem] leading-relaxed text-text-secondary">
                  Estimates are indicative. Final figures depend on bank approval and current
                  rates.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col gap-3 border-t border-border-gold px-5 py-4 sm:px-6">
        {!resultsRevealed ? (
          <Button
            type="button"
            onClick={onRevealResults}
            disabled={loading || !outputs}
            className="w-full"
          >
            Calculate EMI
          </Button>
        ) : (
          <Button type="button" onClick={handleWhatsAppClick} className="w-full">
            Talk to Our Home Loan Expert →
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={closeCalculator} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}
