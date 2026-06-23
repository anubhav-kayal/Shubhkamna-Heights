import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from './supabase/client';
import { getSupabaseServerClient } from './supabase/server';
import { isSupabaseConfigured } from './supabase/config';
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

function getClient(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    return getSupabaseServerClient();
  }
  return getSupabaseBrowserClient();
}

function requireSupabaseConfig() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
}

function logQueryError(label: string, error: { message: string }) {
  console.warn(`Failed to ${label}:`, error.message);
}

async function getSettingValue(key: string): Promise<Record<string, unknown> | null> {
  const client = getClient();
  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) {
    logQueryError(`fetch site_settings/${key}`, error);
    return null;
  }

  return (data?.value as Record<string, unknown> | undefined) ?? null;
}

async function upsertSettingValue(key: string, value: object) {
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const { error } = await client.from('site_settings').upsert({
    key,
    value,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    throw new Error(error.message);
  }
}

function mapHeroSettings(data: Record<string, unknown>): HeroSettings {
  return {
    videoUrl: String(data.videoUrl ?? ''),
    posterUrl: String(data.posterUrl ?? ''),
    headline: String(data.headline ?? ''),
    subheadline: String(data.subheadline ?? ''),
  };
}

export async function getHeroSettings(): Promise<HeroSettings | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const value = await getSettingValue('hero');
  return value ? mapHeroSettings(value) : null;
}

export async function saveHeroSettings(data: HeroSettings) {
  requireSupabaseConfig();
  await upsertSettingValue('hero', data);
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
  if (!isSupabaseConfigured) {
    return null;
  }

  const value = await getSettingValue('landing');
  return value ? mapLandingSettings(value) : null;
}

export async function saveLandingSettings(data: LandingSettings) {
  requireSupabaseConfig();
  await upsertSettingValue('landing', data);
}

export async function getPricingSettings(): Promise<PricingSettings | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const value = await getSettingValue('pricing');
  if (!value) {
    return null;
  }

  return {
    bhk2BasePrice: Number(value.bhk2BasePrice ?? value.bhk2_base_price ?? 3500000),
    bhk3BasePrice: Number(value.bhk3BasePrice ?? value.bhk3_base_price ?? 5200000),
    perSqftRate: Number(value.perSqftRate ?? value.per_sqft_rate ?? 3500),
    gstPercent: Number(value.gstPercent ?? value.gst_percent ?? 5),
    stampDutyPercent: Number(value.stampDutyPercent ?? value.stamp_duty_percent ?? 5),
  };
}

export async function savePricingSettings(data: PricingSettings) {
  requireSupabaseConfig();
  await upsertSettingValue('pricing', data);
}

function mapBankRow(row: Record<string, unknown>): Bank {
  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? ''),
    logoUrl: String(row.logo_url ?? row.logoUrl ?? ''),
    interestRate: Number(row.interest_rate ?? row.interestRate ?? 8.5),
    maxLoanAmount: Number(row.max_loan_amount ?? row.maxLoanAmount ?? row.maxLoan ?? 0),
    processingFee: Number(row.processing_fee ?? row.processingFee ?? 0),
  };
}

export async function getBanks(): Promise<Bank[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client.from('banks').select('*').order('name');

  if (error) {
    logQueryError('fetch banks', error);
    return [];
  }

  return (data ?? []).map((row) => mapBankRow(row as Record<string, unknown>));
}

export async function saveBank(data: Omit<Bank, 'id'> & { id?: string }) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const id =
    data.id?.trim() ||
    data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') ||
    `bank-${Date.now()}`;

  const { error } = await client.from('banks').upsert({
    id,
    name: data.name,
    logo_url: data.logoUrl,
    interest_rate: data.interestRate,
    max_loan_amount: data.maxLoanAmount,
    processing_fee: data.processingFee,
  });

  if (error) {
    throw new Error(error.message);
  }

  return id;
}

function mapGalleryRow(row: Record<string, unknown>): GalleryImage {
  return {
    id: String(row.id ?? ''),
    imageUrl: String(row.image_url ?? row.imageUrl ?? ''),
    category: String(row.category ?? ''),
    caption: String(row.caption ?? ''),
    order: Number(row.sort_order ?? row.order ?? 0),
    active: Boolean(row.active),
  };
}

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  let query = client
    .from('gallery_images')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    logQueryError('fetch gallery images', error);
    return [];
  }

  return (data ?? []).map((row) => mapGalleryRow(row as Record<string, unknown>));
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('gallery_images')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    logQueryError('fetch all gallery images', error);
    return [];
  }

  return (data ?? []).map((row) => mapGalleryRow(row as Record<string, unknown>));
}

