'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/sections/Navbar';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import CostCalculatorWidget from '@/components/ui/CostCalculatorWidget';
import EnquiryModal from '@/components/ui/EnquiryModal';
import ExitIntentModal from '@/components/ui/ExitIntentModal';
import { cn } from '@/lib/cn';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main
        className={cn(
          'relative w-full min-w-0 overflow-x-clip',
          !isAdminRoute &&
            'pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))] sm:pb-[calc(2rem+env(safe-area-inset-bottom,0px))]',
        )}
      >
        {children}
      </main>
      {!isAdminRoute && (
        <>
          <WhatsAppFAB />
          <CostCalculatorWidget />
          <EnquiryModal />
          <ExitIntentModal />
        </>
      )}
    </>
  );
}
