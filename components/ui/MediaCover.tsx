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

  const overlayClass =
    overlay === 'hero'
      ? 'bg-gradient-to-b from-[#0a0a0f]/20 via-[#0a0a0f]/55 to-[#0a0a0f]/88'
      : overlay === 'strong'
        ? 'bg-gradient-to-b from-[#08080c]/35 via-[#08080c]/72 to-[#08080c]/97'
        : overlay === 'none'
          ? ''
          : 'bg-gradient-to-b from-[#08080c]/12 via-[#08080c]/45 to-[#08080c]/92';

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
