'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '@/context/CalculatorContext';
import { calculatePropertyCost, formatCurrency, formatEmi, type CalculatorInputs } from '@/lib/calculator';
import { getPricingSettings, getBanks } from '@/lib/firestore';
import { PROJECT_DATA } from '@/lib/constants';

export default function CostCalculatorWidget() {
  const { isOpen, closeCalculator } = useCalculator();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    bhkType: '3BHK',
    areaScftFt: 1200,
    downPaymentPercent: 20,
    loanTenureYears: 20,
    interestRateAnnual: 8.5,
    pricePerSqft: 0,
    gstPercent: 5,
    stampDutyPercent: 5,
  });

  const [outputs, setOutputs] = useState<ReturnType<typeof calculatePropertyCost> | null>(null);
  const [loading, setLoading] = useState(true);

  // Load pricing from Firestore
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await getPricingSettings();
        if (pricing) {
          setInputs(prev => ({
            ...prev,
            pricePerSqft: pricing.perSqftRate || 3500,
            gstPercent: pricing.gstPercent || 5,
            stampDutyPercent: pricing.stampDutyPercent || 5,
          }));
        }
      } catch (error) {
        console.error('Error loading pricing:', error);
        // Set default fallback values
        setInputs(prev => ({
          ...prev,
          pricePerSqft: 3500,
        }));
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, []);

  // Calculate when inputs change
  useEffect(() => {
    if (inputs.pricePerSqft > 0) {
      const result = calculatePropertyCost(inputs);
      setOutputs(result);
    }
  }, [inputs]);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in learning more about EMI options for Shubh Kamna Heights. Current calculation shows EMI: ${formatEmi(outputs?.monthlyEmi || 0)}/month`
    );
    window.open(`https://wa.me/${PROJECT_DATA.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCalculator}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden lg:block"
          />

          {/* Desktop Drawer - Right Sidebar */}
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 h-screen w-96 bg-[var(--bg-card)] border-l border-[var(--gold)] z-50 hidden lg:flex flex-col overflow-y-auto shadow-2xl"
          >
            <CalculatorContent
              inputs={inputs}
              setInputs={setInputs}
              outputs={outputs}
              loading={loading}
              closeCalculator={closeCalculator}
              handleWhatsAppClick={handleWhatsAppClick}
            />
          </motion.div>

          {/* Mobile Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-x-0 bottom-0 h-[85vh] bg-[var(--bg-card)] border-t border-[var(--gold)] z-50 lg:hidden flex flex-col overflow-y-auto rounded-t-2xl"
          >
            <CalculatorContent
              inputs={inputs}
              setInputs={setInputs}
              outputs={outputs}
              loading={loading}
              closeCalculator={closeCalculator}
              handleWhatsAppClick={handleWhatsAppClick}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CalculatorContentProps {
  inputs: CalculatorInputs;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  outputs: ReturnType<typeof calculatePropertyCost> | null;
  loading: boolean;
  closeCalculator: () => void;
  handleWhatsAppClick: () => void;
}

function CalculatorContent({
  inputs,
  setInputs,
  outputs,
  loading,
  closeCalculator,
  handleWhatsAppClick,
}: CalculatorContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
        <h2 className="font-cormorant text-2xl font-bold text-[var(--gold)]">EMI Calculator</h2>
        <button
          onClick={closeCalculator}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-[var(--text-secondary)]">Loading...</div>
          </div>
        ) : (
          <>
            {/* BHK Type */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                BHK Type
              </label>
              <select
                value={inputs.bhkType}
                onChange={e => setInputs({ ...inputs, bhkType: e.target.value })}
                className="w-full bg-[var(--bg-primary)] border border-[var(--gold)] rounded px-3 py-2 text-[var(--text-primary)] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              >
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
              </select>
            </div>

            {/* Area */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Area (sq ft)
                </label>
                <span className="text-[var(--gold)] font-semibold">{inputs.areaScftFt}</span>
              </div>
              <input
                type="range"
                min="800"
                max="2000"
                step="50"
                value={inputs.areaScftFt}
                onChange={e => setInputs({ ...inputs, areaScftFt: Number(e.target.value) })}
                className="w-full h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer accent-[var(--gold)]"
              />
              <div className="text-xs text-[var(--text-secondary)] mt-2">800 - 2000 sq ft</div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Down Payment
                </label>
                <span className="text-[var(--gold)] font-semibold">{inputs.downPaymentPercent}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={inputs.downPaymentPercent}
                onChange={e => setInputs({ ...inputs, downPaymentPercent: Number(e.target.value) })}
                className="w-full h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer accent-[var(--gold)]"
              />
              <div className="text-xs text-[var(--text-secondary)] mt-2">10% - 40%</div>
            </div>

            {/* Loan Tenure */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Loan Tenure (Years)
              </label>
              <select
                value={inputs.loanTenureYears}
                onChange={e => setInputs({ ...inputs, loanTenureYears: Number(e.target.value) })}
                className="w-full bg-[var(--bg-primary)] border border-[var(--gold)] rounded px-3 py-2 text-[var(--text-primary)] font-inter text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              >
                <option value="10">10 Years</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="25">25 Years</option>
              </select>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">
                  Interest Rate
                </label>
                <span className="text-[var(--gold)] font-semibold">{inputs.interestRateAnnual}%</span>
              </div>
              <input
                type="range"
                min="7"
                max="12"
                step="0.1"
                value={inputs.interestRateAnnual}
                onChange={e =>
                  setInputs({ ...inputs, interestRateAnnual: Number(e.target.value) })
                }
                className="w-full h-2 bg-[var(--bg-primary)] rounded-lg appearance-none cursor-pointer accent-[var(--gold)]"
              />
              <div className="text-xs text-[var(--text-secondary)] mt-2">
                Average: 8.5% (Consult banks for current rates)
              </div>
            </div>

            {/* Results */}
            {outputs && (
              <div className="bg-[var(--bg-primary)] border border-[var(--gold)] rounded-lg p-4 space-y-3">
                <h3 className="text-sm font-bold text-[var(--gold)] uppercase">Cost Breakdown</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Property Cost</span>
                    <span className="text-[var(--text-primary)] font-semibold">
                      {formatCurrency(outputs.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">GST (5%)</span>
                    <span className="text-[var(--text-primary)] font-semibold">
                      {formatCurrency(outputs.gst)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-secondary)]">Stamp Duty (5%)</span>
                    <span className="text-[var(--text-primary)] font-semibold">
                      {formatCurrency(outputs.stampDuty)}
                    </span>
                  </div>
                  <div className="border-t border-[var(--border)] pt-2 flex justify-between font-semibold">
                    <span className="text-[var(--text-primary)]">Total Cost</span>
                    <span className="text-[var(--gold)]">{formatCurrency(outputs.allInCost)}</span>
                  </div>
                </div>

                <div className="bg-[var(--bg-card)] rounded p-3 space-y-2">
                  <h4 className="text-xs font-bold text-[var(--gold)] uppercase">Loan Details</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Down Payment</span>
                      <span className="text-[var(--text-primary)] font-semibold">
                        {formatCurrency(outputs.downPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-secondary)]">Loan Amount</span>
                      <span className="text-[var(--text-primary)] font-semibold">
                        {formatCurrency(outputs.loanAmount)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--gold)] bg-opacity-20 border border-[var(--gold)] rounded p-3">
                  <p className="text-xs text-[var(--text-secondary)] mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-[var(--gold)]">
                    {formatEmi(outputs.monthlyEmi)}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-[var(--border)] p-6 space-y-3">
        <button
          onClick={handleWhatsAppClick}
          className="w-full px-4 py-3 bg-[var(--gold)] text-[var(--text-dark)] rounded-lg font-inter font-semibold hover:shadow-lg hover:shadow-[var(--gold)]/30 transition-all duration-300"
        >
          Talk to Our Home Loan Expert →
        </button>
        <button
          onClick={closeCalculator}
          className="w-full px-4 py-3 border border-[var(--gold)] text-[var(--gold)] rounded-lg font-inter font-semibold hover:bg-[var(--gold)] hover:text-[var(--text-dark)] transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
