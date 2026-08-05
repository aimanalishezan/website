import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SectionHeading from '@/components/SectionHeading';
import ProjectGrid from '@/components/ProjectGrid';
import { getProjects, getSeoMeta } from '@/lib/queries';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const seo = await getSeoMeta('projects', locale);
  return { title: seo.meta_title, description: seo.meta_description };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const projects = await getProjects();

  return (
    <div className="container-page py-20 md:py-28">
      <SectionHeading eyebrow="AKKHOREKHA" heading={t('heading')} sub={t('sub')} />
      <div className="mt-14">
        <ProjectGrid projects={projects} locale={locale} />
      </div>
    </div>
  );
}
