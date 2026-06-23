import type { Metadata } from 'next';
import OurStoryClient from '@/components/our-story/OurStoryClient';
import { getPlaceholderUrl } from '@/lib/placeholders';
import { getAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Discover the vision behind Shubhkamna Heights — a thoughtfully planned residential community on the National Highway, Chandauli, built for every generation.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    title: 'Our Story | Shubh Kamna Heights',
    description:
      'From our roots in Chandauli to modern homes on the NH corridor — learn how Shubhkamna Heights is shaping quality living in Eastern Uttar Pradesh.',
    url: getAbsoluteUrl('/our-story'),
    type: 'website',
  },
};

export default function OurStoryPage() {
  const heroImage = getPlaceholderUrl('hero');
  return <OurStoryClient heroImage={heroImage} />;
}
