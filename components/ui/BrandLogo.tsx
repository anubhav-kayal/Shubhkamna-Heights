import Image from 'next/image';
import Link from 'next/link';
import { SITE_LOGO } from '@/lib/branding';
import { cn } from '@/lib/cn';

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  variant?: 'nav' | 'footer' | 'admin';
  priority?: boolean;
};

const variantStyles = {
  nav: 'h-9 w-auto sm:h-10 lg:h-11',
  footer: 'h-11 w-auto sm:h-12',
  admin: 'mx-auto h-14 w-auto',
} as const;

export default function BrandLogo({
  href,
  className,
  imageClassName,
  variant = 'nav',
  priority = false,
}: BrandLogoProps) {
  const image = (
    <Image
      src={SITE_LOGO.url}
      alt={SITE_LOGO.alt}
      width={SITE_LOGO.width}
      height={SITE_LOGO.height}
      priority={priority || variant === 'nav'}
      className={cn(variantStyles[variant], imageClassName)}
    />
  );

  if (!href) {
    return <div className={cn('inline-flex shrink-0 items-center', className)}>{image}</div>;
  }

  return (
    <Link href={href} className={cn('inline-flex shrink-0 items-center', className)}>
      {image}
    </Link>
  );
}
