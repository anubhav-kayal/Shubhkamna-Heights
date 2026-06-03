import Footer from '@/components/sections/Footer';

export default function OurStoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-light text-text-dark">
      {children}
      <Footer />
    </div>
  );
}
