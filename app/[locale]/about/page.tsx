import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import { getSiteContent, getSeoMeta } from '@/lib/queries';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta('about', locale);
  return { title: seo.meta_title, description: seo.meta_description };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations('about');
  const about = await getSiteContent('about', locale);

  return (
    <div className="container-page py-20 md:py-28">
      <SectionHeading eyebrow="AKKHOREKHA" heading={about.heading ?? t('heading')} />

      <div className="mt-14 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <p className="whitespace-pre-line text-lg leading-relaxed text-ink/80">{about.body}</p>
        </div>
        <div className="md:col-span-2">
          <div className="relative aspect-[3/4] overflow-hidden bg-ink/5">
            <Image
              src="/images/project-office-02.jpg"
              alt="AKKHOREKHA studio"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
