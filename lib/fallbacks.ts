import { toFallbackBanks } from '@/lib/bank-partners';
import { AMENITIES_LIST } from '@/lib/constants';
import { getPlaceholderUrl, resolveImageUrl } from '@/lib/placeholders';
import { FALLBACK_BLOG_POSTS } from '@/lib/site';
import type { Amenity, Bank, BlogPost, FloorPlan, GalleryImage, Testimonial } from '@/types';
import type { Specification } from '@/types';

export const FALLBACK_FLOOR_PLANS: Record<'2BHK' | '3BHK', FloorPlan[]> = {
  '2BHK': [
    {
      id: 'fallback-2bhk',
      type: '2BHK',
      imageUrl: getPlaceholderUrl('floorPlan', '2BHK'),
      carpetArea: 800,
      superArea: 980,
      price: 3200000,
      active: true,
    },
  ],
  '3BHK': [
    {
      id: 'fallback-3bhk',
      type: '3BHK',
      imageUrl: getPlaceholderUrl('floorPlan', '3BHK'),
      carpetArea: 1200,
      superArea: 1480,
      price: 5200000,
      active: true,
    },
  ],
};

export const FALLBACK_GALLERY: GalleryImage[] = Array.from({ length: 6 }, (_, i) => {
  const category = ['Exterior', 'Interior', 'Amenities', 'Views'][i % 4];
  return {
    id: `gallery-fallback-${i}`,
    imageUrl: resolveImageUrl('', 'gallery', `${category}-${i}`),
    category,
    caption: `Project view ${i + 1}`,
    order: i,
    active: true,
  };
});

export const FALLBACK_AMENITIES: Amenity[] = AMENITIES_LIST.map((name, idx) => ({
  id: `amenity-fallback-${idx}`,
  title: name,
  description: `Experience our ${name.toLowerCase()}`,
  iconName: name,
  imageUrl: resolveImageUrl('', 'amenity', name),
  order: idx,
}));

export const FALLBACK_BANKS: Bank[] = toFallbackBanks();

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    flatType: '3BHK',
    quote:
      'Shubh Kamna Heights exceeded our expectations. The location, open space, and planning feel thoughtful and premium.',
    rating: 5,
    active: true,
  },
  {
    id: 't2',
    name: 'Priya Singh',
    flatType: '2BHK',
    quote:
      'The entire booking process was smooth and transparent. The team was professional and responsive throughout.',
    rating: 5,
    active: true,
  },
  {
    id: 't3',
    name: 'Amit Patel',
    flatType: '3BHK',
    quote:
      'Amenities and green cover stand out. It feels like a community address, not just another apartment block.',
    rating: 4,
    active: true,
  },
];

export const FALLBACK_SPECIFICATIONS: Specification[] = [
  {
    id: 'spec-1',
    category: 'STRUCTURE',
    items: [
      { label: 'Steel', value: 'Tata' },
      { label: 'Cement', value: 'Shree Cement' },
      { label: 'Frame', value: 'Earthquake resistant, IIT BHU vetted' },
    ],
    order: 1,
  },
  {
    id: 'spec-2',
    category: 'FLOORING',
    items: [
      { label: 'Living & Dining', value: '4×2 Glazed Vitrified Tiles' },
      { label: 'Bedrooms', value: '4×2 Glazed Vitrified Tiles' },
      { label: 'Toilet', value: 'Anti Skid Ceramic Tiles' },
    ],
    order: 2,
  },
  {
    id: 'spec-3',
    category: 'ELECTRICAL & PLUMBING',
    items: [
      { label: 'Wires', value: 'Anchor' },
      { label: 'Plumbing', value: 'Astral Pipes' },
      { label: 'Supply', value: '3-Phase with concealed wiring' },
      { label: 'Bedrooms', value: 'AC wiring with AC point' },
      { label: 'Kitchen', value: 'Multiple power points + geyser point' },
    ],
    order: 3,
  },
  {
    id: 'spec-4',
    category: 'FITTINGS & FINISHES',
    items: [
      { label: 'Bathroom fittings', value: 'Jaguar' },
      { label: 'Plywood', value: 'Greenply' },
    ],
    order: 4,
  },
];

function mapFloorPlanImages(plans: FloorPlan[]): FloorPlan[] {
  return plans.map((plan) => ({
    ...plan,
    imageUrl: resolveImageUrl(plan.imageUrl, 'floorPlan', plan.type),
  }));
}

function mapGalleryImages(images: GalleryImage[]): GalleryImage[] {
  return images.map((image, i) => ({
    ...image,
    imageUrl: resolveImageUrl(image.imageUrl, 'gallery', `${image.category}-${i}`),
  }));
}

function mapAmenityImages(amenities: Amenity[]): Amenity[] {
  return amenities.map((amenity, i) => ({
    ...amenity,
    imageUrl: resolveImageUrl(amenity.imageUrl, 'amenity', amenity.title || i),
  }));
}

function mapBankLogos(banks: Bank[]): Bank[] {
  return banks.map((bank) => {
    const localLogo = bank.logoUrl?.startsWith('/images/banks/');
    return {
      ...bank,
      logoUrl: localLogo ? bank.logoUrl : resolveImageUrl(bank.logoUrl, 'bank', bank.id || bank.name),
    };
  });
}

function mapBlogCovers(posts: BlogPost[]): BlogPost[] {
  return posts.map((post, i) => ({
    ...post,
    coverImage: resolveImageUrl(post.coverImage, 'blog', post.slug || i),
  }));
}

export function resolveFloorPlans(
  data: FloorPlan[],
  bhkType: '2BHK' | '3BHK'
): FloorPlan[] {
  const matching = data.filter((plan) => plan.type === bhkType);
  const plans = matching.length > 0 ? matching : FALLBACK_FLOOR_PLANS[bhkType];
  return mapFloorPlanImages(plans);
}

export function resolveGallery(data: GalleryImage[]): GalleryImage[] {
  const images = data.length > 0 ? data : FALLBACK_GALLERY;
  return mapGalleryImages(images);
}

export function resolveAmenities(data: Amenity[]): Amenity[] {
  const amenities = data.length > 0 ? data : FALLBACK_AMENITIES;
  return mapAmenityImages(amenities);
}

export function resolveBanks(data: Bank[]): Bank[] {
  const banks = data.length > 0 ? data : FALLBACK_BANKS;
  return mapBankLogos(banks);
}

export function resolveTestimonials(data: Testimonial[]): Testimonial[] {
  return data.length > 0 ? data : FALLBACK_TESTIMONIALS;
}

export function resolveSpecifications(data: Specification[]): Specification[] {
  return data.length > 0 ? data : FALLBACK_SPECIFICATIONS;
}

export function resolveBlogPosts(data: BlogPost[], limit?: number): BlogPost[] {
  const posts = mapBlogCovers(data.length > 0 ? data : FALLBACK_BLOG_POSTS);
  return limit ? posts.slice(0, limit) : posts;
}