export async function saveGalleryImage(data: Omit<GalleryImage, 'id'> & { id?: string }) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const payload = {
    image_url: data.imageUrl,
    category: data.category,
    caption: data.caption,
    sort_order: data.order,
    active: data.active,
  };

  if (data.id) {
    const { error } = await client.from('gallery_images').update(payload).eq('id', data.id);
    if (error) {
      throw new Error(error.message);
    }
    return data.id;
  }

  const { data: inserted, error } = await client
    .from('gallery_images')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(inserted.id);
}

export async function deleteGalleryImage(id: string) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const { error } = await client.from('gallery_images').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

function mapAmenityRow(row: Record<string, unknown>): Amenity {
  return {
    id: String(row.id ?? ''),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    iconName: String(row.icon_name ?? row.iconName ?? ''),
    imageUrl: row.image_url || row.imageUrl ? String(row.image_url ?? row.imageUrl) : undefined,
    order: Number(row.sort_order ?? row.order ?? 0),
  };
}

export async function getAmenities(): Promise<Amenity[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('amenities')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    logQueryError('fetch amenities', error);
    return [];
  }

  return (data ?? []).map((row) => mapAmenityRow(row as Record<string, unknown>));
}

export async function saveAmenity(data: Omit<Amenity, 'id'> & { id?: string }) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const payload = {
    title: data.title,
    description: data.description,
    icon_name: data.iconName,
    image_url: data.imageUrl ?? null,
    sort_order: data.order,
  };

  if (data.id) {
    const { error } = await client.from('amenities').update(payload).eq('id', data.id);
    if (error) {
      throw new Error(error.message);
    }
    return data.id;
  }

  const { data: inserted, error } = await client
    .from('amenities')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(inserted.id);
}

function mapFloorPlanRow(row: Record<string, unknown>): FloorPlan {
  return {
    id: String(row.id ?? ''),
    type: (row.type === '3BHK' ? '3BHK' : '2BHK') as '2BHK' | '3BHK',
    imageUrl: String(row.image_url ?? row.imageUrl ?? ''),
    carpetArea: Number(row.carpet_area ?? row.carpetArea ?? 0),
    superArea: Number(row.super_area ?? row.superArea ?? 0),
    price: Number(row.price ?? 0),
    active: Boolean(row.active),
  };
}

export async function getFloorPlans(bhkType?: string): Promise<FloorPlan[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  let query = client.from('floor_plans').select('*').eq('active', true);

  if (bhkType) {
    query = query.eq('type', bhkType);
  }

  const { data, error } = await query;

  if (error) {
    logQueryError('fetch floor plans', error);
    return [];
  }

  return (data ?? []).map((row) => mapFloorPlanRow(row as Record<string, unknown>));
}

export async function getAllFloorPlans(): Promise<FloorPlan[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client.from('floor_plans').select('*');

  if (error) {
    logQueryError('fetch all floor plans', error);
    return [];
  }

  return (data ?? []).map((row) => mapFloorPlanRow(row as Record<string, unknown>));
}

export async function saveFloorPlan(data: Omit<FloorPlan, 'id'> & { id?: string }) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const payload = {
    type: data.type,
    image_url: data.imageUrl,
    carpet_area: data.carpetArea,
    super_area: data.superArea,
    price: data.price,
    active: data.active,
  };

  if (data.id) {
    const { error } = await client.from('floor_plans').update(payload).eq('id', data.id);
    if (error) {
      throw new Error(error.message);
    }
    return data.id;
  }

  const { data: inserted, error } = await client
    .from('floor_plans')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(inserted.id);
}

function mapBlogPostRow(row: Record<string, unknown>): BlogPost {
  const tags = row.tags;
  return {
    id: String(row.id ?? ''),
    title: String(row.title ?? ''),
    slug: String(row.slug ?? ''),
    content: String(row.content ?? ''),
    excerpt: String(row.excerpt ?? ''),
    coverImage: String(row.cover_image ?? row.coverImage ?? ''),
    author: String(row.author ?? ''),
    publishedAt: String(row.published_at ?? row.publishedAt ?? new Date().toISOString()),
    category: String(row.category ?? ''),
    published: Boolean(row.published),
    tags: Array.isArray(tags) ? tags.map(String) : undefined,
    metaDescription:
      row.meta_description || row.metaDescription
        ? String(row.meta_description ?? row.metaDescription)
        : undefined,
    readTimeMinutes:
      row.read_time_minutes || row.readTimeMinutes
        ? Number(row.read_time_minutes ?? row.readTimeMinutes)
        : undefined,
  };
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  let query = client
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    logQueryError('fetch blog posts', error);
    return [];
  }

  return (data ?? []).map((row) => mapBlogPostRow(row as Record<string, unknown>));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    logQueryError('fetch all blog posts', error);
    return [];
  }

  return (data ?? []).map((row) => mapBlogPostRow(row as Record<string, unknown>));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const client = getClient();
  if (!client) {
    return null;
  }

  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    logQueryError('fetch blog post by slug', error);
    return null;
  }

  return data ? mapBlogPostRow(data as Record<string, unknown>) : null;
}

