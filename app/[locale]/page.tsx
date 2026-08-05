import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Hero from '@/components/Hero';
import SectionHeading from '@/components/SectionHeading';
import ProjectGrid from '@/components/ProjectGrid';
import { getFeaturedProjects, getSiteContent, getSeoMeta } from '@/lib/queries';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta('home', locale);
  return { title: seo.meta_title, description: seo.meta_description };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations('home');
  const hero = await getSiteContent('hero', locale);
  const featured = await getFeaturedProjects();

  return (
    <>
      <Hero title={hero.title} subtitle={hero.subtitle} ctaLabel={hero.cta_label} image="/images/project-riverside-01.jpg" />

      <section className="container-page py-24">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={t('featuredSub')} heading={t('featuredHeading')} />
          <Link href="/projects" className="link-underline text-sm uppercase tracking-widest2 text-ink/70">
            {t('viewAll')} &rarr;
          </Link>
        </div>
        <ProjectGrid projects={featured} locale={locale} />
      </section>

      <section className="bg-ink py-24 text-paper">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <p className="font-display text-2xl leading-relaxed md:text-3xl">{t('aboutTeaser')}</p>
          <div className="md:text-right">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border border-paper/30 px-6 py-3 text-xs uppercase tracking-widest2 transition hover:border-gold hover:text-gold-light"
            >
              {t('readMore')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-24 text-center">
        <h2 className="font-display text-3xl md:text-4xl">{t('contactHeading')}</h2>
        <p className="mt-3 text-ink/60">{t('contactSub')}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-3 border border-ink px-8 py-3 text-xs uppercase tracking-widest2 transition hover:border-gold hover:bg-gold"
        >
          {t('contactCta')} &rarr;
        </Link>
      </section>
    </>
  );
}
