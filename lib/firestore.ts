import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  orderBy,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from './firebase';
import type {
  Amenity,
  Bank,
  BlogPost,
  Enquiry,
  FloorPlan,
  GalleryImage,
  HeroSettings,
  LandingSettings,
  PricingSettings,
  Specification,
  Testimonial,
} from '@/types';

function requireFirebaseConfig() {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the NEXT_PUBLIC_FIREBASE_* environment variables.');
  }
}

// Settings
function mapHeroSettings(data: Record<string, unknown>): HeroSettings {
  return {
    videoUrl: String(data.videoUrl ?? ''),
    posterUrl: String(data.posterUrl ?? ''),
    headline: String(data.headline ?? ''),
    subheadline: String(data.subheadline ?? ''),
  };
}

export async function getHeroSettings(): Promise<HeroSettings | null> {
  if (!isFirebaseConfigured) {
    return null;
  }

  try {
    const docSnap = await getDoc(doc(firestore, 'settings', 'hero'));
    return docSnap.exists() ? mapHeroSettings(docSnap.data()) : null;
  } catch (error) {
    console.warn('Failed to fetch hero settings:', error);
    return null;
  }
}

export async function saveHeroSettings(data: HeroSettings) {
  requireFirebaseConfig();
  await setDoc(doc(firestore, 'settings', 'hero'), data, { merge: true });
}

function mapLandingSettings(data: Record<string, unknown>): LandingSettings {
  return {
    heroVideoUrl: data.heroVideoUrl ? String(data.heroVideoUrl) : undefined,
    heroPosterUrl: data.heroPosterUrl ? String(data.heroPosterUrl) : undefined,
    heroImageUrl: data.heroImageUrl ? String(data.heroImageUrl) : undefined,
    emotionalImageUrl: data.emotionalImageUrl ? String(data.emotionalImageUrl) : undefined,
    curatedImageHomes: data.curatedImageHomes ? String(data.curatedImageHomes) : undefined,
    curatedImageCommunity: data.curatedImageCommunity
      ? String(data.curatedImageCommunity)
      : undefined,
    curatedImageConnect: data.curatedImageConnect ? String(data.curatedImageConnect) : undefined,
  };
}

export async function getLandingSettings(): Promise<LandingSettings | null> {
  if (!isFirebaseConfigured) {
    return null;
  }

  try {
    const docSnap = await getDoc(doc(firestore, 'settings', 'landing'));
    return docSnap.exists() ? mapLandingSettings(docSnap.data()) : null;
  } catch (error) {
    console.warn('Failed to fetch landing settings:', error);
    return null;
  }
}

export async function saveLandingSettings(data: LandingSettings) {
  requireFirebaseConfig();
  await setDoc(doc(firestore, 'settings', 'landing'), data, { merge: true });
}

export async function getPricingSettings(): Promise<PricingSettings | null> {
  if (!isFirebaseConfigured) {
    return null;
  }

  const docRef = doc(firestore, 'settings', 'pricing');
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();

  return {
    bhk2BasePrice: Number(data.bhk2BasePrice ?? data.bhk2_base_price ?? 3500),
    bhk3BasePrice: Number(data.bhk3BasePrice ?? data.bhk3_base_price ?? 4200),
    perSqftRate: Number(data.perSqftRate ?? data.per_sqft_rate ?? 3500),
    gstPercent: Number(data.gstPercent ?? data.gst_percent ?? 5),
    stampDutyPercent: Number(data.stampDutyPercent ?? data.stamp_duty_percent ?? 5),
  };
}

export async function savePricingSettings(data: PricingSettings) {
  requireFirebaseConfig();
  await setDoc(doc(firestore, 'settings', 'pricing'), data, { merge: true });
}

function mapBankData(id: string, data: Record<string, unknown>): Bank {
  return {
    id,
    name: String(data.name ?? ''),
    logoUrl: String(data.logoUrl ?? ''),
    interestRate: Number(data.interestRate ?? 8.5),
    maxLoanAmount: Number(data.maxLoanAmount ?? data.maxLoan ?? 0),
    processingFee: Number(data.processingFee ?? 0),
  };
}

