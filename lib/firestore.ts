import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  WriteBatch,
  writeBatch,
} from 'firebase/firestore';
import { firestore } from './firebase';

// Settings
export async function getHeroSettings() {
  const docRef = doc(firestore, 'settings', 'hero');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function getPricingSettings() {
  const docRef = doc(firestore, 'settings', 'pricing');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

export async function getBanks() {
  try {
    const q = query(collection(firestore, 'banks'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name || '',
      logoUrl: doc.data().logoUrl || '',
      interestRate: doc.data().interestRate || 8.5,
      maxLoan: doc.data().maxLoan || 0,
      processingFee: doc.data().processingFee || 0,
    }));
  } catch (error) {
    console.warn('Failed to fetch banks from Firestore:', error);
    return [];
  }
}

// Gallery
export async function getGalleryImages(category?: string) {
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
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      imageUrl: doc.data().imageUrl || '',
      category: doc.data().category || '',
      caption: doc.data().caption || '',
      order: doc.data().order || 0,
      active: doc.data().active || false,
    }));
  } catch (error) {
    console.warn('Failed to fetch gallery images from Firestore:', error);
    return [];
  }
}

// Amenities
export async function getAmenities() {
  try {
    const q = query(
      collection(firestore, 'amenities'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || '',
      description: doc.data().description || '',
      iconName: doc.data().iconName || '',
      order: doc.data().order || 0,
    })) as Array<{ id: string; title: string; description: string; iconName: string; order: number }>;
  } catch (error) {
    console.warn('Failed to fetch amenities from Firestore:', error);
    return [];
  }
}

// Floor Plans
export async function getFloorPlans(bhkType?: string) {
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
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      type: (doc.data().type || '2BHK') as '2BHK' | '3BHK',
      imageUrl: doc.data().imageUrl || '',
      carpetArea: doc.data().carpetArea || 0,
      superArea: doc.data().superArea || 0,
      price: doc.data().price || 0,
      active: doc.data().active || false,
    }));
  } catch (error) {
    console.warn('Failed to fetch floor plans from Firestore:', error);
    return [];
  }
}

// Blog
export async function getBlogPosts(limit?: number) {
  try {
    const q = query(
      collection(firestore, 'blog'),
      where('published', '==', true),
      orderBy('publishedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    let posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title || '',
      slug: doc.data().slug || '',
      content: doc.data().content || '',
      excerpt: doc.data().excerpt || '',
      coverImage: doc.data().coverImage || '',
      author: doc.data().author || '',
      publishedAt: doc.data().publishedAt || new Date(),
      category: doc.data().category || '',
      published: doc.data().published || false,
    })) as Array<{
      id: string;
      title: string;
      slug: string;
      content: string;
      excerpt: string;
      coverImage: string;
      author: string;
      publishedAt: any;
      category: string;
      published: boolean;
    }>;
    if (limit) {
      posts = posts.slice(0, limit);
    }
    return posts;
  } catch (error) {
    console.warn('Failed to fetch blog posts from Firestore:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const q = query(
      collection(firestore, 'blog'),
      where('slug', '==', slug),
      where('published', '==', true)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        title: doc.data().title || '',
        slug: doc.data().slug || '',
        content: doc.data().content || '',
        excerpt: doc.data().excerpt || '',
        coverImage: doc.data().coverImage || '',
        author: doc.data().author || '',
        publishedAt: doc.data().publishedAt || new Date(),
        category: doc.data().category || '',
        published: doc.data().published || false,
      };
    }
    return null;
  } catch (error) {
    console.warn('Failed to fetch blog post from Firestore:', error);
    return null;
  }
}

// Testimonials
export async function getTestimonials() {
  try {
    const q = query(
      collection(firestore, 'testimonials'),
      where('active', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name || '',
      flatType: doc.data().flatType || '',
      quote: doc.data().quote || '',
      rating: doc.data().rating || 5,
      active: doc.data().active || false,
    }));
  } catch (error) {
    console.warn('Failed to fetch testimonials from Firestore:', error);
    return [];
  }
}

// Specifications
export async function getSpecifications() {
  try {
    const q = query(
      collection(firestore, 'specifications'),
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      category: doc.data().category || '',
      items: doc.data().items || [],
      order: doc.data().order || 0,
    }));
  } catch (error) {
    console.warn('Failed to fetch specifications from Firestore:', error);
    return [];
  }
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
  const docRef = await addDoc(collection(firestore, 'enquiries'), {
    ...data,
    createdAt: serverTimestamp(),
    contacted: false,
  });
  return docRef.id;
}

// Get enquiries (for admin)
export async function getEnquiries() {
  try {
    const q = query(
      collection(firestore, 'enquiries'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<any>;
  } catch (error) {
    console.warn('Failed to fetch enquiries from Firestore:', error);
    return [];
  }
}
