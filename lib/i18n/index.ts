import { en, type TranslationTree } from './translations/en';
import { hi } from './translations/hi';

export type Locale = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export const LOCALES: { id: Locale; labelKey: 'languageEn' | 'languageHi' }[] = [
  { id: 'en', labelKey: 'languageEn' },
  { id: 'hi', labelKey: 'languageHi' },
];

export const translations: Record<Locale, TranslationTree> = { en, hi };

export const DEFAULT_LOCALE: Locale = 'en';
export const DEFAULT_THEME: Theme = 'light';

const STORAGE_THEME = 'skh-theme';
const STORAGE_LOCALE = 'skh-locale';

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_THEME);
  return v === 'light' || v === 'dark' ? v : null;
}

export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_LOCALE);
  return v === 'en' || v === 'hi' ? v : null;
}

export function persistTheme(theme: Theme) {
  localStorage.setItem(STORAGE_THEME, theme);
}

export function persistLocale(locale: Locale) {
  localStorage.setItem(STORAGE_LOCALE, locale);
}

type Primitive = string | number;

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function translate(
  locale: Locale,
  key: string,
  params?: Record<string, Primitive>,
): string {
  let value = getByPath(translations[locale], key);
  if (typeof value !== 'string') {
    value = getByPath(translations.en, key);
  }
  if (typeof value !== 'string') {
    return key;
  }
  if (!params) return value;
  return Object.entries(params).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
    value,
  );
}
