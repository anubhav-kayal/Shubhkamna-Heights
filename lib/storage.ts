import { getSupabaseBrowserClient } from './supabase/client';
import { isSupabaseConfigured } from './supabase/config';

const MEDIA_BUCKET = 'media';

function requireSupabaseConfig() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  }
}

export async function uploadFile(file: File, folder: string): Promise<string> {
  requireSupabaseConfig();

  const client = getSupabaseBrowserClient();
  if (!client) {
    throw new Error('Supabase client unavailable');
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { error } = await client.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
