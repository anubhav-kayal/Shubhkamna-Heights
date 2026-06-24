/** Local renders and photography under public/images/ */

function img(filename: string): string {
  return `/images/${filename}`;
}

export const PROJECT_IMAGES = {
  frontDay: img('Front-Day-View.jpg'),
  birdViewDay: img('Bird_View_Day.jpg'),
  birdViewNight: img('Bird_View_Night.jpg'),
  topView: img('Top-View.jpg'),
  gateNight: img('Gate_View_Night.jpg'),
  livingRoom: img('Living-Room.jpg'),
  diningArea: img('Dining-Area.jpg'),
  kitchen: img('Kitchen.jpg'),
  bedroom1: img('Bedroom_01.jpg'),
  bedroom2: img('Bedroom_02.jpg'),
  bedroom3: img('Bedroom_03.jpg'),
  clubhouse: img('Clubhouse_Closeup.jpg'),
  gym: img('Gym.jpg'),
  basketball: img('Basketball-Court.jpg'),
  badminton: img('Badminton-Court.jpg'),
  indoorGame: img('Indoor_Game.jpg'),
  banquet: img('Banquet.jpg'),
  childrenPlay: img('Children_Playarea.jpg'),
  yoga: img('Yoga-Area.jpg'),
  temple: img('Temple_Area.jpg'),
  gazebo: img('Gazebo-Seating-Night.jpg'),
  waterbody: img('Entrance_Waterbody.jpg'),
  amphitheatre: img('Amphitheatre_Area.jpg'),
  commercial: img('Commercial_Closeup_Day_View.jpg'),
  backGarden: img('Back-Garden-Overall.jpg'),
  pool: img('pool.png'),
  cover: img('cover.png'),
} as const;

export const PROJECT_HERO_IMAGE = PROJECT_IMAGES.frontDay;
export const PROJECT_VIDEO_POSTER = PROJECT_IMAGES.frontDay;

export const GALLERY_FALLBACK_ITEMS = [
  { imageUrl: PROJECT_IMAGES.frontDay, category: 'Exterior', caption: 'Front elevation, day view' },
  { imageUrl: PROJECT_IMAGES.gateNight, category: 'Exterior', caption: 'Designer gate and lighting' },
  { imageUrl: PROJECT_IMAGES.birdViewDay, category: 'Views', caption: 'Aerial day view' },
  { imageUrl: PROJECT_IMAGES.livingRoom, category: 'Interior', caption: 'Spacious living room' },
  { imageUrl: PROJECT_IMAGES.diningArea, category: 'Interior', caption: 'Dining area' },
  { imageUrl: PROJECT_IMAGES.kitchen, category: 'Interior', caption: 'Modern kitchen' },
  { imageUrl: PROJECT_IMAGES.bedroom1, category: 'Interior', caption: 'Master bedroom' },
  { imageUrl: PROJECT_IMAGES.clubhouse, category: 'Amenities', caption: 'Clubhouse' },
  { imageUrl: PROJECT_IMAGES.pool, category: 'Amenities', caption: 'Swimming pool' },
  { imageUrl: PROJECT_IMAGES.gym, category: 'Amenities', caption: 'Gymnasium' },
  { imageUrl: PROJECT_IMAGES.childrenPlay, category: 'Amenities', caption: 'Children play area' },
  { imageUrl: PROJECT_IMAGES.yoga, category: 'Amenities', caption: 'Yoga and meditation park' },
  { imageUrl: PROJECT_IMAGES.waterbody, category: 'Amenities', caption: 'Entrance waterbody' },
  { imageUrl: PROJECT_IMAGES.commercial, category: 'Amenities', caption: 'On-site commercial plaza' },
  { imageUrl: PROJECT_IMAGES.birdViewNight, category: 'Views', caption: 'Aerial night view' },
  { imageUrl: PROJECT_IMAGES.topView, category: 'Views', caption: 'Master plan overview' },
  { imageUrl: PROJECT_IMAGES.amphitheatre, category: 'Amenities', caption: 'Amphitheatre' },
] as const;

const AMENITY_IMAGE_MAP: Record<string, string> = {
  'Swimming Pool': PROJECT_IMAGES.pool,
  Gymnasium: PROJECT_IMAGES.gym,
  Clubhouse: PROJECT_IMAGES.clubhouse,
  Amphitheatre: PROJECT_IMAGES.amphitheatre,
  'Basketball Court': PROJECT_IMAGES.basketball,
  'Badminton Court': PROJECT_IMAGES.badminton,
  'Indoor Game Zone': PROJECT_IMAGES.indoorGame,
  'Banquet Hall': PROJECT_IMAGES.banquet,
  'Children Playing Zone': PROJECT_IMAGES.childrenPlay,
  'Yoga & Meditation Park': PROJECT_IMAGES.yoga,
  'Temple Area': PROJECT_IMAGES.temple,
  'Nana Nani Park': PROJECT_IMAGES.backGarden,
  'Gazebo Seating': PROJECT_IMAGES.gazebo,
  'Jogging Track': PROJECT_IMAGES.backGarden,
  'Water Body with Bridge': PROJECT_IMAGES.waterbody,
  'Commercial Plaza': PROJECT_IMAGES.commercial,
  'Kids Play Zone': PROJECT_IMAGES.childrenPlay,
  'Performance Stage': PROJECT_IMAGES.amphitheatre,
  'Activity Park': PROJECT_IMAGES.childrenPlay,
  '24/7 Security': PROJECT_IMAGES.gateNight,
};

