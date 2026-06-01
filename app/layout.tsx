import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CalculatorProvider } from '@/context/CalculatorContext';
import Navbar from '@/components/sections/Navbar';
import WhatsAppFAB from '@/components/ui/WhatsAppFAB';
import CostCalculatorWidget from '@/components/ui/CostCalculatorWidget';
import ExitIntentModal from '@/components/ui/ExitIntentModal';
import { PROJECT_DATA } from '@/lib/constants';

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
  title: 'Shubh Kamna Heights | 2BHK & 3BHK Flats in Chandauli, UP',
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
  openGraph: {
    title: 'Shubh Kamna Heights — Crafted for Comfort',
    description: 'Premium 2BHK & 3BHK homes near Varanasi | RERA Registered',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
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
      style={{
        colorScheme: 'dark',
      }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A0A0F" />
        <link rel="manifest" href="/manifest.json" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateListing',
              name: PROJECT_DATA.name,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Arazi No. 538MI, 542MI, 546, 547, Mauja-Godhana',
                addressLocality: 'Chandauli',
                addressRegion: 'Uttar Pradesh',
                addressCountry: 'IN',
              },
              telephone: PROJECT_DATA.contactPhone,
              url: 'https://shubhkamnaheights.vercel.app',
            }),
          }}
        />
      </head>
      <body className="h-full w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <CalculatorProvider>
          <Navbar />
          <main className="relative w-full">{children}</main>
          <WhatsAppFAB />
          <CostCalculatorWidget />
          <ExitIntentModal />
        </CalculatorProvider>
      </body>
    </html>
  );
}
