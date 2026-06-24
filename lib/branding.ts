import type { Metadata } from 'next';
import { PROJECT_DATA } from '@/lib/constants';
import { getAbsoluteUrl } from '@/lib/site';

export const SITE_LOGO = {
  url: PROJECT_DATA.logoUrl,
  alt: PROJECT_DATA.name,
  width: 466,
  height: 138,
} as const;

export const SITE_ICON_METADATA: NonNullable<Metadata['icons']> = {
  icon: SITE_LOGO.url,
  shortcut: SITE_LOGO.url,
  apple: SITE_LOGO.url,
};

export const SITE_OG_IMAGE = {
  url: getAbsoluteUrl(SITE_LOGO.url),
  width: SITE_LOGO.width,
  height: SITE_LOGO.height,
  alt: SITE_LOGO.alt,
};
