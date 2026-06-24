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
import {
  DEFAULT_FLAT_UNIT_ID,
  DISCOUNTED_PRICE_PER_SQFT,
  FLAT_UNIT_OPTIONS,
  getFlatUnitOption,
} from '@/lib/flat-pricing';
import { Button } from '@/components/ui/design';
import CustomSelect from '@/components/ui/CustomSelect';
import { useTranslation } from '@/context/LocaleContext';
import { cn } from '@/lib/cn';

const fieldLabelClassName =
  'block text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary';

const LOAN_TENURE_OPTIONS = [10, 15, 20, 25] as const;

export default function CostCalculatorWidget() {
  const { t } = useTranslation();
  const { isOpen, openCalculator, closeCalculator } = useCalculator();
  const defaultFlat = getFlatUnitOption(DEFAULT_FLAT_UNIT_ID);

  const [inputs, setInputs] = useState<CalculatorInputs>({
    flatUnitId: defaultFlat.id,
    bhkType: defaultFlat.bhkType,
    areaScftFt: defaultFlat.saleableAreaSqFt,
    downPaymentPercent: 20,
    loanTenureYears: 20,
    interestRateAnnual: 8.5,
    pricePerSqft: DISCOUNTED_PRICE_PER_SQFT,
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
              : DISCOUNTED_PRICE_PER_SQFT,
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
    const flat = getFlatUnitOption(inputs.flatUnitId);
    const message = encodeURIComponent(
      `Hello! I'm interested in home loan options for Shubh Kamna Heights (${flat.label}). My estimated EMI is ${emiText}/month. Please connect me with your loan expert.`,
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
          aria-label={t('sections.calculator.open')}
          className={cn(
            'fixed z-[48] inline-flex items-center justify-center border border-gold/50',
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
          <span className="hidden sm:inline">{t('sections.calculator.title')}</span>
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
              className="fixed inset-x-0 bottom-0 z-50 flex h-[88dvh] max-h-[40rem] flex-col overflow-hidden border-t border-gold bg-bg-card lg:hidden"
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
  const { t } = useTranslation();
  const selectedFlat = getFlatUnitOption(inputs.flatUnitId);

  const handleFlatChange = (flatUnitId: string) => {
    const flat = getFlatUnitOption(flatUnitId);
    setInputs({
      ...inputs,
      flatUnitId: flat.id,
      bhkType: flat.bhkType,
      areaScftFt: flat.saleableAreaSqFt,
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-border-gold px-5 py-4 sm:px-6 sm:py-5">
        <h2 className="font-cormorant text-2xl font-bold text-gold">{t('sections.calculator.title')}</h2>
        <button
          type="button"
          onClick={closeCalculator}
          aria-label="Close calculator"
          className=" p-1 text-text-secondary transition-colors hover:text-text-primary"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="animate-pulse text-text-secondary">{t('sections.calculator.loadingRates')}</div>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <label htmlFor="flat-unit" className={fieldLabelClassName}>
                {t('sections.calculator.bhk')}
              </label>
              <CustomSelect
                id="flat-unit"
                value={inputs.flatUnitId}
                onChange={handleFlatChange}
                options={FLAT_UNIT_OPTIONS.map((option) => ({
                  value: option.id,
                  label: option.label,
                }))}
                className="mt-2"
              />
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                {t('sections.calculator.flatSummary', {
                  area: selectedFlat.saleableAreaSqFt.toLocaleString('en-IN'),
                  rate: inputs.pricePerSqft.toLocaleString('en-IN'),
                })}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="down-payment-range" className={fieldLabelClassName}>
                  {t('sections.calculator.downPayment')}
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
                className="h-2 w-full cursor-pointer appearance-none bg-border-gold accent-gold"
              />
              <p className="mt-1.5 text-xs text-text-secondary">10% to 40%</p>
            </div>

            <div>
              <label htmlFor="loan-tenure" className={fieldLabelClassName}>
                {t('sections.calculator.tenure')}
              </label>
              <CustomSelect
                id="loan-tenure"
                value={String(inputs.loanTenureYears)}
                onChange={(nextValue) =>
                  setInputs({ ...inputs, loanTenureYears: Number(nextValue) })
                }
                options={LOAN_TENURE_OPTIONS.map((years) => ({
                  value: String(years),
                  label: t('sections.calculator.years', { n: years }),
                }))}
                className="mt-2"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="interest-range" className={fieldLabelClassName}>
                  {t('sections.calculator.interest')}
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
                className="h-2 w-full cursor-pointer appearance-none bg-border-gold accent-gold"
              />
              <p className="mt-1.5 text-xs text-text-secondary">
                Indicative rate. Banks may vary.
              </p>
            </div>

            {!resultsRevealed && (
              <div className=" border border-dashed border-border-gold bg-bg-primary/60 px-4 py-8 text-center">
                <p className="font-inter text-sm font-medium text-text-primary">
                  {t('sections.calculator.ready')}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  {t('sections.calculator.readyLead')}
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
                <div className=" border border-gold bg-gradient-to-br from-gold/15 to-transparent p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                    {t('sections.calculator.estimatedEmi')}
                  </p>
                  <p className="mt-2 font-cormorant text-4xl font-semibold text-gold">
                    {formatEmi(outputs.monthlyEmi)}
                    <span className="ml-2 font-inter text-base font-medium text-text-secondary">
                      {t('sections.calculator.perMonth')}
                    </span>
                  </p>
                </div>

                <div className=" border border-border-gold bg-bg-primary p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gold">
                    {t('sections.calculator.costBreakdown')}
                  </h3>
                  <dl className="mt-3 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">{t('sections.calculator.propertyCost')}</dt>
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
                      <dt className="text-text-primary">{t('sections.calculator.allIn')}</dt>
                      <dd className="text-gold">{formatCurrency(outputs.allInCost)}</dd>
                    </div>
                  </dl>
                </div>

                <div className=" border border-border-gold bg-bg-primary/80 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-gold">
                    {t('sections.calculator.loanSummary')}
                  </h4>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">{t('sections.calculator.downPaymentLabel')}</dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.downPayment)}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">{t('sections.calculator.loanAmount')}</dt>
                      <dd className="font-semibold text-text-primary">
                        {formatCurrency(outputs.loanAmount)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="text-center text-[0.6875rem] leading-relaxed text-text-secondary">
                  {t('sections.calculator.disclaimer')}
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
            {t('sections.calculator.calculate')}
          </Button>
        ) : (
          <Button type="button" onClick={handleWhatsAppClick} className="w-full">
            {t('sections.calculator.expert')}
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={closeCalculator} className="w-full">
          {t('common.close')}
        </Button>
      </div>
    </div>
  );
}