export async function saveBlogPost(
  data: Omit<BlogPost, 'id' | 'publishedAt'> & { id?: string; publishedAt?: Date }
) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const payload = {
    title: data.title,
    slug: data.slug,
    content: data.content,
    excerpt: data.excerpt,
    cover_image: data.coverImage,
    author: data.author,
    published_at: (data.publishedAt ?? new Date()).toISOString(),
    category: data.category,
    published: data.published,
    tags: data.tags ?? [],
    meta_description: data.metaDescription ?? null,
    read_time_minutes: data.readTimeMinutes ?? null,
  };

  if (data.id) {
    const { error } = await client.from('blog_posts').update(payload).eq('id', data.id);
    if (error) {
      throw new Error(error.message);
    }
    return data.id;
  }

  const { data: inserted, error } = await client
    .from('blog_posts')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(inserted.id);
}

function mapTestimonialRow(row: Record<string, unknown>): Testimonial {
  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? ''),
    flatType: String(row.flat_type ?? row.flatType ?? ''),
    quote: String(row.quote ?? ''),
    rating: Number(row.rating ?? 5),
    active: Boolean(row.active),
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client.from('testimonials').select('*').eq('active', true);

  if (error) {
    logQueryError('fetch testimonials', error);
    return [];
  }

  return (data ?? []).map((row) => mapTestimonialRow(row as Record<string, unknown>));
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client.from('testimonials').select('*');

  if (error) {
    logQueryError('fetch all testimonials', error);
    return [];
  }

  return (data ?? []).map((row) => mapTestimonialRow(row as Record<string, unknown>));
}

export async function saveTestimonial(data: Omit<Testimonial, 'id'> & { id?: string }) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const payload = {
    name: data.name,
    flat_type: data.flatType,
    quote: data.quote,
    rating: data.rating,
    active: data.active,
  };

  if (data.id) {
    const { error } = await client.from('testimonials').update(payload).eq('id', data.id);
    if (error) {
      throw new Error(error.message);
    }
    return data.id;
  }

  const { data: inserted, error } = await client
    .from('testimonials')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(inserted.id);
}

export async function deleteTestimonial(id: string) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const { error } = await client.from('testimonials').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

function mapSpecificationRow(row: Record<string, unknown>): Specification {
  return {
    id: String(row.id ?? ''),
    category: String(row.category ?? ''),
    items: (row.items || []) as Specification['items'],
    order: Number(row.sort_order ?? row.order ?? 0),
  };
}

export async function getSpecifications(): Promise<Specification[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('specifications')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    logQueryError('fetch specifications', error);
    return [];
  }

  return (data ?? []).map((row) => mapSpecificationRow(row as Record<string, unknown>));
}

export async function saveSpecification(data: Omit<Specification, 'id'> & { id?: string }) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const payload = {
    category: data.category,
    items: data.items,
    sort_order: data.order,
  };

  if (data.id) {
    const { error } = await client.from('specifications').update(payload).eq('id', data.id);
    if (error) {
      throw new Error(error.message);
    }
    return data.id;
  }

  const { data: inserted, error } = await client
    .from('specifications')
    .insert(payload)
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(inserted.id);
}

export async function submitEnquiry(data: {
  name: string;
  phone: string;
  email: string;
  bhkPreference: string;
  visitDate: string;
  message?: string;
  source: string;
}) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const { error } = await client.from('enquiries').insert({
    name: data.name,
    phone: data.phone,
    email: data.email,
    bhk_preference: data.bhkPreference,
    visit_date: data.visitDate,
    message: data.message ?? null,
    source: data.source,
    contacted: false,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function mapEnquiryRow(row: Record<string, unknown>): Enquiry {
  return {
    id: String(row.id ?? ''),
    name: String(row.name ?? ''),
    phone: String(row.phone ?? ''),
    email: String(row.email ?? ''),
    bhkPreference: String(row.bhk_preference ?? row.bhkPreference ?? ''),
    visitDate: String(row.visit_date ?? row.visitDate ?? ''),
    message: String(row.message ?? ''),
    source: String(row.source ?? ''),
    createdAt: String(row.created_at ?? row.createdAt ?? new Date().toISOString()),
    contacted: Boolean(row.contacted),
  };
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (!isSupabaseConfigured) {
    return [];
  }

  const client = getClient();
  if (!client) {
    return [];
  }

  const { data, error } = await client
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    logQueryError('fetch enquiries', error);
    return [];
  }

  return (data ?? []).map((row) => mapEnquiryRow(row as Record<string, unknown>));
}

export async function updateEnquiryContacted(id: string, contacted: boolean) {
  requireSupabaseConfig();
  const client = getClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const { error } = await client.from('enquiries').update({ contacted }).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const client = getSupabaseBrowserClient();
  if (!client) {
    return false;
  }

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return false;
  }

  const { data, error } = await client
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.warn('Failed to verify admin access:', error.message);
    return false;
  }

  return Boolean(data);
}
