'use client';

import type { LandingSettings } from '@/types';
import BlogSection from '@/components/sections/BlogSection';
import Footer from '@/components/sections/Footer';
import {
  LandingPremiumHero,
  LandingEmotionalSection,
  LandingBelief,
  LandingMatters,
  LandingHappiness,
  LandingCurated,
  LandingConversation,
} from '@/components/landing/LandingSections';

export default function LandingPage({ settings }: { settings: LandingSettings | null }) {
  return (
    <>
      <LandingPremiumHero settings={settings} />
      <LandingEmotionalSection settings={settings} />
      <LandingBelief />
      <LandingMatters />
      <LandingHappiness />
      <LandingCurated settings={settings} />
      <LandingConversation />
      <BlogSection />
      <Footer />
    </>
  );
}
