import type { Bank } from '@/types';

/** Tie-up partners shown on the project page (logos in /public/images/banks/). */
export const BANK_PARTNERS: Omit<Bank, 'interestRate' | 'maxLoanAmount' | 'processingFee'>[] = [
  { id: 'uco', name: 'UCO Bank', logoUrl: '/images/banks/uco.svg' },
  { id: 'sbi', name: 'State Bank of India', logoUrl: '/images/banks/sbi.svg' },
  { id: 'icici', name: 'ICICI Bank', logoUrl: '/images/banks/icici.svg' },
  { id: 'boi', name: 'Bank of India', logoUrl: '/images/banks/boi.svg' },
  { id: 'ubi', name: 'Union Bank of India', logoUrl: '/images/banks/ubi.svg' },
  { id: 'pnb', name: 'Punjab National Bank', logoUrl: '/images/banks/pnb.svg' },
  { id: 'bob', name: 'Bank of Baroda', logoUrl: '/images/banks/bob.svg' },
  { id: 'axis', name: 'Axis Bank', logoUrl: '/images/banks/axis.svg' },
  { id: 'hdfc', name: 'HDFC Bank', logoUrl: '/images/banks/hdfc.svg' },
];

export function toFallbackBanks(): Bank[] {
  return BANK_PARTNERS.map((bank) => ({
    ...bank,
    interestRate: 0,
    maxLoanAmount: 0,
    processingFee: 0,
  }));
}
