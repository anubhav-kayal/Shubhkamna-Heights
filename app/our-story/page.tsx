import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, Heart, MapPin, Shield } from 'lucide-react';
import { PROJECT_DATA } from '@/lib/constants';
import { getPlaceholderUrl } from '@/lib/placeholders';
import { getAbsoluteUrl } from '@/lib/site';
import {
  BadgePill,
  BtnRow,
  EditorialHero,
  HeadingLight,
  KickerLight,
  LightCard,
  PageContainer,
  SectionCopy,
} from '@/components/ui/design';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Discover the vision, values, and team behind Shubh Kamna Heights — a regulated residential community on NH-2, Chandauli.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    title: 'Our Story | Shubh Kamna Heights',
    description:
      'Built on trust at the NH-2 corridor — learn how Shubh Kamna Heights is shaping comfortable, connected living in Chandauli.',
    url: getAbsoluteUrl('/our-story'),
    type: 'website',
  },
};

const MILESTONES = [
  {
    year: '2023',
    title: 'Vision on NH-2',
    detail:
      'Land aggregation and master planning began with a focus on regulated approvals, open space, and practical family layouts.',
  },
  {
    year: '2024',
    title: 'Approvals & partnerships',
    detail:
      'RERA registration, authority clearances, and tie-ups with leading banks strengthened buyer confidence.',
  },
  {
    year: '2025',
    title: 'Community scale-up',
    detail:
      'Amenity planning, sample experiences, and on-site walkthroughs helped families evaluate livability beyond brochures.',
  },
  {
    year: '2026',
    title: 'Booking phase',
    detail:
      'Inventory for 2BHK and 3BHK homes is now open with transparent costing tools and editorial guidance for buyers.',
  },
];

const VALUES = [
  {
    icon: Shield,
    title: 'Trust first',
    detail:
      'Regulated credentials, clear documentation, and honest conversations—not pressure tactics.',
  },
  {
    icon: Heart,
    title: 'Built for families',
    detail:
      'Layouts, ventilation, and amenities designed around daily routines, not just sales events.',
  },
  {
    icon: MapPin,
    title: 'Connected living',
    detail:
      'NH-2 access with Chandauli calm—proximity to Varanasi without surrendering open space at home.',
  },
  {
    icon: Building2,
    title: 'Long-term quality',
    detail:
      'Structure, finishes, and maintenance thinking that holds up years after possession—not just handover day.',
  },
];

export default function OurStoryPage() {
  const heroImage = getPlaceholderUrl('hero');

  return (
    <div className="min-h-screen bg-bg-light text-text-dark">
      <EditorialHero>
        <PageContainer>
          <BadgePill className="border border-gold/30 bg-gold/10 text-gold-dark">
            Our Story
          </BadgePill>
          <h1 className="mt-4 font-cormorant text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-text-dark">
            Built on Trust. Designed for Generations.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-on-light">
            Shubh Kamna Heights is more than a residential launch on NH-2—it is a commitment to
            comfortable, regulated, community-first living in Chandauli.
          </p>
        </PageContainer>
      </EditorialHero>

      <PageContainer className="space-y-14 py-10 sm:space-y-16 sm:py-14">
        <section className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <LightCard className="relative min-h-[16rem] overflow-hidden lg:min-h-[24rem]">
            <Image
              src={heroImage}
              alt="Shubh Kamna Heights residential community"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </LightCard>
          <div className="flex flex-col justify-center">
            <HeadingLight>Why we started here</HeadingLight>
            <SectionCopy className="mt-4 text-muted-on-light">
              Families along the Varanasi–Chandauli corridor deserved a product that felt
              intentional: regulated approvals, generous open space, and homes planned for real
              ventilation—not speculative boxes stacked for brochures.
            </SectionCopy>
            <SectionCopy className="mt-4 text-muted-on-light">
              Our team brings together development experience, on-ground site discipline, and a
              buyer-first sales process. We publish guidance openly because informed customers make
              better neighbors—and stronger communities.
            </SectionCopy>
            <p className="mt-5 text-sm text-subtle-on-light">
              RERA: {PROJECT_DATA.reraNumber} · VDA Approved · CREDAI {PROJECT_DATA.credaiText}
            </p>
          </div>
        </section>

        <section>
          <HeadingLight className="text-center">What we stand for</HeadingLight>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {VALUES.map(({ icon: Icon, title, detail }) => (
              <LightCard key={title} className="p-6">
                <div className="mb-4 inline-flex rounded-xl border border-border-on-light bg-gold/10 p-3 text-gold-dark">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-text-dark">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-on-light">{detail}</p>
              </LightCard>
            ))}
          </div>
        </section>

        <section>
          <HeadingLight>Milestones (placeholder timeline)</HeadingLight>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-on-light">
            This timeline uses representative milestones while final corporate history is
            prepared. Firebase-backed content can replace these entries later.
          </p>
          <ol className="mt-8 space-y-6 border-l border-border-on-light pl-6">
            {MILESTONES.map((item) => (
              <li key={item.year} className="relative">
                <span className="absolute top-1 -left-[calc(1.5rem+1px)] h-3 w-3 rounded-full border-2 border-gold-dark bg-bg-light" />
                <span className="font-inter text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  {item.year}
                </span>
                <h3 className="mt-1 font-cormorant text-xl font-semibold text-text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-on-light">{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <LightCard className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <HeadingLight>See the story on site</HeadingLight>
            <p className="mt-3 text-sm leading-relaxed text-muted-on-light">
              Walk the master plan, sample the light in actual towers, and compare 2BHK & 3BHK
              formats with our team. The project speaks louder in person than on any page.
            </p>
          </div>
          <BtnRow className="shrink-0">
            <Link
              href="/#floor-plans"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/50 bg-gradient-to-br from-gold to-gold-light px-5 py-3 font-inter text-sm font-semibold text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)]"
            >
              View Floor Plans
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-on-light bg-white px-5 py-3 font-inter text-sm font-semibold text-gold-dark transition-all duration-200 hover:border-gold-dark hover:bg-gold/5"
            >
              Read the Blog
            </Link>
          </BtnRow>
        </LightCard>
      </PageContainer>
    </div>
  );
}