export async function getBanks(): Promise<Bank[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const settingsDoc = await getDoc(doc(firestore, 'settings', 'banks'));
    if (settingsDoc.exists()) {
      const data = settingsDoc.data().items;
      if (Array.isArray(data)) {
        return data.map((item, index) =>
          mapBankData(
            typeof item === 'object' && item && 'id' in item ? String(item.id) : `bank-${index}`,
            (item as Record<string, unknown>) ?? {}
          )
        );
      }
    }

    const q = query(collection(firestore, 'banks'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((bankDoc) => mapBankData(bankDoc.id, bankDoc.data()));
  } catch (error) {
    console.warn('Failed to fetch banks from Firestore:', error);
    return [];
  }
}

export async function saveBank(data: Omit<Bank, 'id'> & { id?: string }) {
  requireFirebaseConfig();
  const bankRef = data.id ? doc(firestore, 'banks', data.id) : doc(collection(firestore, 'banks'));
  const { id, ...bankData } = data;
  void id;
  await setDoc(bankRef, bankData, { merge: true });
  return bankRef.id;
}

function mapGalleryImage(id: string, data: Record<string, unknown>): GalleryImage {
  return {
    id,
    imageUrl: String(data.imageUrl ?? ''),
    category: String(data.category ?? ''),
    caption: String(data.caption ?? ''),
    order: Number(data.order ?? 0),
    active: Boolean(data.active),
  };
}

// Gallery
export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    let q;
    if (category) {
      q = query(
        collection(firestore, 'gallery'),
        where('active', '==', true),
        where('category', '==', category),
        orderBy('order', 'asc')
      );
    } else {
      q = query(
        collection(firestore, 'gallery'),
        where('active', '==', true),
        orderBy('order', 'asc')
      );
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((galleryDoc) =>
      mapGalleryImage(galleryDoc.id, galleryDoc.data())
    );
  } catch (error) {
    console.warn('Failed to fetch gallery images from Firestore:', error);
    return [];
  }
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(collection(firestore, 'gallery'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((galleryDoc) =>
      mapGalleryImage(galleryDoc.id, galleryDoc.data())
    );
  } catch (error) {
    console.warn('Failed to fetch all gallery images from Firestore:', error);
    return [];
  }
}

export async function saveGalleryImage(
  data: Omit<GalleryImage, 'id'> & { id?: string }
) {
  requireFirebaseConfig();
  const galleryRef = data.id
    ? doc(firestore, 'gallery', data.id)
    : doc(collection(firestore, 'gallery'));
  const { id, ...galleryData } = data;
  void id;
  await setDoc(galleryRef, galleryData, { merge: true });
  return galleryRef.id;
}

export async function deleteGalleryImage(id: string) {
  requireFirebaseConfig();
  await deleteDoc(doc(firestore, 'gallery', id));
}

function mapAmenity(id: string, data: Record<string, unknown>): Amenity {
  return {
    id,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    iconName: String(data.iconName ?? ''),
    imageUrl: data.imageUrl ? String(data.imageUrl) : undefined,
    order: Number(data.order ?? 0),
  };
}

// Amenities
export async function getAmenities(): Promise<Amenity[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(
      collection(firestore, 'amenities'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((amenityDoc) =>
      mapAmenity(amenityDoc.id, amenityDoc.data())
    );
  } catch (error) {
    console.warn('Failed to fetch amenities from Firestore:', error);
    return [];
  }
}

export async function saveAmenity(data: Omit<Amenity, 'id'> & { id?: string }) {
  requireFirebaseConfig();
  const amenityRef = data.id
    ? doc(firestore, 'amenities', data.id)
    : doc(collection(firestore, 'amenities'));
  const { id, ...amenityData } = data;
  void id;
  await setDoc(amenityRef, amenityData, { merge: true });
  return amenityRef.id;
}

function mapFloorPlan(id: string, data: Record<string, unknown>): FloorPlan {
  return {
    id,
    type: (data.type === '3BHK' ? '3BHK' : '2BHK') as '2BHK' | '3BHK',
    imageUrl: String(data.imageUrl ?? ''),
    carpetArea: Number(data.carpetArea ?? 0),
    superArea: Number(data.superArea ?? 0),
    price: Number(data.price ?? 0),
    active: Boolean(data.active),
  };
}

// Floor Plans
export async function getFloorPlans(bhkType?: string): Promise<FloorPlan[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    let q;
    if (bhkType) {
      q = query(
        collection(firestore, 'floorplans'),
        where('active', '==', true),
        where('type', '==', bhkType)
      );
    } else {
      q = query(
        collection(firestore, 'floorplans'),
        where('active', '==', true)
      );
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((planDoc) =>
      mapFloorPlan(planDoc.id, planDoc.data())
    );
  } catch (error) {
    console.warn('Failed to fetch floor plans from Firestore:', error);
    return [];
  }
}

export async function getAllFloorPlans(): Promise<FloorPlan[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const querySnapshot = await getDocs(collection(firestore, 'floorplans'));
    return querySnapshot.docs.map((planDoc) =>
      mapFloorPlan(planDoc.id, planDoc.data())
    );
  } catch (error) {
    console.warn('Failed to fetch all floor plans from Firestore:', error);
    return [];
  }
}

export async function saveFloorPlan(data: Omit<FloorPlan, 'id'> & { id?: string }) {
  requireFirebaseConfig();
  const planRef = data.id
    ? doc(firestore, 'floorplans', data.id)
    : doc(collection(firestore, 'floorplans'));
  const { id, ...planData } = data;
  void id;
  await setDoc(planRef, planData, { merge: true });
  return planRef.id;
}

// Blog
function mapBlogPostData(id: string, data: Record<string, unknown>): BlogPost {
  const tags = data.tags;
  return {
    id,
    title: String(data.title ?? ''),
    slug: String(data.slug ?? ''),
    content: String(data.content ?? ''),
    excerpt: String(data.excerpt ?? ''),
    coverImage: String(data.coverImage ?? ''),
    author: String(data.author ?? ''),
    publishedAt: (data.publishedAt as BlogPost['publishedAt']) ?? new Date(),
    category: String(data.category ?? ''),
    published: Boolean(data.published),
    tags: Array.isArray(tags) ? tags.map(String) : undefined,
    metaDescription: data.metaDescription ? String(data.metaDescription) : undefined,
    readTimeMinutes: data.readTimeMinutes ? Number(data.readTimeMinutes) : undefined,
  };
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(
      collection(firestore, 'blog'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    let posts = querySnapshot.docs.map((blogDoc) => mapBlogPostData(blogDoc.id, blogDoc.data()));
    if (limit) {
      posts = posts.slice(0, limit);
    }
    return posts;
  } catch (error) {
    console.warn('Failed to fetch blog posts from Firestore:', error);
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(collection(firestore, 'blog'), orderBy('publishedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((blogDoc) => mapBlogPostData(blogDoc.id, blogDoc.data()));
  } catch (error) {
    console.warn('Failed to fetch all blog posts from Firestore:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isFirebaseConfigured) {
    return null;
  }

  try {
    const q = query(
      collection(firestore, 'blog'),
      where('slug', '==', slug),
      where('published', '==', true)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const blogDoc = querySnapshot.docs[0];
      return mapBlogPostData(blogDoc.id, blogDoc.data());
    }
    return null;
  } catch (error) {
    console.warn('Failed to fetch blog post from Firestore:', error);
    return null;
  }
}

export async function saveBlogPost(data: Omit<BlogPost, 'id' | 'publishedAt'> & { id?: string; publishedAt?: Date }) {
  requireFirebaseConfig();
  const blogRef = data.id ? doc(firestore, 'blog', data.id) : doc(collection(firestore, 'blog'));
  const { id, ...blogData } = data;
  void id;
  await setDoc(
    blogRef,
    {
      ...blogData,
      publishedAt: data.publishedAt ?? serverTimestamp(),
    },
    { merge: true }
  );
  return blogRef.id;
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(
      collection(firestore, 'testimonials'),
      where('active', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((testimonialDoc) => ({
      id: testimonialDoc.id,
      name: testimonialDoc.data().name || '',
      flatType: testimonialDoc.data().flatType || '',
      quote: testimonialDoc.data().quote || '',
      rating: Number(testimonialDoc.data().rating || 5),
      active: Boolean(testimonialDoc.data().active),
    }));
  } catch (error) {
    console.warn('Failed to fetch testimonials from Firestore:', error);
    return [];
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(collection(firestore, 'testimonials'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((testimonialDoc) => ({
      id: testimonialDoc.id,
      name: testimonialDoc.data().name || '',
      flatType: testimonialDoc.data().flatType || '',
      quote: testimonialDoc.data().quote || '',
      rating: Number(testimonialDoc.data().rating || 5),
      active: Boolean(testimonialDoc.data().active),
    }));
  } catch (error) {
    console.warn('Failed to fetch all testimonials from Firestore:', error);
    return [];
  }
}

export async function saveTestimonial(data: Omit<Testimonial, 'id'> & { id?: string }) {
  requireFirebaseConfig();
  const testimonialRef = data.id
    ? doc(firestore, 'testimonials', data.id)
    : doc(collection(firestore, 'testimonials'));
  const { id, ...testimonialData } = data;
  void id;
  await setDoc(testimonialRef, testimonialData, { merge: true });
  return testimonialRef.id;
}

function mapSpecification(id: string, data: Record<string, unknown>): Specification {
  return {
    id,
    category: String(data.category ?? ''),
    items: (data.items || []) as Specification['items'],
    order: Number(data.order ?? 0),
  };
}

// Specifications
export async function getSpecifications(): Promise<Specification[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(
      collection(firestore, 'specifications'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((specDoc) =>
      mapSpecification(specDoc.id, specDoc.data())
    );
  } catch (error) {
    console.warn('Failed to fetch specifications from Firestore:', error);
    return [];
  }
}

export async function saveSpecification(
  data: Omit<Specification, 'id'> & { id?: string }
) {
  requireFirebaseConfig();
  const specRef = data.id
    ? doc(firestore, 'specifications', data.id)
    : doc(collection(firestore, 'specifications'));
  const { id, ...specData } = data;
  void id;
  await setDoc(specRef, specData, { merge: true });
  return specRef.id;
}

// Enquiries
export async function submitEnquiry(data: {
  name: string;
  phone: string;
  email: string;
  bhkPreference: string;
  visitDate: string;
  message?: string;
  source: string;
}) {
  requireFirebaseConfig();
  const docRef = await addDoc(collection(firestore, 'enquiries'), {
    ...data,
    createdAt: serverTimestamp(),
    contacted: false,
  });
  return docRef.id;
}

// Get enquiries (for admin)
export async function getEnquiries(): Promise<Enquiry[]> {
  if (!isFirebaseConfigured) {
    return [];
  }

  try {
    const q = query(
      collection(firestore, 'enquiries'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((enquiryDoc) => ({
      id: enquiryDoc.id,
      name: String(enquiryDoc.data().name || ''),
      phone: String(enquiryDoc.data().phone || ''),
      email: String(enquiryDoc.data().email || ''),
      bhkPreference: String(enquiryDoc.data().bhkPreference || ''),
      visitDate: String(enquiryDoc.data().visitDate || ''),
      message: String(enquiryDoc.data().message || ''),
      source: String(enquiryDoc.data().source || ''),
      createdAt: enquiryDoc.data().createdAt as Enquiry['createdAt'],
      contacted: Boolean(enquiryDoc.data().contacted),
    }));
  } catch (error) {
    console.warn('Failed to fetch enquiries from Firestore:', error);
    return [];
  }
}

export async function updateEnquiryContacted(id: string, contacted: boolean) {
  requireFirebaseConfig();
  await updateDoc(doc(firestore, 'enquiries', id), { contacted });
}
