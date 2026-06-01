'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/sections/Navbar';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import CostCalculatorWidget from '@/components/ui/CostCalculatorWidget';
import ExitIntentModal from '@/components/ui/ExitIntentModal';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className="relative w-full">{children}</main>
      {!isAdminRoute && (
        <>
          <WhatsAppFAB />
          <CostCalculatorWidget />
          <ExitIntentModal />
        </>
      )}
    </>
  );
}
