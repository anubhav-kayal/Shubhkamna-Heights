import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CalculatorProvider } from '@/context/CalculatorContext';
import AppShell from '@/components/layout/AppShell';
import { PROJECT_DATA } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shubh Kamna Heights | 2BHK & 3BHK Flats in Chandauli, UP',
    template: '%s | Shubh Kamna Heights',
  },
  description:
    'Premium residential project near Varanasi. 2BHK & 3BHK homes at NH-2 Chandauli. RERA registered UPRERAPRJ757815/04/2025. VDA approved. 1000+ families.',
  keywords: [
    'Shubh Kamna Heights',
    'flats in Chandauli',
    'PDDU Nagar property',
    '2BHK 3BHK near Varanasi',
    'NH-2 Chandauli housing',
    'residential project',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shubh Kamna Heights | Crafted for Comfort. Designed for Life.',
    description:
      'Premium 2BHK & 3BHK homes near Varanasi at NH-2 Chandauli. Explore floor plans, pricing, amenities, and book a visit.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Shubh Kamna Heights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubh Kamna Heights | 2BHK & 3BHK Flats in Chandauli',
    description:
      'Premium homes at NH-2 Chandauli with 65%+ open space, lifestyle amenities, and direct connectivity to Varanasi.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="h-full w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Residence',
              name: PROJECT_DATA.name,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Arazi No. 538MI, 542MI, 546, 547, Mauja-Godhana',
                addressLocality: 'Chandauli',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN',
              },
              telephone: PROJECT_DATA.contactPhone.replace(/\s+/g, ''),
              url: SITE_URL,
            }),
          }}
        />
        <CalculatorProvider>
          <AppShell>{children}</AppShell>
        </CalculatorProvider>
      </body>
    </html>
  );
}
