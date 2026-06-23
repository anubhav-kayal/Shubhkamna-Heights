import type { Metadata } from 'next';
import ProjectVideoSection from '@/components/sections/ProjectVideoSection';
import ProjectOverviewSection from '@/components/sections/ProjectOverviewSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import FloorPlansSection from '@/components/sections/FloorPlansSection';
import GallerySection from '@/components/sections/GallerySection';
import SpecificationsSection from '@/components/sections/SpecificationsSection';
import TieUpBanksSection from '@/components/sections/TieUpBanksSection';
import LocationSection from '@/components/sections/LocationSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import VideoTestimonialsSection from '@/components/sections/VideoTestimonialsSection';
import Footer from '@/components/sections/Footer';
import { getAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The Project',
  description:
    'Explore Shubh Kamna Heights: floor plans, amenities, specifications, location, and financing on NH-2, Chandauli.',
  alternates: { canonical: '/project' },
  openGraph: {
    title: 'The Project | Shubh Kamna Heights',
    description: '2BHK & 3BHK homes, amenities, gallery, and connectivity at Shubh Kamna Heights.',
    url: getAbsoluteUrl('/project'),
    type: 'website',
  },
};

export default function ProjectPage() {
  return (
    <>
      <ProjectVideoSection className="pt-[calc(var(--site-header-height)+2rem)] sm:pt-[calc(var(--site-header-height)+2.75rem)]" />
      <ProjectOverviewSection />
      <AmenitiesSection />
      <FloorPlansSection />
      <GallerySection />
      <SpecificationsSection />
      <TieUpBanksSection />
      <LocationSection />
      <AboutSection />
      <TestimonialsSection />
      <VideoTestimonialsSection />
      <Footer />
    </>
  );
}
