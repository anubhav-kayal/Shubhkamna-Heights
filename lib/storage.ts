import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from './firebase';

function requireFirebaseConfig() {
  if (!isFirebaseConfigured) {
    throw new Error('Firebase is not configured. Set the NEXT_PUBLIC_FIREBASE_* environment variables.');
  }
}

export async function uploadFile(file: File, folder: string): Promise<string> {
  requireFirebaseConfig();

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${folder}/${Date.now()}-${safeName}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
