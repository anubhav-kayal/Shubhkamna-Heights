import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-8 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
          404
        </p>
        <h1 className="mt-4 font-cormorant text-4xl font-semibold text-[var(--text-primary)]">
          The page you requested is not available
        </h1>
        <p className="mt-4 text-[var(--text-secondary)]">
          Try going back to the main site or browse the latest project updates from the
          blog.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[var(--gold)] px-6 py-3 font-semibold text-[var(--bg-primary)]"
          >
            Return Home
          </Link>
          <Link
            href="/blog"
            className="rounded-full border border-[var(--border)] px-6 py-3 font-semibold text-[var(--text-primary)]"
          >
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
