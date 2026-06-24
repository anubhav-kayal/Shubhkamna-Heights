import type { MetadataRoute } from 'next';
import { PROJECT_DATA } from '@/lib/constants';
import { SITE_LOGO } from '@/lib/branding';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PROJECT_DATA.name,
    short_name: 'Shubh Kamna',
    description:
      'Premium 2BHK & 3BHK homes near Varanasi at NH-2 Chandauli. Explore floor plans, pricing, amenities, and book a visit.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F5F0',
    theme_color: '#C9A84C',
    icons: [
      {
        src: SITE_LOGO.url,
        sizes: '466x138',
        type: 'image/png',
      },
    ],
  };
}
