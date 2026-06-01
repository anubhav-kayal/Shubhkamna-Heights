'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalculatorContextType {
  isOpen: boolean;
  openCalculator: () => void;
  closeCalculator: () => void;
  toggleCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCalculator = () => setIsOpen(true);
  const closeCalculator = () => setIsOpen(false);
  const toggleCalculator = () => setIsOpen(prev => !prev);

  return (
    <CalculatorContext.Provider value={{ isOpen, openCalculator, closeCalculator, toggleCalculator }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within CalculatorProvider');
  }
  return context;
}
