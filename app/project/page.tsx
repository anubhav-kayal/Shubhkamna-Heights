import type { Metadata } from 'next';
import ProjectVideoSection from '@/components/sections/ProjectVideoSection';
import ProjectOverviewSection from '@/components/sections/ProjectOverviewSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import FloorPlansSection from '@/components/sections/FloorPlansSection';
import GallerySection from '@/components/sections/GallerySection';
import SpecificationsSection from '@/components/sections/SpecificationsSection';
import CertificatesBanner from '@/components/sections/CertificatesBanner';
import TieUpBanksSection from '@/components/sections/TieUpBanksSection';
import LocationSection from '@/components/sections/LocationSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import VideoTestimonialsSection from '@/components/sections/VideoTestimonialsSection';
import Footer from '@/components/sections/Footer';
import { getAbsoluteUrl } from '@/lib/site';
import { getGalleryImages, getAmenities, getFloorPlans, getBanks, getHeroSettings } from '@/lib/firestore';
import { resolveGallery, resolveAmenities, resolveFloorPlans, resolveBanks } from '@/lib/fallbacks';

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

export default async function ProjectPage() {
  const [galleryRaw, amenitiesRaw, floorPlans2BHK, floorPlans3BHK, banksRaw, heroSettings] =
    await Promise.all([
      getGalleryImages(),
      getAmenities(),
      getFloorPlans('2BHK'),
      getFloorPlans('3BHK'),
      getBanks(),
      getHeroSettings(),
    ]);

  const initialGallery = resolveGallery(galleryRaw);
  const initialAmenities = resolveAmenities(amenitiesRaw);
  const initialFloorPlans2BHK = resolveFloorPlans(floorPlans2BHK, '2BHK');
  const initialFloorPlans3BHK = resolveFloorPlans(floorPlans3BHK, '3BHK');
  const initialBanks = resolveBanks(banksRaw);

  return (
    <>
      <ProjectVideoSection
        className="pt-[calc(var(--site-header-height)+2rem)] sm:pt-[calc(var(--site-header-height)+2.75rem)]"
        initialSettings={heroSettings}
      />
      <ProjectOverviewSection />
      <AmenitiesSection initialData={initialAmenities} />
      <FloorPlansSection
        initialData2BHK={initialFloorPlans2BHK}
        initialData3BHK={initialFloorPlans3BHK}
      />
      <GallerySection initialData={initialGallery} />
      <SpecificationsSection />
      <CertificatesBanner />
      <TieUpBanksSection initialData={initialBanks} />
      <LocationSection />
      <AboutSection />
      <TestimonialsSection />
      <VideoTestimonialsSection />
      <Footer />
    </>
  );
}
