'use client';

import { startTransition, useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { isCurrentUserAdmin } from '@/lib/firestore';

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

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      startTransition(() => {
        router.replace('/admin/login');
      });
      return;
    }

    const verifyAccess = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAccessDenied(false);
        startTransition(() => {
          router.replace('/admin/login');
        });
        return;
      }

      const isAdmin = await isCurrentUserAdmin();
      if (!isAdmin) {
        setIsReady(false);
        setAccessDenied(true);
        return;
      }

      setAccessDenied(false);
      setIsReady(true);
    };

    void verifyAccess();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void verifyAccess();
    });

    return () => {
      subscription.unsubscribe();
    };
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
            Your account is signed in but is not listed in{' '}
            <code className="text-[var(--gold)]">admin_users</code>. Ask the Supabase administrator
            to grant CMS access.
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
