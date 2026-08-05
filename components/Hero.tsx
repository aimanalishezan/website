import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  image
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  image: string;
}) {
  return (
    <section className="relative flex h-[88vh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <Image
        src={image}
        alt={title ?? 'AKKHOREKHA'}
        fill
        priority
        className="object-cover opacity-70"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

      <div className="container-page relative z-10 pb-16 md:pb-24">
        <p className="eyebrow mb-4 text-gold-light">{subtitle}</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.1] text-paper md:text-6xl">
          {title}
        </h1>
        {ctaLabel && (
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-3 border border-paper/40 px-6 py-3 text-xs uppercase tracking-widest2 text-paper transition hover:border-gold hover:text-gold-light"
          >
            {ctaLabel}
            <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </div>
    </section>
  );
}
