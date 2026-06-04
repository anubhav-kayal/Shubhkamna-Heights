import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CalculatorProvider } from '@/context/CalculatorContext';
import { EnquiryModalProvider } from '@/context/EnquiryModalContext';
import AppProviders from '@/components/providers/AppProviders';
import AppShell from '@/components/layout/AppShell';
import ThemeScript from '@/components/ThemeScript';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F5F0' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${inter.className} min-h-full w-full bg-bg-primary font-inter text-text-primary antialiased`}
      >
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
        <AppProviders>
          <CalculatorProvider>
            <EnquiryModalProvider>
              <AppShell>{children}</AppShell>
            </EnquiryModalProvider>
          </CalculatorProvider>
        </AppProviders>
      </body>
    </html>
  );
}
