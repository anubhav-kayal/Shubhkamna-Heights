'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/context/LocaleContext';
import { KickerLight } from '@/components/ui/design';

export function BlogPostBackLink() {
  const { t } = useTranslation();
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-gold"
    >
      <ArrowLeft size={16} />
      {t('sections.blogPost.back')}
    </Link>
  );
}

export function BlogPostReadTime({ minutes }: { minutes: number }) {
  const { t } = useTranslation();
  return (
    <>
      {minutes} {t('sections.blogPage.minRead')}
    </>
  );
}

export function BlogPostRelatedKicker() {
  const { t } = useTranslation();
  return <KickerLight className="mb-6">{t('sections.blogPost.relatedTitle')}</KickerLight>;
}
