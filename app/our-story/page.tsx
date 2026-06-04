import type { Metadata } from 'next';
import OurStoryClient from '@/components/our-story/OurStoryClient';
import { getPlaceholderUrl } from '@/lib/placeholders';
import { getAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Discover the vision, values, and team behind Shubh Kamna Heights, a regulated residential community on NH-2, Chandauli.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    title: 'Our Story | Shubh Kamna Heights',
    description:
      'Built on trust at the NH-2 corridor. Learn how Shubh Kamna Heights is shaping comfortable, connected living in Chandauli.',
    url: getAbsoluteUrl('/our-story'),
    type: 'website',
  },
};

export default function OurStoryPage() {
  const heroImage = getPlaceholderUrl('hero');
  return <OurStoryClient heroImage={heroImage} />;
}
