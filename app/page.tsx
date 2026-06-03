import HeroSection from '@/components/sections/HeroSection';
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
import EnquirySection from '@/components/sections/EnquirySection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectVideoSection />
      <ProjectOverviewSection />
      <AmenitiesSection />
      <FloorPlansSection />
      <GallerySection />
      <SpecificationsSection />
      <TieUpBanksSection />
      <LocationSection />
      <AboutSection />
      <TestimonialsSection />
      <EnquirySection />
      <Footer />
    </>
  );
}
