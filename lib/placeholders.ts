import { isFirebaseConfigured } from '@/lib/firebase';

/** Picsum seeds — reliable placeholders when Firebase is not configured */
function picsum(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

const SEEDS = {
  hero: 'sk-hero-estate',
  floorPlan2: 'sk-floor-2bhk',
  floorPlan3: 'sk-floor-3bhk',
  amenity: {
    'Swimming Pool': 'sk-pool',
    Gymnasium: 'sk-gym',
    Clubhouse: 'sk-clubhouse',
    Amphitheatre: 'sk-amphitheatre',
    'Basketball Court': 'sk-basketball',
    'Badminton Court': 'sk-badminton',
    'Indoor Game Zone': 'sk-games',
    'Banquet Hall': 'sk-banquet',
    'Children Playing Zone': 'sk-kids',
    'Yoga & Meditation Park': 'sk-yoga',
    'Temple Area': 'sk-temple',
    'Nana Nani Park': 'sk-park',
    'Gazebo Seating': 'sk-gazebo',
    'Jogging Track': 'sk-jogging',
    'Water Body with Bridge': 'sk-water',
    'Commercial Plaza': 'sk-plaza',
    'Kids Play Zone': 'sk-play',
    'Performance Stage': 'sk-stage',
    'Activity Park': 'sk-activity',
    '24/7 Security': 'sk-security',
    default: 'sk-amenity-default',
  },
  blog: ['sk-blog-1', 'sk-blog-2', 'sk-blog-3'],
  bank: ['sk-bank-1', 'sk-bank-2', 'sk-bank-3', 'sk-bank-4'],
} as const;

export type PlaceholderKind =
  | 'hero'
  | 'floorPlan'
  | 'gallery'
  | 'amenity'
  | 'blog'
  | 'bank';

export function getPlaceholderUrl(
  kind: PlaceholderKind,
  seed: string | number = 0
): string {
  switch (kind) {
    case 'hero':
      return picsum(SEEDS.hero, 1920, 1080);
    case 'floorPlan':
      return String(seed).includes('3')
        ? picsum(SEEDS.floorPlan3, 900, 700)
        : picsum(SEEDS.floorPlan2, 900, 700);
    case 'gallery':
      return picsum(`sk-gallery-${String(seed)}`, 900, 700);
    case 'amenity': {
      const name = String(seed);
      const seedKey =
        (SEEDS.amenity as Record<string, string>)[name] ?? SEEDS.amenity.default;
      return picsum(seedKey, 800, 600);
    }
    case 'blog': {
      const index =
        typeof seed === 'number'
          ? seed
          : Math.abs(String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0));
      return picsum(SEEDS.blog[index % SEEDS.blog.length], 900, 600);
    }
    case 'bank': {
      const index =
        typeof seed === 'number'
          ? seed
          : Math.abs(String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0));
      return picsum(SEEDS.bank[index % SEEDS.bank.length], 400, 240);
    }
    default:
      return picsum('sk-gallery-default', 900, 700);
  }
}

/** Use live URL only when Firebase is configured and URL exists; otherwise placeholder */
export function resolveImageUrl(
  url: string | undefined | null,
  kind: PlaceholderKind,
  seed: string | number = 0
): string {
  const trimmed = url?.trim() ?? '';
  if (isFirebaseConfigured && trimmed) {
    return trimmed;
  }
  return getPlaceholderUrl(kind, seed);
}

export function getHeroPosterUrl(firestorePoster?: string): string {
  return resolveImageUrl(firestorePoster, 'hero');
}
