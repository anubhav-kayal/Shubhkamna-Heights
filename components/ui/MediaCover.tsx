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
  const overlayClass = overlay === 'none' ? '' : OVERLAY_CLASS[overlay];
  const fallbackSrc = getPlaceholderUrl(fallbackKind, fallbackSeed);
  const normalizedSrc = resolveMediaSrc(src, fallbackKind, fallbackSeed);
  const imgSrc = failedSrc === normalizedSrc ? fallbackSrc : normalizedSrc;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        onError={() => setFailedSrc(normalizedSrc)}
      />
      {overlayClass ? (
        <div className={cn('pointer-events-none absolute inset-0', overlayClass)} aria-hidden />
      ) : null}
    </div>
  );
}
