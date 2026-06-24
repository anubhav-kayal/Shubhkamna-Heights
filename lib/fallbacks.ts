import { toFallbackBanks } from '@/lib/bank-partners';
import { AMENITIES_LIST, VIDEO_TESTIMONIAL_MEDIA } from '@/lib/constants';
import { buildOfficialFloorPlans } from '@/lib/flat-pricing';
import { GALLERY_FALLBACK_ITEMS } from '@/lib/project-images';
import { getPlaceholderUrl, resolveImageUrl } from '@/lib/placeholders';
import { FALLBACK_BLOG_POSTS } from '@/lib/site';
import type { Amenity, Bank, BlogPost, FloorPlan, GalleryImage, Testimonial, VideoTestimonial } from '@/types';
import type { Specification } from '@/types';

export const OFFICIAL_FLOOR_PLANS = buildOfficialFloorPlans((unitId) =>
  getPlaceholderUrl('floorPlan', unitId),
);

export const FALLBACK_FLOOR_PLANS = OFFICIAL_FLOOR_PLANS;

export const FALLBACK_GALLERY: GalleryImage[] = GALLERY_FALLBACK_ITEMS.map((item, i) => ({
  id: `gallery-fallback-${i}`,
  imageUrl: item.imageUrl,
  category: item.category,
  caption: item.caption,
  order: i,
  active: true,
}));

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

export const FALLBACK_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vt1',
    name: 'Rajesh Kumar',
    flatType: '3BHK',
    profession: 'Business Owner',
    quote:
      'The open space and NH connectivity made this an easy choice for our family. We feel at home here.',
    videoUrl: VIDEO_TESTIMONIAL_MEDIA.rajesh,
    active: true,
  },
  {
    id: 'vt2',
    name: 'Priya Singh',
    flatType: '2BHK',
    profession: 'School Teacher',
    quote:
      'From booking to possession updates, the team was transparent. The community feels safe and well planned.',
    videoUrl: VIDEO_TESTIMONIAL_MEDIA.priya,
    active: true,
  },
  {
    id: 'vt3',
    name: 'Amit Patel',
    flatType: '3BHK',
    profession: 'Software Engineer',
    quote:
      'Schools, markets, and the highway are all close by. It is the kind of address we wanted for the long term.',
    videoUrl: VIDEO_TESTIMONIAL_MEDIA.amit,
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
    imageUrl: resolveImageUrl(plan.imageUrl, 'floorPlan', plan.id),
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
  const official = OFFICIAL_FLOOR_PLANS[bhkType];
  const cmsById = new Map(
    data.filter((plan) => plan.type === bhkType).map((plan) => [plan.id, plan]),
  );

  const plans = official.map((plan) => {
    const cmsPlan = cmsById.get(plan.id);
    if (!cmsPlan) return plan;

    return {
      ...plan,
      imageUrl: cmsPlan.imageUrl || plan.imageUrl,
    };
  });

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

export function resolveVideoTestimonials(data: VideoTestimonial[]): VideoTestimonial[] {
  return data.length > 0 ? data : FALLBACK_VIDEO_TESTIMONIALS;
}

export function resolveSpecifications(data: Specification[]): Specification[] {
  return data.length > 0 ? data : FALLBACK_SPECIFICATIONS;
}

export function resolveBlogPosts(data: BlogPost[], limit?: number): BlogPost[] {
  const posts = mapBlogCovers(data.length > 0 ? data : FALLBACK_BLOG_POSTS);
  return limit ? posts.slice(0, limit) : posts;
}
