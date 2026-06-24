import type { Bank } from '@/types';

/** Tie-up partners shown on the project page (logos in /public/images/banks/). */
export const BANK_PARTNERS: Omit<Bank, 'interestRate' | 'maxLoanAmount' | 'processingFee'>[] = [
  { id: 'uco', name: 'UCO Bank', logoUrl: '/images/banks/UCO-Bank-Logo.webp' },
  { id: 'sbi', name: 'State Bank of India', logoUrl: '/images/banks/sbi-logo.webp' },
  { id: 'icici', name: 'ICICI Bank', logoUrl: '/images/banks/icici-logo.webp' },
  { id: 'boi', name: 'Bank of India', logoUrl: '/images/banks/boi-logo.webp' },
  { id: 'ubi', name: 'Union Bank of India', logoUrl: '/images/banks/ubi-logo.webp' },
  { id: 'pnb', name: 'Punjab National Bank', logoUrl: '/images/banks/pnb-logo.webp' },
  { id: 'bob', name: 'Bank of Baroda', logoUrl: '/images/banks/bob-logo.webp' },
  { id: 'axis', name: 'Axis Bank', logoUrl: '/images/banks/axis-logo.webp' },
  { id: 'hdfc', name: 'HDFC Bank', logoUrl: '/images/banks/hdfc-logo.webp' },
];

export function toFallbackBanks(): Bank[] {
  return BANK_PARTNERS.map((bank) => ({
    ...bank,
    interestRate: 0,
    maxLoanAmount: 0,
    processingFee: 0,
  }));
}
