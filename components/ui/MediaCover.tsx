'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { getPlaceholderUrl, type PlaceholderKind } from '@/lib/placeholders';

type MediaCoverProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  overlay?: 'hero' | 'card' | 'strong' | 'none';
  className?: string;
  fallbackKind?: PlaceholderKind;
  fallbackSeed?: string | number;
};

const OVERLAY_CLASS = {
  hero: 'media-overlay-hero',
  strong: 'media-overlay-strong',
  card: 'media-overlay-card',
} as const;

function resolveMediaSrc(
  src: string,
  fallbackKind: PlaceholderKind,
  fallbackSeed: string | number,
): string {
  const trimmed = src.trim();
  return trimmed || getPlaceholderUrl(fallbackKind, fallbackSeed);
}

export default function MediaCover({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  overlay = 'card',
  className = '',
  fallbackKind = 'gallery',
  fallbackSeed = 'default',
}: MediaCoverProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const overlayClass = overlay === 'none' ? '' : OVERLAY_CLASS[overlay];
  const fallbackSrc = getPlaceholderUrl(fallbackKind, fallbackSeed);
  const normalizedSrc = resolveMediaSrc(src, fallbackKind, fallbackSeed);
  const imgSrc = failedSrc === normalizedSrc ? fallbackSrc : normalizedSrc;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-bg-card" aria-hidden>
          <div className="skeleton-shimmer absolute inset-0" />
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          'object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]',
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
        onError={() => setFailedSrc(normalizedSrc)}
        onLoad={() => setLoaded(true)}
      />
      {overlayClass ? (
        <div className={cn('pointer-events-none absolute inset-0', overlayClass)} aria-hidden />
      ) : null}
    </div>
  );
}