const GALLERY_SEED_MAP: Record<string, string> = {
  belief: PROJECT_IMAGES.clubhouse,
  matters: PROJECT_IMAGES.livingRoom,
  happiness: PROJECT_IMAGES.childrenPlay,
  'happy-family-lifestyle': PROJECT_IMAGES.cover,
  'curated-homes': PROJECT_IMAGES.livingRoom,
  'curated-community': PROJECT_IMAGES.birdViewDay,
  'curated-connect': PROJECT_IMAGES.commercial,
  'Exterior-0': PROJECT_IMAGES.frontDay,
  'Exterior-1': PROJECT_IMAGES.gateNight,
  'Interior-2': PROJECT_IMAGES.livingRoom,
  'Interior-3': PROJECT_IMAGES.kitchen,
  'Amenities-4': PROJECT_IMAGES.clubhouse,
  'Amenities-5': PROJECT_IMAGES.gym,
  'Views-0': PROJECT_IMAGES.birdViewDay,
  'Views-1': PROJECT_IMAGES.topView,
};

/** One interior render per official flat unit (floor plan cards) */
const FLOOR_PLAN_UNIT_IMAGE_MAP: Record<string, string> = {
  'flat-2bhk-1292': PROJECT_IMAGES.livingRoom,
  'flat-3bhk-1690': PROJECT_IMAGES.bedroom1,
  'flat-3bhk-1700': PROJECT_IMAGES.bedroom2,
  'flat-3bhk-1702': PROJECT_IMAGES.bedroom3,
  'flat-3bhk-1730': PROJECT_IMAGES.livingRoom,
  'flat-3bhk-1801': PROJECT_IMAGES.diningArea,
  'flat-3bhk-1806': PROJECT_IMAGES.kitchen,
  'flat-3bhk-1913': PROJECT_IMAGES.cover,
};

const BLOG_COVER_MAP: Record<string, string> = {
  'why-chandauli-is-the-next-real-estate-hotspot-near-varanasi': PROJECT_IMAGES.birdViewDay,
  'mughalsarai-to-pddu-nagar-the-transformation-and-what-it-means-for-homebuyers':
    PROJECT_IMAGES.gateNight,
  'vastu-compliant-homes-why-it-matters-in-varanasi-chandauli': PROJECT_IMAGES.topView,
  '2bhk-vs-3bhk-which-is-right-for-you-in-chandauli': PROJECT_IMAGES.livingRoom,
  'home-loan-guide-buying-property-in-chandauli-varanasi': PROJECT_IMAGES.commercial,
  'life-between-varanasi-and-chandauli-why-pddu-nagar-is-perfect-for-families':
    PROJECT_IMAGES.childrenPlay,
  'why-chandauli-hotspot': PROJECT_IMAGES.birdViewDay,
  'mughalsarai-pddu-nagar': PROJECT_IMAGES.gateNight,
  'vastu-compliant-homes': PROJECT_IMAGES.topView,
  '2bhk-vs-3bhk-chandauli': PROJECT_IMAGES.livingRoom,
  'home-loan-guide-chandauli': PROJECT_IMAGES.commercial,
  'life-pddu-nagar-families': PROJECT_IMAGES.childrenPlay,
};

const GALLERY_ROTATION = [
  PROJECT_IMAGES.frontDay,
  PROJECT_IMAGES.livingRoom,
  PROJECT_IMAGES.clubhouse,
  PROJECT_IMAGES.birdViewDay,
  PROJECT_IMAGES.kitchen,
  PROJECT_IMAGES.childrenPlay,
  PROJECT_IMAGES.commercial,
  PROJECT_IMAGES.topView,
];

const BLOG_COVER_ROTATION = [
  PROJECT_IMAGES.birdViewDay,
  PROJECT_IMAGES.frontDay,
  PROJECT_IMAGES.livingRoom,
];

function indexFromSeed(seed: string | number, length: number): number {
  if (typeof seed === 'number') return Math.abs(seed) % length;
  return Math.abs(String(seed).split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % length;
}

export function getProjectHeroImage(): string {
  return PROJECT_HERO_IMAGE;
}

export function getProjectAmenityImage(name: string): string {
  return AMENITY_IMAGE_MAP[name] ?? PROJECT_IMAGES.clubhouse;
}

export function getProjectGalleryImage(seed: string | number = 0): string {
  const key = String(seed);
  if (GALLERY_SEED_MAP[key]) return GALLERY_SEED_MAP[key];
  return GALLERY_ROTATION[indexFromSeed(seed, GALLERY_ROTATION.length)];
}

export function getProjectFloorPlanImage(seed: string | number = 0): string {
  const key = String(seed);
  if (FLOOR_PLAN_UNIT_IMAGE_MAP[key]) return FLOOR_PLAN_UNIT_IMAGE_MAP[key];
  return key.includes('3') ? PROJECT_IMAGES.diningArea : PROJECT_IMAGES.livingRoom;
}

export function getProjectBlogCover(seed: string | number): string {
  const key = String(seed);
  if (BLOG_COVER_MAP[key]) return BLOG_COVER_MAP[key];
  return BLOG_COVER_ROTATION[indexFromSeed(seed, BLOG_COVER_ROTATION.length)];
}

export function getProjectPromoterImage(seed: string | number): string {
  const images = [PROJECT_IMAGES.frontDay, PROJECT_IMAGES.clubhouse];
  return images[indexFromSeed(seed, images.length)];
}
