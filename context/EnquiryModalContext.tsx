'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EnquiryModalContextType {
  isOpen: boolean;
  openEnquiry: () => void;
  closeEnquiry: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export function EnquiryModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.enquiryOpen = isOpen ? 'true' : '';
    document.body.classList.toggle('enquiry-open', isOpen);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else if (document.body.dataset.calculatorOpen !== 'true') {
      document.body.style.overflow = '';
    }
    return () => {
      delete document.body.dataset.enquiryOpen;
      document.body.classList.remove('enquiry-open');
      if (document.body.dataset.calculatorOpen !== 'true') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  const openEnquiry = () => setIsOpen(true);
  const closeEnquiry = () => setIsOpen(false);

  return (
    <EnquiryModalContext.Provider value={{ isOpen, openEnquiry, closeEnquiry }}>
      {children}
    </EnquiryModalContext.Provider>
  );
}

export function useEnquiryModal() {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within EnquiryModalProvider');
  }
  return context;
}
