import { Timestamp } from 'firebase/firestore';

export type FirestoreDateLike =
  | Timestamp
  | Date
  | string
  | {
      toDate: () => Date;
    };

export interface ProjectData {
  name: string;
  tagline: string;
  subTagline: string;
  location: string;
  fullAddress: string;
  reraNumber: string;
  reraUrl: string;
  vdaApproved: boolean;
  credaiMember: boolean;
  totalFamilies: number;
  openSpace: number;
  contactPhone: string;
  contactEmail: string;
  whatsappNumber: string;
}

export interface HeroSettings {
  videoUrl: string;
  posterUrl: string;
  headline: string;
  subheadline: string;
}

export interface PricingSettings {
  bhk2BasePrice: number;
  bhk3BasePrice: number;
  perSqftRate: number;
  gstPercent: number;
  stampDutyPercent: number;
}

export interface Bank {
  id: string;
  name: string;
  logoUrl: string;
  interestRate: number;
  maxLoanAmount: number;
  processingFee: number;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  category: string;
  caption: string;
  order: number;
  active: boolean;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  iconName: string;
  imageUrl?: string;
  order: number;
}

export interface FloorPlan {
  id: string;
  type: '2BHK' | '3BHK';
  imageUrl: string;
  carpetArea: number;
  superArea: number;
  price: number;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: FirestoreDateLike;
  category: string;
  published: boolean;
  tags?: string[];
  metaDescription?: string;
  readTimeMinutes?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  flatType: string;
  quote: string;
  rating: number;
  active: boolean;
}

export interface Specification {
  id: string;
  category: string;
  items: Array<{ label: string; value: string }>;
  order: number;
}

export interface Enquiry {
  id?: string;
  name: string;
  phone: string;
  email: string;
  bhkPreference: string;
  visitDate: string;
  message?: string;
  source: string;
  createdAt: FirestoreDateLike;
  contacted: boolean;
}
