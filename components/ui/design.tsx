import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/* ——— Layout ——— */

export function PageContainer({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SectionTone = 'dark' | 'muted' | 'light' | 'card';

const sectionTone: Record<SectionTone, string> = {
  dark: 'bg-bg-primary text-text-primary',
  muted: 'bg-bg-section text-text-primary',
  light: 'bg-bg-light text-text-dark',
  card: 'border-t border-gold/30 bg-bg-primary text-text-primary',
};

export function Section({
  tone = 'dark',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'section'> & { tone?: SectionTone }) {
  return (
    <section
      className={cn('w-full py-12 sm:py-16 lg:py-24', sectionTone[tone], className)}
      {...props}
    >
      {children}
    </section>
  );
}

/* ——— Typography ——— */

export function SectionKicker({
  className,
  centered,
  children,
}: {
  className?: string;
  centered?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-inter text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-gold sm:text-xs',
        centered && 'mx-auto',
        className,
      )}
    >
      <span
        className={cn(
          'h-px w-6 bg-gradient-to-r from-transparent to-gold sm:w-8',
          centered && 'from-gold/40',
        )}
        aria-hidden
      />
      {children}
    </span>
  );
}

export function SectionHeading({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn(
        'font-cormorant text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.12] tracking-[-0.02em]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SectionSubheading({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3
      className={cn(
        'font-cormorant text-[clamp(1.35rem,2.5vw,2rem)] font-semibold leading-tight',
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-24',
        className,
      )}
      aria-hidden
    />
  );
}

export function SectionLead({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base sm:leading-7',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionCopy({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'text-sm leading-relaxed text-text-secondary sm:text-[0.9375rem] sm:leading-7',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeaderCenter({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto max-w-3xl text-center', className)}>{children}</div>;
}

/* ——— Surfaces ——— */

export function PanelDark({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border-gold bg-bg-card/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:rounded-[1.75rem] sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'flex min-w-0 min-h-[7.5rem] flex-col justify-start rounded-2xl border border-border-gold bg-black/15 p-5 sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatValue({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'font-inter text-[0.9375rem] font-semibold leading-snug text-text-primary',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function StatMeta({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'mt-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-text-secondary',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function FeatureCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'flex min-h-[5.5rem] min-w-0 items-start rounded-2xl border border-border-gold bg-black/15 p-5 sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BadgePill({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center rounded-full px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] sm:px-3.5 sm:text-[0.6875rem] sm:tracking-[0.18em]',
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ——— Buttons ——— */

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const buttonVariant: Record<ButtonVariant, string> = {
  primary:
    'border border-gold/50 bg-gradient-to-br from-gold to-gold-light text-text-dark shadow-[0_8px_24px_rgba(201,168,76,0.25)] hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)]',
  secondary:
    'border border-border-gold bg-transparent text-gold hover:border-gold hover:bg-gold/10',
  ghost:
    'border border-transparent bg-transparent text-gold hover:border-gold/40 hover:bg-gold/5',
};

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'button'> & { variant?: ButtonVariant }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-inter text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        buttonVariant[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BtnRow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ——— Light-theme helpers (floor plans, specs) ——— */

export function LightCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border-on-light bg-white shadow-[0_12px_36px_rgba(26,26,36,0.06)] sm:rounded-[1.75rem]',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function KickerLight({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'font-inter text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function HeadingLight({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3
      className={cn(
        'font-cormorant text-2xl font-semibold leading-tight text-text-dark sm:text-3xl',
        className,
      )}
    >
      {children}
    </h3>
  );
}

/** Light editorial pages (blog, our story) — same background as body, no white band */
export function EditorialHero({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <header
      className={cn(
        'border-b border-border-on-light/70 bg-bg-light',
        'pt-[calc(var(--site-header-height)+2rem)] pb-10 sm:pt-[calc(var(--site-header-height)+2.5rem)] sm:pb-12',
        className,
      )}
    >
      {children}
    </header>
  );
}

/* ——— Toolbar & segments ——— */

export function SectionToolbar({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'mb-10 grid gap-8 lg:mb-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SegmentControl({
  tone = 'light',
  className,
  children,
}: {
  tone?: 'light' | 'dark';
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap gap-1 rounded-full border p-1',
        tone === 'dark'
          ? 'border-border-gold bg-black/25'
          : 'border-border-on-light bg-white shadow-sm',
        className,
      )}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function SegmentButton({
  active,
  tone = 'light',
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'button'> & { active?: boolean; tone?: 'light' | 'dark' }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        'rounded-full px-4 py-2 font-inter text-sm font-semibold transition-colors',
        tone === 'dark'
          ? active
            ? 'bg-gold text-text-dark'
            : 'text-text-secondary hover:text-gold'
          : active
            ? 'bg-gold-dark text-white'
            : 'text-muted-on-light hover:text-text-dark',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function MediaCardShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        'relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border-gold bg-bg-card sm:rounded-[1.75rem]',
        className,
      )}
    >
      {children}
    </article>
  );
}

export function MediaCardBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
