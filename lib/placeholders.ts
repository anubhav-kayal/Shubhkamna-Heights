import { isSupabaseConfigured } from '@/lib/supabase/config';
import {
  getProjectAmenityImage,
  getProjectBlogCover,
  getProjectFloorPlanImage,
  getProjectGalleryImage,
  getProjectHeroImage,
  getProjectPromoterImage,
  PROJECT_VIDEO_POSTER,
} from '@/lib/project-images';

export type PlaceholderKind =
  | 'hero'
  | 'floorPlan'
  | 'gallery'
  | 'amenity'
  | 'blog'
  | 'bank'
  | 'promoter';

export function getPlaceholderUrl(
  kind: PlaceholderKind,
  seed: string | number = 0
): string {
  switch (kind) {
    case 'hero':
      return getProjectHeroImage();
    case 'floorPlan':
      return getProjectFloorPlanImage(seed);
    case 'gallery':
      return getProjectGalleryImage(seed);
    case 'amenity':
      return getProjectAmenityImage(String(seed));
    case 'blog':
      return getProjectBlogCover(seed);
    case 'bank':
      return `/images/banks/sbi-logo.webp`;
    case 'promoter':
      return getProjectPromoterImage(seed);
    default:
      return getProjectGalleryImage(seed);
  }
}

/** Use live URL when Supabase is configured and URL exists; otherwise local project images */
export function resolveImageUrl(
  url: string | undefined | null,
  kind: PlaceholderKind,
  seed: string | number = 0
): string {
  const trimmed = url?.trim() ?? '';
  if (isSupabaseConfigured && trimmed) {
    return trimmed;
  }
  return getPlaceholderUrl(kind, seed);
}

export function getHeroPosterUrl(poster?: string): string {
  const trimmed = poster?.trim() ?? '';
  if (trimmed) return trimmed;
  return PROJECT_VIDEO_POSTER;
}

export function resolvePromoterPhotoUrl(imageUrl: string | undefined, seed: string | number): string {
  const trimmed = imageUrl?.trim() ?? '';
  if (trimmed) return trimmed;
  return getProjectPromoterImage(seed);
}
