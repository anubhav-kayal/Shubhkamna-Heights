export const PROJECT_DATA = {
  name: 'Shubh Kamna Heights',
  tagline: 'Crafted for Comfort. Designed for Life.',
  subTagline: 'Where spiritual grace meets natural beauty',
  location: 'PDDU Nagar, Chandauli / Uttar Pradesh',
  fullAddress: 'Arazi No. 538MI, 542MI, 546, 547, Mauja- Godhana, Paragana-Dhoos, Tehsil- P.D.D.U. Nagar, Distt- Chandauli / UP',
  reraNumber: 'UPRERAPRJ757815/04/2025',
  reraUrl: 'https://www.up-rera.in',
  vdaApproved: true,
  credaiMember: true,
  credaiText: 'Purvanchal + PREA Member',
  totalFamilies: 1000,
  openSpace: 65,
  contactPhone: '+91 70841 65214',
  contactEmail: 'shubhkamnaheights@gmail.com',
  whatsappNumber: '+917084165214',
  whatsappMessage: 'Hello! I\'m interested in Shubh Kamna Heights. Please share details.',
  unitTypes: ['2BHK (Units 04, 07)', '3BHK (Units 01, 02, 03, 05, 06, 08, 09, 10)'],
  blocks: {
    active: ['Block A', 'Block B'],
    future: ['Block C', 'Block D'],
  },
  sitePlanPdfUrl: '/fullplan.pdf',
  logoUrl: '/images/logo.png',
};

/** Replace imageUrl when photos are added under public/images/promoters/ */
export const PROMOTERS = [
  {
    id: 'subhash-chandra-tulsian',
    name: 'Mr Subhash Chandra Tulsian',
    imageUrl: '',
    roleKey: 'sections.story.promoter1Role',
  },
  {
    id: 'abhishek-tulsian',
    name: 'Mr Abhishek Tulsian',
    imageUrl: '',
    roleKey: 'sections.story.promoter2Role',
  },
] as const;

export const LANDMARKS = [
  { distance: 0.0, name: 'NH-2 (Delhi to Kolkata)', category: 'Highway' },
  { distance: 3.0, name: 'P.W. Gurukulam', category: 'Educational' },
  { distance: 5.0, name: 'DDU Nagar Railway Station', category: 'Transport' },
  { distance: 6.5, name: 'IP Mugalsarai', category: 'Industrial' },
  { distance: 13.0, name: 'Ramnagar', category: 'City' },
  { distance: 16.0, name: 'BHU (Banaras Hindu University)', category: 'Educational' },
  { distance: 41.0, name: 'Varanasi Airport', category: 'Transport' },
];

export const KEY_FEATURES = [
  'On site commercial complex with daily retail, services, and convenience at your doorstep',
  'Integrated community of 2BHK & 3BHK Flats',
  'Wide Range of Spacious and well ventilated flats',
  'Designer Gate & Boundary walled Complex',
  'Designer External Lighting',
  'Vastu compliance layout',
  'Automatic Elevator with decorative lobby',
  'Brick batcoba treatment on terrace',
  'More than 65% open space',
  'Ample parking space at stilt & open',
  'Visitor\'s Car Parking',
  'Spacious apartments with modern finishing',
  'Prime location with easy access to amenities',
  'Modern amenities for a luxurious lifestyle',
  '24/7 security and CCTV surveillance',
  'Sustainable design and energy efficient systems',
  'Gated Society',
  'Antitermite treatment',
  'Rain Water Harvesting',
  'Piped Gas Supply Arrangement',
  '24 hr Power backup in common areas',
  '24 hr Power backup in flats (condition apply)',
  'Intercom Facility within the Complex',
  'Earthquake Resistant RCC Frame Structure',
  'VDA approved & RERA registered project',
];

export const AMENITIES_LIST = [
  'Swimming Pool',
  'Gymnasium',
  'Clubhouse',
  'Amphitheatre',
  'Basketball Court',
  'Badminton Court',
  'Indoor Game Zone',
  'Banquet Hall',
  'Children Playing Zone',
  'Yoga & Meditation Park',
  'Temple Area',
  'Nana Nani Park',
  'Gazebo Seating',
  'Jogging Track',
  'Water Body with Bridge',
  'Commercial Plaza',
  'Kids Play Zone',
  'Performance Stage',
  'Activity Park',
  '24/7 Security',
];

/** Place testimonial MP4s in public/videos/ or set per-entry videoUrl */
export const VIDEO_TESTIMONIAL_MEDIA = {
  rajesh: process.env.NEXT_PUBLIC_VIDEO_TESTIMONIAL_1 ?? '/videos/testimonial-rajesh.mp4',
  priya: process.env.NEXT_PUBLIC_VIDEO_TESTIMONIAL_2 ?? '/videos/testimonial-priya.mp4',
  amit: process.env.NEXT_PUBLIC_VIDEO_TESTIMONIAL_3 ?? '/videos/testimonial-amit.mp4',
} as const;

/** Project overview film in public/videos/ */
export const PROJECT_OVERVIEW_VIDEO_URL = '/videos/overview.mp4';

export const PROJECT_MEDIA = {
  videoUrl: process.env.NEXT_PUBLIC_PROJECT_VIDEO_URL ?? PROJECT_OVERVIEW_VIDEO_URL,
  posterUrl: process.env.NEXT_PUBLIC_PROJECT_VIDEO_POSTER_URL ?? '/images/Front-Day-View.jpg',
};

export const DISCLAIMER = 'The images shown are artistic impressions and are for illustration purposes only. The actual features, design, and amenities may differ from the visual representations. We recommend visiting the site and consulting with the sales team for accurate information. This website is for informational purposes only and does not constitute an offer to sell or solicitation to buy. Prices and specifications are subject to change.';
