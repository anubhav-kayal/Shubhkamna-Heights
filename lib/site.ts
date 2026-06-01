import type { BlogPost, FirestoreDateLike } from '@/types';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://shubhkamnaheights.vercel.app';

export const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'fallback-1',
    title: 'Why Chandauli Is Emerging as a Smarter Residential Bet',
    slug: 'why-chandauli-is-emerging-as-a-smarter-residential-bet',
    excerpt:
      'Connectivity, lower entry cost, and expanding civic infrastructure are making Chandauli a serious consideration for end users and long-horizon buyers.',
    coverImage: '',
    author: 'Shubh Kamna Editorial',
    publishedAt: new Date('2025-04-12'),
    category: 'Market Insights',
    content: `
      <p>For families looking beyond crowded city cores, Chandauli is no longer a peripheral choice. Its access to the 8-lane NH-2 corridor, improving civic links, and proximity to Varanasi make it increasingly practical for daily life.</p>
      <p>What matters in residential decision-making is not only price. Buyers also look at travel time, future infrastructure, open space, and whether a project feels built for actual living instead of speculative flipping. That is where integrated developments gain an edge.</p>
      <p>Projects that combine regulated approvals, better ventilation, shared amenities, and structured community planning are likely to stand out as this micro-market matures.</p>
    `,
    published: true,
  },
  {
    id: 'fallback-2',
    title: 'What Families Should Actually Compare Before Booking a Flat',
    slug: 'what-families-should-actually-compare-before-booking-a-flat',
    excerpt:
      'Carpet area, structure quality, approvals, loan support, and recurring livability matter more than showroom finishes.',
    coverImage: '',
    author: 'Shubh Kamna Editorial',
    publishedAt: new Date('2025-03-28'),
    category: 'Homebuying Guide',
    content: `
      <p>The first comparison most buyers make is price per square foot. It is useful, but incomplete. You should compare what you truly receive in usable area, structural quality, loan accessibility, and maintenance practicality.</p>
      <p>Look for clarity on approvals, the construction system, backup provisions, parking strategy, water planning, and how the project handles ventilation and open space. These decisions shape daily experience far more than staged sample interiors.</p>
      <p>A disciplined purchase process reduces regret. Ask sharper questions early and you avoid expensive surprises later.</p>
    `,
    published: true,
  },
  {
    id: 'fallback-3',
    title: 'How to Read EMI Affordability Without Misleading Yourself',
    slug: 'how-to-read-emi-affordability-without-misleading-yourself',
    excerpt:
      'Affordability is not just EMI. Down payment, taxes, processing charges, and contingency buffer need to be part of the same calculation.',
    coverImage: '',
    author: 'Shubh Kamna Editorial',
    publishedAt: new Date('2025-02-17'),
    category: 'Finance',
    content: `
      <p>Many buyers only test whether the monthly EMI looks manageable. That is necessary, but it is not sufficient. A realistic affordability review includes your down payment, registration costs, taxes, furnishing reserve, and an emergency cash buffer.</p>
      <p>If a property becomes viable only when every assumption is stretched, it is not comfortably affordable. Better planning comes from comparing multiple tenure options and stress-testing the monthly outflow against actual household commitments.</p>
      <p>An EMI calculator helps, but the right use of that calculator is what protects you.</p>
    `,
    published: true,
  },
];

export function toDate(value: FirestoreDateLike | null | undefined): Date {
  if (!value) {
    return new Date();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }

  return new Date(value);
}

export function formatDisplayDate(value: FirestoreDateLike | null | undefined): string {
  return toDate(value).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getBlogPostsWithFallback(posts: BlogPost[]): BlogPost[] {
  return posts.length > 0 ? posts : FALLBACK_BLOG_POSTS;
}

export function getBlogPostWithFallback(posts: BlogPost[], slug: string): BlogPost | null {
  return getBlogPostsWithFallback(posts).find((post) => post.slug === slug) ?? null;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAbsoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
