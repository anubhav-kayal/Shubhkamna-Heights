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
  const [imgSrc, setImgSrc] = useState(src);
  const overlayClass = overlay === 'none' ? '' : OVERLAY_CLASS[overlay];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        onError={() => setImgSrc(getPlaceholderUrl(fallbackKind, fallbackSeed))}
      />
      {overlayClass ? (
        <div className={cn('pointer-events-none absolute inset-0', overlayClass)} aria-hidden />
      ) : null}
    </div>
  );
}
