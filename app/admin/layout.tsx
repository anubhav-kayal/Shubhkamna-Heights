'use client';

import { startTransition, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [isReady, setIsReady] = useState(isLoginPage);

  useEffect(() => {
    if (isLoginPage) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsReady(true);
        return;
      }

      startTransition(() => {
        router.replace('/admin/login');
      });
    });

    return unsubscribe;
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return children;
  }

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-8 py-6 text-center">
          <p className="font-cormorant text-3xl font-semibold text-[var(--gold)]">
            Verifying Access
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Checking your admin session.
          </p>
        </div>
      </div>
    );
  }

  return children;
}
