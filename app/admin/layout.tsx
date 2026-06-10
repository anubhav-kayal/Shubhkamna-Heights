'use client';

import { startTransition, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

async function hasAdminClaim(user: User): Promise<boolean> {
  const token = await user.getIdTokenResult();
  return token.claims.admin === true;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [isReady, setIsReady] = useState(isLoginPage);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (isLoginPage) {
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAccessDenied(false);
        startTransition(() => {
          router.replace('/admin/login');
        });
        return;
      }

      try {
        const isAdmin = await hasAdminClaim(user);
        if (!isAdmin) {
          setIsReady(false);
          setAccessDenied(true);
          return;
        }

        setAccessDenied(false);
        setIsReady(true);
      } catch {
        setIsReady(false);
        setAccessDenied(true);
      }
    });

    return unsubscribe;
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return children;
  }

  if (accessDenied) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="max-w-md rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-8 py-6 text-center">
          <p className="font-cormorant text-3xl font-semibold text-[var(--gold)]">
            Access Denied
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Your account is signed in but does not have the admin custom claim. Contact the
            Firebase administrator to set <code className="text-[var(--gold)]">admin: true</code> on
            your user.
          </p>
        </div>
      </div>
    );
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
