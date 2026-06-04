'use client';

import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from '@/context/LocaleContext';
import { LOCALES, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/cn';

export default function ThemeLocaleControls({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="flex items-center border border-border-gold bg-bg-card/80 p-0.5"
        role="group"
        aria-label="Language"
      >
        {LOCALES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id)}
            className={cn(
              ' px-2.5 py-1 font-inter text-[0.625rem] font-bold uppercase tracking-wide transition-colors sm:px-3 sm:text-xs',
              locale === item.id
                ? 'bg-gold text-text-dark'
                : 'text-text-secondary hover:text-text-primary',
            )}
            aria-pressed={locale === item.id}
          >
            {item.id === 'en' ? 'EN' : 'हि'}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        className="flex h-9 w-9 items-center justify-center border border-border-gold bg-bg-card/80 text-gold transition-colors hover:border-gold hover:bg-gold/10"
        aria-label={theme === 'light' ? t('common.themeDark') : t('common.themeLight')}
      >
        {theme === 'light' ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
      </button>
    </div>
  );
}

/** Compact row for mobile drawer */
export function ThemeLocaleControlsMobile() {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale, t } = useTranslation();

  return (
    <div className="mt-4 space-y-3 border border-border-gold bg-bg-card/50 p-4">
      <p className="flex items-center gap-2 font-inter text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
        <Languages size={14} />
        {locale === 'hi' ? 'भाषा' : 'Language'}
      </p>
      <div className="flex gap-2">
        {LOCALES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id as Locale)}
            className={cn(
              'flex-1 border py-2 text-sm font-semibold transition-colors',
              locale === item.id
                ? 'border-gold bg-gold/15 text-gold'
                : 'border-border-gold text-text-primary',
            )}
          >
            {t(`common.${item.labelKey}`)}
          </button>
        ))}
      </div>
      <p className="font-inter text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
        {locale === 'hi' ? 'थीम' : 'Theme'}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 border py-2 text-sm font-semibold',
            theme === 'light'
              ? 'border-gold bg-gold/15 text-gold'
              : 'border-border-gold text-text-primary',
          )}
        >
          <Sun size={16} />
          {t('common.themeLight')}
        </button>
        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 border py-2 text-sm font-semibold',
            theme === 'dark'
              ? 'border-gold bg-gold/15 text-gold'
              : 'border-border-gold text-text-primary',
          )}
        >
          <Moon size={16} />
          {t('common.themeDark')}
        </button>
      </div>
    </div>
  );
}
