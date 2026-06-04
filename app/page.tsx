import LandingPage from '@/components/landing/LandingPage';
import { getLandingSettings } from '@/lib/firestore';

export default async function Home() {
  const settings = await getLandingSettings();
  return <LandingPage settings={settings} />;
}
